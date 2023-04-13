//API random 呼出
const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";

const typeDisplay = document.getElementById('typeDisplay');
const typeInput = document.getElementById('typeInput');
const timer = document.getElementById('timer');

// const typeSound = new Audio("");
const wrongSound = new Audio("./Audio/WrongSound.m4a");
const correctSound = new Audio("./Audio/CorrectSound.m4a");

//inputText入力True or False 判定
typeInput.addEventListener('input', () => {
    // console.log('a');

    //Typing Soundをつける
    // typeSound.play();
    // typeSound.currentTime = 0;

    const sentenceArray = typeDisplay.querySelectorAll('span');
    // console.log(sentenceArray);
    const arrayValue = typeInput.value.split('');
    // console.log(arrayValue);

    let correct = true;
    sentenceArray.forEach((characterSpan, index) => {
        if((arrayValue[index] == null)) {
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
            correct = false;
        } 
        else if(characterSpan.innerText == arrayValue[index]) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } 
        else {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');

            wrongSound.play();
            wrongSound.currentTime = 0;
            wrongSound.volume = 0.3;

            correct = false;
        }
    })

    if(correct == true) {
        correctSound.play();
        correctSound.currentTime = 0;
        renderNextSentence();
    }
})



//非同期でrandomな文章を取得する
function getRandomSentence() {
    return fetch(RANDOM_SENTENCE_URL_API)
    .then((response) => response.json())
    // .then((data) => console.log(data.content));
    .then((data) => data.content);
}

//randomな文章を取得して、表示する
// function renderNextSentence() {
//     const sentence = getRandomSentence();
//     console.log(sentence);
// }

//randomな文章を取得して、表示する
async function renderNextSentence() {
    const sentence = await getRandomSentence();
    console.log(sentence);

    typeDisplay.innerText = "";

    //  文章を１文字ずつ分解して、spanタグを生成する
    let oneText = sentence.split("");
    // console.log(oneText);
    oneText.forEach((character) => {
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        // console.log(characterSpan);
        typeDisplay.appendChild(characterSpan);

        //色を加える
        // characterSpan.classList.add('correct');
    })

    //textboxの中身をerase
    typeInput.value = "";

    StartTimer();
}


//Count Down処理
// let startTime;
// let originTime = 30;
// function StartTimer() {
//     timer.innerText = originTime;
//     startTime = new Date();
//     // console.log(startTime);
//     setInterval(() => {
//         timer.innerText = originTime - getTimerTime();
//     }, 1000);
// }

// function getTimerTime() {
//     return Math.floor((new Date() - startTime) / 1000);
// }

//Count Down処理
let startTime;
let originTime = 60;
function StartTimer() {
    timer.innerText = originTime;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = originTime - getTimerTime();
        if(timer.innerText <= 0) TimeUp();
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

function TimeUp() {
    renderNextSentence();
}

// getRandomSentence();
renderNextSentence();