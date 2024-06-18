const getMapping = () => {
    return {
        mappings: {
            properties: {
                id: { type: "keyword" },
                email: {
                    type: 'text',
                    fields: {
                      keyword: {
                        type: "keyword",
                        ignore_above: 256
                      }
                    }
                  },
                password: {
                    type: 'keyword'
                },
                username: {
                    type: 'text',
                    fields: {
                    keyword: {
                        type: "keyword",
                        ignore_above: 256
                    }
                    }
                },
                firstname: {
                    type: 'text',
                    fields: {
                        keyword: {
                            type: "keyword",
                            ignore_above: 256
                        }
                    }
                },
                roles: {
                    properties: {
                        "name": { type: 'keyword' }
                      }
                },
                activate: { type: "boolean" },
                createdAt: { type: "date" },
                updatedAt: { type: "date" },
            }
        }
    };
}
export const userMapping = getMapping();