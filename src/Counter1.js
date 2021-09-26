import React, { Component } from "react";

class Counter extends Component {
  state = { data: "Lisa", date: new Date(), counter: 10 };

  shouldComponentUpdate(nextProps) {
    if (nextProps.count !== this.props.num) return true;
    else return false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.num !== this.props.num) {
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    this.props.setNum(0);
    clearInterval(this.timerID);
  }

  tick = () => {
    this.setState({
      date: new Date(),
    });
  };
  render() {
    return (
      <div>
        <h1>Counter: {this.props.num}</h1>
        <h2>Time: {this.state.date.toLocaleTimeString()}</h2>
        <h3>Your name is {this.state.data}</h3>
        <input
          value={this.state.data}
          onChange={(e) =>
            this.setState(() => {
              return { data: e.target.value };
            })
          }
        />
        <button
          onClick={() => this.props.setNum(this.state.counter + this.props.num)}
        >
          increase
        </button>
      </div>
    );
  }
}

export default Counter;
