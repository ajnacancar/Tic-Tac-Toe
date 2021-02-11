const x_class = 'x';
const circle_class = 'circle';
let currentElement = '';
const winning_combination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll("[data-cell]");
const messageWinning = document.querySelector("h1");
let circleTurn


    cellElements.forEach(function(element){
        element.addEventListener("click", handleClick, {
            once: true
        });
    });


function check(){
    if(circleTurn === true){
        currentElement = 'O'
        return circle_class;
    }else{
        currentElement = 'X'
        return x_class;
    }
}

function handleClick(e){
    const cell = e.target;

    

    let currentClass = check();

    placeMark(cell, currentClass);

    if(checkWin(currentClass)){
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        switchTurns();

    }


}


function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
    cell.innerHTML = currentElement;
}


function switchTurns(){
    circleTurn = !circleTurn;
}


function checkWin(currentClass){
  return  winning_combination.some(combination => {
      return combination.every(index => {
         return cellElements[index].classList.contains(currentClass);
      });
  });
}



function endGame(draw){
    if(draw){
        messageWinning.innerHTML = "DRAW!";

    }else{
        if(circleTurn == true){
        messageWinning.innerHTML = "O's WINS!";
        }else{
        messageWinning.innerHTML = "X's WINS!";

        }
    }

    setTimeout(function(){
        window.location.reload();

    },500);
}


function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class);
    });
}
