            <div class="ranking">
    <div class="tabela">
    
        <div class="linha header">
          
        <div class="coluna">
            #
          </div>
            
        <div class="coluna">
            Nome
        </div>
        <div class="coluna">
            Tempo
        </div>
        
        </div>
 <?php
        

            $sql_date = "SELECT * FROM ranking ORDER BY tempo_partida ASC LIMIT 5";
            $sql_date = $pdo->query($sql_date);
            $sql_date_dados = $sql_date->fetchAll(PDO::FETCH_ASSOC);
            $i = 0;
            foreach($sql_date_dados as $dados){

                extract($dados);
                $i++;
?>       
    <div class="linha">
      <div class="coluna">
        <?php echo $i; ?>
      </div>
        <div class="coluna">
            <?php echo $nome_jogador; ?>
        </div>
      <div class="coluna">
        <?php echo $tempo_partida; ?>
      </div>
        
    </div>
    <?php
        }
    ?>
        
        </div>
        </div>