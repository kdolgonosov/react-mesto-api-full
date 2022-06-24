import Header from './Header';
import FormWithTitle from './FormWithTitle';
import InfoTooltip from './InfoTooltip';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import authApi from '../utils/AuthApi';

function Register({ handleRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resIsOk, setResIsOk] = useState(undefined);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    function onRegister(e) {
        e.preventDefault();
        authApi
            .signUp(email, password)
            .then((res) => {
                if (res === false) {
                    setResIsOk(false);
                    setIsInfoTooltipOpen(true);
                } else {
                    setResIsOk(true);
                    setIsInfoTooltipOpen(true);
                }
            })
            .catch((err) => console.log('Ошибка', err));
    }
    function onCloseInfoTooltip() {
        setIsInfoTooltipOpen(false);
        resIsOk && handleRegister();
    }
    return (
        <>
            <Header>
                <Link className="header__btn" to="/sign-in">
                    Войти
                </Link>
            </Header>
            <div className="auth">
                <FormWithTitle
                    titleClassName="auth__title"
                    title="Регистрация"
                    formClassName="pop-up__form"
                    onSubmit={onRegister}
                    submitBtnClassName="auth__submit-btn"
                    btnTitle="Зарегистрироваться"
                >
                    <input
                        type="email"
                        className="auth__input"
                        placeholder="Email"
                        required
                        minLength="2"
                        maxLength="30"
                        onChange={handleEmailChange}
                        value={email}
                    />
                    <input
                        type="password"
                        className="auth__input"
                        placeholder="Пароль"
                        required
                        onChange={handlePasswordChange}
                        value={password}
                    />
                </FormWithTitle>
                <span className="auth__span">
                    Уже зарегистрированы?{' '}
                    <Link className="auth__span-link" to="/sign-in">
                        Войти
                    </Link>
                </span>
            </div>
            <InfoTooltip
                isOpen={isInfoTooltipOpen}
                onClose={onCloseInfoTooltip}
                resIsOk={resIsOk}
            />
        </>
    );
}
export default Register;
