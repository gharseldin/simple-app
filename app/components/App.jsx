import React from 'react'
import {render} from 'react-dom'
import ReactDOM from 'react-dom'
import SimpleTask from './Task.jsx'
import AddTask from './AddTask.jsx'

import {getProfiles} from './utils/taskApi.js'

// Setting PropTypes
// This is a simple component that requires two properties (name & age)
class MyComponent extends React.Component {
    
    render(){
        return (
            <div>
                <p>Name: {this.props.name} </p>
                <p>Age: {this.props.age} </p>
                </div>
        )
    }
}

// Here is how we define the PropTypes for this component and set age to isRequired
// This will not stop the application from running normally but will create a warning
// in the console to say that a specific property was required and is undefined
MyComponent.propTypes = {
    name: React.PropTypes.string,
    age: React.PropTypes.number.isRequired
}

// We could also pass in default values to those props to ensure that our component
// works as expected. Only the values not supplied in the componenet will be replaced by
// The default values from here
MyComponent.defaultProps = {
    name: "default",
    age: 35
}

//****************************************************************************************/

// Example of wrapping componenets into Higher Order components to share functionality.
// The shared functionality is places in the wrapper HOC which in its self is a function
// that takes a component and its initial state and returns a new Class componenet
let HOCGen = (Component, state) => class extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            count: state
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                count:this.state.count + 1
            })
        }, 1000)
    }

    render() {
        return <Component {...this.props} {...this.state}/>
    }
}

//simple component 1 that will be wrapped
class Comp1 extends React.Component {

    render() {
        return(
            <div> 
                <p>Comp1</p>
                {this.props.count}
            </div>
        )
    }
}

//simple component 2 that will be wrapped
class Comp2 extends React.Component {

    render() {
        return(
            <div> 
                <p>Comp2</p>
                {this.props.count}
            </div>
        )
    }
}

//Components wrapped and now have the same setInterval counter update functionality
let WrappedComp1 = HOCGen(Comp1, 0)
let WrappedComp2 = HOCGen(Comp2, 50)

//****************************************************************************************/

// This is an example of a stateless component
class StatelessComponent extends React.Component {
    render() {
        retrun(
            <p>{this.props.hello} </p>
        )
    }
}

// This is how to create a stateless Componenet using a function that takes properties
// and returns its rendering and skipping a class. This allows for the use of the 
// arrow function and a more concise component that is easier to deal with
var StatelessComponentSimple = props => (
    <div>
        <p> I am a simple component created by {props.name} </p>
    </div>
)

//****************************************************************************************/

// This is an example of a Component that can access content Children 

class ComponentWithChildren extends React.Component{

    render(){
        console.log(this.props.children)
        return(
            <div>
                {this.props.children[1]}
            </div>
        )
    }
}

//****************************************************************************************/

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tasks: []
        }
        this.addTask = this.addTask.bind(this)
    }

    addTask(newTask){
        this.setState({
            tasks: this.state.tasks.concat([newTask])
        })
    }

    componentDidMount(){

        // Example AJAX call
        // console.log('application mounted')
        // fetch('http://localhost:3000/')
        // .then(res => res.json())
        // .then(data => {
        //     this.setState({
        //         tasks : data.tasks
        //     })
        //     console.log(data)
        // })
        // .catch(err => {
        //     console.log(err)
        // })


        // A better moduler way to do AJAX is by placing the fetching mechanisms
        // a seperate js file (in this case taskApi in utils folder) and require it
        // then handle the respose here.
        getProfiles()
            .then( data => {
                console.log(data)
                this.setState({
                    tasks : data.tasks
                } 
                , /*we can add a callback function after setState here
                    I will use it to access a referenced item Jquery style
                    */
                    ReactDOM.findDOMNode(this.refs.headingRow).focus() 
                    //or any other method than focus() that works for that particular tag
                    )

            })
    }

    render(){
        
        // Using the map function to create multiple componenets at once
        // A nice hack is to also add the index parameter and use it to 
        // define keys for the list of componenets for performance enhancement
        let tasks = this.state.tasks.map(((task, index) => {
            return (
                <SimpleTask 
                    key = {index}
                    order = {task.order}
                    task = {task.task}
                    priority = {task.priority}
                    involves = {task.involves}
                    />
            )
        }))

        return (
            <div>
                <h1> Task List </h1>
                <table>
                    {/* We can give tags a ref property to be able to access them in Jquery style access but it is 
                        a highly discouraged practice as it is better to stick the top down state flow model. 
                        Cannot be used on Functional Components*/}
                    <tr ref='headingRow'>
                        <th>task number</th><th>task description</th><th>task priority</th><th>People involved</th>
                    </tr>
                    {/* React is smart enough to understand that tasks is an array and automatically iterates through
                    its items and create the seperate components */}
                    {tasks}
                </table>
                <StatelessComponentSimple name='Amr'/>
                <AddTask addTask={this.addTask} />
                <WrappedComp1 />
                <WrappedComp2 />
                <MyComponent name={'bill'} />

                <ComponentWithChildren>
                    <WrappedComp1 />
                    <WrappedComp2 />
                </ComponentWithChildren>
            </div>
        )
    }
}