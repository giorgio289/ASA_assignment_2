const Goal = require('../../bdi/Goal');
const Intention = require('../../bdi/Intention');
const Clock =  require('../../utils/Clock')

class ManageLightsGoal extends Goal {

    constructor (lights= []) {
        super()
        this.lights = lights
    }

}

class ManageLightsIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        this.lights = this.goal.lights
        this.Clock = Clock.global
    }
    
    static applicable (goal) {
        return goal instanceof ManageLightsGoal
    }

    *exec () {
        var lightsGoals = []
        for (let l of this.lights) {       
            let lightGoalPromise = new Promise( async res => {
                while (true) {
                    let status = await this.agent.beliefs.notifyChange('someone_in_room '+l.room)
                    if (this.Clock.hh >=7 && this.Clock.hh<=22){
                        if (status){
                            l.turnOn()
                        } else {
                            l.turnOff()
                        }
                    }
                }
            });

            lightsGoals.push(lightGoalPromise)
        }
        yield Promise.all(lightsGoals)
    }

}

module.exports = {ManageLightsGoal, ManageLightsIntention}