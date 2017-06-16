/**
 * Created by benni on 16.06.17.
 */

let mouseIsDown = false;

function initServiceCompletion() {
    console.log('Init service completion');
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