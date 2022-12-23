import React, {useState} from "react";
import styles from '../common.module.scss'
import IconButton from "react-toolbox/lib/button";

const RadioIconGroup = (props) => {
    const elements = [...new Set(props.values)]
    const [active, setActive] = useState(props.values[0]);
    const handleClick = (value) => {
        if (value===active)
            return;
        setActive(value);
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
                {elements.map(value => (
                    <IconButton key={value} primary={active===value} mini floating
                                onMouseUp={(e) => handleClick(value)}>
                        {value}
                    </IconButton>
                ))}
            </div>
        </div>
    );
};

export default RadioIconGroup;