import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Name(props) {
    return <em>{props.user.firstName} {props.user.lastName}</em>;
}

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

function Todo({ value, id, handleDelete = () => { } }) {
    return <li>{value} <button onClick={() => handleDelete(id)}>x</button></li>
}


class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            newValue: '',
            nextKey: 0,
        }
    }

    handleChange = (event) => {
        this.setState({ newValue: event.target.value });
    }

    handleSubmit = (event) => {
        this.setState((state) => {
            return {
                todos: state.todos.concat({ value: state.newValue, key: state.nextKey }),
                newValue: '',
                nextKey: state.nextKey + 1,
            };
        });
        event.preventDefault();
    }

    handleDelete = (key) => {
        this.setState((state) => {
            return {
                todos: state.todos.filter((todo) => todo.key !== key),
            };
        });
    }

    render() {
        const { todos } = this.state;

        return (<div>
            <h2>TODOs</h2>
            <ul>
                {todos.map(({ value, key }) => <Todo value={value} id={key} key={key} handleDelete={this.handleDelete} />)}
            </ul>
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Add new item" value={this.state.newValue} onChange={this.handleChange} />
                <button type="submit">Add</button>
            </form>
        </div>);
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: props.firstName,
                lastName: props.lastName,
            },
            hasChanged: false,
            todos: [],
        };
    }

    changeFirstName = (event) => {
        const val = event.target.value;
        this.setState((state) => {
            const hasChanged = !(val === App.defaultProps.firstName && state.user.lastName === App.defaultProps.lastName);
            return {
                user: {
                    firstName: val,
                    lastName: state.user.lastName,
                },
                hasChanged: hasChanged,
            };
        });

    }

    changeLastName = (event) => {
        const val = event.target.value;
        this.setState((state) => {
            const hasChanged = !(val === App.defaultProps.lastName && state.user.firstName === App.defaultProps.firstName);
            return {
                user: {
                    firstName: state.user.firstName,
                    lastName: val,
                },
                hasChanged: hasChanged,
            };
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, <Name user={this.state.user} />!!!</h1>
                {this.state.hasChanged ? (
                    <Clock />
                ) : (
                        <h4>Please enter your name below</h4>
                    )}
                <form>
                    <input type="text" value={this.state.user.firstName} onChange={this.changeFirstName} />
                    <input type="text" value={this.state.user.lastName} onChange={this.changeLastName} />
                </form>
                <Todos />
            </div>
        );
    }
}
App.defaultProps = {
    firstName: 'Dan',
    lastName: 'Abramov'
}
ReactDOM.render(<App />, document.getElementById('root'));

