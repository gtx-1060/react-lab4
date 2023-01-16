import React from "react";

const StatusDisplay = (props) => {
    const colors = {
        "error": 'red',
        "info": "#6495ED"
    }
    const messages = {
        "error": "Ошибка! ",
        "info": ""
    }
    return (
        <div>
            {props?.show &&
                <span style={{padding: 10, display: "table", margin: "0 auto", textAlign: "center", color: colors[props.mode ?? "#6495ED"]}}>
                <b>{messages[props.mode] ?? ""}</b> {props?.text ?? ""}</span>
            }
        </div>
    );
};

export default StatusDisplay;