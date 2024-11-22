//create Array
const symbols=[
    {name:"Face Book",
     icon:'<i class="fa-brands fa-facebook"></i>'
    },
    {name:"Twitter",
        icon:'<i class="fa-brands fa-twitter"></i>'
       },
       {name:"Istagram",
        icon:'<i class="fa-brands fa-instagram"></i>'
       },
       {name:"Tiktok",
        icon:'<i class="fa-brands fa-tiktok"></i>'
       },
       {name:"Love",
        icon:'<i class="fa-solid fa-heart"></i>'
       },
       {name:"You Tube",
        icon:'<i class="fa-brands fa-youtube"></i>'
       },
       {name:"Comments",
        icon:'<i class="fa-regular fa-comment"></i>'
       },
       {name:"Flim",
        icon:'<i class="fa-solid fa-film"></i>'
       }    
]

let timer=0;
let intervel;
let istTimerStarted=false;
let flippedCards=[]
//copy of array
let cards=[...symbols,...symbols]

// Shuffle function

function shuffle(array){
return array.sort(()=>Math.floor(Math.random()-0.5))
}

//create game board
const gameBoard=document.getElementById("game-board")
const restartButton=document.getElementById("restart")
const timerDisplay=document.getElementById("timer")


function createGameBoard(){
    gameBoard.innerHTML=""; //clear board
    cards=shuffle(cards)
    cards.forEach( (symbol) => {
        const card=document.createElement("div")
        card.classList.add("card");
         card.innerHTML=
                        `<div class="card-inner">
                         <div class="front"> ${symbol.icon}</div>
                         <div class="back"><i class="thick">🤔</i></div>
                          </div>`
                          
        card.dataset.symbol=symbol.name
        gameBoard.appendChild(card)

        card.addEventListener("click",handleCardClick);

    });
    
}

//HandleClick

function handleCardClick(e){

    const card=e.currentTarget;
    if(card.classList.contains("flipped")|| flippedCards.length===2){
        return;
    }

if(!istTimerStarted)
{
    startTimer();
    istTimerStarted=true;
}

    card.classList.add("flipped");
    flippedCards.push(card);
    if(flippedCards.length===2){
        cardMatch();
    }
}

//check for match
let matchedpairs=0
function cardMatch(){
    const [card1,card2]=flippedCards

    if(card1.dataset.symbol==card2.dataset.symbol)
    {
matchedpairs++;
flippedCards=[];

// win 

if(matchedpairs===symbols.length)
{
    clearInterval(intervel);
    alert(`If you want to win in life, close all these apps right now. Choose within ${timer}, and delete these apps at the same time `)
   

}
    }
    else{
        setTimeout(()=>{
            card1.classList.remove("flipped")
            card2.classList.remove("flipped")
            flippedCards=[]
        },1000)
    }
}

//Restart Game

function restartGame(){
    timer=0;
    matchedpairs=0
    flippedCards=[]
    istTimerStarted=false
    timerDisplay.textContent=`Time: 0s`
    clearInterval(intervel);
    createGameBoard();
}



//timer
function startTimer(){
    intervel=setInterval(()=>{
        timer++;
        timerDisplay.textContent=`Time: ${timer} s`
    },1000)
}

restartButton.addEventListener("click",restartGame);
restartGame()






