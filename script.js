const WORDS = ["Word1", "Word2", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3"];
const READING_TIME = 5; // Both given in seconds
const ANSWER_TIME = 5;
const KEY = 127; // Used to obfuscate the answer

document.querySelector("#wordbox").innerHTML = `You will be given a list of words to memorize. You have ${READING_TIME} seconds to do this. Afterwards you will have ${ANSWER_TIME} seconds to write down the words you remember!`;
document.querySelector("#answer").style.display = "none";
document.querySelector("#submitbutton").style.display = "none";
document.querySelector(".scorebox").style.display = "none";
document.querySelector("#timerContainer").style.display = "none";
document.querySelector("#submitbutton").addEventListener("click", function() {
    (this.clicked != undefined) ? this.clicked = !this.clicked : this.clicked = true;
    get_results();
    document.querySelector("#timerContainer").style.display = "none";

});

const timer_text = document.getElementById("timer");
const start_button = document.getElementById("startbutton");
let interval_id;
let reading_time_timer = READING_TIME;
let answer_time_timer = ANSWER_TIME;

start_button.addEventListener("click", function() {
    read_section_elements();
    read_section_end()
    interval_id = setInterval(() => {
        if (reading_time_timer > 0) {
            timer_text.textContent = reading_time_timer;
            reading_time_timer -= 1;   
        } else if (answer_time_timer > 0) {
            timer_text.textContent = answer_time_timer;
            answer_time_timer -= 1;
        } else {
            clearInterval(interval_id);
        }
    }, 1000);
});


const read_section_elements = function () {
    document.querySelector("#startbutton").style.display = "none";
    document.querySelector("#wordbox").innerHTML = WORDS;
    document.querySelector("#timerContainer").style.display = "block";

}

const test_section_elements = function () {
    document.querySelector("#submitbutton").style.display = "block";
    document.querySelector("#answer").style.display = "block";
    document.querySelector("#wordbox").style.display = "none";
}

const score_user = function (user_words) {
    let score = 0;
    for (const word of user_words) {
        if (WORDS.includes(word)) {
          score += 1;  
        }
    }
    return score ^ KEY;
}   

const get_user_input = function () {
    const user_input = document.getElementById("answer").value;
    const user_input_array = user_input.split(/, | |,/);
    return user_input_array;
}

const read_section_end = function () {
    setTimeout(() => {
        test_section_elements();
        setTimeout(() => {
            if (!document.querySelector("#submitbutton").clicked) {
                alert("Sorry, you took too long");
                document.body.innerHTML = "";
            }
        }, READING_TIME * 1000); // Since it expects milliseconds and reading and answer_time are in seconds
    }, ANSWER_TIME * 1000);


}

const get_results = function () {
    document.querySelector("#submitbutton").style.display = "none";
    document.querySelector("#answer").style.display = "none";
    document.querySelector(".scorebox").innerHTML += score_user(get_user_input());
    document.querySelector(".scorebox").style.display = "block";

}
