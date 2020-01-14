"use strict"
/*---------------------------------------------------------------------------------------------------------
Mantenedor     : Rodrigo Dittmar / rodrigo.dittmar@gmail.com
Linguaguem     : javascript (2.1)
Dependencia    : fx.js dom.js events.js
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Modulo         : Definicao da classe Ajax
---------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------
TcAjax              : Classe de acesso aos dados no formato ajax/json
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
url                 :string               : Localizacao da API Ajax
metodo              :string               : Tipo de envio dos dados POST/GET
mode                :char                 : Tipo de Retorno (X XML / J JSON / T texto)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
function TcAjax( url , metodo , mode ) {
  this.FHeader = new Array();                  //Armazena o Header da consulta
  this.FParam  = new Array();                  //Armazena os parametros
  this.FURL    = (url) ? url : 'ajax.php';
  this.FMetodo = (metodo) ? metodo : 'POST';   //Metodo (POST / GET)
  this.FMode   = (mode) ? mode : 'X';          //Modo (X XML / J JSON / T texto)
  this.FProcess= false;                        //Funcao de processamento do Ajax
  this.FError  = false;                        //Funcao de processamento do Erro

  this.debug   = false;                        // função DEBUG
}
/*---------------------------------------------------------------------------------------------------------
connect             : Cria um objeto XMLHttpRequest
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcAjax.prototype.connect = function() {

  if( this.debug ) this.debug();   // Debug

  try { return new XMLHttpRequest( ); } catch(e) {}                    // Mozilla
  try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}     // IE Recente
  try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}  // IE Antiga
  return null;
};
/*---------------------------------------------------------------------------------------------------------
addHeader           : Insere um registro no Header
delHeader           : Exclui um registro no Header
clearHeader         : Limpa a Variavel Header
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
h                   :string               : Header - Nome
v                   :variant              : Header - Valor
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcAjax.prototype.addHeader = function(h,v) { if( this.debug ) this.debug(); this.FHeader[h] = v; };
TcAjax.prototype.delHeader = function(h) { if( this.debug ) this.debug(); delete(this.FHeader[h]); };
TcAjax.prototype.clearHeader = function() { if( this.debug ) this.debug(); this.FHeader = new Array };
/*---------------------------------------------------------------------------------------------------------
addParam            : Insere um registro do Parametro
delParam            : Exclui um registro do Parametro
clearParam          : Limpa a Variavel Parametro
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
h                   :string               : Header - Nome
v                   :variant              : Header - Valor
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcAjax.prototype.addParam = function(h,v) { if( this.debug ) this.debug(); this.FParam.push( h +'='+ v ); };
TcAjax.prototype.clearParam = function() {if( this.debug ) this.debug();  this.FParam = new Array };
/*---------------------------------------------------------------------------------------------------------
error               : Processa o retorno quando houver erro
                      ReadyState => 0 = n�o inicializado
                                    1 = carregando
                                    2 = carregado
                                    3 = modo interativo
                                    4 = completado
                      status     => verifique http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcAjax.prototype.error = function () {
  var readyState = this.FRequest.readyState;
  var status     = this.FRequest.status;

  if( this.debug ) this.debug();

  if( !this.FError ) {
    switch( status ) {
      case 0  : createText( "Erro desconhecido de javascript." , 'error' ); break;
      case 400: createText( "400: Solicita��o incompreens�vel." , 'error' ); break;
      case 403:
      case 404: createText( "404: N�o foi encontrada a URL solicitada." , 'error' ); break;
      case 405: createText( "405: O servidor n�o suporta o m�todo solicitado." , 'error' ); break;
      case 500: createText( "500: Erro desconhecido de natureza do servidor." , 'error' ); break;
      case 503: createText( "503: Capacidade m�xima do servidor alcan�ada." , 'error' ); break;
      default: createText( status + ": Erro n�o catalogado, Por favor verifique com o suporte.", 'error' ); break;
    }
    return( true );
  } else {
    if( isString(this.FError) ) eval( this.FError ); else this.FError( readyState , status );
  }
};
/*---------------------------------------------------------------------------------------------------------
open                : Instancia a classe HttpRequest executando as funcoes de chamada
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcAjax.prototype.open = function() {
  this.FRequest = this.connect();

  if( this.debug ) this.debug(); 

  var obj = this;
  //------------------------------------------------
  //Requisitando e processando o retorno
  this.FRequest.onreadystatechange = function() {
    if( obj.FRequest.readyState==4 ) {
      if( obj.FRequest.status>=200 && obj.FRequest.status<300) {
        obj.FProcess( (obj.FMode=='X') ? obj.FRequest.responseXML : obj.FRequest.responseText );
      } else {
        obj.error();
      }
    } };
  //------------------------------------------------
  //Conectando ao Host
  this.FRequest.open( this.FMetodo , this.FURL , true );
  if( this.FMetodo == 'POST' )
    this.FRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  for(var h in this.Header)
    this.FRequest.setRequestHeader( h , this.Header[h] );
  this.FRequest.send( this.FParam.join('&') );
};
