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
                      "id": 5,
                      "name": "Lot 5",
                      "type": "Service",
                      "ServiceOrderID": 23,
                      status: "SERVICE",

                  },
                  {
                      "id": 8,
                      "name": "Lot 8",
                      "type": "Service",
                      "ServiceOrderID": 2,
                      status: "SERVICE",

                  }

              ],
          },
            {
                "id": 5,
                "name": "ServiceCenter Five",
                "status": ["", ""],
                "address": "Address",
                "phone": "01234234",
                "mobile": "",
                "web": "www.service-five.com",
                "email": "five@service.com",
                "location": ["49.0004058","8.3782908"],
                "lot": [
                    {
                        "id": 1,
                        "name": "Lot 1",
                        "type": "Service",
                        "ServiceOrderID": 123,
                        status: "SERVICE",

                    },
                    {
                        "id": 2,
                        "name": "Lot 2",
                        "type": "Service",
                        "ServiceOrderID": 0,
                        status: "FREE",

                    }

                ],
            },

        ],
        "serviceOrder": [
                {
                    "id": 123,
                    "serviceType": "",
                    "urgency": "",
                    "timestamp": "",
                    "technicianID": "0",
                    "plannedParts": ["", ""],
                    "plannedTime": "",
                    "status": "OPEN"
                },
                {
                    "id": 125,
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
