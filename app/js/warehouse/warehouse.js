const TableFilter = require('tablefilter');
const tf_base_path = "../../node_modules/tablefilter/dist/tablefilter/";

const partsData = require("./data-part-static.js");
const warehouses = require("../map/data-static.js");
const warehouseParts = require("./data-warehousePart-static.js");

partsMap = new Map(partsData.part.map(x => [x.id, x]));
warehouseMap = new Map(warehouses.warehouses.map(x => [x.id, x]));

let tableBody = document.getElementById('warehouse-table').tBodies[0];

let tf = new TableFilter('warehouse-table', {
    base_path: tf_base_path,
    auto_filter: true,
    auto_filter_delay: 100, //milliseconds
    filters_row_index: 1,
    state: true,
    alternate_rows: true,
    rows_counter: true,
    btn_reset: true,
    status_bar: true,
    paging: {
        results_per_page: ['Records: ', [10, 25, 50, 100]]
    },
    extensions:[{
        name: 'sort'
    }],
    col_types: [
        'number', 'string',
        'number', 'string',
        'none', 'none',
    ],
    col_widths: [
        "80px", "150px",
        "80px", "150px",
        "50px", "50px",
    ],
    msg_filter: 'Filtering...',
    col_3: 'select',
    col_4: 'none',
    col_5: 'none'
});


$(document).ready(populateTable);

function populateTable() {
    tableBody.innerHTML = "";   
    
    for (let [index, part] of warehouseParts.warehousePart.entries()) {
        let name = partsMap.get(part.part).name;
        let count = part.quantity;
        let wh = warehouseMap.get(part.warehouse).name;
        let info = `data-toggle="modal" data-id=${part.part} title="Show info for this item" class="open-InfoDialog" href="#infoDialog"`;
        let add = `data-toggle="modal" data-id=${part.part} data-index=${index} title="Change amount" class="open-AddDialog" href="#addDialog"`;
        tableBody.innerHTML +=
            `<tr>
                <td align="right">${part.part}</td>
                <td>${name}</td>
                <td align="right">${count}</td>
                <td>${wh}</td>
                <td align="center">
                    <a ${info}><span class="glyphicon glyphicon-info-sign"></span></a>
                </td>
                <td align="center">
                    <a ${add}"><span class="glyphicon glyphicon-plus-sign"></span></a>
                </td>
            </tr>`;
    };    
    tf.init();

}

$(document).on("click", ".open-InfoDialog", function() {
    let partId = $(this).data('id');
    let part = partsMap.get(partId);
    $(".modal-body #partId").val(partId);
    $(".modal-body #partName").val(part.name);
    $(".modal-body #partPrice").val(part.price + " " + part.currency);
    $(".modal-body #partUnit").val(part.unit);
    $(".modal-body #partServiceDescription").val(part.serviceDescription);
    $(".modal-body #partDescription").val(part.description);
});

$(document).on("click", ".open-AddDialog", function() {
    let partId = $(this).data('id');
    let part = partsMap.get(partId);
    let warehousePartsIndex = $(this).data('index');
    $(".modal-body #partName").val(part.name);
    $(".modal-body #partIndex").val(warehousePartsIndex);
});

$("#btnAdd").on('click', function() {
    let partIndex = $("#partIndex").val();
    let partAmount = $("#partAmount").val();

    warehouseParts.warehousePart[partIndex].quantity += parseInt(partAmount);
    console.log(warehouseParts.warehousePart[partIndex].quantity);
    populateTable();

    $("#addDialog").modal("toggle");
});

$("#btnCancel").on('click', function() {
    $("#addDialog").modal("toggle");
});