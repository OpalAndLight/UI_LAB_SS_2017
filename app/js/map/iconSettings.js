let settings = {
    warehouses: {
        BUILDING: {
            icon: 'building',
            color: 'blue'
        },
        VEHICLE: {
            icon: 'car',
            color: 'blue'
        },
        _default: {
            icon: 'question',
            color: 'blue'
        }
    },
    serviceProduct: {
        CAR: {
            icon: 'car',
            color: 'red'
        },
        TRUCK: {
            icon: 'truck',
            color: 'red'
        },
        SENSOR: {
            icon: 'microchip',
            color: 'red'
        },
        _default: {
            icon: 'question',
            color: 'red'
        }
    },
    serviceCenter: {
        _default: {
            icon: 'home',
            color: 'green'
        }
    },
    customer: {
        _default: {
            icon: 'user',
            color: 'orange'
        }
    },
    _default: {
        _default: {
            icon: 'question',
            color: 'lightgray'
        }
    }
}

module.exports = {
    get(category, type) {
        // set default values if not in settings
        if (! (category in settings)) {
            category = '_default'
        }
        if (! (type in settings[category])) {
            type = '_default'
        }

        return settings[category][type]
    }
}
