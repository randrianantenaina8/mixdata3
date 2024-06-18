const getMapping = () => {
  return {
    mappings: {
      properties: {
        lands_id: {
          type: "keyword"
        },
        previous_transaction_date: {
          type: "keyword"
        },
        buyers_nb: {type: 'integer'},
        reason: {
          type: "keyword"
        },
        official_id: {
          type: 'text', fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        price: {type: 'float'},
        date: {type: "date", format: "yyyy-MM-dd"},
        sellers_nb: {type: 'integer'},
        ownership_type: {
          type: "keyword"
        },
        land_information: {
          type: "keyword"
        },
        details: {
          type: 'text', fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        address: {
          type: 'text', fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        city: {
          type: "keyword"
        },
        sellers: {
          type: "keyword"
        },
        buyers: {
          type: "keyword"
        },
        location: {
          type: "keyword"
        }
      }
    }
  };
}

//
export const transactionMapping = getMapping();