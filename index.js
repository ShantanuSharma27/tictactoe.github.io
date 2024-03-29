const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPostions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//lets create functin to intiliaze the game
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    //ui par empty kar do
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //initalize boxed with css properties again
        box.classList=`box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="0";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";
    winningPostions.forEach((position)=>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[0]]!=="")
        &&(gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){
            if(gameGrid[position[0]]==="X")
                answer="X";
            else    
                answer="0";
            //disable pointer event
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            //now we know x/0 is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
    
    }
    });
if(answer!==""){
    gameInfo.innerText=`Winner Player-${answer}`;
    newGameBtn.classList.add("active");
    return;
}
//when there is no winner
let fillcount=0;
gameGrid.forEach((box)=>{
    if(box!="")
        fillcount++;
});
    if(fillcount===9){
        gameInfo.innerText="Game Tied!";
        newGameBtn.classList.add("active");
    }
}
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer
        boxes[index].style.pointerEvents="none";
        //swap kro turn ko
        swapTurn();
        //check karo koi game jeet toh  nhi gaya
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{//konsa box click hua hai isliye ind3x liya hai ,indes apne app generate hota hai
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});
newGameBtn.addEventListener("click",initGame);