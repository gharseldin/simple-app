import React from 'react'

export default class AddTask extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            order: '', //can put default values here if you want
            task: '', //can put default values here if you want
            priority: '', //can put default values here if you want
            involves: [] //can put default values here if you want
        }
        this.handleTask = this.handleTask.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleTask (e){
        this.setState({
            task : e.target.value //this will leave the other states alone if they were present
        })
    }

    handleClick (e){
        let newTask = {
            order : 'default',
            task : this.state.task,
            priority : 'default',
            involves : ['default1', 'default2']
        }
        this.props.addTask(newTask)
    }
    render(){
        return (
                <div>
                    <h4>Add a new Task </h4>
                    <input onChange={this.handleTask} value={this.state.task} />
                    {/*Complete the remaining of inputs and use other html imput types*/}
                    <button onClick ={this.handleClick} >Add</button>
                </div>
        )
    }
}