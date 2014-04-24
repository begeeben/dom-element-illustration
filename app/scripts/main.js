'use strict';

var container, contentElement, wrapperElement,
	clientHeightElement, offsetHeightElement, scrollHeightElement,
	// defaultScrollHeightElementWidth,
	// defaultScrollWidthElementHeight,
	clientWidthElement, offsetWidthElement, scrollWidthElement,
	mockContentElement;
	// animationId;

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

// (function() {
// 	var lastTime = 0;
// 	var vendors = ['ms', 'moz', 'webkit', 'o'];
// 	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
// 		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
// 		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
// 	}

// 	if (!window.requestAnimationFrame) {
// 		window.requestAnimationFrame = function(callback, element) {
// 			var currTime = new Date().getTime();
// 			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
// 			var id = window.setTimeout(function() {
// 					callback(currTime + timeToCall);
// 				},
// 				timeToCall);
// 			lastTime = currTime + timeToCall;
// 			return id;
// 		};
// 	}

// 	if (!window.cancelAnimationFrame) {
// 		window.cancelAnimationFrame = function(id) {
// 			clearTimeout(id);
// 		};
// 	}
// }());

// function addClass(el, className) {
// 	if (el.classList) {
// 		el.classList.add(className);
// 	} else {
// 		el.className += ' ' + className;
// 	}
// }

// function removeClass(el, className) {
// 	if (el.classList) {
// 		el.classList.remove(className);
// 	} else {
// 		el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
// 	}
// }

function toggleClass(el, className) {
	if (el.classList) {
		el.classList.toggle(className);
	} else {
		var classes = el.className.split(' ');
		var existingIndex = classes.indexOf(className);

		if (existingIndex >= 0) {
			classes.splice(existingIndex, 1);
		} else {
			classes.push(className);
		}

		el.className = classes.join(' ');
	}
}

function getY(element, container) {
	var y = 0;
	while (element && element !== container) {
		y += element.offsetTop;
		element = element.offsetParent;
	}
	return y;
}

function getX(element, container) {
	var x = 0;
	while (element && element !== container) {
		x += element.offsetLeft;
		element = element.offsetParent;
	}
	return x;
}

function updateMock() {
	var x = getX(contentElement, container),
		y = getY(contentElement, container);
	var wrapperX = getX(wrapperElement, container),
		wrapperY = getY(wrapperElement, container);

	var wrapperStyle = getComputedStyle(wrapperElement);
	var paddingTop = parseInt(wrapperStyle.paddingTop);
	var paddingLeft = paddingTop;
	var marginTop = parseInt(wrapperStyle.marginTop);
	var marginLeft = marginTop;
	var borderTopWidth = parseInt(wrapperStyle.borderTopWidth);
	var borderLeftWidth = borderTopWidth;

	mockContentElement.style.top = y - paddingTop - wrapperElement.scrollTop + 'px';
	mockContentElement.style.left = x - paddingLeft - wrapperElement.scrollLeft + 'px';
	mockContentElement.style.borderWidth = wrapperStyle.padding;
	if (wrapperElement.scrollWidth > wrapperElement.clientWidth) {
		mockContentElement.style.borderRightWidth = 0;
	}

	scrollHeightElement.style.top = mockContentElement.style.top;
	scrollHeightElement.style.left = mockContentElement.style.left;
	scrollHeightElement.style.width = 580 + wrapperElement.scrollLeft - marginLeft - borderLeftWidth + 'px';
	scrollHeightElement.style.height = wrapperElement.scrollHeight + 'px';
	scrollWidthElement.style.top = mockContentElement.style.top;
	scrollWidthElement.style.left = mockContentElement.style.left;
	scrollWidthElement.style.width = wrapperElement.scrollWidth + 'px';
	scrollWidthElement.style.height = 410 + wrapperElement.scrollTop - marginTop - borderTopWidth + 'px';

	clientHeightElement.style.top = y - paddingTop + 'px';
	clientHeightElement.style.left = x - paddingLeft  + 'px';
	clientHeightElement.style.width = 750  - marginLeft - borderLeftWidth + 'px';
	clientHeightElement.style.height = wrapperElement.clientHeight + 'px';
	clientWidthElement.style.top = y - paddingTop + 'px';
	clientWidthElement.style.left = x - paddingLeft + 'px';
	clientWidthElement.style.width = wrapperElement.clientWidth + 'px';
	clientWidthElement.style.height = 445 - marginLeft - borderTopWidth + 'px';

	offsetHeightElement.style.top = wrapperY + 'px';
	offsetHeightElement.style.left = wrapperX + 'px';
	offsetHeightElement.style.width = 770 - marginLeft + 'px';
	offsetHeightElement.style.height = wrapperElement.offsetHeight + 'px';
	offsetWidthElement.style.top = wrapperY + 'px';
	offsetWidthElement.style.left = wrapperX + 'px';
	offsetWidthElement.style.width = wrapperElement.offsetWidth + 'px';
	offsetWidthElement.style.height = 470 - marginTop + 'px';
}

function updateInfo() {
	clientHeightElement.innerHTML = 'clientHeight: ' + wrapperElement.clientHeight + 'px';
	offsetHeightElement.innerHTML = 'offsetHeight: ' + wrapperElement.offsetHeight + 'px';
	scrollHeightElement.innerHTML = 'scrollHeight: ' + wrapperElement.scrollHeight + 'px';

	clientWidthElement.querySelector('.width-text').innerHTML = 'clientWidth: ' + wrapperElement.clientWidth + 'px';
	offsetWidthElement.querySelector('.width-text').innerHTML = 'offsetWidth: ' + wrapperElement.offsetWidth + 'px';
	scrollWidthElement.querySelector('.width-text').innerHTML = 'scrollWidth: ' + wrapperElement.scrollWidth + 'px';

	// updateMock();
}

function toggleWidth() {
	toggleClass(clientWidthElement, 'is-hidden');
	toggleClass(offsetWidthElement, 'is-hidden');
	toggleClass(scrollWidthElement, 'is-hidden');
}

function toggleHeight() {
	toggleClass(clientHeightElement, 'is-hidden');
	toggleClass(offsetHeightElement, 'is-hidden');
	toggleClass(scrollHeightElement, 'is-hidden');
}

// function update() {
// 	updateInfo();
// 	// updateMock();
// 	animationId = requestAnimationFrame(update);
// }

function updateDimension(prop, value) {
	wrapperElement.style[prop] = value + 'px';
	document.querySelector('#' + prop + '-value').innerHTML = value;
	updateMock();
	updateInfo();
}

function updateContentDimension(prop, value) {
	contentElement.style[prop] = value + 'px';
	mockContentElement.style[prop] = value - 2 * 16 + 'px';
	document.querySelector('#content-' + prop + '-value').innerHTML = value;
	updateMock();
	updateInfo();
}

function toggleWideContent() {
	// toggleClass(wrapperElement, 'wide');
	updateMock();
	// cancelAnimationFrame(animationId);
	// animationId = requestAnimationFrame(update);
}

function toggleLongContent() {
	// toggleClass(wrapperElement, 'long');
	updateMock();
	// cancelAnimationFrame(animationId);
	// animationId = requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', function() {
	container = document.querySelector('.demo-outer');
	contentElement = document.querySelector('.demo-content');
	mockContentElement = document.querySelector('.mock-content');
	wrapperElement = document.querySelector('.demo-wrapper');
	clientHeightElement = document.querySelector('.client-height');
	offsetHeightElement = document.querySelector('.offset-height');
	scrollHeightElement = document.querySelector('.scroll-height');
	clientWidthElement = document.querySelector('.client-width');
	offsetWidthElement = document.querySelector('.offset-width');
	scrollWidthElement = document.querySelector('.scroll-width');

	// defaultScrollHeightElementWidth = parseInt(getComputedStyle(scrollHeightElement).width);
	// defaultScrollWidthElementHeight = parseInt(getComputedStyle(scrollWidthElement).height);

	updateInfo();
	updateMock();

	// wrapperElement.addEventListener('transitionend', function() {
	// 	console.debug('transition end');
	// 	cancelAnimationFrame(animationId);
	// });

	// animationId = requestAnimationFrame(update);

	// wrapperElement.onscroll = updateMock;
});