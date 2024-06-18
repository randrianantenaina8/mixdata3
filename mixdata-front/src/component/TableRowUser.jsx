import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import jwtInterceptor from '../service/jwtInterceptor';
import moment from 'moment/moment';
import { useApplication } from '../hooks/UseApplication';
import { API_URL } from '@utils/constants';

function TableRowUser(props) {
  const { row, keyIndex } = props;
  const { user } = useApplication()

  const deleteUser = (row) => {
    if (row) {
      if (row._source.id != user.id) {
        jwtInterceptor.delete( `${API_URL}/user?id=${row._source.id}`).then(res => {
          window.location.reload(false);
        });
      }
    }

  }


  return (
    <React.Fragment>
      <tr sx={{ '& > *': { borderBottom: 'unset' } }} key={keyIndex} style={keyIndex % 2 === 0 ? { backgroundColor: '#fff', width: '100%', display: 'inline-table' } : { backgroundColor: '', width: '100%', display: 'inline-table' }}>

        <td className='px-2' style={{ width: '16.66%' }} align="left" component="th" scope="row">
          {row._source.username}
        </td>
        <td className='px-2' style={{ width: '16.66%' }} align="left">{row._source.firstname}</td>
        <td className='px-2' style={{ width: '16.66%' }} align="left">{row._source.email}</td>
        <td className='px-2' style={{ width: '16.66%' }} align="left">{moment(row._source.createdAt).format('DD-MM-YYYY')}</td>
        <td className='px-2' style={{ width: '16.66%' }} align="left">{moment(row._source.updatedAt).format('DD-MM-YYYY')}</td>
        <td className='px-2' style={{ width: '7.66%' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => deleteUser(row)}
          >
            {user.id == row._source.id ? <BlockIcon /> : <DeleteIcon />}
          </IconButton>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default TableRowUser;
