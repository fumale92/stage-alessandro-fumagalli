var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};


// funzione principale per la costruzione della pagina html
function buildpage() {
  var urlParameter = getUrlParameter('redirectTo');
  if (urlParameter.match(/\.txt$/)) {
    text = txtToText(urlParameter);
    text = textToParagraph(text);
  } else if (urlParameter.match(/\.html$/)) {
    text = htmlToText(urlParameter);
  }
  text.createHeader();

  for (section of text.sections) {
    text.showSection(section.id);
    text.paragraphIcon(section.id);
    $(".section[id=\"" + section.id + "-text\"]").hide();
  }
  showSelectedSection();
  text.createProgressBar();

  var readability;

  $.fn.bootstrapSwitch.defaults.onColor = 'success';
  $.fn.bootstrapSwitch.defaults.offColor = 'danger';
  $.fn.bootstrapSwitch.defaults.size = 'medium';
  $("[name='gulpease']").bootstrapSwitch("labelText", '<i class="fas fa-lightbulb fa-lg" aria-hidden="true"></i>');

  $("[name='gulpease']").on('switchChange.bootstrapSwitch', function() {
    readability = 1;
    if ($(".bootstrap-switch-id-gulpease").hasClass("bootstrap-switch-on")) {
      $("[name='gulpease']").bootstrapSwitch("labelText", '<i class="far fa-lightbulb fa-lg" aria-hidden="true"></i>');
      text.readabilitySign(readability, current_section);
      $("#buttonBG").bootstrapSwitch("disabled", false);
      $("#buttonBG").bootstrapSwitch('state', true);

      $("#readability-icon").show();
      // $("#buttonBG").bootstrapSwitch('state', true);
      $("[name='buttonReadabilityCircles']").bootstrapSwitch("disabled", false);
      $("[name='buttonReadabilityCircles']").bootstrapSwitch('state', true);
    } else {
      text.BGReset(current_section);
      $("[name='gulpease']").bootstrapSwitch("labelText", '<i class="fas fa-lightbulb fa-lg" aria-hidden="true"></i>');
      $("#readability-icon").hide();
      $("#readability-icon-empty").show();
      $("#readability-icon").children().each(function() {
        $(this).empty()
      });
      $('.section[id="' + current_section + '-readability"]').hide()
      $("#buttonBG").bootstrapSwitch('state', false);
      $("#buttonBG").bootstrapSwitch("disabled", true);
      $("[name='buttonReadabilityCircles']").bootstrapSwitch('state', false);
      $("[name='buttonReadabilityCircles']").bootstrapSwitch("disabled", true);
    }
  });

  $("#showIcons").css({
    "margin-top": ($("#header").height() - $("#showIcons").height() - 25 + 'px')
  });

  $("#resetReactions").css({
    "margin-top": ($("#header").height() - $("#resetReactions").height() - 25 + 'px')
  });

  $("[name='buttonReadabilityCircles']").bootstrapSwitch("labelText", '<i class="fa fa-eye-slash fa-lg" aria-hidden="true"></i>');
  $("[name='buttonReadabilityCircles']").bootstrapSwitch("disabled", true);
  $("[name='buttonReadabilityCircles']").on('switchChange.bootstrapSwitch', function() {
    if ($(".bootstrap-switch-id-buttonReadabilityCircles").hasClass("bootstrap-switch-on")) {
      $("[name='buttonReadabilityCircles']").bootstrapSwitch("labelText", '<i class="fa fa-eye fa-lg" aria-hidden="true"></i>');
      text.showIcons(current_section);
    } else {
      $("[name='buttonReadabilityCircles']").bootstrapSwitch("labelText", '<i class="fa fa-eye-slash fa-lg" aria-hidden="true"></i>');
      text.hideIcons(current_section);
    }
  });

  $("#buttonBG").on('switchChange.bootstrapSwitch', function() {
    buttonBG();
  });


  $("[name='buttonBG']").bootstrapSwitch("labelText", '<i class="far fa-image fa-lg" aria-hidden="true"></i>');
  $("[name='buttonBG']").on('switchChange.bootstrapSwitch', buttonBG);

  function buttonBG() {
    if ($(".bootstrap-switch-id-buttonBG").hasClass("bootstrap-switch-on")) {
      $("[name='buttonBG']").bootstrapSwitch("labelText", '<i class="fas fa-image fa-lg" aria-hidden="true"><i>');
      text.BGOnReadability(readability, current_section);
    } else {
      $("[name='buttonBG']").bootstrapSwitch("labelText", '<i class="far fa-image fa-lg" aria-hidden="true"></i>');
      text.BGReset(current_section);
    }
  }

  $('#agree').on('click', function() {
    $('#finalSubmit').attr('disabled', false);
    text.agreed(true);
  });
  $('#disagree').on('click', function() {
    $('#finalSubmit').attr('disabled', false);
    text.agreed(false);

  });

  $('#finalSubmit').click(function() {
    var response = confirm("Sei sicuro/a?");
    if (response) {
      localStorage.setItem("json", JSON.stringify(text));
      // var json = JSON.stringify(text);
      // console.log(JSON.parse(json));
      window.location.href = 'response.php'; //IDEA redirect to another page
    }
  });

  $('#renderingText').remove();

  $('#zoomIn').on('click', text.zoomIn(current_section));
  $('#zoomOut').on('click', text.zoomOut(current_section));

  $('.reactionButton').click(function() {
    text.highlightText($(this).data('id'), $(this).data('type'));
    text.checkReactions();
  });

  $('#resetReactions').click(function() {
    text.resetReactions();
  });

  function showSelectedSection() {
    if (current_section != 1) {
      $('.section[id="' + (current_section - 1) + '-text"]').hide();
      $('.section[id="' + (current_section - 1) + '-reactions"]').hide();
      $('#' + (current_section - 1) + '-readability-empty').hide();
    }
    $('.section[id="' + current_section + '-text"]').show();
    $('.section[id="' + current_section + '-reactions"]').show();
    $('#' + current_section + '-readability-empty').show();
  }

  $('#avanti').click(function() {
    current_section++;
    showSelectedSection();
    text.updateProgressBar(current_section);
    $("[name='gulpease']").bootstrapSwitch('state', false);
    $("#indietro").attr('disabled', false);
    jQuery('html,body').animate({
      scrollTop: 0
    }, 0);
    if (current_section == text.sections.length) {
      $('#final').removeAttr('hidden');
      $("#avanti").attr('disabled', true);
    }
    text.resizeContent(current_section);
    var disable = true;
    text.sections.forEach(function(section) {
      if (section.id == current_section) {
        section.paragraphs.forEach(function(paragraph) {
          if (!jQuery.isEmptyObject(paragraph.reactions))
            disable = !disable;
        })
      }
    })
    $('#resetReactions').prop('disabled', disable);
  })

  $('#indietro').click(function() {
    $('.section[id="' + (current_section) + '-text"]').hide();
    $('.section[id="' + (current_section) + '-reactions"]').hide();
    $('#' + (current_section) + '-readability-empty').hide();
    current_section--;
    showSelectedSection();
    text.updateProgressBar(current_section);
    $("[name='gulpease']").bootstrapSwitch('state', false);
    jQuery('html,body').animate({
      scrollTop: 0
    }, 0);
    if (current_section == 1) {
      $("#indietro").attr('disabled', true);
    }
    if (current_section != text.sections.length) {
      $('#final').attr('hidden', true);
      $("#avanti").attr('disabled', false);
    }
    text.resizeContent(current_section);
    var disable = true;
    text.sections.forEach(function(section) {
      if (section.id == current_section) {
        section.paragraphs.forEach(function(paragraph) {
          if (!jQuery.isEmptyObject(paragraph.reactions))
            disable = !disable;

        })
      }
    })
    $('#resetReactions').prop('disabled', disable);
  })

}