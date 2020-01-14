"use strict"
/*-------------------------------------------------------------------------------------------------------------
Mantenedor     : Rodrigo Dittmar
Linguaguem     : javascript
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Modulo         : Manipulação de cookies
Dependencia    : TcAjax
------------------------------------------------------------------------------------------------------------*/

/*=============================================================================================================
Manipulação de cookies
/*------------------=------------=-----------------------------------------------------------------------------
TcCookies           :Classe de manutencao dos cookies (Ao criar recupera todos os cookies do sistema)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
aGet                :boolean     : Carrega todos os cookies do site via ajax
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
function TcCookies( aGet ) {
	this.FCount = 0;        // numero de cookies
	this.FCookie = [];      // array de TcCookie

  this.debug = false;        // função de debug
	this.get( aGet || false ); // carrega todos os cookies

	this.debug = false;     // função de debug
}
/*------------------=-----------=------------------------------------------------------------------------------
count               :Retorna a quantidade de cookies alocados
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcCookies.prototype.count = function () {return this.FCount;}
/*------------------=-----------=------------------------------------------------------------------------------
get                 :recupera todos os cookies
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
aClean              :boolean    : Força a limpeza dos cookies da classe (apaga os cookies para recuperar)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcCookies.prototype.get = function( aClean ) {
	let aCookie,i,j;

	// Limpar os cookies dentro da classe
	if( aClean ) {this.FCookie = []; this.FCount=0;}
  if( this.debug ) this.debug( aClean );

	//Transforma a string cookie em array, separado por ;
	aCookie = document.cookie.split(/\s*;\s*/); // Evitando o problema do cookie precedido por espaço
	j = aCookie.length;   // não atualizar this.FCount - duplicação de cookies por utilizarem path
	for(i = 0; i < j ; i++) {
		aCookie[i] = aCookie[i].split(/\s*=\s*/,2);

		//Evitando duplicação do cookie (javascrpt não le o parametro 'path')
		if( !( this.FCookie[aCookie[i][0]] )) {
			this.FCookie[aCookie[i][0]] = new TcCookie( aCookie[i][0], aCookie[i][1] );
			++this.FCount;
		}

	}
	return null;
}
/*------------------=-----------=------------------------------------------------------------------------------
isset               :verifica se o Cookie existe
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
aCookie             :string     : Nome do Cookie
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
										:boolean    : True se existe / False se não existe
-------------------------------------------------------------------------------------------------------------*/
TcCookies.prototype.isSet = function( aCookie ) {
  if( this.debug ) this.debug();
	return( (this.FCookie[aCookie] ) );
}
/*------------------=-----------=------------------------------------------------------------------------------
add                 :adiciona um cookie na classe e sincroniza com o site
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
aCookie             :string     : Nome do Cookie
aValue              :string     : Valor do Cookie
aExpires            :variable   : Data de validade do cookie (em inteiro - MaxAge, em String - Expires)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcCookies.prototype.add = function( aCookie, aValue , aExpires ) {
  if( this.debug ) this.debug();

	this.FCookie[aCookie] = new TcCookie( aCookie , aValue , aExpires );
	this.FCookie[aCookie].set();
	++this.FCount;
	return true;
}
/*------------------=-----------=-----------------------------------------------------------------------------
delete              :Exclui um cookie da classe e do site
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
aCookie             :string     : Nome do Cookie
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------------------------------------------*/
TcCookies.prototype.delete = function( aCookie ) {
  if( this.debug ) this.debug();

	if( this.FCookie[aCookie] ) {
		this.FCookie[aCookie].delete();
		delete this.FCookie[aCookie];
		--this.FCount;
		return true;
	} else {
		// se o cookie não estiver setado na array, busca o cookie no site e elimina
		let a = new TcCookie(aCookie);
		a.get();
		a.delete();
		return true;
	}
	return false;
}
/*------------------=-----------=------------------------------------------------------------------------------
TcCookie            :Classe de manutencao do cookie - Filha do TcCookies
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
aName               :string     : Nome do Cookie
aValue              :string     : Valor do Cookie
aExpires            :variable   : Data de validade do cookie (em inteiro - MaxAge, em String - Expires)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
function TcCookie( aName  , aValue , aExpires ) {
	this.FName  = aName || '';   // Cookie
	this.FValue = aValue || '';  // valor
	this.FPath = '';             // path - Parametro não está definido para acesso via navegador

	// Se o objeto
	if( isNumber( aExpires ) ) {
		this.FExpires = '';                      // data de validade
		this.FMaxAge = 86400 || aExpires;        // validade em segundos (1 dia - 60*60*24)
	} else if( isString( aExpires ) ) {
		this.FExpires = '' || aExpires ;         // data de validade
		this.FMaxAge = '';                       // validade em segundos (1 dia - 60*60*24)
	} else {
		this.FExpires = '';                      // data de validade
		this.FMaxAge = 86400;                    // validade em segundos (1 dia - 60*60*24)
	}

	// Se o valor for em branco, busca o cookie no site
	if( this.FValue == '' )
		this.get();
	else
		this.set();

	return true;
}
/*------------------=-----------=------------------------------------------------------------------------------
set                 :define o valor do cookie
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
aValue              :string     :valor do cookie, se não enviado, atualiza com o valor da classe
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcCookie.prototype.set = function( aValue ) {
	let aCookie = '';
	if( this.FName == '' ) {
		return false;
	}
	this.FValue = aValue || this.FValue;
	aCookie = this.FName + '=' + this.FValue;
	aCookie += ( ( this.FPath == '' ) ? '' : ';path='+this.FPath );
	aCookie += ( ( this.FExpires == '' ) ? '' : ';expires='+this.FExpires );
	aCookie += ( ( this.FMaxAge == '' ) ? '' : ';maxage='+this.FMaxAge );
	document.cookie = aCookie;
	return null;
};
/*------------------=-----------=------------------------------------------------------------------------------
get                 :Recupera o valor do cookie presente no site
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
aName               :string     :Nome do Cookie
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcCookie.prototype.get = function( aName ) {
	let i,j;
	let aCookie = document.cookie.split(/\s*;\s*/);
	this.FName = aName || this.FName;
	for (i = 0; i < aCookie.length -1 ; i++) {
		let j = aCookie[i].split(/\s*=\s*/,2);
		if( trim(j[0]) === this.FName ) {
			this.FValue = j[1];
			this.FMaxAge = 0;
			this.FExpires = '';
			this.FPath = '';
			break;
		}
	}
	return true;
}
/*------------------=-----------=------------------------------------------------------------------------------
delete              :Elimina um cookie, mas ainda mantem a classe do cookie
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
aName               :string     :Nome do Cookie
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
TcCookie.prototype.delete = function( aName ) {
	let aDate = new Date('2000,1,1');
	let aCookie = aName || this.FName + '=';
	aCookie += ';expires='+aDate.toGMTString();
	document.cookie = aCookie;
	return true;
}
