/**
 * Created by benni on 16.06.17.
 */

let pos = {x: 0, y: 0};

function initServiceCompletion() {
    console.log('Init service completion');
    let signatureCanvas = document.getElementById('signature-canvas');
    let context = signatureCanvas.getContext('2d');

    signatureCanvas.addEventListener('mousemove', function (evt) {
        let mousePos = getMousePos(signatureCanvas, evt);
        draw(evt, context, signatureCanvas);
        let message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        //writeMessage(signatureCanvas, message);
    }, false);

    signatureCanvas.onmousedown = (e) => {
        draw(e, context, signatureCanvas);
    }

    let clearBtn = document.getElementById('signature-clear-btn');
    clearBtn.onclick = () => {
        context.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
    }
}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function draw(e, context, canvas) {
    // mouse left button must be pressed
    if (e.buttons !== 1) {
        pos = getMousePos(canvas, e);
        return;
    }
    context.beginPath(); // begin

    context.lineWidth = 5;
    context.lineCap = 'round';
    context.strokeStyle = '#c0392b';
    context.moveTo(pos.x, pos.y); // from
    console.log('from :', pos.x, pos.y);
    pos = getMousePos(canvas, e);
    console.log('to :', pos.x, pos.y);
    context.lineTo(pos.x, pos.y); // to

    context.stroke(); // draw it!
}

function writeMessage(canvas, message) {
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '14pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}

initServiceCompletion();