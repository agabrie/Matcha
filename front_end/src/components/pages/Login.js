import React, {Component} from 'react';

class Login extends Component{
    render() {
        return (
            <div>
                <form>
                    <input type="email" name="email" placeholder="name@example.com"/>
                    <input type="password" name="password" placeholder="password"/>
                </form>
                <button type="submit"> Submit </button>
            </div>
        );
    }
}

export default Login;