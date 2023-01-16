import React, {useState} from "react";
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import Card from 'react-toolbox/lib/card';

import styles from '../common.module.scss'
import StatusDisplay from "./StatusDisplay";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const displayError = async (response) => {
        let errorMsg = "Неизвестная ошибка";
        try {
            const body = await response.text();
            console.log(body);
            errorMsg = body;
            errorMsg = JSON.parse(body)["detail"];
        } catch (e) { }
        setError(errorMsg);
    }

    const onLoginClick = async () => {
        const response = await fetch(
            "http://localhost:3030/auth/login",
            {
                credentials: 'include',
                method: 'POST',
                headers : {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `username=${username}&password=${password}`
            }
        );
        if (response.ok) {
            navigate("/home");
        } else {
            await displayError(response);
        }
    };

    const onRegisterClick = async () => {
        const payload = {
            "username": username,
            "password": password
        };
        const response =  await fetch(
            "http://localhost:3030/api/users",
            {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        );
        if (response.ok) {
            setError("");
            const body = await response.json();
            setMessage(`Вы зарегистрированы, ${body["username"]}`);
        }
        else
            await displayError(response);
    };

    return (
        <Card className={styles["login-card"]}>
            <div style={{paddingBottom: 25}}>
                <Input value={username} onChange={setUsername} type='text' label='Логин' name='username'/>
                <Input value={password} onChange={setPassword} type='password' label='Пароль' name='password'/>
            </div>
            <Button label='Войти' raised primary onClick = {onLoginClick}></Button>
            <Button label='Регистрация' raised onClick = {onRegisterClick}></Button>
            <StatusDisplay mode={"error"} show={error} text={error}/>
            <StatusDisplay show={message} text={message}/>
        </Card>
    );
};

export default LoginForm;