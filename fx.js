/*-----------------------------------------------------------------------------------------------------------
Mantenedor     : Rodrigo Dittmar / rodrigo.dittmar@gmail.com
Linguaguem     : javascript (2.1)
Dependencia    :
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Modulo         : Funcoes auxiliares
-----------------------------------------------------------------------------------------------------------*/

function trim( o ) {o += ''; return o.trim(); }
function jsonData(aKey,aData) {
  return aKey + ':' + encodeURIComponent(aData);
}
/*-----------------------------------------------------------------------------------------------------------
is*                 : Verifica o tipo de variavel
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
o                   :Variant              : Valor para teste da variavel
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :Boolean              : True or False
-----------------------------------------------------------------------------------------------------------*/
function isBoolean( o ) { return typeof(o) == 'boolean'; }
function isString( o )  { return typeof(o) == 'string'; }
function isDate( o )    { return isObject(o) && o.constructor == Date; }
function isNumber( o )  { return typeof(o) == 'number' && isFinite(o) }
function isInteger ( o ){ return isNumber(o) && o%1 == 0; }
function isNull( o )    { return typeof(o) == 'undefined' && !o; }
function isBlank( o )   { return o.length == 0 }
function isArray( o )   { return isObject(o) && o.constructor == Array; }
function isFunction( o ){ return typeof(o) == 'function'; }
function isObject( o )  { return (o && typeof(o) == 'object') || isFunction(o); }
function isDom( o )     { return o && (typeof(o.childNodes) !== 'undefined' || o.nodeType); }
/*-----------------------------------------------------------------------------------------------------------
strComp             : Duplica N* uma string de parametro
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
value               :string               : String Original
length              :integer              : Numero de Vezes Duplicada
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :string               : String Modificada
-----------------------------------------------------------------------------------------------------------*/
function strComp( value , length ) {
  var newValue = '';
  while( length > 0 ) {
    newValue +=value ;
    length --;
  }
  return( newValue );
}
/*-----------------------------------------------------------------------------------------------------------
dateBR              : Converte uma data object para um formato passado pela string
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
format              :string               : Array para contagem de valores
                                          :      d	Dia do mês ( 1 a 31 )
                                          :      D	Dia do mês ( 01 a 31 )
                                          :      r  Representação textual reduzida de um dia da semana ( S para Segunda, T para terça...)
                                          :      l  Representação textual abreviada de um dia da semana ( Seg, ter, qua... )
                                          :      L  Representação textual de um dia da semana ( Segunda-Feira )
                                          :      m	Representação numérica de um mês ( 1 a 12 )
                                          :      M  Representação numérica de um mês ( 01 a 12 )
                                          :      n	Representação textual abreviada de um mês (Jan, Fev... )
                                          :      N	Representação textual de um mês (Janeiro, Fevereiro... )
                                          :      Y	Ano ( 2007 )
                                          :      y	ano ( 07 )
date                :Object Date          : Data no formato Date
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    :string               : Extenso da data convertido
-----------------------------------------------------------------------------------------------------------*/
function dateBR( format  , date ) {
  if( !(date) || !isDate(date) ) date = new Date();
  if( !(format) ) format = '[L], [D] de [N] de [Y]';
  var h, aMes, aDia, aRep;

  aMes = [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ,
           'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ];
  aDia = [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ,
           'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S�b' ,
           'Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado' ];
  aRep = { '[d]' : date.getDate(),
           '[D]' : (date.getDate()<10?'0':'')+date.getDate(),
           '[r]' : aDia[date.getDay()],
           '[l]' : aDia[date.getDay()+7],
           '[L]' : aDia[date.getDay()+7],
           '[m]' : date.getMonth()+1,
           '[M]' : ((date.getMonth()+1)<10?'0':'')+(date.getMonth()+1),
           '[n]' : aMes[date.getMonth()],
           '[N]' : aMes[date.getMonth()+10],
           '[y]' : (date.getFullYear()%1000<10?'0':'') + (date.getFullYear()%1000),
           '[Y]' : date.getFullYear()}
  for( h in aRep )
    format = format.replace( h , aRep[h] );
  return(format);
}


// Adaptado de : https://stackoverflow.com/questions/29572466/how-do-you-find-out-the-caller-function-in-javascript-when-use-strict-is-enabled
function getStack( a ) {
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
