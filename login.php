<?php session_start(); /* Starts the session */

	/* Check Login form submitted */
	if(isset($_POST['Submit'])){
		/* Define username and associated password array */
		$logins = array('username1' => 'password1','username2' => 'password2');

		/* Check and assign submitted Username and Password to new variable */
		$Username = isset($_POST['Username']) ? $_POST['Username'] : '';
		$Password = isset($_POST['Password']) ? $_POST['Password'] : '';

		/* Check Username and Password existence in defined array */
		if (isset($logins[$Username]) && $logins[$Username] == $Password){
			/* Success: Set session variables and redirect to Protected page  */
			$_SESSION['UserData']['Username']=$logins[$Username];
			header("location:index.php");
			exit;
		} else {
			/*Unsuccessful attempt: Set error message */
			$msg="<span style='color:red'>Credenziali errate</span>";
		}
	}
?>
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>LOGIN PAGE</title>
		<?php define("PREPATH", "");
    require_once(PREPATH."page_builder/_header.php") ?>
		<style media="screen">
		html, body {
			height: 80%;
		}
		html {
			display: table;
			margin: auto;
		}
		body {
			display: table-cell;
			vertical-align: middle;
		}
		</style>
  </head>

  <body>
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3 panel panel-default" style="background-color: #71dd93">
          <h2 class="text-center">Inserisci le tue credenziali</h2>
          <form action="" method="post" name"Login_Form">
            <?php if(isset($msg)){?>
							<div class="form-group col-md-12 text-center">
	              <div class="col-md-6 col-md-offset-3">
									<span><?php echo $msg;?></span>
								</div>
							</div>
            <?php } ?>
            <div class="form-group col-md-12">
              <div class="col-md-6 col-md-offset-3">
                Nome utente:
                <input name="Username" type="text" class="form-control" placeholder="Inserire username">
              </div>
            </div>
            <div class="form-group col-md-12">
              <div class="col-md-6 col-md-offset-3">
                Password:
                <input name="Password" type="password" class="form-control" placeholder="Inserire password">
              </div>
            </div>
            <div class="col-md-12" style="margin-bottom: 10px" align="center">
							<button type="submit" name="Submit" class="btn btn-default">
								Login <i class="fa fa-sign-in" aria-hidden="true"></i>
							</button>
            </div>
          </form>
        </div>
      </div>
    </div>

		<?php include PREPATH.'page_builder/_footer.php';?>

  </body>
</html>
