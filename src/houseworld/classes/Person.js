const Observable =  require('../../utils/Observable')

class Person extends Observable {     
    constructor (house, name, room) {  
        super(Person)       
        this.house = house;         
        this.name = name;        
        this.set('in_room', room)  
    }     
    moveTo (to) {         
        if ( to in this.house.rooms[this.in_room].doors_to || this.in_room in this.house.rooms[to].doors_to) { // instanciate door_to only for one room, symmetric             
            this.in_room = to             
            return true         
        }         
        else{             
            return false     
        } 
    } 
}
module.exports = Person
