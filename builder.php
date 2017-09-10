<!DOCTYPE html>
<html>
  <head>

    <meta charset="utf-8">
    <title>CONSENSO INFORMATO</title>
    <?php define("PREPATH", "");
    require_once(PREPATH."page_builder/_header.php") ?>
    <script type="text/javascript" src="<?=PREPATH?>assets/js/txtConverter.js"></script>
    <script type="text/javascript" src="<?=PREPATH?>assets/js/txtMain.js"></script>
    <script type="text/javascript" src="<?=PREPATH?>assets/js/InformedConsent.js"></script>
    <script type="text/javascript" src="<?=PREPATH?>assets/js/calculateReadability.js"></script>

  </head>

  <body>

    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <div class="row panel panel-default">
            <nav class="navbar navbar-default navbar-fixed-top" id="nav1">
              <div class="panel-body" style="margin-bottom: -27px;">
                <div class="col-xs-8 col-md-8 text-center" id="header">
                </div>
                <div class="col-xs-1 col-md-1 text-center" id="metricValue">
                  <h4 align="center">Valore leggibilità</h4>
                </div>
                <div class="col-xs-3 col-md-3 text-right" id="visualization">
                  <div class="readabilityControls">
                    <h4 align="center">Scegliere l'indice di leggibilità:</h4>
                    <div class="row" style="margin-bottom: 20px">
                      <div class="btn-group col-xs-12" data-toggle="buttons">
                        <button class="col-xs-4 btn btn-default bstooltip" id="gulpease" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Descrizione Gulpease">
                          <input type="radio" name="readabilityIndexName">Gulpease
                        </button>
                        <button class="col-xs-4 btn btn-default bstooltip" id="colemanLiau" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Descrizione Coleman Liau">
                          <input type="radio" name="readabilityIndexName">Coleman
                        </button>
                        <button class="col-xs-4 btn btn-default bstooltip" id="ARI" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Descrizione Automated Readability Index">
                          <input type="radio" name="readabilityIndexName">ARI
                        </button>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-12">
                        <button class="col-xs-4 btn btn-info bstooltip" id="btnReset" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Ripristina gli indici di leggibilità" disabled>
                          Reset
                        </button>
                        <div class="col-xs-6 col-xs-offset-1 bstooltip" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Attiva lo sfondo colorato ai paragrafi" >
                          <input id="buttonBG" name="buttonBG" type="checkbox" disabled>
                        </div>
                      </div>
                    </div>
                  </div>
                    <div class="row" id="resetReactionsRow">
                      <div class="col-xs-12 text-center">
                        <button class="col-xs-4 col-xs-offset-4 btn btn-warning bstooltip" id="resetReactions" onclick="text.resetReactions()" data-toggle="tooltip" data-trigger="manual" data-placement="top" data-trigger="manual" title="Cancella tutte le reazioni" disabled>
                          Azzera
                        </button>
                      </div>
                    </div>
                </div>
              </div>
              <div class="panel-body" style="padding-bottom: 0px !important;">
                <div class="col-xs-12 col-md-12" id="briefing">
                  <div class="row">
                    <div class="col-xs-8 col-md-8" id="briefing_informedConsent">
                      <div class="col-xs-9">
                        <h5 style="font-style: italic">
                          Nella sezione sottostante sono riportati tutti i paragrafi del consenso informato.<br>
                          Ogni paragrafo è diviso dal successivo grazie ad una linea di colore grigio.
                        </h5>
                      </div>
                      <div class="col-xs-3" style="margin-top:10px" align="right">
                        <div class="btn-group pull-right" role="group" >
                          <button class="btn btn-default btn-sm bstooltip" type="button" id="zoomIn" onclick="text.zoomIn()" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Aumenta la dimensione dei caratteri">
                            <i class="fa fa-search-plus fa-lg" aria-hidden="true"></i>
                          </button>
                          <button class="btn btn-default btn-sm bstooltip" type="button" id="zoomOut" onclick="text.zoomOut()" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Diminuisce la dimensione dei caratteri">
                            <i class="fa fa-search-minus fa-lg" aria-hidden="true"></i>
                          </button>
                        </div>
                        <br><h5>Zoom&nbsp;&nbsp;&nbsp;&nbsp;</h5>

                      </div>
                    </div>
                    <div class="col-xs-1 col-md-1" id="briefing_readabilityCircles">
                      <h5 style="text-align: center">
                        <div id="grad1"></div>
                        SEMPLICITA' <i class="fa fa-arrow-right" aria-hidden="true"></i>
                      </h5>
                    </div>
                    <div class="col-xs-3 col-md-3" id="briefing_reactions">
                      <div class="col-xs-12">
                        <div class="col-xs-4 text-center">
                          <h5>
                            <img src="assets/img/Anguished_Face_Emoji.png" height="25" width="25"><br>sono<br>intimorito
                          </h5>
                        </div>
                        <div class="col-xs-4 text-center">
                          <h5>
                            <img src="assets/img/Confused_Face_Emoji.png" height="25" width="25"><br>non<br>capisco
                          </h5>
                        </div>
                        <div class="col-xs-4 text-center">
                          <h5>
                            <i class="fa fa-undo btn-circle-symbol" aria-hidden="true"></i><br>cancella<br>selezione
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
              <div class="col-xs-1 col-md-1" id="readability-icon"></div>
              <div class="col-xs-1 col-md-1" id="readability-icon-empty" hidden="true"></div>
              <div class="col-xs-3 col-md-3">
                <form id="agreements-button"></form>
              </div>
              <div class="col-xs-12">
                <div class="final-toolbar" style="margin-top: 30px; font-size: 12pt;">
                  <form id="accept" align="center">
                    <input type="radio" id="agree" name="finalAgreements">
                    <label for="agree">Accetto</label>
                    <input type="radio" id="disagree" name="finalAgreements">
                    <label for="disagree">Non accetto</label>
                  </form>
                  <form id="idFinalSubmit" align="center">
                    <input type="button" class="btn btn-success btn-md" id="finalSubmit" name="submit" value="Invia" disabled="disabled">
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script type="text/javascript">
      buildpage();

      $(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });

      $('.bstooltip').mouseenter(function(){
        var that = $(this)
        that.tooltip('show');
        setTimeout(function(){
          that.tooltip('hide');
        }, 2000);
      });

      $('.bstooltip').mouseleave(function(){
        $(this).tooltip('hide');
      });
    </script>

  </body>
</html>
