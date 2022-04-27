const Observable =  require('../../../utils/Observable')
const Clock =  require('../../../utils/Clock')

class Light extends Observable{

    constructor(house,room) {
        super(Light)
        this.house = house
        this.room = room
        this.intensity = 'low'
        this.colour = 'warm'
        this.start_hh = 0
        this.start_mm = 0
        this.set('status', false)
        this.consumption = 15000
        this.Clock = Clock.global
    }

    turnOn(){
        if (!this.status) {
            this.status = true
            console.log("" + this.room + " light on")
        }
        else{
            console.log("" + this.room + " light already on")
        }
        this.start_hh = Clock.global.hh
        this.start_mm = Clock.global.mm
    }

    turnOff(){
        if (this.status) {
            this.computeElecricityConsumption()
            this.status = true
            console.log("" + this.room + " light off")
        }
        else{
            console.log("" + this.room + " light already off")
        }
    }

    setColour(col){
        this.colour = col
        console.log("" + this.room + " light colour set to " + this.colour)
    }

    setIntensity(intens){
        this.intensity = intens
        console.log("" + this.room + " light intensity set to " + this.intensity)
    }
    
    computeElecricityConsumption(Clock){
        if (this.status){
            let elapsed_h = this.Clock.hh - this.start_hh
            let elapsed_m = 0
            if (this.Clock.hh > this.start_hh){
                elapsed_m = 60 - this.start_mm + this.Clock.mm
            } else {
                elapsed_m = this.Clock.mm - this.start_mm
            }
            this.house.utilities.electricity += this.consumption*elapsed_h + ((this.consumption/60)*elapsed_m) // update house energy consumption
            // reset time keeper
            this.start_hh = this.Clock.hh
            this.start_mm = this.Clock.mm
        }   
    }
}

module.exports = Light