
$(document).ready(function(){
    MontarTabuleiro();
    peca();
    start();
});
var vencedor = new Array();
var pontos = new Array();

/**CRONOMETRO**/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var status = 0;
    var time = 0;
    
    
    
    function start(){
        status = 1;
        timer();
    }
    
    function stop(){
        status = 0;
    }

    function timer(){
        if(status == 1){
            setTimeout(function(){
                time++;
                //formula para converter para minutos
                var min = Math.floor(time/100/60);
                //formula para converter para segundos
                var sec = Math.floor(time/100);
                //formula para converter para msegundos
                var mSec = time % 100;
                
                if(min < 10){
                    min = "0" + min;
                }
                
                if(sec >= 60){
                    sec = sec % 60;
                }
                
                if(sec < 10){
                    sec = "0" + sec;
                }
                
                document.getElementById("tempo-partida").innerHTML = min + ":" + sec + ":" + mSec;
                timer();
            }, 10);
        }
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function MontarTabuleiro(){
	for (var i = 0; i < 8; i++){ //GERADOR DE LINHAS
		$("#tabuleiro").append("<div id='linha_"+i+"' class='linha' >"); // CRIAÇÃO DAS LINHAS

		for (var j = 0; j < 8; j++){ //GERADOR DE COLUNAS
			
            var nome_casa ="casa_"+i+"_"+j; //CASA_LINHA['1']_COLUNA['2']
			
            if(i % 2 == 0){ // SE A LINHA FOR PAR = BRANCA
                if(j % 2 == 0){
                    var classe = "casa_branca";
                }else{
                    var classe = "casa_preta"; // SE NAO = PRETA
                }
            }else if(j % 2 != 0){ // SE A COLUNA FOR IMPAR = BRANCA
                var classe = "casa_branca";
            }else{
                var classe = "casa_preta"; // SE NAO = PRETA
            }
            
            $("#linha_"+i).append("<div id='"+nome_casa+"' class='casa "+classe+"' />");
            //DENTRO DA DIV LINHA ADICIONA 8 BLOCOS(colunas)
            
			if(classe == "casa_preta"){ // VERIFICA SE É UM BLOCO PRETO
				if(i < 3){ //VERIFICA SE A LINHA É MENOR QUE 3 PARA PODER COLOCAR A DIV DAS PECAS
					$("#"+nome_casa).append("<div class='peca black' id='"+nome_casa.replace("casa", "peca_preta")+"'/>");
				}
				else{
                    if(i > 4){  //VERIFICA SE A LINHA É MAIOR QUE 4 PARA PODER COLOCAR A DIV DAS PECAS
                        $("#"+nome_casa).append("<div class='peca white' id='"+nome_casa.replace("casa", "peca_branca")+"'/>");	
                    }
                }

			}
		}
	}
}







//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TODAS AS REGRAS FUNCIONAIS DO JOGO ESTÃO AQUI, COMO POR EXEMPLO A MOVIMENTAÇÃO DAS PEÇAS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function peca(){
    
var casa_selecionada = null;
var peca_selecionada = null;
var pontos_pretas = 0;
var pontos_brancas = 0;
var vezJogador = 'branco';
var tempoJogador = null;
var nomeJogador = null;

    
    
    $(".casa").click(function(){

        //colunas
        var cordAnteriorX;
        //linhas
        var cordAnteriorY;
        
        var cordAtualX;
        var cordAtualY;
        
        var cordDifX;
        var cordDifY;
        
        var casa_anterior, peca_anterior;

    if(peca_selecionada != null){
        //////////////////////////////////////////////////////////
        //DETALHES DAS VARIAVEIS ABAIXO//////////////////////////
        
            //RESGATA A linha E O local ATUAL da peça
            /*cordAnteriorX;

            //RESGATA A coluna E O local ATUAL da peça
            cordAnteriorY;

            //RESGATA A linha E O LOCAL A SER COLOCADO A PEÇA
            cordAtualX;

            //RESGATA A coluna E O LOCAL A SER COLOCADO A PEÇA
            cordAtualY;
            */
        //////////////////////////////////////////////////////////

        cordAnteriorX = parseInt(casa_selecionada.substr(5, 1)); // LINHA
		cordAnteriorY = parseInt(casa_selecionada.substr(7, 1)); // COLUNA
		cordAtualX = parseInt($(this).attr("id").substr(5, 1)); // LINHA
		cordAtualY = parseInt($(this).attr("id").substr(7, 1)); // COLUNA

        if((cordAnteriorX - cordAtualX) < 0){
            //DIF linha PECA PRETA
            cordDifX = parseInt((cordAnteriorX - cordAtualX)*(-1));
        }else{
            //DIF linha PECA BRANCA
            cordDifX = parseInt((cordAnteriorX - cordAtualX));
        }
        
        if((cordAnteriorY - cordAtualY) < 0){
            //DIF coluna PECA PRETA
            cordDifY = parseInt((cordAnteriorY - cordAtualY)*(-1));
        }else{
            //DIF coluna PECA PRETA
            cordDifY = parseInt(cordAnteriorY - cordAtualY);
        }

    }
/**********************************************************************/
                               
        $("#"+casa_selecionada).removeClass("casa_selecionada");
        
        casa_anterior       = casa_selecionada;
        
        peca_anterior       = peca_selecionada;
        casa_selecionada    = $(this).attr("id");
        $("#"+casa_selecionada).addClass("casa_selecionada");
        peca_selecionada = $("#"+casa_selecionada).children("div:first").attr("id");

        if(peca_selecionada == null && peca_anterior.indexOf("branca") >= 0 && vezJogador == 'branco'){
            //verificação para ver se a casa escolhida tem uma peça para mover, ou seja, se a casa escolhida possui uma peça para ser jogada
            if(peca_anterior != null){

                ///DAMA
                //#region MOVIMENTACAO DAMA BRANCA
                //
                //LOGICA PARA VIRAR DAMA(PEAO BRANCO)
                if(peca_anterior.indexOf("branca") >= 0 
                   &&       ((casa_anterior.substr(5, 1) == 1) 
                   ||       (casa_anterior.substr(5, 1) == 2)) 
                   && 
                            ($(this).attr("id").substr(5, 1) == 0)){
                    
                    if((cordDifX == 1) && (cordDifY == 1) && ((casa_selecionada.substr(7, 1) % 2) != 0)){
                        $("#"+peca_anterior).addClass('king-branco');
                   //VERIFICACAO ACIMA FEITA PARA O PEAO BRANCO VIRAR UMA DAMA
                        
                        
                        
                        
                    //VERIFICANDO SE HÁ UMA PECA ENTRE O PEAO BRANCO    
                    }else if((cordDifX == 2) && (cordDifY == 2)){
                        if((peca_anterior.indexOf("branca") >= 0))	{
						var casa_meio = null, peca_meio = null;
                            
						if(cordAtualY < cordAnteriorY){
							//comer para a diagonal esquerda
                            casa_meio = "#casa_"+(cordAtualX+1).toString()+"_"+(cordAtualY+1).toString();				
						}else{
							casa_meio = "#casa_"+(cordAtualX+1).toString()+"_"+(cordAtualY-1).toString();
						}
						if($(casa_meio).children().size()>0){
						  peca_meio = $(casa_meio).children("div");  
                        }
                        if((peca_meio != null) && (peca_meio.attr("id").indexOf("preta") > 0)){
                            $("#"+peca_anterior).addClass('king-branco');
                        }
                    }
                
                    }
                }

                
                
                                                                                    //validacao para realizar movimentação
                                                                                    //a movimentacao ja é definida na estrutura condicional
                                                                                    /*
                                                                                    ** a primeira verificação é para saber se a peça branca está comendo para a frente.
                                                                                    ** a segunda verificação é para validar a movimentação da peça comer para tras quando virar dama.
                                                                                    */                
                if(((peca_anterior.indexOf("branca") >= 0) && (cordAtualX < cordAnteriorX)) || ($("#"+peca_anterior).attr('class').indexOf("king-branco") >= 0) && (cordAtualX > cordAnteriorX)){
                    var obj = $("#"+peca_anterior);
                    
                    if((cordDifX == 1) && (cordDifY == 1)){
                        if(!($("#"+casa_anterior).children("div").attr("class").indexOf("para") >= 0)){
                            $("#"+casa_anterior).remove("#"+peca_anterior);
                            $("#"+casa_selecionada).append(obj);
                            vezJogador = 'preto';
                        }else{
                            $("#"+casa_anterior).children("div").attr("class").off();
                        }
                                                                                                        //DAMA BRANCA PODE COMER PARA TRAS
                    }else if((cordDifX == 2) && (cordDifY == 2) && $("#"+peca_anterior).attr('class').indexOf("king-branco") >= 0 && (cordAtualX > cordAnteriorX)){
                        
                    if((peca_anterior.indexOf("branca") >= 0)){
						      var casa_meio = null, peca_meio = null;
                            
                        if(cordAtualY < cordAnteriorY){
                                casa_meio = "#casa_"+(cordAtualX-1).toString()+"_"+(cordAtualY+1).toString();								
                            }else{
                                casa_meio = "#casa_"+(cordAtualX-1).toString()+"_"+(cordAtualY-1).toString();
                            }
                            if($(casa_meio).children().size()>0){ //SE TIVER UMA PECA NO MEIO
                              peca_meio = $(casa_meio).children("div");
                            }
                                if((peca_meio != null) && (peca_meio.attr("id").indexOf("preta") > 0)){
                                    if(!($("#"+casa_anterior).children("div").attr("class").indexOf("para") >= 0)){
                                        peca_meio.remove();
                                        $("#"+casa_anterior).remove("#"+peca_anterior);
                                        $("#"+casa_selecionada).append(obj);
                                        pontos_brancas++;
                                        $("#"+peca_anterior).removeClass("sequencia");
                                    }else{
                                        $("#"+casa_anterior).children("div").attr("class").off();
                                    }
//DAMAAAAAAAAAAA BRANCA 
                                var diagonal           =  null;
                                var peca_meio_diagonal =  null;
                                
                                if(cordAtualY < cordAnteriorY){
                                //comer para a diagonal esquerda
                                    diagonal           =  "#casa_"+(cordAtualX+2)+"_"+(cordAtualY-2);
                                    peca_meio_diagonal =  "#casa_"+(cordAtualX+1)+"_"+(cordAtualY-1);
                                    
                                    diagonal_direita           =  "#casa_"+(cordAtualX+2)+"_"+(cordAtualY+2);
                                    peca_meio_diagonal_direita =  "#casa_"+(cordAtualX+1)+"_"+(cordAtualY+1);
                                    
                                    diagonal_cima           =  "#casa_"+(cordAtualX-2)+"_"+(cordAtualY-2);
                                    peca_meio_diagonal_cima =  "#casa_"+(cordAtualX-1)+"_"+(cordAtualY-1);
                                    
                                    
                                    if($(peca_meio_diagonal).children("div").attr("id") != null && $(diagonal).children("div").attr("id") == null && ((cordAtualX+2) < 8 && (cordAtualY-2) > -1)){
                                       
                                        if($(peca_meio_diagonal).children("div").attr("id").indexOf("branca") > 0){
                                            $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 5 && i <= 7){
                                                            if(($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_branca_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                            vezJogador = 'preto';
                                        }else{
                                            $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 5 && i <= 7){
                                                        if(!($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_branca_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'branco';
                                        
                                        }
                                    }else if($(peca_meio_diagonal_direita).children("div").attr("id") != null && $(diagonal_direita).children("div").attr("id") == null && ((cordAtualX+2) < 8 && (cordAtualY+2) < 8)){
                                        
                                        if($(peca_meio_diagonal_direita).children("div").attr("id").indexOf("branca") > 0){
                                            $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 5 && i <= 7){
                                                            if(($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_branca_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                            vezJogador = 'preto';
                                        }else{
                                        
                                            $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 5 && i <= 7){
                                                        if(!($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_branca_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'branco';
                                        
                                        }
                                    }else if($(peca_meio_diagonal_cima).children("div").attr("id") != null && $(diagonal_cima).children("div").attr("id") == null && ((cordAtualX-2) > -1 && (cordAtualY-2) > -1)){
                                        
                                        if($(peca_meio_diagonal_cima).children("div").attr("id").indexOf("branca") > 0){
                                            $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 5 && i <= 7){
                                                            if(($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_branca_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                            vezJogador = 'preto';
                                        }else{
                                        
                                            $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 5 && i <= 7){
                                                        if(!($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_branca_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'branco';
                                        
                                        }
                                    }else{
                                        $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 5 && i <= 7){
                                                            if(($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_branca_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                        vezJogador = 'preto';
                                    }
                                    
                                }else{
                                    diagonal           =  "#casa_"+(cordAtualX+2)+"_"+(cordAtualY+2);
                                    peca_meio_diagonal =  "#casa_"+(cordAtualX+1)+"_"+(cordAtualY+1);
                                    
                                    diagonal_esquerda           =  "#casa_"+(cordAtualX+2)+"_"+(cordAtualY-2);
                                    peca_meio_diagonal_esquerda =  "#casa_"+(cordAtualX+1)+"_"+(cordAtualY-1);
                                    
                                    diagonal_cima           =  "#casa_"+(cordAtualX-2)+"_"+(cordAtualY+2);
                                    peca_meio_diagonal_cima =  "#casa_"+(cordAtualX-1)+"_"+(cordAtualY+1);
                                    
                                    if($(peca_meio_diagonal).children("div").attr("id") != null && $(diagonal).children("div").attr("id") == null && ((cordAtualX+2) < 8 && (cordAtualY+2) < 8)){
                                        
                                        if($(peca_meio_diagonal).children("div").attr("id").indexOf("branca") > 0){
                                            $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 5 && i <= 7){
                                                            if(($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_branca_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                            vezJogador = 'preto';
                                        }else{
                                        
                                            $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 5 && i <= 7){
                                                        if(!($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_branca_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'branco';
                                        
                                        }
                                    }else if($(peca_meio_diagonal_esquerda).children("div").attr("id") != null && $(diagonal_esquerda).children("div").attr("id") == null && ((cordAtualX+2) < 8 && (cordAtualY-2) > -1)){
                                        
                                        if($(peca_meio_diagonal_esquerda).children("div").attr("id").indexOf("branca") > 0){
                                            $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 5 && i <= 7){
                                                            if(($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_branca_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                            vezJogador = 'preto';
                                        }else{
                                        
                                            $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 5 && i <= 7){
                                                        if(!($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_branca_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'branco';
                                        
                                        }
                                    }else if($(peca_meio_diagonal_cima).children("div").attr("id") != null && $(diagonal_cima).children("div").attr("id") == null && ((cordAtualX-2) > -1 && (cordAtualY+2) < 8)){
                                        
                                        if($(peca_meio_diagonal_cima).children("div").attr("id").indexOf("branca") > 0){
                                            $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 5 && i <= 7){
                                                            if(($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_branca_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                            vezJogador = 'preto';
                                        }else{
                                        
                                            $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 5 && i <= 7){
                                                        if(!($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_branca_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'branco';
                                        
                                        }
                                    }else{
                                        $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 5 && i <= 7){
                                                            if(($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_branca_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                        vezJogador = 'preto';
                                    }
                                }
                            }
                    }
                    
                        
                    }
                //#endregion
                    
                    //#region CAPTURA DE PECA PEAO BRANCO
                    //
                    else if((cordDifX == 2) && (cordDifY == 2)){ //PEAO BRANCO PODE COMER APENAS PARA FRENTE
                        
                        if((peca_anterior.indexOf("branca") >= 0)){
                            var casa_meio = null, peca_meio = null;

                            if(cordAtualY < cordAnteriorY){
                                //comer para a diagonal esquerda
                                casa_meio = "#casa_"+(cordAtualX+1).toString()+"_"+(cordAtualY+1).toString();
                            }else{
                                casa_meio = "#casa_"+(cordAtualX+1).toString()+"_"+(cordAtualY-1).toString();
                            }

                            if($(casa_meio).children().size()>0){
                              peca_meio = $(casa_meio).children("div");
                            }
                            
                            
                            //VERIFICAR SE TEM UMA PECA NO MEIO
                            //SE TIVER UMA PECA NO MEIO VERIFICAR SE A PROXIMA CASA ESTA VAZIA
                            if((peca_meio != null) && (peca_meio.attr("id").indexOf("preta") > 0)){
                                
                                if(!($("#"+casa_anterior).children("div").attr("class").indexOf("para") >= 0)){
                                    
                                        peca_meio.remove();
                                        $("#"+casa_anterior).remove("#"+peca_anterior);
                                        $("#"+casa_selecionada).append(obj);
                                        pontos_brancas++;
                                        $("#"+peca_anterior).removeClass("sequencia");
                                    }else{
                                        $("#"+casa_anterior).children("div").attr("class").off();
                                    }

                                var diagonal           =  null;
                                var peca_meio_diagonal =  null;
                                
                                
                                if(cordAtualY < cordAnteriorY){
                                    diagonal           =  "#casa_"+(cordAtualX-2)+"_"+(cordAtualY-2);
                                    peca_meio_diagonal =  "#casa_"+(cordAtualX-1)+"_"+(cordAtualY-1);
                                    
                                    var verifica_diagonal_oposta = "#casa_"+(cordAtualX-2)+"_"+(cordAtualY-2);
                                    var verifica_peca_meio_diagonal_oposta = "#casa_"+(cordAtualX-1)+"_"+(cordAtualY-1);
                                    
                                    var verifica_diagonal_oposta_1 = "#casa_"+(cordAtualX+2)+"_"+(cordAtualY-2);
                                    var verifica_peca_meio_diagonal_oposta_1 = "#casa_"+(cordAtualX+1)+"_"+(cordAtualY-1);
                                    
                                    var verifica_diagonal_oposta_1_dir = "#casa_"+(cordAtualX-2)+"_"+(cordAtualY+2);
                                    var verifica_peca_meio_diagonal_oposta_1_dir = "#casa_"+(cordAtualX-1)+"_"+(cordAtualY+1);
                                        
                                    if($(diagonal).children("div").attr("id") == null && $(peca_meio_diagonal).children("div").attr("id") != null &&  $(peca_meio_diagonal).children("div").attr("id").indexOf("branca") < 0 && ((cordAtualX-2) > -1 && (cordAtualY-2) > -1)){
                                            $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 5 && i <= 7){
                                                        if(!($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_branca_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'branco';

                                    }else if($("#"+peca_anterior).hasClass("king-branco") && $(verifica_peca_meio_diagonal_oposta_1).children("div").attr("id") != null && $(verifica_peca_meio_diagonal_oposta_1).children("div").attr("id").indexOf("branca") < 0 && $(verifica_diagonal_oposta_1).children("div").attr("id") == null && ((cordAtualX+2) < 8 && (cordAtualY-2) > -1)){
                                        $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 5 && i <= 7){
                                                        if(!($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_branca_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'branco';
                                    }else if($(verifica_peca_meio_diagonal_oposta).children("div").attr("id") != null && $(verifica_peca_meio_diagonal_oposta).children("div").attr("id").indexOf("branca") < 0 && $(verifica_diagonal_oposta).children("div").attr("id") == null && ((cordAtualX-2) > -1 && (cordAtualY-2) > -1)){
                                        $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 5 && i <= 7){
                                                        if(!($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_branca_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'branco';
                                    }else if($(verifica_peca_meio_diagonal_oposta_1_dir).children("div").attr("id") != null && $(verifica_peca_meio_diagonal_oposta_1_dir).children("div").attr("id").indexOf("branca") < 0 && $(verifica_diagonal_oposta_1_dir).children("div").attr("id") == null && ((cordAtualX-2) > -1 && (cordAtualY+2) < 8)){
                                        $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 5 && i <= 7){
                                                        if(!($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_branca_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'branco';
                                    }else{
                                            $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 5 && i <= 7){
                                                            if(($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_branca_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                                    vezJogador = 'preto';
                                    }
                                        

                                }else{
                                    diagonal           =  "#casa_"+(cordAtualX-2)+"_"+(cordAtualY+2);
                                    peca_meio_diagonal =  "#casa_"+(cordAtualX-1)+"_"+(cordAtualY+1);
                                    
                                    var verifica_diagonal_oposta = "#casa_"+(cordAtualX-2)+"_"+(cordAtualY+2);
                                    var verifica_peca_meio_diagonal_oposta = "#casa_"+(cordAtualX-1)+"_"+(cordAtualY+1);
                                    
                                    var verifica_diagonal_oposta_1 = "#casa_"+(cordAtualX+2)+"_"+(cordAtualY+2);
                                    var verifica_peca_meio_diagonal_oposta_1 = "#casa_"+(cordAtualX+1)+"_"+(cordAtualY+1);
                                    
                                    var verifica_diagonal_oposta_1_esq = "#casa_"+(cordAtualX-2)+"_"+(cordAtualY-2);
                                    var verifica_peca_meio_diagonal_oposta_1_esq = "#casa_"+(cordAtualX-1)+"_"+(cordAtualY-1);
                                    
                                    if($(diagonal).children("div").attr("id") == null && ((cordAtualX-2) > -1 && (cordAtualY+2) < 8) && $(peca_meio_diagonal).children("div").attr("id") != null &&  $(peca_meio_diagonal).children("div").attr("id").indexOf("branca") < 0){
                                            $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 5 && i <= 7){
                                                        if(!($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_branca_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'branco';

                                    }else if($("#"+peca_anterior).hasClass("king-branco") && $(verifica_peca_meio_diagonal_oposta_1).children("div").attr("id") != null && $(verifica_peca_meio_diagonal_oposta_1).children("div").attr("id").indexOf("branca") < 0 && $(verifica_diagonal_oposta_1).children("div").attr("id") == null && ((cordAtualX+2) < 8 && (cordAtualY+2) < 8)){
                                        $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 5 && i <= 7){
                                                        if(!($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_branca_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'branco';
                                    }else if($(verifica_peca_meio_diagonal_oposta).children("div").attr("id") != null && $(verifica_peca_meio_diagonal_oposta).children("div").attr("id").indexOf("branca") < 0 && $(verifica_diagonal_oposta).children("div").attr("id") == null && ((cordAtualX-2) > -1 && (cordAtualY+2) < 8)){
                                        $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 5 && i <= 7){
                                                        if(!($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_branca_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'branco';
                                    }else if($(verifica_peca_meio_diagonal_oposta_1_esq).children("div").attr("id") != null && $(verifica_peca_meio_diagonal_oposta_1_esq).children("div").attr("id").indexOf("branca") < 0 && $(verifica_diagonal_oposta_1_esq).children("div").attr("id") == null && ((cordAtualX-2) > -1 && (cordAtualY-2) > -1)){
                                        $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 5 && i <= 7){
                                                        if(!($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_branca_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'branco';
                                    }else{
                                            $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 5 && i <= 7){
                                                            if(($("#peca_branca_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_branca_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                                    vezJogador = 'preto';
                                    }
                                    
                                }
                                
                                
                            }
                            
                       }else{
                           vezJogador = 'preto';
                       }    
                  }
                    
                }
            }
         //#endregion   
            //#region VEZ JOGADOR PRETO
            //
                                                                //validacao para saber se a vez é do preto
            // && vezJogador == 'preto'
        }else if(peca_selecionada == null && peca_anterior.indexOf("preta") >= 0 && vezJogador == 'preto'){
            //$("#info_peca_selecionada").text("NENHUMA PEÇA SELECIONADA");
            
            //verificando se a casa que eu escolhi tem uma peca para mover
            if(peca_anterior != null){

                ///DAMA
                //#region MOVIMENTACAO DAMA PRETA
                //
                //LOGICA PARA VIRAR DAMA(PEAO PRETO)
                if(peca_anterior.indexOf("preta") >= 0 
                   &&   ((casa_anterior.substr(5, 1) == 6) 
                   ||   (casa_anterior.substr(5, 1) == 5)) 
                   && 
                        ($(this).attr("id").substr(5, 1) == 7)){
                    
                    if((cordDifX == 1) && (cordDifY == 1) && ((casa_selecionada.substr(7, 1) % 2) == 0)){
                        $("#"+peca_anterior).addClass('king-preto');
                        
                        
                        
                    //VERIFICACAO ACIMA FEITA PARA O PEAO PRETO VIRAR UMA DAMA    
                    
                        
                    //VERIFICANDO SE HÁ UMA PECA ENTRE O PEAO PRETO
                        //verificacao abaixo 
                    }else if((cordDifX == 2) && (cordDifY == 2)){
                        if((peca_anterior.indexOf("preta") >= 0))	{
                            var casa_meio = null, peca_meio = null;
                            if(cordAtualY < cordAnteriorY){
                                casa_meio = "#casa_"+(cordAtualX-1).toString()+"_"+(cordAtualY+1).toString();								
                            }else{
                                casa_meio = "#casa_"+(cordAtualX-1).toString()+"_"+(cordAtualY-1).toString();
                            }
                            if($(casa_meio).children().size() > 0){
                                peca_meio = $(casa_meio).children("div");
                            }
                            if((peca_meio != null) && (peca_meio.attr("id").indexOf("branca") > 0)){
                                $("#"+peca_anterior).addClass('king-preto');
                            }
                        }
                    }
                    
                }
                //#endregion
                
                //#region CAPTURA DE PECA DAMA PRETA
                //validacao para realizar movimentação
                //a movimentacao ja é definida na estrutura condicional
                /*
                ** a primeira verificação é para saber se a peça preta está comendo para a frente.
                ** a segunda verificação é para validar a movimentação da peça comer para tras quando virar dama.
                */
                if(((peca_anterior.indexOf("preta") >= 0) && (cordAtualX > cordAnteriorX)) || ($("#"+peca_anterior).attr('class').indexOf("king-preto") >= 0) && (cordAtualX < cordAnteriorX)){
   
                    var obj = $("#"+peca_anterior);
                    
                    if((cordDifX == 1) && (cordDifY == 1)){
                        if(!($("#"+casa_anterior).children("div").attr("class").indexOf("para") >= 0)){
                        $("#"+casa_anterior).remove("#"+peca_anterior);
                        $("#"+casa_selecionada).append(obj);
                    //DAMA PODE COMER PARA TRAS
                            
                            vezJogador = 'branco';
                        }
                    }
                    if((cordDifX == 2) && (cordDifY == 2) && ($("#"+peca_anterior).attr('class').indexOf("king-preto") >= 0) && (cordAtualX < cordAnteriorX)){
                        if((peca_anterior.indexOf("preta") >= 0)){
						var casa_meio = null, peca_meio = null;
                            
						if(cordAtualY < cordAnteriorY){
							//comer para a diagonal esquerda
                            casa_meio = "#casa_"+(cordAtualX+1).toString()+"_"+(cordAtualY+1).toString();				
						}else{
							casa_meio = "#casa_"+(cordAtualX+1).toString()+"_"+(cordAtualY-1).toString();
						}
						if($(casa_meio).children().size()>0){
						  peca_meio = $(casa_meio).children("div");  
                        }
						if((peca_meio != null) && (peca_meio.attr("id").indexOf("branca") > 0)){								
							
                                if(!($("#"+casa_anterior).children("div").attr("class").indexOf("para") >= 0)){
                                    
                                    peca_meio.remove();
                                    $("#"+casa_anterior).remove("#"+peca_anterior);
                                    $("#"+casa_selecionada).append(obj);
                                    pontos_pretas++;

                                }else{
                                    $("#"+casa_anterior).children("div").attr("class").off();
                                }
                            
                            
                            
                            
                            
                                var diagonal           =  null;
                                var peca_meio_diagonal =  null;
                                
                                if(cordAtualY < cordAnteriorY){
                                    //comer para a diagonal esquerda
                                    diagonal           =  "#casa_"+(cordAtualX-2)+"_"+(cordAtualY-2);
                                    peca_meio_diagonal =  "#casa_"+(cordAtualX-1)+"_"+(cordAtualY-1);
                                    
                                    diagonal_direita           =  "#casa_"+(cordAtualX-2)+"_"+(cordAtualY+2);
                                    peca_meio_diagonal_direita =  "#casa_"+(cordAtualX-1)+"_"+(cordAtualY+1);
                                    
                                    diagonal_cima           =  "#casa_"+(cordAtualX+2)+"_"+(cordAtualY-2);
                                    peca_meio_diagonal_cima =  "#casa_"+(cordAtualX+1)+"_"+(cordAtualY-1);
                                    
                                    
                                    if($(peca_meio_diagonal).children("div").attr("id") != null && $(diagonal).children("div").attr("id") == null && ((cordAtualX-2) > -1 && (cordAtualY-2) > -1)){
                                       
                                        if($(peca_meio_diagonal).children("div").attr("id").indexOf("preta") > 0){
                                            $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 0 && i <= 3){
                                                            if(($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_preta_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                            vezJogador = 'branco';
                                        }else{
                                            $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 0 && i <= 3){
                                                        if(!($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_preta_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'preto';
                                        
                                        }
                                    }else if($(peca_meio_diagonal_direita).children("div").attr("id") != null && $(diagonal_direita).children("div").attr("id") == null && ((cordAtualX-2) > -1 && (cordAtualY+2) < 8)){
                                        
                                        if($(peca_meio_diagonal_direita).children("div").attr("id").indexOf("preta") > 0){
                                            $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 0 && i <= 3){
                                                            if(($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_preta_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                            vezJogador = 'branco';
                                        }else{
                                        
                                            $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 0 && i <= 3){
                                                        if(!($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_preta_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'preto';
                                        
                                        }
                                    }else if($(peca_meio_diagonal_cima).children("div").attr("id") != null && $(diagonal_cima).children("div").attr("id") == null && ((cordAtualX+2) < 8 && (cordAtualY-2) > -1)){
                                        
                                        if($(peca_meio_diagonal_cima).children("div").attr("id").indexOf("preta") > 0){
                                            $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 0 && i <= 3){
                                                            if(($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_preta_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                            vezJogador = 'branco';
                                        }else{
                                        
                                            $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 0 && i <= 3){
                                                        if(!($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_preta_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'preto';
                                        
                                        }
                                    }else{
                                        $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 0 && i <= 3){
                                                            if(($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_preta_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                        vezJogador = 'branco';
                                    }
                                    
                                }else{
                                    diagonal           =  "#casa_"+(cordAtualX-2)+"_"+(cordAtualY+2);
                                    peca_meio_diagonal =  "#casa_"+(cordAtualX-1)+"_"+(cordAtualY+1);
                                    
                                    diagonal_esquerda           =  "#casa_"+(cordAtualX-2)+"_"+(cordAtualY-2);
                                    peca_meio_diagonal_esquerda =  "#casa_"+(cordAtualX-1)+"_"+(cordAtualY-1);
                                    
                                    diagonal_cima           =  "#casa_"+(cordAtualX+2)+"_"+(cordAtualY+2);
                                    peca_meio_diagonal_cima =  "#casa_"+(cordAtualX+1)+"_"+(cordAtualY+1);
                                    
                                    if($(peca_meio_diagonal).children("div").attr("id") != null && $(diagonal).children("div").attr("id") == null && ((cordAtualX-2) > -1 && (cordAtualY+2) < 8)){
                                        
                                        if($(peca_meio_diagonal).children("div").attr("id").indexOf("preta") > 0){
                                            $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 0 && i <= 3){
                                                            if(($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_preta_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                            vezJogador = 'branco';
                                        }else{
                                        
                                            $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 0 && i <= 3){
                                                        if(!($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_preta_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'preto';
                                        
                                        }
                                    }else if($(peca_meio_diagonal_esquerda).children("div").attr("id") != null && $(diagonal_esquerda).children("div").attr("id") == null && ((cordAtualX-2) > -1 && (cordAtualY-2) > -1)){
                                        
                                        if($(peca_meio_diagonal_esquerda).children("div").attr("id").indexOf("preta") > 0){
                                            $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 0 && i <= 3){
                                                            if(($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_preta_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                            vezJogador = 'branco';
                                        }else{
                                        
                                            $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 0 && i <= 3){
                                                        if(!($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_preta_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'preto';
                                        
                                        }
                                    }else if($(peca_meio_diagonal_cima).children("div").attr("id") != null && $(diagonal_cima).children("div").attr("id") == null && ((cordAtualX+2) < 8 && (cordAtualY+2) < 8)){
                                        
                                        if($(peca_meio_diagonal_cima).children("div").attr("id").indexOf("preta") > 0){
                                            $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 0 && i <= 3){
                                                            if(($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_preta_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                            vezJogador = 'branco';
                                        }else{
                                        
                                            $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 0 && i <= 3){
                                                        if(!($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_preta_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'preto';
                                        
                                        }
                                    }else{
                                        $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 0 && i <= 3){
                                                            if(($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_preta_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                        vezJogador = 'branco';
                                    }
                                }
                                    
                                 //FIM LOGICA SEQUENCIA   
       
                            }
                                    	
                    }
                    }
                    //#endregion
                
                //#region CAPTURA PECA PEAO PRETO
                    //
                    if((cordDifX == 2) && (cordDifY == 2)){
                        if((peca_anterior.indexOf("preta") >= 0)){
						
                         var casa_meio = null, peca_meio = null;
						
                        if(cordAtualY < cordAnteriorY){
							casa_meio = "#casa_"+(cordAtualX-1).toString()+"_"+(cordAtualY+1).toString();								
						}else{
							casa_meio = "#casa_"+(cordAtualX-1).toString()+"_"+(cordAtualY-1).toString();
						}
						
                         if($(casa_meio).children().size()>0){
						  peca_meio = $(casa_meio).children("div");
                        }
						
                         if((peca_meio != null) && (peca_meio.attr("id").indexOf("branca") > 0)){								
							if(!($("#"+casa_anterior).children("div").attr("class").indexOf("para") >= 0)){

                                peca_meio.remove();
                                $("#"+casa_anterior).remove("#"+peca_anterior);
                                $("#"+casa_selecionada).append(obj);
                                pontos_pretas++; 
                                
                            }else{
                                    $("#"+casa_anterior).children("div").attr("class").off();
                            }
                             
                                var diagonal           =  null;
                                var peca_meio_diagonal =  null;
                                
                                if(cordAtualY < cordAnteriorY){
                                    diagonal           =  "#casa_"+(cordAtualX+2)+"_"+(cordAtualY-2);
                                    peca_meio_diagonal =  "#casa_"+(cordAtualX+1)+"_"+(cordAtualY-1);
                                    
                                    var verifica_diagonal_oposta = "#casa_"+(cordAtualX+2)+"_"+(cordAtualY-2);
                                    var verifica_peca_meio_diagonal_oposta = "#casa_"+(cordAtualX+1)+"_"+(cordAtualY-1);
                                    
                                    var verifica_diagonal_oposta_1 = "#casa_"+(cordAtualX-2)+"_"+(cordAtualY-2);
                                    var verifica_peca_meio_diagonal_oposta_1 = "#casa_"+(cordAtualX-1)+"_"+(cordAtualY-1);
                                    
                                    var verifica_diagonal_oposta_1_dir = "#casa_"+(cordAtualX+2)+"_"+(cordAtualY+2);
                                    var verifica_peca_meio_diagonal_oposta_1_dir = "#casa_"+(cordAtualX+1)+"_"+(cordAtualY+1);
                                        
                                    if($(diagonal).children("div").attr("id") == null && $(peca_meio_diagonal).children("div").attr("id") != null &&  $(peca_meio_diagonal).children("div").attr("id").indexOf("preta") < 0 && ((cordAtualX+2) < 8 && (cordAtualY-2) > -1)){
                                            $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 0 && i <= 3){
                                                        if(!($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_preta_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'preto';

                                    }else if($("#"+peca_anterior).hasClass("king-preto") && $(verifica_peca_meio_diagonal_oposta_1).children("div").attr("id") != null && $(verifica_peca_meio_diagonal_oposta_1).children("div").attr("id").indexOf("preta") < 0 && $(verifica_diagonal_oposta_1).children("div").attr("id") == null && ((cordAtualX-2) > -1 && (cordAtualY-2) > -1)){
                                        $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 0 && i <= 3){
                                                        if(!($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_preta_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'preto';
                                    }else if($(verifica_peca_meio_diagonal_oposta).children("div").attr("id") != null && $(verifica_peca_meio_diagonal_oposta).children("div").attr("id").indexOf("preta") < 0 && $(verifica_diagonal_oposta).children("div").attr("id") == null && ((cordAtualX+2) < 8 && (cordAtualY-2) > -1)){
                                        $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 5 && i <= 7){
                                                        if(!($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_preta_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'preto';
                                    }else if($(verifica_peca_meio_diagonal_oposta_1_dir).children("div").attr("id") != null && $(verifica_peca_meio_diagonal_oposta_1_dir).children("div").attr("id").indexOf("preta") < 0 && $(verifica_diagonal_oposta_1_dir).children("div").attr("id") == null && ((cordAtualX+2) < 8 && (cordAtualY+2) < 8)){
                                        $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 0 && i <= 3){
                                                        if(!($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_preta_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'preto';
                                    }else{
                                            $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 0 && i <= 3){
                                                            if(($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_preta_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                                    vezJogador = 'branco';
                                    }
                                        

                                }else{
                                    diagonal           =  "#casa_"+(cordAtualX+2)+"_"+(cordAtualY+2);
                                    peca_meio_diagonal =  "#casa_"+(cordAtualX+1)+"_"+(cordAtualY+1);
                                    
                                    var verifica_diagonal_oposta = "#casa_"+(cordAtualX+2)+"_"+(cordAtualY+2);
                                    var verifica_peca_meio_diagonal_oposta = "#casa_"+(cordAtualX+1)+"_"+(cordAtualY+1);
                                    
                                    var verifica_diagonal_oposta_1 = "#casa_"+(cordAtualX-2)+"_"+(cordAtualY+2);
                                    var verifica_peca_meio_diagonal_oposta_1 = "#casa_"+(cordAtualX-1)+"_"+(cordAtualY+1);
                                    
                                    var verifica_diagonal_oposta_1_esq = "#casa_"+(cordAtualX+2)+"_"+(cordAtualY-2);
                                    var verifica_peca_meio_diagonal_oposta_1_esq = "#casa_"+(cordAtualX+1)+"_"+(cordAtualY-1);
                                    
                                    if($(diagonal).children("div").attr("id") == null && ((cordAtualX+2) < 8 && (cordAtualY+2) < 8) && $(peca_meio_diagonal).children("div").attr("id") != null &&  $(peca_meio_diagonal).children("div").attr("id").indexOf("preta") < 0){
                                            $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 0 && i <= 3){
                                                        if(!($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_preta_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'preto';

                                    }else if($("#"+peca_anterior).hasClass("king-preto") && $(verifica_peca_meio_diagonal_oposta_1).children("div").attr("id") != null && $(verifica_peca_meio_diagonal_oposta_1).children("div").attr("id").indexOf("preta") < 0 && $(verifica_diagonal_oposta_1).children("div").attr("id") == null && ((cordAtualX-2) > -1 && (cordAtualY+2) < 8)){
                                        $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 0 && i <= 3){
                                                        if(!($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_preta_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'preto';
                                    }else if($(verifica_peca_meio_diagonal_oposta).children("div").attr("id") != null && $(verifica_peca_meio_diagonal_oposta).children("div").attr("id").indexOf("preta") < 0 && $(verifica_diagonal_oposta).children("div").attr("id") == null && ((cordAtualX+2) < 8 && (cordAtualY+2) < 8)){
                                        $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 0 && i <= 3){
                                                        if(!($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_preta_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'preto';
                                    }else if($(verifica_peca_meio_diagonal_oposta_1_esq).children("div").attr("id") != null && $(verifica_peca_meio_diagonal_oposta_1_esq).children("div").attr("id").indexOf("preta") < 0 && $(verifica_diagonal_oposta_1_esq).children("div").attr("id") == null && ((cordAtualX+2) < 8 && (cordAtualY-2) > -1)){
                                        $("#"+peca_anterior).addClass("sequencia");
                                            for(var i = 0; i < 8; i++){
                                                for(var j = 0; j < 8; j++){
                                                    if(i >= 0 && i <= 3){
                                                        if(!($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == true)){
                                                                    $("#peca_preta_"+i+"_"+j).addClass("para");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            vezJogador = 'preto';
                                    }else{
                                            $("#"+peca_anterior).removeClass("sequencia");
                                            
                                            if($("#"+peca_anterior).hasClass("sequencia") == false){
                                              for(var i = 0; i < 8; i++){
                                                    for(var j = 0; j < 8; j++){
                                                        if(i >= 0 && i <= 3){
                                                            if(($("#peca_preta_"+i+"_"+j).hasClass("sequencia") == false)){
                                                                $("#peca_preta_"+i+"_"+j).removeClass("para");
                                                            }
                                                        }
                                                    }
                                                }  
                                            }
                                            
                                                    vezJogador = 'branco';
                                    }
                                    
                                }
						  }
                    }else{
                        vezJogador = 'branco';
                    }
                        
                    }
                    
                    
                    
                }
                //#endregion
            }
        }
        //#endregion
        
        
        
        
        //#region PONTUACAO
        //
        $("#brancos").html("Peças pretas capturadas: <span>"+pontos_brancas+"</span>");
        $("#pretos").html("Peças brancas capturadas: <span>"+pontos_pretas+"</span>");
        
        pontos['branca'] = pontos_brancas;
        pontos['preta'] = pontos_pretas;

            if(vezJogador == 'preto'){
                nomeJogador = $("#nomeJogador-2").text();
            }else{
                nomeJogador = $("#nomeJogador-1").text();
            }
        
        if(pontos['branca'] == 12){
            stop();
            nomeJogador = $("#nomeJogador-1").text();
            tempoJogador = $("#tempo-partida").text();
            $("#vencedor").html("<strong> <span id='nomeVencedor'>"+nomeJogador+"</span> VENCEU! - OS DADOS SERÃO ENVIADOS EM 3 SEGUNDOS</strong>");
            
            
            window.setTimeout(function() {
                location.href = "envia_dados.php?nome="+$('#nomeVencedor').text()+"&tempo="+tempoJogador;
            }, 3000);
            
            
            
        }else if(pontos['preta'] == 12){
            stop();
            nomeJogador = $("#nomeJogador-2").text();
            tempoJogador = $("#tempo-partida").text();
            $("#vencedor").html("<strong> <span id='nomeVencedor'>"+nomeJogador+"</span> VENCEU! - OS DADOS SERÃO ENVIADOS EM 3 SEGUNDOS</strong>");
            
            
            window.setTimeout(function() {
                location.href = "envia_dados.php?nome="+$('#nomeVencedor').text()+"&tempo="+tempoJogador;
            }, 3000);
            
        }
        //#endregion
        //#region TURNO
        //

            $(".vez").html("É sua vez "+nomeJogador);
    //#endregion
    });
    
}
