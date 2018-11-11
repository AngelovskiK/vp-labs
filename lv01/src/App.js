import React, { Component } from 'react';
import './App.css';
import StudentsList from './components/StudentsList';
import listStudents from './repositories/studentRepository';
import EditStudentDetails from './components/EditStudentDetails';
import AddNewStudent from './components/AddNewStudent';

class App extends Component {

  onEdit(args) {
    this.setState((state, props) => {
      return {
        students: state.students,
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

  onAddNewStudent(newStudent) {
    let students = this.state.students;
    students.push(newStudent);
    this.setState({
      students: students
    });
  }

  onRemove(indeks) {
    let students = this.state.students;
    students.splice(students.findIndex(s => s.indeks === indeks), 1);
    this.setState({
      students: students
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      students: listStudents(),
      editing: false,
      studentBeingEdited: null
    };
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onAddNewStudent = this.onAddNewStudent.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  render() {
    let showing;
    if(this.state.editing) {
      showing = <EditStudentDetails student={this.state.studentBeingEdited} save={this.onSave}/>
    }else
    {
      showing = <div>
          <StudentsList students={this.state.students} editing={this.state.editing} edit={this.onEdit} remove={this.onRemove}/>
          <AddNewStudent submit={this.onAddNewStudent}/>
        </div>
    }
    return (
      <div className="App">
        {showing}
      </div>
    );
  }
}

export default App;
