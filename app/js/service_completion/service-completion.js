/**
 * Created by benni on 16.06.17.
 */
const data = require('./data-static.js');

let pos = {x: 0, y: 0};

function setStaticData() {
    let serviceCompletionId = document.getElementById('service-completion-id');
    let serviceOrder = document.getElementById('service-order');
    let serviceCreation = document.getElementById('service-creation');
    let serviceUsedParts = document.getElementById('service-used-parts');
    let serviceRealTime = document.getElementById('service-real-time');
    let serviceRemarks = document.getElementById('service-remarks');

    serviceCompletionId.innerHTML = data.serviceCompletion.id;
    serviceOrder.innerHTML = data.serviceCompletion.serviceOrder;
    serviceCreation.innerHTML = data.serviceCompletion.creation;
    serviceUsedParts.innerHTML = data.serviceCompletion.usedParts;
    serviceRealTime.innerHTML = data.serviceCompletion.realTime;
    serviceRemarks.innerHTML = data.serviceCompletion.remarks;
}

function initServiceCompletion() {
    console.log('Init service completion');
    setStaticData();
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
    };

    let clearBtn = document.getElementById('signature-clear-btn');
    clearBtn.onclick = () => {
        context.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
    };
}

function saveCanvasToImg(canvas) {
    data.serviceCompletion.signature = canvas.toDataURL("image/png");
    console.log('signature as png: ', data.serviceCompletion.signature);
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

    context.lineWidth = 3;
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.moveTo(pos.x, pos.y); // from
    pos = getMousePos(canvas, e);
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