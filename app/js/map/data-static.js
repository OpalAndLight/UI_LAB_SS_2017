module.exports = {
    warehouses: [
        {
            id: 1,
            name: "Main Warehouse",
            type: "BUILDING",
            location: [49.006837, 8.403578]
        },
        {
            id: 2,
            name: "Service Van 001",
            type: "VEHICLE",
            location: [49.011574, 8.387636]
        },
        {
            id: 3,
            name: "Service Van 002",
            type: "VEHICLE",
            location: [49.007999, 8.409891]
        }
    ],
    serviceProduct: [
        {
            id: 1,
            serialNumber: "KA-HSKA-C-1000001",
            name: "E-Car",
            description: "Basic City E-Car",
            activationDate: "01.05.2017 14:00:00",
            bom: [1,2,3,6],
            documents: [1,2,3],
            type: "CAR",
            location: [49.010819, 8.417338]
        },
        {
            id: 2,
            serialNumber: "KA-HSKA-T-1000002",
            name: "E-Truck M",
            description: "Basic City E-Truck Mini 7,5T",
            activationDate: "01.05.2017 14:00:00",
            bom: [1,2,3,6],
            documents: [1,2,3],
            type: "TRUCK",
            location: [48.992298, 8.402091]
        },
        {
            id: 3,
            serialNumber: "KA-HSKA-S-20001",
            name: "Temparature Sensor",
            description: "Temparature Sensor",
            activationDate: "01.05.2017 14:00:00",
            bom: null,
            documents: [100],
            type: "SENSOR",
            location: [49.005426, 8.386955]
        },
    ],
    serviceCenter: [],
    customer: [],
}
