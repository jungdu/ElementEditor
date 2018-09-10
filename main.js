var currentCursor = 0;
window.onload = function(){
  document.body.onkeydown = function(event){
    console.log("keycode : ", event);
    if(event.key === "Backspace"){
      if(currentCursor > 0){
        --currentCursor;
        removeLetter(currentCursor);
        removeCursor();
        locateCursor();
      }
    } else if(event.key === "ArrowLeft"){
      if(currentCursor > 0){
        --currentCursor;
        removeCursor();
        locateCursor();
      }
    } else if(event.key === "ArrowRight"){
      ++currentCursor;
      removeCursor();
      locateCursor();
    } else if(event.key.length === 1 && !event.ctrlKey){
      addLetter(event.key);
      ++currentCursor;
      removeCursor();
      locateCursor();
    }
  }
}

function textClick(event){
  removeCursor();

  currentCursor = window.getSelection().anchorOffset;

  locateCursor();
}

function removeLetter(idx){
  var cloneText = document.querySelector("#ptag").innerHTML.split("");
  cloneText.splice(currentCursor, 1);
  document.querySelector("#ptag").innerHTML = cloneText.join("");
}

function addLetter(keycode){
  var cloneText = document.querySelector("#ptag").innerHTML.split("");
  cloneText.splice(currentCursor, 0, keycode);
  document.querySelector("#ptag").innerHTML = cloneText.join("");
}

function removeCursor(){
  var blankCur = document.querySelector(".blank_cursor");
  if(blankCur){
    blankCur.parentNode.removeChild(blankCur);
  }
}

function locateCursor(){
  var cloneText = document.querySelector("#ptag").innerHTML.split("");
  cloneText.splice(currentCursor, 0, "<b class='blank_cursor blink'>|</b>");
  document.querySelector("#clonetag").innerHTML = cloneText.join("");
}
