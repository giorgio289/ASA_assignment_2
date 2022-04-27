const Observable =  require('../../../utils/Observable')

class Tracker extends Observable{
    
    constructor (house) {
        super(Tracker)
        this.house = house
        this.set('status', false)
    }  

    update(){
        if (this.status){
            this.status = false
        } else {
            this.status = true
        }
    }

}

module.exports = Tracker