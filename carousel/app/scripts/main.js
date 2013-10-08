$(".right").one('click', moveLeft);

$(".left").one('click', moveRight);

function moveLeft(e){
    // $(this).removeClass("right").addClass("center");
    $(".carousel .center").addClass("left-active").one('transitionend', function(e){
        $(this).removeClass('center left-active').addClass('left');
        $(".left").one('click', moveRight);
    });
    $(".carousel .right").addClass("center-active").one('transitionend', function(e){
        $(this).removeClass('right center-active').addClass('center');
    });
    $(".carousel .left").addClass("left-most-active").one('transitionend', function(e){
        $(this).removeClass('left left-most-active').addClass('left-most');
    });
    $(this).next().addClass('right-active').one('transitionend', function(e){
        $(this).removeClass('right-active right-most').addClass('right');
        $(".right").one('click', moveLeft);
    });
}

function moveRight(e){
    // $(this).removeClass("right").addClass("center");
    $(".carousel .center").addClass("right-active").one('transitionend', function(e){
        $(this).removeClass('center right-active').addClass('right');
        $(".right").one('click', moveLeft);
    });
    $(".carousel .right").addClass("right-most-active").one('transitionend', function(e){
        $(this).removeClass('right right-most-active').addClass('right-most');
    });
    $(".carousel .left").addClass("center-active").one('transitionend', function(e){
        $(this).removeClass('left center-active').addClass('center');
    });
    $(this).prev().addClass('left-active').one('transitionend', function(e){
        $(this).removeClass('left-active left-most').addClass('left');
        $(".left").one('click', moveRight);
    });
}