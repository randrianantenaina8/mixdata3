const getMapping = () => {
  return {
    mappings: {
      properties: {
        "inquiry_start_date": {type: "date", format: "yyyy-MM-dd"},
        "camac_code_number":  {type: "text"},
        "fao_code_number": {type: "text"},
        "type_code": {
          type: "keyword"
        },
        "type_name": {
          type: "keyword"
        },
        "jurisdiction_code": {
          type: "text"
        },
        "jurisdiction_name": {
          type: "text"
        },
        "work_type": {
          type: "keyword"
        },
        "work_description": {
          type: "keyword"
        },
        "dispensation": {
          type: "keyword"
        },
        "owner": {
          type: "keyword"
        },
        "easement": {
          type: "keyword"
        },
        "lands_id": {
          type: "keyword"
        },
        "architect": { type: "text" },
        "result": {
          type: "keyword"
        },
        "region": {
          type: "keyword"
        },
        "address": {
          type: "keyword"
        },
        "city": {
          type: "keyword"
        },
        "classification": {
          type: "keyword"
        },
        "url_official": {
          type: "text"
        },
        "location": {
          type: "text"
        }
      }
    }
  }
}

export const faosMapping = getMapping();