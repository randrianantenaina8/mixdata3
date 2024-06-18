const getMapping = () => {
    return {
        mappings: {
            properties: {
                id: { type: "integer" },
                region: {
                    type: 'text',
                    fields: {
                      keyword: {
                        type: "keyword",
                        ignore_above: 256
                      }
                    }
                  },
                district: {
                    type: 'text',
                    fields: {
                    keyword: {
                        type: "keyword",
                        ignore_above: 256
                    }
                    }
                },
                name: {
                    type: 'text',
                    fields: {
                    keyword: {
                        type: "keyword",
                        ignore_above: 256
                    }
                    }
                },
                code_number: {
                    type: 'text',
                    fields: {
                        keyword: {
                            type: "keyword",
                            ignore_above: 256
                        }
                    }
                },
                ofs_number: {
                    type: 'text',
                    fields: {
                        keyword: {
                            type: "keyword",
                            ignore_above: 256
                        }
                    }
                },
                geo_center: {
                    properties: {
                      "type": {
                        type: 'text',
                        fields: {
                          keyword: {
                            type: "keyword",
                            ignore_above: 256
                          }
                        }
                      },
                      coordinates: { type: "geo_point" }
                    }
                  },
                imported: { type: "text" },
            }
          }
    };
}
export const cityMapping = getMapping();