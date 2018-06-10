class InformedConsent {
  // costruttore del consenso informato
  constructor(title, footer, paragraphs) {
    this.readabilityIndexes = {};
    this.title = title;
    this.footer = footer;
    this.sections = new Array();
    this.accepted;
    this.fearful; // FIXME: valore slider preoccupazione finale
    this.confused; // FIXME: valore slider comprensione finale
    this.createParagraphs(paragraphs);
    this.readabilityScore();
    console.log(this);
  }

  // funzione che crea le sezioni ed i paragrafi
  createParagraphs(paragraphs) {
    var section_id = 1;
    var paragraph_id = 0;
    // Crea le sezioni
    if (!paragraphs[0].match(/\@\s*(.*)\@/)) {
      this.sections.push({
        id: section_id,
        title: '',
      });
      section_id++;
    }
    for (var i = 0; i < paragraphs.length; i++) {
      if (paragraphs[i].match(/\@\s*(.*)\@/)) {
        this.sections.push({
          id: section_id,
          title: paragraphs[i],
        });
        section_id++;
      }
    }
    // Crea i paragrafi
    section_id = 0;
    var par = new Array();
    var re = new RegExp(String.fromCharCode(160), "g"); // FIXME: https://stackoverflow.com/questions/1495822/replacing-nbsp-from-javascript-dom-text-node
    for (var i = 0; i < paragraphs.length; i++) {
      if (!paragraphs[i].match(/\@\s*(.*)\@/)) {
        par.push({
          id: paragraph_id + 1,
          // text: paragraphs[i],
          text: paragraphs[i].replace(re, ""), // FIXME:
          readabilityIndexes: {
            gulpease: gulpease(paragraphs[i]),
          },
          reactions: [],
        });
        paragraph_id++;
      }
      if (paragraphs[i].match(/\@\s*(.*)\@/) && i != 0) {
        this.sections[section_id].paragraphs = par;
        par = new Array();
        section_id++;
      }
    }
    this.sections[section_id].paragraphs = par;
    par = new Array();
  }

  // funzione che calcola il valore della leggibilità
  readabilityScore() {
    var gulpease = 0;
    var paragraphs_length = 0;
    for (var section of this.sections) {
      for (var i = 0; i < section.paragraphs.length; i++) {
        if (!jQuery.isEmptyObject(section.paragraphs[i].readabilityIndexes)) {
          gulpease += section.paragraphs[i].readabilityIndexes.gulpease;
        }
        paragraphs_length += section.paragraphs.length;
      }
    }

    this.readabilityIndexes.gulpease = Math.round(gulpease / (paragraphs_length) * 100 / 5);
  }

  // funzione che crea l'intestazione della pagina
  createHeader() {
    this.title.forEach(function(subtitle) {
      $("#header").append("<h4>" + subtitle + "</h4>");
    })
    if (this.footer)
      $("#header").append("<h5>\"" + this.footer + "\"</h5>");
    var headerHeight = $("#header").height();
    var briefingHeight = $("#briefing").height();
    var height = headerHeight + briefingHeight + 10;
    $("#text-body").css({
      "margin-top": (height + 'px')
    })
  }

  // funzione che mostra una sezione alla volta
  showSection(id) {
    $('#pdf-text').append('<div class="section" id="' + id + '-text"></div>');
    $('#readability-icon').append('<div class="section" id="' + id + '-readability"></div>');
    $('#readability-icon-empty').append('<div class="section" id="' + id + '-readability-empty"></div>');
    $('#reactions-button').append('<div class="section" id="' + id + '-reactions"></div>');
    var section = this.query('sections', 'id', id);
    this.paragraphsToHtml(section.title, section.paragraphs, id);
    this.readabilitySignHidden(section);
  }

  // funzione che trasforma i paragrafi in codice html
  paragraphsToHtml(title, paragraphs, id) {
    var text;
    var tmp = "";
    if (title != '') {
      for (var i = 1; i < title.length - 1; i++) {
        if (title[i] == '@') {
          tmp += '<br>';
        } else
          tmp += title[i];
      }
      text = $("<p id=\"" + id + "-title\" class=\"testo\"></p>").html(tmp);
      text.css({
        "font-weight": "bold",
        "text-align": "center"
      });
      $(".section[id=\"" + id + "-text\"]").append(text);
    }
    paragraphs.forEach(function(paragraph) {
      text = $("<p id=\"p" + paragraph.id + "\" class=\"testo\"></p>").text(paragraph.text);
      $(".section[id=\"" + id + "-text\"]").append(text);
    });
  }

  // funzione che crea la div vuota dell'indicatore grafico di ciascun paragrafo della leggibilità
  readabilitySignHidden(section) {
    if (section.title != '') {
      var div = '<div id="empty-title' + section.id + '" class="hidden-div"></div>';
      $('#' + section.id + '-readability-empty').append(div);
      $('#empty-title' + section.id).css({
        'height': ($("#" + section.id + "-title").height() + 'px')
      });
    }
    for (var i = 0; i < section.paragraphs.length; i++) {
      var div = '<div id="empty-div' + section.paragraphs[i].id + '" class="hidden-div" style="height:' + $('#p' + section.paragraphs[i].id).height() + 'px "></div>';
      $('#' + section.id + '-readability-empty').append(div);
    }
    $('#' + section.id + '-readability-empty').hide();
  }

  // fuzione per l'ingradimento del testo
  zoomIn(section_id) {
    var fontSize = parseInt($('.testo').css('font-size').slice(0, -2));
    if (fontSize < 24)
      $('.testo').css({
        'font-size': fontSize + 2 + 'px'
      });
    var height = parseInt($('.reactionButton').css('height').slice(0, -2));
    var radius = parseInt($('.btn-circle').css('border-radius').slice(0, -2));
    if (height < 37) {
      $('.reactionButton').css({
        'width': height + 2 + 'px',
        'height': height + 2 + 'px'
      });
      $('.undo').css({
        'width': height + 2 + 'px',
        'height': height + 2 + 'px',
        'border-radius': radius + 10 + 'px'
      });
    }
    this.resizeContent(section_id);
  }

  // funzione per la diminuzione del testo
  zoomOut(section_id) {
    var fontSize = parseInt($('#pdf-text p').css('font-size').slice(0, -2));
    if (fontSize > 14)
      $('#pdf-text p').css({
        'font-size': parseInt(fontSize) - 2 + 'px'
      });
    var height = parseInt($('.reactionButton').css('height').slice(0, -2));
    var radius = parseInt($('.btn-circle').css('border-radius').slice(0, -2));
    if (height > 27) {
      $('.reactionButton').css({
        'width': parseInt(height) - 2 + 'px',
        'height': parseInt(height) - 2 + 'px'
      });
      $('.undo').css({
        'width': height - 2 + 'px',
        'height': height - 2 + 'px',
        'border-radius': radius - 10 + 'px'
      });
    }
    this.resizeContent(section_id);
  }

  // funzione utiizzata dalle funzioni resize per fare un controllo sulla dimensione impostata in una sezione precedente
  resizeContent(section_id) {
    var section = this.query('sections', 'id', section_id);
    $('#empty-title' + section_id).css({
      'height': ($("#" + section_id + '-title').height() + 'px')
    });
    $('#readability-title' + section_id).css({
      'height': ($("#" + section_id + '-title').height() + 41 + 'px')
    });
    $('#reactions-title' + section_id).css({
      'height': ($("#" + section_id + '-title').height() + 41 + 'px')
    });

    for (var i = 0; i < section.paragraphs.length + 0; i++) {
      $('#paragraphReactions' + section.paragraphs[i].id).css({
        'height': ($("#p" + section.paragraphs[i].id).height() + 41 + 'px')
      });
      $('#readabilityParagraph' + section.paragraphs[i].id).css({
        'height': ($("#p" + section.paragraphs[i].id).height() + 41 + 'px')
      });
      $('#empty-div' + section.paragraphs[i].id).css({
        'height': ($("#p" + section.paragraphs[i].id).height() + 'px')
      });
    }
  }


  BGOnReadability(readabilityCode, section_id) {
    var section = this.query('sections', 'id', section_id);
    for (var i = 0; i < section.paragraphs.length; i++) {
      var paragraph = section.paragraphs[i];
      this.changeBGParagraph(paragraph.readabilityIndexes.gulpease, paragraph.id);
    }
  }


  changeBGParagraph(idReadability, paragraphNumber) {
    switch (idReadability) {
      case 1:
        $("#p" + paragraphNumber).css({
          "background-color": "#ffffff"
        });
        break;
      case 2:
        $("#p" + paragraphNumber).css({
          "background-color": "#e5e5e5"
        });
        break;
      case 3:
        $("#p" + paragraphNumber).css({
          "background-color": "#cccccc"
        });
        break;
      case 4:
        $("#p" + paragraphNumber).css({
          "background-color": "#a8a8a8"
        });
        break;
      case 5:
        $("#p" + paragraphNumber).css({
          "background-color": "#8c8c8c"
        });
        break;
      default:
    }
  }


  BGReset(section_id) {
    var section = this.query('sections', 'id', section_id);
    for (var i = 0; i < section.paragraphs.length; i++) {
      this.changeBGParagraph(1, section.paragraphs[i].id);
    }
  }


  readabilitySign(readabilityCode, section_id) {
    var section = this.query('sections', 'id', section_id);
    if (section.title != '') {
      $('.section[id="' + section.id + '-readability"]').append("<div class=\"readability\" id=\"readability-title" + section_id + "\" align=\"center\"></div>");
      $("#readability-title" + section_id).css({
        'height': ($("#" + section_id + "-title").height() + 41 + 'px')
      });
    }
    section.paragraphs.forEach(function(paragraph) {
      $('.section[id="' + section.id + '-readability"]').append("<div class=\"readability\" id=\"readabilityParagraph" + paragraph.id + "\" align=\"center\"></div>");
      $("#readabilityParagraph" + paragraph.id).css({
        'height': ($("#p" + paragraph.id).height() + 41 + 'px')
      });
      var idReadability = paragraph.readabilityIndexes.gulpease;
      switch (idReadability) {
        case 1:
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle cyan\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle cyan\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle cyan\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle cyan\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle cyan\" aria-hidden=\"true\"></i>");
          break;
        case 2:
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle green\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle green\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle green\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle green\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>");
          break;
        case 3:
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle yellow\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle yellow\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle yellow\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>");
          break;
        case 4:
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle orange\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle orange\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>");
          break;
        case 5:
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle red\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>&nbsp");
          $("#readabilityParagraph" + paragraph.id).append("<i class=\"fa fa-circle white\" aria-hidden=\"true\"></i>");
          break;
        default:
      }
    })
  }


  // funzione per mostrare l'indicatore grafico di ciascun paragrafo della leggibilità
  showIcons(id) {
    $('.section[id="' + id + '-readability"]').show();
    $("#readability-icon").show();
    $("#readability-icon-empty").hide();
  }


  // funzione per nascondere l'indicatore grafico di ciascun paragrafo della leggibilità
  hideIcons(id) {
    $('.section[id="' + id + '-readability"]').hide();
    $("#readability-icon").hide();
    $("#readability-icon-empty").show();
  }


  // funzione che crea per ciascun paragrafo le tre icone relative alle reazioni
  paragraphIcon(section_id) {
    var section = this.query('sections', 'id', section_id);
    if (section.title != '') {
      $('.section[id="' + section.id + '-reactions"]').append("<div class=\"reactions\" id=\"reactions-title" + section_id + "\" align=\"center\"></div>");
      $("#reactions-title" + section_id).css({
        'height': ($("#" + section_id + "-title").height() + 41 + 'px')
      });
    }
    section.paragraphs.forEach(function(paragraph) {
      if (!jQuery.isEmptyObject(paragraph.readabilityIndexes)) {
        $('.section[id="' + section.id + '-reactions"]').append("<div class=\"reactions\" id=\"paragraphReactions" + paragraph.id + "\"></div>");
        $("#paragraphReactions" + paragraph.id).css({
          'height': ($("#p" + paragraph.id).height() + 41 + 'px')
        });
        $("#paragraphReactions" + paragraph.id).append("<input type=\"image\" class=\"reactionButton\" data-id=\"" + paragraph.id + "\" data-type=\"1\" src=\"assets/img/Fearful_Face_Emoji.png\">");
        $("#paragraphReactions" + paragraph.id).append("<input type=\"image\" class=\"reactionButton\" data-id=\"" + paragraph.id + "\" data-type=\"2\" src=\"assets/img/Confused_Face_Emoji.png\">");
        $("#paragraphReactions" + paragraph.id).append("<button id=\"undo" + paragraph.id + "\" class=\"btn btn-primary btn-circle btn-sm undo\" onclick=\"text.clearReaction(" + paragraph.id + ",  " + section_id + "); text.checkReactions()\" disabled><i class=\"fas fa-trash-alt fa-lg\" aria-hidden=\"true\"></i></button>");
      } else {
        $('.section[id="' + section.id + '-reactions"]').append("<div class=\"reactions\" id=\"paragraphReactions" + paragraph.id + "\"></div>");
        $("#paragraphReactions" + paragraph.id).css({
          'height': ($("#p" + paragraph.id).height() + 41 + 'px')
        });
      }
    })
    $('.section[id="' + section.id + '-reactions"]').hide();
  }


  // funzione che cancella le reazioni di un paragrafo
  clearReaction(paragraphNumber, section_id) {
    this.sections.forEach(function(section) {
      if (section.id == current_section) {
        section.paragraphs.forEach(function(paragraph) {
          if (paragraph.id == paragraphNumber)
            paragraph.reactions = [];
        })
      }
    })
    var text = $("#p" + paragraphNumber).text();
    $("#p" + paragraphNumber).text(text);
    $('#undo' + paragraphNumber).prop('disabled', true);
  }


  // funzione che resetta le reazioni di una sezione
  resetReactions() {
    this.sections.forEach(function(section) {
      if (section.id == current_section) {
        section.paragraphs.forEach(function(paragraph) {
          if (!jQuery.isEmptyObject(paragraph.reactions)) {
            text.clearReaction(paragraph.id, current_section);
            $('#resetReactions').prop('disabled', true);
          }
        })
      }
    })
    var disable = false;
    if (current_section == this.sections.length) {
      this.sections.forEach(function(section) {
        section.paragraphs.forEach(function(paragraph) {
          if (!jQuery.isEmptyObject(paragraph.reactions))
            disable = !disable;
        })
      })
    }
    $('#agree').attr('disabled', disable);
    $('#disagree').prop('checked', disable);
    $('#finalSubmit').attr('disabled', !disable);
  }


  // funzione che permette di evidenziare il testo dei paragrafi
  highlightText(paragraphNumber, number) {
    if (window.getSelection().isCollapsed == false) {
      var selectedText = window.getSelection().toString(),
        parent = document.getSelection().anchorNode.parentNode;
      parent = parent.tagName != 'SPAN' ? parent : document.getSelection().extentNode.parentNode;
      var idParent = parent.getAttribute("id");
      if (idParent == null) {
        alert('Puoi selezionare solo parti di testo che non hai già selezionato');
        return;
      }
      if (selectedText.match(/[\n\n$]/)) {
        this.transParagraphsSelection(selectedText, paragraphNumber, number);
      } else if (!this.checkAlreadySelected(selectedText, parseInt(idParent.match(/\d+/)))) {
        this.singleParagraphSelection(selectedText, paragraphNumber, number);
      } else {
        alert('Puoi selezionare solo parti di testo che non hai già selezionato');
      }
    } else {
      this.highlightWithoutSelection(paragraphNumber, number);
      $('#undo' + paragraphNumber).prop('disabled', false);
    }
  }


  // funzione che permette di evidenziare il testo di più paragrafi contemporaneamente
  transParagraphsSelection(selectedText, paragraphNumber, number) {
    selectedText = selectedText.split("\n\n");
    var parent = document.getSelection().anchorNode.parentNode,
      idParent = parent.getAttribute("id"),
      idParent = idParent == null ? parent.parentNode.getAttribute("id") : idParent,
      numberOfParagraph = parseInt(idParent.match(/\d+/));
    var check = true;
    if (this.getSelectDirection()) {
      var count = 0;
      for (var i = numberOfParagraph; i < selectedText.length + numberOfParagraph; i++) {
        if (this.checkAlreadySelected(selectedText[count], i)) {
          alert('Puoi selezionare solo parti di testo che non hai già selezionato');
          return;
        }
        if (i == paragraphNumber)
          check = false;
        count++;
      }
      if (check)
        return;
      count = 0;
      for (var i = numberOfParagraph; i < selectedText.length + numberOfParagraph; i++) {
        var text = $('#p' + i).html(),
          start = text.indexOf(selectedText[count]),
          end = start + selectedText[count].length;
        if (number == 1)
          var spn = '<span class="firstHighlight">' + selectedText[count] + '</span>';
        else
          var spn = '<span class="secondHighlight">' + selectedText[count] + '</span>';
        var startText = text.substring(0, start),
          endText = text.substring(end, text.length);
        $('#p' + i).html(startText + spn + endText);
        if (start != end) {
          var selection = {};
          if (i != numberOfParagraph || i != (selectedText.length + numberOfParagraph - 1)) {
            var text = $('#p' + i).text();
            var start = text.indexOf(selectedText[count]);
            var end = start + selectedText[count].length;
            this.checkFullParagraph(selection, text, selectedText[count], start, end, number);
            $('#undo' + i).prop('disabled', false);

          } else {
            selection.selection = "Paragrafo intero";
            this.paragraphReaction(number, selection);
          }
          this.sections.forEach(function(section) {
            if (section.id == current_section) {
              section.paragraphs.forEach(function(paragraph) {
                if (paragraph.id == i)
                  paragraph.reactions.push(selection);
              })
            }
          })
        }
        count++;
      }
    } else {
      var count = selectedText.length - 1;

      for (var i = numberOfParagraph; i > numberOfParagraph - selectedText.length; i--) {
        if (this.checkAlreadySelected(selectedText[count], i)) {
          alert('Puoi selezionare solo parti di testo che non hai già selezionato');
          return;
        }
        if (i == paragraphNumber)
          check = false;
        count--;
      }
      if (check)
        return;
      count = selectedText.length - 1;
      for (var i = numberOfParagraph; i > numberOfParagraph - selectedText.length; i--) {
        var text = $('#p' + i).html(),
          start = text.indexOf(selectedText[count]),
          end = start + selectedText[count].length;
        if (number == 1)
          var spn = '<span class="firstHighlight">' + selectedText[count] + '</span>';
        else
          var spn = '<span class="secondHighlight">' + selectedText[count] + '</span>';
        var startText = text.substring(0, start),
          endText = text.substring(end, text.length);
        console.log(startText, endText);
        $('#p' + i).html(startText + spn + endText);
        if (start != end) {
          var selection = {};
          if (i != numberOfParagraph || i != (selectedText.length + numberOfParagraph - 1)) {
            var text = $('#p' + i).text();
            var start = text.indexOf(selectedText[count]);
            var end = start + selectedText[count].length;
            this.checkFullParagraph(selection, text, selectedText[count], start, end, number);
            $('#undo' + i).prop('disabled', false);

          } else {
            selection.selection = "Paragrafo intero";
            this.paragraphReaction(number, selection);
          }
          this.sections.forEach(function(section) {
            if (section.id == current_section) {
              section.paragraphs.forEach(function(paragraph) {
                if (paragraph.id == i)
                  paragraph.reactions.push(selection);
              })
            }
          })
        }
        count--;
      }
    }
  }


  // funzione utilizzata dalla selezione trasparagrafo per avere informazioni sulla direzione di selezione
  getSelectDirection() {
    var anchorParent = document.getSelection().anchorNode.parentNode,
      anchorParentId = anchorParent.getAttribute("id"),
      anchorParentId = anchorParentId == null ? anchorParent.parentNode.getAttribute("id") : anchorParentId,
      anchorIdNumber = parseInt(anchorParentId.match(/\d+/));
    var extentParent = document.getSelection().extentNode.parentNode,
      extentParentId = extentParent.getAttribute("id"),
      extentParentId = extentParentId == null ? extentParent.parentNode.getAttribute("id") : extentParentId,
      extentIdNumber = parseInt(extentParentId.match(/\d+/));
    if (anchorIdNumber < extentIdNumber)
      return true;
    else
      return false;
  }


  // funzione per controllare se la selezione è già stata selezionata
  checkAlreadySelected(selectedText, paragraphNumber) {
    var found = false;
    if (document.getSelection().anchorNode.parentNode.tagName == 'SPAN')
      found = true;
    var text = $('#p' + paragraphNumber).text();
    var start = text.indexOf(selectedText);
    var end = start + selectedText.length;
    // var reactions = this.paragraphs[paragraphNumber - 1].reactions;
    console.log(paragraphNumber);
    var reactions = this.query('paragraphs', 'id', paragraphNumber).reactions;
    for (var i = 0; i < reactions.length; i++) {
      if (start > reactions[i].selectionStart && start < reactions[i].selectionEnd)
        found = true;
      if (end > reactions[i].selectionStart && end < reactions[i].selectionEnd)
        found = true;
      if (selectedText.includes(reactions[i].selectionText) || reactions[i].selectionText.includes(selectedText))
        found = true;
    }
    return found;
  }


  // funzione per controllare se è stato evidenziato tutto il paragrafo
  checkFullParagraph(selection, text, selectedText, start, end, number) {
    if (start == 0 && end == text.length) {
      selection.selection = "Paragrafo intero";
      this.paragraphReaction(number, selection);
    } else {
      selection.selectionStart = start;
      selection.selectionEnd = end;
      selection.selectionText = selectedText;
      this.paragraphReaction(number, selection);
    }
  }


  // funzione che attribuisce alla selezione la descrizione della reazione necessaria per il report
  paragraphReaction(number, selection) {
    if (number == 1) {
      selection.selectionChoice = "Mi fa paura";
    } else {
      selection.selectionChoice = "Non ho capito";
    }
  }


  // funzione per la selezione all'interno di un singolo paragrafo
  singleParagraphSelection(selectedText, paragraphNumber, number) {
    if (!this.checkSelection(paragraphNumber))
      return;
    var text = $('#p' + paragraphNumber).html();
    var start = text.indexOf(selectedText);
    var end = start + selectedText.length;
    var selection = {};
    this.sections.forEach(function(section) {
      if (section.id == current_section) {
        section.paragraphs.forEach(function(paragraph) {
          if (paragraph.id == paragraphNumber)
            paragraph.reactions.push(selection);
        })
      }
    })
    if (number == 1)
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


  // funzione per l'aggiunta di una reazione senza la selezione
  highlightWithoutSelection(paragraphNumber, number) {
    this.clearReaction(paragraphNumber);
    var text = $('#p' + paragraphNumber).text();
    if (number == 1)
      var spn = '<span class="firstHighlight">' + text + '</span>';
    else
      var spn = '<span class="secondHighlight">' + text + '</span>';
    $('#p' + paragraphNumber).html(spn);
    var selection = {};
    selection.selection = "Paragrafo intero";
    this.paragraphReaction(number, selection);
    this.sections.forEach(function(section) {
      if (section.id == current_section) {
        section.paragraphs.forEach(function(paragraph) {
          if (paragraph.id == paragraphNumber)
            paragraph.reactions.push(selection);
        })
      }
    })
  }


  // funzione per controllare la selezione
  checkSelection(paragraphNumber) {
    var selection = document.getSelection();
    var parent = selection.anchorNode.parentNode;
    var idParent = parent.getAttribute("id");
    var numberOfParagraph = parseInt(idParent.match(/\d+/));
    if (numberOfParagraph == paragraphNumber)
      return true;
    return false;
  }


  // funzione per controllare se sono state aggiunte delle reazioni durante la lettura
  checkReactions() {
    var found = false;
    this.sections.forEach(function(section) {
      for (var i = 0; i < section.paragraphs.length; i++) {
        if (section.paragraphs[i].reactions.length != 0) {
          $('#resetReactions').prop('disabled', false);
          $('#agree').attr('disabled', true);
          $('#agree').prop('checked', false);
          $('#disagree').prop('checked', true);
          $('#finalSubmit').attr('disabled', false);
          found = true;
        } else if (found == false) {
          $('#resetReactions').prop('disabled', true);
          $('#agree').attr('disabled', false);
          $('#agree').prop('checked', false);
          $('#disagree').prop('checked', false);
          $('#finalSubmit').attr('disabled', true);
        }
      }

    })
  }


  agreed(choice) {
    this.accepted = choice;
  }


  // funzione che crea le progress bar
  createProgressBar() {
    var percentage = Math.floor(1 / (this.sections.length) * 100);
    var progressBar =
      '<div class="progress">' +
      '<div class="progress-bar" role="progressbar" aria-valuenow="' + percentage + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + percentage + '%;">' +
      percentage + '% Completato' +
      '</div>' +
      '</div>';
    $('#progressBar').html(progressBar);
  }


  // funzione per aggiornare le progress bar
  updateProgressBar(section_id) {
    var percentage = Math.round(section_id / (this.sections.length) * 100);
    $('.progress-bar').attr('aria-valuenow', percentage);
    $('.progress-bar').css('aria-valuenow', percentage);
    $('.progress-bar').css({
      'width': percentage + '%'
    });
    $('.progress-bar').text(percentage + '% Completato');
  }


  // query fondametale per l'utilizzo di molte funzioni
  query(object, attribute = null, value = null, parent = this) {
    if (Array.isArray(parent) && typeof parent[0] == 'object') {
      for (var i = 0; i < parent.length; i++) {
        var result = this.query(object, attribute, value, parent[i]);
        if (result)
          return result;
      }
    }
    if (object in parent) {
      if (attribute == null) {
        return parent[object];
      } else {
        for (var i = 0; i < parent[object].length; i++) {
          if (attribute in parent[object][i]) {
            if (parent[object][i][attribute] == value) {
              return parent[object][i];
            }
          }
        }
        return undefined;
      }
    }
    var properties = Object.getOwnPropertyNames(parent);
    for (var j = 0; j < properties.length; j++) {
      var property = properties[j];
      if (Array.isArray(parent[property]) && typeof parent[property] != 'string') {
        var result = this.query(object, attribute, value, parent[property]);
        if (result)
          return result;
      }
    }
  }

}