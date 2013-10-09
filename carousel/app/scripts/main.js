var transitions = 0;
var nextClicks = 0;

$('.carousel').on('click', '.right', function(){
    if (nextClicks > 0) {
        nextClicks = 0;
    }

    if (transitions < 1) {
        moveLeft();
    } else if ($(this).next().length > 0) {
        nextClicks -= 1;
    } else {
        nextClicks = 0;
    }
});

$('.carousel').on('click', '.left', function() {
    if (nextClicks < 0) {
        nextClicks = 0;
    }

    if (transitions < 1) {
        moveRight();
    } else if ($(this).prev().length > 0) {
        nextClicks += 1;
    } else {
        nextClicks = 0;
    }
});

$('.carousel').on('transitionend', function(){
    // console.debug(e);
    // console.debug(transitions);

    transitions -= 1;

    if (transitions < 1) {
        $(this).find('.left-active').addClass('left').removeClass('center left-most left-active');
        $(this).find('.center-active').addClass('center').removeClass('right left center-active');
        $(this).find('.left-most-active').addClass('left-most').removeClass('left left-most-active');
        $(this).find('.right-active').addClass('right').removeClass('right-active center right-most');
        $(this).find('.right-most-active').addClass('right-most').removeClass('right right-most-active');

        if (nextClicks > 0) {
            moveRight();
        } else if (nextClicks < 0) {
            moveLeft();
        }
    }
});

function addTransition() { transitions += 3; }

function moveLeft(){
    if ($('.right').length > 0) {
        // console.debug('move left');
        $(".carousel .center").addClass("left-active").each(addTransition);
        $(".carousel .right").addClass("center-active").each(addTransition);
        $(".carousel .left").addClass("left-most-active").each(addTransition);
        $('.right').next().addClass('right-active').each(addTransition);
    }
}

function moveRight(){
    if ($('.carousel .left').length > 0) {
        // console.debug('move right');
        $(".carousel .center").addClass("right-active").each(addTransition);
        $(".carousel .right").addClass("right-most-active").each(addTransition);
        $(".carousel .left").addClass("center-active").each(addTransition);
        $('.left').prev().addClass('left-active').each(addTransition);
    }
}