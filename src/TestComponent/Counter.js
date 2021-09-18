import React, { Component } from 'react';
import Session from 'react-session-api'
import In from './IncreaseButton'
import De from './DecreaseButton'
class Counter extends Component {
    constructor() {
        super()
        this.state = {
            counter: 0
        }
    }

    componentDidMount() {
        const counter = data => {
            this.setState({ counter: data["counter"] });
        };

        Session.onSet(counter);
    }
    render() {
        return (
           <div>
               <h1>{this.state.counter}</h1>
               <In/>
               <De/>
           </div>
        )
    }
}

export default Counter;