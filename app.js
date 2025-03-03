let gameSequence = [];
let userSequence = [];

let started = false;
let level = 0;

let allBtns = document.querySelectorAll(".btn");

let btns = ["yellow", "red", "purple", "green"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (started == false){
        console.log("Game Started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
 btn.classList.add("flash");
 setTimeout(function() {
    btn.classList.remove("flash");
 }, 300);
};

function userFlash(btn) {
    console.log("User Flashing:", btn.classList);
    btn.classList.remove("userflash"); // Reset first
    void btn.offsetWidth; // Force a reflow (browser trick)
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 300);
}

function levelUp() {
    userSequence = [];
    level++;
   h2.innerText = `Level ${level}`;
   
   // random button choose
      let randomIndex = Math.floor(Math.random() * 4);
      let randomColor = btns[randomIndex];
      let randombutton = document.querySelector(`.${randomColor}`);
      gameSequence.push(randomColor);
      console.log(gameSequence);
   gameFlash(randombutton);
}


function checkAns(idx){
let highestlevel =  console.log("curr level :", level);
//   let idx = level-1;

  if (userSequence[idx] === gameSequence[idx]){
    if (userSequence.length == gameSequence.length){
        setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your Score Was [<b>${level}</b>] Press any Key to restart the game`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function (){
        document.querySelector("body").style.backgroundColor = "white";
    }, 200);
    reset();
  }
}


function btnPress(){
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  console.log(userColor);
  userSequence.push(userColor);

  checkAns(userSequence.length-1);
}

for (btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
}

