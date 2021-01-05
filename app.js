const WORD_LIST_1 = ["mountain", "pendant", "fly", "evening", "scent", "far", "frame", "flow", "tide", "moon", "elegant", "melody", "television", "bill", "door", "gas", "meditation", "bar", "card", "jellyfish", "urge", "crow", "bird", "church"].sort(() => Math.random() - 0.5);
const WORD_LIST_2 = ["store", "pink", "lag", "plant", "all", "idea", "new", "glass", "heart", "prince", "glare", "brain", "creep", "sky", "sincere", "lenient", "eleven", "car", "calf", "zone", "path", "sweet", "king", "omega"].sort(() => Math.random() - 0.5);

const READING_TIME = 120; // Both given in seconds
const ANSWER_TIME = 120;
const KEY = 127; // Used to obfuscate the answer
const WORDS = (window.location.hash ? WORD_LIST_2 : WORD_LIST_1);

const formatTime = function (time) {
  // Can easily be extended to include hours, days, etc.
  const SECONDS = time % 60;
  const MINUTES = Math.floor(time / 60);
  return {
    minutes: MINUTES,
    seconds: SECONDS
  };
}

const toPlural = function (count, noun, suffix = 's') {
  //Makes a word the plural form given the number
  return `${noun}${count !== 1 ? suffix : ''}`;
}

const toWordboxString = function (minutesAndSecondsObject) {
  // Expects the object from formatTime()
  const MINUTES = minutesAndSecondsObject.minutes;
  const SECONDS = minutesAndSecondsObject.seconds;
  if (MINUTES && SECONDS) {
      return `${MINUTES} ${toPlural(MINUTES, "minute")} and ${SECONDS} ${toPlural(SECONDS, "second")}`
  } else if (MINUTES) {
      return `${MINUTES} ${toPlural(MINUTES, "minute")}`
  } else {
      return `${SECONDS} ${toPlural(SECONDS, "second")}`
  }
}

const toTimerString = function (minutesAndSecondsObject) {
  // Expects the object from formatTime()
  const MINUTES = String(minutesAndSecondsObject.minutes);
  const SECONDS = String(minutesAndSecondsObject.seconds).padStart(2, "0"); // padStart adds padding so that it displays something like 01 instead of just 1 in single digit seconds
  return `${MINUTES}:${SECONDS}`;
}

const presentTask = function () {
    let intervalID;
    let readingTimeTimer = READING_TIME;
    let answerTimeTimer = ANSWER_TIME;

    const updateClock = function () {
        if (readingTimeTimer > 0) {
        document.getElementById("timer").textContent = toTimerString(formatTime(readingTimeTimer));
        readingTimeTimer -= 1;
      } else if (answerTimeTimer > 0) {
        document.getElementById("timer").textContent = toTimerString(formatTime(answerTimeTimer));
        answerTimeTimer -= 1;
      } else {
        clearInterval(intervalID);
      }
    }
  
    const readSectionEnd = function () {
      setTimeout(() => {
        testSectionElements();
        setTimeout(() => {
            getResults();
        }, ANSWER_TIME * 1000); // Since it expects milliseconds and reading and answer_time are in seconds
      }, READING_TIME * 1000);
    }
  
    readSectionElements();
    readSectionEnd();
    updateClock();
    intervalID = setInterval(updateClock, 1000);
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

const scoreUser = function (userWords) {
    let score = 0;
    for (let word of userWords) {
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

document.querySelector("#main-container").style.display = "block";
document.querySelector("#readingTime").innerHTML =`${toWordboxString(formatTime(READING_TIME))}`;
document.querySelector("#answerTime").innerHTML =`${toWordboxString(formatTime(ANSWER_TIME))}`;
document.querySelector("#answer").style.display = "none";
document.querySelector("#submitbutton").style.display = "none";
document.querySelector(".scorebox").style.display = "none";
document.querySelector("#timerContainer").style.display = "none";
