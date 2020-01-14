/*-----------------------------------------------------------------------------------------------------------
Mantenedor     : Rodrigo Dittmar / rodrigo.dittmar@gmail.com
Linguaguem     : javascript (2.1)
Dependencia    : 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Modulo         : Gerenciamento de eventos
-----------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------
StEvent             : Estrutura para o observer
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
js                  :variant              : codigo javascript string / funcao javascript
type                :boolean              : before/after (True/False)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-----------------------------------------------------------------------------------------------------------*/
function StEvent( js , type ) {
  this.js   = js;
  this.type = !(!type);
}
/*-----------------------------------------------------------------------------------------------------------
TcEvent             : Classe que armazena/gerencia os eventos para o observer
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-----------------------------------------------------------------------------------------------------------*/
function TcEvent() {
  this.FEvent = new Array();
};
/*---------------------------------------------------------------------------------------------------------
addEvent            : Adiciona eventos ao objeto DOM
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
_TcEvent_AEV_o      :DOM Object           : objeto DOM
_TcEvent_AEV_event  :string               : nome do evento
_TcEvent_AEV_js     :variant              : codigo javascript string / funcao javascript
_TcEvent_AEV_booble :boolean              : Impede evento em cascata
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcEvent.prototype.addEvent=function( _TcEvent_AEV_o , _TcEvent_AEV_event , _TcEvent_AEV_js , _TcEvent_AEV_booble ) {
  var _TcEvent_REG_obj = this;
  if( !isDom(_TcEvent_AEV_o ) ) return( false );
  //setando as Variaveis Locais para uso no evento
  var _TcEvent_GEV_js     = isFunction( _TcEvent_AEV_js ) ? _TcEvent_AEV_js : eval( _TcEvent_AEV_js );
  var _TcEvent_GEV_booble = !(!_TcEvent_AEV_booble);
  var _TcEvent_GEV_o_id   = ( _TcEvent_AEV_o.id ) ? _TcEvent_AEV_o.id : 'document';
  //Criando o observer
  if( !(this.FEvent[_TcEvent_GEV_o_id]) )
    this.FEvent[_TcEvent_GEV_o_id] = new Array()
  this.FEvent[_TcEvent_GEV_o_id][_TcEvent_AEV_event] = new Array();
  //Adicionando o Evento
  addEvent( _TcEvent_AEV_o , _TcEvent_AEV_event , _TcEvent_ExecEvent = function( event ) {
    //Variaveis locais
        _TcEvent_GEV_Event  = event || window.event || null;
    var _TcEvent_GET_Target = _TcEvent_GEV_Event.target || _TcEvent_GEV_Event.srcElement;
    //Executando o evento    
    var _TcEvent_GET_Result = _TcEvent_GEV_js( _TcEvent_GEV_Event , _TcEvent_GET_Target );
    //Executando os eventos observer
    if( _TcEvent_REG_obj.FEvent[_TcEvent_GEV_o_id][_TcEvent_GEV_Event.type] ) {
      for( var h in _TcEvent_REG_obj.FEvent[_TcEvent_GEV_o_id][_TcEvent_GEV_Event.type] )
       if( _TcEvent_REG_obj.FEvent[_TcEvent_GEV_o_id][_TcEvent_GEV_Event.type][h].js )
          _TcEvent_REG_obj.FEvent[_TcEvent_GEV_o_id][_TcEvent_GEV_Event.type][h].js( _TcEvent_GEV_Event , _TcEvent_GET_Target );
        else 
          eval( _TcEvent_REG_obj.FEvent[_TcEvent_GEV_o_id][_TcEvent_GEV_Event.type][h].text );
    }
    return(_TcEvent_GET_Result);
  } );
};
/*---------------------------------------------------------------------------------------------------------
addObserver         : Adiciona eventos observadores ao Evento
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
_TcEvent_OEV_o      :string               : ID DOM Object
_TcEvent_OEV_event  :string               : nome do evento
_TcEvent_OEV_js     :variant              : codigo javascript string / funcao javascript
_TcEvent_OEV_type   :boolean              : Evento deve executar Antes/Apos o evento pai
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcEvent.prototype.addObserver=function( _TcEvent_OEV_o , _TcEvent_OEV_event , _TcEvent_OEV_js , _TcEvent_OEV_type ) {
  //Criando o observer
  if( _TcEvent_OEV_o == document ) _TcEvent_OEV_o = 'document';
  if( this.FEvent[_TcEvent_OEV_o] && this.FEvent[_TcEvent_OEV_o][_TcEvent_OEV_event] )
    this.FEvent[_TcEvent_OEV_o][_TcEvent_OEV_event].push( new StEvent( _TcEvent_OEV_js , _TcEvent_OEV_type ) )
  return( this.FEvent[_TcEvent_OEV_o][_TcEvent_OEV_event].length-1 );
};
/*---------------------------------------------------------------------------------------------------------
removeObserver      : Remove eventos observadores
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
_TcEvent_REV_o      :string               : ID DOM Object que sera excluido
_TcEvent_REV_event  :string               : nome do evento
_TcEvent_REV_id     :integer              : ID do evento observer
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcEvent.prototype.removeObserver=function( _TcEvent_REV_o , _TcEvent_REV_event , _TcEvent_REV_id ) {
  //Criando o observer
  if( _TcEvent_REV_o == document ) _TcEvent_REV_o = 'document';
  if( this.FEvent[_TcEvent_REV_o] && 
      this.FEvent[_TcEvent_REV_o][_TcEvent_REV_event] &&
      this.FEvent[_TcEvent_REV_o][_TcEvent_REV_event][_TcEvent_REV_id] )
    delete( this.FEvent[_TcEvent_REV_o][_TcEvent_REV_event][_TcEvent_REV_id] );
  return;
};