const Observable =  require('../../utils/Observable')

class Room extends Observable{

    constructor (house, name, doors, floor, light, thermostat){
        super(Room)
        this.house = house
        this.name = name
        this.doors_to = doors
        this.floor = floor
        this.thermostat = thermostat
        this.light = light
        this.set('temperature',19)
        this.locked = false
    }

    updateTemperature(){
        if (this.thermostat.status && !this.thermostat.reached){
            this.temperature += 1 // increase temperature if thermostat is on and has not reached temperature
        } else {
            this.temperature -= 1 // decrease temprature otherwise
        }
    }
    
}

module.exports = Room