/**
 * Created by benni on 16.06.17.
 */
let data = require('./data-static.js');
const partsData = require('./data-parts-static.js');

let pos = {x: 0, y: 0};

function setData(serviceOrder) {
    let serviceCompletionId = document.getElementById('service-completion-id');
    let serviceOrderId = document.getElementById('service-order');
    let serviceCreation = document.getElementById('service-creation');
    let serviceRealTimeHours = document.getElementById('service-real-time-hours');
    let serviceRealTimeMinutes = document.getElementById('service-real-time-minutes');
    let serviceRemarks = document.getElementById('service-remarks');
    let completeButton = document.getElementById('complete-btn');

    let id = Math.floor(Math.random() * (10000 - 1000) + 1000);

    let servicePlannedTimeSplit = serviceOrder.plannedTime.split(':');
    let plannedTimeHours = servicePlannedTimeSplit[0];
    let plannedTimeMinutes = servicePlannedTimeSplit[1];

    serviceCompletionId.innerHTML = id;
    serviceOrderId.innerHTML = serviceOrder.id;
    serviceCreation.innerHTML = new Date().toLocaleString();
    serviceRealTimeHours.value = plannedTimeHours;
    serviceRealTimeMinutes.value = plannedTimeMinutes;

    completeButton.onclick = () => {
        let serviceCompletion = {
            id: id,
            serviceOrder: serviceOrder.id,
            creation: serviceCreation.innerHTML,
            usedParts: getUsedParts(),
            realTime: serviceRealTimeHours.value + ":" + serviceRealTimeMinutes.value,
            remarks: serviceRemarks.value,
            signature:  document.getElementById('signature-canvas').toDataURL("image/png")
        };
        serviceOrder.status = "FINISHED";
        console.log(serviceCompletion);
    }
}

let getSelectedPartIds = function () {
    return [...document.getElementById('parts-select').options]
        .filter(option => option.selected)
        .map(option => Number(option.value));
};

let getUsedParts = function () {
    return partsData.parts.filter(i => getSelectedPartIds().some(j => i.id === j));
};

function initServiceCompletion(serviceOrder) {
    setData(serviceOrder);
    let signatureCanvas = document.getElementById('signature-canvas');
    let context = signatureCanvas.getContext('2d');
    let partsModalCloseBtn = document.getElementById('parts-modal-close-btn');
    let partsSelect = document.getElementById('parts-select');

    let usedPartsHtml = document.getElementById('used-parts');

    function removePart(elem) {
        let selectedPartIds = [...partsSelect.options].forEach((option) => {
            if (elem.value === Number(option.value)) {
                option.selected = false;
            }
        });
        partSelectionChanged();
    }

    function setUsedParts(usedParts) {
        let result = "";
        usedParts.forEach((part) => {
            result += `<li value="${part.id}" class="list-group-item part-list-item">${part.name}
                 <a class="glyphicon glyphicon-remove btn-right btn-part-delete"></a></li>`;
        });
        usedPartsHtml.innerHTML = result;
        $(".part-list-item").each(function (index, value) {
            value.onclick = () => {
                removePart(value);
            }
        })
    }

    function partSelectionChanged() {
        let usedParts = getUsedParts(getSelectedPartIds);
        setUsedParts(usedParts);
    }

    partsModalCloseBtn.onclick = () => {
        partSelectionChanged();
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

initServiceCompletion(data.serviceOrder);