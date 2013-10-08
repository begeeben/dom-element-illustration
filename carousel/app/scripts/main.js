$(document).on('click', '.carousel .right', moveLeft);

$(document).on('click', '.carousel .left', moveRight);

$(document).on('transitionend', function(e){
    console.debug(e);
});

function moveLeft(e){
    $(".carousel .center").addClass("left-active").one('transitionend', function(e){
        $(this).addClass('left').removeClass('center left-active');
    });
    $(".carousel .right").addClass("center-active").one('transitionend', function(e){
        $(this).addClass('center').removeClass('right center-active');
    });
    $(".carousel .left").addClass("left-most-active").one('transitionend', function(e){
        $(this).addClass('left-most');
        $(this).removeClass('left left-most-active');
    });
    $(this).next().addClass('right-active').one('transitionend', function(e){
        $(this).addClass('right').removeClass('right-active right-most');
    });
}

function moveRight(e){
    $(".carousel .center").addClass("right-active").one('transitionend', function(e){
        $(this).addClass('right').removeClass('center right-active');
    });
    $(".carousel .right").addClass("right-most-active").one('transitionend', function(e){
        $(this).addClass('right-most').removeClass('right right-most-active');
    });
    $(".carousel .left").addClass("center-active").one('transitionend', function(e){
        $(this).addClass('center').removeClass('left center-active');
    });
    $(this).prev().addClass('left-active').one('transitionend', function(e){
        $(this).addClass('left').removeClass('left-active left-most');
    });
}