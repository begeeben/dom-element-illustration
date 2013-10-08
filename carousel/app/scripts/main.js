$(".right").one('click', moveLeft);

$(".left").one('click', moveRight);

function moveLeft(e){
    // $(this).removeClass("right").addClass("center");
    $(".carousel .center").addClass("left-active").one('transitionend', function(e){
        $(this).addClass('left').removeClass('center left-active');
        $(this).one('click', moveRight);
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
        $(this).one('click', moveLeft);
    });
}

function moveRight(e){
    // $(this).removeClass("right").addClass("center");
    $(".carousel .center").addClass("right-active").one('transitionend', function(e){
        $(this).addClass('right').removeClass('center right-active');
        $(this).one('click', moveLeft);
    });
    $(".carousel .right").addClass("right-most-active").one('transitionend', function(e){
        $(this).addClass('right-most').removeClass('right right-most-active');
    });
    $(".carousel .left").addClass("center-active").one('transitionend', function(e){
        $(this).addClass('center').removeClass('left center-active');
    });
    $(this).prev().addClass('left-active').one('transitionend', function(e){
        $(this).addClass('left').removeClass('left-active left-most');
        $(this).one('click', moveRight);
    });
}