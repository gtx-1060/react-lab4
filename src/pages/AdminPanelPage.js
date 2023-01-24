import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import Card from "react-toolbox/lib/card";
import styles from "../common.module.scss";
import HistoryTable from "../components/HistoryTable";
import Input from "react-toolbox/lib/input";
import {changeCurrentY, fetchUsersPoints, sendPoint} from "../store/pointSlice";
import {useDispatch, useSelector} from "react-redux";
import Button from "react-toolbox/lib/button";
import StatusDisplay from "../components/StatusDisplay";

const AdminPanelPage = () => {
    const [username, setUsername] = useState("");
    const error = useSelector(state => state.points.error);
    const dispatch = useDispatch();
    return (
        <div>
            <Header showExit/>
            <Card className={styles["common-card"]}>
                <div style={{marginBottom: 30, maxWidth: 300}}>
                    <Input value={username} onChange={setUsername} label={'Имя пользователя'} />
                    <Button label='Поиск' onClick={(e) => {dispatch(fetchUsersPoints(username))}}
                            raised primary className={styles["button"]}/>
                    <StatusDisplay mode={"error"} show={error} text={error?.text ?? ""}/>
                </div>
                <HistoryTable/>
            </Card>
        </div>
    );
};

export default AdminPanelPage;