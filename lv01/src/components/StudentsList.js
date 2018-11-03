import React, { Component } from 'react';
import StudentItem from './StudentItem';

class StudentsList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var rows = [];
    this.props.students.forEach(curr => {
      console.log(curr);
      rows.push(<StudentItem student={curr} editing={this.props.editing} edit={this.props.edit} save={this.props.save}/>);
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
