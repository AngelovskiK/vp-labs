import React, { Component } from 'react';
import './App.css';
import StudentsList from './components/StudentsList';
import listStudents from './repositories/studentRepository';
import EditStudentDetails from './components/EditStudentDetails';

class App extends Component {

  onEdit(args) {
    this.setState((state, props) => {
      return {
        students: listStudents(),
        editing: true,
        studentBeingEdited: args.student
      }
    });
  }

  onSave(args) {

    let students = this.state.students;
    
    students.forEach(student => {
      if(student.indeks === args.newStudent.indeks) {
        student.ime = args.newStudent.ime;
        student.prezime = args.newStudent.prezime;
      }
    });

    this.setState((state, props) => {
      return {
        students: students,
        editing: false,
        studentBeingEdited: null
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      students: listStudents(),
      editing: false,
      studentBeingEdited: null
    };
  }

  render() {
    let editDetails;
    let studentsTable;
    if(this.state.editing) {
      editDetails = <EditStudentDetails student={this.state.studentBeingEdited} save={this.onSave.bind(this)}/>
    }else
    {
      studentsTable = <StudentsList students={this.state.students} editing={this.state.editing} edit={this.onEdit.bind(this)} save={this.onSave.bind(this)}/>
    }
    return (
      <div className="App">
        {editDetails}
        {studentsTable}
      </div>
    );
  }
}

export default App;
