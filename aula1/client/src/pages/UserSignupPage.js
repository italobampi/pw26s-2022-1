import React from "react";

export class UserSignupPage extends React.Component {

    render() {
        return(
            <div>
                <h1>Sign Up</h1>
                <div>
                    <input type="text" placeholder="Informe o seu nome" />
                </div>
                <div>
                    <input type="text" placeholder="Informe o usuário" />
                </div>
                <div>
                    <input type="password" placeholder="Informe a sua senha" />
                </div>
                <div>
                    <input type="password" placeholder="Confirme sua senha" />
                </div>
                <div>
                    <button>Cadastrar</button>
                </div>
            </div>
        );
    }
}
export default UserSignupPage;