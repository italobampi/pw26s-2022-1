import React from "react";

export class UserSignupPage extends React.Component {
    state = {
        displayName: '',
        username: '',
        password: '',
        passwordRepeat: '',
    }

    onChangeDisplayName = (event) => {
        const value = event.target.value;
        this.setState({ displayName: value });
    }
    onChangeUsername = (event) => {
        const value = event.target.value;
        this.setState({ username: value });
    }
    onChangePassword = (event) => {
        const value = event.target.value;
        this.setState({ password: value });
    }
    onChangePasswordRepeat = (event) => {
        const value = event.target.value;
        this.setState({ passwordRepeat: value });
    }

    onClickSignup = () => {
        this.props.actions.postSignup();
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <div>
                    <input type="text" placeholder="Informe o seu nome"
                        onChange={this.onChangeDisplayName}
                        value={this.state.displayName} />
                </div>
                <div>
                    <input type="text" placeholder="Informe o usuário"
                        onChange={this.onChangeUsername}
                        value={this.state.username} />
                </div>
                <div>
                    <input type="password" placeholder="Informe a sua senha"
                        onChange={this.onChangePassword}
                        value={this.state.password} />
                </div>
                <div>
                    <input type="password" placeholder="Confirme sua senha"
                        onChange={this.onChangePasswordRepeat}
                        value={this.state.passwordRepeat} />
                </div>
                <div>
                    <button onClick={this.onClickSignup}>Cadastrar</button>
                </div>
            </div>
        );
    }
}
UserSignupPage.defaultProps = {
    actions: {
        postSignup: () =>
            new Promise((resolve, reject) => {
                resolve({});
            })
    }
}
export default UserSignupPage;