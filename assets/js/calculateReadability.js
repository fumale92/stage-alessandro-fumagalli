this.gulpease = function(text) {
  var lettersNumber = 0;
  var wordsNumber = 1;
  var sentencesNumber = 0;
  for (i = 0; i < text.length; i++) {
    if(text[i].match(/[a-zA-Z0-9àèéìòù%€$£]/)) {
      lettersNumber++;
    }
    if(text[i].match(/[ \t]/)) {
      wordsNumber++;
    }
    if(text[i].match(/[.!?]/) && (text[i] !== text[i+1])) {
      sentencesNumber++;
    }
  }
  if (wordsNumber < 5)
    return null;
  var gulpease = 89 + (300 * sentencesNumber - 10 * lettersNumber)/wordsNumber;
  gulpease = gulpease * 5 / 100;
  return Math.ceil(gulpease);
}


this.colemanLiau = function(text) {
  var lettersNumber = 0;
  var wordsNumber = 1;
  var sentencesNumber = 0;
  for (i = 0; i < text.length; i++) {
    if(text[i].match(/[a-zA-Z0-9àèéìòù%€$£]/)) {
      lettersNumber++;
    }
    if(text[i].match(/[ \t]/)) {
      wordsNumber++;
    }
    if(text[i].match(/[.!?]/) && (text[i] !== text[i+1])) {
      sentencesNumber++;
    }
  }
  if (wordsNumber < 5)
    return null;
  var colemanLiau = 0.0588 * (lettersNumber/wordsNumber * 100) - 0.296 * (sentencesNumber/wordsNumber * 100) - 15.8;
    colemanLiau = colemanLiau * 5 / 15;
    return Math.ceil(colemanLiau);
}


this.automatedReadability = function(text) {
  var lettersNumber = 0;
  var wordsNumber = 1;
  var sentencesNumber = 0;
  for (i = 0; i < text.length; i++) {
    if(text[i].match(/[a-zA-Z0-9àèéìòù%€$£]/)) {
      lettersNumber++;
    }
    if(text[i].match(/[ \t]/)) {
      wordsNumber++;
    }
    if(text[i].match(/[.!?]/) && (text[i] !== text[i+1])) {
      sentencesNumber++;
    }
  }
  if (wordsNumber < 5)
    return null;
  var automatedReadability = 4.71 * (lettersNumber/wordsNumber) + 0.5 * (wordsNumber/sentencesNumber) - 21.43;
  automatedReadability = automatedReadability * 5 / 15; //mapping a valori tra 0 e 5
  return Math.ceil(automatedReadability);
}
