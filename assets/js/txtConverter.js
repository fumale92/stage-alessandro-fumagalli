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
  let title = [];
  $.ajax({
    async: false,
    url: "uploads/"+data,
    success: function(result){
      $('#pdf-text').html(result);
      $('.WordSection1').children().each(function(){
        if(this.tagName == 'H1')
          title.push(this.innerText);
        else if(this.tagName == 'P' && this.innerText.charCodeAt(0) != 160)
          paragraphs.push(this.innerText);
      });
    },
    error: function(error){
      console.log(error);
    }
  });
  $('#pdf-text').empty();
  
  return new InformedConsent(title, null, paragraphs);  //crea una nuova classe di tipo InformedConsent a cui si passa il titolo, il piè pagina e l'array dei paragrafi
}

textToParagraph = function(text){
  var paragraphs = [];      //array che conterrà tutti i p
  var title = [];           //array che conterrà tutti i titoli
  var footer = "";          //stringa che conterrà il piè di pagina
  var index = 0;            //variabile che contiene il numero di indice del paragrafo

  for (var i = 0; i < text.length; i++) {
    if (text[i].length > 1) {             //non considera le righe che contengono solo uno /r del txt
      text[i] = text[i].slice(0, -1);     //toglie lo /r alla fine di ogni riga
    }
    if (text[i].match(/\$\s*(.*)\$/))     //considera le righe che cominciano e terminano con il simbolo $ che identifica il titolo
      title.push(text[i].slice(1, -1));   //inserisce nell'array title la riga tranne il primo e l'ultimo carattere $
    else if (text[i].match(/\#\s*(.*)\#/))  //considera le righe che cominciano e terminano con il simgolo # che identifica il piè pagina
      footer = text[i].slice(1, -1);        //essendo il piè pagina unico, inserisce la riga che lo contiene nella variabile footer
    else if (text[i] === "\r") {          //considera le righe uguali a /r
      var pIndex = paragraphs[index];     //alla variabile pIndex si assegna il paragrafo all'indice index
      pIndex = pIndex[pIndex.length-1];   //a pIndex si assegna il penultimo elemento di pIndex
      if (!pIndex.match(/[A-Z\_\.\@\]\)]/)) //considera solo i pIndex diversi da A-Z maiuscole e dai simboli _ . ] )
        paragraphs[index] += ".";         //aggiunge alla fine del paragrafo il punto
      index++;
    } else {
      if(paragraphs[index] === undefined){  //considera i paragrafi di indice index all'interno dell'array paragraphs uguali ad undefined
        paragraphs[index] = text[i];        //a quel paragrafo si aggiunge il testo
      } else
        paragraphs[index] += (" " + text[i]);   //altrimenti si aggiunge uno spazio prima del testo
    }
  }
  return new InformedConsent(title, footer, paragraphs);  //crea una nuova classe di tipo InformedConsent a cui si passa il titolo, il piè pagina e l'array dei paragrafi
}
