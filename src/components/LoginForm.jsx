import React from 'react';
import FormContainer from './common/FormContainer';
import FormInput from './common/FormInput';
import Joi from 'joi';
import FormButton from './common/FormButton';

class LoginForm extends FormContainer {
    state = {
        data: {
            email: "",
            password: "",
        },
        errors: {

        }
    }

    schema = {
        email: Joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
            .label("Email"),
        password: Joi
            .string()
            .min(6)
            .max(30)
            .required()
            .label("Password"),
    };

      /**
     * @override Submit the registration form
     */
    doSubmit = async () => {
        alert("test")
    }

    render() { 
        return (  
            <div className = "container w-50 mt-3 light">
                 <form onSubmit = {this.handleSubmit}>
                     <h1>Login</h1>

                    <FormInput 
                        name = 'email'
                        type = 'text'
                        handler = {this.handleChange}
                        label = "Email Address"
                        error = {this.state.errors['email']}
                    />

                    <FormInput 
                        name = 'password'
                        type = 'password'
                        handler = {this.handleChange}
                        label = "Password"
                        error = {this.state.errors['password']}
                    />

                    <FormButton 
                        classList = ""
                        checkValidity = {this.validateAll}
                        label = {"Submit"}
                        onSubmit = {this.handleSubmit}
                    />
                </form>

                <p className = "text-center">
                    Forgot your password? Click here to reset
                </p>
            </div>
        );
    }
}
 
export default LoginForm;