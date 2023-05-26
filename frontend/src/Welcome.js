import React from "react"
import Tester from "./Tester"

class Welcome extends React.Component{


    render(){

        return (
            <React.Fragment>
                <div>Welcome Component {this.props.info}</div>
                <div>Welcome again {this.props.another}</div>
                <button onClick={() => this.props.greetingProp('jerry')}>Say Hello</button>
                <Tester></Tester>
            </React.Fragment>
        )
        
    


    }

}


export default Welcome