import React, { Component } from 'react';

class AddNewStudent extends Component {


    submit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.submit({
            index: document.getElementById("indeks").value,
            name: document.getElementById("ime").value,
            lastName: document.getElementById("prezime").value,
            studyProgramName: document.getElementById("nasoka").value,
        });
        [].slice.call(document.querySelectorAll("input[type=text]")).forEach(input => input.value = '');
    }

    render() {
        let options = [];
        this.props.studyPrograms.map(studyProgram => 
            options.push(<option value={studyProgram.name}>
                {studyProgram.name}
            </option>)
        );
        return (
            <form onSubmit={this.submit.bind(this)}>
                <table>
                    <tbody>
                        <tr>
                            <td>Indeks:</td>
                            <td><input type="text" id="indeks"/></td>
                        </tr>
                        <tr>
                            <td>Ime:</td>
                            <td><input type="text" id="ime"/></td>
                        </tr>
                        <tr>
                            <td>Prezime:</td>
                            <td><input type="text" id="prezime"/></td>
                        </tr>
                        <tr>
                            <td>Nasoka:</td>
                            <td><select>{options}</select></td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="submit" value="Dodadi"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        );
    }
}

export default AddNewStudent;
