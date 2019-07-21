var $startBtn = document.querySelector("#start");
var $gameField = document.querySelector("#game");
var $time = document.querySelector("#time");
var timeHeader = document.querySelector("#time-header");
var resultHeader = document.querySelector("#result-header");
var result = document.querySelector("#result");
var gameTime = document.querySelector("#game-time");
var topResult = document.querySelector("#top");

var score = 0;
var isGameStarted = false;
var topScore = 0;

$startBtn.addEventListener("click", startGame);
$gameField.addEventListener("click", handleBoxClick);
gameTime.addEventListener("input", setGameTime);

var topText = localStorage.getItem('topScoreLc');
topResult.textContent = topText;

function hide(el) {
  el.classList.add("hide");
}

function show(el) {
  el.classList.remove("hide");
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }

  if (event.target.dataset.box) {
    score++;

    renderBox();
  }
}

function startGame() {
  score = 0;
  setGameTime();
  gameTime.setAttribute("disabled", true);
  isGameStarted = true;
  show(timeHeader);
  hide(resultHeader);
  // timeHeader.classList.remove('hide');
  // resultHeader.classList.add('hide');

  // $startBtn.classList.add('hide');
  hide($startBtn);
  $gameField.style.backgroundColor = "white";

  var interval = setInterval(function() {
    var time = parseFloat($time.textContent);

    if (time <= 0) {
      clearInterval(interval);
      // end game
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

function setGameTime() {
  var time = +gameTime.value;
  show(timeHeader);
  hide(resultHeader);

  if (gameTime) {
    $time.textContent = gameTime.value;
  } else {
    $time.textContent = time.toFixed(1);
  }
}

function setGameScore() {
  
   perSec = score / parseInt(gameTime.value);

  result.textContent = score.toString();


  if (perSec > topResult.textContent) {
     

    localStorage.setItem('topScoreLc', perSec);
    
      var topText = localStorage.getItem('topScoreLc').toString();
    //   topResult.textContent = topText;
    topResult.textContent = topText;
   
  }
}

function endGame() {
   
  isGameStarted = false;
  gameTime.removeAttribute("disabled");
  hide(timeHeader);
  show(resultHeader);

  $gameField.innerHTML = "";
  show($startBtn);

  $gameField.style.backgroundColor = "#ccc";
  setGameScore();
}

function renderBox() {
  $gameField.innerHTML = "";
  var box = document.createElement("div");
  var boxSize = getRandom(100, 30);
  var gameSize = $gameField.getBoundingClientRect();

  box.style.top = getRandom(gameSize.height - boxSize, 0) + "px";
  box.style.left = getRandom(gameSize.width - boxSize, 0) + "px";
  box.style.height = box.style.width = boxSize + "px";
  box.style.backgroundColor =
    "#" + (((Math.random() + 2) * 16777216) | 0).toString(16).slice(1);
  box.style.cursor = "pointer";
  box.style.position = "absolute";
  $gameField.insertAdjacentElement("afterbegin", box);
  box.setAttribute("data-box", "true");
}

function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}
