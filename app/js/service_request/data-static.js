module.exports = {
    serviceRequest: {
        id: 1,
        serviceProduct: {
            id: 3, 
            serialNumber: "KA-HSKA-S-20001",
            name: "Temparature Sensor",
            description: "Temparature Sensor",
            activationDate: "2017-05-01T14:00:00.00Z",
            bom: [], 
            documents: [],
            type: "SENSOR",
            location: { lat: "49.015666", long: "8.387412" }
        },
        customer: {
            id: 1,
            name: "HSKA",
            address: "Moltkestraße 30, Karlsruhe",
            phone: "0721 0001",
            mobile: "0172 0001",
            web: "https://www.hs-karlsruhe.de",
            email: "info@hs-karlsruhe.de"
        },
        serviceType: "REPAIR", 
        urgency: "HIGH",
        type: "FIELD_SERVICE",
        creationDate: "2017-06-15T18:00:00.00Z",
        issueDetails: {
            errorCode: 404, 
            description: "No data",
            timestamp: "2017-06-15T14:00:00.00Z",
            reason: "No temperature"
        }
    },
    technicians: [
        {
            id: 1,
            name: "Max Mustermann",
            email: "mm@hska.de",
            phone: "+49 0721 1",
            mobile: "+49 0172 1"
        },
        {
            id: 2,
            name: "Hannelore Musterfrau",
            email: "hm@hska.de",
            phone: "+49 0721 2",
            mobile: "+49 0172 2"
        },
    ]
};