const WORDS = ["Word1", "Word2", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3", "Word3"];
const READING_TIME = 120; // Both given in seconds
const ANSWER_TIME = 120;
const KEY = 127; // Used to obfuscate the answer

document.querySelector("#main-container").style.display = "block";
document.querySelector("#wordbox").innerHTML = `You will be given a list of words to memorize. You have ${READING_TIME} seconds to do this. Afterwards you will have ${ANSWER_TIME} seconds to write down the words you remember!`;
document.querySelector("#answer").style.display = "none";
document.querySelector("#submitbutton").style.display = "none";
document.querySelector(".scorebox").style.display = "none";
document.querySelector("#timerContainer").style.display = "none";

const toMinutesAndSeconds = function (time) {
    const MINUTES = Math.floor(time / 60);
    const SECONDS = time % 60;
    return `${MINUTES}:${SECONDS}`;
}

const presentTask = function () {
    let interval_id;
    let reading_time_timer = READING_TIME;
    let answer_time_timer = ANSWER_TIME;

    const updateClock = function () {
        if (reading_time_timer > 0) {
        document.getElementById("timer").textContent = toMinutesAndSeconds(reading_time_timer);
        reading_time_timer -= 1;
      } else if (answer_time_timer > 0) {
        document.getElementById("timer").textContent = toMinutesAndSeconds(answer_time_timer);
        answer_time_timer -= 1;
      } else {
        clearInterval(interval_id);
      }
    };
  
    const readSectionEnd = function () {
      setTimeout(() => {
        testSectionElements();
        setTimeout(() => {
            getResults();
        }, ANSWER_TIME * 1000); // Since it expects milliseconds and reading and answer_time are in seconds
      }, READING_TIME * 1000);
    };
  
    readSectionElements();
    readSectionEnd();
    updateClock();
    interval_id = setInterval(updateClock, 1000);
  }
  
document.getElementById("startbutton").addEventListener("click", presentTask);
document.querySelector("#submitbutton").addEventListener("click", function() {
    getResults();
});

const readSectionElements = function () {
    document.querySelector("#startbutton").style.display = "none";
    document.querySelector("#wordbox").innerHTML = WORDS.join(', ');
    document.querySelector("#timerContainer").style.display = "block";

}

const testSectionElements = function () {
    document.querySelector("#submitbutton").style.display = "block";
    document.querySelector("#answer").style.display = "block";
    document.querySelector("#wordbox").style.display = "none";
}

const scoreUser = function (user_words) {
    let score = 0;
    for (const word of user_words) {
        if (WORDS.includes(word)) {
          score += 1;  
        }
    }
    return score ^ KEY;
}   

const getUserInput = function () {
    const USER_INPUT = document.getElementById("answer").value;
    const USER_INPUT_ARRAY = USER_INPUT.split(/[,|\s]+/);
    return USER_INPUT_ARRAY;
}

const getResults = function () {
    document.querySelector("#submitbutton").style.display = "none";
    document.querySelector("#answer").style.display = "none";
    document.querySelector("#score").innerHTML = "#" + scoreUser(getUserInput());
    document.querySelector(".scorebox").style.display = "block";
    document.querySelector("#timerContainer").style.display = "none";
}
