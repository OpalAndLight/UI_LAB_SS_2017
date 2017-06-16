/**
 * Created by philipp on 16.06.17.
 */
module.exports = {
    serviceCompletion: {
        id: 1337,
        serviceOrder: 432,
        creation: "",
        usedParts: [
            {
                id: 42,
                name: "Door 720-CS",
                price: "499,00",
                currency: "EUR",
                unit: "PIECE",
                type: "PART",
                parts: [ {
                        id: 43,
                        name: "Window 720-CS",
                        price: "299,00",
                        currency: "EUR",
                        unit: "PIECE",
                        type: "PART"
                    }
                ]
            },
            {
                id: 2352,
                name: "Door montage",
                price: "60,23",
                currency: "EUR",
                unit: "HOUR",
                type: "SERVICE",
                serviceDescription: "Door installation",
                description: "The left front door has been replaced due to significant damage.",
                parts: []
            }
        ],
        realTime: "",
        remarks: "Rust damage on all parts caused a substantial delay.",
        signature: ""
    }
};