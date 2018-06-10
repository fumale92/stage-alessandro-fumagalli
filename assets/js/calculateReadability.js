this.gulpease = function(text) {
  var lettersNumber = 0;
  var wordsNumber = 1;
  var sentencesNumber = 0;
  for (i = 0; i < text.length; i++) {
    if (text[i].match(/[a-zA-Z0-9àèéìòù%€$£]/)) {
      lettersNumber++;
    }
    if (text[i].match(/[ \t]/)) {
      wordsNumber++;
    }
    if (text[i].match(/[.!?]/) && (text[i] !== text[i + 1])) {
      sentencesNumber++;
    }
  }
  if (wordsNumber < 5)
    return null;
  var gulpease = 89 + (300 * sentencesNumber - 10 * lettersNumber) / wordsNumber;
  gulpease = gulpease * 5 / 100;
  return Math.ceil(gulpease);
}