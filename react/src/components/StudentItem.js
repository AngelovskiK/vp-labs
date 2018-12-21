import React, { Component } from 'react';

class StudentItem extends Component {

  remove(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.remove(this.props.student.indeks);
  }

  render() {
    return (
      <tr onClick={this.props.edit.bind(this, {student: this.props.student})}>
        <td>{this.props.student.indeks}</td>
        <td>{this.props.student.ime}</td>
        <td>{this.props.student.prezime}</td>
        <td>{this.props.student.nasoka}</td>
        <td><button onClick={this.remove.bind(this)}>Izbrisi</button></td>
      </tr>
    );
  }
}

export default StudentItem;
