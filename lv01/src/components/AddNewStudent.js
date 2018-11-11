import React, { Component } from 'react';

class AddNewStudent extends Component {

    submit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.submit({
            indeks: document.getElementById("indeks").value,
            ime: document.getElementById("ime").value,
            prezime: document.getElementById("prezime").value,
            nasoka: document.getElementById("nasoka").value,
        });
        [].slice.call(document.querySelectorAll("input[type=text]")).forEach(input => input.value = '');
    }

    render() {
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
                            <td><input type="text" id="nasoka"/></td>
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
