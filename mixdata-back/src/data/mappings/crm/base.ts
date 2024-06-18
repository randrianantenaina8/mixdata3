const getMapping = () => {
    return {
        tenantId: String,
        createdBy: String,
        updatedBy: String,
        deletedAt: Date,
    }
}

export const baseMapping = getMapping();
export class Mapping<T> {
    private _name: string;
    private _schema: T;

    constructor(name: string, schema: T) {
        this._name = name;
        this._schema = schema;
    }

    public get name(): string {
        return this._name;
    }

    public get schema(): T {
        return this._schema;
    }
}
