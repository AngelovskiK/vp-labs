import React, { Component } from 'react';

class StudentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: this.props.student,
      editing: false
    }
  }

  edit(){
    if(this.props.editing) {
      return;
    }
    this.setState((state, props) => {
      return {
        student: this.state.student,
        editing: true
      };
    });
    this.props.edit();
  }

  save(){
    let novStudent = {
      ime: document.getElementById("ime").value,
      prezime: document.getElementById("prezime").value,
      indeks: document.getElementById("indeks").value,
      nasoka: document.getElementById("nasoka").value,
    }
    this.setState((state, props) => {
      return {
        student: novStudent,
        editing: false
      };
    });
    this.props.save();
  }

  render() {
    if(this.state.editing) {
      return (<tr>
        <td><input id="ime" type="text" defaultValue={this.state.student.ime}/></td>
        <td><input id="prezime" type="text" defaultValue={this.state.student.prezime}/></td>
        <td><input id="indeks" type="text" defaultValue={this.state.student.indeks}/></td>
        <td><input id="nasoka" type="text" defaultValue={this.state.student.nasoka}/></td>
        <td><input type="submit" onClick={this.save.bind(this)} value="Zacuvaj"/></td>
      </tr>);
    }
    return (
      <tr onClick={this.edit.bind(this)}>
        <td>{this.state.student.ime}</td>
        <td>{this.state.student.prezime}</td>
        <td>{this.state.student.indeks}</td>
        <td>{this.state.student.nasoka}</td>
      </tr>
    );
  }
}

export default StudentItem;
