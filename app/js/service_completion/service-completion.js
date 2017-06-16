/**
 * Created by benni on 16.06.17.
 */
const data = require('./data-static.js');

let pos = {x: 0, y: 0};

function setStaticData() {
    let serviceCompletionId = document.getElementById('service-completion-id');
    let serviceOrder = document.getElementById('service-order');
    let serviceCreation = document.getElementById('service-creation');
    let partNames = document.getElementById('part-names');
    let serviceRealTimeHours = document.getElementById('service-real-time-hours');
    let serviceRealTimeMinutes = document.getElementById('service-real-time-minutes');
    let serviceRemarks = document.getElementById('service-remarks');

    let completeButton = document.getElementById('complete-btn');


    data.serviceCompletion.creation = new Date().toLocaleString();

    let serviceRealTimeDataHours;
    let serviceRealTimeDataMinutes;

    if (data.serviceCompletion.realTime === "") {
        serviceRealTimeDataHours = "0";
        serviceRealTimeDataMinutes = "0";
    } else {
        let serviceRealTimeSplit = data.serviceCompletion.realTime.split(':');
        serviceRealTimeDataHours = serviceRealTimeSplit[0];
        serviceRealTimeDataMinutes = serviceRealTimeSplit[1];
    }

    serviceCompletionId.innerHTML = data.serviceCompletion.id;
    serviceOrder.innerHTML = data.serviceCompletion.serviceOrder;
    serviceCreation.innerHTML = data.serviceCompletion.creation;
    partNames.innerHTML = data.serviceCompletion.usedParts;
    serviceRealTimeHours.value = serviceRealTimeDataHours;
    serviceRealTimeMinutes.value = serviceRealTimeDataMinutes;
    serviceRemarks.value = data.serviceCompletion.remarks;
}

function initServiceCompletion() {
    console.log('Init service completion');
    setStaticData();
    let signatureCanvas = document.getElementById('signature-canvas');
    let context = signatureCanvas.getContext('2d');
    let partsModalCloseBtn = document.getElementById('parts-modal-close-btn');
    let partsSelect = document.getElementById('parts-select');

    function updateUsedParts() {
        let partsList = [...partsSelect.options]
            .filter(option => option.selected)
            .map(option => option.value);
        console.log('selected parts: ', partsList);
    }

    partsModalCloseBtn.onclick = () => {
        updateUsedParts();
    };

    signatureCanvas.addEventListener('mousemove', function (evt) {
        let mousePos = getMousePos(signatureCanvas, evt);
        draw(evt, context, signatureCanvas);
        let message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
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

initServiceCompletion();