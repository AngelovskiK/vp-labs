import React, { Component } from 'react';
import './App.css';
import StudentsList from './components/StudentsList';
import listStudents from './repositories/studentRepository';
import EditStudentDetails from './components/EditStudentDetails';

class App extends Component {

  onEdit() {
    this.setState((state, props) => {
      return {
        students: listStudents(),
        editing: true
      }
    });
  }

  onSave() {
    this.setState((state, props) => {
      return {
        students: listStudents(),
        editing: false
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      students: listStudents(),
      editing: false
    };
  }

  render() {
    let editDetails;
    if(this.state.editing) {
      editDetails = <EditStudentDetails />
    }
    return (
      <div className="App">
        {editDetails}
        <StudentsList students={this.state.students} editing={this.state.editing} edit={this.onEdit.bind(this)} save={this.onSave.bind(this)}/>
      </div>
    );
  }
}

export default App;
