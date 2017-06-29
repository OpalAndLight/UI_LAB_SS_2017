module.exports = {
    "lot": {
        "serviceCenter":[
          {
              "id": 1,
              "name": "ServiceCenter One",
              "status": ["", ""],
              "address": "Address",
              "phone": "01234234",
              "mobile": "",
              "web": "www.service-five.com",
              "email": "five@service.com",
              "location": ["49.009283", "8.403921"],
              "lot": [
                  {
                      "id": 1,
                      "name": "Lot 1",
                      "type": "INSPECTION",
                      "ServiceOrderID": 1337,
                      status: "SERVICE",

                  },
                  {
                      "id": 2,
                      "name": "Lot 2",
                      "type": "REPAIR",
                      "ServiceOrderID": 42,
                      status: "SERVICE",

                  },
                  {
                      "id": 3,
                      "name": "Lot 3",
                      "type": "FREE",
                      "ServiceOrderID": 0,
                      status: "FREE",

                  },
                  {
                      "id": 4,
                      "name": "Lot 4",
                      "type": "FREE",
                      "ServiceOrderID": 0,
                      status: "FREE",

                  }

              ],
          }
        ],
        "serviceOrder": [
                {
                    "id": 1337,
                    "serviceType": "",
                    "urgency": "",
                    "timestamp": "6/16/2017, 6:38:03 PM",
                    "technicianID": "241",
                    "plannedParts": [1,3],
                    "plannedTime": "13:45",
                    "status": "OPEN"
                },
                {
                    "id": 42,
                    "serviceType": "",
                    "urgency": "",
                    "timestamp": "",
                    "technicianID": "0",
                    "plannedParts": ["", ""],
                    "plannedTime": "",
                    "status": "CLOSED"
                }
        ]
        }
};
