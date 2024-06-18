import { Schema, Model, ObtainDocumentType, model } from "mongoose";
import { ObjectId } from "mongodb";
import { logger } from '@/common/logger';
import { BaseDO } from '@/data/domain_object/crm/base.do';
import { Mapping } from "@/data/mappings/crm/base";

/**
 * Base class of a CRM Repository
 */
export class CRMRepository<DomainObject extends BaseDO, MappingClass extends Mapping<Schema<DomainObject>>> {
    protected model: Model<ObtainDocumentType<any, DomainObject>>;
    private mappings: MappingClass;

    constructor(mappings: MappingClass) {
        this.mappings = mappings;
        this.model = model(this.mappings.name, this.mappings.schema);
    }

    /**
     * Convert types
     * 
     * @param key 
     * @param values 
     * @returns 
     */
    public convert (key, values) {
        const type = this.mappings.schema.path(key);
        let value: any = values;

        if (type instanceof Schema.Types.String) {
            value = Array.isArray(values)
                    ? values.map((v) => ({ $regex: `^${v}`, $options: "i" }))
                    : { $regex: `^${values}`, $options: "i" };
        }

        return { key, value }
    }

    /**
     * Parse filters
     * 
     * @param key 
     * @param filters 
     * @returns 
     */
    protected parseFilterComponent (key, filters) {
        const where = {};

        switch (key) {
            case '$or':
            case '$and':
            case '$nor':
                if (Array.isArray(filters)) {
                    // Build an combined query
                    const components = [];

                    for (const subKey in filters) {
                        components.push(this.parseFilterComponent(subKey, filters[subKey]));
                    }

                    where[key] = components;
                }
                break;
            default:
                // FieldName eq
                if (typeof filters === "string") {
                    const { key: sanitizedKey, value: sanitizedValue } = this.convert(key, filters)

                    where[sanitizedKey] = sanitizedValue;
                } else {
                    // Field with operator
                    if (isNaN(key)) {
                        let operator = '$in';
                        let value = filters;
                        
                        // Contains operator
                        if (!Array.isArray(filters)) {
                            const entries = Object.entries(filters);
                            operator = entries[0] && entries[0][0] ?  entries[0][0] : '$eq';
                            value = entries[0] && entries[0][1] ? entries[0][1] : '';
                        }

                        logger.debug('Values before conversion: ', JSON.stringify({ key, operator, value }));
                        const {key: sanitizedKey, value: sanitizedValue} = this.convert(key, value);
                        logger.debug('Values before conversion: ', JSON.stringify({ sanitizedKey, operator, sanitizedValue }));

                        where[sanitizedKey] = { [operator]: sanitizedValue };
                    } else {
                        // Array of fields
                        for (const subKey in filters) {
                            Object.assign(where, this.parseFilterComponent(subKey, filters[subKey]));
                        }
                    }
                }

                break;
        }

        return where;
    }

    /**
     * Create filters
     * 
     * @param filters 
     * @returns 
     */
    protected parseFilters (filters) {
        const components = [];
        const where = { $and: components }

        for (const key in filters) {
            components.push(this.parseFilterComponent(key, filters[key]));
        }

        return components.length > 0 ? where as any : {};
    }

    protected parseSorting (sorting) {
        const order = {};

        for (const field in sorting) {;
            if (!(field in this.mappings.schema.obj)) {
                continue;
            }

            const direction = (sorting[field] || '').toLocaleLowerCase();
            order[field] = ['', 'asc', '1', 1].includes(direction)
                ? 1 : -1;
        }

        return order as any;
    }

    /**
     * 
     * @param filters 
     * @param sorting 
     * @param limit 
     * @param offset 
     * @returns 
     */
    async find (
        filters: { [fieldName: string]: any } | any[] | string = {},
        sorting: { [fieldName: string]: any } | any[] | string = {} = {},
        limit: number = -1,
        offset: number = -1,
        includeDeleted: boolean = false,
        relations: string[] = [],
    ) {
        const where = this.parseFilters(filters);
        const order = this.parseSorting(sorting);
        const hasMoreLimit = limit > 0 ? limit + 1 : undefined;

        const findFilters = includeDeleted ? where : {$and: [
            where,
            { deletedAt: { $eq: null } }
        ]};

        const result = await (async () => {
            try {
                const query = this.model
                .find(findFilters)
                .sort(order)
                .skip(offset > 0 ? offset : 0);

                if (hasMoreLimit) {
                    query.limit(hasMoreLimit)
                }

                // Populate relations
                if (relations && relations.length) {
                    relations.forEach((rel) => {
                        query.populate(rel);
                    });
                }

                return await query.exec();
            } catch (err) {
                return []
            }
        })();

        // Has more records
        const records = result || [];
        const hasMore = limit > 0 && records.length > limit;
        if (limit >= 0) {
            records.length = Math.min(limit, records.length);
        }

        return {
            records,
            totalCount: -1,
            count: records.length,
            hasMore,
        }
    }

    /**
     * Find record
     * 
     * @param filters 
     * @param sorting 
     * @param limit 
     * @param offset 
     * @returns 
     */
    async findAndCount(
        filters: { [fieldName: string]: any } | any[] | string = {},
        sorting: { [fieldName: string]: any } | any[] | string = {} = {},
        limit: number = -1,
        offset: number = -1,
        includeDeleted: boolean = false,
        relations: string[] = [],
    ) {
        const where = this.parseFilters(filters);
        const order = this.parseSorting(sorting);
        const hasMoreLimit = limit > 0 ? limit + 1 : undefined;

        const findFilters = includeDeleted ? where : {$and: [
            where,
            { deletedAt: { $eq: null } }
        ]};

        const query = this.model
        .find(findFilters)
        .sort(order)
        .skip(offset > 0 ? offset : 0);

        if (hasMoreLimit) {
            query.limit(hasMoreLimit)
        }

        // Populate relations
        if (relations && relations.length) {
            relations.forEach((rel) => {
                query.populate(rel);
            });
        }

        const results = await Promise.all([
            query.exec(),
            this.model.countDocuments(findFilters)
        ]);

        // Has more records
        const records = results[0] as DomainObject[] || [];
        const hasMore = limit > 0 && records.length > limit;
        if (limit >= 0) {
            records.length = Math.min(limit, records.length);
        }

        return {
            records: records,
            totalCount: results[1] || 0,
            count: records.length,
            hasMore,
        }
    }

    /**
     * Save record
     * 
     * @param data 
     * @returns 
     */
    async save (data: DomainObject | DomainObject[]) {
        const criteria = Array.isArray(data) ? data.map((d) => d._id) : data._id;
        const update = Array.isArray(criteria) ? criteria.length > 0 : criteria && criteria;

        if (update) {
            await this.model.findOneAndUpdate(criteria, data);
            return await this.model.findOne(criteria);
        } else {
            const result = await this.model.create(data);
            return result;
        }
    }

    /**
     * Delete record
     * 
     * @param data 
     */
    async delete (data: DomainObject | DomainObject[]) {
        const deleteDate = new Date();

        if (Array.isArray(data)) {
            data.forEach((d) => d.deletedAt = deleteDate);
        } else {
            data.deletedAt = deleteDate;
        }

        return await this.save(data);
    }
}
