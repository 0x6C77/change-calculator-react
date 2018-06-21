import React, { Component } from "react";

class CoinCalculator extends React.Component {
    constructor() {
        super();

        this._regex = /^£?(\d+)(?:\.(\d*))?p?$/i;
        this._coins = [
            {value: 200, text: '£2'}, {value: 100, text: '£1'}, {value: 50, text: '50p'},
            {value: 20, text: '20p'}, {value: 10, text: '10p'}, {value: 5, text: '5p'},
            {value: 2, text: '2p'}, {value: 1, text: '1p'}];

        this.state = {
            change: 0
        };

        this._handleChange = this._handleChange.bind(this);
    }

    // Takes users input, validates and calculates correct change
    _handleChange(event) {
        // Reset state
        this.setState({
            change: null,
            error: null
        });

        if (event.target.value) {
            this._calculateChange(event.target.value);
        }
    }

    // Convert a given string into its corresponding value in pennies
    _calculateChange(value) {
        try {
            let amount = this._convertToPennies(value),
                change = this._calculateCoins(amount);

            this.setState({
                change: change
            });
        } catch(error) {
            this.setState({
                error: error
            });
        }
    }

    // Convert a given string into its corresponding value in pennies
    _convertToPennies(input) {
        let amount,
            parts = input.match(this._regex);
        
        // Invalid input
        if (parts === null) {
            throw 'Invalid amount entered';
        }

        // If only the number before the decimal is present assume it is pence,
        // unless otherwise stated
        if (typeof parts[2] == "undefined" && input.charAt(0) !== '£') {
            amount = parseFloat(parts[1], 10);
        } else {
            // Rebuild and parse parts into valid float
            amount = parseFloat(parts[1] + '.' + parts[2], 10);
            
            // Round amount to correct precisison
            amount = amount.toFixed(2);

            // Covert amount into pennies
            amount = amount * 100;
        }

        return amount;
    }

    // Take an integer and return an array of the smallest denomination of coins
    _calculateCoins(amount) {
        let change = [];

        for (let coin of this._coins) {
            if (coin.value > amount) {
                continue;
            }

            let quantitiy = Math.floor(amount / coin.value);
            change.push({coin: coin.text, quantitiy: quantitiy});

            amount -= coin.value * quantitiy;
        }

        return change;
    };

    render() {
        let output;
        if (this.state.change) {
            output = this.state.change.map((change, index) => (
                <li key={index}>{ change.quantitiy } x { change.coin }</li>
            ))
        }

        return (
            <div className="change-calculator">
                {this.state.error && <div className="error">{ this.state.error }</div>}
                <input type="text" onChange={this._handleChange} placeholder="Insert amount"/>
                {output && <ul class="change-calculator-output">
                    { output }
                </ul>}
            </div>
        );
    }
}

export default CoinCalculator;