import React from 'react';
import { useForm } from './useForm';

function Login({ onLogin }) {

    const defaultInputs = {
        email: '',
        password: ''
    };
    const { values, handleChange } = useForm(defaultInputs);

    function handleSubmit(event) {
        event.preventDefault();

        onLogin(values);
    }

    return (
        <main className="content">
            <section className="login">
                <h2 className="login__title">Вход</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <fieldset className="login__inputs">
                        <input type="email" name="email" value={values.email} onChange={handleChange} className="login__input" placeholder="E-mail" required />
                        <input type="password" name="password" value={values.password} onChange={handleChange} className="login__input" placeholder="Пароль" required />
                    </fieldset>
                    <button type="submit" aria-label="Войти" className="login__button">Войти</button>
                </form>
            </section>
        </main>
    );
}

export default Login;