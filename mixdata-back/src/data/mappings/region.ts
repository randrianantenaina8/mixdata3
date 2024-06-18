const getMapping = () => {
    return {
        mappings: {
            properties: {
              first_transaction_date: { type: "date" },
              first_fao_date: { type: "date" },
              name: {
                type: 'text',
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  }
                }
              },
              primary_indice: {
                type: 'text',
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  }
                }
              },
              secondary_indice: {
                type: 'text',
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  }
                }
              },
            }
        }
    }
}

export const regionMapping = getMapping();