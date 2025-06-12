

<?php 

$nom = $_POST["name"];
$firstname = $_POST["firstname"];
$email = $_POST["email"];

$message = "De : $nom"." $firstname \n" ;
$message.= "E-mail : $email \n\n" ;
$message .= $_POST["message"];


$destinataire = "joshua.doucet@my-digital-school.org";
$objet = "Message du site";

$header = "From:" . "portfolio@web.com" ."\r\n";

$mailEnvoye = mail($destinataire, $objet, $message, $header);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Confirmation d'envoi</title>
    <meta http-equiv="refresh" content="5;url=../../"> <!-- Redirection -->
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            text-align: center;
            padding: 40px;
        }
        .message-box {
            background-color: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            display: inline-block;
        }
        .success {
            color: green;
        }
        .error {
            color: red;
        }
    </style>
</head>
<body>

<div class="message-box">
    <?php if ($mailEnvoye) : ?>
        <h1 class="success">✅ Merci <?= htmlspecialchars($firstname) ?>, ton e-mail a bien été envoyé !</h1>
        <p>Tu seras redirigé(e) vers l’accueil dans quelques secondes...</p>
    <?php  //ajoute l'utilisateur en base de donnée
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            // Connexion à la base de données MySQL
            include_once("../connect.php");
        
            $query = $pdo->prepare('INSERT INTO users (nom, prenom, email) VALUES (:nom, :prenom, :email)');
            $query->execute([
                "nom"=> $_POST['name'],
                "prenom"=> $_POST['firstname'],
                "email" => $_POST['email'],
                ]);
        }
    ?>
    <?php else : ?>
        <h1 class="error">❌ Oups ! Une erreur s'est produite…</h1>
        <p>Nous n'avons pas pu envoyer ton message. Tu seras redirigé(e) vers l’accueil.</p>
    <?php endif; ?>
</div>

</body>
</html>

<?php include_once("../footer.php"); ?>