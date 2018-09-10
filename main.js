var currentCursor = 0;
var texts = 
  [
    {
      text:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sint quod molestiae, aspernatur voluptatum illo soluta reiciendis accusamus veniam!`,
      style: []
    },
    {
      text:`Quisquam iure similique asperiores perferendis eos? Quos sed laborum deserunt eius.`,
      style: []
    },
    {
      text:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sint quod molestiae,`,
      style: []
    }
  ];
var selected = 0;

// 텍스트 값의 변화가 일어 났을 경우에는 renderText함수를 호출하여 다시 render해주어야함
function renderText(){
  document.querySelector("#text_editor").innerHTML = "";
  for(var i = 0; i <texts.length; i++){
    var pcont = document.createElement('div');
    var peditor = document.createElement('p');
    peditor.innerHTML = texts[i].text;
    
    var pdisplay = peditor.cloneNode(true);
    pcont.className="p_cont";
    pdisplay.className = "clonetag";
    peditor.className = "p_editor";
    pcont.appendChild(peditor);
    pcont.appendChild(pdisplay);
    texts[i].display = pdisplay;

    peditor.onclick = ((idx, pdis) => function(event){
      clearCursor();
      selected = idx;
      currentCursor = window.getSelection().anchorOffset;
      locateCursor(currentCursor, pdis);
    })(i, pdisplay);
    document.querySelector("#text_editor").appendChild(pcont);
  }
}

function locateCursor(idx){
  var textArr = texts[selected].text.split('');
  textArr.splice(idx, 0, '<b id="p_cursor" class="blink">|</b>');
  texts[selected].display.innerHTML = textArr.join("");  
}

function clearCursor(){
  var cursor = document.querySelector("#p_cursor");
  if(cursor){
    cursor.parentNode.removeChild(cursor);
  }
}

window.onload = function(){
  renderText();
  document.body.onkeydown = keydownEvent;
}

function keydownEvent(event){
  if(selected === -1){
    return;
  }

  if(event.key === "Backspace"){
    if(currentCursor>0){
      --currentCursor;
      clearCursor()
      var textArr = texts[selected].text.split('');
      textArr.splice(currentCursor, 1);
      texts[selected].text = textArr.join("");
      renderText();
      locateCursor(currentCursor);
    } 
  }else if(event.key === "ArrowLeft"){
    if(currentCursor > 0){
      --currentCursor;
      clearCursor();
      locateCursor(currentCursor);
    }
  } else if(event.key === "ArrowRight"){
    ++currentCursor;
    clearCursor();
    locateCursor(currentCursor);
  }else if(event.key.length === 1 && !event.ctrlKey){
    var textArr = texts[selected].text.split('');
    textArr.splice(currentCursor, 0, event.key);
    texts[selected].text = textArr.join("");
    renderText();
    ++currentCursor;
    clearCursor();
    locateCursor(currentCursor);
  }
}
