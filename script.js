let selectedRange = "";

let coins = 1000;

function updateCoins(){
    document.getElementById("coins").innerText = coins;
}

function selectRange(range){

    selectedRange = range;

    document.querySelectorAll(".prediction button")
    .forEach(btn => btn.classList.remove("selected"));

    let multiplier = "";

    if(range === "1-6"){
        document.getElementById("r1").classList.add("selected");
        multiplier = "3x";
    }

    if(range === "7-12"){
        document.getElementById("r2").classList.add("selected");
        multiplier = "2x";
    }

    if(range === "13-18"){
        document.getElementById("r3").classList.add("selected");
        multiplier = "3x";
    }

    document.getElementById("multiplierText")
    .innerHTML = `Multiplier: ${multiplier}`;
}

const rollAudio = document.getElementById("rollSound");

rollAudio.currentTime = 0;
rollAudio.play();

let isRolling = false;

function rollDice(){
  if(isRolling) return;

  isRolling = true;

    if(selectedRange === ""){
        alert("Select a prediction first!");
        return;
    }

    let bet = parseInt(
        document.getElementById("betAmount").value
    );

    if(!bet || bet <= 0){
        alert("Enter valid bet amount");
        return;
    }

    if(bet > coins){
        alert("Not enough coins!");
        return;
    }

    document.getElementById("rollSound").play();

    document.querySelectorAll(".dice")
    .forEach(d => d.classList.add("rolling"));

    setTimeout(() => {

        let d1 = Math.floor(Math.random()*6)+1;
        let d2 = Math.floor(Math.random()*6)+1;
        let d3 = Math.floor(Math.random()*6)+1;

        document.querySelectorAll(".dice")
        .forEach(d => d.classList.remove("rolling"));

       rollAudio.pause();
       rollAudio.currentTime = 0;

        document.getElementById("dice1").innerText = "🎲";
        document.getElementById("dice2").innerText = "🎲";
        document.getElementById("dice3").innerText ="🎲";

        let total = d1 + d2 + d3;

        document.getElementById("sum").innerHTML =
        `Total Sum = <b>${total}</b>`;

        let actualRange;

        if(total <= 6)
            actualRange = "1-6";
        else if(total <= 12)
            actualRange = "7-12";
        else
            actualRange = "13-18";

        let multiplier = 1;

        if(selectedRange === "1-6")
            multiplier = 3;

        if(selectedRange === "7-12")
            multiplier = 2;

        if(selectedRange === "13-18")
            multiplier = 3;

        if(actualRange === selectedRange){

        let winnings = bet * multiplier;

        coins += winnings;

        document.getElementById("result").innerHTML =
            `🎉 You Won ${winnings} Coins!`;

        document.getElementById("result").style.color = "green";

        document.getElementById("winSound").currentTime = 0;
        document.getElementById("winSound").play();

    } else {

        coins -= bet;

        document.getElementById("result").innerHTML =
            `❌ Lost ${bet} Coins`;

        document.getElementById("result").style.color = "red";

        document.getElementById("loseSound").currentTime = 0;
        document.getElementById("loseSound").play();
    }


        updateCoins();
        
        isRolling = false;
    }, 2000);
}

function toggleMode(){

    document.body.classList.toggle("dark");

    let btn=document.querySelector(".mode-btn");

    if(document.body.classList.contains("dark")){
        btn.innerHTML="☀️ Light";
    }
    else{
        btn.innerHTML="🌙 Dark";
    }
}

updateCoins();
