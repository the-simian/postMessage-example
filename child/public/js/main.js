function loadDocument() {
    var $timerbox = $('#timerbox'),
        successFail = true,
        //just something to display in the iframe
        successMessage = [
            '<p class="bg-success">Success!</p>',
            '<br/>',
            '<img src="http://i.imgur.com/bccOW8y.jpg" class="stateimage"/>'
        ].join(''),
        failMessage = [
            '<p class="bg-danger">Failure!</p>',
            '<br/>',
            '<img src="http://i.imgur.com/Lpu7Uay.jpg" class="stateimage"/>'
        ].join(''),
        //this *must* match the url of the parent!!!
        origin = 'http://localhost:8080';

    function updateTimerbox() {
        var message = successFail ?
            successMessage :
            failMessage;

        var status = successFail ? '200' : '404';
        var postMessage = {
            'message': message,
            'status': status,
            'success': successFail
        }


        $timerbox.html(message);
        successFail = !successFail;

        window.parent.postMessage(postMessage, origin);
    }

    $timerbox.html(successMessage);

    window.setInterval(updateTimerbox, 1500);
}


$(document).ready(loadDocument);