class InformedConsent {

  constructor(title, footer, paragraphs) {
    this.readabilityIndexes = {};
    this.title = title;
    this.footer = footer;
    this.paragraphs = new Array();
    this.accepted;
    this.createParagraphs(paragraphs);
    this.readabilityScore();
  }

  createParagraphs(paragraphs){
    for (var i = 0; i < paragraphs.length; i++) {
      this.paragraphs.push(
        {
          id: i+1,
          text: paragraphs[i],
          readabilityIndexes: {},
          reactions: []
        }
      );
      if(!paragraphs[i].match(/\@\s*(.*)\@/)){
        this.paragraphs[i].readabilityIndexes.gulpease = gulpease(this.paragraphs[i].text);
        this.paragraphs[i].readabilityIndexes.colemanLiau = colemanLiau(this.paragraphs[i].text);
        this.paragraphs[i].readabilityIndexes.ari = automatedReadability(this.paragraphs[i].text);
      }
    }
  }


  readabilityScore() {
    gulpease = 0;
    colemanLiau = 0;
    automatedReadability = 0;
    for (var i = 0; i < this.paragraphs.length; i++) {
      if(!jQuery.isEmptyObject(this.paragraphs[i].readabilityIndexes)){
        gulpease += this.paragraphs[i].readabilityIndexes.gulpease;
        colemanLiau += this.paragraphs[i].readabilityIndexes.colemanLiau;
        automatedReadability += this.paragraphs[i].readabilityIndexes.ari;
      }
    }
    this.readabilityIndexes.gulpease = Math.round(gulpease/(this.paragraphs.length)*100/5);
    this.readabilityIndexes.colemanLiau = Math.round(colemanLiau/(this.paragraphs.length)*15/5);
    this.readabilityIndexes.ari = Math.round(automatedReadability/(this.paragraphs.length)*15/5);
  }


  createHeader() {
    this.title.forEach(function(subtitle) {
      $("#header").append("<h4>" + subtitle + "</h4>");
    })
    if (this.footer)
      $("#header").append("<h5>\"" + this.footer + "\"</h5>");
    var headerHeight = $("#header").height() > $("#visualization").height()? $("#header").height() : $("#visualization").height()+20;
    var briefingHeight = $("#briefing").height();
    var height = headerHeight + briefingHeight + 10;
    $("#text-body").css({"margin-top": (height + 'px')})
  }


  paragraphsToHtml() {
    var n = 1;
    this.paragraphs.forEach(function(paragraph){
      var text;
      var tmp = "";
      if (paragraph.text.match(/\@\s*(.*)\@/)){
        for (var i = 1; i < paragraph.text.length-1; i++) {
          if(paragraph.text[i] == '@'){
            tmp += '<br>';
          } else
            tmp += paragraph.text[i];
        }
        text = $("<p id=\"p" + n + "\"></p>").html(tmp);
        text.css({"font-weight": "bold", "text-align": "center"});
      }
      else {
        text = $("<p id=\"p" + n + "\"></p>").text(paragraph.text);
      }
      $("#pdf-text").append(text);
      n++;
    });
  }


  BGOnReadability(readabilityCode) {
    for (var i = 0; i < this.paragraphs.length; i++) {
      var paragraph = this.paragraphs[i];
      switch (readabilityCode) {
        case 1:
          this.changeBGParagraph(paragraph.readabilityIndexes.gulpease, paragraph.id);
          break;
        case 2:
          this.changeBGParagraph(paragraph.readabilityIndexes.colemanLiau, paragraph.id);
          break;
        case 3:
          this.changeBGParagraph(paragraph.readabilityIndexes.ari, paragraph.id);
          break;
        default:
      }
    }
  }


  BGReset() {
    for (var i = 0; i < this.paragraphs.length; i++) {
      this.changeBGParagraph(1, this.paragraphs[i].id);
    }
  }


  changeBGParagraph(idReadability, paragraphNumber) {
    switch(idReadability){
      case 1:
        $("#p" + paragraphNumber).css({"background-color": "#ffffff"});
        break;
      case 2:
        $("#p" + paragraphNumber).css({"background-color": "#e5e5e5"});
        break;
      case 3:
        $("#p" + paragraphNumber).css({"background-color": "#cccccc"});
        break;
      case 4:
        $("#p" + paragraphNumber).css({"background-color": "#a8a8a8"});
        break;
      case 5:
        $("#p" + paragraphNumber).css({"background-color": "#8c8c8c"});
        break;
      default:
    }
  }


  zoomIn(){
    var fontSize = parseInt($('#pdf-text p').css('font-size').slice(0, -2));
    if (fontSize < 24)
      $('#pdf-text p').css({'font-size': fontSize + 2 +'px'});
    var height = parseInt($('.reactionButton').css('height').slice(0, -2));
    var radius = parseInt($('.btn-circle').css('border-radius').slice(0, -2));
    if(height < 37) {
      $('.reactionButton').css({'width': height + 2 +'px', 'height': height + 2 + 'px'});
      $('.undo').css({'width': height + 2 +'px', 'height': height + 2 + 'px', 'border-radius': radius + 10 +'px'});
    }
    for (var i = 1; i < this.paragraphs.length+1; i++) {
      $('#paragraphReactions'+i).css({'height':($("#p" + i).height()+ 1 +'px')});
      $('#readabilityParagraph'+i).css({'height':($("#p" + i).height()+ 1 +'px')});
      $('#hidden-div'+i).css({'height':($("#p" + i).height()+'px')});
    }
  }


  zoomOut(){
    var fontSize = $('#pdf-text p').css('font-size').slice(0, -2);
    if (fontSize > 14)
      $('#pdf-text p').css({'font-size': parseInt(fontSize) - 2 +'px'});
    var height = $('.reactionButton').css('height').slice(0, -2);
    var radius = parseInt($('.btn-circle').css('border-radius').slice(0, -2));
    if (height > 27) {
      $('.reactionButton').css({'width': parseInt(height) - 2 +'px', 'height': parseInt(height) - 2 + 'px'});
      $('.undo').css({'width': height - 2 +'px', 'height': height - 2 + 'px', 'border-radius': radius - 10 +'px'});
    }
    for (var i = 1; i < this.paragraphs.length+1; i++) {
      $('#paragraphReactions'+i).css({'height':($("#p" + i).height()+ 1 +'px')});
      $('#readabilityParagraph'+i).css({'height':($("#p" + i).height()+ 1 +'px')});
      $('#hidden-div'+i).css({'height':($("#p" + i).height()+'px')});
    }
  }


  readabilitySign(readabilityCode) {
    var paragraphNumber = 1;
    this.paragraphs.forEach(function(paragraph) {
      $("#readability-icon").append("<div class=\"readability\" id=\"readabilityParagraph" + paragraphNumber + "\" align=\"center\"></div>");
      $("#readabilityParagraph" + paragraphNumber).css({'height':($("#p" + paragraphNumber).height()+ 1 +'px')});
      var idReadability;
      switch (readabilityCode) {
        case 1:
          idReadability = paragraph.readabilityIndexes.gulpease;
          break;
        case 2:
          idReadability = paragraph.readabilityIndexes.colemanLiau;
          break;
        case 3:
          idReadability = paragraph.readabilityIndexes.ari;
          break;
        default:
      }
      switch (idReadability) {
        case 1:
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle cyan\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle cyan\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle cyan\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle cyan\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle cyan\" aria-hidden=\"true\"></i>");
          break;
        case 2:
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle green\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle green\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle green\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle green\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>");
          break;
        case 3:
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle yellow\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle yellow\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle yellow\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>");
          break;
        case 4:
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle orange\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle orange\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>");
          break;
        case 5:
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle red\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>");
          break;
        default:
      }
      paragraphNumber++;
    })
    switch (readabilityCode) {
      case 1:
        $("#metricValue").append("<h4 align=\"center\">" + this.readabilityIndexes.gulpease + "/100</h4>");
        break;
      case 2:
        $("#metricValue").append("<h4 align=\"center\">" + this.readabilityIndexes.colemanLiau + "/16</h4>");
        break;
      case 3:
        if(this.readabilityIndexes.ari != Infinity){
          $("#metricValue").append("<h4 align=\"center\">" + this.readabilityIndexes.ari + "/16</h4>");
        } else
          $("#metricValue").append("<h4 align=\"center\">N/A</h4>");
        break;
      default:
    }
    $("#metricValue").append("<div id=\"showIcons\"><h5><div id=\"show\">NASCONDI</div></h5><input id=\"buttonReadabilityCircles\" type=\"checkbox\" name=\"buttonReadabilityCircles\" checked></div>");
    $("[name='buttonReadabilityCircles']").bootstrapSwitch("labelText", '<i class="fa fa-eye fa-lg" aria-hidden="true"></i>');
    $("[name='buttonReadabilityCircles']").bootstrapSwitch();
    $("[name='buttonReadabilityCircles']").on('switchChange.bootstrapSwitch', function(){
      if ($(".bootstrap-switch-id-buttonReadabilityCircles").hasClass("bootstrap-switch-on")) {
        $('#show').text('NASCONDI');
        $("[name='buttonReadabilityCircles']").bootstrapSwitch("labelText", '<i class="fa fa-eye fa-lg" aria-hidden="true"></i>');
        text.showIcons();
      } else {
        $('#show').text('MOSTRA');
        $("[name='buttonReadabilityCircles']").bootstrapSwitch("labelText", '<i class="fa fa-eye-slash fa-lg" aria-hidden="true"></i>');
        text.hideIcons();
      }
    })
    var metricValueHeight = $("#header").height() > $("#visualization").height() ? $("#header").height() : $("#visualization").height();
    $("#showIcons").css({"margin-top": (metricValueHeight - $("#metricValue").height() + 'px')})
  }


  hideIcons() {
    $("#readability-icon").hide();
    $("#readability-icon-empty").show();
  }


  showIcons() {
    $("#readability-icon").show();
    $("#readability-icon-empty").hide();
  }


  readabilityIndex (readabilityCode) {
    switch (readabilityCode) {
      case 1:
        $("#metricValue").html("<h4 align=\"center\">Indice Gulpease: </h4>");
        $("#readability-icon").text("");
        this.readabilitySign(readabilityCode);
        break;
      case 2:
        $("#metricValue").html("<h4 align=\"center\">Indice Coleman Liau: </h4>");
        $("#readability-icon").text("");
        this.readabilitySign(readabilityCode);
        break;
      case 3:
        $("#metricValue").html("<h4 align=\"center\">Automated Readability Index: </h4>");
        $("#readability-icon").text("");
        this.readabilitySign(readabilityCode);
        break;
      default:
    }
  }


  paragraphIcon() {
    this.paragraphs.forEach(function(paragraph) {
      if(!jQuery.isEmptyObject(paragraph.readabilityIndexes)){
        $("#reactions-button").append("<div class=\"reactions\" id=\"paragraphReactions" + paragraph.id + "\"></div>");
        $("#paragraphReactions" + paragraph.id).css({'height':($("#p" + paragraph.id).height() + 1 +'px')});
        $("#paragraphReactions" + paragraph.id).append("<input type=\"image\" class=\"reactionButton\" onclick=\"text.highlightText(" + paragraph.id + ", 1); text.checkReactions()\" src=\"assets/img/Fearful_Face_Emoji.png\">");
        $("#paragraphReactions" + paragraph.id).append("<input type=\"image\" class=\"reactionButton\" onclick=\"text.highlightText(" + paragraph.id + ", 2); text.checkReactions()\" src=\"assets/img/Confused_Face_Emoji.png\">");
        $("#paragraphReactions" + paragraph.id).append("<button id=\"undo"+ paragraph.id + "\" class=\"btn btn-primary btn-circle btn-sm undo\" onclick=\"text.clearReaction(" + paragraph.id + "); text.checkReactions()\" disabled><i class=\"fa fa-undo fa-lg\" aria-hidden=\"true\"></i></button>");
      } else {
        $("#reactions-button").append("<div class=\"reactions\" id=\"paragraphReactions" + paragraph.id + "\"></div>");
        $("#paragraphReactions" + paragraph.id).css({'height':($("#p" + paragraph.id).height() + 1 +'px')});
      }
    })
  }


  clearReaction (paragraphNumber) {
    this.paragraphs[paragraphNumber-1].reactions = [];
    var text = $("#p" + paragraphNumber).text();
    $("#p" + paragraphNumber).text(text);
    $('#undo' + paragraphNumber).prop('disabled', true);
  }


  highlightText(paragraphNumber, number) {
    if (window.getSelection().isCollapsed == false) {
      var selectedText = window.getSelection().toString(),
          parent = document.getSelection().anchorNode.parentNode;
      parent = parent.tagName != 'SPAN' ? parent : document.getSelection().extentNode.parentNode;
      var idParent = parent.getAttribute("id");
      if(idParent == null){
        alert('Puoi selezionare solo parti di testo che non hai già selezionato');
        return;
      }
      if(selectedText.match(/[\n\n$]/)) {
        this.transParagraphsSelection(selectedText, paragraphNumber, number);
      } else if(this.checkAlreadySelected(selectedText, parseInt(idParent.match(/\d+/)))) {
          this.singleParagraphSelection(selectedText, paragraphNumber, number);
      } else {
        alert('Puoi selezionare solo parti di testo che non hai già selezionato');
      }
    } else {
      this.highlightWithoutSelection(paragraphNumber, number);
      $('#undo' + paragraphNumber).prop('disabled', false);
    }
  }


  checkAlreadySelected(selectedText, paragraphNumber){
    var found = true;
    if(document.getSelection().anchorNode.parentNode.tagName == 'SPAN')
      found = false;
    var text = $('#p' + paragraphNumber).text();
    var start = text.indexOf(selectedText);
    var end = start + selectedText.length;
    var reactions = this.paragraphs[paragraphNumber-1].reactions;
    for (var i = 0; i < reactions.length; i++) {
      if(start>reactions[i].selectionStart && start<reactions[i].selectionEnd)
        found = false;
      if(end>reactions[i].selectionStart && end<reactions[i].selectionEnd)
        found = false;
      if(selectedText.includes(reactions[i].selectionText) || reactions[i].selectionText.includes(selectedText))
        found = false;
    }
    return found;
  }


  paragraphReaction(number, selection){
    if(number == 1){
      selection.selectionChoice = "Mi fa paura";
    } else {
      selection.selectionChoice = "Non ho capito";
    }
  }

  getSelectDirection(){
    var anchorParent = document.getSelection().anchorNode.parentNode,
        anchorParentId = anchorParent.getAttribute("id"),
        anchorParentId = anchorParentId == null ? anchorParent.parentNode.getAttribute("id") : anchorParentId,
        anchorIdNumber = parseInt(anchorParentId.match(/\d+/));
    var extentParent = document.getSelection().extentNode.parentNode,
        extentParentId = extentParent.getAttribute("id"),
        extentParentId = extentParentId == null ? extentParent.parentNode.getAttribute("id") : extentParentId,
        extentIdNumber = parseInt(extentParentId.match(/\d+/));
    if(anchorIdNumber < extentIdNumber)
      return true;
    else
      return false;
  }


  transParagraphsSelection(selectedText, paragraphNumber, number){
    selectedText = selectedText.split("\n\n");
    var parent = document.getSelection().anchorNode.parentNode,
        idParent = parent.getAttribute("id"),
        idParent = idParent == null ? parent.parentNode.getAttribute("id") : idParent,
        numberOfParagraph = parseInt(idParent.match(/\d+/));
    var check = true;
    if(this.getSelectDirection()){
      var count = 0;
      for (var i = numberOfParagraph; i < selectedText.length+numberOfParagraph; i++) {
        if(!this.checkAlreadySelected(selectedText[count], i)){
          alert('Puoi selezionare solo parti di testo che non hai già selezionato');
          return;
        }
        if(i == paragraphNumber)
            check = false;
        count ++;
      }
      if (check)
        return;
      count = 0;
      for (var i = numberOfParagraph; i < selectedText.length+numberOfParagraph; i++) {
        var text = $('#p' + i).html(),
            start = text.indexOf(selectedText[count]),
            end = start + selectedText[count].length;
        if(number == 1)
          var spn = '<span class="firstHighlight">' + selectedText[count] + '</span>';
        else
          var spn = '<span class="secondHighlight">' + selectedText[count] + '</span>';
        var startText = text.substring(0, start),
        endText = text.substring(end, text.length);
        $('#p' + i).html(startText + spn + endText);
        if(start != end){
          var selection = {};
          if(i != numberOfParagraph || i != (selectedText.length + numberOfParagraph - 1)){
            var text = $('#p' + i).text();
            var start = text.indexOf(selectedText[count]);
            var end = start + selectedText[count].length;
            this.checkFullParagraph(selection, text, selectedText[count], start, end, number);
            $('#undo' + i).prop('disabled', false);

          } else {
            selection.selection = "Paragrafo intero";
            this.paragraphReaction(number, selection);
          }
          this.paragraphs[i-1].reactions.push(selection);
        }
        count++;
      }
    } else {
      var count = selectedText.length-1;

      for (var i = numberOfParagraph; i > numberOfParagraph-selectedText.length; i--) {
        if(!this.checkAlreadySelected(selectedText[count], i)){
          alert('Puoi selezionare solo parti di testo che non hai già selezionato');
          return;
        }
        if( i == paragraphNumber)
            check = false;
        count--;
      }
      if (check)
        return;
      count = selectedText.length-1;
      for (var i = numberOfParagraph; i > numberOfParagraph-selectedText.length; i--) {
        var text = $('#p' + i).html(),
          start = text.indexOf(selectedText[count]),
          end = start + selectedText[count].length;
          if(number == 1)
            var spn = '<span class="firstHighlight">' + selectedText[count] + '</span>';
          else
            var spn = '<span class="secondHighlight">' + selectedText[count] + '</span>';
          var startText = text.substring(0, start),
          endText = text.substring(end, text.length);
        $('#p' + i).html(startText + spn + endText);
        if(start != end){
          var selection = {};
          if(i != numberOfParagraph || i != (selectedText.length + numberOfParagraph - 1)){
            var text = $('#p' + i).text();
            var start = text.indexOf(selectedText[count]);
            var end = start + selectedText[count].length;
            this.checkFullParagraph(selection, text, selectedText[count], start, end, number);
            $('#undo' + i).prop('disabled', false);

          } else {
            selection.selection = "Paragrafo intero";
            this.paragraphReaction(number, selection);
          }
          this.paragraphs[i-1].reactions.push(selection);
        }
        count--;
      }
    }
  }


  singleParagraphSelection(selectedText, paragraphNumber, number){
    if(!this.checkSelection(paragraphNumber))
      return;
    var text = $('#p' + paragraphNumber).html();
    var start = text.indexOf(selectedText);
    var end = start + selectedText.length;
    var selection = {};
    this.paragraphs[paragraphNumber-1].reactions.push(selection);
    if(number == 1)
      var spn = '<span class="firstHighlight">' + selectedText + '</span>';
    else
      var spn = '<span class="secondHighlight">' + selectedText + '</span>';
    var startText = text.substring(0, start),
      endText = text.substring(end, text.length);
    $('#p' + paragraphNumber).html(startText + spn + endText);
    $('#undo' + paragraphNumber).prop('disabled', false);
    var text = $('#p' + paragraphNumber).text();
    var start = text.indexOf(selectedText);
    var end = start + selectedText.length;
    this.checkFullParagraph(selection, text, selectedText, start, end, number);
  }


  highlightWithoutSelection(paragraphNumber, number){
    this.clearReaction(paragraphNumber);
    var text = $('#p'+paragraphNumber).text();
    if(number == 1)
      var spn = '<span class="firstHighlight">' + text + '</span>';
    else
      var spn = '<span class="secondHighlight">' + text + '</span>';
    $('#p'+paragraphNumber).html(spn);
    var selection = {};
    selection.selection = "Paragrafo intero";
    this.paragraphReaction(number, selection);
    this.paragraphs[paragraphNumber-1].reactions.push(selection);
  }


  checkFullParagraph(selection, text, selectedText, start, end, number){
    if(start == 0 && end == text.length){
      selection.selection = "Paragrafo intero";
      this.paragraphReaction(number, selection);
    } else {
      selection.selectionStart = start;
      selection.selectionEnd = end;
      selection.selectionText = selectedText;
      this.paragraphReaction(number, selection);
    }
  }


  checkSelection(paragraphNumber) {
    var selection = document.getSelection();
    var parent = selection.anchorNode.parentNode;
    var idParent = parent.getAttribute("id");
    var numberOfParagraph = parseInt(idParent.match(/\d+/));
    if (numberOfParagraph == paragraphNumber)
      return true;
    return false;
  }


  resetReactions() {
    for (var i = 1; i < this.paragraphs.length+1; i++) {
      if(!jQuery.isEmptyObject(this.paragraphs[i-1].reactions))
        this.clearReaction(i);
    }
    $('#resetReactions').prop('disabled', true);
    $('#agree').attr('disabled', false);
    $('#agree').prop('checked', false);
    $('#disagree').prop('checked', false);
    $('#finalSubmit').attr('disabled', true);
  }


  checkReactions() {
    var found = false;
    for (var i = 0; i < this.paragraphs.length; i++) {
      if(this.paragraphs[i].reactions.length != 0){
        $('#resetReactions').prop('disabled', false);
        $('#agree').attr('disabled', true);
        $('#agree').prop('checked', false);
        $('#disagree').prop('checked', true);
        $('#finalSubmit').attr('disabled', false);
        found = true;
      } else if(found == false){
        $('#resetReactions').prop('disabled', true);
        $('#agree').attr('disabled', false);
        $('#agree').prop('checked', false);
        $('#disagree').prop('checked', false);
        $('#finalSubmit').attr('disabled', true);
      }
    }
  }


  agreed(choice) {
    this.accepted = choice;
  }
}
