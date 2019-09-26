import React from 'react';

const Todo = ({
    value,
    id,
    isEditing,
    handleSelect = () => { },
    handleChange = () => { },
    handleKeyUp = () => { },
    handleDelete = () => { }
}) => {
    let valueEl = value;
    if (isEditing) {
        valueEl = <input type="text" defaultValue={value} onChange={handleChange} onKeyUp={handleKeyUp} />;
    }
    return (<li onDoubleClick={() => handleSelect(id)}>
        {valueEl}
        <button onClick={() => handleDelete(id)}>x</button>
    </li>)
}

class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            newValue: '',
            nextKey: 0,
            editKey: undefined,
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

    handleSelect = (key) => {
        this.setState((state) => {
            return {
                editKey: key,
            };
        });
    }

    handleItemChange = (event) => {
        const value = event.target.value;
        this.setState((state) => {
            return {
                todos: state.todos.map((todo) => {
                    if (todo.key === state.editKey) {
                        todo.value = value;
                    }
                    return todo;
                }),
            };
        });
    }

    handleItemKeyUp = (event) => {
        if (event.key === 'Enter') {
            this.setState({ editKey: undefined });
        }
    }

    render() {
        const { todos } = this.state;

        return (<div>
            <h2>TODOs</h2>
            <ul>
                {todos.map(({ value, key }) => <Todo value={value} id={key} key={key}
                    handleDelete={this.handleDelete}
                    handleSelect={this.handleSelect}
                    isEditing={this.state.editKey === key}
                    handleChange={this.handleItemChange}
                    handleKeyUp={this.handleItemKeyUp}
                />)}
            </ul>
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Add new item" value={this.state.newValue} onChange={this.handleChange} />
                <button type="submit">Add</button>
            </form>
        </div>);
    }
}

export default Todos;
