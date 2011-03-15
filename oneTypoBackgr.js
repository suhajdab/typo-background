var oneTypoBackgr = ( function ( doc ) {
	
	var elms;
	
	var opts;
	
	function getElement( selector ) {
    var elms;
    if ( selector instanceof Array ) elms = selector.filter( function( item ){ return item !== undefined && item !== null });
    else if ( selector instanceof Element || selector === window ) elms = [selector];
    else if ( selector.constructor == 'NodeListConstructor' ) { elms = []; for ( var i = 0, l = selector.length; i < l; i++ ) elms.push( selector.item( i ) ); }
    else elms = Array.prototype.slice.call( document.querySelectorAll( selector ) );

    return elms;
  }

	function setup ( selector, options ) {
		if ( this instanceof Element ) {
			selector = this;
			options = selector;
		}
	  opts = extend( defaults, options );
		elms = getElement( selector );
		elms.forEach( typofill );
	}
	
	function typofill ( el ) {
		createElements( el );
	}
	
	function createElements ( el ) {
		var cont, str = '', str2 = '';
		for ( var i = 1; i < opts.layers; i++ ) {
			cont = document.createElement( 'div' );
			cont.className = 'one-tb-layer one-tb-layer' + i;
			for ( var k = 0; k < i; k ++ ) {
				str += opts.text + ' ';
			}
			[].forEach.call( str, function ( t ) {
				str2 += t + ( Math.random() > 0.9 ? ' ' : '' );
			});
			cont.innerHTML = str2;
			el.appendChild( cont );
			var maxH = el.offsetHeight * ( 0.7 + 0.3 * i / opts.layers );
			cont.style.textShadow = '0px 0px ' + ( opts.layers - i ) + 'px #000';
			autoSize( cont, maxH );
		}
	}
	
	function autoSize ( el, maxH ) {
		var fontSize = opts.maxFontSize;
		do {
			el.style.fontSize = fontSize + 'px';
			el.style.lineHeight = fontSize / 2 + 'px';
			textH = el.offsetHeight;
			fontSize = Math.floor( fontSize / 1.2 );
		} while ( textH > maxH && fontSize > opts.minFontSize )
	}
	
	function extend ( target, source ){ 
	  for ( key in source ) target[ key ] = source[ key ]; 
	  return target;
	}
	
	defaults = {
	  text: 'qwertyuiopasdfghjklzxcvbnm',
	  maxFontSize: 512,
	  minFontSize: 28,
	  layers: 6
	}

	NodeList.prototype.oneTypoBackgr = Element.prototype.oneTypoBackgr = setup;

	return setup;
})( document );