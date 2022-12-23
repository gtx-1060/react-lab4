import React, {useState} from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

import styles from "../common.module.scss"
const LoginPage = () => {
    return (
        <div>
            <Header/>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;