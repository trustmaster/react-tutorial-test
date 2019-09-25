import React from 'react';
import Clock from '../Clock';

function Name(props) {
    return <em>{props.user.firstName} {props.user.lastName}</em>;
}

class Greeting extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: props.firstName,
                lastName: props.lastName,
            },
            hasChanged: false,
        };
    }

    changeFirstName = (event) => {
        const val = event.target.value;
        this.setState((state) => {
            const hasChanged = !(val === Greeting.defaultProps.firstName && state.user.lastName === Greeting.defaultProps.lastName);
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
            const hasChanged = !(val === Greeting.defaultProps.lastName && state.user.firstName === Greeting.defaultProps.firstName);
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
            </div>
        );
    }
}

Greeting.defaultProps = {
    firstName: 'Dan',
    lastName: 'Abramov'
};

export default Greeting;
