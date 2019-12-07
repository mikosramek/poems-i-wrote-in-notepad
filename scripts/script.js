import poems from './poems.js';

const app = {};

app.poemIndex = -1;
app.lineIndex = 0;

app.getNextPoem = () => {
  app.poemIndex++;
  $('#poemCounter').text(`${app.poemIndex+1} / ${poems.length + 1}`);
  if(app.poemIndex < poems.length){
    $('#poemTitle').text(poems[app.poemIndex].title);
    $('#poemTitle').fadeIn(300 + poems[app.poemIndex].title.length * 5);
    const body = $('#poemBody');
    body.empty();
    body.show();
    app.lineIndex = 0;
    setTimeout(app.getNextLine, 900 + poems[app.poemIndex].title.length * 5);
  }else{
    const body = $('#poemBody');
    $('#poemTitle').text('credits');
    $('#poemTitle').show();
    body.empty();
    body.html(
      `<li><p>this experience was created by miko sramek with a selection of poems taken from <a href="http://bit.ly/2PmYB6j" target="_blank">this google doc</a></p></li>
      <li><p>
        mark baldyga is a liberal arts major who is totally not homeless yet but probably will be soon and would really appreciate it if you could spare like a dollar or twenty, man
      </p></li>
      <li><p>
        his fiction is forthcoming in the Journal of Microliterature 
      </p></li>
      <li><p>
        he can be reached at markanthonybaldyga@gmail.com
      </p></li>
      <li><button id="#restartButton">start again</button></li>`
    );
    body.fadeIn(350);
  }
  if(app.poemIndex === poems.length-1){
    $('#getNextPoem').text('view credits');
  }
}

app.getNextLine = () => {
  if(app.lineIndex < poems[app.poemIndex].poem.length){
    $( "<p>Test</p>" ).appendTo( ".inner" );
    const a = $(`<li class="poemLine">${poems[app.poemIndex].poem[app.lineIndex]}</li>`).appendTo('#poemBody');
    const lengthOfLine = poems[app.poemIndex].poem[app.lineIndex].length;
    a.hide().fadeIn(750);
    app.lineIndex++;
    const timeoutTime = Math.clip(700 + lengthOfLine*30, 0, 2500);

    setTimeout(app.getNextLine, timeoutTime);
  } else {
    setTimeout(app.FadeInButton, 500);
  }
}


Math.clip = function(number, min, max) {
  return Math.max(min, Math.min(number, max));
}



app.restart = () => {
  
}

app.FadeInButton = () => {
  $('#getNextPoem').fadeIn(350);
}

app.init = () => {
  app.getNextPoem();

  const nb = $('#getNextPoem');
  nb.on('click', () => {
    $('#getNextPoem').fadeOut(350);
    $('#poemTitle').fadeOut(350);
    $('#poemBody').fadeOut(350, () => {
      app.getNextPoem();
    });
  })
  $('#poemBody').on('click', 'button', () => {
    $('#poemTitle').fadeOut(500);
    $('#poemBody').fadeOut(500, () => {
      app.poemIndex = -1;
      app.getNextPoem();
      $('#getNextPoem').text('next poem');
    });
  });
}

$(document).ready(function(){
  app.init();
});


