import React, {Component} from 'react';

class Counter extends Component {
	shouldComponentUpdate(nextProps) {
		console.log(nextProps)
		if (nextProps.count!== this.props.count) return true;
		else return false;
	}
	render() {
		console.log("render Counter1")
		return (
			<div>
				<h1>Counter: {this.props.count}</h1>
				<button onClick={this.props.onClick}>increase</button>
			</div>
		)
	}
}

export default Counter
