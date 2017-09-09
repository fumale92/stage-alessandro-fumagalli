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
              <div class="panel-body">
                <div class="col-xs-8 col-md-8 text-center" id="header">
                </div>
                <div class="col-xs-1 col-md-1 text-center" id="metricValue">
                  <h4 align="center">Valore leggibilità</h4>
                </div>
                <div class="col-xs-3 col-md-3 text-right" id="visualization">
                  <div class="readabilityControls">
                    <h4 align="center">Scegliere l'indice di leggibilità:</h4>
                    <form class="form" align="center">
                      <div class="checkboxgroup" data-toggle="buttons" style="width:100%">
                        <label id="gulpease" class="btn btn-default" name="readabilityIndexName" style="width:30%">
                          <input type="radio">Gulpease
                        </label>
                        <label id="colemanLiau" class="btn btn-default" name="readabilityIndexName" style="width:30%">
                          <input type="radio">Coleman
                        </label>
                        <label id="ARI" class="btn btn-default" name="readabilityIndexName" style="width:30%">
                          <input type="radio">ARI
                        </label>
                      </div>
                    </form>
                    <br>
                    <form class="form" align="center">
                      <div class="checkboxgroup" data-toggle="buttons" style="width:100%" align="center">
                        <label id="btnReset" class="btn btn-warning" style="width:30%">Reset</label>
                      </div>
                    </form>
                    <br>
                    <div class="checkboxgroup" style="100%">
                      <input id="buttonBG" name="buttonBG" type="checkbox" style="width:30%" align="right">
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-md-12" id="briefing">
                <div class="row">
                  <div class="col-xs-8 col-md-8" id="briefing_informedConsent" style="font-style: italic">
                    <h5>
                      <!-- BRIEFING INFORMED CONSENT <br> -->
                      Nella sezione sottostante sono riportati tutti i paragrafi del consenso informato.
                      Ogni paragrafo è diviso dal successivo grazie ad una linea di colore grigio.
                    </h5>
                  </div>
                  <div class="col-xs-1 col-md-1" id="briefing_readabilityCircles">
                    <h5>
                      <!-- BRIEFING READABILITY CIRCLES <br>
                      <i class="fa fa-circle cyan" aria-hidden="true"></i> : molto facile <br>
                      <i class="fa fa-circle green" aria-hidden="true"></i> : facile <br>
                      <i class="fa fa-circle yellow" aria-hidden="true"></i> : medio <br>
                      <i class="fa fa-circle orange" aria-hidden="true"></i> : difficile <br>
                      <i class="fa fa-circle red" aria-hidden="true"></i> : molto difficile
                    </h5> -->
                    <div id="grad1"></div>
                    &nbspFACILITA'&nbsp<i class="fa fa-arrow-right" aria-hidden="true"></i>
                  </div>
                  <div class="col-xs-3 col-md-3" id="briefing_reactions">
                    <h5 style="text-align: center">
                      <!-- BRIEFING REACTIONS <br> -->
                      <img src="assets/img/Anguished_Face_Emoji.png" height="25" width="25"> : sono intimorito
                       |
                      <!-- <br> -->
                      <img src="assets/img/Hushed_Face_Emoji.png" height="25" width="25"> : non capisco
                    </h5>
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
      $.fn.bootstrapSwitch.defaults.onColor = 'success';
      $.fn.bootstrapSwitch.defaults.offColor = 'danger';
      $.fn.bootstrapSwitch.defaults.size = 'medium';
      $.fn.bootstrapSwitch.defaults.labelText = 'Sfondo';

      $("[name='buttonBG']").bootstrapSwitch();
      buildpage();
    </script>

  </body>
</html>
