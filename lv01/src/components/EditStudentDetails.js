import React, { Component } from 'react';

class EditStudentDetails extends Component {

  save(){
    let student = this.props.student;
    student.ime = document.getElementById("ime").value;
    student.prezime = document.getElementById("prezime").value;
    this.props.save({newStudent: student});
  }

  render() {
    return (<div>
        <h3>Editing {this.props.student.indeks}</h3>
        <input type="text" defaultValue={this.props.student.ime} id="ime"/>
        <br/>
        <input type="text" defaultValue={this.props.student.prezime} id="prezime"/>
        <br/>
        <input onClick={this.save.bind(this)} type="submit" value="Save"/>
      </div>);
  }
}

export default EditStudentDetails;
