import React from "react";
import style from '../common.module.scss'
import { Card, CardTitle } from "react-toolbox/lib/card";
import Button from "react-toolbox/lib/button";
import {useNavigate} from "react-router-dom";

const Header = (props) => {
    const navigate = useNavigate();
    const onLogoutClick = async () => {
        const response = await fetch(
            "http://localhost:3030/auth/logout",
            {
                credentials: 'include',
                method: 'GET',
            }
        );
        if (response.ok)
            navigate("/login");
    };

    return (
        <header>
            <Card className={style["header"]}>
                <CardTitle
                    avatar="https://placeimg.com/80/80/animals"
                    title="Ненов Владислав"
                    subtitle="Группа 32082, Вариант 5613"
                />
                {
                    props.showExit &&
                    <div style={{right: 20, top: 23, position: "absolute"}}>
                        <Button label={"Выйти"} onClick={onLogoutClick} raised />
                    </div>
                }
            </Card>
        </header>
    );
};

export default Header;