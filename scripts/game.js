/*
    Authors: Damian Diaz, Chelsea Rodriguez
*/


// GLOBAL OBJECTS
let rolledNumbers = new Array();
let tileStates = new Array();
let tile = {
    number: 0,
    value: 0,
    selected: false
};

// SAVE HANDLING
function download_data(data, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([data], {
        type: contentType
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function save() {

    var data = {
        BOARD: 0,
        ROLLED: 0
    }
    data.BOARD = tileStates;
    data.ROLLED = rolledNumbers;

    var jsonData = JSON.stringify(data);


    download_data(jsonData, 'save.json', 'text/plain');
}

// LOAD HANDLING
(function() {

    function onChange(event) {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
    }

    function onReaderLoad(event) {

        var obj = JSON.parse(event.target.result);

        rolledNumbers = obj.ROLLED;
        tileStates = obj.BOARD;

        refreshTiles();
        refreshNumbers();

    }

    document.getElementById('file').addEventListener('change', onChange);

}());


// This function aligns the board with the tileStates array
function refreshTiles() {

    for (var i = 0; i < 24; i++) {

        var currTile = "tile" + tileStates[i].number;

        document.getElementById(currTile).innerHTML = tileStates[i].value;

        if (tileStates[i].selected) {
            document.getElementById(currTile).style.backgroundColor = 'blue';
        } else {
            document.getElementById(currTile).style.backgroundColor = '#fff';
        }

    }

}

// This function aligns the board with the rolled numbers array
function refreshNumbers() {
    if (rolledNumbers.length > 0) {
        document.getElementById("rolledNumbers").innerHTML = rolledNumbers;
    }

}

/*
 *
 *
 */

/* Adds the randomized numbers into the bingo board */
var usedNums = new Array(76);
function setTile(thisTile) {
     var currTile = "tile" + thisTile;
        var newNum;
             var colPlace = new Array(0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4);
    
        newNum = (colPlace[thisTile] + getNewNum());
        while(usedNums[newNum]==true){
            newNum = (colPlace[thisTile] + getNewNum());
           }
        usedNums[newNum] = true;
        document.getElementById(currTile).innerHTML = newNum;
        document.getElementById(currTile).className = "";
        document.getElementById(currTile).onmousedown = toggleColor;

    // tiles objects are created and stored in the states array
    let tile = new Object();
    tile.number = thisTile;
    tile.value = newNum;
    tile.selected = false;
    tileStates.push(tile);
}

function getNewNum() {
    return Math.floor((Math.random() * 75) + 1);
}

/* Displays current number and number previously called */
function myFunction() {
    var bingoNumber = Math.floor(Math.random() * 75) + 1;
    if (rolledNumbers.includes(bingoNumber))
        myFunction();
    else {
        rolledNumbers.push(bingoNumber);
        if (bingoNumber <= 75)
            document.getElementById("currentNumber").innerHTML = bingoNumber;
        else
            document.getElementById("currentNumber").innerHTML = bingoNumber;
        document.getElementById("rolledNumbers").innerHTML = rolledNumbers;
    }
}
/* To add a new card to the  Bingo Table */
function newCard() {
    for (var i = 0; i < 24; i++) {
        setTile(i);

    }
}
/* Handles the marked tile on the bingo board */
function toggleColor(tile) {
    var tdElm = tile.target || tile.srcElement;
    let tileNum = tile.path[0].id;
    tileNum = tileNum.replace("tile", "");
    tileNum = parseInt(tileNum);

    if(rolledNumbers.includes(tileStates[tileNum].value)){
    tile = tile || tile.event;
     if(tile){
  }
    else{
    var tdElm = window.event.selected;
    }
    if(tdElm.className == ""){
    tdElm.className = "selectedTile";
    tileStates[tileNum].selected = true;
    }
    else {
      tdElm.className = "";
      tileStates[tileNum] = false;
    }
    bingoWin();
}
else{
    console.log("Tried number: " + tileStates[tileNum].value)
    console.log(rolledNumbers)
    alert("Oops! that number wasnt rolled.")
}
  }
  
function bingoWin() {
     var winningTile = -1;
     var setTile = 0;
    var winners = new Array(31,992,15360,507904,541729,557328,1083458,2162820,4329736,8519745,8659472,16252928);
      /* Horizontal Function */ 
    
  for (var i=0; i<24; i++) {
  var currTile = "tile" + i;
      if (document.getElementById(currTile).className != ""){
        document.getElementById(currTile).className = "selectedTile";
        setTile =  setTile | Math.pow(2,i);
        }
      } 
      /* Vertical Function */  
      for (var i=0; i< winners.length; i++) {
      if ((winners[i] & setTile) == winners[i]  ) {
        winningTile = i;
        alert("Congratulations you won BINGO!!!");
      }
    }
    /* Diagnal Function */
    if (winningTile > 0){
      for (var j=0; j<24; j++){
        if (winners[winningTile] & Math.pow(2,j ) ){
          currTile = "tile" + j;
          document.getElementById(currTile).className = "";
          }
        }
      }
    } 

newCard();
