# Train Scheduler


### Overview

This is a simple train schedule application that incorporates Firebase to host arrival and departure data. This app retrieves and manipulates this information with Moment.js. This website provides up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.

- - -

### Features

This app has the following features
  
  * When adding trains, administrators can submit the following:
    
    * Train Name
    
    * Destination 
    
    * First Train Time -- in military time
    
    * Frequency -- in minutes
  
  * The app calculates when the next train will arrive relative to the current time.
  
  * Users from many different machines can view same train times.
  
  

### Bonus (Extra Challenges)

* "minutes to arrival" and "next train time" text are updated once every minute. 

* An administrator can `update` and `remove` a train. They can change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).

* Only users who log into the site with their Google or GitHub accounts can this site. 



