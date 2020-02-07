"use strict"
/*-------------------------------------------------------------------------------------------------------------
Mantenedor     : Rodrigo Dittmar
Linguaguem     : javascript
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Modulo         : TcGUI - Gerenciamento das definições das interfaces GUI
Dependencias   : TcDesktop
-------------------------------------------------------------------------------------------------------------*/

/*------------------=-----------=------------------------------------------------------------------------------
TcGUI               : Gerenciamento da interface com o usuário
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-------------------------------------------------------------------------------------------------------------*/
class TcGUI {
	/*------------------=-----------=----------------------------------------------------------------------------
	constructor         : Constroi a Classe
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	-----------------------------------------------------------------------------------------------------------*/
	constructor( ) {
	  this.debug = false;        // função de debug
	}
  /*------------------=-----------=----------------------------------------------------------------------------
	setMenu   					: Imprime o menu no DIV indicado
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	aDOM  						  :DOM        : Objeto DOM
	aMenu               :JSon       : Objeto JSON (Estrutura Menu)
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	-----------------------------------------------------------------------------------------------------------*/
	setMenu( aDom, aMenu ) {
  	if( this.debug ) this.debug( aDom, aMenu );
alert("a")
/*
		// Criando os menus superiores
		$i = 0;
		foreach( $gl_System -> Menu -> Item as $aRow ) {
		  $aRow = json_decode($aRow);
		  print("
		<a id='{$aRow->id}' href='{$gl_System -> URL }{$aRow->href}' aria-label='{$aRow->text}' class='link-item'>
		<div class='header-item'>{$aRow->menu}</div>
		</a>\n");
		  $i ++;
		  if( $i >= $gl_System -> Menu -> Show  )
		    break;
		}  <nav id='id_mnu_system' class="header__items">
		    <div class="header-item ">
		      <div>Mais
		        <span class="header-item__more-icon">
		        <svg class="arrow-icon down" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" preserveAspectRatio="xMinYMin meet">
		          <g><g transform="translate(261.928932, 262.000000) rotate(45.000000) translate(-261.928932, -262.000000) translate(76.928932, 77.000000)">
		            <g><path d="M146.537,223.463l277.301,0c11.343,0,20.537,9.197,20.536,20.541l0.001, 30.81 c-0.001,11.345-9.197,20.541-20.539,20.541l-328.654,0c-5.671, 0-10.805-2.299-14.521-6.015 c-3.718-3.719-6.017-8.853-6.017-14.523l0-328.654c0.001-11.342, 9.197-20.538,20.541-20.539l30.809,0 c11.344,0,20.541,9.197,20.541,20.537l-0.001, 277.301L146.537,223.463z"> </path></g>
		            <g><path d="M146.537,223.463l277.301,0c11.343,0,20.537,9.197,20.536,20.541l0.001, 30.81 c-0.001,11.345-9.197,20.541-20.539,20.541l-328.654,0c-5.671, 0-10.805-2.299-14.521-6.015 c-3.718-3.719-6.017-8.853-6.017-14.523l0-328.654c0.001-11.342, 9.197-20.538,20.541-20.539l30.809,0 c11.344,0,20.541,9.197,20.541,20.537l-0.001, 277.301L146.537,223.463z"> </path></g></g>
		          </g>
		        </svg></span>
		      </div>
		      <div class="menu-more-items header__fade-menu-dropdown">
		<?php
		// Criando os menus superiores
		$i = 0;
		foreach( $gl_System -> Menu -> Item as $aRow ) {
		  if( $i >= $gl_System -> Menu -> Show ) {
		    $aRow = json_decode($aRow);
		    print("
		<a id='{$aRow->id}' href='{$gl_System->URL}{$aRow->href}' aria-label='{$aRow->text}' class='menu-more-items__item'>
		<div>{$aRow->link}</div>
		</a>\n");
		  }
		    $i++;
		}
		unset($i);
		?>

		      </div>
		    </div>
		  </nav>*/

	}
}
