let minimum_value = 1
let maximum_value = 15
let GameTime = 20000

console.log("Loaded")

const SectionToMove = document.getElementById("ScreenMain");

function EasyDifficulty(){
    minimum_value=1;
    maximum_value = 15;
    if(Sounds){
        const GameModeChange = new Audio("Audio/SelectGameMode.mp3");
        GameModeChange.volume = 0.5;
        GameModeChange.play();
    }   
}

function MediumDifficulty(){
    minimum_value = 16;
    maximum_value = 31;
    if(Sounds){
        const GameModeChange = new Audio("Audio/SelectGameMode.mp3");
        GameModeChange.volume = 0.5;
        GameModeChange.play();
    }    
}

function HardDifficulty(){
    minimum_value=32;
    maximum_value = 63;
    if(Sounds){
        const GameModeChange = new Audio("Audio/SelectGameMode.mp3");
        GameModeChange.volume = 0.5;
        GameModeChange.play();
    }    
}

function randInt(min, max) {     //generate random number between range
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



function MoveSection(){       //moves the screen section up
    SectionToMove.style.transform = "translateY(-99.8%)";
    SectionToMove.style.transition = 'transform 1s ease-out';
    document.querySelector(".Footer").style = 'opacity:0%;'
    document.querySelector(".Footer").style = "bottom:-10%"
    document.querySelector(".Footer").style.transition = 'all 1s ease'
}


let randnum = 0
let binary = ''

function StartNumberAnimation(){
    let inputInterval = setInterval(()=>{
        numDiv.innerHTML = randInt(minimum_value,maximum_value)
    },100)
    setTimeout(()=>{
        clearInterval(inputInterval)
    },1499)
}
const numDiv = document.getElementById("Num")

let t = 0
const StartSound = new Audio("Audio/GameStart.mp3");
const WrongSound = new Audio("Audio/WrongEnter.mp3");
const GameOverSound = new Audio("Audio/GameOver.mp3");
const ClockSound = new Audio("Audio/ClockTick.mp3")
ClockSound.volume = 0.2;
function startGame(){
    if(OptionShowing){
        ShowOptions();
    }
    if(Sounds){
        PlayAgainAudio.play();
    }
    let time = setInterval(()=>{
        t += 1;
        if(Sounds){
            ClockSound.play();
        }
        document.querySelector(".TimeText").innerHTML=t;
    },1000)
    randnum = randInt(minimum_value,maximum_value)
    setTimeout(()=>{
        document.getElementById("inputVal").disabled=false;
        document.getElementById("inputVal").focus();
        numDiv.innerHTML= randnum
        binary = Number(randnum.toString(2))
        document.getElementById("inputVal").addEventListener("keydown", function (f) {
            f.stopImmediatePropagation();
            if (f.key === "Enter") {
                storedValue = f.target.value;
                console.log("Running-1")
                if(storedValue == binary) {
                    if(Sounds){
                        const CorrectAnswerSound = new Audio("Audio/CorrectAnswer.mp3");
                        CorrectAnswerSound.play();
                    }
                    points += 1;
                    randnum = randInt(minimum_value,maximum_value)
                    numDiv.innerHTML= randnum
                    binary = Number(randnum.toString(2))
                    f.target.value = ''
                }
                else{
                    if(Sounds){
                        WrongSound.play();
                    }
                }
            }
        });
    },1500)
    setTimeout(()=>{
        clearInterval(time)
        if(Sounds){
            GameOverSound.play();
        }
        document.getElementById("inputVal").disabled=true;
        document.getElementById("inputVal").value="GAME OVER";
        SectionToMove.style.transform = "translateY(-200%)";
        t=0;
        document.querySelector(".TimeText").innerHTML=0
        document.querySelector(".ScoreDiv").innerHTML=points;
        points=0;
        SectionToMove.style.transition = 'transform 1s ease-out';
    },GameTime)
}


const ReturnHomeAudio = new Audio("Audio/ReturnHome.mp3");
function ReturnHome(){
    if(Sounds){
        ReturnHomeAudio.play();
    }
    SectionToMove.style.transform = "translateY(0%)";
    SectionToMove.style.transition = 'transform 1.5s ease-out';
    document.querySelector(".Footer").style = 'opacity:100%;'
    document.querySelector(".Footer").style.transition = 'all 2s ease'
    document.getElementById("inputVal").value=""
    document.getElementById("inputVal").disabled=true
}

const PlayAgainAudio = new Audio("Audio/PlayAgain.mp3");

function PlayAgain(){
    if(Sounds){
        PlayAgainAudio.play();
    }
    document.getElementById("inputVal").value='';
    StartNumberAnimation()
    SectionToMove.style.transform = "translateY(-99.8%)";
    SectionToMove.style.transition = 'transform 1s ease-out';
    let time = setInterval(()=>{
        t += 1;
        if(Sounds){
            ClockSound.play();
        }
        document.querySelector(".TimeText").innerHTML=t;
    },1000)
    randnum = randInt(minimum_value,maximum_value)
    setTimeout(()=>{
        document.getElementById("inputVal").disabled=false;
        document.getElementById("inputVal").focus();
        numDiv.innerHTML= randnum
        binary = Number(randnum.toString(2))
        document.getElementById("inputVal").addEventListener("keydown", function (e) {
            e.stopImmediatePropagation();
            if (e.key === "Enter") {
                storedValue = e.target.value;
                console.log("Running-2")
                if(storedValue == binary) {
                    if(Sounds){
                        const CorrectAnswerSound = new Audio("Audio/CorrectAnswer.mp3");
                        CorrectAnswerSound.play();
                    }
                    points += 1;
                    randnum = randInt(minimum_value,maximum_value)
                    numDiv.innerHTML= randnum
                    binary = Number(randnum.toString(2))
                    e.target.value = '';
                }
                else{
                    if(Sounds){
                        WrongSound.play();
                    }
                }
            }
        });
    },1500)
    setTimeout(()=>{
        clearInterval(time)
        console.log(storedValue)
        if(Sounds){
            GameOverSound.play();
        }
        document.getElementById("inputVal").disabled=true;
        document.getElementById("inputVal").value="GAME OVER";
        SectionToMove.style.transform = "translateY(-200%)";
        t=0;
        document.querySelector(".TimeText").innerHTML=0;
        document.querySelector(".ScoreDiv").innerHTML=points;
        points=0;
        SectionToMove.style.transition = 'transform 1s ease-out';
    },GameTime)
}

const OptionOpen = new Audio("Audio/OptionOpen.mp3");
OptionOpen.volume = 1;
OptionShowing = 0;
function ShowOptions(){
    if(Sounds){
        OptionOpen.play();
    }
    const MainHead = document.querySelector(".MainHead");
    const StartButton = document.getElementById("StartButton");
    const OptionsDiv = document.querySelector(".Options");
    if (!OptionShowing){
        OptionShowing = !OptionShowing;
        OptionsDiv.style = "background-color:#41444B"
        MainHead.style.transform = "translateX(-30%)";
        OptionsDiv.style.transform = "translateX(-90%)";
        StartButton.style.transform = "translateX(-200%)";
        MainHead.style.transition = "transform 0.5s ease-out";
        StartButton.style.transition = "transform 0.5s ease-out";
        OptionsDiv.style.transition = "all 0.5s ease";
    }
    else{
        OptionShowing = !OptionShowing;
        OptionsDiv.style = "background-color:#11120d"
        MainHead.style.transform = "translateX(0%)";
        OptionsDiv.style.transform = "translateX(0%)";
        StartButton.style.transform = "translateX(0%)";
        MainHead.style.transition = "transform 0.5s ease-out";
        StartButton.style.transition = "transform 0.5s ease-out";
        OptionsDiv.style.transition = "all 0.5s ease-out";
    }
}

let storedValue = "";
let points = 0;


const BGmusic = new Audio("Audio/Background.mp3");
BGmusic.loop = true;
BGmusic.volume = 0.3;

MusicPlay = 0;
function startMusic() {
    if(!MusicPlay){
        MusicPlay = !MusicPlay;
        BGmusic.play();
        document.getElementById("MusicButton").style = `background-image: url("Images/audioOn.png")`;
    }
    else{
        MusicPlay = !MusicPlay;
        BGmusic.pause();
        document.getElementById("MusicButton").style = `background-image: url("Images/audioOff.png")`;
    }
}

Sounds = 1;
function PlaySound() {
    if(!Sounds){
        Sounds = !Sounds;
        document.getElementById("SoundButton").style = `background-image: url("Images/SoundOn.png")`;
    }
    else{
        Sounds = !Sounds;
        document.getElementById("SoundButton").style = `background-image: url("Images/SoundOff.png")`;
    }
}




