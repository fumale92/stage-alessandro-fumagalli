<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>UPLOAD FILE</title>
    <?php define("PREPATH", "");
    require_once(PREPATH."page_builder/_header.php") ?>
    <?php session_start(); /* Starts the session */
      if(!isset($_SESSION['UserData']['Username'])){
        header("location:login.php");
        exit;
      }
    ?>
  </head>

  <body>

    <div class="container">
      <div class="row">
        <div class="col-md-12" style="margin-top: 50px">
          <h3>Selezionare un consenso informato con estensione TXT o HTML:</h3>
          <form class="form" action="upload.php" method="post" enctype="multipart/form-data">
            <div class="form-group">
              <input type="file" class="file" name="fileToUpload" id="fileToUpload" accept="text/plain,text/html">
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="fa fa-file-text-o" aria-hidden="true"></i>
                </span>
                <input type="text" class="form-control input-lg path" disabled>
                <div class="input-group-btn">
                  <button id="search" type="button" class="browse btn btn-primary form-control input-lg">
                    <i class="fa fa-folder-open" aria-hidden="true"></i> Sfoglia
                  </button>
                </div>
                <div class="input-group-btn">
                  <button id="submit" type="submit" name="submit" class="submit btn btn-info input-lg" disabled>
                    Invia <i class="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <a href="logout.php" class="btn btn-primary"><i class="fa fa-sign-out" aria-hidden="true" style="font-size: 14pt"></i> Logout</a>
        </div>
      </div>
    </div>

    <?php include PREPATH.'page_builder/_footer.php';?>


    <script type="text/javascript">
      $(document).on('click', '.browse', function(){
        var file = $(this).parent().parent().parent().find('.file');
        file.trigger('click');
      });
      $(document).on('change', '.file', function(){
        $(this).parent().find('.path').val($(this).val().replace(/C:\\fakepath\\/i, ''));
        $('#submit').attr('disabled', false);
      });
    </script>

  </body>
</html>
