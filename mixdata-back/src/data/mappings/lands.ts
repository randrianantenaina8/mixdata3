const getMapping = () => {
    return {
        mappings: {
            properties: {
              land_id: { type: 'integer' },
              code_number: { type: 'integer' },
              type: { type: 'text' },
              area: { type: 'integer' },
              official_area: { type: 'integer' },
              rf_uri: { type: 'text' },
              public_property: { type: 'boolean' },
              geo_polygon: {
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
              geo_center: { type: 'geo_point' },
              city_name: {
                type: 'text',
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  }
                }
              },
              city_code_number: { type: 'integer' },
              region_id: { type: 'integer' },
              region_name: {
                type: 'text',
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  }
                }
              },
              geo_portal_link: { type: 'text' },
              center_ch_projection: { type: 'text' },
              land_use_plans: {
                properties: {
                  cover_area_perc: { type: 'integer' },
                  id: { type: 'integer' },
                  plan_type: { type: "keyword" },
                  name: { type: "keyword" },// zone d'affectation
                }
              },
              building_area: { type: 'boolean' },
              building_permit_number: { type: 'integer' },
              "building_permit_last_year": { type: "date", format: "yyyy" },
              "transaction_number": { type: 'integer' },
              "transaction_last_year": { type: "date", format: "yyyy" },
              "highest_building_protected_rank" : { type: 'integer' },
              "address_full": { type: 'text' },
              "average_building_year": { type: "date", format: "yyyy" },
              "average_renovation_year": { type: "date", format: "yyyy" },
              "average_condition_year": { type: "date", format: "yyyy" },
              "buildings": {
                properties: {
                  "unit_nb": { type: 'integer' },
                  "id": { type: 'integer' },
                  "floor_nb": { type: "integer" },
                  "underground_nb": { type: "integer" },
                  "height": { type: "integer" },
                  "area": { type: "integer" },
                  "cover_area_perc": { type: "integer" },
                  "cover_area": { type: "integer" },
                  "classification": { type: 'keyword' },
                  "protected_rank": { type: "integer" },
                  "addresses_nb": { type: "integer" },
                  "addresses": {
                    properties: {
                      "id": 130248,
                      "street": { type: 'keyword' },
                      "street_nb": { type: 'keyword' },
                      "npa": { type: 'keyword' },
                      "locality": { type: 'keyword' },
                      "city": { type: 'keyword' },
                    }
                  },
                  "buildings_administrative": {
                    properties: {
                      "id": { type: "integer" },
                      "egid": { type: "integer" },
                      "area": { type: "integer" },
                      "unit_nb": { type: "integer" },
                      "floor_nb": { type: "integer" },
                      "building_year": { type: "date", format: "yyyy" },
                      "renovation_year": { type: "date", format: "yyyy" },
                      "building_period": { type: "date_range", format: "yyyy" },
                      "renovation_period": { type: "integer_range" },
                      "category": { type: 'keyword' },
                      "status": { type: 'keyword' },
                      "popety_classification": { type: 'keyword' },
                      "building_year_min": { type: "integer" },
                      "building_year_max": { type: "date_range", format: "yyyy" },
                      "renovation_year_min": { type: "integer" },
                      "renovation_year_max": { type: "date_range", format: "yyyy" },
                    }
                  }
                }
              },
              "unit_nb": { type: "integer" },
              "bare_land": { type: 'boolean' },
              "building_nb": { type: "integer" },
              "building_total_area": { type: "integer" },
              "max_floor_nb": { type: "integer" },
              
              "owners": {
                properties: {
                  "id": { type: "integer" },
                  "name": { type: 'keyword' },
                  "create_timestamp": { type: "date", format: "epoch_millis" },
                  "type": { type: 'keyword' },
                }
              },
              "owner_list": {
                type: 'keyword',
                // "fielddata": true,
              },
              "poi_score": { type: "double" },
              "principal_type": { type: 'keyword' },
              // "std": { type: "double" },
              // "sbpu": { type: "double" },
              // "ios": { type: "double" },
              // "ius": { type: "double" },
              // "ibus": { type: "double" },
              "official_usage_indice_extracted": { type: 'boolean' },
              "official_occupation_indice_extracted": { type: 'boolean' },
              // "under_exploited_score": { type: "integer" },
              // "geo_shape_score": { type: "integer" },
              // "development_score": { type: "integer" },
              // "existing_score": { type: "integer" },
              // "livability_score": { type: "integer" },
              // "id": { type: "integer" },
              "nb_commune_canton": { type: "integer" },
              "city": { type: 'keyword' },
              "nb_parcelle": { type: "integer" },
              owner_nb: { type: "integer" },
            }
          }
    };
}

// 
export const landMapping = getMapping();