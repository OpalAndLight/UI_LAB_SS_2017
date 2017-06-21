module.exports = {
    serviceOrder: [
        {
            id: 1337,
            serviceRequest: 3,
            timestamp: "6/16/2017, 6:38:03 PM",
            technician: 241,
            plannedParts: [1,3],
            plannedTime: "13:45",
            status: "OPEN"
        },
        {
            id: 42,
            serviceRequest: 1,
            timestamp: "6/16/2017, 6:38:03 PM",
            technician: 241,
            plannedParts: [3,4],
            plannedTime: "14:60",
            status: "OPEN"
        },
    ],

    ServiceRequest: [
        {
            id: 1,
            serviceProduct: 1,
            timestamp: "15.05.2017",
            customer: 1,
            serviceType: "REPAIR",
            urgency: "HIGH",
            type: "FIELD_SERVICE",
            issueDetails: "Car won't start!"
        },
        {
            id: 2,
            serviceProduct: 2,
            timestamp: "10.05.2017",
            customer: 1,
            serviceType: "REPAIR",
            urgency: "LOW",
            type: "SERVICE_CENTER",
            issueDetails: "Car smells strange"
        },
        {
            id: 3,
            serviceProduct: 3,
            timestamp: "20.06.2017",
            customer: 2,
            serviceType: "INSPECTION",
            urgency: "MEDIUM",
            type: "SERVICE_CENTER",
            issueDetails: "Yearly security inspection"
        },
        {
            id: 4,
            serviceProduct: 4,
            timestamp: "22.06.2017",
            customer: 2,
            serviceType: "REPAIR",
            urgency: "CRITICAL",
            type: "FIELD_SERVICE",
            issueDetails: "Car is burning need URGENT HELP!!!111OneOneEleven"
        }
    ],
    customer: [
        {
            id: 1,
            name: "Hochschule Karlsruhe – Technik und Wirtschaft",
            location: [
                "49.015666",
                "8.389605999999999"
            ],
            address: "Moltkestraße 30, 76133 Karlsruhe, Deutschland",
            phone: "07219250",
            mobile: "-",
            web: "www.hs-karlsruhe.de",
            email: "info@hs-karlsruhe.de"
        },
        {
            id: 2,
            name: "Karlsruher Institut für Technologie",
            location: [
                "49.0119199",
                "8.4170303"
            ],
            address: "76131 Karlsruhe, Deutschland",
            phone: "07216080",
            mobile: "",
            web: "www.kit.edu",
            email: "info@kit.edu"
        },
        {
            id: 3,
            name: "Pädagogische Hochschule Karlsruhe",
            location: [
                "49.01324",
                "8.39326"
            ],
            address: "Bismarckstraße 10, 76133 Karlsruhe, Deutschland",
            phone: "07219253",
            mobile: "",
            web: "www.ph-karlsruhe.de",
            email: "info@ph-karlsruhe.de"
        },
        {
            id: 4,
            name: "Staatliche Akademie der Bildenden Künste Karlsruhe",
            location: [
                "49.01303",
                "8.38733"
            ],
            address: "Reinhold-Frank-Straße 67, 76133 Karlsruhe, Deutschland",
            phone: "07219265205",
            mobile: "",
            web: "www.kunstakademie-karlsruhe.de/",
            email: ""
        },
        {
            id: 5,
            name: "Rathaus West",
            location: [
                "49.0107819",
                "8.3855384"
            ],
            address: "Kaiserallee 4, 76133 Karlsruhe, Deutschland",
            phone: "07211330",
            mobile: "",
            web: "https://www.karlsruhe.de/b4/stadtverwaltung/rathaeuser/rathaus_west.de",
            email: ""
        },
        {
            id: 6,
            name: "Bundesverfassungsgericht",
            location: [
                "49.0133",
                "8.40213"
            ],
            address: "Schloßbezirk 3, 76131 Karlsruhe, Deutschland",
            phone: "072191010",
            mobile: "",
            web: "www.bundesverfassungsgericht.de",
            email: ""
        },
        {
            id: 7,
            name: "Landgericht Karlsruhe",
            location: [
                "49.012398",
                "8.3985639"
            ],
            address: "Hans-Thoma-Straße 7, 76133 Karlsruhe, Deutschland",
            phone: "07219260",
            mobile: "",
            web: "",
            email: ""
        },
        {
            id: 8,
            name: "Karlsruhe Hauptbahnhof",
            location: [
                "48.9935599",
                "8.401864"
            ],
            address: "Bahnhofpl., 76137 Karlsruhe, Deutschland",
            phone: "",
            mobile: "",
            web: "",
            email: ""
        }
    ]
}
