# ASA_assignment_2
## Introduction  
For this assignment a simulated version of the house described in the first has been implemented. To reduce complexity and redundancy not all devices has been introduced, following the list of the impelmented ones:  
* Lights   
* Thermostats
* Alarm  

Moreover an agent and three residents has been implemented. Simulation is run via a scheduling based on residents behavior described in the first assignment and the agent manages lights according to such behavior.
## Simulation implementation
The simulation is run via a schedule base on time, residents move between rooms at predetermined time triggering dirrent events. Moreover each hour energy consumption given by devices and themperaure of the rooms are automatically updated. Devices have hourly energy consumption, the ammount of energy consumed during their activation is computed hourly or whnenever they are turned off. Room temperature is increased by one degreen each hour if thermostats are one and temperature has not been reached, decreased by one degree otherwise. 
## Agent implementation
The agent that has been implemented manages lights: whenever someone enters in a room between 7:00 and 22:00 it automatically turns on the light, then when the room is sempty it turns off light saving energy.
it has two couples (goal, intention). the first is used for sensing where we have a movement sensors which detects presence or absensce of residents in rooms updating the internal representation of the agent world via its belifeset. The second exploits belife update to trigger functions to turn on and off lights.
## Code structure
The code is based on [this](https://github.com/marcorobol/Autonode.js) repo, slight modification has been made in the *./src/utils/Clock.js* to allow to map weekday: 0 to 6 -> Monday to Sunday. Such mapping is used in the schduling to take into account weekend according to the description procided in assignment 1. Moreover a slight modification has been made to *./src/bdi/Agent.js* to suppress the output of the belife observer which came out to be chaotic when executing the simulation. All the other code which has been produced has been placed in *./src/houseworld* directory structured as follow:
- *./src/houseworld/classes*: contains all the classes used in the house definition with devices grouped in the *devices* subfolder
- *./src/houseworld/intentions*: contains classes used for agent implementation, each file contains both goal and intention
- *./src/houseworld/HouseWorld.js*: is the main file containing the simulation core, with object instantiation and initialization and schedule definition. To run it just execute ```node HouseWorld.js``` when in the file folder
- *./execution.log*: contains the output of the execution of the simulation for one simulated day 
