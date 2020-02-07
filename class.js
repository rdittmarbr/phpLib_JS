"use strict"
/*------------------------------------------------------------------------------------------------------------
Mantenedor     : Rodrigo Dittmar
Linguaguem     : javascript
Dependencia    :
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Modulo         : Definicao de classes diversas
------------------------------------------------------------------------------------------------------------*/
function TcPackage() {
	this.FCount   = 0;
	this.debug    = false;
}

function TcModule() {
	this.FCount   = 0;
	this.debug    = false;
}

/*------------------=-----------=------------------------------------------------------------------------------
TcLog               : Gerenciamento de Logs
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
class TcLog {
	/*------------------=-----------=----------------------------------------------------------------------------
	constructor         : Constroi a Classe
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	aProject            :string     :Nome do Projeto
	aPrint							:boolean    :Exibe no console a mensagem
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	-----------------------------------------------------------------------------------------------------------*/
	constructor( ) {
		this.FPrint   = false;    // Imprime a mensagem de log ao incluir no debug
		this.FLog     = [];       // Log
		var FOwner = ''           // Variável Privada Owner (para agrupamento do log)
		this.getPreviousOwner = function() { return this.FOwner; }
		this.setPreviousOwner = function( a ) { this.FOwner = a ; }
	}
  /*------------------=-----------=----------------------------------------------------------------------------
	addMessage          : Adiciona uma mensagem ao log
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	aOwner 							: string    : Função original
	aLog                : string    : Texto auxiliar para o log
	aType               : int       : Tipo de log (0 - Info // 1 - Log // 2 - Error)
	aDom								: DOM       : Elemento DOM
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	-----------------------------------------------------------------------------------------------------------*/
	addMessage( aOwner, aLog , aType , aDom ) {
		aOwner = aOwner || '', aLog = aLog || " ", aType = aType || 0, aDom = aDom || " ";
		var aData = new Date();
		var aModule = this.getStack(2);
		this.FLog.push([aOwner, aModule, aLog, aType, isDom(aDom?aDom.innerHTML:aDom), aData]);
		if( this.FPrint )
		  this.printLine(aOwner, aModule, aLog, aType, aDom, aData);
	}
	log( aOwner, aLog , aDom ) { this.addMessage( aOwner, aLog, 0 , aDom ) };
	info( aOwner, aLog , aDom ) { this.addMessage( aOwner, aLog, 1, aDom ) };
	error( aOwner, aLog , aDom ) { this.addMessage( aOwner, aLog, 2, aDom ) };
  /*------------------=-----------=----------------------------------------------------------------------------
	print               : Imprime todo o log armazenado em memória
	printLine           : Imprime o log no momento da solicitação
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	aOwner							:string    : Nome do Projeto
	aModule             :string    : Classe Pai que executou o log
	aLog                :string    : Mnensagem auxiliar referente ao log
	aType 							:int       : Tipo de log (0 - Info // 1 - Log // 2 - Error)
	aDom  							:DOM 			 : Nodo do log
	addData							:date			 : Data/Hora da inclusao do log
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	-----------------------------------------------------------------------------------------------------------*/
  print( ) {
    this.FLog.forEach( this.printLine );
	}
	printLine( aOwner, aModule, aLog , aType , aDom , aData ) {
		// Realiando o agrupamento por Classe
		if( this.getPreviousOwner() != aOwner) {
			console.groupEnd(this.getPreviousOwner());
			console.group(aOwner);
			this.setPreviousOwner(aOwner);
		}
		var aMsg = aOwner + '.' + aModule;
	  if (aType == 0) {
	    console.log(aMsg, aLog, aDom);
	  } else if (aType == 1) {
	    console.info(aMsg, aLog, aDom);
	  } else if (aType == 2) {
	    console.error(aMsg, aLog, aDom);
	  } else {
	    console.log(aMsg, aLog, aDom);
	  }
	}
  /*------------------=-----------=----------------------------------------------------------------------------
	setPrint						: Altera a Forma de exibição do LOG
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	aPrint  						:boolean    : Exibe S/N o log no momento da criação
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	-----------------------------------------------------------------------------------------------------------*/
	setPrint( aPrint ) {
		this.FPrint = aPrint || false;

		if( this.FPrint ) {
			//Imprimindo o Debug
			console.clear;
			console.log('JSDebug : true');
		}
	}
	printDOM() {
	}
	updateDB() {
	}
	// Adaptado de : https://stackoverflow.com/questions/29572466/how-do-you-find-out-the-caller-function-in-javascript-when-use-strict-is-enabled
	getStack( a ) {
	  var cName; a = a || 0;
	  try { throw new Error(); }
	  catch (e) {
	    var st = e.stack, m, re = /(\d+):(\d+)/;
	    st = st.split(/\s*\n\s*/)[a+1];  // recuperando stack
	    st = st.replace("https+://","");
	    st = st.split(/(\w+)@|at (\w+) \(/g);
	    cName = st[2] || st[1] +" ("+ re.exec(st)[0] + ")";
	  }
	  return(cName);
	};
}


// (function () {
// if (!(window.customElements && document.body.attachShadow)) {
//   document.querySelector('fancy-tabs').innerHTML = "<b>Your browser doesn't support Shadow DOM and Custom Elements v1.</b>";
//   return;
// }
//
// })
//<clibras-popup-info id="a1" img="img/bg.png" data-text="Your card validation code (CVC) is an extra security feature — it is the last 3 or 4 numbers on the back of your card."><span>asdfg</span></clibras-popup-info>
//<clibras-popup-info id="a2" img="img/bg.png" data-text="asdfasdfasdfasdf." data-video="/clibras/_vd/teste/Biblioteca.mp4" data-video-id="video_biblioteca"></clibras-popup-info>

class ExPopupInfo extends HTMLElement {

  constructor() {
    super(); // Acessando constructor da classe mãe

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // Create spans
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    const icon = document.createElement('span');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', 0);

    const info = document.createElement('div');
    info.setAttribute('class', 'info');

    // Take attribute content and put it inside the info span
    const text = this.getAttribute('data-text');
    info.textContent = text;

    // Take attribute content and put it inside the info span
    if( this.hasAttribute('data-video') ) {
      const video = document.createElement('video');
      video.src = this.getAttribute('data-video');
      video.id = this.getAttribute('data-video-id');
      info.appendChild(video);
    }

    // Insert icon
    let imgUrl;
    if(this.hasAttribute('img')) {
      imgUrl = this.getAttribute('img');
    } else {
      imgUrl = 'img/default.png';
    }

    const img = document.createElement('img');
    img.src = imgUrl;
    icon.appendChild(img);

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    style.textContent = `
      .wrapper {
        position: relative;
      }

      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }

      img {
        width: 1.2rem;
      }

      /*.icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }*/
    `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
  }

 // static get properties() {
 //   return
 // }
 //
 //  render() {
 //
 //  }

           // icon.addEventListener('onshow', () => { console.log("onshow")});
           // icon.addEventListener('onload', () => { console.log("onload")});
           // icon.addEventListener('ontap', () => { console.log("ontap")});
           // icon.addEventListener('onup', () => { console.log("onup")});
           // icon.addEventListener('onblur', () => { console.log("onblur")});
           //           icon.addEventListener('onfocus', () => { console.log("onfocus")});
           // icon.addEventListener('ontouchstart', () => { console.log("ontouchstart")});
           // video - transitionend fullscreenchange gesturechange gestureend dblclick contextmenu durationchange ended loadeddata error play playing progress ratechange resize seeked volumechange waiting loadedmetadata
           //  music_polymer.js
}

// Define the new element
/*customElements.define('clibras-popup-info', ExPopupInfo );

customElements.whenDefined('clibras-popup-info').then(() => {
var now = new Date;
  console.log(now);
});

function isCompatible(ua) {
  return !!((function() {
    'use strict';
    return !this && Function.prototype.bind && window.JSON;
  }()) && 'querySelector' in document && 'localStorage' in window && 'addEventListener' in window && !ua.match(/MSIE 10|NetFront|Opera Mini|S40OviBrowser|MeeGo|Android.+Glass|^Mozilla\/5\.0 .+ Gecko\/$|googleweblight|PLAYSTATION|PlayStation/));
}*/

/*============================================================================================================
Manipulação de Eventos na página
/*------------------=-----------=-----------------------------------------------------------------------------
StEvent             : Estrutura para o observer
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
js                  :variant    : codigo javascript string / funcao javascript
type                :boolean    : before/after (True/False)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
function StEvent( js , type ) {
  this.js   = js;
  this.type = !(!type);
}
/*============================================================================================================
Manipulação de Eventos na página
/*------------------=-----------=-----------------------------------------------------------------------------
TcEvent             : Classe que armazena/gerencia os eventos para o observer
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
function TcEvent() {
  this.FEvent = new Array();    // Eventos
};
/*------------------=-----------=-----------------------------------------------------------------------------
addEvent            : Adiciona eventos ao objeto DOM
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
_TcEvent_AEV_o      :DOM        : objeto DOM
_TcEvent_AEV_event  :string     : nome do evento
_TcEvent_AEV_js     :variant    : codigo javascript string / funcao javascript
_TcEvent_AEV_booble :boolean    : Impede evento em cascata
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
TcEvent.prototype.addEvent=function( _TcEvent_AEV_o , _TcEvent_AEV_event , _TcEvent_AEV_js , _TcEvent_AEV_booble ) {
  if( !isDom(_TcEvent_AEV_o ) ) return( false );

  var _TcEvent_REG_obj = this;
  //setando as Variaveis Locais para uso no evento
  var _TcEvent_GEV_js     = isFunction( _TcEvent_AEV_js ) ? _TcEvent_AEV_js : eval( _TcEvent_AEV_js );
  var _TcEvent_GEV_booble = !(!_TcEvent_AEV_booble);
  var _TcEvent_GEV_o_id   = ( _TcEvent_AEV_o.id ) ? _TcEvent_AEV_o.id : 'document';
  //Criando o observer
  if( !(this.FEvent[_TcEvent_GEV_o_id]) )
    this.FEvent[_TcEvent_GEV_o_id] = new Array()
  this.FEvent[_TcEvent_GEV_o_id][_TcEvent_AEV_event] = new Array();
  //Adicionando o Evento
  addEvent( _TcEvent_AEV_o , _TcEvent_AEV_event , function( event ) {
    //Variaveis locais
    let _TcEvent_GEV_Event  = event || window.event || null;
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
/*------------------------------------------------------------------------------------------------------------
addObserver         : Adiciona eventos observadores ao Evento
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
_TcEvent_OEV_o      :string               : ID DOM Object
_TcEvent_OEV_event  :string               : nome do evento
_TcEvent_OEV_js     :variant              : codigo javascript string / funcao javascript
_TcEvent_OEV_type   :boolean              : Evento deve executar Antes/Apos o evento pai
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
TcEvent.prototype.addObserver=function( _TcEvent_OEV_o , _TcEvent_OEV_event , _TcEvent_OEV_js , _TcEvent_OEV_type ) {
  //Criando o observer
  if( _TcEvent_OEV_o == document ) _TcEvent_OEV_o = 'document';
  if( this.FEvent[_TcEvent_OEV_o] && this.FEvent[_TcEvent_OEV_o][_TcEvent_OEV_event] )
    this.FEvent[_TcEvent_OEV_o][_TcEvent_OEV_event].push( new StEvent( _TcEvent_OEV_js , _TcEvent_OEV_type ) )
  return( this.FEvent[_TcEvent_OEV_o][_TcEvent_OEV_event].length-1 );
};
/*------------------------------------------------------------------------------------------------------------
removeObserver      : Remove eventos observadores
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
_TcEvent_REV_o      :string               : ID DOM Object que sera excluido
_TcEvent_REV_event  :string               : nome do evento
_TcEvent_REV_id     :integer              : ID do evento observer
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
TcEvent.prototype.removeObserver=function( _TcEvent_REV_o , _TcEvent_REV_event , _TcEvent_REV_id ) {
  //Criando o observer
  if( _TcEvent_REV_o == document ) _TcEvent_REV_o = 'document';
  if( this.FEvent[_TcEvent_REV_o] &&
      this.FEvent[_TcEvent_REV_o][_TcEvent_REV_event] &&
      this.FEvent[_TcEvent_REV_o][_TcEvent_REV_event][_TcEvent_REV_id] )
    delete( this.FEvent[_TcEvent_REV_o][_TcEvent_REV_event][_TcEvent_REV_id] );
  return;
};




/*============================================================================================================
Manipulação de videos
/*------------------=-----------=-----------------------------------------------------------------------------
TcVideos            :Classe de manutencao de Videos
Veicular arquivos de vídeo com o tipo MIME correto no cabeçalho Content-Type
AddType video/ogg .ogv
AddType video/mp4 .mp4
AddType video/webm .webm
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
function TcVideos( ) {

}
/*------------------=-----------=-----------------------------------------------------------------------------
TcCookie            :Classe de manutencao do cookie - Filha do TcVideos
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
function TcVideo( aVideo , aCodec ) {
	this.FSource = aVideo || "";    // Vídeo
	this.FCodec  = aCodec || "";    // Codec
	this.FSize   = { width: 0,
									 height: 0 } ;  // Tamanho Horizontal do vídeo
	this.FPoster = "" ;             // Poster do video
	this.FHistory = [];             // Pontos de atenção no vídeo
	this.FReopen = 0;               // status do vídeo (true se já assistiu 100%)
	this.FDOM = '';                 // Elemento do Vídeo
}
/*------------------=-----------=-----------------------------------------------------------------------------
play                :Executa um vídeo do ponto de parada ou a partir de um ponto
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
aTime               :integer    : tempo de início do vídeo / não informar nada para tocar de onde parou
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
TcVideo.prototype.play = function( aTime ) {}
/*------------------=-----------=-----------------------------------------------------------------------------
pause               :Pausa um vídeo
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
TcVideo.prototype.pause = function() {}
/*------------------=-----------=-----------------------------------------------------------------------------
mute                :Muta um vídeo / ou / Desmuta
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
TcVideo.prototype.mute = function() {}
/*------------------=-----------=-----------------------------------------------------------------------------
print               :Realiza um print do frame atual do vídeo para criar o history
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
TcVideo.prototype.print = function() {}
/*------------------=-----------=-----------------------------------------------------------------------------
setView             :Grava se o vídeo foi visto 100%, para marcar como já visualizado
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
TcVideo.prototype.setView = function () {}
//define os pontos de parada do vídeo (history)
/*------------------=-----------=-----------------------------------------------------------------------------
setHistory          :Define o ponto de parada do vídeo
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
TcVideo.prototype.setHistory = function() {
	//this.FHistory[] = new TcVideoHistory()
}
/*------------------=-----------=-----------------------------------------------------------------------------
TcVideoHistory      :Classe de exibição das interações dos videos - Filha do TcVideo
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
function TcVideoHistory( aTime, aPoster, aObject ) {
	this.FTime   = aTime || 0;                 // Tempo que o histórico deve aparecer
	this.FPoster = aPoster || "";              // Imagem do poster
	this.FObject = aObject || "";              // Objeto do Histórico
}

/*===========================================================================================================
RECORD / STRUCT
/*------------------=-----------=-----------------------------------------------------------------------------
StPointer           : Estrutura para armazenar os pontos X/Y
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
x                   :integer    : Ponto X
y                   :integer    : Ponto Y
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-----------------------------------------------------------------------------------------------------------*/
function StPointer( x , y ) {
	this.x = x || 0;
	this.y = y || 0;
}
/*============================================================================================================
Classes de Eventos
/*------------------=-----------=-----------------------------------------------------------------------------
TcMouse             : Classe que armazena os X Y
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
aType               :boolean    : Cria o evento de captura da movimentacao do mouse
aOwner              :Object     : Proprietário da classe
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
function TcMouse( aType , aOwner ) {
  this.FOwner = aOwner // Proprietário da Classe
  //this.FEvent =
  this.x = 0;          //Localizacao x
	this.y = 0;          //Localizacao y
	//------------------------------------------------
	if( aType )
		this.setMouseEvent();
}
/*------------------=-----------=-----------------------------------------------------------------------------
setMouseEvent      : Recupera a Posicao do Mouse
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
TcMouse.prototype.setMouseEvent = function( ) {
	var obj = this;
	//Recuperando o ponteiro do Mouse
	this.FOwner.FEvent.addEvent( document , 'mousemove' , function ( e ) {
    e = e || window.e || null;
    obj.x = e.pageX || e.x || 0;
		obj.y = e.pageY || e.y || 0;
	} );
}


/*-----------------------------------------------------------------------------------------------------------
StCursorPosition    : Estrutura para armazenar o ponteiro do cursor
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
start               :integer              : Ponto de inicio do cursor
end                 :integer              : Ponto final do cursor
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-----------------------------------------------------------------------------------------------------------*/
function StCursorPosition( ) {
	this.start = 0;
	this.end   = 0;
}

/*-----------------------------------------------------------------------------------------------------------
TcKey               : Classe que armazena os valores das Teclas pressionadas
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
aType               :boolean              : Cria o evento de captura das teclas pressionadas
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-----------------------------------------------------------------------------------------------------------*/
function TcKey( aType ) {
	this.keyMapI = { 190:'.', 61:'+',109:'-',
										65:'a', 66:'b', 67:'c', 68:'d' ,69 :'e',70 :'f',71 :'g',72 :'h',73 :'i',74 :'j',75:'k',76:'l',77:'m',78:'n',79:'o',80:'p',81:'q',82:'r',83:'s',84:'t',85:'u',86:'v',87:'w',88:'x',89:'y',90:'z',32:' ',
										48:'0', 49:'1', 50:'2', 51:'3' ,52 :'4',53 :'5',54 :'6',55 :'7',56 :'8',57 :'9',
										96:'0', 97:'1', 98:'2', 99:'3' ,100:'4',101:'5',102:'6',103:'7',104:'8',105:'9',
										27:'VK_ESC',  13:'VK_ENTER',  9:'VK_TAB',  19:'VK_PAUSE',
										37:'VK_LEFT', 39:'VK_RIGHT', 38:'VK_UP',   40:'VK_DOWN',
										36:'VK_HOME', 35:'VK_END',   33:'VK_PGUP', 34:'VK_PGDN',
										45:'VK_INS',  46:'VK_DEL',    8:'VK_BKS',
									 112:'VK_F1',  113:'VK_F2',   114:'VK_F3',  115:'VK_F4',
									 116:'VK_F5',  117:'VK_F6',   118:'VK_F7',  119:'VK_F8',
									 120:'VK_F9',  121:'VK_F10',  122:'VK_F11', 123:'VK_F12'};
	this.keyMapC = { '.':190, '+': 61, '-':109,
									 'a': 65, 'b': 66, 'c': 67, 'd': 68, 'e': 69, 'f': 70, 'g': 71, 'h': 72, 'i': 73, 'j': 74, 'k': 75, 'l': 76, 'm': 77, 'n': 78, 'o': 79, 'p': 80, 'q': 81, 'r': 82, 's': 83, 't': 84, 'u': 85, 'v': 86, 'x': 88,'w': 87, 'y': 89, 'z': 90,' ': 32,
									 '1': 49, '2': 50, '3': 51, '4': 52, '5': 53, '6': 54, '7': 55, '8': 56, '9': 57, '0': 48,
									 'VK_ESC' : 27, 'VK_ENTER': 13, 'VK_TAB' :  9, 'VK_PAUSE': 19,
									 'VK_LEFT': 37, 'VK_RIGHT': 39, 'VK_UP'  : 38, 'VK_DOWN' : 40,
									 'VK_HOME': 36, 'VK_END'  : 35, 'VK_PGUP': 33, 'VK_PGDN' : 34,
									 'VK_INS' : 45, 'VK_DEL'  : 46, 'VK_BKS' :  8,
									 'VK_F1'  :112, 'VK_F2'   :113, 'VK_F3'  :114, 'VK_F4'   :115,
									 'VK_F5'  :116, 'VK_F6'   :117, 'VK_F7'  :118, 'VK_F8'   :119,
									 'VK_F9'  :120, 'VK_F10'  :121, 'VK_F11' :122, 'VK_F12'  :123};
	this.ctrl      = false;
	this.shift     = false;
	this.alt       = false;
	this.key       = 0;
	this.char      = '';
	//------------------------------------------------
	this.FShortCut = new Array();   //Eventos que devem ocorrer apos a digitacao de uma tecla
	//------------------------------------------------
	if( aType )
		this.setKey();
}
/*---------------------------------------------------------------------------------------------------------
setKey              : Recupera a tecla pressionada
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcKey.prototype.setKey = function( ) {
	var obj = this;
	//Executando o evento
	esEvent.addEvent( document , 'keydown' , keyDown = function ( event , target ) {
		event = event || window.event || null;
		obj.key  = event.charCode || event.keyCode || event.which || 0;
		obj.ctrl = event.ctrlKey;
		obj.alt  = event.altKey;
		obj.shift= event.shiftKey;
		obj.char = obj.keyMapI[obj.key] || '';
		//------------------------------------------------
		if( obj.FShortCut[obj.char + (obj.ctrl?'C':' ') + (obj.alt?'A':' ') + (obj.shift?'S':' ') ] ) {
			var js = obj.FShortCut[obj.char + (obj.ctrl?'C':' ') + (obj.alt?'A':' ') + (obj.shift?'S':' ') ];
			js( event , target );
		}
	} , true );
}
/*---------------------------------------------------------------------------------------------------------
shortCut            : Associa uma tecla a uma funcao javascript
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
key                 :Object               : Objeto Key que chama o evento
js                  :js                   : Elemento Javascript
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcKey.prototype.shortCut=function( key , js ) {
	this.FShortCut[key.char + (key.ctrl?'C':' ') + (key.alt?'A':' ') + (key.shift?'S':' ') ] = js;
};
/*---------------------------------------------------------------------------------------------------------
isChar               : Verifica se a tecla digitada � um caracter
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcKey.prototype.isChar = function( ) {
	return( this['char'].indexOf('VK') == -1 );
};
/*---------------------------------------------------------------------------------------------------------
isSChar              : Verifica se a tecla digitada � uma tecla de navegacao/funcao
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcKey.prototype.isSChar = function( ) {
	return( this['char'].indexOf('VK') >= 0 );
};
/*---------------------------------------------------------------------------------------------------------
isText              : Verifica se a tecla digitada � um texto (a..z)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcKey.prototype.isText = function( ) {
	return( this.isChar() && ((this['char'] >= 'a' && this['char'] <= 'z' ) || this['char']==' ' ) );
};
/*---------------------------------------------------------------------------------------------------------
isNumber            : Verifica se a tecla digitada � um Numero (0..9)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcKey.prototype.isNumber = function( ) {
	return( this.isChar() && this['char'] >= '0' && this['char'] <= '9' );
};
/*---------------------------------------------------------------------------------------------------------
isFunction          : Verifica se a tecla digitada � uma Funcao (F1..F12)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcKey.prototype.isFunction = function( ) {
	return( this.isSChar() && this['key'] >= 112 && this['key'] <= 123 );
};
