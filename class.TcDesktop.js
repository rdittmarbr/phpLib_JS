"use strict"
/*-------------------------------------------------------------------------------------------------------------
Mantenedor     : Rodrigo Dittmar
Linguaguem     : javascript
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Modulo         : TcDesktop - Gerenciamento das definições das telas/acessos/recuperação de informações
Dependencias   : TcAjax // TcVideo
-------------------------------------------------------------------------------------------------------------*/
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
			console.log('ES_JSDEBUG ON');
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

/*------------------=-----------=------------------------------------------------------------------------------
TcDesktop           : Classe de gerenciamento do desktop/Janelas e Formularios
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
function TcDesktop( aProject, aDebug ) {

  this.FDebug = aDebug || false;             // Log JS
	this.FModule = false, this.FEvent = false, this.FMouse = false; this.FCookie = false; this.FVideo = false; this.FPackage = false;	this.FGUI = false;

	try {	this.FModule = new TcModule();} catch(e) {}           // Módulos Externos - Não nativos
	try { this.FEvent  = new TcEvent();} catch(e) {}            // Eventos
	try {	this.FMouse  = new TcMouse(true, this);} catch(e) {}  // Armazena o ponteiro do mouse
	try {	this.FCookie = new TcCookies();} catch(e) {}          // Manipulação de Cookies
	try { this.FVideo   = new TcVideos();} catch(e) {}          // Manipulação de Videos
	try {	this.FPackage= new TcPackage();} catch(e) {}          // Controle dos Pacotes Ajax
	try { this.FGUI     = new TcGUI();} catch(e) {}             // Manutenção do GUI

	this.FVideo    = false;                       // Armazena os recursos da Camera
	this.FSkin     = '';                          // Configurações do Skin
	this.FAnimated = false;                       // Habilita as animações baseadas em javascript
	this.FURL      = '';                          // URL do sistema (se não informado)

	// Setando a rotina de debug das classes filhas
	this.FCookie.debug = this.debug;
	this.FPackage.debug = this.debug;
	this.FGUI.debug = this.debug;

  /*------------------=-----------=----------------------------------------------------------------------------
	debug               : Exibe o log no console, se habilitado pelo ES_JSDEBUG
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	aLog                : string    : Texto auxiliar para o log
	aType               : int       : Tipo de log (0 - Info // 1 - Log // 2 - Error)
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	-----------------------------------------------------------------------------------------------------------*/
	this.debug = function ( aLog , aType , aDom ) {
		if ( this.FDebug.addMessage ) {
			this.FDebug.addMessage( this.constructor.name, aLog || '', aType || 0 , aDom );
		}
	}
	// Verificando a skin
	if( this.getQueryURL('skin') ) {
		this.setSkin(this.getQueryURL('skin'));
	}
  /*document.addEventListener('focusin', () => { console.log("focusin")});
	document.addEventListener('focus', () => { console.log("focus")});
	document.addEventListener('blur', () => { console.log("blur")});
	document.addEventListener('mousemove', () => { console.log("mousemove")});
	document.addEventListener('visibilitychange', () => { console.log("visibilitychange")});
	document.addEventListener('blur', () => { console.log("blur")});   // Elemento perde o foco
	*/
}
/*=============================================================================================================
Gestão de erros
/*------------------=-----------=------------------------------------------------------------------------------
error               : envia uma mensagem de erro ao console
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
aLog                : string    : Texto auxiliar para o log
aDom  							: DOM 			: Objeto dom
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcDesktop.prototype.error = function ( aLog, aDom ) {
	this.debug( aLog, 2, aDom );
}
/*=============================================================================================================
Eventos da página
/*------------------=-----------=------------------------------------------------------------------------------
onUnload            : envia uma mensagem informando que finalizou a conexão
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcDesktop.prototype.onUnload = function () {
	var aParam = new Array();
	aParam['O']='logout';
	if(this.FDebug) this.debug( aParam );
	alert('ok');
	// Busca o login caso o módulo esteja em branco
	return( this.rpcServer( aParam ) );
}
/*=============================================================================================================
UserMedia
/*------------------=-----------=------------------------------------------------------------------------------
fullScreen          : Exibe um elemento em fullScreen
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcDesktop.prototype.fullScreen = function ( o ) {
	if(this.FDebug) this.debug();
	//o.

	return(true);
}
/*------------------=-----------=------------------------------------------------------------------------------
openCamera          : Verifica se a câmera está pronta para uso
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcDesktop.prototype.openCamera = function ( ) {
	if(this.FDebug) this.debug( );
	this.FVideo = document.querySelector("#webCamera");
	//Bug iOS --
	this.FVideo.setAttribute('autoplay', '');
	this.FVideo.setAttribute('muted', '');
	this.FVideo.setAttribute('playsinline', '');
  //End Bug iOS

//Verifica se o navegador pode capturar mídia
	if (navigator.mediaDevices.getUserMedia) {

		navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: 'user'}})
		.then( function(stream) {
			//Definir o elemento vídeo a carregar o capturado pela webcam
			video.srcObject = stream;
		})
		.catch(function(error) {
			alert("Oooopps... Falhou :'(");
		});
	}

	return(true);
}
/*=============================================================================================================
Manutenção do skin/animações e endereço da barra de tarefas
/*------------------=-----------=------------------------------------------------------------------------------
setSkin             : Altera o arquivo CSS conforme a definição do SKIN
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
aSkin               : string    : Nome do skin utilizado no sistema
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcDesktop.prototype.setSkin = function ( aSkin ) {
	if(this.FDebug) this.debug( aSkin );
  if( aSkin == this.FSkin ) return(false);
	var i,o=document.getElementsByTagName("link");
	this.FSkin = aSkin;
	for( i = 0; i < o.length; i++) {
	  if( o[i].href.indexOf("/skin/") > 0 )
		  o[i].href = "/skin/"+ aSkin + o[i].href.match(/\/[^\/]+$/);
	}
	return(true);
}
/*------------------=-----------=------------------------------------------------------------------------------
getQueryURL         : Recupera um parametro da URL especifico
/*------------------=-----------=------------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcDesktop.prototype.getQueryURL = function( aGet ) {
	if(this.FDebug) this.debug();

	var a,q;
	q = location.search.slice(1).split('&');
	for( a in q ) {
  	a = q[a].split('=');
		if( a[0] == aGet )
  		return a[1];
		}
	return false;
}
/*------------------=-----------=------------------------------------------------------------------------------
getURL              : Recupera a URL
/*------------------=-----------=------------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcDesktop.prototype.getURL = function( ) {
	if(this.FDebug) this.debug( );

	this.FURL = location.search.slice(1);
	return location.search.slice(1);
}

/*------------------=-----------=------------------------------------------------------------------------------
setURL              : Altera a URL sem recarregar a página
/*------------------=-----------=------------------------------------------------------------------------------
aURL                :String     : Nova URL (apenas o complemento)
Exemplo
URL sistema http://clibras.teste.ufpr.br/[ clibras <-- URL]
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcDesktop.prototype.setURL = function( aURL ) {
	if(this.FDebug) this.debug( this.getURL + ':->'+ aURL );

	window.history.pushState("object or string", "Title", aURL );
	return true;
}
/*------------------=-----------=------------------------------------------------------------------------------
setAnimatedInput    : Altera as propriedades do div container para o input/label criando uma pequena animação
Exemplo             : Há a necessidade obedecer a seguinte estrutura
<form>
	<div>
		<label for=name_input>
		<input name=name_input>
	</div>
	<div...
</form>
/*------------------=-----------=------------------------------------------------------------------------------
o                   :DOM        : Objeto DOM do formulario
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcDesktop.prototype.setAnimatedInput = function ( o ) {
	if( !this.FAnimated ) return false;

	var i, tag;

	for( i = o.elements.length-1; i>=0; i=i-1 ) {
		tag = o.elements[i];

		//ignorando Checkbox,RadioBox,Botoes...
		if( tag.type && ",text,password".search(tag.type) >0  ) {
			//Verificando se o input está contido em um div
			if( tag.parentNode.nodeName == "DIV" ) {
				//Verificando se há labels associados ao input
				if( tag.labels.length > 0 ) {
					if(this.FDebug) this.debug( tag , 1 );
					//Alterando a label
					tag.labels[0].addclass = "form-label";
					tag.addClass = "form-input";
					tag.parentNode.addClass = "form-group";
					if( tag.value != "" ) { tag.parentNode.addClass = "focused";tag.addClass = 'filled'; }
					tag.addEventListener("focus" , function() { this.parentNode.addClass = "focused" } );
					tag.addEventListener("blur" , function() {
	    																		if ( this.value == "" ) { this.removeClass = 'filled'; this.parentNode.removeClass = 'focused';
																				} else {this.addClass = 'filled';} });
				} else {
					if(this.FDebug) this.error( "input sem Label", tag );
				};
			} else {
				if(this.FDebug) this.error( "input sem Div", tag );
				console.log(tag.type);
			}
		} // IF(tag.type)
	}

	return(true);
}
/*------------------=-----------=------------------------------------------------------------------------------
setLabelHint        : Altera as propriedades do label do inputa para funcionar com
/*------------------=-----------=------------------------------------------------------------------------------
o                   :DOM        : Objeto DOM do formulario
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcDesktop.prototype.setLabelHint = function ( o ) {
	if(this.FDebug) this.debug( o );

	var i, input;

	for( i = o.elements.length-1; i>=0; i=i-1 ) {
		input = o.elements[i];
		//Alterando o Label do campo
		if( input.parentNode.nodeName == "DIV" ) {
			//input.parentNode.animatedLabel
		}
	}

	return(true);
}



/*=============================================================================================================
Manutenção de Módulos
/*------------------=-----------=------------------------------------------------------------------------------
addmodule           : Adiciona um novo módulo ao desktop
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
aModule             : string    : Nome/codigo do novo módulo
o 									: object    : Objeto do novo módulo
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcDesktop.prototype.addModule = function ( aModule , o ) {
	this.FModule[aModule] = o;
};
/*=============================================================================================================
Mautenção de cookies
/*------------------=-----------=------------------------------------------------------------------------------
cookieTest          : Testa a existencia de um cookie específico
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcDesktop.prototype.cookieTest = function ( aCookie ) {
	if(this.FDebug) this.debug( aCookie );

	var a = new TcCookie(aCookie);
	return( a.FValue != '' );
};
/*=============================================================================================================
Requisicao ao servidor (pacotes/dados/post)
/*------------------=-----------=------------------------------------------------------------------------------
getModule           : Requisita um modulo
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
aModule             :string     : nome do modulo
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcDesktop.prototype.getModule=function( aModule ) {
	var aParam = new Array();
	aParam['M'] = aModule || '';

	if(this.FDebug) this.debug( aParam );
	// Busca o login caso o módulo esteja em branco
	return( this.rpcServer( aParam ) );
};
/*-------------------------------------------------------------------------------------------------------------
sendForm            : Recupera os dados digitados em um formulario e realiza o post em json
/*------------------=-----------=------------------------------------------------------------------------------
o                   :DOM        : Objeto DOM do formulario
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcDesktop.prototype.sendForm=function( o ) {
	var i,j,o,aParam;
	var aError = false; // Se hover algum erro no processamento do formulário não envia

	var aForm = o.name.substr(3,99);

	// Testando o Node e gravando o debug
	if( !o || o.nodeName!=="FORM") {
		if(this.FDebug) this.debug( o , 2 );
		return(false);
	} else {
		if(this.FDebug) this.debug( o.name );
	}

	aParam = new Array();
	aParam['M'] = o.name || '';
	aParam['M'] = aParam['M'].substr(3,6);
	aParam['A'] = "P"                // Post do formulário
	aParam['V'] = [];

	for( i = o.elements.length-1; i>=0; i=i-1 ) {
		var input = o.elements[i];
		//Evitando enviar elementos sem Nome
		if( input.name ) {
			//Tratando cada tipo de elemento
			var aName = input.name.replace("in_"+aForm+"_","");

			if( aName == input.name ) {
				if(this.FDebug) this.debug( 'Erro ao processar formulário : ' + input.name , 2 );
				clearChild(body);
				body.innerHTML = '<div class="FATALERROR">ERRO AO PROCESSAR FORMULARIO.</div>';
				return(false);
			}

			//Verificando se é um obrigatório
			if( input.required && input.value ==="" ) {
				if(this.FDebug) this.debug( "required : " + input.name , 2 );
				input.blink;
				if( !aError ) input.focus();
				aError = true;
			}

			switch(input.nodeName) {
			case "INPUT":
				switch(input.type) {
					case "text":case"hidden":case"password":case"button":case"reset":case"submit":
						aParam['V'].push( jsonData(aName,input.value) );break;
					case "checkbox":case"radio":
						if(input.checked) {
							aParam['V'].push( jsonData(aName,input.value) )};break;
					case"file":break;
				}break;
			case "TEXTAREA":aParam['V'].push( jsonData(aName,input.value) );break;
			case "SELECT":
				switch(input.type) {
					case"select-one":aParam['V'].push( jsonData(aName,input.value) );break;
					case"select-multiple":for(j=form.elements[i].options.length-1;j>=0;j=j-1){
						if(input.options[j].selected){
							aParam['V'].push(jsonData(aName,input.value))}}break}break;
							// Verificar esta etapa do Código, postar como um objeto de objetos
					case"BUTTON":switch(form.elements[i].type){
						case"reset":case"submit":case"button":aParam['V'].push(jsonData(aName,input.value));break}
			break;
			}
		}
	}
	aParam['V']= aParam['V'].join(",");  // transformando o retorno em JSON

	return ( aError ? false : this.rpcServer( aParam ) );
}
/*=========================================================================================================
Tratamento dos Pacotes do Servidor
/*---------------------------------------------------------------------------------------------------------
processModule       : Processa os modulos - registra a janela, e processa o modulo
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module              :string               : Nome do Formulario de Retorno
data                :object               : Objeto - Modulo
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
---------------------------------------------------------------------------------------------------------*/
TcDesktop.prototype.processModule = function( aModule , aData ) {
	if(this.FDebug) this.debug( aModule );

	let h,i,j,o,head;

	//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	//Executando os comandos JS - Antes do processamento do pacote
	if( aData.js && aData.js.before ) {
		if( !isArray(aData.js.before ) ) aData.js.before=aData.js.before.split(';');
		for( i in aData.js.before ) {
			if(this.FDebug) this.debug('Executando comando JS before ' + aData.js.before[i] );
			aData.js.before[i] = eval(aData.js.before[i]);
		}
	}

	//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	//Verificando em qual nó incluir o HTML
	if( aData.main ) {
		for( h in aData.main ) {
			// Objeto Container
			o = $o( h );
			if( o && aData.main[h] ) {
				if(this.FDebug) this.debug('atualizando o node ' + h );

				//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				//Convertendo o HTML em elementos DOM
				let z = aData.main[h];
				aData.main[h] = document.createElement('div');
				aData.main[h].innerHTML = z;

				//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				//Processando as definições para as animações
				if( this.FAnimated ) {
					i = aData.main[h].getElementsByTagName('form');

					if(this.FDebug && i.lenrpcServergth > 0 ) this.debug('atualizando a Animação do Input');
					//Analisando apenas os campos do formulário
					for( j = i.length-1; j>=0; j-=1 ) {
				  	this.setAnimatedInput(i[j]);
					}
				}

				//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				//Buscando a tag <scripts>
				i = aData.main[h].getElementsByTagName('script');
				let head = document.getElementsByTagName('head')[0];

				if(this.FDebug && i.length>0) this.debug('atualizando JS');

				for( j = i.length-1; j>=0; j-=1 ) {
					let script = createElement('script', {id:aModule + j.toFormated("00")} , aData.main[h]);
					script.type= 'text/javascript';
					if( i[j].src ) {
						script.src = i[j].src;
					} else {
						script.innerHTML = i[j].innerHTML;
					}
					i[j].innerHTML = '';
					//head.appendChild(script);
					//eval(i[j].innerHTML);
					i[j].parentChild
				}

				//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				//Atualizando o DOM
				while( aData.main[h].firstChild ) {
					o.appendChild( aData.main[h].firstChild );
				}
			}
		}
	}

	//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	//Atualizando os valores do Formulário
	if( aData.data ) {
		for( h in aData.data ) {
			o = $o("in_"+aModule+"_"+h);
			if( o ) {

				if( o.nodeName == "INPUT") {
					o.value = aData.data[h]
				} else if( o.nodeName == "IMG") {
					o.src = aData.data[h];
				}
				if(this.FDebug) this.debug("in_"+aModule+"_"+h + "=" + aData.data[h] );
			} else {
			  if(this.FDebug) this.error("in_"+aModule+"_"+h + "=" + aData.data[h] );
		 	}
		}
	}

	//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	//Executando os comandos JS - Depois do processamento do pacote
	if( aData.js && aData.js.after ) {
		if( !isArray(aData.js.after ) )	aData.js.after=aData.js.after.split(';');
		for( i in aData.js.after ) {
			if(this.FDebug) this.debug('Executando comando JS after ' + aData.js.after[i] );
			aData.js.after[i] = eval(aData.js.after[i]);
		}
	}
};

/*	//------------------------------------------------
	//Definindo os Atributos padroes do formulario
	if( data.form.attrib )
		for( var h in data.form.attrib )
			this.FWindows[o].setAttribute( h , data.form.attrib[h] );
	//------------------------------------------------
	//Criando os modulos
	this.FWindows[o].create( data.form.container )
	//------------------------------------------------
	//Criando o Conteudo - Seja atraves do HTML Enviado ou atraves da codificacao
	if( data.form.module )
		this.addData( o , data.form.module );
	if( data.form.source && ( data.form.source = eval(data.form.source) ) && isFunction( data.form.source ) )
		this.addData( o , data.form.source( data.data ) );
	//------------------------------------------------
	//Adicionando os campos do formulariosetTimeout( function() { gl_Desktop.setSkin("rdittmar"); } , 3000) ;
setTimeout( function() { gl_Desktop.setSkin(""); }, 6000) ;
	if( data.field )
		this.FWindows[o].addField( data.field , data.seek || false )
	//------------------------------------------------
	//Gerenciamento de Abas
	if( data.form.tabs )
		this.addTabs( o , data.form.tabs );
	//------------------------------------------------
	//Cadastrando os eventos
	for( h in data.form.event )
		for( i in data.form.event[h] )
			this.addEvent( $(h) , i , data.form.event[h][i][0] , data.form.event[h][i][1] );
	//------------------------------------------------
	//Executa o javascript Apos criar o modulo
	if( data.js && data.js.after )
		for( h in data.js.after )
			if( ( data.js.after[h] = eval( data.js.after[h] ) ) && isFunction( data.js.after[h] ) )
				data.js.after[h]( data.data || false );*/

/*------------------=-----------=------------------------------------------------------------------------------
rpcServer           : Requisição de chamadas ao servidor os dados recebidos do servidor
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
param               :StAll                : Parametros para o POST
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcDesktop.prototype.rpcServer=function( aParam ) {
	let obj  = this;
	var ajax = new TcAjax( 'ajax-json.php', 'POST' , 'J' );
	var h;

	//ajax.debug = this.debug;

	if(this.FDebug) this.debug( );
	//------------------------------------------------
	//Adicionando os parametros
	for( h in aParam )
		ajax.addParam( h , aParam[h] );

	this.FPackage.FCount += 1;
	ajax.addParam( 'C', this.FPackage.FCount );

	//------------------------------------------------
	//Processando o retorno
	ajax.FProcess = function( ajax_request ) {
		var h

		//------------------------------------------------
		//Verificando o Pacote
		if( !(ajax_request = eval('('+ajax_request+')')) ) {
			obj.error( this.FMessage['ajax'] );
			return( false );
		}

		//------------------------------------------------
		//Debug
		if(obj.FDebug) obj.debug( ajax_request , 1 );

		//------------------------------------------------
		//Executa o javascript - BEFORE
		if( ajax_request.js && ajax_request.js.before ) {
			for( h in ajax_request.js.before )
				if( ( ajax_request.js.before[h] = eval( ajax_request.js.before[h] ) ) && isFunction(ajax_request.js.before[h]) )
					ajax_request.js.before[h]();
		}
		//------------------------------------------------
		//Processando os pacotes
		if( ajax_request.pkg ) {
			for( h in ajax_request.pkg )
				obj.processModule.call(obj , h , ajax_request.pkg[h] );
		}

		if( ajax_request.vd )	{
			for( h in ajax_request.vd )
				obj.processVideo.call(obj , h , ajax_request.vd[h] );
		}
/*    //Linguagem
		if( ajax_request.pkg.l )
			for( h in ajax_request.pkg.l )
				obj.processLanguage.call(obj , h , ajax_request.pkg.l[h] );
		//Grid do Formulario
		if( ajax_request.pkg.d )
			for( h in ajax_request.pkg.d )
				obj.processFormField.call(obj , h , ajax_request.pkg.d[h] );
		//Grid do Formulario
		if( ajax_request.pkg.f )
			for( h in ajax_request.pkg.f )
				obj.processForm.call(obj , h , ajax_request.pkg.f[h] );
		//Grid de Dados
		if( ajax_request.pkg.g )
			for( h in ajax_request.pkg.g )
				obj.processGrid.call(obj , h , ajax_request.pkg.g[h] );
		//Browse de Dados
		if( ajax_request.pkg.b )
			for( h in ajax_request.pkg.b )
				obj.processBrowse.call(obj , h , ajax_request.pkg.b[h] );
		//Grid do Formulario
		if( ajax_request.pkg.c )
			for( h in ajax_request.pkg.c )
				obj.processCompany.call(obj , ajax_request.pkg.c[h] );
		*/
		//------------------------------------------------
		//Executa o javascript AFTER
		if( ajax_request.js && ajax_request.js.after )
			for( h in ajax_request.js.after )
				if( ( ajax_request.js.after[h] = eval( ajax_request.js.after[h] ) ) && isFunction(ajax_request.js.after[h]) )
					ajax_request.js.after[h]();
		//------------------------------------------------
	}
	ajax.open();
	return(true);
};
