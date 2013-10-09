$('.carousel').on('click', '.right', moveLeft);

$('.carousel').on('click', '.left', moveRight);

$('.carousel').on('transitionend', function(e){
    console.debug(e);

    // switch(e.target.className) {
    //     case '':
    // }
    var className = e.target.className;
    if (className.indexOf('left-most-active')) {
        className = 'left-most';
    } else if (className.indexOf('right-most-active')) {
        className = 'right-most';
    } else if (className.indexOf('right-active')) {
        className = 'right';
    } else if (className.indexOf('left-active')) {
        className = 'left';
    } else if (className.indexOf('center-active')) {
        className = 'center';
    }

    // e.target.className = className;
});

function moveLeft(e){
    $(".carousel .center").addClass("left-active");
    // .one('transitionend', function(e){
    //     // $(this).addClass('left').removeClass('center left-active');
    // });
    $(".carousel .right").addClass("center-active");
    // .one('transitionend', function(e){
    //     // $(this).addClass('center').removeClass('right center-active');
    // });
    $(".carousel .left").addClass("left-most-active");
    // .one('transitionend', function(e){
    //     // $(this).addClass('left-most').removeClass('left left-most-active');
    // });
    $(this).next().addClass('right-active');
    // .one('transitionend', function(e){
    //     // $(this).addClass('right').removeClass('right-active right-most');
    // });
}

function moveRight(e){
    $(".carousel .center").addClass("right-active").one('transitionend', function(e){
        // $(this).addClass('right').removeClass('center right-active');
    });
    $(".carousel .right").addClass("right-most-active").one('transitionend', function(e){
        // $(this).addClass('right-most').removeClass('right right-most-active');
    });
    $(".carousel .left").addClass("center-active").one('transitionend', function(e){
        // $(this).addClass('center').removeClass('left center-active');
    });
    $(this).prev().addClass('left-active').one('transitionend', function(e){
        // $(this).addClass('left').removeClass('left-active left-most');
    });
}