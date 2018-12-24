import React, { Component } from 'react';

class EditStudentDetails extends Component {

  save(){
    let student = this.props.student;
    student.firstName = document.getElementById("ime").value;
    student.lastName = document.getElementById("prezime").value;
    student.studyProgramName = document.getElementById("studyProgram").value;
    this.props.save({newStudent: student});
  }

  render() {
    let options = []
    this.props.studyPrograms.map(studyProgram => 
        options.push(<option value={studyProgram.name} selected={this.props.student.studyProgram.name === studyProgram.name}>
            {studyProgram.name}
        </option>)
    );
    return (<div>
        <h3>Editing {this.props.student.indeks}</h3>
        <input type="text" defaultValue={this.props.student.firstName} id="ime"/>
        <br/>
        <input type="text" defaultValue={this.props.student.lastName} id="prezime"/>
        <br/>
        <select  id="studyProgram">{options}</select>
        <br/>
        <input onClick={this.save.bind(this)} type="submit" value="Save"/>
      </div>);
  }
}

export default EditStudentDetails;
