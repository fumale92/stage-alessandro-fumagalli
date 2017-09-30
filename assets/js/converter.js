txtToText = function(data){
  var txtFile = new XMLHttpRequest();
  txtFile.open("GET", "uploads/"+data, false);
  txtFile.overrideMimeType('text/xml; charset=iso-8859-1');
  var lines;
  txtFile.onreadystatechange = function() {
    if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
      if (txtFile.status === 200) {  // Makes sure it's found the file.
        lines = txtFile.responseText.split("\n"); // Will separate each line into an array
      }
    }
  }
  txtFile.send(null);
  return lines;
}

htmlToText = function(data){
  let paragraphs = [];
  let footer = "";
  let title = [];
  $.ajax({
    async: false,
    url: "uploads/"+data,
    success: function(result){
      let txt = '';
      $('#pdf-text').html(result);
      $('.WordSection1').children().each(function(){
        if(this.tagName == 'H1')
          title.push(this.innerText);
        else if(this.tagName == 'P' && this.innerText.charCodeAt(0) != 160)
          paragraphs.push(this.innerText);
        else if (this.tagName == 'H2')
          footer = this.innerText;
        else if(this.tagName == 'H3')
          txt += ('@'+this.innerText+'@ ');
        else if (this.innerText.charCodeAt(0) == 160 && txt != '') {
          paragraphs.push(txt);
          txt = '';
        }
      });
    },
    error: function(error){
      console.log(error);
    }
  });
  $('#pdf-text').empty();

  return new InformedConsent(title, footer, paragraphs);
}

textToParagraph = function(text){
  var paragraphs = [];
  var title = [];
  var footer = "";
  var index = 0;

  for (var i = 0; i < text.length; i++) {
    if (text[i].length > 1) {
      text[i] = text[i].slice(0, -1);
    }
    if (text[i].match(/\$\s*(.*)\$/))
      title.push(text[i].slice(1, -1));
    else if (text[i].match(/\#\s*(.*)\#/))
      footer = text[i].slice(1, -1);
    else if (text[i] === "\r") {
      var pIndex = paragraphs[index];
      pIndex = pIndex[pIndex.length-1];
      if (!pIndex.match(/[A-Z\_\.\:\s\@\]\)]/))
        paragraphs[index] += ".";
      index++;
    } else {
      if(paragraphs[index] === undefined){
        paragraphs[index] = text[i];
      } else
        paragraphs[index] += (" " + text[i]);
    }
  }
  return new InformedConsent(title, footer, paragraphs);
}
