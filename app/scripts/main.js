'use strict';

var container, contentElement, wrapperElement,
	clientHeightElement, offsetHeightElement, scrollHeightElement,
	clientWidthElement, offsetWidthElement, scrollWidthElement,
	clientTopElement, offsetTopElement, scrollTopElement,
	clientLeftElement, offsetLeftElement, scrollLeftElement,
	mockContentElement;

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

function updateMock(wrapperStyle) {
	var x = getX(contentElement, container),
		y = getY(contentElement, container);
	var wrapperX = getX(wrapperElement, container),
		wrapperY = getY(wrapperElement, container);

	wrapperStyle = wrapperStyle || getComputedStyle(wrapperElement);

	var paddingTop = parseInt(wrapperStyle.paddingTop);
	var paddingLeft = paddingTop;
	var marginTop = parseInt(wrapperStyle.marginTop);
	var marginLeft = marginTop;
	var borderTopWidth = parseInt(wrapperStyle.borderTopWidth);
	var borderLeftWidth = borderTopWidth;

	mockContentElement.style.top = y - wrapperElement.scrollTop + 'px';
	mockContentElement.style.left = x - wrapperElement.scrollLeft + 'px';
	mockContentElement.style.width = parseInt(contentElement.style.width) - 2 * 16 + 'px';
	mockContentElement.style.height = parseInt(contentElement.style.height) - 2 * 16 + 'px';
	mockContentElement.style.borderWidth = wrapperStyle.padding;
	if (wrapperElement.scrollWidth > wrapperElement.clientWidth) {
		mockContentElement.style.borderRightWidth = 0;
	}

	scrollHeightElement.style.top = y - paddingTop - wrapperElement.scrollTop + 'px';
	scrollHeightElement.style.left = x - paddingLeft - wrapperElement.scrollLeft + 'px';
	scrollHeightElement.style.width = 580 + wrapperElement.scrollLeft - marginLeft - borderLeftWidth + 'px';
	scrollHeightElement.style.height = wrapperElement.scrollHeight + 'px';
	scrollWidthElement.style.top = scrollHeightElement.style.top;
	scrollWidthElement.style.left = scrollHeightElement.style.left;
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

	clientTopElement.style.top = wrapperY + 'px';
	clientTopElement.querySelector('.client-top-marker').style.width = 40 + marginLeft + 'px';
	clientTopElement.querySelector('.client-top-marker').style.height = wrapperElement.clientTop + 'px';

	offsetTopElement.querySelector('.offset-top-marker').style.height = wrapperElement.offsetTop + 'px';

	scrollTopElement.style.top = scrollHeightElement.style.top;
	scrollTopElement.querySelector('.scroll-top-marker').style.width = 180 + marginLeft + borderLeftWidth + 'px';
	scrollTopElement.querySelector('.scroll-top-marker').style.height = wrapperElement.scrollTop + 'px';

	clientLeftElement.style.left = wrapperX + 'px';
	clientLeftElement.querySelector('.client-left-marker').style.width = wrapperElement.clientLeft + 'px';
	clientLeftElement.querySelector('.client-left-marker').style.height = 30 + marginTop + 'px';

	offsetLeftElement.style.left = wrapperX - marginLeft + 'px';
	offsetLeftElement.querySelector('.offset-left-marker').style.width = wrapperElement.offsetLeft + 'px';

	scrollLeftElement.style.left = scrollWidthElement.style.left;
	scrollLeftElement.querySelector('.scroll-left-marker').style.width = wrapperElement.scrollLeft + 'px';
	scrollLeftElement.querySelector('.scroll-left-marker').style.height = 92 + marginTop + borderTopWidth + 'px';

	scrollTopElement.querySelector('.top-text').innerHTML = 'scrollTop: ' + wrapperElement.scrollTop + 'px';
	scrollLeftElement.querySelector('.left-text').innerHTML = 'scrollLeft: ' + wrapperElement.scrollLeft + 'px';
}

function updateInfo(wrapperStyle) {
	document.querySelector('.margin-marker').innerHTML = wrapperStyle.margin;
	clientHeightElement.querySelector('.height-text').innerHTML = 'clientHeight: ' + wrapperElement.clientHeight + 'px';
	clientHeightElement.querySelector('.padding-marker').innerHTML = wrapperStyle.padding;
	offsetHeightElement.querySelector('.height-text').innerHTML = 'offsetHeight: ' + wrapperElement.offsetHeight + 'px';
	offsetHeightElement.querySelector('.border-marker').innerHTML = wrapperStyle.borderWidth;
	scrollHeightElement.innerHTML = 'scrollHeight: ' + wrapperElement.scrollHeight + 'px';

	clientWidthElement.querySelector('.width-text').innerHTML = 'clientWidth: ' + wrapperElement.clientWidth + 'px';
	offsetWidthElement.querySelector('.width-text').innerHTML = 'offsetWidth: ' + wrapperElement.offsetWidth + 'px';
	scrollWidthElement.querySelector('.width-text').innerHTML = 'scrollWidth: ' + wrapperElement.scrollWidth + 'px';

	clientLeftElement.querySelector('.left-text').innerHTML = 'clientLeft: ' + wrapperElement.clientLeft + 'px';
	offsetLeftElement.querySelector('.left-text').innerHTML = 'offsetLeft: ' + wrapperElement.offsetLeft + 'px';

	clientTopElement.querySelector('.top-text').innerHTML = 'clientTop: ' + wrapperElement.clientTop + 'px';
	offsetTopElement.querySelector('.top-text').innerHTML = 'offsetTop: ' + wrapperElement.offsetTop + 'px';
}

function updateDimension(prop, value) {
	wrapperElement.style[prop] = value + 'px';
	var wrapperStyle = getComputedStyle(wrapperElement);
	document.querySelector('#' + prop + '-value').innerHTML = value;
	updateMock(wrapperStyle);
	updateInfo(wrapperStyle);
}

function updateContentDimension(prop, value) {
	var wrapperStyle = getComputedStyle(wrapperElement);
	contentElement.style[prop] = value + 'px';
	// mockContentElement.style[prop] = value - 2 * 16 + 'px';
	document.querySelector('#content-' + prop + '-value').innerHTML = value;
	updateMock(wrapperStyle);
	updateInfo(wrapperStyle);
}

document.addEventListener('DOMContentLoaded', function() {
	container = document.querySelector('.margin-layer');
	contentElement = document.querySelector('.content-layer');
	mockContentElement = document.querySelector('.mock-content');
	wrapperElement = document.querySelector('.element-layer');
	clientHeightElement = document.querySelector('.client-height');
	offsetHeightElement = document.querySelector('.offset-height');
	scrollHeightElement = document.querySelector('.scroll-height');
	clientWidthElement = document.querySelector('.client-width');
	offsetWidthElement = document.querySelector('.offset-width');
	scrollWidthElement = document.querySelector('.scroll-width');
	clientTopElement = document.querySelector('.client-top');
	offsetTopElement = document.querySelector('.offset-top');
	scrollTopElement = document.querySelector('.scroll-top');
	clientLeftElement = document.querySelector('.client-left');
	offsetLeftElement = document.querySelector('.offset-left');
	scrollLeftElement = document.querySelector('.scroll-left');

	var wrapperStyle = getComputedStyle(wrapperElement);
	updateMock(wrapperStyle);
	updateInfo(wrapperStyle);
});

function resetDimensions() {
	updateContentDimension('width', 120);
	updateContentDimension('height', 120);
	updateDimension('width', 200);
	updateDimension('height', 200);
	updateDimension('margin', 20);
	updateDimension('border-width', 20);
	updateDimension('padding', 20);
	$('#content-width-slider').val(120);
	$('#content-height-slider').val(120);
	$('#width-slider').val(200);
	$('#height-slider').val(200);
	$('#margin-slider').val(20);
	$('#border-width-slider').val(20);
	$('#padding-slider').val(20);
	$('#view-properties .btn-group label').addClass('active');
}

$('#view-properties input:checkbox').on('change', function() {
	$('.element-layer').find('.' + this.value).toggleClass('is-hidden');
});

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	// e.target // activated tab
	// e.relatedTarget // previous tab
	if (e.target.hash === '#basic-settings') {
		$('#basic-settings .btn-group label').removeClass('active');
	}
});

$('#no-scroll').on('change', function() {
	if (this.checked) {
		resetDimensions();
		$('.element-layer > div').removeClass('is-hidden');
	}
});

$('#vertical-scroll').on('change', function() {
	if (this.checked) {
		resetDimensions();
		updateContentDimension('height', 300);
		$('#content-height-slider').val(300);
		$('.element-layer > div').removeClass('is-hidden');
		$('.element-layer').find('.offset-left, .client-left, .scroll-left, .offset-width, .client-width, .scroll-width').addClass('is-hidden');
		$('#view-properties .horizontal-group label').removeClass('active');
	}
});

$('#horizontal-scroll').on('change', function() {
	if (this.checked) {
		resetDimensions();
		updateContentDimension('width', 300);
		updateDimension('height', 215);
		$('#content-width-slider').val(300);
		$('#height-slider').val(215);
		$('.element-layer > div').removeClass('is-hidden');
		$('.element-layer').find('.offset-top, .client-top, .scroll-top, .offset-height, .client-height, .scroll-height').addClass('is-hidden');
		$('#view-properties .vertical-group label').removeClass('active');
	}
});