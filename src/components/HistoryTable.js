import React from "react";
import styles from '../common.module.scss'
import { Card, CardTitle } from "react-toolbox/lib/card";
import {useSelector} from "react-redux";

const HistoryTable = (props) => {
    const points = useSelector(state => state.points.points);

    return (
        <div>
            <table className={styles["result-table"]} border="2">
                <tbody>
                    <tr>
                        <td><b>Время старта</b></td>
                        <td><b>Время выполнения (мc)</b></td>
                        <td><b>Координата X</b></td>
                        <td><b>Координата Y</b></td>
                        <td><b>Значение R</b></td>
                        <td><b>Попадание</b></td>
                    </tr>
                        {points.map((e) => (
                            <tr key={e.id}>
                                <td>{e.processingTime}</td>
                                <td>{e.workTime}</td>
                                <td>{e.x}</td>
                                <td>{e.y}</td>
                                <td>{e.r}</td>
                                <td>{e.hit}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryTable;