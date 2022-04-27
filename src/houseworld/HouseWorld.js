const Clock =  require('../utils/Clock')
const Agent = require('../bdi/Agent')
const House = require('./classes/House')
const {SenseMovementsGoal, SenseMovementsIntention} = require('./intentions/MovementSensor')
const {ManageLightsGoal, ManageLightsIntention} = require('./intentions/LightManager')

var house = new House()

// hourly update of consumption and temperature 
Clock.global.observe('hh', (key, hh) =>{
    for (let [key_l, light] of Object.entries(house.devices.lights)){
        light.computeElecricityConsumption(Clock)
    }
    for (let [key_t, therm] of Object.entries(house.devices.thermostats)){
        therm.computeElecricityConsumption(Clock)
    }
    for (let [key_r,room] of Object.entries(house.rooms)){
        if (key_r != 'outside' && key_r != 'stairs'){
            room.updateTemperature()
        }
    }
})


// Daily schedule
Clock.global.observe('mm', (key, mm) => {
    var time = Clock.global
    if(time.hh==6 && time.mm==0 && time.dd <5)
        house.people.jim.in_room = 'main_bathroom'
    if (time.hh==6 && time.mm==30 && time.dd <5)
        house.people.jim.in_room = 'open_space'
    if (time.hh==7 && time.mm==0 && time.dd <5){
        house.people.sara.in_room = 'main_bathroom'
        house.people.luke.in_room = 'main_bathroom'
        house.people.jim.in_room = 'outside'
    }
    if (time.hh==7 && time.mm==30 && time.dd <5){
        house.people.sara.in_room = 'open_space'
        house.people.luke.in_room = 'open_space'
    }
    if (time.hh==8 && time.mm==0 && time.dd <5)
        house.people.luke.in_room = 'outside'
    if (time.hh==9 && time.mm==0 && time.dd <5)
        house.people.sara.in_room = 'outside'
    if (time.hh==9 && time.mm==0 && time.dd >=5){
        house.people.sara.in_room = 'main_bathroom'
        house.people.jim.in_room = 'main_bathroom'
    }
    if (time.hh==10 && time.mm==0 && time.dd >=5){
        house.people.sara.in_room = 'open_space'
        house.people.jim.in_room = 'open_space'
        house.people.luke.in_room = 'main_bathroom'
    } 
    if (time.hh==10 && time.mm==0 && time.dd <5){
        house.people.jim.in_room = 'open_space'
        house.people.luke.in_room = 'open_space'
    }
    if (time.hh==10 && time.mm==30 && time.dd >=5){
        house.people.luke.in_room = 'open_space'
    } 
    if (time.hh==14 && time.mm==30 && time.dd >=5){
        house.people.sara.in_room = 'master_bedroom'
        house.people.jim.in_room = 'master_bedroom'
        house.people.luke.in_room = 'child_bedroom'
    } 
    if (time.hh==16 && time.mm==0 && time.dd >=5){
        house.people.sara.in_room = 'open_space'
        house.people.jim.in_room = 'open_space'
        house.people.luke.in_room = 'open_space'
    } 
    if (time.hh==17 && time.mm==0 && time.dd == 6){
        house.people.sara.in_room = 'outside'
        house.people.jim.in_room = 'outside'
        house.people.luke.in_room = 'outside'
    } 
    if (time.hh==18 && time.mm==0 && time.dd <5){
        house.people.sara.in_room = 'open_space'
    }
    if (time.hh==20 && time.mm==0 && time.dd == 6){
        house.people.sara.in_room = 'open_space'
        house.people.jim.in_room = 'open_space'
        house.people.luke.in_room = 'open_space'
    }
    if (time.hh==20 && time.mm==30)
        house.people.luke.in_room = 'main_bathroom'
    if(time.hh==21 && time.mm==0)
        house.people.luke.in_room = 'child_bedroom'
    if (time.hh==21 && time.mm==30){
        house.people.sara.in_room = 'main_bathroom'
        house.people.luke.in_room = 'main_bathroom'
    }    
    if (time.hh==22 && time.mm==30){
        house.people.sara.in_room = 'master_bedroom'
        house.people.jim.in_room = 'master_bedroom'
    }
})

// Agent instantiation
var lightAgent = new Agent('lightAgent')

lightAgent.intentions.push(SenseMovementsIntention)
lightAgent.intentions.push(ManageLightsIntention)

lightAgent.postSubGoal(new SenseMovementsGoal([house.people.jim,house.people.sara,house.people.luke], [house.rooms.open_space, house.rooms.service_bathroom,house.rooms.child_bedroom,house.rooms.master_bedroom,
    house.rooms.walkin_closet,house.rooms.main_bathroom,house.rooms.closet,house.rooms.disengagement,house.rooms.outside,house.rooms.stairs]))
lightAgent.postSubGoal(new ManageLightsGoal([house.devices.lights.l0,house.devices.lights.l1,house.devices.lights.l2,house.devices.lights.l2,
    house.devices.lights.l4,house.devices.lights.l5,house.devices.lights.l6,house.devices.lights.l7,house.devices.lights.l8,house.devices.lights.l9]))

Clock.startTimer() 