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
        
        this.patchData('http://localhost:8080/students/'+args.newStudent.index, {
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
    this.postData('http://localhost:8080/students/', newStudent).then(data => {
      if(data.status != 201){
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
    this.delete('http://localhost:8080/students/'+indeks).then(data => {
      if(data.status === 404)
        alert(data.message);
    });
    students.splice(students.findIndex(s => s.indeks === indeks), 1);
    this.setState({
      students: students
    });
  }

  postData(url = ``, data = {}) {
    // Default options are marked with *
      return fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
              "Content-Type": "application/json",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()) // parses response to JSON
      .catch(err => err);
  }

  patchData(url = ``, data = {}) {
    // Default options are marked with *
      return fetch(url, {
          method: "PATCH", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
              "Content-Type": "application/json",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()) // parses response to JSON
      .catch(err => err);
  }

  delete(url = ``) {
    // Default options are marked with *
      return fetch(url, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
              "Content-Type": "application/json",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
      })
      .then(response => response.json()) // parses response to JSON
      .catch(err => err);
  }

  
  deleteStudyProgram(id) {
    console.log(id);
    const that = this;
    this.delete('http://localhost:8080/study_programs/'+id).then((data) => {
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
    this.postData('http://localhost:8080/study_programs/', {name: name}).then((data)=> {
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
