import React from 'react'
import {render} from 'react-dom'
import ReactDOM from 'react-dom'

var App = React.createClass({
    getInitialState: function(){
        return {
            tasks: [
                {
                    order: 1,
                    task: 'clean the kitchen'},
                {
                    order: 2,
                    task: 'take out the trash'},
                {
                    order: 3,
                    task: 'cook the food'},
                {
                    order: 4,
                    task: 'take out the laundry'}
            ]
        }
    },
    render: function(){
        return (
            <div>
                <h1> Task List </h1>
                <table border="1">
                    <tr>
                        <th>task number</th><th>task description</th>
                    </tr>
                    <tr>
                        <td>{this.state.tasks[0].order}</td><td>{this.state.tasks[0].task}</td>
                    </tr>
                    <tr>
                        <td>{this.state.tasks[1].order}</td><td>{this.state.tasks[1].task}</td>
                    </tr>
                    <tr>
                        <td>{this.state.tasks[2].order}</td><td>{this.state.tasks[2].task}</td>
                    </tr>
                    <tr>
                        <td>{this.state.tasks[3].order}</td><td>{this.state.tasks[3].task}</td>
                    </tr>
                </table>
            </div>
        )
    }
})

ReactDOM.render(<App />, document.getElementById('app'))