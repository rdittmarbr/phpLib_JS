/*---------------------------------------------------------------------------------------------------------
Mantenedor     : Rodrigo Dittmar
Linguaguem     : javascript (2.1)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Modulo         : Controla o "Desktop"
---------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------
TcPage              : Classe de gerenciamento do desktop/Janelas e Formularios
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
function TcPage( ) {
  this.FMouse    = new TcMouse( true );   //Armazena o ponteiro do mouse
  //this.FKey      = new TcKey( true );     //Teclas Pressionadas
  this.FSKey     = new Array();           //Armazena as Teclas de Funcoes (ShortCut)
  //------------------------------------------------
  //this.FWindows  = new TcWindows();       //Armazena os dados das Janelas
  //------------------------------------------------
  //this.FConfig   = new TcConfig();        //Armazena as configuracoes
};
/*=========================================================================================================
Manutencao dos Eventos
/*---------------------------------------------------------------------------------------------------------
addEvent            : Adiciona eventos ao sistema - Variavel global esEvent
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :variant              : ID do elemento ( String ou DOM Element)
event               :string               : nome do evento
js                  :string               : codigo javascript
propagate           :boolean              : Nao Permite Evento em cascata ( true / nao permite )
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcPage.prototype.addEvent=function( o , event , js , propagate ) {
  this.addEvent( o , event , js , propagate );
};
/*=========================================================================================================
Funcoes Auxiliares de Manutencao das Janelas
/*---------------------------------------------------------------------------------------------------------
destroy             : Destroi uma janela e seus filhos/Eventos/Formularios
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :string               : ID do Elemento DOM ou * para todas as janelas
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcPage.prototype.destroy=function( o ) {
  this.FWindows.destroy( o );
};

/*---------------------------------------------------------------------------------------------------------
setKey              : Associa uma tecla a um evento do sistema
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
event               :string               : Evento interno da chamada
key                 :Object JS            : Valor das teclas para acesso
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------
TcPage.prototype.setKey=function( event , key ) {
  var events = new Object, obj = this, js;
  //recuperando a codificacao das teclas
  key = {'char' :key.char,
         'ctrl' :(key.ctrl?key.ctrl:false),
         'alt'  :(key.alt?key.alt:false),
         'shift':(key.shift?key.shift:false)};
  //Fecha a janela corrente
  events.closewindow = function( event , target ) {
    var form = target.form.id.substring(2);
    if( obj.FWindows.FWindows[ form ].FType == 'F' )
      obj.destroy( form );
    stopPropagation(event);
  };
  //Abre a Janela de Busca
  events.recordbrowse = function( event , target ) {
    var form  = target.form.id.substring(2);
    var field = target.id.substring( target.form.id.length );
    if( obj.FWindows.FWindows[ form ].FField[ field ].FSeek ) {
      obj.getBrowse( form , field );
    };
    stopPropagation(event);
  };
  //Acesso a tela do registro
  events.recordlink = function( event , target ) { stopPropagation(event); };
  //Consultar
  events.recordc = function( event , target ) { stopPropagation(event); };
  //Alterar (update)
  events.recordu = function( event , target ) { stopPropagation(event); };
  //Incluir (insert)
  events.recordi = function( event , target ) { stopPropagation(event); };
  //Excluir (delete)
  events.recordd = function( event , target ) { stopPropagation(event); };
  //------------------------------------------------
  //Incluindo o Evento
  if( events[event] ) {
    this.FKey.shortCut( key , events[event] );
  }
};*/
