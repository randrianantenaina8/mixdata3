import React from "react";

import Paper from "@material-ui/core/Paper";
import TablePagination from '@mui/material/TablePagination';

import jwtInterceptor from '../service/jwtInterceptor';
import TableRowUser from '../component/TableRowUser';
import {API_URL} from "../utils/constants";
// import jwtInterceoptor from '../component/jwtInterceptor';

class UserContainer extends React.Component {

  DEFAULT_PER_PAGE = 10;
  DEFAULT_PAGE = 0;
  
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.state = {
      total: 0,
      dataTable: [],
      page: this.DEFAULT_PAGE,
      rowsPerPage: this.DEFAULT_PER_PAGE
    }
  }


  colums = [
    {accessor: "username", show: "Nom"},
    {accessor: "firstname", show: "Prenom"},
    {accessor: "email", show: "E-mail"},
    {accessor: "createdAt", show: "Date inscription"},
    {accessor: "updatedAt", show: "Date dernier login"},
  ]


  handleChangePage = (event, newPage) => {
    this.setState({
      ...this.state,
      page: newPage
    });
    this.getData(this.state.rowsPerPage, newPage);
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      ...this.state,
      rowsPerPage: parseInt(event.target.value)
    });
    this.getData(event.target.value, this.state.page);
  };

  getData = (perPage, page) => {
    this.searchfn({
      size: perPage,
      page: page
    })
  }

    componentDidMount() {
      this.getData(this.DEFAULT_PER_PAGE, this.DEFAULT_PAGE);
    }

    searchfn = (filter) => {
      jwtInterceptor.get(`${API_URL}/user?size=${filter.size}&page=${filter.page}`).then(res => {

        this.setState({
          ...this.state,
          total: res.data.data.total,
          dataTable: res.data.data.results
        });
      })
    }

    

    
    
    render() {
      /****Custom variable styles */
      const fontWeightTitle = {
        fontWeight:"600"
        };
      return (
        <div className='my-4'>
          <Paper className="py-4 px-4 rounded shadow-none App-container w-100 m-0">
          <h3 className='mb-5' style={fontWeightTitle}>Utilisateurs</h3>
          <div className='overflow-auto'>
            <table className='table px-2' style={{width: '1606px' , margin: 'auto'}}>
              <thead style={{background:'#F3F7F9' , borderBottom:'2px #DEE2E6 solid' , fontWeight: 'normal' , color: '#363636' , marginBottom: '5px' , paddingInline : '5px'}}>
                <tr style = {{width : '100%' , display : 'inline-table'}}>
                      
                  {this.colums.map((field) => {
                    return (
                      <th style={{width : '16.66%'}} scope='col' key={field.accessor}>
                      {field.show}
                      </th>
                    )})}
                    <th style={{width : '7.66%'}} scope='col' key={"actions"}>
                      Action
                    </th>
                </tr>
              </thead>
              <tbody style={{paddingInline : '5px'}}>
                {this.state.dataTable.map((row, index) => (
                  <TableRowUser key={row._source.id} keyIndex={index} row={row} />
                ))}
              </tbody>
            </table>
          </div>
            <TablePagination
              component="div"
              count={this.state.total}
              page={!this.state.page || this.state.page <= 0 ? 0 : this.state.page}
              onPageChange={this.handleChangePage}
              rowsPerPage={this.state.rowsPerPage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
              backIconButtonProps={{
                'aria-label': 'Précédent',
                className:"PreviousBtn"
              }}
              nextIconButtonProps={{
                'aria-label': 'Suivant',
                className:"NextBtn"
              }}
            />
          </Paper>
        </div>
      );
              }
}

export default UserContainer;