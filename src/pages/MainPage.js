import React, {useEffect} from 'react'
import styles from "../common.module.scss"
import Header from "../components/Header";
import Card from "react-toolbox/lib/card";
import RadioIconGroup from "../components/RadioIconGroup";
import Input from "react-toolbox/lib/input";
import Button from "react-toolbox/lib/button";
import Graph from "../components/Graph";
import HistoryTable from "../components/HistoryTable";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentR, changeCurrentX, changeCurrentY, clearError, fetchPoints, sendPoint} from "../store/pointSlice";
import {useNavigate} from "react-router-dom";
import StatusDisplay from "../components/StatusDisplay";
import {batmanImage} from "../utils";

const X_VALUES = ["-3", "-2", "-1", "0", "1", "2", "3", "4", "5"];
const R_VALUES = ["1", "2", "3", "4", "5"];

const MainPage = () => {
    const point = useSelector(state => state.points.currentPoint);
    const error = useSelector(state => state.points.error);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPoints());
    }, []);

    useEffect(() => {
        if (error?.code === 401) {
            dispatch(clearError());
            navigate("/login");
        }
    }, [error])

    return (
        <div>
            <Header showExit/>
            <div className={styles["content"]}>
                <div className={styles["graph-block"]}>
                    <Card className={styles["common-card"]} style={{flex: 1, minWidth: 200}}>
                        <StatusDisplay mode={"error"} show={error} text={error?.text ?? ""}/>
                        <Graph imageElement={batmanImage}/>
                    </Card>

                    <Card className={styles["common-card"]} style={{flex: 2, minWidth: 300}}>
                        <div>
                            <RadioIconGroup title={"Значение X"} onChange={(x) => dispatch(changeCurrentX({x}))}
                                            values={X_VALUES} chosen={point.x.toString()}/>
                            <div style={{marginBottom: 15, maxWidth: 300, marginTop: 20}}>
                                <Input value={point.y.toString()} onChange={(y) => dispatch(changeCurrentY({y}))}
                                       label={'Значение Y'} type={"number"} />
                            </div>
                            <RadioIconGroup title={"Значение R"} onChange={(r) => dispatch(changeCurrentR({r}))}
                                            values={R_VALUES} chosen={point.r.toString()}/>
                        </div>

                        <div style={{marginTop: 25}}>
                            <Button label='Проверить' onClick={(e) => {dispatch(sendPoint())}}
                                    raised primary className={styles["button"]}/>
                        </div>
                    </Card>
                </div>

                <Card className={styles["common-card"]}>
                    <HistoryTable/>
                </Card>
            </div>
        </div>
    );
};

export default MainPage;