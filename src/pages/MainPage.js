import React, {useEffect, useState} from 'react'
import styles from "../common.module.scss"
import Header from "../components/Header";
import Card from "react-toolbox/lib/card";
import RadioIconGroup from "../components/RadioIconGroup";
import Input from "react-toolbox/lib/input";
import Button from "react-toolbox/lib/button";
import Graph from "../components/Graph";
import HistoryTable from "../components/HistoryTable";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentR, changeCurrentX, changeCurrentY, fetchPoints, sendPoint} from "../store/pointSlice";
const MainPage = () => {
    const y = useSelector(state => state.points.currentPoint.y);
    const dispatch = useDispatch();
    console.log(`y is ${y}`);
    useEffect(() => {
        dispatch(fetchPoints());
    }, []);

    return (
        <div>
            <Header/>
            <div className={styles["content"]}>
                <div className={styles["graph-block"]}>
                    <Card className={styles["common-card"]} style={{flex: 1, minWidth: 200}}>
                        <Graph />
                    </Card>

                    <Card className={styles["common-card"]} style={{flex: 2, minWidth: 300}}>
                        <div>
                            <RadioIconGroup title={"Значение X"} onChange={(x) => dispatch(changeCurrentX({x}))}
                                            values={["-3", "-2", "-1", "0", "1", "2", "3", "4", "5"]}/>
                            <div style={{marginBottom: 15, maxWidth: 300, marginTop: 20}}>
                                <Input value={y.toString()} onChange={(y) => dispatch(changeCurrentY({y}))}
                                       label={'Значение Y'} type={"number"} />
                            </div>
                            <RadioIconGroup title={"Значение R"} onChange={(r) => dispatch(changeCurrentR({r}))}
                                            values={["1", "2", "3", "4", "5"]}/>
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