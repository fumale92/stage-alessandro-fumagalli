<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <?php define("PREPATH", "");
    require_once(PREPATH."page_builder/_header.php") ?>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center" style="margin-top: 50px">
          <h1>QUESTIONARIO COMPLETATO</h1>
          <script type="text/javascript">
           console.log(JSON.parse(localStorage.getItem("json")));
          </script>
        </div>
      </div>
    </div>
  </body>
</html>
