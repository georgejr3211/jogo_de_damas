<?php
$dados['host'] = 'localhost';
$dados['user'] = 'root';
$dados['pass'] = '123456';
$dados['db'] = 'damas';

        
        try{
            $pdo = new PDO("mysql:dbname=".$dados['db'].";host=".$dados['host'].";", $dados['user'], $dados['pass']);
        }catch(Exception $e){
            echo 'NÃO FOI POSSIVEL REALIZAR A CONEXAO COM O BANCO DE DADOS '.$e;
            exit;
        }