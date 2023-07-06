import React from 'react';
import { Link } from "react-router-dom";
import { useForm } from './useForm';
function Register({ onRegistration }) {

    const defaultInputs = {
        email: '',
        password: ''
    };
    const { values, handleChange } = useForm(defaultInputs);

    function handleSubmit(event) {
        event.preventDefault();

        onRegistration(values);
    }

    return (
        <main className="content">
            <section className="login">
                <h2 className="login__title">Регистрация</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <fieldset className="login__inputs">
                        <input type="email" name="email" value={values.email} onChange={handleChange} className="login__input" placeholder="E-mail" required />
                        <input type="password" name="password" value={values.password} onChange={handleChange} className="login__input" placeholder="Пароль" required />
                    </fieldset>
                    <button type="submit" aria-label="Войти" className="login__button">Зарегистрироваться</button>
                </form>
                <Link className="login__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
            </section>
        </main>
    );
}

export default Register;