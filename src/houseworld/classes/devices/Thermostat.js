const Observable =  require('../../../utils/Observable')
const Clock =  require('../../../utils/Clock')

class Thermostat extends Observable{

    constructor(house) {
        super(Thermostat)
        this.house = house
        this.temperature = 21
        this.reached = false
        this.starth = 0
        this.startm = 0
        this.consumption = 500
        this.set('status', false)
    }

    turnOn(){
        if (!this.status) {
            this.status = true
            console.log("" + this.room.name + " thermostat on")
        }
        else{
            console.log("" + this.room.name + " thermostat already on")
        }
    }

    turnOff(){
        if (this.status) {
            this.status = true
            console.log("" + this.room + " thermostat off")
        }
        else{
            console.log("" + this.room + " thermostat already off")
        }
    }

    computeElecricityConsumption(Clock){
        if (this.status){
            let elapsed_h = Clock.global.hh - this.start_hh
            let elapsed_m = 0
            if (Clock.global.hh > this.start_hh){
                elapsed_m = 60 - this.start_mm + Clock.global.mm
            } else {
                elapsed_m = Clock.global.mm - this.start_mm
            }
            this.house.utilities.electricity += this.consumption*elapsed_h + ((this.consumption/60)*elapsed_m) // update house energy consumption
            // reset time keeper
            this.start_hh = Clock.global.hh
            this.start_mm = Clock.global.mm
        }   
    }
    
}

module.exports = Thermostat