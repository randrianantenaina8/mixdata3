import { configs } from "../data/constants/configs";
import { mappings } from "../data/constants/indexMapping";

export class ElasticRepository {
  private elasticClient;

  constructor() {
    const { Client } = require("@elastic/elasticsearch");
    this.elasticClient = new Client({
      node: configs.elasticEndPoint,
      auth: {
        username: configs.elasticUsername,
        password: configs.elasticPassword,
      },
    });
  }

  async createIndex(indexName: string, mappings: object) {
    const res = await this.elasticClient.indices.create(
      {
        index: indexName,
        ...mappings,
        // settings
      },
      { ignore: [400] }
    );
    console.log("res ", res);
    // await this.refresh(indexName);
    return res;
  }

  async refresh(indexName: string) {
    await this.elasticClient.indices.refresh({ index: indexName });
  }

  async count(indexName: string) {
    await this.elasticClient.indices.refresh({ index: indexName });
    return await this.elasticClient.count({ index: indexName });
  }

  async findAll(index, sorts: any[]) {
    const res = await this.elasticClient.search({
      index: index,
      body: {
        query: {
          match_all: {},
        },
        sort: [...sorts],
      },
    });
    return {
      results: res.hits.hits,
      total: res.hits.total.value,
    };
  }

  async matchOne(index: string, payload: any) {
    console.log("matchOne payload", payload);
    try {
      const res = await this.elasticClient.search({
        index: index,
        body: {
          query: {
            match: {
              ...payload,
            },
          },
        },
      });
      console.log("matchOne res", res);
      return {
        results: res.hits.hits[0],
        total: res.hits.total.value,
      };
    } catch (error) {
      console.log("matchOne error", error);
    }

    return {
      results: [],
      total: 0,
    };
  }

  async findOne(index: string, payload: any) {
    console.log("payload", payload);
    const res = await this.elasticClient.search({
      index: index,
      body: {
        query: {
          bool: {
            filter: {
              term: payload,
            },
          },
        },
      },
    });
    console.log("res", res);
    return {
      results: res.hits.hits[0],
      total: res.hits.total.value,
    };
  }

  async exactOne(index: string, payload: any) {
    console.log("matchOne payload", payload);
    try {
      const res = await this.elasticClient.search({
        index: index,
        body: {
          query: {
            bool: {
              must: [
                {
                  term: { "email.keyword": payload.email.toLowerCase() }, // Utilisation du champ keyword pour un match exact sans tenir compte de la casse
                },
              ],
            },
          },
        },
      });
      console.log("matchOne res", res);
      return {
        results: res.hits.hits[0],
        total: res.hits.total.value,
      };
    } catch (error) {
      console.log("matchOne error", error);
    }
  }

  async findByString(index: string, term: string, fields: string[]) {
    const res = await this.elasticClient.search({
      index: index,
      body: {
        query: {
          query_string: {
            query: `*${term}*`,
            fields: fields,
          },
        },
      },
    });
    return {
      results: res.hits.hits,
      total: res.hits.total.value,
    };
  }

  async search(index: string, query: object) {
    const res = await this.elasticClient.search({ index: index, body: query });
    return {
      results: res.hits.hits,
      total: res.hits.total.value,
    };
  }

  async searchAll(index: string[], term: string) {
    const res = await this.elasticClient.search({
      index: index,
      body: {
        fields: ["name", "address_full", "city_name", "region_name"],
        query: {
          bool: {
            should: [
              {
                multi_match: {
                  query: `*${term}*`,
                  type: "phrase",
                  fields: [
                    "name",
                    "address_full",
                    "city_name",
                    "region_name",
                    "nb_parcelle",
                  ],
                  operator: "or",
                },
              },
            ],
          },
        },
        highlight: {
          fields: {
            name: {},
            address_full: {},
            nb_parcelle: {},
          },
        },
      },
    });
    console.log("searchAll res", res);
    return {
      results: res.hits.hits,
      total: res.hits.total.value,
    };
  }

  async delete(indexName: string) {
    return await this.elasticClient.indices.delete({ index: indexName });
  }

  async deleteOne(indexName: string, id: string) {
    return await this.elasticClient.delete({
      index: indexName,
      id: id,
    });
  }

  async remove(indexName: string, payload: any) {
    const res = await this.elasticClient.delete({
      index: indexName,
      body: payload,
    });
    return {
      results: res.hits.hits,
      total: res.hits.total.value,
    };
  }

  async save(indexName: string, dataSets: any[]) {
    try {
      const count = await this.count(indexName);
      console.log("count", count);
    } catch (err) {
      if (err.statusCode === 404) {
        const index = await this.createIndex(
          indexName,
          mappings[`${indexName}`]
        );
        console.log("index ready", index);
      }
    }

    const operations = dataSets.flatMap((doc) => [
      { index: { _index: indexName } },
      doc,
    ]);
    const bulkResponse = await this.elasticClient.bulk({
      refresh: true,
      operations,
    });

    if (bulkResponse.errors) {
      const erroredDocuments = [];
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0];
        if (action[operation].error) {
          erroredDocuments.push({
            status: action[operation].status,
            error: action[operation].error,
            operation: operations[i * 2],
            document: operations[i * 2 + 1],
          });
        }
      });
      console.log("bulkDocuments erroredDocuments", erroredDocuments);
    }
    return bulkResponse;
  }

  async update(indexName: string, id: string, dataSets: any) {
    return await this.elasticClient.update({
      index: indexName,
      id: id,
      body: {
        doc: { ...dataSets },
      },
    });
  }
}

export const elasticRepository = new ElasticRepository();
