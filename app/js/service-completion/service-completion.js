/**
 * Created by benni on 16.06.17.
 */
const data = require('./data-static.js');

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

let mouseIsDown = false;

function initServiceCompletion() {
    console.log('Init service completion');
    setStaticData();

    let signatureCanvas = document.getElementById('signature-canvas');
    let context = signatureCanvas.getContext('2d');

    initMousePressedListeners();

    signatureCanvas.addEventListener('mousemove', function(evt) {
        let mousePos = getMousePos(signatureCanvas, evt);
        let message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        writeMessage(signatureCanvas, message);
        if (mouseIsDown) {

        }
    }, false);
}

function initMousePressedListeners(signatureCanvas) {
    signatureCanvas.onmousedown = () => {
        mouseIsDown = true
    };
    signatureCanvas.onmouseup = () => {
        mouseIsDown = false;
    }
}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function writeMessage(canvas, message) {
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}

initServiceCompletion();