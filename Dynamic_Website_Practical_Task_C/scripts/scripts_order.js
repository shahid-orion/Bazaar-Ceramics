//getting values using QUERY STRING
const param = new URLSearchParams(window.location.search);
var prdName = param.get('name');
var prdPrice = param.get('price');
var prdFig = param.get('fig');
// alert(prdName + ' ' + prdPrice + ' ' + prdFig);
document.getElementById('thisName').value = prdName;
document.getElementById('thisPrice').value = prdPrice;
document.getElementById('productTitle').innerText = prdName;

//IIEF
(function img() {
    var temp = "<table>";
    for (var row = 0; row < 4; row++) {
        temp += "<tr>";
        for (var col = 0; col < 5; col++) {
            var img = new Image();

            img.src =
                "../Images/dynamic_websites_pract_taska_images_278/" +
                prdFig +
                "/" +
                prdFig +
                "_r" +
                (row + 1) +
                "_c" +
                (col + 1) +
                ".jpg";

            // console.log(img.getAttribute("src"));
            // to check whether the sliced images load from cache or not
            // console.log(img.complete);
            // setTimeout(() => {
            //     console.log(img.complete); //true
            // }, 1000);

            temp += "<td>";

            temp += "<img src='" + img.getAttribute("src") + "'";

            temp += "</td>";
        }
        temp += "</tr>";
    }
    temp += "</table>";
    // console.log(temp);

    document.getElementById("container").innerHTML = temp;
})();


function calculateTotal(product) {         //calculating total
    var quantity = document.getElementById('thisQuantity').value; // product + "Quantaity"
    // var price = document.getElementById('thisPrice').value;
    var price = prdPrice;

    // var name = document.getElementById('thisName').value;
    var name = prdName;


    if (name == '' || !isNaN(name)) {                               //ensure product name is string or it isn't empty
        alert('Invalid! Please enter a product Name');
        return;
    }
    if (!quantity || isNaN(quantity) || parseFloat(quantity) < 1) { //ensure order can't be less than 1 or 0 or empty 
        alert('Invalid quantity. Minimum order quantity is 1');
        return;
    }
    if (quantity.indexOf('.') > -1) {                               // ensure there's no fraction in order quantity 
        alert('invalid quantity. Please enter a natural number');
        return;
    }


    // if (isNaN(quantity) || parseFloat(quantity) <= 0) {
    //     alert('Invalid Number');
    //     return;
    // }

    if (isNaN(price) || price <= 0) {                           //ensure price is a valid number
        alert('Please enter valid price');
        return;
    }




    var total = parseFloat(quantity) * parseFloat(price);
    document.getElementById('totalPrice').innerHTML = total;  //displaying the total price value 

    //--------------------disable inputs
    document.getElementById('thisName').readOnly = true;
    document.getElementById('thisQuantity').readOnly = true;
}

// calculateTotal();

function resetInputs() {                                        //resetting inputs to initial value
    document.getElementById('thisName').value = prdName;
    document.getElementById('thisQuantity').value = '1';
    document.getElementById('totalPrice').innerHTML = '';

    //------------------enable inputs
    document.getElementById('thisName').readOnly = false;
    document.getElementById('thisQuantity').readOnly = false;
}

function orderCancel() {                                    //order cancel takes to initial input value
    document.getElementById('orderConfirmation').style.display = 'none';
    alert('Order Cancelled');
    resetInputs();

    //--------------------enable inputs
    document.getElementById('thisName').readOnly = false;
    document.getElementById('thisQuantity').readOnly = false;
}

function formSubmit(event) {                                // submitting the value value.
    event.preventDefault();
    var itemName = document.getElementById('thisName').value;
    var confirmQuantity = document.getElementById('thisQuantity').value;
    var confirmPrice = document.getElementById('thisPrice').value;
    var totalPrice = document.getElementById('totalPrice').textContent;

    if (!totalPrice) {
        alert('Please Calculate total.')
        return;
    }

    var confirmBoxInfo = [                  //using an array to show the input values in a box
        {
            label: 'Item Description', value: itemName
        },
        {
            label: 'Quantity', value: confirmQuantity
        },
        {
            label: 'Unit Price', value: confirmPrice
        },
        {
            label: 'Order Total', value: totalPrice
        },
    ]

    var confirmHtml = '';
    confirmBoxInfo.forEach(function (item) {
        confirmHtml += '<tr><td>' + item.label + '</td><td>' + item.value + '</td></tr>';
    });

    document.getElementById('orderConfirmation').style.display = 'block';

    document.getElementById('confirmBox').innerHTML = '<table>' + confirmHtml + '</table>';
}

document.getElementById('totalButton').onclick = calculateTotal;
document.getElementById('resetButton').onclick = resetInputs;
document.getElementById('thisForm').onsubmit = formSubmit;

document.getElementById('orderNo').onclick = orderCancel;
document.getElementById('orderYes').onclick = function () {
    alert('Order confirmed!')
    //----------------resetting the fields for next order
    document.getElementById('orderConfirmation').style.display = 'none';
    resetInputs();
}

function closeWindow() {                //closing the window 
    window.open('', '_parent', '');     //detecting the window that to be closed
    window.close();
}

// document.getElementById('thisQuantity').onchange(function () {
//     console.log(hello);
//     console.log(this.value);
// })

// document.getElementById('thisQuantity').oninput = function () {
//     var value = this.value.replace(/\D/g, '');
//     this.value = parseInt(value) || 1;
// }

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

