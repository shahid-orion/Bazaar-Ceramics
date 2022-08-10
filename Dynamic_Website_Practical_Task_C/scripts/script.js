//MY TESTING CODE
const params = new URLSearchParams(window.location.search);
params.get('iname');
params.get('iprice');

//new code
var windowObjectReference = null; // global variable
var PreviousUrl; /* global variable that will store the
                    url currently in the secondary window */

function openRequestedSinglePopup(url) {
    if (windowObjectReference == null || windowObjectReference.closed) {
        windowObjectReference = window.open(
            url,
            "SingleSecondaryWindowName",
            "resizable,scrollbars,status"
        );
    } else if (PreviousUrl != url) {
        windowObjectReference = window.open(
            url,
            "SingleSecondaryWindowName",
            "resizable=yes,scrollbars=yes,status=yes"
        );
        /* if the resource to load is different,
           then we load it in the already opened secondary window and then
           we bring such window back on top/in front of its parent window. */
        windowObjectReference.focus();
    } else {
        windowObjectReference.focus();
    }

    PreviousUrl = url;
    /* explanation: we store the current url in order to compare url
       in the event of another call of this function. */
}
