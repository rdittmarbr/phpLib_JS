"use strict"
/*-------------------------------------------------------------------------------------------------------------
Mantenedor     : Rodrigo Dittmar
Linguaguem     : javascript
Dependencia    : fx.js
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Modulo         : Manutenção dos elementos DOM
-------------------------------------------------------------------------------------------------------------*/


/*===========================================================================================================
Recuperacao de Elementos/propriedades DOM
/*------------------=-----------=------------------------------------------------------------------------------
$o                  : Retorna o elemento DOM referenciado pelo ID do documento
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :variant    : ID do elemento ( String ou DOM Element)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :DOM        : Elemento DOM ou Falso caso nao exista
-------------------------------------------------------------------------------------------------------------*/
function $o( o ) {
  o = ( isString(o) ? document.getElementById(o) : o );
  return( (isDom(o) ? o : false) );
}
/*------------------=-----------=------------------------------------------------------------------------------
v                   : Retorna o valor de um INPUT DOM
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :DOM        : objeto DOM
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :Variant    : Valor do DOM
-------------------------------------------------------------------------------------------------------------*/
function v( o ) {
  return( o.tagName.toLowerCase() == 'select' ? o.options[o.selectedIndex].value : o.value );
}
/*-----------------------------------------------------------------------------------------------------------
clearDom            : Limpa o objeto DOM
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   : DOM Object          : objeto DOM
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-----------------------------------------------------------------------------------------------------------*/
function clear( o ) {
  if( o.parentNode )
    o.parentNode.removeChild(o);
}
/*-----------------------------------------------------------------------------------------------------------
clearDomChild       : Limpa os objetos filhos
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   : DOM Object          : objeto DOM
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-----------------------------------------------------------------------------------------------------------*/
function clearChild( o ) {
  while( o.firstChild )
    o.removeChild(o.firstChild);
}
/*-----------------------------------------------------------------------------------------------------------
show                : Exibe um elemento dom via CSS
hide                : Oculta um elemento DOM via CSS
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :DOM Object           : objeto DOM
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-----------------------------------------------------------------------------------------------------------*/
function show( o ) { if(o){ o.style.display = 'block'; return(true);} else {return(false)} }
function hide( o ) { if(o){ o.style.display = 'none'; return(true);} else {return(false)} }
function setSH( o ) {
  if( o.currentStyle["display"] == 'none' ) { show(o) } else { hide(o) }
  console.log(o.currentStyle["display"]);
  return(true);
}

function getImgSize( o ) {
  return { width: o.naturalWidth, height: o.naturalHeight }
}

/*-----------------------------------------------------------------------------------------------------------
getElementPositionX : Retorna a posicao de um elemento X
getElementPositionY : Retorna a posicao de um elemento Y
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :DOM Object           : objeto DOM
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :integer              : Posicao do Elemento
-----------------------------------------------------------------------------------------------------------*/
function getElementPositionX( o ) { return getElementPosition( o ).x; }
function getElementPositionY( o ) { return getElementPosition( o ).y; }
/*-----------------------------------------------------------------------------------------------------------
getElementPosition  : Retorna a posicao de um elemento XY
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :DOM Object           : objeto DOM
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :Class Pointer        : Posicao do Elemento XY
-----------------------------------------------------------------------------------------------------------*/
function getElementPosition( o ) {
  var oParent,pos = new StPointer();
  oParent = o.offsetParent;
  while((oParent = o.offsetParent) != null) {
    pos.x += o.offsetLeft;
    pos.y += o.offsetTop;
    o = oParent;
  }
  return(pos);
}
/*-----------------------------------------------------------------------------------------------------------
getCursorPosition   : Retorna a posicao do cursor em um elemento
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :DOM Object           : objeto DOM
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :Class Pointer        : Posicao do Elemento XY
-----------------------------------------------------------------------------------------------------------*/
function getCursorPosition( o ) {
  var ins,pos,range;
  ins   = ( esDesktop.FEdit.FInsert ? 1 : 0 );
  pos   = new StCursorPosition();
  range = ( document.selection ? document.selection.createRange().duplicate() : false );   // Variavel IE
  pos.start = ( o.selectionStart ? o.selectionStart : ( range ? Math.abs( range.moveStart("character", -100000)) : 0 ) );
  pos.end   = ( o.selectionEnd   ? o.selectionEnd   : ( range ? Math.abs( range.moveEnd("character", -100000 )) : 0 ) );
  //Verifica se o insert esta pressionado...
  pos.end   = ( pos.start == pos.end && ins > 0 ? pos.end+1 : pos.end );
  return( pos );
}
/*-----------------------------------------------------------------------------------------------------------
setCursorPosition   : Altera a posicao do cursor em um elemento
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :DOM Object           : objeto DOM
pos                 :Class Pointer        : Posicao do cursor
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :Class Pointer        : Posicao do Elemento XY
-----------------------------------------------------------------------------------------------------------*/
function setCursorPosition( o , pos ) {
  if( !isIE ) {
    o.setSelectionRange( pos.start , pos.end );
  } else {
    //Alterando a posicao do cursor
    var range = o.createTextRange();
    range.moveStart("character", pos.start );
    range.moveEnd("character", pos.end );
    range.select();
  }
}
/*-----------------------------------------------------------------------------------------------------------
getStyle            : Recupera um valor/elemento de estilo
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :DOM Object           : objeto DOM
attrib              :string               : Attributo do elemento a recuperar o valor
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :string               : Atributos da Tag
-----------------------------------------------------------------------------------------------------------*/
function getStyle( o , attrib ) {
  return o.currentStyle["attrib"];
}
/*===========================================================================================================
Manipulacao das propriedades dos elementos DOM
/*-----------------------------------------------------------------------------------------------------------
setWidth            : Altera a Largura de uma tag
setHeight           : Altera a Altura de uma tag
setTop              : Altera a Altura de uma tag
setLeft             : Altera a Altura de uma tag
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :string               : ID do elemento
attrib              :integer              : Tamanho
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-----------------------------------------------------------------------------------------------------------*/
function setWidth( o , attrib ) { o.style.width = attrib + 'px'; }
function setHeight( o , attrib ){ o.style.height = attrib + 'px'; }
function setTop( o , attrib )   { o.style.top = attrib + 'px'; }
function setLeft( o , attrib )  { o.style.left = attrib + 'px'; }
/*-----------------------------------------------------------------------------------------------------------
getAttribute        : Recupera um atributo de uma tag
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :DOM Object           : objeto DOM
attrib              :string               : Attributo do elemento a recuperar o valor
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :string               : Atributos da Tag
-----------------------------------------------------------------------------------------------------------*/
function getAttribute( o , attrib ) {
  return( o.getAttribute( attrib ) );
}
/*-----------------------------------------------------------------------------------------------------------
removeAttribute     : Remove um atributo de uma tag e retorna seu valor
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :DOM Object           : objeto DOM
attrib              :string               : Attributo do elemento a recuperar o valor
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :string               : Atributos da Tag
-----------------------------------------------------------------------------------------------------------*/
function removeAttribute( o , attrib ) {
  return( o.removeAttribute( attrib ) );
}
/*-----------------------------------------------------------------------------------------------------------
setAttribute        : Altera os atributos/eventos de uma TAG
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :DOM Object           : objeto DOM
attrib              :string               : Attributo do elemento (attrib1=valor1;attrib2=valor2;...)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :Object DOM           : Objeto DOM
-----------------------------------------------------------------------------------------------------------*/
function setAttribute( o , attrib ) {
  var h,i
  for( h in attrib ) {
    //Tratando as excessoes
    if( h == 'text' && o.tagName.toLowerCase()!='body') {
      createText( attrib[h] , o );
    } else if( h == 'src' && o.tagName.toLowerCase()=='img') {
      o.src = attrib[h];
    } else if( isIE && pAttrib[h] && isString( pAttrib[h][0] ) ) { //Tratando Atributos IE
      o.setAttribute( pAttrib[h][0] , attrib[h] );
    } else {
      if( h == 'value' ) {
        o.value = attrib[h];
      } else if( h == 'style' ) {
        if( isArray( attrib[h] ) ) {
          for( i in attrib[h] ) {
            o.style[i] = attrib[h][i];
          }
        } else {
          attrib[h] = attrib[h].split(";");
          for( i in attrib[h] ) {
            attrib[h][i] = attrib[h][i].split(":");
            o.style[attrib[h][i][0]] = attrib[h][i][1];
          }
        }
      } else if( attrib[h]) {
        o.setAttribute( h , attrib[h] );
      }
    }
  }
}
/*===========================================================================================================
Manipulacao das classes dos Elementos DOM
/*-----------------------------------------------------------------------------------------------------------
hasClass            : Verifica se um determinado elemento possui uma Classe
replaceClass        : Substitui a classe antiga pela nova
addClass            : Adiciona uma classe a um elemento
removeClass         : Exclui uma classe de um elemento
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :DOM Object           : objeto DOM PAI
className           :string               : Nome da classe
oldClassName        :string               : Nome da classe antiga
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :boolean              : Sucesso/Fracasso
-----------------------------------------------------------------------------------------------------------*/
function hasClass( o , className ) {
  return ( o.className && o.className.match( new RegExp( "\\b"+className+"\\b" ) ) ) ? true : false;
}
function replaceClass( o , className , oldClassName ) {
  if ( hasClass (o , className ) ) {
    removeClass( o , className );
    addClass( o , oldClassName );
    return( true )
  }
  return( false )
}
function addClass( o , className ) {
  if ( !hasClass (o , className ) ) {
    if ( o.className && o.className.length > 0 )
      className = o.className+" "+className;
    o.className = className;
    return( true )
  }
  return( false )
}
function removeClass( o , className ) {
  if ( hasClass ( o , className ) ) {
    o.className = o.className.replace ( new RegExp( "\\b"+className+"\\b" ), "" );
    return( true )
  }
  return( false )
}
/*===========================================================================================================
Manipulacao dos Elementos DOM
/*-----------------------------------------------------------------------------------------------------------
insertAfter         : Insere um elemento apos outro n�
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
m                   :DOM Object           : objeto DOM IRMAO NOVO
o                   :DOM Object           : objeto DOM IRMAO
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-----------------------------------------------------------------------------------------------------------*/
function insertAfter( m , o ) {
  if( o && m ) { o.parentNode.insertBefore( m , o.nextSibling ); return( true ) }
  return( false );
}
/*-----------------------------------------------------------------------------------------------------------
insertBefore        : Insere um elemento antes de outro n�
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
m                   :DOM Object           : objeto DOM IRMAO NOVO
o                   :DOM Object           : objeto DOM IRMAO
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-----------------------------------------------------------------------------------------------------------*/
function insertBefore( m , o ) {
  if( o && m ) { o.parentNode.insertBefore( m , o ); return( true ) }
  else return( false );
}
/*-----------------------------------------------------------------------------------------------------------
createText          : Cria uma TAG DOM de texto
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
t                   :string               : Texto a inserir
o                   :DOM Object           : objeto DOM PAI
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :Object DOM           : Objeto DOM
-----------------------------------------------------------------------------------------------------------*/
function createText( t , o ) {
  var m = document.createTextNode( t );
  if( o ) o.appendChild( m );
    return( m );
}
/*-----------------------------------------------------------------------------------------------------------
createElement       : Cria uma Elemento DOM de acordo com o element
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
element             :string               : Elemento DOM
attrib              :string               : Attributos do elemento
o                   :DOM Object           : objeto DOM PAI
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :Object DOM           : Objeto DOM
-----------------------------------------------------------------------------------------------------------*/
function createElement( element , attrib , o ) {
  var m = document.createElement( element );
  setAttribute( m , attrib );
  if( o ) o.appendChild( m );
    return( m );
}
/*-----------------------------------------------------------------------------------------------------------
create*             : Cria uma as TAGS Respectivas
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
attrib              :string               : Attributos do elemento
o                   :DOM Object           : objeto DOM PAI
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :Object DOM           : Objeto DOM
-----------------------------------------------------------------------------------------------------------*/
function createForm( attrib , o ) { return( createElement( 'form' , attrib , o ) ); }
function createDiv( attrib , o ) { return( createElement( 'div' , attrib , o ) ); }
function createSpan( attrib , o ) { return( createElement( 'span' , attrib , o ) ); }
function createLabel( attrib , o ) { return( createElement( 'label' , attrib , o ) ); }
function createP( attrib , o ) { return( createElement( 'p' , attrib , o ) ); }
function createTable( attrib , o ) { return( createElement('table' , attrib , o ) ); }
function createTableBody( attrib , o ) { return( createElement( 'tbody' , attrib , o ) ); }
function createTableRow( attrib , o ) { return( createElement( 'tr' , attrib , o ) ); }
function createTableCol( attrib , o ) { return( createElement( 'td' , attrib , o ) ); }
function createTableHead( attrib , o ) { return( createElement( 'th' , attrib , o ) ); }
/*-----------------------------------------------------------------------------------------------------------
createSelect        : Cria um objeto Select
createOption        : Cria as opcoes do select
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
attrib              :string               : Attributos do elemento
o                   :string               : objeto DOM PAI
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :Object DOM           : Objeto DOM
-----------------------------------------------------------------------------------------------------------*/
function createSelect( attrib , o ) { return( createElement( 'select' , attrib , o ) ); }
function createOption( attrib , o ) { return( createElement( 'option' , attrib , o ) ); }
/*-----------------------------------------------------------------------------------------------------------
createUL            : Cria uma Listagem UL / LI
createLI            : Cria uma Listagem UL / LI
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
attrib              :string               : Attributos do elemento
o                   :string               : objeto DOM PAI
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :Object DOM           : Objeto DOM
-----------------------------------------------------------------------------------------------------------*/
function createUL( attrib , o ) { return( createElement( 'ul' , attrib , o ) ); }
function createLI( attrib , o ) { return( createElement( 'li' , attrib , o ) ); }
/*-----------------------------------------------------------------------------------------------------------
createImg           : Cria uma TAG de IMAGEM
createButton        : Cria uma TAG DOM do elemento button
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
attrib              :string               : Attributos do elemento
o                   :string               : objeto DOM PAI
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :Object DOM           : Objeto DOM
-----------------------------------------------------------------------------------------------------------*/
function createImg( attrib , o ) { return( createElement( 'img' , attrib , o ) ); }
function createButton( attrib , o ) { return( createElement( 'button' , attrib , o ) ); }
/*-----------------------------------------------------------------------------------------------------------
createInput         : Cria um campo (Input)
createCheckBox      : Cria um objeto CheckBox
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
attrib              :string               : Attributos do elemento
o                   :string               : objeto DOM PAI
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :Object DOM           : Objeto DOM
-----------------------------------------------------------------------------------------------------------*/
function createInput( attrib , o ) { return( createElement( 'input' , attrib , o ) ); }
function createCheckbox( attrib , o ) { attrib['type']='checkbox'; return( createInput( attrib , o ) ); }
/*===========================================================================================================
Manipulacao de Formularios
/*-----------------------------------------------------------------------------------------------------------
focus               : Seta o foco em uma tag podendo passar o tempo em microtime
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :variant              : ID do elemento ( String ou DOM Element)
t                   :integer              : tempo para ir ao foco
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-----------------------------------------------------------------------------------------------------------*/
function focus( o , t ) {
  if( isNumber( t ) ) {
    setTimeout( 'focus($o("'+o.id+'"))' , t );
  } else {
    try {
      setCursorPosition( o , {'start':0,'end':0} );
      o.select();
      o.focus();
    } catch(e) {};
  }
  return(true);
}


//Contem opcoes para os atributos (atributo utilizado , atributo IE/Opera , Conversao de Retorno Char/Inteiro )
var pAttrib = new Array();
pAttrib = { 'maxlength': ['maxLength' , true ],
            'colspan'  : ['colSpan'   , true ],
            'rowspan'  : ['rowSpan'   , true ],
            'class'    : ['className' , false ],
            'style'    : ['style'     , false ],
            'padding-right' :['paddingRight' , true ],
            'padding-left'  :['paddingLeft'  , true ],
            'padding-top'   :['paddingTop'   , true ],
            'padding-bottom':['paddingBottom', true ],
            'border-right-width' :['borderRightWidth' , true ],
            'border-left-width'  :['borderRightWidth' , true ],
            'border-top-width'   :['borderTopWidth'   , true ],
            'border-bottom-width':['borderBottomWidth', true ] };
/*===========================================================================================================
Manipulacao de Eventos
/*-----------------------------------------------------------------------------------------------------------
addEvent            : Adiciona um evento a um elemento DOM
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :DOM Object           : objeto DOM
event               :string               : nome do evento
js                  :string               : codigo javascript
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :boolean              : sucesso ou fracasso
-----------------------------------------------------------------------------------------------------------*/
function addEvent( o , event , js ) {
  o.addEventListener ? o.addEventListener( event , js , false ) : (o.attachEvent ? o.attachEvent( "on"+event , js ) : false )
}
/*-----------------------------------------------------------------------------------------------------------
stopPropagation     : Para a propagacao de um evento
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
event               :DOM Object           : objeto DOM
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :boolean              : sempre False
-----------------------------------------------------------------------------------------------------------*/
function stopPropagation( event ) {
  //Evitando a propagacao do evento
  event.cancelBubble = true;
  event.returnValue  = false;
  if( event.stopPropagation ) { //Firefox
    event.stopPropagation();
    event.preventDefault();
  }
  return( false );
}
/*-----------------------------------------------------------------------------------------------------------
setHover     : Evento de sobreposição do mouse
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :DOM Object           : objeto DOM
onCode              :string               : codigo javascript quando o mouse "entrar"
outCode             :string               : codigo javascript quando o mouse "sair"

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

-----------------------------------------------------------------------------------------------------------*/
function setHover(o, onCode, outCode) {
  o.addEventListener('mouseover', onCode);
  o.addEventListener('mouseout', outCode);

}
