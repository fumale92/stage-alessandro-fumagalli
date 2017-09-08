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
  $(function(){
    text.paragraphIcon();
    var readability;
    $('#gulpease').click(function(){
      readability = 1;
      text.readabilityIndex(readability);
      text.BGReset();
      buttonBG();
      $("#readability-icon-empty").hide();
      $("#readability-icon").show();
    });
    $('#colemanLiau').click(function(){
      readability = 2;
      text.readabilityIndex(readability);
      text.BGReset();
      buttonBG();
      $("#readability-icon-empty").hide();
      $("#readability-icon").show();
    });
    $('#ARI').click(function(){
      readability = 3;
      text.readabilityIndex(readability);
      text.BGReset();
      buttonBG();
      $("#readability-icon-empty").hide();
      $("#readability-icon").show();
    });

    $("#buttonBG").on('switchChange.bootstrapSwitch', function(){
      buttonBG();
    })

    $("#btnReset").click(function() {
      $('#gulpease').removeClass('active');
      $('#colemanLiau').removeClass('active');
      $('#ARI').removeClass('active');

      $('#metricValue').empty();
      $('#metricValue').append("<h4 align=\"center\">Valore leggibilità</h4>");

      $("#readability-icon").hide();
      $("#readability-icon-empty").show();

      $('#buttonBG').bootstrapSwitch('state', false);
      readability = 0;
      text.BGReset();
    });

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
  });
  $('#renderingText').remove();
}
