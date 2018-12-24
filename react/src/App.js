import React, { Component } from 'react';
import './App.css';
import StudentsList from './components/StudentsList';
import EditStudentDetails from './components/EditStudentDetails';
import AddNewStudent from './components/AddNewStudent';
import {post, patch, del} from './repositories/studentRepository';
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
        
        patch('http://localhost:8080/students/'+args.newStudent.index, {
          name: student.firstName === args.newStudent.firstName ? null : args.newStudent.firstName,
          lastName: student.lastName === args.newStudent.lastName ? null : args.newStudent.lastName,
          studyProgramName: args.newStudent.studyProgramName
        }).then((data) => {
          if(data.status && data.status !== 200) 
            alert(data.message);
        });
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
    post('http://localhost:8080/students/', newStudent).then(data => {
      if(data.status !== 201){
        alert(data.message);
        return;
      }
      students.push({
        index: newStudent.index,
        firstName: newStudent.name,
        lastName: newStudent.lastName
      });
      this.setState({
        students: students
      });
    });

  }

  onRemove(indeks) {
    let students = this.state.students;
    del('http://localhost:8080/students/'+indeks).then(data => {
      if(data.status === 404)
        alert(data.message);
    });
    students.splice(students.findIndex(s => s.indeks === indeks), 1);
    this.setState({
      students: students
    });
  }

  
  deleteStudyProgram(id) {
    console.log(id);
    const that = this;
    del('http://localhost:8080/study_programs/'+id).then((data) => {
      if(data.status && data.status !== 200)
        alert(data.message);
      else {
        fetch('http://localhost:8080/study_programs/').then((response)=> {
          response.json().then(function(data) {
            that.setState({
                studyPrograms: data
            });
          });
        }).catch((err) => []);
      }
    }).catch(err => alert(err));
  }

  createNewStudyProgram() {
    let name = document.getElementById("novaStudiskaPrograma").value;
    const that = this;
    post('http://localhost:8080/study_programs/', {name: name}).then((data)=> {
      if(data.status) 
        alert(data.message);
      else {
        let oldStudyPrograms = this.state.studyPrograms;
        oldStudyPrograms.push({id: data.id, name: data.name})
        that.setState({
          studyPrograms: oldStudyPrograms
        })
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      students: [],
      editing: false,
      studentBeingEdited: null,
      studyPrograms: []
    };
    const that = this;
    fetch('http://localhost:8080/students/').then((response)=> {
      response.json().then(function(data) {
        that.setState({
          students: data
        })
      });
    }).catch((err) => []);
    fetch('http://localhost:8080/study_programs/').then((response)=> {
      response.json().then(function(data) {
        that.setState({
            studyPrograms: data
        });
      });
    }).catch((err) => []);
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onAddNewStudent = this.onAddNewStudent.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.deleteStudyProgram = this.deleteStudyProgram.bind(this);
    this.createNewStudyProgram = this.createNewStudyProgram.bind(this);
  }

  render() {
    let showing;
    if(this.state.editing) {
      showing = <EditStudentDetails studyPrograms={this.state.studyPrograms} student={this.state.studentBeingEdited} save={this.onSave}/>
    }else
    {
      let studyPrograms = [];
      this.state.studyPrograms.forEach(studyProgram => studyPrograms.push(
        <li>{studyProgram.name} <button onClick={() => this.deleteStudyProgram(studyProgram.id)}>Delete</button></li>
      ));
      showing = <div>
          <StudentsList students={this.state.students} editing={this.state.editing} edit={this.onEdit} remove={this.onRemove}/>
          <AddNewStudent studyPrograms={this.state.studyPrograms} submit={this.onAddNewStudent}/>
          <ul>
            {studyPrograms}
            <li><input type="text" id="novaStudiskaPrograma"/><button onClick={this.createNewStudyProgram}>CREATE</button></li>
          </ul>
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
