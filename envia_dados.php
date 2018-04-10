<?php
require_once 'banco.php';
echo $_GET['nome'];
echo "<br>";
echo $_GET['tempo'];
$nome = $_GET['nome'];
$tempo = $_GET['tempo'];
$sql_date = "INSERT INTO ranking (nome_jogador, tempo_partida)
VALUES ('$nome', '$tempo') ";
$sql_date = $pdo->query($sql_date);

header("Location: index.php");