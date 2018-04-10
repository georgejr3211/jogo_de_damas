<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <title>DAMAS</title>
        <link href="estilo.css" type="text/css" rel="stylesheet">
        <link href="cadastro.css" type="text/css" rel="stylesheet">
        <link href="ranking.css" type="text/css" rel="stylesheet">
        
    </head>
    
    <body>
        <?php require_once 'banco.php'; ?>
        <!-- TELA DE CADASTRO -->
        <div class="cadastro">
            <form action="index_jogo.php" method="get">
                <label>Informe seu nome: <input type="text" name="nome_1" placeholder="Jogador 1" required></label>
                
                <label>Informe seu nome: <input type="text" name="nome_2" placeholder="Jogador 2"  required></label>
                
                <input type="submit" value="enviar">
            </form>
            
        </div>
        
        <!-- TABELA RANKING -->
        <?php
            require_once 'ranking.php';
        ?>
    </body>
</html>