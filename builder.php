<!DOCTYPE html>
<html>
  <head>

    <meta charset="utf-8">
    <title>CONSENSO INFORMATO</title>
    <?php define("PREPATH", "");
    require_once(PREPATH."page_builder/_header.php") ?>
    <script type="text/javascript" src="<?=PREPATH?>assets/js/converter.js"></script>
    <script type="text/javascript" src="<?=PREPATH?>assets/js/main.js"></script>
    <script type="text/javascript" src="<?=PREPATH?>assets/js/informedConsent.js"></script>
    <script type="text/javascript" src="<?=PREPATH?>assets/js/calculateReadability.js"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">

  </head>

  <body>

    <div class="container-fluid" id="top">

      <nav class="navbar navbar-default navbar-fixed-top" id="nav1">

        <div class="panel-body" style="margin-bottom: -27px;">
          <!-- header -->
          <div class="col-xs-8 col-md-8 text-center" id="header">
          </div>
          <!-- sopra pallini -->
          <div class="col-xs-1 col-md-1 bstooltip" id="showIcons"  data-toggle="tooltip" data-trigger="manual" data-placement="top" data-trigger="manual" title="Mostra/Nascondi la visualizzazione grafica leggibilità">
            <input id="buttonReadabilityCircles" type="checkbox" name="buttonReadabilityCircles">
          </div>

          <!-- sopra reazioni -->
          <div class="col-xs-3 col-md-3" id="visualization">
            <button class="col-xs-8 col-xs-offset-2 btn btn-warning bstooltip" id="resetReactions" data-toggle="tooltip" data-trigger="manual" data-placement="top" data-trigger="manual" title="Cancella tutte le reazioni" disabled>
              Cancella reazioni aggiunte
            </button>

            <!-- Button trigger modal -->
            <button type="button" class="btn btn-info btn-xs" data-toggle="modal" data-target="#myModal">
              <i class="fas fa-question-circle fa-2x bstooltip" aria-hidden="true" id="faq" data-toggle="tooltip" data-placement="left" data-trigger="manual" title="Sezione aiuto" style="padding-top:1px"></i>
            </button>

            <!-- Modal -->
            <div class="modal fade" id="myModal" role="dialog">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Istruzioni all'uso - supporto alla lettura</h4>
                  </div>
                  <div class="modal-body">
                    <p>Il consenso informato è mostrato in sezioni. Per passare da una sezione all'altra bisogna utilizzare i pulsanti avannti/indietro.</p>
                    <p>Ciascuna sezione è divisa in paragrafi. Da parte a ciascun paragrafo sono presenti due colonne:</p>
                      <ul>
                        <li>la prima, inizialmente vuota, serve per mostrare la difficoltà della leggibilità di ciascun paragrafo tramite un indicatore grafico composto da cinque icone circolari (meno pallini colorati sono rappresentati, più il paragrafo è complicato);</li>
                        <li>la seconda invece è composta da tre icone e servono per aggiungere/rimuovere le reazioni che si provano leggendo ciascun paragrafo.</li>
                      </ul>
                    <p>Le reazioni che verrano aggiunte saranno inviate insieme al consenso informato al termine della compilazione. Queste reazioni permetteranno allo staff medico di sapere quali parti del documento dovranno rispiegare</p>
                    <p>Per attivare l'indice di leggibilità bisogna cliccare sul pulsante ON/OFF con l'icona della lampadina.</p>
                    <p>Per avere una visualizzazione grafica più efficace della difficoltà nella lettura è possibile attivare lo sfondo: più lo sfondo sarà tendente al nero più il paragrafo sarà difficile da leggere.</p>
                    <p>La barra posta infondo alla pagina serve per dare un'informazione relativa all'avanzamento della lettura dell'intero documento.</p>
                    <p>Al termine della lettura viene chiesto di rispondere in quattro campi:</p>
                    <ul>
                      <li>Quanto si è preoccupati alla lettura dell'intero documento? (in un range compreso tra "per niente" e "molto")</li>
                      <li>Quanto non si ha capito dell'intero documento? (in un range compreso tra "per niente" e "molto")</li>
                      <li>Acconsento/non acconsento al trattamento riportato nel consenso informato. <br>NB: se sono state aggiunte delle reazioni durante la lettura, non sarà possibile acconsentire in quanto qualcosa non vi è risultato chiaro.</li>
                      <li>Inviare il consenso informato annotato allo staff medico.</li>
                    </ul>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Chiudi</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <!-- sotto header -->
        <div class="panel-body" style="padding-bottom: 0px !important;">
          <div class="col-xs-12 col-md-12" id="briefing">
            <div class="row">
              <!-- pulsanti -->
              <div class="col-xs-8 col-md-8" id="briefing_informedConsent">
                <div class="row">
                  <!-- zoom -->
                  <div class="col-xs-2" style="margin-top:10px" align="center">
                    <div class="btn-group" role="group">
                      <button class="btn btn-default btn-sm bstooltip" type="button" id="zoomOut" onclick="text.zoomOut(current_section)" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Diminuisce la dimensione del testo">
                        <i class="fa fa-search-minus fa-lg" aria-hidden="true"></i>
                      </button>
                      <button class="btn btn-default btn-sm bstooltip" type="button" id="zoomIn" onclick="text.zoomIn(current_section)" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Aumenta la dimensione del testo">
                        <i class="fa fa-search-plus fa-lg" aria-hidden="true"></i>
                      </button>
                    </div>
                    <h5 style="margin-top: 10px">TESTO</h5>
                  </div>
                  <!-- leggibilità -->
                  <div class="readabilityControls col-xs-8" style="margin-top:10px" align="center">
                    <div class="bstooltip" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Attiva/Disattiva l'indice di leggibilità di Gulpease" >
                      <input id="gulpease" name="gulpease" type="checkbox">
                    </div>
                    <h5 style="margin-top: 10px">INDICE DI LEGGIBILITA'</h5>
                  </div>
                  <!-- sfondo -->
                  <div class="col-xs-2" style="margin-top:10px" align="center">
                    <div class="bstooltip" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Attiva lo sfondo colorato ai paragrafi" >
                      <input id="buttonBG" name="buttonBG" type="checkbox" disabled>
                      <h5 style="margin-top: 10px">SFONDO</h5>
                    </div>
                  </div>
                </div>
              </div>
              <!-- descrizione pallini -->
              <div class="col-xs-1 col-md-1" id="briefing_readabilityCircles">
                <h5 style="text-align: center">
                  <div id="grad1"></div>
                  <div style="margin-top: 10px">FACILITA'<br>LETTURA <i class="fa fa-arrow-right" aria-hidden="true"></i></div>
                </h5>
              </div>
              <!-- descrizione reazioni -->
              <div class="col-xs-3 col-md-3" id="briefing_reactions">
                <div class="col-xs-12">
                  <div class="col-xs-4 text-center">
                    <h5>
                      <img src="assets/img/Fearful_Face_Emoji.png" height="25" width="25"><br>SONO<br>PREOCCUPATO
                    </h5>
                  </div>
                  <div class="col-xs-4 text-center">
                    <h5>
                      <img src="assets/img/Confused_Face_Emoji.png" height="25" width="25"><br>NON HO<br>CAPITO
                    </h5>
                  </div>
                  <div class="col-xs-4 text-center">
                    <h5>
                      <i class="fas fa-trash-alt btn-circle-symbol" aria-hidden="true"></i><br>CANCELLA<br>REAZIONE
                    </h5>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </nav>
      <div class="panel-body" id="text-body">
        <div class="col-xs-12 text-center" id="renderingText">
          <i class="fa fa-spinner fa-pulse" style="font-size:48px"></i>
          <div class="animationload">
            <div class="osahanloading"></div>
          </div>
        </div>

        <div class="col-xs-8 col-md-8 text-justify" id="pdf-text"></div>
        <div class="col-xs-1 col-md-1" id="readability-icon" hidden="true"></div>
        <div class="col-xs-1 col-md-1" id="readability-icon-empty"></div>
        <div class="col-xs-3 col-md-3" id="reactions-button"></div>
        <div class="col-xs-12" id="final" style="margin-bottom:25px" hidden>
          <form align="center" style="margin-bottom:25px">
            <h3>in base a quanto ha letto finora:</h3>
            <div>
              <h5>Quanto è preoccupato?</h5> <b style="padding-right: 10px">per niente</b> <input id="first_slider" type="text" data-slider-handle="custom" data-slider-tooltip="hide"/> <b style="padding-left: 10px">molto</b>
            </div>
            <div>
              <h5>Quanto ha capito?</h5> <b style="padding-right: 10px">per niente</b> <input id="second_slider" type="text" data-slider-handle="custom" data-slider-tooltip="hide"/> <b style="padding-left: 10px">molto</b>
            </div>
          </form>
          <div class="final-toolbar" style="margin-top: 30px; font-size: 12pt;">
            <form id="accept" align="center">
              <input type="radio" id="agree" name="finalReactions">
              <label for="agree">Acconsento</label>
              <input type="radio" id="disagree" name="finalReactions">
              <label for="disagree">Non acconsento</label>
            </form>
            <form id="idFinalSubmit" align="center">
              <input type="button" class="btn btn-success btn-md" id="finalSubmit" name="submit" value="Invia" disabled="disabled">
            </form>
          </div>
        </div>
        <div class="col-xs-12" style="margin-bottom: 20px;">
          <div class="row">
            <div class="col-xs-3" style="margin-top: -7px">
              <button type="button" class="btn btn-primary center-block btn-circle bstooltip" id="indietro" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Sezione precedente" disabled>
                <i class="fas fa-angle-left fa-2x" style="margin-top: -6px; margin-left: -2px"></i>
                <!-- Indietro --> <!-- FIXME: togliere btn-cirle e i -->
              </button>
            </div>
            <div id="progressBar" class="col-xs-6">

            </div>
            <div class="col-xs-3" style="margin-top: -7px">
              <button type="button" class="btn btn-primary center-block btn-circle bstooltip" id="avanti" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Sezione successiva">
                <i class="fas fa-angle-right fa-2x" style="margin-top: -6px; margin-left: 2px"></i>
                <!-- Avanti --> <!-- FIXME: togliere btn-cirle e i -->
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <?php include PREPATH.'page_builder/_footer.php';?>
    <!-- <footer>
      <div class="footer" align="center">
        <h7>Copyright © 2018 Fumagalli Alessandro - version 2.2</h7>
      </div>
    </footer> -->

    <script type="text/javascript">
      var text;
      var current_section = 1;
      let test;
      buildpage();

      // tooltip
      $(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });

      $('.bstooltip').mouseenter(function(){
        var that = $(this)
        that.tooltip('show');
        setTimeout(function(){
          that.tooltip('hide');
        }, 5000);
      });

      $('.bstooltip').mouseleave(function(){
        $(this).tooltip('hide');
      });

      $('#myModal').appendTo("body")

      // slider
      $("#first_slider").slider({ id: "first_slider", min: 1, max: 100, step: 1, value: 1 });
      $("#second_slider").slider({ id: "second_slider", min: 1, max: 100, step: 1, value: 1 });
      $('#first_slider').change(function(){
        console.log($(this).find(".slider-handle").attr("aria-valuenow"));
        //http://seiyria.com/bootstrap-slider/
        switch ($(this).find(".slider-handle").attr("aria-valuenow")) {
          case 1:
            $(this).css({
              "content": "'\1F610' !important"
            });
            break;
          case 2:
            $(this).css({
              "content": "'\1F628' !important"
            });
            break;
          case 3:
            $(this).css({
              "content": "'\1F628' !important"
            });
            break;
          case 4:
            $(this).css({
              "content": "'\1F628' !important"
            });
            break;
          case 5:
            $(this).css({
              "content": "'\1F628' !important"
            });
            break;
        }
      });

    </script>
  </body>
</html>
