<html>
<head>
    <meta charset="utf-8">
	<link href="estilo.css" type="text/css" rel="stylesheet">
    <link href="ranking.css" type="text/css" rel="stylesheet">
	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="damas.js"></script>

</head>
<body>
    <?php
        require_once 'banco.php';
    ?>
    <div id="container">
        <div id="tabuleiro">
        </div>
        <div class="jogadores">
         <table class="jg">
            <tr>
                <td class="f">JOGADOR 1</td> 
                <td>JOGADOR 2</td> 
            </tr>
             <tr>
                 <?php
                    @$nome[0] = ($_GET['nome_1'] != null)?$_GET['nome_1']:header("Location: index.php");
                    @$nome[1] = ($_GET['nome_2'] != null)?$_GET['nome_2']:header("Location: index.php");
                 ?>
                <td class="f"><strong id="nomeJogador-1"><?php echo @$nome[0]; ?></strong></td> 
                <td><strong id="nomeJogador-2"><?php echo @$nome[1]; ?></strong></td>
            </tr>
             <tr>
                <td class="f">
                    <div id="brancos">
                    Peças pretas capturadas: <span>0</span>
                </div>
                </td> 
                <td>   
                    <div id="pretos">
                        Peças brancas capturadas: <span>0</span>
                    </div>
                 </td> 
            </tr>
        </table>
        </div>
        <div id="tempo-partida">00:00:00</div>
        <div id="vencedor"><strong></strong></div>
            <div id="vez-jogador">
                <p><strong><span class="vez">É sua vez <?php echo $nome[0]; ?></span></strong></p>
            </div>
    </div>
    <?php
        require_once 'ranking.php';
    ?>
</body>
</html>