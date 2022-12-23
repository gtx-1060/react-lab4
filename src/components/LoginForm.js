import React from "react";
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import Card from 'react-toolbox/lib/card';

import styles from '../common.module.scss'

const LoginForm = () => {
    return (
        <Card className={styles["login-card"]}>
            <div style={{paddingBottom: 25}}>
                <Input type='text' label='Username' name='username'/>
                <Input type='password' label='Password' name='password'/>
            </div>
            <Button label='Login' raised primary></Button>
        </Card>
    );
};

export default LoginForm;