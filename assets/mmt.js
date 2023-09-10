let stop_timer;
let MMT = {
    // settings 
    counter: 0,
    waiting_duration: 1400,
    between_two_duration: 700,
    number_of_steps: 120,
    number_of_direction_step: 20,
    number_of_location_step: 20,

    // data
    steps_array: [],
    // methods
    init: function() {
        $(".buttons").css("display", "block");
        $("#startbtn").css("display", "none");
        this.create_combination()
        this.prepare_keys();
    },
    submit_result: function(response) {
        let last_element = this.steps_array[this.steps_array.length - 1];
        last_element.user_response = response;
        last_element.response_time = (Date.now() - last_element.response_time);

    },
    set_a_combination: function(version, location, direction) {

        $(".location").html(`&nbsp;`);

        setTimeout(() => {
            $(".location").html(null)
            if (version == 'Direction') {
                $("#taskversion").text('direction');
            } else {
                $("#taskversion").text('location');
            }
            $(".location." + location).html(`<i class="fas fa-arrow-${direction}"></i>`);

            stop_timer = setTimeout(() => {

                if (this.steps_array.length < this.number_of_steps) {
                    this.create_combination()
                } else {
                    $(".location").html(`&nbsp;`)
                    this.calc_signal_noise_ratio();
                }

            }, this.waiting_duration)
        }, this.between_two_duration)

        this.steps_array.push({
            version,
            location,
            direction,
            user_response: "",
            response_time: new Date().getTime()
        })
    },
    create_combination: function() {
        let versions = ["Direction", "Location"];
        let directions = ["left", "right"];

        // create the step version base on rule.
        let random_version = versions[Math.floor(Math.random() * 2)];
        if (this.steps_array.length < (this.number_of_direction_step + this.number_of_location_step)) {
            random_version = "Location";
        }
        if (this.steps_array.length < this.number_of_direction_step) {
            random_version = "Direction";
        }

        let random_direction = directions[Math.floor(Math.random() * 2)];
        let random_location = directions[Math.floor(Math.random() * 2)];

        let same_with_last_one = false;
        this.counter++;
        if (this.steps_array.length > 0) {
            let last_step = this.steps_array[this.steps_array.length - 1];

            if (random_version == last_step.version && random_direction == last_step.direction && random_location == last_step.location) {
                same_with_last_one = true;
            }
        }

        if (same_with_last_one) {
            this.create_combination();
        } else {
            this.set_a_combination(random_version, random_direction, random_location)
        }
    },
    calc_signal_noise_ratio: function() {
        let correct = 0;
        let total_rt = 0;

        this.steps_array.forEach(step => {
            if (step.version == "Direction") {
                if (step.direction == step.user_response) {
                    correct++;
                    total_rt += step.response_time
                }
            } else {
                // version == "Location"
                if (step.location == step.user_response) {
                    correct++;
                    total_rt += step.response_time
                }
            }
        })

        let report = this.steps_array.map((row) => {
            if (row.response_time > 10000) {
                row.response_time = 0;
            }

            return row
        })
        
        let avg_rt = total_rt / correct;

        this.send_data({
            correct: correct,
            all: this.number_of_steps,
            avg_rt,
            report
        })
    },
    
    prepare_keys: function() {
        document.onkeydown = function(e) {
            if (e.which == 37) {
                MMT.submit_result("left")
            } else if (e.which == 39) {
                MMT.submit_result("right")
            } else {
                alert("Press a valid key");
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        };
    },
    send_data: function(data) {
        alert("OPEN CONSOLE.")
        console.log(data)
        console.log(`you can use APIs to send data to a DB`)
        // you can use APIs to send data to a DB
    }
}