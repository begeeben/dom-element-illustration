(function() {
    var backgroundStyleList = [
        'frenchstucco',
        'rockywall',
        'wall4',
        'whitey',
        'xv'
    ];

    var currentBackgroundStyleIndex = 0;

    var boardStyleList = [
        'wood',
        'wood-stripe'
    ];

    var currentPhotoBoardStyleIndex = 0;
    var currentInvitationBoardStyleIndex = 1;

    $('#change-background').click(function() {
        $('body').removeClass(backgroundStyleList[currentBackgroundStyleIndex]);
        currentBackgroundStyleIndex += 1;
        currentBackgroundStyleIndex = currentBackgroundStyleIndex > backgroundStyleList.length - 1 ? 0 : currentBackgroundStyleIndex;
        $('body').addClass(backgroundStyleList[currentBackgroundStyleIndex]);
    });

    $('#change-photo-board').click(function() {
        $('.photo-board').removeClass(boardStyleList[currentPhotoBoardStyleIndex]);
        currentPhotoBoardStyleIndex += 1;
        currentPhotoBoardStyleIndex = currentPhotoBoardStyleIndex > boardStyleList.length - 1 ? 0 : currentPhotoBoardStyleIndex;
        $('.photo-board').addClass(boardStyleList[currentPhotoBoardStyleIndex]);
    });

    $('#change-invitation-board').click(function() {
        $('#invitation-board').removeClass(boardStyleList[currentInvitationBoardStyleIndex]);
        currentInvitationBoardStyleIndex += 1;
        currentInvitationBoardStyleIndex = currentInvitationBoardStyleIndex > boardStyleList.length - 1 ? 0 : currentInvitationBoardStyleIndex;
        $('#invitation-board').addClass(boardStyleList[currentInvitationBoardStyleIndex]);
    });

    $('#heart-beat').click(function() {
        $('.loading').fadeIn(2000).fadeOut(2000);
    });
    // Prevent the hash anchor from scrolling to the top of the page.
    document.onclick = function (evt) {
        var tgt = (evt && evt.target) || event.srcElement,
            scr = document.body.scrollTop;

        if (tgt.tagName == "A" && tgt.href.slice(-1) == "#") {
            window.location.href = "#";
            document.body.scrollTop = scr;           
            return false;
        }
    };
})();

$(window).load(function() {
    skrollr.init({
        // edgeStrategy: 'set',

        // forceHeight: false
    });

    $('.loading').fadeOut(2000);
});