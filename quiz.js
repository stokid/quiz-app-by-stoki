var score = 0;
var selectedAnswer = [];
var selectedAnswerValue = "";
var questionNumber = 0;
var userActive = false;
var userName = "";
var inEnglish = true;
var inHungarian = false;

class Questions {
    correctAnswer;
  
    constructor(question, answers, level, reference) {
        this.question = question;
        this.answers = answers;
        this.level = level;
        this.reference = reference;

        this.answers[0].answer;
        this.answers[0].isTrue;
        this.answers[1].answer;
        this.answers[1].isTrue;
        this.answers[2].answer;
        this.answers[2].isTrue;
        this.answers[3].answer;
        this.answers[3].isTrue;  
    }

    changeLevel() {
        this.level = this.level *2;
    }

    getAnswers() {
        let answerArray =[];
        for (let i=0; i<this.answers.length; i++) {
            if (this.answers[i].isTrue === true) {
                this.correctAnswer = this.answers[i].answer;
            }
            answerArray.push(this.answers[i].answer);
        }
        return answerArray;
    }
     
    getMessage(getAnswers) {
        return `
        ${this.question} lehetésges válaszai: ${getAnswers}, a helyes válasz: ${this.correctAnswer}, a kérdés nehézségi szintje: ${this.level}
        `;
    }
}
var questions = [
    new Questions("2+2=?", valaszok = [{answer: '2', isTrue: false},{answer: '3', isTrue: false},{answer: '4', isTrue: true},{answer: '12', isTrue: false}], 1, "Átalános matematikai szabály"),
    new Questions("What is the year when the Independence Day was?", valaszok = [{answer: '1776', isTrue: true},{answer: '1890', isTrue: false},{answer: '312', isTrue: false},{answer: '2000', isTrue: false}], 4, "https://hu.wikipedia.org/wiki/F%C3%BCggetlens%C3%A9g_napja_(Egyes%C3%BClt_%C3%81llamok)"),
    new Questions("Who was the president in USA from 2009 to 2017?", valaszok = [{answer: 'George Bush', isTrue: false},{answer: 'Donald Trump', isTrue: false},{answer: 'Hillary Clinton', isTrue: false},{answer: 'Barack Obama', isTrue: true}], 5, "https://en.wikipedia.org/wiki/Barack_Obama"),
] 

console.log(questions[questionNumber].getMessage(questions[questionNumber].getAnswers()));

window.onload = function() {
    let browserHeight = window.innerHeight;
    document.getElementsByTagName("BODY")[0].height = window.innerHeight;
    console.log(document.getElementsByTagName("BODY")[0].height);

    document.getElementById("score-table").style.height = browserHeight * 0.06 + "px";
    document.getElementById("game-community").style.height = browserHeight * 0.48 + "px";
    document.getElementById("game-field").style.height = browserHeight * 0.46 + "px";
}

document.getElementById("flags-icon").onclick = function() {
    inEnglish = !inEnglish;
    inHungarian = !inHungarian;
    document.getElementById("flags-icon").src = "pic/Hopstarter-Flag-Borderless-Hungary.ico";
    if (inHungarian) {
        document.getElementById("flags-icon").src = "pic/United-Kingdom-flag-icon.png";
        document.getElementById("game-comfirm-button").innerText = "Megjelölöm!!!"; 
        document.getElementById("usernameForm").firstElementChild.innerText = "Az Ön neve: ";
    } else { 
        document.getElementById("flags-icon").src = "pic/Hopstarter-Flag-Borderless-Hungary.ico";
        document.getElementById("game-comfirm-button").innerText = "I appoint it!";
        document.getElementById("usernameForm").firstElementChild.innerText = "Your name: ";
    }
    console.log("inEnglish: " + inEnglish);
};

document.getElementById("usernameForm").onsubmit = function(event) {
    event.preventDefault();
    userActive = true;
    userName = event.target.elements.fname.value;
    console.log("event.target.id");
    console.log(event.target.id);
    if (inEnglish) {
        document.getElementById("welcome-message").innerHTML = `Hey ${userName}!`;
        document.getElementById("game-master-area").innerHTML = `
        <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="200">
            <p id="game-master-area-text">${userName} You are here to win! Let's go and game!</p>
        </div>
    `;
    } else {
        document.getElementById("welcome-message").innerHTML = `Szia ${userName}!`;
        document.getElementById("game-master-area").innerHTML = `
        <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="200">
            <p id="game-master-area-text">${userName} Ön azért jött ide, hogy játszon! Szerintem kezdjük is el!</p>
        </div>
    `;
    }

    document.getElementById("usernameForm").style.display = "none";
    document.getElementById("question").style.display = "flex";
    document.getElementById("answers").style.display = "flex";
}

document.getElementById("question").innerHTML = questions[questionNumber].question;
var answers = document.querySelectorAll(".answer");
var inputAnswers = questions[questionNumber].getAnswers();

generateQuestion ();

for (const answer of answers) {
    answer.addEventListener('click', function(event) {
        console.log("EVENT: ");
        console.log(event);
        /* console.log(event.target.id); */
        
        selectedAnswer.push(event.target.id);
        if (selectedAnswer.length>1) {
            document.getElementById(selectedAnswer[0]).style.backgroundColor = "";
            selectedAnswer.shift();
        }
        document.getElementById("game-comfirm-button").disabled = false;
        document.getElementById(event.target.id).style.backgroundColor = "purple";
        selectedAnswerValue = event.target.value;   
})
}


document.body.onclick = function(event) {
    
    console.log("EVENT: ");
        console.log(event);
    if (event.target.id == "refresh") {
        location.reload();
    }
    document.getElementById("game-master-area").innerHTML = "";
    if (inEnglish) {
        document.getElementById("game-master-area").innerHTML = `
        <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="200">
            <p id="game-master-area-text">${userName} You are here to win! Let's go and game!</p>
        </div>
        `;
    } else {
        document.getElementById("game-master-area").innerHTML = `
        <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="200">
            <p id="game-master-area-text">${userName} Ön azért jött ide, hogy játszon! Szerintem kezdjük is el!</p>
        </div>
        `;
    }
    
    console.log(event.target);
    console.log("A helyes válasz: ");
    console.log(questions[questionNumber].correctAnswer);

    if (event.target.id == "game-comfirm-button" && document.getElementById("game-comfirm-button").disabled === false) {
        if (questions[questionNumber].correctAnswer == selectedAnswerValue) {
            document.getElementById("game-comfirm-button").disabled = true;
            if (inEnglish) {
                document.getElementById("game-master-area-text").innerHTML = userName +"! " + congratulationsEng[Math.floor(Math.random() * congratulationsEng.length)];
            } else {
                document.getElementById("game-master-area-text").innerHTML = userName +"! " + congratulations[Math.floor(Math.random() * congratulations.length)];
            }
            
            questionNumber +=1;
            generateQuestion();
            document.getElementById(selectedAnswer[0]).style.backgroundColor = "";
            selectedAnswer = [];
            score = questionNumber * 200;
            document.getElementById("score-message").innerHTML = "Score: " + score + " points";
            /* console.log(questions[questionNumber].getMessage(questions[questionNumber].getAnswers())); */
        } else {
            document.getElementById("game-comfirm-button").disabled = true;
            /* console.log(lose[Math.floor(Math.random() * lose.length)]); */
            if (inEnglish) {
                document.getElementById("game-master-area-text").innerHTML = loseEng[Math.floor(Math.random() * loseEng.length)];
            } else {
                document.getElementById("game-master-area-text").innerHTML = lose[Math.floor(Math.random() * lose.length)];
            }
            
            questionNumber = 0;
            generateQuestion();
            document.getElementById(selectedAnswer[0]).style.backgroundColor = "";
            selectedAnswer = [];
            score = 0;
            document.getElementById("score-message").innerHTML = "Score: " + score + " points";
        }
        
    } else if (event.target.className == "answer") {
        if (inEnglish) {
            document.getElementById("game-master-area-text").innerHTML = sayWhenSelectedEng[Math.floor(Math.random() * sayWhenSelectedEng.length)];
        } else {
            document.getElementById("game-master-area-text").innerHTML = sayWhenSelected[Math.floor(Math.random() * sayWhenSelected.length)];
        }
    } else if (userActive === false) {
        if (inEnglish) {
            document.getElementById("game-master-area-text").innerHTML = `How can I call you?`;
        } else {
            document.getElementById("game-master-area-text").innerHTML = `Hogy szólíthatom a legújabb versenyzőnket?`;
        }
    }
     else if (selectedAnswer.length<1 && score == "0") {
         if (inEnglish) {
            document.getElementById("game-master-area-text").innerHTML = `${userName}, You are here to win! Let's go and game!`;
         } else {
            document.getElementById("game-master-area-text").innerHTML = `${userName}, Ön azért jött ide, hogy játszon! Szerintem kezdjük is el!`;
         }
    }
     else {
         if (inEnglish) {
            document.getElementById("game-master-area-text").innerHTML =  userName +"! " +justSayEng[Math.floor(Math.random() * justSayEng.length)];
         } else {
            document.getElementById("game-master-area-text").innerHTML =  userName +"! " +justSay[Math.floor(Math.random() * justSay.length)];
         }
        
        console.log(event.target.id);
    }
}


/* FUNCTIONS -START- */

function generateQuestion () {
    if (questions[questionNumber]) {
        document.getElementById("question").innerHTML = questions[questionNumber].question;

        inputAnswers = questions[questionNumber].getAnswers();
        for (let i = 0; i<4; i++) {
            answers[i].innerHTML = inputAnswers[i];
            answers[i].value = inputAnswers[i];
        }
    } else {
        if (inEnglish) {
            document.getElementById("game-master-area-text").innerHTML ="CONGRATULATIONS, YOU WON!";
        } else {
            document.getElementById("game-master-area-text").innerHTML ="GRATULÁLOK, VÉGIGMENT A JÁTÉKON";
        }
        console.log("GRATULÁLOK, VÉGIGMENT A JÁTÉKON");
    }
    
    
}

/* GAME MASTER SPEECH LIST -START- */
let justSay = [
    "Időnk, mint a tenger. Gondolkodjon!",
    "A 4 lehetséges válasz közül az egyik helyes!",
    "Jelöljön meg valamit!",
    "Sikerült dönteni, vagy hazamenjek vacsorázni?"
];
let justSayEng = [
    "We have no time to lose. Let's check the answer!",
    "There are 4 answers. One of them is true.",
    "Let's check anything",
    "Have you decided? Or, should I go to have dinner?"
];
let sayWhenSelected = [
    "Biztos benne?",
    "Nem kell ám elkapkodni! Megjelöljük?",
    "Megjelöljük?",
    "Ha Ön biztos a válaszába, legyen ez!",
    "Csak rá kell böknie a MEGJELÖLÉS gombra!"
];
let sayWhenSelectedEng = [
    "Are you sure?",
    "We have a lot of free time. Do we check it?",
    "Do we check it??",
    "If you are sure, we will appoint it",
    "Just you click on the 'APPOINT' button!"
];
let congratulations = [
    "Ez a beszéd öcsém, ügyes voltál!",
    "Minden elismerésem, azt hittem csak én tudom!",
    "Gratulálok! Ha nem lett volna helyes a válasz, Ön már nem ülne itt!",
    "Mit ne mondjak, Ön kijárta az élet iskoláját"
];
let congratulationsEng = [
    "That's the spirit! You are welcome!",
    "You are welcome! I have thought that just I know it!",
    "Gongratulation! If the anwer has been wrong, you would't have benen here!",
    "I think, you are genious!"
];
let lose = [
    "Többet kellett volna olvasnia! Viszont látásra!",
    "Így jártunk! Köszönöm szépen a jatákot",
    "Nem értem, hogy lehet így kiesni. Pedig segítettem is!"
];
let loseEng = [
    "You should have learned in the scool!",
    "And so I ended up walking like this. Thanks the game!",
    "I don't understand that you lost. But I helped you, too!"
];

/* GAME MASTER SPEECH LIST -END- */
