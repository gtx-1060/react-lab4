import React, {useEffect, useRef, useState} from "react";
import styles from '../common.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentX, changeCurrentY, sendPoint} from "../store/pointSlice";

const figuresColor = "#96aae7"
const cursorColor = "#92eba0"
const cellsColor = "#3c3c4d"
const hitColor = "#de0d45"

const Graph = (props) => {
    const canvasRef = useRef(null);
    const dispatch = useDispatch();
    const points = useSelector(state => state.points.points);
    const currentPoint = useSelector(state => state.points.currentPoint);
    let [filteredPoints, setFilteredPoints] = useState([]);

    useEffect(()=> {
        setFilteredPoints(points.filter(e => e.r.toString() === currentPoint.r));
        console.log(filteredPoints);
    }, [points, currentPoint]);

    const onCanvasClick = (event) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const rect = event.target.getBoundingClientRect();
        let frame = getFrame();
        dispatch(changeCurrentX({
                x: ((event.clientX - rect.left - frame.centerX) / frame.halfRX / 2 * currentPoint.r).toString()
        }));
        dispatch(changeCurrentY({
            y: ((frame.sizeY - (event.clientY - rect.top) - frame.centerY) / frame.halfRY / 2 * currentPoint.r).toString()
        }));
        dispatch(sendPoint());
    }

    const redraw = () => {
        let frame = getFrame();

        // init canvas
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = frame.sizeX
        canvas.height = frame.sizeY
        console.log(points);
        draw(context, frame, currentPoint.r);
        filteredPoints.forEach((e) => {
            drawDot(
                context,
                frame.centerX + e.x * (frame.halfRX * 2 / currentPoint.r),
                frame.centerY - e.y * (frame.halfRY * 2 / currentPoint.r),
                e.hit === "+" ? hitColor : cellsColor
            );
        });
    };

    useEffect(() => {
        redraw();
    }, [filteredPoints, currentPoint]);

    useEffect(() => {
        window.addEventListener('resize', redraw);
        return () => {
            window.removeEventListener('resize', redraw);
        }
    }, [])

    return (
        <div>
            <canvas ref={canvasRef} onClick={onCanvasClick} className={styles["graph-canvas"]}/>
        </div>
    );
};

function drawDot(ctx, x, y, color) {
    console.log("12312");
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();
}

function draw(ctx, frame, r) {
    ctx.fillStyle = figuresColor
    ctx.strokeStyle = cellsColor
    ctx.lineWidth = 2
    ctx.font = "15px serif";

    // Четверть круга
    ctx.beginPath()
    ctx.moveTo(frame.centerX-frame.halfRX*2, frame.centerY)
    ctx.arc(frame.centerX, frame.centerY, frame.halfRX*2, Math.PI,  Math.PI*1.5, false)
    ctx.lineTo(frame.centerX, frame.centerY)
    ctx.lineTo(frame.centerX - frame.halfRX*2, frame.centerY)
    ctx.fill()
    ctx.closePath()

    // Прямоугольник
    ctx.beginPath()
    ctx.moveTo(frame.centerX, frame.centerY)
    ctx.lineTo(frame.centerX, frame.centerY - frame.halfRY*2)
    ctx.lineTo(frame.centerX + frame.halfRX, frame.centerY - frame.halfRY*2)
    ctx.lineTo(frame.centerX + frame.halfRX, frame.centerY)
    ctx.lineTo(frame.centerX, frame.centerY)
    ctx.fill()
    ctx.closePath()

    // Триугольник
    ctx.beginPath()
    ctx.moveTo(frame.centerX, frame.centerY)
    ctx.lineTo(frame.centerX, frame.centerY + frame.halfRY*2)
    ctx.lineTo(frame.centerX - frame.halfRX, frame.centerY)
    ctx.lineTo(frame.centerX, frame.centerY)
    ctx.fill()
    ctx.closePath()

    ctx.fillStyle = cellsColor
    // Оси
    ctx.beginPath()
    ctx.moveTo(frame.centerX, frame.sizeY)
    ctx.lineTo(frame.centerX, 0)
    ctx.moveTo(0, frame.centerY)
    ctx.lineTo(frame.sizeX, frame.centerY)
    ctx.closePath();
    ctx.stroke();

    // стрелка оси Y
    ctx.beginPath()
    ctx.lineTo(frame.centerX - 5, 8)
    ctx.lineTo(frame.centerX + 5, 8)
    ctx.lineTo(frame.centerX, 0)
    ctx.closePath()
    ctx.fill()

    // стрелка оси X
    ctx.beginPath()
    ctx.lineTo(frame.sizeX, frame.centerY)
    ctx.lineTo(frame.sizeX - 8, frame.centerY + 5)
    ctx.lineTo(frame.sizeX - 8, frame.centerY - 5)
    ctx.lineTo(frame.sizeX, frame.centerY)
    ctx.closePath()
    ctx.fill()

    // Разметка оси Y
    ctx.beginPath()
    // R/2
    ctx.moveTo(frame.centerX - 3, frame.centerY - frame.halfRY)
    ctx.lineTo(frame.centerX + 3, frame.centerY - frame.halfRY)
    ctx.fillText((r/2).toString(), frame.centerX + 8, frame.centerY - frame.halfRY);
    // R
    ctx.moveTo(frame.centerX - 3, frame.centerY - 2*frame.halfRY)
    ctx.lineTo(frame.centerX + 3, frame.centerY - 2*frame.halfRY)
    ctx.fillText(r.toString(), frame.centerX + 8, frame.centerY - 2*frame.halfRY);
    // -R/2
    ctx.moveTo(frame.centerX - 3, frame.centerY + frame.halfRY)
    ctx.lineTo(frame.centerX + 3, frame.centerY + frame.halfRY)
    ctx.fillText((-r/2).toString(), frame.centerX + 8, frame.centerY + frame.halfRY);
    // -R
    ctx.moveTo(frame.centerX - 3, frame.centerY + 2*frame.halfRY)
    ctx.lineTo(frame.centerX + 3, frame.centerY + 2*frame.halfRY)
    ctx.fillText((-r).toString(), frame.centerX + 8, frame.centerY + 2*frame.halfRY);

    // Разметка оси X
    // -R
    ctx.moveTo(frame.centerX - 2*frame.halfRX, frame.centerY - 3)
    ctx.lineTo(frame.centerX - 2*frame.halfRX, frame.centerY + 3)
    ctx.fillText((-r).toString(), frame.centerX - 2*frame.halfRX, frame.centerY - 8);
    // -R/2
    ctx.moveTo(frame.centerX - frame.halfRX, frame.centerY - 3)
    ctx.lineTo(frame.centerX - frame.halfRX, frame.centerY + 3)
    ctx.fillText((-r/2).toString(), frame.centerX - frame.halfRX, frame.centerY - 8);
    // R/2
    ctx.moveTo(frame.centerX + frame.halfRX, frame.centerY - 3)
    ctx.lineTo(frame.centerX + frame.halfRX, frame.centerY + 3)
    ctx.fillText((r/2).toString(), frame.centerX + frame.halfRX, frame.centerY - 8);
    // R
    ctx.moveTo(frame.centerX + 2*frame.halfRX, frame.centerY - 3)
    ctx.lineTo(frame.centerX + 2*frame.halfRX, frame.centerY + 3)
    ctx.fillText(r.toString(), frame.centerX + 2*frame.halfRX, frame.centerY - 8);
    ctx.closePath()
    ctx.stroke()
}

function getFrame() {
    const sizeX = window.innerWidth > 650 ? window.innerWidth * 0.21 : window.innerWidth * 0.65
    const sizeY = sizeX

    const centerX = sizeX / 2
    const centerY = sizeY / 2
    const halfRX = (sizeX*0.8) / 4
    const halfRY = (sizeY*0.8) / 4

    return {sizeX, sizeY, centerX, centerY, halfRX, halfRY}
}

export default Graph;