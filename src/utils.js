const figuresColor = "#96aae7"
const defaultColor = "#3c3c4d"
const hitColor = "#de0d45"

function drawDot(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();
}

function draw(ctx, frame, r) {
    ctx.strokeStyle = defaultColor
    ctx.lineWidth = 2
    ctx.font = "15px serif";
    ctx.fillStyle = defaultColor

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

export {getFrame, draw, drawDot, defaultColor, hitColor}