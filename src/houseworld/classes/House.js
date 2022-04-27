const Light = require('./devices/Light')
const Thermostat = require('./devices/Thermostat')
const Alarm = require('./devices/Alarm')
const Tracker = require('./devices/Tracker')
const Room = require('./Room')
const Person = require('./Person.js')

class House {

    constructor () {

        this.utilities = {
            electricity: {consumption: 0} 
        }

        this.people = {
            jim: new Person (this, 'jim', 'master_bedroom'),
            sara: new Person (this, 'sara', 'master_bedroom'),
            luke: new Person (this, 'luke', 'child_bedroom')
        }

        this.devices = {
            lights: {
                l0: new Light(this,'open_space'),
                l1: new Light(this,'service_bathroom'),
                l2: new Light(this,'child_bedroom'),
                l3: new Light(this,'master_bedroom'),
                l4: new Light(this,'walkin_closet'),
                l5: new Light(this,'main_bathroom'),
                l6: new Light(this,'closet'),
                l7: new Light(this,'disengagement'),
                l8: new Light(this,'outside'),
                l9: new Light(this,'stairs')
            },
            thermostats: {
                t0: new Thermostat(this),
                t1: new Thermostat(this),
                t2: new Thermostat(this),
                t3: new Thermostat(this),
                t4: new Thermostat(this),
                t5: new Thermostat(this),
                t6: new Thermostat(this),
                t7: new Thermostat(this)
            },
            alarm: {
                a0: new Alarm(this,'ground',true),
                a1: new Alarm(this, 'first', false),
                a2: new Alarm(this, 'other', true)
            },
            tracker: new Tracker(this)
        }

        this.rooms = { 
            open_space: new Room(this,'open_space',['outside','service_bathroom', 'stairs'],'ground',this.devices.lights['l0'], this.devices.thermostats['t0']),
            service_bathroom: new Room(this,'service_bathroom',[],'ground',this.devices.lights['l1'], this.devices.thermostats['t1']),
            child_bedroom: new Room(this,'child_bedroom',[],'first',this.devices.lights['l2'], this.devices.thermostats['t2']),
            master_bedroom: new Room(this,'master_bedroom',[],'first',this.devices.lights['l3'], this.devices.thermostats['t3']),
            walkin_closet: new Room(this,'walkin_closet',[],'first',this.devices.lights['l4'], this.devices.thermostats['t4']),
            main_bathroom: new Room(this,'main_bathroom',[],'first',this.devices.lights['l5'], this.devices.thermostats['t5']),
            closet: new Room(this,'closet',[],'first',this.devices.lights['l6'], this.devices.thermostats['t6']),
            disengagement: new Room(this,'disengagement',['stairs','child_bedroom','master_bedroom','walkin_closet','closet','main_bathroom'],'first',this.devices.lights['l7'], this.devices.thermostats['t7']),
            outside: new Room(this,'outside',[],'other',this.devices.lights['l8']),
            stairs: new Room(this,'stairs',[],'other',this.devices.lights['l9'])
        }

        this.people.jim.observe('in_room', (v, k)=>{
            this.devices.tracker.update()
            console.log('in_room jim ' + v)
        })
        this.people.sara.observe('in_room', (v, k)=>{
            this.devices.tracker.update()
            console.log('in_room sara ' + v)
        })
        this.people.luke.observe('in_room', (v, k)=>{
            this.devices.tracker.update()
            console.log('in_room luke ' + v)
        })
    }
}

module.exports = House