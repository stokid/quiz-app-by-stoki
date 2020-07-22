var score = 0;
var selectedAnswer = [];
var selectedAnswerValue = "";
var questionNumber = 0;
var userActive = false;
var userName = "Anonymus";
var inEnglish = false;
var inHungarian = true;
let browserHeight = window.innerHeight;
var selectedAnswerSave ="";
var selectedAnswerId ="";
var isFinishGame = false;

class Questions {
    correctAnswer;
  
    constructor(question, answers, level, reference) {
        this.question = question;
        this.answers = answers;
        this.level = level;
        this.reference = reference;
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
    new Questions("Melyik országban található Hága?", valaszok = [{answer: 'Hollandia', isTrue: true},{answer: 'Franciaország', isTrue: false},{answer: 'Németország', isTrue: false},{answer: 'Belgium', isTrue: false}], 4, ""),
    new Questions("Hogy folytatódik a közmondás: Akinek nem inge,", valaszok = [{answer: 'az hallgasson!', isTrue: false},{answer: 'az mást vegyen magára!', isTrue: false},{answer: 'az ne vegye magára!', isTrue: true},{answer: 'vegyen magának másikat!', isTrue: false}], 1, ""),
    new Questions("Ki írta a Gyilkosság az Orient expresszen című könyvet?", valaszok = [{answer: 'Robin Cook', isTrue: false},{answer: 'William Shakespeare', isTrue: false},{answer: 'Mikszáth Kálmán', isTrue: false},{answer: 'Agatha Christie', isTrue: true}], 5, ""),
    new Questions("Melyik város latin neve Alba Regia?", valaszok = [{answer: 'Pécs', isTrue: false},{answer: 'Székesfehérvár', isTrue: true},{answer: 'Győr-Moson-Sopron', isTrue: false},{answer: 'Albánia', isTrue: false}], 5, ""),
    new Questions("Mennyi a 27 köbgyöke?", valaszok = [{answer: '9', isTrue: false},{answer: '7', isTrue: false},{answer: '27', isTrue: false},{answer: '3', isTrue: true}], 5, ""),
    new Questions("Ki volt Angelina Jolie harmadik férje?", valaszok = [{answer: 'Brad Pitt', isTrue: true},{answer: 'George Clooney', isTrue: false},{answer: 'Johnny Depp', isTrue: false},{answer: 'Tom Cruise', isTrue: false}], 5, ""),
    new Questions("Mi az ózon?", valaszok = [{answer: 'A levegőben található nemesgázok összessége', isTrue: false},{answer: 'A légkörben keletkezett lyuk', isTrue: false},{answer: 'Olyan lyukak összessége, melyeken áthatol minden sugárzás', isTrue: false},{answer: 'Három oxigénatomból álló molekula', isTrue: true}], 5, ""),
    new Questions("Mit jelent az olimpiai játékok latin jelmondata, a „Citius, Altius, Fortius”?", valaszok = [{answer: 'Gyorsabban, Magasabbra, Erősebben', isTrue: true},{answer: 'Erősebben, Gyorsabban, Magasabbra', isTrue: false},{answer: 'Magasabbra, Erősebben, Gyorsabban', isTrue: false},{answer: 'Ügyesebben, Gyorsabban, Precízebben', isTrue: false}], 5, ""),
    
]
var questionsEng = [
    new Questions("2+2=?", valaszok = [{answer: '2', isTrue: false},{answer: '3', isTrue: false},{answer: '4', isTrue: true},{answer: '12', isTrue: false}], 1, "Átalános matematikai szabály"),
    new Questions("What is the year when the Independence Day was?", valaszok = [{answer: '1776', isTrue: true},{answer: '1890', isTrue: false},{answer: '312', isTrue: false},{answer: '2000', isTrue: false}], 4, "https://hu.wikipedia.org/wiki/F%C3%BCggetlens%C3%A9g_napja_(Egyes%C3%BClt_%C3%81llamok)"),
    new Questions("What is the smallest country in the world?", valaszok = [{answer: 'Canada', isTrue: false},{answer: 'Hungary', isTrue: false},{answer: 'Switzerland', isTrue: false},{answer: 'Vatican City', isTrue: true}], 5, ""),
    new Questions("Who was the president in USA from 2009 to 2017?", valaszok = [{answer: 'George Bush', isTrue: false},{answer: 'Donald Trump', isTrue: false},{answer: 'Hillary Clinton', isTrue: false},{answer: 'Barack Obama', isTrue: true}], 5, ""),
    new Questions("What are the five colours of the Olympic rings?", valaszok = [{answer: 'Blue, orange, black, green and red', isTrue: true},{answer: 'Blue, yellow, black, green and purple', isTrue: false},{answer: 'Black, yellow, black, green and red', isTrue: false},{answer: 'Blue, yellow, white, green and red City', isTrue: false}], 5, ""),
    new Questions("In tennis, what piece of fruit is found at the top of the men's Wimbledon trophy?", valaszok = [{answer: 'Banana', isTrue: false},{answer: 'Pineapple', isTrue: true},{answer: 'Orange', isTrue: false},{answer: 'Strawberry', isTrue: false}], 5, ""),
    new Questions("What is the middle name of Angela Merkel?", valaszok = [{answer: 'Gabriella', isTrue: false},{answer: 'Brigitta', isTrue: false},{answer: 'Olga', isTrue: false},{answer: 'Dorothea', isTrue: true}], 5, ""),
    new Questions("Which nuts are used in marzipan?", valaszok = [{answer: 'peanuts', isTrue: false},{answer: 'pistachio', isTrue: false},{answer: 'almonds', isTrue: true},{answer: 'hazelnuts', isTrue: false}], 5, ""),
]

console.log(questions[questionNumber].getMessage(questions[questionNumber].getAnswers()));

window.onload = function() {
    resizeHtmlElements();
}
window.addEventListener("resize",function() { 
    resizeHtmlElements();
});

document.getElementById("flags-icon").onclick = function() {
    inEnglish = !inEnglish;
    inHungarian = !inHungarian;
    document.getElementById("flags-icon").src = "pic/Hopstarter-Flag-Borderless-Hungary.ico";
    if (inHungarian) {
        document.getElementById("flags-icon").src = "pic/United-Kingdom-flag-icon.png";
        document.getElementById("game-comfirm-button").innerText = "Megjelölöm!!!"; 
        document.getElementById("usernameForm").firstElementChild.innerText = "Az Ön neve: ";
        document.getElementById("genders").innerText = "Neme: ";
        document.getElementById("male-label").innerText = "Férfi";
        document.getElementById("female-label").innerText = "Nő";
    } else { 
        document.getElementById("flags-icon").src = "pic/Hopstarter-Flag-Borderless-Hungary.ico";
        document.getElementById("game-comfirm-button").innerText = "I appoint it!";
        document.getElementById("usernameForm").firstElementChild.innerText = "Your name: ";
        document.getElementById("genders").innerText = "Gender: ";
        document.getElementById("male-label").innerText = "Male";
        document.getElementById("female-label").innerText = "Female";
    }
    generateQuestion ();
};

document.getElementById("usernameForm").onsubmit = function(event) {
    event.preventDefault();
    userActive = true;
    userName = event.target.elements.fname.value;
    userGender = event.target.elements.gender.value;
    console.log("event.target.id");
    console.log(event.target.id);
    if (inEnglish) {
        document.getElementById("welcome-message").innerHTML = `Hey ${userName}!`;
        document.getElementById("game-master-area").innerHTML = `
        <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="800">
            <p id="game-master-area-text">${userName} You are here to win! Let's go and game!</p>
        </div>
    `;
    } else {
        document.getElementById("welcome-message").innerHTML = `Szia ${userName}!`;
        document.getElementById("game-master-area").innerHTML = `
        <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="800">
            <p id="game-master-area-text"> Nagyon örülök ${userName}, hogy megismerhetem! Ígérem az első kérdés könnyű lesz!</p>
        </div>
    `;
    }
    if (userGender == "female") {
        questions.push(new Questions("Ki volt ma a legcsinosabb versenyzőnk?", valaszok = [{answer: 'Barbi', isTrue: false},{answer: userName, isTrue: true},{answer: 'Eleonóra', isTrue: false},{answer: 'Esmeralda', isTrue: false}], 5, ""));
        questionsEng.push(new Questions("Who has been the cutest contestant?", valaszok = [{answer: 'Emma', isTrue: false},{answer: userName, isTrue: true},{answer: 'Sophia', isTrue: false},{answer: 'Esmeralda', isTrue: false}], 5, ""));
    } else {
        questions.push(new Questions("Ki volt ma a legsármosabb versenyzőnk?", valaszok = [{answer: 'Józsi bácsi', isTrue: false},{answer: userName, isTrue: true},{answer: 'A talicskás Béla', isTrue: false},{answer: 'Armandó', isTrue: false}], 5, ""));
        questionsEng.push(new Questions("Who has been the most masculine man?", valaszok = [{answer: 'Jacob', isTrue: false},{answer: userName, isTrue: true},{answer: 'Michael', isTrue: false},{answer: 'Alexander', isTrue: false}], 5, ""));
    }

    generateQuestion ();
    document.getElementById("usernameForm").style.display = "none";
    document.getElementById("question").style.display = "flex";
    document.getElementById("answers").style.display = "flex";
}

document.getElementById("question").innerHTML = questions[questionNumber].question;
var answers = document.querySelectorAll(".answer");
var inputAnswers = questions[questionNumber].getAnswers();



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
    resizeHtmlElements();
    console.log("EVENT: ");
        console.log(event);
    if (event.target.id == "refresh") {
        location.reload();
    }
    if (event.target.id != "game-comfirm-button") {
        document.getElementById("game-master-area").innerHTML = "";
        
        if (isFinishGame) {
            if (inEnglish) {
                document.getElementById("game-master-area").innerHTML = `
                <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="800">
                    <p id="game-master-area-text">Congratulations ${userName}, you won!</p>
                </div>
                `;
            } else {
                if (userGender == "female") {
                    document.getElementById("game-master-area").innerHTML = `
                    <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="800">
                        <p id="game-master-area-text">Gratulálok ${userName}! Az összes kérdésre tökéletesen válaszolt! Ön nem csak szép, de okos is!</p>
                    </div>
                    `;
                } else {
                    document.getElementById("game-master-area").innerHTML = `
                    <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="800">
                        <p id="game-master-area-text">Gratulálok ${userName}! Az összes kérdésre tökéletesen válaszolt! Azért ne bízza el magát! :D</p>
                    </div>
                    `;
                }
            }
        } else {
            if (inEnglish) {
                document.getElementById("game-master-area").innerHTML = `
                <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="800">
                    <p id="game-master-area-text">${userName} You are here to win! Let's go and game!</p>
                </div>
                `;
            }
             else {
                document.getElementById("game-master-area").innerHTML = `
                <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="800">
                    <p id="game-master-area-text">${userName}${sayStartGame}</p>
                </div>
                `;
            }
        }
        
    }
    // Lets save the correct answer and the checked answer. We use it when USER click the "I appoint it!" button and the good answer's button start to flash in green.
    console.log(event.target);
    console.log("A helyes válasz: ");
    console.log(questions[questionNumber].correctAnswer);
    
    if (event.target.className == "answer") {
        console.log("A kijelölt válasz ID-ja: ");
        console.log(event.target.id);
        console.log("A kijelölt válasz: ");
        console.log(event.target.value);
        selectedAnswerSave = event.target.value;
        selectedAnswerId = event.target.id;
    
        console.log(selectedAnswerId);
    }
    if (event.target.id == "game-comfirm-button" && document.getElementById("game-comfirm-button").disabled === false) {
        if (inEnglish) {
            var correctAnswerSave = questionsEng[questionNumber].correctAnswer;
        } else {
            var correctAnswerSave = questions[questionNumber].correctAnswer;
        }
        if (correctAnswerSave == selectedAnswerValue) {
            document.getElementById("game-comfirm-button").disabled = true;
            let on = setInterval(answerFlashGreen ,250);
            let off = setInterval(answerFlashOff ,500);
            setTimeout( function() {
                if (inEnglish) {
                    document.getElementById("game-master-area").innerHTML = `
                    <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="800">
                        <p id="game-master-area-text">${userName}! ${congratulationsEng[Math.floor(Math.random() * congratulationsEng.length)]}</p>
                    </div>
                    `;
                } else {
                    if (userGender == "female") {
                        document.getElementById("game-master-area").innerHTML = `
                        <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="800">
                            <p id="game-master-area-text">${userName}! ${congratulations[Math.floor(Math.random() * congratulations.length)]}</p>
                        </div>
                        `;
                    } else {
                        document.getElementById("game-master-area").innerHTML = `
                        <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="800">
                            <p id="game-master-area-text">${userName}! ${congratulationsMale[Math.floor(Math.random() * congratulations.length)]}</p>
                        </div>
                        `;
                    }
                    
                }
                questionNumber +=1;
                generateQuestion();
                if (generateQuestion()===false) {
                    if (inEnglish) {
                        document.getElementById("game-master-area").innerHTML = `
                        <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="800">
                            <p id="game-master-area-text">Congratulations ${userName}, you won!</p>
                        </div>
                        `;
                    } else {
                        if (userGender == "female") {
                            document.getElementById("game-master-area").innerHTML = `
                            <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="800">
                                <p id="game-master-area-text">Gratulálok ${userName}! Az összes kérdésre tökéletesen válaszolt! Ön nem csak szép, de okos is!</p>
                            </div>
                            `;
                        } else {
                            document.getElementById("game-master-area").innerHTML = `
                            <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="800">
                                <p id="game-master-area-text">Gratulálok ${userName}! Az összes kérdésre tökéletesen válaszolt! Azért ne bízza el magát! :D</p>
                            </div>
                            `;
                        }
                    }
                }
                document.getElementById(selectedAnswer[0]).style.backgroundColor = "";
                selectedAnswer = [];
                score = questionNumber * 200;
                document.getElementById("score-message").innerHTML = "Score: " + score + " points";
                /* console.log(questions[questionNumber].getMessage(questions[questionNumber].getAnswers())); */
                clearInterval(on);
                clearInterval(off);
            },2000);
            
        } else {
            let on = setInterval(answerFlashRed ,250);
            let off = setInterval(answerFlashOff ,500); 
            document.getElementById("game-comfirm-button").disabled = true;
            setTimeout( function() {
                
                /* console.log(lose[Math.floor(Math.random() * lose.length)]); */
                if (inEnglish) {
                    document.getElementById("game-master-area").innerHTML = `
                    <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="800">
                        <p id="game-master-area-text">${loseEng[Math.floor(Math.random() * loseEng.length)]}</p>
                    </div>
                    `;
                } else {
                    document.getElementById("game-master-area").innerHTML = `
                    <div id="game-master-area-bubble" class="bubble" data-aos="fade-left" data-aos-duration="800">
                        <p id="game-master-area-text">${lose[Math.floor(Math.random() * lose.length)]}</p>
                    </div>
                    `;
                }
                questionNumber = 0;
                generateQuestion();
                document.getElementById(selectedAnswer[0]).style.backgroundColor = "";
                selectedAnswer = [];
                score = 0;
                document.getElementById("score-message").innerHTML = "Score: " + score + " points";
                clearInterval(on);
                clearInterval(off);
            },2000);
        }
    } else if (event.target.className == "answer") {
        if (inEnglish) {
            document.getElementById("game-master-area-text").innerHTML = sayWhenSelectedEng[Math.floor(Math.random() * sayWhenSelectedEng.length)];
        } else {
            document.getElementById("game-master-area-text").innerHTML = sayWhenSelected[Math.floor(Math.random() * sayWhenSelected.length)];
        }
    } else if (userActive === false) {
        if (inEnglish) {
            document.getElementById("game-master-area-text").innerHTML = `What should I call you?`;
        } else {
            document.getElementById("game-master-area-text").innerHTML = `Hogy szólíthatom a legújabb versenyzőnket?`;
        }
    }
     else if (selectedAnswer.length<1 && score == "0") {
         if (inEnglish) {
            document.getElementById("game-master-area-text").innerHTML = `${userName}, You are here to win! Let's go and game!`;
         } else {
            document.getElementById("game-master-area-text").innerHTML = `${userName}${sayStartGame}`;
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

console.log(document.getElementById("question").clientHeight);
/* FUNCTIONS -START- */

function generateQuestion () {
    if (inEnglish) {
        if (questionsEng[questionNumber]) {
            document.getElementById("question").innerHTML = questionsEng[questionNumber].question;
            inputAnswers = questionsEng[questionNumber].getAnswers();
            for (let i = 0; i<4; i++) {
                answers[i].innerHTML = inputAnswers[i];
                answers[i].value = inputAnswers[i];
            }
        } else {
            isFinishGame = true;
            return false;
        }
    } else {
        if (questions[questionNumber]) {
            document.getElementById("question").innerHTML = questions[questionNumber].question;
            inputAnswers = questions[questionNumber].getAnswers();
            for (let i = 0; i<4; i++) {
                answers[i].innerHTML = inputAnswers[i];
                answers[i].value = inputAnswers[i];
            }
        } else {
            isFinishGame = true;
            return false;
        }
    }
}
function resizeHtmlElements() {
    browserHeight = window.innerHeight;
    document.getElementsByTagName("BODY")[0].height = window.innerHeight;
    console.log(document.getElementsByTagName("BODY")[0].height);
    document.getElementById("score-table").style.height = browserHeight * 0.06 + "px";
    document.getElementById("game-community").style.height = browserHeight * 0.48 + "px";
    document.getElementById("game-field").style.height = browserHeight * 0.46 + "px";
}

function answerFlashGreen() {
  document.getElementById(selectedAnswerId).style.backgroundColor = "green";
  }
function answerFlashRed() {
    document.getElementById(selectedAnswerId).style.backgroundColor = "red";
}
function answerFlashOff() {
    document.getElementById(selectedAnswerId).style.backgroundColor = "";
}
function goodAnserFlash() {
    setInterval(answerFlashGreen ,250);
    setInterval(answerFlashOff ,500); 
}
function wrongAnserFlash() {
    setInterval(answerFlashRed ,250);
    setInterval(answerFlashOff ,500); 
}

/* GAME MASTER SPEECH LIST -START- */
let sayStartGame = ", Ön azért jött ide, hogy játszon! Szerintem kezdjük is el!";
let sayStartGameEng = "";
let justSay = [
    "Időnk, mint a tenger. Gondolkodjon!",
    "A 4 lehetséges válasz közül az egyik helyes!",
    "Jelöljön meg valamit!",
    "Sikerült dönteni, vagy hazamenjek vacsorázni?"
];
let justSayEng = [
    "We have no time to lose. Let's check the answer!",
    "There are four answers. One of them is true.",
    "Let's check anything!",
    "Have you decided? Or, should I go to have dinner?"
];
let sayWhenSelected = [
    "Biztos benne?",
    "Nem kell ám elkapkodni! Megjelöljük?",
    "Megjelöljük?",
    "Ha Ön biztos a válaszában, legyen ez!",
    "Csak rá kell böknie a MEGJELÖLÉS gombra!",
    "Ha gondolja, kérjen telefonos segítséget!"
];
let sayWhenSelectedEng = [
    "Are you sure?",
    "We have a lot of free time. Do we check it?",
    "Do we check it?",
    "If you are sure, we will appoint it",
    "Just you click on the 'APPOINT' button!"
];
let congratulations = [
    "Ez a beszéd aranyom, ügyes volt!",
    "Minden elismerésem! Bevallom, azt hittem csak én tudom!",
    "Brilliáns! Emelem Ön elött a virtuális kalapomat!",
    "Mit mondjak, Ön tanult nőszemély!",
    "Csinos megjelenés, páratlan észjárás!"
];
let congratulationsMale = [
    "Ez a beszéd ember, ügyes volt!",
    "Minden elismerésem! Bevallom, azt hittem csak én tudom!",
    "Brilliáns! Emelem Ön elött a virtuális kalapomat!",
    "Mit mondjak, Ön tanult úriember!",
    "Magán távolról látszik, hogy van esze!"
];
let congratulationsEng = [
    "That's the spirit! You are welcome!",
    "You are welcome! I have thought that just I know it!",
    "Gongratulation! If the anwer were wrong, you would't be here!",
    "I think, you are genious!"
];
let lose = [
    "Legközelebb jobban fog menni! Én itt leszek!",
    "Így jártunk! Köszönöm szépen a játékot! Esetleg kezd újra!",
    "Nem értem, hogy lehet így kiesni. Pedig segítettem is!",
    "Nem kellett volna kesnie! Ott volt még a telefonos segítség!",
    "Eddig tartott a jaték. Pedig annyi mindent csinálhattunk volna!!"
];
let loseEng = [
    "You should have learned in the scool!",
    "And so I ended up walking like this. Thanks the game!",
    "I don't understand that you lost. But I've helped you, too!"
];
/* GAME MASTER SPEECH LIST -END- */
