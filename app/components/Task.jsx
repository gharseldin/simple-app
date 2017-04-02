import React from 'react'

// This is a functional Stateless component, A simplified version of the Task Component
// sinc this component does not manage state and can be written in this simpler format
let simpleTask = props => (
    <tr>
        <td>{props.order}</td>
        <td>{props.task}</td>
        <td>{props.priority}</td>
        <td>
            <ul>
                {/*{this.props.involves}*/}
                {props.involves.map((person, index) => <li key={index}>{person}</li>)}
            </ul>
        </td>
    </tr>   

)

export default simpleTask

class Task extends React.Component{

    // In case we want to decide whether our component should or should not re-render
    // we should use the life cycle method as shown
    shouldComponentUpdate(nextProps, nextState){
        //make sure that the logic placed here is going to be ferquently run so 
        //the logic here should be less expensive than a regular update and re-render
        //of the component or it would be overkill!
        if (this.props.order !== nextProps.order){
            return true
        }
        if (this.props.task !== nextProps.task){
            return true
        }
        if (this.props.priority !== nextProps.priority){
            return true
        }
        if (this.props.involves !== nextProps.involves){
            return true
        }
        return false
    }

    render(){

        let peopleInvolved = this.props.involves.map((person) => {
            return (
                <li>{person}</li>
            )
        })


        return(
            <tr>
                <td>{this.props.order}</td>
                <td>{this.props.task}</td>
                <td>{this.props.priority}</td>
                <td>
                    <ul>
                        {/*{this.props.involves}*/}
                        {peopleInvolved}
                    </ul>
                </td>
            </tr>
        )
    }
}
