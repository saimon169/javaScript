const question =document.getElementById("question");
const choices =Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion ={};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions =[
    {
        question: "Who was the first person to land on the moon?",
        choice1: "Neil Armstrong",
        choice2: "Kylie Jenner",
        choice3: "Aramni",
        choice4: "His Foot",
        answer: 1
    },
    {
        question: "Inside which HTML do we put JavaScript?",
        choice1: "<javascript>",
        choice2: "<js>",
        choice3: "<script>",
        choice4: "<java script>",
        answer: 3
    },
    {
        question: "How do we write 'Hello world' in alert box?",
        choice1: "msgBox('Hello world');",
        choice2: "alertBox('Hello world');",
        choice3: "msg('Hello world');",
        choice4: "alert('Hello world');",
        answer: 4
    }
];

//Consonants
const CORRECT_BONUS = 10;
const MAX_QUESTION = 3;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () =>{

    if(availableQuestions.length==0 || questionCounter >= MAX_QUESTION){
       localStorage.setItem("mostRecentScore", score);
        // Goes To end page
        return window.location.assign("end.html");
    };
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTION}`;

    //Progress Bar
    // console.log((questionCounter/MAX_QUESTION) * 100);
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTION) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex,1);

    acceptingAnswers = true;
};
 choices.forEach(choice =>{
    choice.addEventListener("click", e=>{
        // console.log(e.target);
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = 
        selectedAnswer == currentQuestion.answer ? 'correct'
        :'incorrect';

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();    
        },1000);
        
        
        if(classToApply === "correct"){
            incrementScore(CORRECT_BONUS);
        }
        // console.log(classToApply);
        // console.log(selectedAnswer == currentQuestion.answer);   
    });
 });

incrementScore = num =>{
    score +=num;
    scoreText.innerText = score;
};

startGame();