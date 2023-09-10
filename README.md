# Multi Tasking Test (MMT)

This repo contains a widely used and famous assessment in the field of Cognitive Science.

Every trial shows a "order" at the top of the screen that indicates to the user (participant) whether s/he have to select the right or left button according to the side on which the arrow presented or the direction in which the arrow was pointing.


We would recommend using this test to assess cognitive function in:
- Traumatic brain injury
- Autism
- Down’s syndrome

This assessment measures user's (participant) ability to manage multitasking and the interference of incongruent task-irrelevant information on task performance.

You can setup this assessment by your own, thorugh assets/mmt.js file. 
At the begining of MMT object there are five variable you can setup : 
- waiting_duration: the time between click on start button and presenting first trial.
- between_two_duration: the time between every two trial must be showed nothing.
- number_of_steps: the number of trials you wants to present.
- number_of_direction_step: consecutive trials at first just for direction (a type of training)
- number_of_location_step: consecutive trials at first just for location (a type of training)

By default this values are set :
```
    {
    ...
    waiting_duration: 1400,
    between_two_duration: 700,
    number_of_steps: 120,
    number_of_direction_step: 20,
    number_of_location_step: 20,
    ... 
    }
```

There is a method at the end of MMT object which is called send_data. This method is here just for futher steps such as saving data to db.
The result of the assessment is the input of this method, which is presenting in the console by default.
The result contains: 
``` 
{
    "correct": 118,
    "all": 120,
    "avg_rt": 1384.83,
    "report": [
        {
            "version": "Direction",
            "location": "right",
            "direction": "left",
            "user_response": "left",
            "response_time": 1488
        },
        ...
    ]
}
```
* All times are in milisecond.  


--> In this code Bootstrap and Fontawesome are used for easier coding and better visual outcome.
