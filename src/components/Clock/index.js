import React from 'react';

function FormatDate(props) {
    return <em>{props.date.toLocaleTimeString()}</em>;
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };
    }

    componentDidMount() {
        this.timerId = setInterval(this.tick,
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    tick = () => {
        this.setState({
            date: new Date(),
        });
    }

    render() {
        return <h2>It's so good to see you at <FormatDate date={this.state.date} /></h2>;
    }
}

export default Clock;
