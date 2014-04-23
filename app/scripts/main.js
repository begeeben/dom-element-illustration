'use strict';

var container, contentElement, wrapperElement,
	clientHeightElement, offsetHeightElement, scrollHeightElement,
	defaultScrollHeightElementWidth,
	defaultScrollWidthElementHeight,
	clientWidthElement, offsetWidthElement, scrollWidthElement,
	mockContentElement,
	animationId;

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() {
					callback(currTime + timeToCall);
				},
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());

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

	var wrapperStyle = getComputedStyle(wrapperElement);

	mockContentElement.style.top = y - parseInt(wrapperStyle.paddingTop) - wrapperElement.scrollTop + 'px';
	mockContentElement.style.left = x - parseInt(wrapperStyle.paddingLeft) - wrapperElement.scrollLeft + 'px';
	scrollHeightElement.style.top = y - parseInt(wrapperStyle.paddingTop) - wrapperElement.scrollTop + 'px';
	scrollHeightElement.style.left = x - parseInt(wrapperStyle.paddingLeft) - wrapperElement.scrollLeft + 'px';
	scrollHeightElement.style.width = defaultScrollHeightElementWidth + wrapperElement.scrollLeft + 'px';
	scrollWidthElement.style.top = y - parseInt(wrapperStyle.paddingTop) - wrapperElement.scrollTop + 'px';
	scrollWidthElement.style.left = x - parseInt(wrapperStyle.paddingLeft) - wrapperElement.scrollLeft + 'px';
	scrollWidthElement.style.height = defaultScrollWidthElementHeight + wrapperElement.scrollTop + 'px';
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

function update() {
	updateInfo();
	// updateMock();
	animationId = requestAnimationFrame(update);
}

function updateDimension(prop, value) {
	wrapperElement.style[prop] = value + 'px';
	document.querySelector('#' + prop + '-value').innerHTML = value;
}

function toggleWideContent() {
	toggleClass(wrapperElement, 'wide');
	updateMock();
	// cancelAnimationFrame(animationId);
	// animationId = requestAnimationFrame(update);
}

function toggleLongContent() {
	toggleClass(wrapperElement, 'long');
	updateMock();
	// cancelAnimationFrame(animationId);
	// animationId = requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', function() {
	container = document.querySelector('.demo-container');
	contentElement = document.querySelector('.demo-content');
	mockContentElement = document.querySelector('.mock-content');
	wrapperElement = document.querySelector('.demo-wrapper');
	clientHeightElement = document.querySelector('.client-height');
	offsetHeightElement = document.querySelector('.offset-height');
	scrollHeightElement = document.querySelector('.scroll-height');
	clientWidthElement = document.querySelector('.client-width');
	offsetWidthElement = document.querySelector('.offset-width');
	scrollWidthElement = document.querySelector('.scroll-width');

	defaultScrollHeightElementWidth = parseInt(getComputedStyle(scrollHeightElement).width);
	defaultScrollWidthElementHeight = parseInt(getComputedStyle(scrollWidthElement).height);

	// updateInfo();
	updateMock();

	// wrapperElement.addEventListener('transitionend', function() {
	// 	console.debug('transition end');
	// 	cancelAnimationFrame(animationId);
	// });

	animationId = requestAnimationFrame(update);

	// wrapperElement.onscroll = updateMock;
});