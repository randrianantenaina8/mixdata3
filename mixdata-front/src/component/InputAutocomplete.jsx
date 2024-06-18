import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import jwtInterceptor from "../service/jwtInterceptor";
import {API_URL} from "../utils/constants";

function InputAutocomplete({ name, field, handleFieldChange, lands, placeholder, label, accessField }) {

  const path = {
    'location': 'city/_search',
    'owners': 'lands/findOwner',
    'lands': 'lands/findTerm'
  }
  const [options, setOptions] = React.useState([]);

  const getData = async (term) => {
    await jwtInterceptor
      .get(
        `${API_URL}/${path[`${field}`]}?term=` + term
      )
      .then((res) => {
        setOptions([...res.data.data.results]);
      });
  }

  const termAutocomplet = ({target: { value, name }}) => {
    // handleFieldChange(name, value);
    getData(value)
  }

  const onTagsChange = (event, values) => {
    handleFieldChange(field, values);
  }
  return (
    <div style={{
      width: "fit-content",
      position: "relative"
    }}>
      <Autocomplete
        style={{
          width: 'max-content',
          minWidth: '200px'
        }}
        multiple
        id="tags-filled"
        options={options}
        getOptionLabel={option => {

          if (field === 'lands') {
            return `- parcelle: [${option._source[`${accessField}`]}]  adresse: [${option._source[`address_full`]}] zone: [${option._source.land_use_plans[0].name}]`
          }
          if (field === 'location') {
            return `- district: [${option._source.district}]  canton: [${option._source.region}] commune: [${option._source.name}]`
          }
          if (field === 'owners') {
            return `- ${option._source[`${accessField}`]}`
          }
          return ''
        }}
        onChange={onTagsChange}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option._source[`${accessField}`]} {...getTagProps({ index })} />
          ))
        }
        name={field}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label={label}
            placeholder={placeholder}
            name={name}
            onChange={termAutocomplet}
          />
        )}
      />
       
    </div>
    
      
  );
}

export default InputAutocomplete;