import React, {useState} from "react";
import styles from '../common.module.scss'
import IconButton from "react-toolbox/lib/button";

const RadioIconGroup = (props) => {
    const handleClick = (value) => {
        if (value===props.chosen)
            return;
        props.onChange(value);
    };
    return (
        <div style={{marginBottom: 15}}>
            <h4>{props.title}</h4>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10
            }}>
                {props.values.map(value => (
                    <IconButton key={value} primary={props.chosen===value} mini floating
                                onMouseUp={(e) => handleClick(value)}>
                        {value}
                    </IconButton>
                ))}
            </div>
        </div>
    );
};

export default RadioIconGroup;