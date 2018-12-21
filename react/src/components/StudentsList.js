import React, { Component } from 'react';
import StudentItem from './StudentItem';
import Pagination from "react-js-pagination";

class StudentsList extends Component {

  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = {
      activePage: 1
    }
  }

  static componentDidUpdate(props, state) {
    if(props.students.length <= (state.activePage-1) * 10) {
      this.setState({
        activePage: state.activePage - 1
      });
    }
  }

  handlePageChange(pageNumber) {
    this.setState({
      activePage: pageNumber
    });
  }

  render() {
    var rows = [];
    this.props.students.slice((this.state.activePage - 1) * 10, this.state.activePage * 10).forEach(curr => {
      rows.push(<StudentItem student={curr} edit={this.props.edit} remove={this.props.remove} />);
    });
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Indeks</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Nasoka</th>
              <th>Izbrisi</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>

        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.props.students.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          hideDisabled
        />
      </div>
    );
  }
}

export default StudentsList;
