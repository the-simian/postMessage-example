//these variables come from somewhere in your app...
var sizeLarge = {
        w: 800,
        h: 600
    },
    sizeSmall = {
        w: 500,
        h: 500
    },
    url = 'http://localhost:8081/',
    $colorbox;

//the actual act of opening the dialog.
//we attach the handler onComplete.
function openDialog() {
    var colorBoxOptions = {
        iframe: true,
        width: sizeLarge.w,
        height: sizeLarge.h,
        href: url,
        id: 'something_unique',
        onComplete: handlePostmessage
    };

    $.colorbox(colorBoxOptions);
}

//this fires whn a postmessage arrives
function updateColorboxSize(eve) {
    var status = eve.data.status,
        isError = status == 500 || status == 404,
        smallOpts = {
            width: sizeSmall.w,
            height: sizeSmall.h
        },
        largeOpts = {
            width: sizeLarge.w,
            height: sizeLarge.h
        };

    if (isError) {
        $colorbox.resize(smallOpts);
    } else {
        $colorbox.resize(largeOpts);
    }
}

//when a post message arrives, update the combobox
function handlePostmessage() {
    $colorbox = $(this).colorbox;
    eventer(messageEvent, updateColorboxSize, false);
}

// Make sure the event listener exists, and abstract to a global emitter
// This 'eventer' must be executed in the context of window (cannot sub namespace)
(function handlePostmessage() {
    window.eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent',
    window.eventer = window[eventMethod],
    window.messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
})(window);

//this is to make the event handler on click
function loadDocument() {
    var $iframeBtn = $('#iframe_btn');
    $iframeBtn.on('click', openDialog);
}

//on doc ready, handle all the code releated to laoding the document.
$(document).ready(loadDocument);