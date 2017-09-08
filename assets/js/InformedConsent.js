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
          agreements: {}
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
    $("#header").append("<h5>\"" + this.footer + "\"</h5>");
    var height = $("#header").height() + 20;
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
        $("#p" + paragraphNumber).css({"background-color": "#d9d9d9"});
        break;
      case 3:
        $("#p" + paragraphNumber).css({"background-color": "#b3b3b3"});
        break;
      case 4:
        $("#p" + paragraphNumber).css({"background-color": "#8c8c8c"});
        break;
      case 5:
        $("#p" + paragraphNumber).css({"background-color": "#737373"});
        break;
      default:
    }
  }


  readabilitySign(readabilityCode) {
    var paragraphNumber = 1;
    this.paragraphs.forEach(function(paragraph) {
      $("#readability-icon").append("<div class=\"readability\" id=\"readabilityParagraph" + paragraphNumber + "\" align=\"center\"></div>");
      $("#readabilityParagraph" + paragraphNumber).css({'height':($("#p" + paragraphNumber).height()+'px')});
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
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle cyan\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle-o\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle-o\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle-o\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle-o\" aria-hidden=\"true\"></i> ");
          break;
        case 2:
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle green\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle green\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle-o\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle-o\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle-o\" aria-hidden=\"true\"></i> ");
          break;
        case 3:
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle yellow\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle yellow\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle yellow\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle-o\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle-o\" aria-hidden=\"true\"></i> ");
          break;
        case 4:
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle orange\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle orange\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle orange\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle orange\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle-o\" aria-hidden=\"true\"></i> ");
          break;
        case 5:
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle red\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle red\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle red\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle red\" aria-hidden=\"true\"></i> ");
          $("#readabilityParagraph" + paragraphNumber).append("<i class=\"fa fa-circle red\" aria-hidden=\"true\"></i> ");
          break;
        default:
      }
      paragraphNumber++;
    })
    // var avg;
    switch (readabilityCode) {
      case 1:
        // avg = this.readabilityIndexes.gulpease;
        $("#metricValue").append("<h4 align=\"center\">" + this.readabilityIndexes.gulpease + "/100</h4>");
        break;
      case 2:
        // avg = this.readabilityIndexes.colemanLiau;
        $("#metricValue").append("<h4 align=\"center\">" + this.readabilityIndexes.colemanLiau + "/16</h4>");
        break;
      case 3:
        // avg = this.readabilityIndexes.ari;
        $("#metricValue").append("<h4 align=\"center\">" + this.readabilityIndexes.ari + "/16</h4>");
        break;
      default:
    }
    // $("#metricValue").append("<h4 align=\"center\">" + avg + "</h4>");
    $("#metricValue").append("<button id=\"hideIcon\" onclick=\"text.hideIcons()\">NASCONDI</button>");
  }


  hideIcons() {
    $("#readability-icon").hide();
    $("#readability-icon-empty").show();
    $("#hideIcon").text("MOSTRA");
    $("#hideIcon").attr("onclick","text.showIcons()");
  }


  showIcons() {
    $("#readability-icon").show();
    $("#readability-icon-empty").hide();
    $("#hideIcon").text("NASCONDI");
    $("#hideIcon").attr("onclick","text.hideIcons()");
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
        $("#agreements-button").append("<div class=\"agreements\" id=\"paragraphAgreements" + paragraph.id + "\"></div>");
        $("#paragraphAgreements" + paragraph.id).css({'height':($("#p" + paragraph.id).height()+'px')});
        // $("#paragraphAgreements" + paragraph.id).append("<input type=\"radio\" name=\"optradio"+ paragraph.id +"\" class=\"firstFakeRadio" + paragraph.id + "\" onclick=\"text.firstHighlightText(" + paragraph.id + ")\"><span id=\"opt1span" + paragraph.id + "\">&nbsp;Mi fa paura&nbsp;&nbsp;&nbsp;</span>");
        $("#paragraphAgreements" + paragraph.id).append("<input type=\"radio\" name=\"optradio"+ paragraph.id +"\" class=\"firstFakeRadio" + paragraph.id + "\" onclick=\"text.firstHighlightText(" + paragraph.id + ")\"><span id=\"opt1span" + paragraph.id + "\">&nbsp<i class=\"fa fa-frown-o fa-lg\" aria-hidden=\"true\"></i>&nbsp&nbsp&nbsp</span>");
        // $("#paragraphAgreements" + paragraph.id).append("<input type=\"radio\" name=\"optradio"+ paragraph.id +"\" class=\"secondFakeRadio" + paragraph.id + "\" onclick=\"text.secondHighlightText(" + paragraph.id + ")\"><span id=\"opt2span" + paragraph.id +"\">&nbsp;Non ho capito&nbsp;</span>");
        $("#paragraphAgreements" + paragraph.id).append("<input type=\"radio\" name=\"optradio"+ paragraph.id +"\" class=\"secondFakeRadio" + paragraph.id + "\" onclick=\"text.secondHighlightText(" + paragraph.id + ")\"><span id=\"opt2span" + paragraph.id +"\">&nbsp<i class=\"fa fa-meh-o fa-lg\" aria-hidden=\"true\"></i>&nbsp&nbsp&nbsp</span>");

        // $("#paragraphAgreements" + paragraph.id).append("<input class=\"btn btn-default btn-xs\" type=\"button\" onclick=\"text.clearAgreement(" + paragraph.id + ")\" value=\"azzera\"/>");
        $("#paragraphAgreements" + paragraph.id).append("<label class=\"btn btn-default btn-xs\" onclick=\"text.clearAgreement(" + paragraph.id + ")\"><input id=\"clearReaction" + paragraph.id + "\" type=\"radio\">&nbsp<i class=\"fa fa-undo fa-lg\" aria-hidden=\"true\"></i></i>&nbsp&nbsp&nbsp</span>");

        // <label id="gulpease" class="btn btn-default" name="readabilityIndexName" style="width:30%">
        //   <input type="radio">Gulpease
        // </label>
      } else {
        $("#agreements-button").append("<div class=\"agreements\" id=\"paragraphAgreements" + paragraph.id + "\"></div>");
        $("#paragraphAgreements" + paragraph.id).css({'height':($("#p" + paragraph.id).height()+'px')});
      }
    })
  }


  clearAgreement (paragraphNumber) {
    this.paragraphs[paragraphNumber-1].agreements.selectionStart = undefined;
    this.paragraphs[paragraphNumber-1].agreements.selectionEnd = undefined;
    this.paragraphs[paragraphNumber-1].agreements.selectionChoice = undefined;
    $(".firstFakeRadio" + paragraphNumber).prop('checked', false);
    $(".firstFakeRadio" + paragraphNumber).prop('disabled', false);
    $(".secondFakeRadio" + paragraphNumber).prop('checked', false);
    $(".secondFakeRadio" + paragraphNumber).prop('disabled', false);
    $("#opt1span" + paragraphNumber).css({'font-style': 'normal'});
    $("#opt2span" + paragraphNumber).css({'font-style': 'normal'});
    var text = $("#p" + paragraphNumber).text();
    $("#p" + paragraphNumber).text(text);
  }


  firstHighlightText(paragraphNumber) {
    if (window.getSelection) {
      var selectedText = window.getSelection().toString();
      if(!selectedText.match(/[\n]/)){
        var thisText = $('#p' + paragraphNumber).text();
        var start = thisText.indexOf(selectedText);
        var end = start + selectedText.length;
        if (start >= 0 && end >= 0) {
          this.paragraphs[paragraphNumber-1].agreements.selectionStart = start;
          this.paragraphs[paragraphNumber-1].agreements.selectionEnd = end;
          this.paragraphs[paragraphNumber-1].agreements.selectionChoice = "Mi fa paura";
        }
        var selection = document.getSelection();
        var parent = selection.anchorNode.parentNode;
        var idParent = parent.getAttribute("id");
        var numberOfParagraph = idParent.match(/\d+/);
        if (numberOfParagraph == paragraphNumber) {
          var highlight = window.getSelection(),
            spn = '<span class="firstHighlight" id="highlight' + paragraphNumber + '">' + highlight + '</span>',
            text = $('#p'+paragraphNumber).text(),
            range = highlight.getRangeAt(0),
            startText = text.substring(0, range.startOffset),
            endText = text.substring(range.endOffset, text.length);
            $('#p'+paragraphNumber).html(startText + spn + endText);
        }
        $('.firstFakeRadio' + paragraphNumber).attr('disabled', true);
        $('.secondFakeRadio' + paragraphNumber).attr('disabled', true);
        $('#opt1span' + paragraphNumber).css({'font-style': 'italic'});
      } else {
        alert('You cannot select more paragraphs');
        $(".firstFakeRadio" + paragraphNumber).prop('checked', false);
      }
    } else if ( document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
  }


  secondHighlightText(paragraphNumber) {
    if (window.getSelection) {
      var selectedText = window.getSelection().toString();
      if(!selectedText.match(/[\n]/)){
        var thisText = $('#p' + paragraphNumber).text();
        var start = thisText.indexOf(selectedText);
        var end = start + selectedText.length;
        if (start >= 0 && end >= 0){
          this.paragraphs[paragraphNumber-1].agreements.selectionStart = start;
          this.paragraphs[paragraphNumber-1].agreements.selectionEnd = end;
          this.paragraphs[paragraphNumber-1].agreements.selectionChoice = "Non ho capito";
        }
        var selection = document.getSelection();
        var parent = selection.anchorNode.parentNode;
        var idParent = parent.getAttribute("id");
        var numberOfParagraph = idParent.match(/\d+/);
        if (numberOfParagraph == paragraphNumber) {
          var highlight = window.getSelection(),
          spn = '<span class="secondHighlight" id="highlight' + paragraphNumber + '">' + highlight + '</span>',
            text = $('#p'+paragraphNumber).text(),
            range = highlight.getRangeAt(0),
            startText = text.substring(0, range.startOffset),
            endText = text.substring(range.endOffset, text.length);
            $('#p'+paragraphNumber).html(startText + spn + endText);
        }
        $('.firstFakeRadio' + paragraphNumber).attr('disabled', true);
        $('.secondFakeRadio' + paragraphNumber).attr('disabled', true);
        $('#opt2span' + paragraphNumber).css({'font-style': 'italic'});
      } else {
        alert('You cannot select more paragraphs');
        $(".secondFakeRadio" + paragraphNumber).prop('checked', false);
      }
    } else if ( document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
  }


  agreed(choice) {
    this.accepted = choice;
  }
}
