import React, {Component} from 'react';

class Counter2 extends Component {
	shouldComponentUpdate(nextProps) {
		if (nextProps.count2 !== this.props.count2) return true;
		else return false;
	}
	render() {
		console.log("calling Counter2")
		return (
			<div>
				<h1>Counter Multiplier: {this.props.count2}</h1>
				<button onClick={this.props.onClick}>Multiplier</button>
			</div>
		)
	}
}

export default Counter2;