<?php include_once("../header.php"); ?>

<?php 

$firstname = $_POST['firstname'] ?? '';
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
?>

<div class="connect-form">
        
    <form method="post" action="mail.php">
        <h1>Envoyez votre message !</h1>
        <div class="full-content">
            <div class="info">
                    <legend>Nom :</legend>
                <div class="login">
                    <input name="name" type="text" id="name" placeholder="nom" value="<?php echo $name ;?>" required>
                </div>
                    <legend>Prénom :</legend>
                <div class="login">
                    <input name="firstname" type="text" id="firstname" placeholder="prénom" value="<?php echo $firstname; ?>" required>
                </div>
                    <legend>E-mail : </legend>
                <div class="login">
                    <input name="email" type="email" id="email" placeholder="email" value="<?php echo $email; ?>" required>
                </div>
            </div>
            <div class="content">
                    <legend>Message : </legend>
                <div class="login">
                    <textarea name="message" rows="8" cols="30" id="message" placeholder="votre message.." required></textarea>
                </div>
            </div>
        </div>
        <br><br>
        <input type="submit" value="Envoyer">
    
    </form>

</div>

<script src="../script.js"></script>



<?php include_once("../footer.php"); ?>