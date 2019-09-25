import React from 'react';

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

export default Todos;
