var transitions = 0;

$('.carousel').on('click', '.right', moveLeft);

$('.carousel').on('click', '.left', moveRight);

$('.carousel').on('transitionend', function(e){
    // console.debug(e);
    // console.debug(transitions);

    transitions -= 1;

    if (transitions < 1) {
        $(this).find('.left-active').addClass('left').removeClass('center left-most left-active');
        $(this).find('.center-active').addClass('center').removeClass('right left center-active');
        $(this).find('.left-most-active').addClass('left-most').removeClass('left left-most-active');
        $(this).find('.right-active').addClass('right').removeClass('right-active center right-most');
        $(this).find('.right-most-active').addClass('right-most').removeClass('right right-most-active');
    }
});

function addTransition() { transitions += 3; }

function moveLeft(e){
    if (transitions < 1) {
        $(".carousel .center").addClass("left-active").each(addTransition);
        $(".carousel .right").addClass("center-active").each(addTransition);
        $(".carousel .left").addClass("left-most-active").each(addTransition);
        $(this).next().addClass('right-active').each(addTransition);
    }
}

function moveRight(e){
    if (transitions < 1) {
        $(".carousel .center").addClass("right-active").each(addTransition);
        $(".carousel .right").addClass("right-most-active").each(addTransition);
        $(".carousel .left").addClass("center-active").each(addTransition);
        $(this).prev().addClass('left-active').each(addTransition);
    }
}