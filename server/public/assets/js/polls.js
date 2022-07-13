let pollsArr = [
  {
    question: "Which place on campus do you like the best?",
    answers: ["NAB", "Shivganga", "Clock Tower", "ANC", "Saraswati Temple"],
    pollsCount: 20,
    answersWeight: [3, 4, 5, 2, 6],
    selectedAnswer: -1,
  },
  {
    question: "Which place is best for study?",
    answers: ["NAB", "Shivganga", "Clock Tower", "ANC", "Saraswati Temple"],
    pollsCount: 20,
    answersWeight: [3, 4, 5, 2, 6],
    selectedAnswer: -1,
  },
  {
    question: "Which place on campus do you like the best?",
    answers: ["NAB", "Shivganga", "Clock Tower", "ANC", "Saraswati Temple"],
    pollsCount: 20,
    answersWeight: [3, 4, 5, 2, 6],
    selectedAnswer: -1,
  },
  {
    question: "Which place on campus do you like the best?",
    answers: ["NAB", "Shivganga", "Clock Tower", "ANC", "Saraswati Temple"],
    pollsCount: 20,
    answersWeight: [3, 4, 5, 2, 6],
    selectedAnswer: -1,
  },
  {
    question: "Which place on campus do you like the best?",
    answers: ["NAB", "Shivganga", "Clock Tower", "ANC", "Saraswati Temple"],
    pollsCount: 20,
    answersWeight: [3, 4, 5, 2, 6],
    selectedAnswer: -1,
  },
];

function showResults(pollIndex, polls) {
  let answers = document.querySelectorAll(`.answers${pollIndex} .answer`);
  answers.forEach((answer, i) => {
    let percentage = 0;
    if (i == polls.selectedAnswer) {
      percentage = Math.round(
        ((polls.answersWeight[+i] + 1) / (polls.pollsCount + 1)) * 100
      );
    } else {
      percentage = Math.round(
        (polls.answersWeight[+i] / (polls.pollsCount + 1)) * 100
      );
    }
    answer.querySelector(".percentage-bar").style.width = `${percentage}%`;
    answer.querySelector(".percentage-value").innerText = `${percentage}%`;
  });
}
function markAnswer(i, pollIndex, polls) {
  polls.selectedAnswer = +i;
  try {
    document
      .querySelector(`.answers${pollIndex} .answer.selected`)
      .classList.remove("selected");
  } catch (err) {
    console.log(err);
  }

  document
    .querySelectorAll(`.answers${pollIndex} .answer`)
    [+i].classList.add("selected");
  showResults(pollIndex, polls);
}

pollsArr.forEach((polls, pollIndex) => {
  let pollDOM = {
    question: document.querySelector(
      `.polls${pollIndex} .question${pollIndex}`
    ),
    answers: document.querySelector(`.polls${pollIndex} .answers${pollIndex}`),
  };

  pollDOM.question.innerHTML = polls.question;
  pollDOM.answers.innerHTML = polls.answers.map((answer, i) => {
    return `
              <div class="answer" onClick = "markAnswer(${i},${pollIndex},${polls})">
              ${answer}
              <span class="percentage-bar"></span>
              <span class="percentage-value"></span>
              </div>
      
              `;
  });
});
