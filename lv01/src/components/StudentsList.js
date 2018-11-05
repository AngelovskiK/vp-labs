import React, { Component } from 'react';
import StudentItem from './StudentItem';

class StudentsList extends Component {

  render() {
    var rows = [];
    this.props.students.forEach(curr => {
      
      rows.push(<StudentItem student={curr} edit={this.props.edit}/>);
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Indeks</th>
            <th>Nasoka</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

export default StudentsList;
