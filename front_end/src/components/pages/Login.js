import React, {Component} from 'react';

class Login extends Component{
    render() {
        return (
            <div>
                <form>
                    <input type="email" name="email" placeholder="name@example.com"/><br/>
                    <input type="password" name="password" placeholder="password"/><br/>
                    <button type="submit"> Submit </button>
                </form>
                <br/>
            </div>
        );
    }
}

export default Login;