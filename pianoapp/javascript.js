// JavaScript Document

var sAudioMap = {};

function getAudio(path) {
  "use strict";
  var result = sAudioMap[path];
  if (!result) {
    result = new Audio();
    result.src = path;
    sAudioMap[path] = result;
  }
  return result;
}

var up = 0;
var note;
var button;
var ourTimer;
var notesWrong = 0;
var notesCorrect = 0;
var timer = 0;
var minute = 0;
var second = 0;
var overlay;
var results;

function time() {
  "use strict";
  timer++;
  minute = parseInt(timer / 60, 10);
  second = parseInt(timer % 60, 10);

  second = second < 10 ? "0" + second : second;
}

function ChangeKeyBlue(thisKey) {
  "use strict";
  var keys = document.getElementsByClassName("key");
  var keys_b = document.getElementsByClassName("key_b");

  note = thisKey.id;

  for (var i = 0; i < keys.length; i++) {
    keys[i].style.backgroundColor = "white";
  }
  for (var j = 0; j < keys_b.length; j++) {
    keys_b[j].style.backgroundColor = "black";
  }
  thisKey.style.backgroundColor = "rgb(62, 152, 209)";
}

//Changes button selected to blue while returning unselected buttons back to normal
function buttonFunction(vari) {
  "use strict";
  button = vari.id;
  var buttons = document.getElementsByTagName("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = "";
  }
  vari.style.backgroundColor = "rgb(62, 152, 209)";
}

//Change current key to Yellow onMouseOver
function mov(thisKey) {
  "use strict";
  if (thisKey.style.backgroundColor !== "rgb(62, 152, 209)") {
    thisKey.style.backgroundColor = "yellow";
  }
}

//Change current key to white onMouseOut
function moo(thisKey) {
  "use strict";
  if (thisKey.style.backgroundColor !== "rgb(62, 152, 209)") {
    thisKey.style.backgroundColor = "white";
  }
}

//Change current b_key to black onMouseOut
function mob(thisKey) {
  "use strict";
  if (thisKey.style.backgroundColor !== "rgb(62, 152, 209)") {
    thisKey.style.backgroundColor = "black";
  }
}

var flashCards = [
  ["c2", 126, 197, "quarter"],
  ["d2", 126, 190, "quarter"],
  ["e2", 126, 185, "quarter"],
  ["f2", 126, 176, "quarter"],
  ["g2", 126, 170, "quarter"],
  ["a2", 126, 165, "quarter"],
  ["b2", 126, 158, "quarter"],
  ["c3", 126, 153, "quarter"],
  ["d3", 126, 147, "quarter"],
  ["e3", 126, 176, "quarterUp"],
  ["f3", 126, 170, "quarterUp"],
  ["g3", 126, 165, "quarterUp"],
  ["a3", 126, 158, "quarterUp"],
  ["b3", 126, 152, "quarterUp"],
  ["c4", 126, 144, "quarterUp"],
  ["d4", 126, 139, "quarterUp"],
  ["e4", 126, 132, "quarterUp"],
  ["a3", 126, 85, "quarter"],
  ["b3", 126, 79, "quarter"],
  ["c4", 126, 73, "quarter"],
  ["d4", 126, 66, "quarter"],
  ["e4", 126, 60, "quarter"],
  ["f4", 126, 54, "quarter"],
  ["g4", 126, 48, "quarter"],
  ["a4", 126, 43, "quarter"],
  ["b4", 126, 37, "quarter"],
  ["c5", 126, 66, "quarterUp"],
  ["d5", 126, 60, "quarterUp"],
  ["e5", 126, 55, "quarterUp"],
  ["f5", 126, 49, "quarterUp"],
  ["g5", 126, 43, "quarterUp"],
  ["a5", 126, 35, "quarterUp"],
  ["b5", 126, 29, "quarterUp"],
  ["c6", 126, 23, "quarterUp"]
];

var currentLetter = "";
var currentAccidental = "";
var currentKey = "";
var currentCard = 0;

function randRange(min, max) {
  "use strict";
  return Math.round(Math.random() * (max - min) + min);
}

function shuffleCards() {
  "use strict";
  for (var i = 0; i < 1000; i++) {
    var holder;
    var cardOne;
    var cardTwo;
    cardOne = randRange(0, flashCards.length - 1);
    cardTwo = randRange(0, flashCards.length - 1);
    holder = flashCards[cardOne];
    flashCards[cardOne] = flashCards[cardTwo];
    flashCards[cardTwo] = holder;
  }
}

var enable = true;
var bod = document.getElementsByTagName("body");

function finish() {
  "use strict";
  bod[0].style.backgroundColor = "#999";
  clearInterval(ourTimer);
  overlay = document.getElementById("overlay");
  results = document.getElementById("results");
  var time = document.getElementById("time");
  var correct = document.getElementById("correct");
  var incorrect = document.getElementById("incorrect");
  enable = false;
  overlay.className = "show";
  results.className = "show";
  correct.innerHTML = notesCorrect;
  incorrect.innerHTML = notesWrong;
  time.innerHTML = minute + ":" + second;
  return;
}

function getScores() {
  var ajax = new XMLHttpRequest();
  var url = "../controller/getscores.php";

  ajax.open("GET", url, true);
  ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  ajax.onreadystatechange = function() {
    if (ajax.readyState === 4 && ajax.status === 200) {
      document.getElementById("score_data").innerHTML = ajax.responseText;
    }
  }
  ajax.send();
}

function sendData() {
  "use strict";

  var ajax = new XMLHttpRequest();
  var content = "time=00:" + minute + ":" + second + "&correct=" + notesCorrect;
  var url = "../controller/input.php";

  ajax.open("POST", url, true);

  // Must have request header or AJAX wont work!
  ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  ajax.onreadystatechange = function() {
    if (ajax.readyState === 4 && ajax.status === 200) {
      document.getElementById("sendStuff").disabled = true;
      document.getElementById("score_data").innerHTML = ajax.responseText;
    }
  };
  ajax.send(content);
}

function newGame() {
  "use strict";
  document.getElementById("sendStuff").disabled = false;
  location.reload();
  /*
  In the event I want to stay on same page and run new game
  bod[0].style.backgroundColor = "white";
  overlay.className = "";
  results.className = "";
  notesWrong = 0;
  notesCorrect = 0;
  timer = 0;
  minute = 0;
  second = 0;
  enable = true;
  currentLetter = "";
  currentAccidental = "";
  currentKey = "";
  currentCard = 0;
  shuffleCards();
  ourTimer = setInterval(time, 1000);
  init();
  */
}

function showNote() {
  "use strict";
  up++;
  if (flashCards[currentCard] === undefined) {
    return finish();
  }

  if (flashCards[currentCard][3] === "quarter") {
    ctx.drawImage(img8, 126, flashCards[currentCard][2], 19, 48);
  } else if (flashCards[currentCard][3] === "quarterUp") {
    ctx.drawImage(img9, 126, flashCards[currentCard][2], 19, 48);
  }

  switch (flashCards[currentCard][2]) {
    case 23:
      ctx.drawImage(img7, 120, 28, 30, 2);
      ctx.drawImage(img7, 120, 40, 30, 2);
      break;
    case 29:
      ctx.drawImage(img7, 120, 40, 30, 2);
      break;
    case 35:
      ctx.drawImage(img7, 120, 40, 30, 2);
      break;
    case 73:
      ctx.drawImage(img7, 120, 114, 30, 2);
      break;
    case 79:
      ctx.drawImage(img7, 120, 114, 30, 2);
      break;
    case 85:
      ctx.drawImage(img7, 120, 126, 30, 2);
      ctx.drawImage(img7, 120, 114, 30, 2);
      break;
    case 132:
      ctx.drawImage(img7, 120, 150, 30, 2);
      ctx.drawImage(img7, 120, 138, 30, 2);
      break;
    case 139:
      ctx.drawImage(img7, 120, 150, 30, 2);
      break;
    case 144:
      ctx.drawImage(img7, 120, 150, 30, 2);
      break;
    case 185:
      ctx.drawImage(img7, 120, 225, 30, 2);
      break;
    case 190:
      ctx.drawImage(img7, 120, 225, 30, 2);
      break;
    case 197:
      ctx.drawImage(img7, 120, 225, 30, 2);
      ctx.drawImage(img7, 120, 237, 30, 2);
      break;
    default:
      break;
  }
}

function init() {
  ctx.clearRect(0, 0, 250, 260);
  //Draw each Image:
  ctx.drawImage(img, 10, 55, 10, 157); //brace
  ctx.drawImage(img1, 23, 55, 2, 157); //vertical
  ctx.drawImage(img2, 231, 55, 2, 157); //vertical2
  ctx.drawImage(img3, 23, 53, 210, 50); //staff G_Clef
  ctx.drawImage(img4, 23, 163, 210, 50); //staff2 F_Clef
  ctx.drawImage(img5, 30, 163, 35, 39); //F_clef
  ctx.drawImage(img6, 30, 38, 32, 78); //G_clef

  currentLetter = "";
  currentAccidental = "Natural";
  currentKey = "";

  showNote();
}

function nextCard() {
  currentCard++;
  init();
}

var ding;
var badDing;

function check() {
  "use strict";
  var firstNote = flashCards[currentCard][0];
  var first = firstNote.split("");
  if (firstNote !== note || first[0] !== button) {
    badDing.play();
    notesWrong++;
    nextCard();
  } else {
    ding.play();
    notesCorrect++;
    nextCard();
  }
}

function toWhite() {
  "use strict";
  var keys = document.getElementsByClassName("key");
  var keys_b = document.getElementsByClassName("key_b");
  for (var i = 0; i < keys.length; i++) {
    keys[i].style.backgroundColor = "white";
  }
  for (var j = 0; j < keys_b.length; j++) {
    keys_b[j].style.backgroundColor = "black";
  }
  var buttons = document.getElementsByTagName("button");
  for (var k = 0; k < buttons.length; k++) {
    buttons[k].style.backgroundColor = "";
  }
  check();
}


var canvas;
var ctx;
var img;
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
var img9;
//START OF WINDOW.ONLOAD FUNCTION
window.onload = function() {
  "use strict";
  ding = getAudio("ding2.wav");
  badDing = getAudio("uterror.wav");
  //Canvas Flashcard creator:
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  //Get each image:
  img = document.getElementById("brace");
  img1 = document.getElementById("vertical");
  img2 = document.getElementById("vertical2");
  img3 = document.getElementById("staff");
  img4 = document.getElementById("staff2");
  img5 = document.getElementById("F_clef");
  img6 = document.getElementById("G_clef");
  img7 = document.getElementById("ledger");
  img8 = document.getElementById("quarter");
  img9 = document.getElementById("quarterUp");

  shuffleCards();
  ourTimer = setInterval(time, 1000);
  init();

  window.addEventListener("keypress", function(event) {
    if (enable == true) {
      var buttons = document.getElementsByTagName("button");
      switch (event.which) {
        case 97:
          buttonFunction(buttons[3]);
          break;
        case 98:
          buttonFunction(buttons[4]);
          break;
        case 99:
          buttonFunction(buttons[5]);
          break;
        case 100:
          buttonFunction(buttons[6]);
          break;
        case 101:
          buttonFunction(buttons[7]);
          break;
        case 102:
          buttonFunction(buttons[8]);
          break;
        case 103:
          buttonFunction(buttons[9]);
          break;
        case 32:
          event.preventDefault();
          toWhite();
          break;
        default:
          break;
      }
    }
  });
}; //END: window.onload function();
