import poems from './poems.js';

const app = {};

app.poemIndex = -1;
app.lineIndex = 0;

app.getNextPoem = () => {
  app.poemIndex++;
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
    body.empty();
    body.show();
    body.html(`this experience was created by miko sramek with a selection of poems taken from <a href="http://bit.ly/2PmYB6j" target="_blank">this google doc</a>`);
  }
}

app.getNextLine = () => {
  console.log("tick");
  if(app.lineIndex < poems[app.poemIndex].poem.length){
    $( "<p>Test</p>" ).appendTo( ".inner" );
    const a = $(`<li class="poemLine">${poems[app.poemIndex].poem[app.lineIndex]}</li>`).appendTo('#poemBody');
    const lengthOfLine = poems[app.poemIndex].poem[app.lineIndex].length;
    a.hide().fadeIn(750);
    app.lineIndex++;
    setTimeout(app.getNextLine, 700 + lengthOfLine*15);
  } else {
    setTimeout(app.FadeInButton, 500);
  }
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
}

$(document).ready(function(){
  app.init();
});


