import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Greeting from './components/Greeting';
import Todos from './components/Todos';

class App extends React.Component {

    render() {
        return (
            <div>
                <Greeting />
                <Todos />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

