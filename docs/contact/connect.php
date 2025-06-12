<?php
// Connexion à la base de données MySQL
    $host = '127.0.0.1:3306'; // ou l'adresse IP de ton serveur
    $db = 'uaadyzhm_contact'; // à remplacer par le nom de ta base
    $user = 'uaadyzhm'; // à remplacer par ton identifiant phpMyAdmin
    $pass = 'QDG7kaPnJqpT6h'; // à remplacer par ton mot de passe
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";

    try {
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ]);
    } catch (PDOException $e) {
        echo "Erreur de connexion à la base de données : " . $e->getMessage();
        exit();
    }
?>