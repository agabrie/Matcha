import React, {Component} from 'react';

class Register extends Component{
    render() {
        return (
            <div>
                <form>
                    <input type="text" name="name" placeholder="Firstname"/>
                    <input type="text" name="surname" placeholder="Lastname"/>
                    <input type="email" name="email" placeholder="name@example.com"/>
                    <input type="text" name="display_name" placeholder="Display name"/>
                    <input type="password" name="password" placeholder="password"/>
                    <input type="password" name="passwordcon" placeholder="Confirm password"/>
                </form>
                <button type="submit"> Submit </button>
            </div>
        );
    }
}

export default Register;