import React, { Component } from "react";
import ChangeCalculator from "./ChangeCalculator.js";

class App extends Component{
    constructor() {
        super();
        this.title = 'Change calculator';
    }

    render(){
        return(
            <div className="app">
                <h1>{ this.title }</h1>
                <ChangeCalculator />
            </div>
        );
    }
}

export default App;