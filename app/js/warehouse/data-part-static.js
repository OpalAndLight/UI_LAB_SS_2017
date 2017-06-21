module.exports = {
    part: [
        {
            id: 1,
            name: "Oil filter basic car",
            price: 9.99,
            currency: "EUR",
            unit: "PIECE",
            type: "PART",
            serviceDescription: "Standard oil filter",
            description: "Basic oil filter for cars",
            parts: []

        },
        {
            id: 2,
            name: "GPS module",
            price: 69.00,
            currency: "EUR",
            unit: "PIECE",
            type: "PART",
            serviceDescription: "GPS module",
            description: "GPS module, -148db, UART",
            parts: [3]
        },        
        {
            id: 3,
            name: "GPS antenna",
            price: 3.54,
            currency: "EUR",
            unit: "PIECE",
            type: "PART",
            serviceDescription: "GPS antenna",
            description: "GPS antenna, 10cm",
            parts: []
        },
        {
            id: 4,
            name: "Standard service",
            price: 100.00,
            currency: "EUR",
            unit: "HOUR",
            type: "SERVICE",
            serviceDescription: "Standard service",
            description: "Standard service",
            parts: []
        },
        {
            id: 5,
            name: "Inspection",
            price: 80.00,
            currency: "EUR",
            unit: "HOUR",
            type: "SERVICE",
            serviceDescription: "Inspection",
            description: "Inspection",
            parts: []
        },
        {
            id: 6,
            name: "Screw 8x12",
            price: 12.00,
            currency: "EUR",
            unit: "BOX",
            type: "PART",
            serviceDescription: "Screw 8x12mm",
            description: "Screw 8x12mm",
            parts: []
        },                
    ]
};