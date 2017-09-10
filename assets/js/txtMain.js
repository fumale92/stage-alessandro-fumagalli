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

function buildpage(){
  text = txtToText(getUrlParameter('redirectTo'));
  text = textToParagraph(text);
  text.createHeader();
  text.paragraphsToHtml();
  text.paragraphIcon();

  var readability;
  $('#gulpease').click(function(){
    readability = 1;
    text.readabilityIndex(readability);
    text.BGReset();
    buttonBG();
    $("#readability-icon-empty").hide();
    $("#readability-icon").show();
    $("#buttonBG").bootstrapSwitch("disabled", false);
    $("#btnReset").prop("disabled", false);

  });
  $('#colemanLiau').click(function(){
    readability = 2;
    text.readabilityIndex(readability);
    text.BGReset();
    buttonBG();
    $("#readability-icon-empty").hide();
    $("#readability-icon").show();
    $("#buttonBG").bootstrapSwitch("disabled", false);
    $("#btnReset").prop("disabled", false);

  });
  $('#ARI').click(function(){
    readability = 3;
    text.readabilityIndex(readability);
    text.BGReset();
    buttonBG();
    $("#readability-icon-empty").hide();
    $("#readability-icon").show();
    $("#buttonBG").bootstrapSwitch("disabled", false);
    $("#btnReset").prop("disabled", false);

  });

  $("#buttonBG").on('switchChange.bootstrapSwitch', function(){
    buttonBG();
  })

  $("#btnReset").click(function() {
    $('#gulpease').removeClass('active');
    $('#colemanLiau').removeClass('active');
    $('#ARI').removeClass('active');

    $("#btnReset").prop("disabled", true);

    $('#metricValue').empty();
    $('#metricValue').append("<h4 align=\"center\">Valore leggibilità</h4>");

    $("#readability-icon").hide();
    $("#readability-icon-empty").show();

    $('#buttonBG').bootstrapSwitch('state', false);
    $("#buttonBG").bootstrapSwitch("disabled", true);
    readability = 0;
    text.BGReset();
  });

  $.fn.bootstrapSwitch.defaults.onColor = 'success';
  $.fn.bootstrapSwitch.defaults.offColor = 'danger';
  $.fn.bootstrapSwitch.defaults.size = 'medium';
  $("[name='buttonBG']").bootstrapSwitch('labelText', 'Sfondo');
  $("#resetReactions").css({'margin-top': ($("#header").height() - $("#visualization").height() - 10 +'px')});


  function buttonBG(){
    if ($(".bootstrap-switch-id-buttonBG").hasClass("bootstrap-switch-on")) {
      text.BGOnReadability(readability);
    } else {
      text.BGReset();
    }
  }

  $('#agree').on('click', function(){
    $('#finalSubmit').attr('disabled', false);
    text.agreed(true);
  })
  $('#disagree').on('click', function(){
    $('#finalSubmit').attr('disabled', false);
    text.agreed(false);
  })

  $('#finalSubmit').click(function(){
    var response = confirm("Sei sicuro/a?");
    if (response) {
      localStorage.setItem("json", JSON.stringify(text));
      // var json = JSON.stringify(text);
      // console.log(JSON.parse(json));
      window.location.href = 'response.php'; //IDEA redirect to another page
    }
  })

  $('#renderingText').remove();
}
