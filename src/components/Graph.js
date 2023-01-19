import React, {useEffect, useRef, useState} from "react";
import styles from '../common.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentX, changeCurrentY, changeWindowWidth, sendPoint} from "../store/pointSlice";
import {getFrame, drawCoordinatePlane, drawDot, defaultColor, hitColor} from "../utils";
import StatusDisplay from "./StatusDisplay";

const Graph = (props) => {
    const dispatch = useDispatch();
    const points = useSelector(state => state.points.points
        .filter(e => e.r.toString() === state.points.currentPoint.r));
    const currentPoint = useSelector(state => state.points.currentPoint);
    const canvasRef = useRef(null);

    useEffect(
        () => {
            props.imageElement.onload = () => {
                console.log("onload set");
                redraw();
            };
        }, []
    );

    const redraw = () => {
        if (!props.imageElement.complete)
            return;
        console.log("redraw");

        // init frame
        let activeFrame = getFrame();
        // init canvas
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = activeFrame.sizeX;
        canvas.height = activeFrame.sizeY;

        const k = 0.1225 * (activeFrame.sizeX / 335);
        context.drawImage(
            props.imageElement,
            activeFrame.halfRX / 2, // x start
            activeFrame.halfRY*(0.5 + 1), // y start
            props.imageElement.width * k,   // width
            props.imageElement.height * k    // height
        );
        drawCoordinatePlane(context, activeFrame, currentPoint.r);
        points.forEach((e) => {
            drawDot(
                context,
                activeFrame.centerX + e.x * (activeFrame.halfRX * 2 / currentPoint.r),
                activeFrame.centerY - e.y * (activeFrame.halfRY * 2 / currentPoint.r),
                e.hit === "+" ? hitColor : defaultColor
            );
        });
    };
    useEffect(redraw, [currentPoint, points]);

    const onCanvasClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        let frame = getFrame();
        dispatch(changeCurrentX({
                x: (((event.clientX-8) - rect.left - frame.centerX) / frame.halfRX / 2 * currentPoint.r).toString()
        }));
        dispatch(changeCurrentY({
            y: ((frame.sizeY - (event.clientY-8 - rect.top) - frame.centerY) / frame.halfRY / 2 * currentPoint.r).toString()
        }));
        dispatch(sendPoint());
    }

    const onResize = () => dispatch(changeWindowWidth({'windowWidth' : window.innerWidth}));
    useEffect(() => {
        console.log("listener set");
        window.addEventListener('resize', onResize);
        return () => {
            console.log("listener unset");
            window.removeEventListener('resize', onResize);
        }
    }, []);

    return (
        <div style={{alignContent: "center"}}>
            <canvas ref={canvasRef} onClick={onCanvasClick} className={styles["graph-canvas"]}/>
        </div>
    );
};

export default Graph;