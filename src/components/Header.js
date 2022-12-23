import React from "react";
import style from '../common.module.scss'
import { Card, CardTitle } from "react-toolbox/lib/card";

const Header = () => {
    return (
        <header>
            <Card className={style["header"]}>
                <CardTitle
                    avatar="https://placeimg.com/80/80/animals"
                    title="Ненов Владислав"
                    subtitle="Группа 32082, Вариант 5613"
                />
            </Card>
        </header>
    );
};

export default Header;