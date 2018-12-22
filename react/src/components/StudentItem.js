import React, { Component } from 'react';

class StudentItem extends Component {

  remove(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.remove(this.props.student.index);
  }

  render() {
    return (
      <tr onClick={this.props.edit.bind(this, {student: this.props.student})}>
        <td>{this.props.student.index}</td>
        <td>{this.props.student.firstName}</td>
        <td>{this.props.student.lastName}</td>
        <td><button onClick={this.remove.bind(this)}>Izbrisi</button></td>
      </tr>
    );
  }
}

export default StudentItem;
