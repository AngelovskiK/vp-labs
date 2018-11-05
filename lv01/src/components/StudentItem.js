import React, { Component } from 'react';

class StudentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: this.props.student
    }
  }

  render() {
    return (
      <tr onClick={this.props.edit.bind(this, {student: this.state.student})}>
        <td>{this.state.student.ime}</td>
        <td>{this.state.student.prezime}</td>
        <td>{this.state.student.indeks}</td>
        <td>{this.state.student.nasoka}</td>
      </tr>
    );
  }
}

export default StudentItem;
