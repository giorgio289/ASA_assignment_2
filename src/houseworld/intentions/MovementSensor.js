const Goal = require('../../bdi/Goal');
const Intention = require('../../bdi/Intention');



class SenseMovementsGoal extends Goal {

    constructor (residents = [], rooms= []) {
        super()
        this.residents = residents
        this.rooms = rooms

    }

}



class SenseMovementsIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        this.residents = this.goal.residents
        this.rooms = this.goal.rooms
    }
    
    static applicable (goal) {
        return goal instanceof SenseMovementsGoal
    }

    *exec () {
        var movementsGoals = []
        for (let p of this.residents) {       
            let movementGoalPromise = new Promise( async res => {
                while (true) {
                    let room = await p.notifyChange('in_room')
                    this.log('sense: someone in room ' + room)
                    this.agent.beliefs.declare('someone_in_room '+ room)
                    for (let r of this.rooms){
                        var in_room = false
                        for (let per of this.residents){
                            if (r.name == per.in_room){
                                in_room = true
                            }
                        }
                        if (!in_room){
                            this.agent.beliefs.undeclare('someone_in_room '+ r.name) 
                        }
                    }
                }
            });

            movementsGoals.push(movementGoalPromise)
        }
        yield Promise.all(movementsGoals)
    }

}

module.exports = {SenseMovementsGoal, SenseMovementsIntention}