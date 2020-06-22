$(document).ready(function () {

    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', ready)
    } else {
        ready()
    }
    $(".zipAlert, .zipAlert2, .formdiv, .purchDiv, .zipCodeBrowser, .zonasEntrega, .zonaNotFound").hide();
    $(".unit1, .unit2, .unit3, .unit4, .unit5, .unit6, .verPropuesta1, .verPropuesta3, .verPropuesta4, .verPropuesta5, .verPropuesta6, .verProp1, .verProp, .verProp3, .verProp4, .verProp6, .btnPre5").hide();

    // Función para botones de imágen
    $(".btn1first").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/cVinosDos.jpg)");
    });
    $(".btn1second").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/cVinosTres.jpg)");
    });
    $(".btn1third").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/cVinosCuatro.jpg)");
    });
    $(".btn2first").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/cCervezaDos.jpg)");
    });
    $(".btn2second").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/cCervezaTres.jpg)");
    });
    $(".btn2third").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/cCervezaCuatro.jpg)");
    });
    $(".btn3first").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/nJuegosDos.jpg)");
    });
    $(".btn3second").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/nJuegosTres.jpg)");
    });
    $(".btn3third").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/nJuegosCuatro.jpg)");
    });
    $(".btn4first").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/hCelebrarUno.jpg)");
    });
    $(".btn4second").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/hCelebrarDos.jpg)");
    });
    $(".btn4third").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/hCelebrarTres.jpg)");
    });
    $(".btn6first").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/hCelebrarUno.jpg)");
    });
    $(".btn6second").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/hCelebrarDos.jpg)");
    });
    $(".btn6third").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/hCelebrarTres.jpg)");
    });
    
    $(".btnRegresar").on("click", function () {
        $("#experienciasCards").show();
        $(".unit1, .unit2, .unit3, .unit4, .unit5, .unit6, .zipCodeBrowser, .zipAlert, .zipAlert2, .formdiv, .purchDiv, .unit5Premium, .unit6Premium, .zonasEntrega, .zonaNotFound").hide();
    });

    // Función para on click purchase button, mostrar el div de detalles de compra
    $(".btn-purchase").on("click", function (){
        $(".formdiv").show();
        $(".purchDiv").hide();
        var cookieValue = [$("input[type=hidden][name=title1]").val(), $("input[type=number][name=quantity1]").val(),$("input[type=hidden][name=title2]").val(),$("input[type=number][name=quantity2]").val(),$("input[type=hidden][name=title3]").val(),$("input[type=number][name=quantity3]").val(),$("input[type=hidden][name=title4]").val(),$("input[type=number][name=quantity4]").val(),$("input[type=hidden][name=title5]").val(),$("input[type=number][name=quantity5]").val(),$("input[type=hidden][name=title6]").val(),$("input[type=number][name=quantity6]").val()];
        var cookie2 = [];
        if(cookieValue[0]){
            cookie2.push("Experiencia: "+[cookieValue[0]," Cantidad: "+cookieValue[1]]);
        }
        if(cookieValue[2]){
            cookie2.push("Experiencia: "+[cookieValue[2]," Cantidad: "+cookieValue[3]]);
        }
        if(cookieValue[4]){
            cookie2.push("Experiencia: "+[cookieValue[4]," Cantidad: "+cookieValue[5]]);
        }
        if(cookieValue[6]){
            cookie2.push("Experiencia: "+[cookieValue[6]," Cantidad: "+cookieValue[7]]);
        }
        if(cookieValue[8]){
            cookie2.push("Experiencia: "+[cookieValue[8]," Cantidad: "+cookieValue[9]]);
        }
        if(cookieValue[10]){
            cookie2.push("Experiencia: "+[cookieValue[10]," Cantidad: "+cookieValue[11]]);
        }
        
        document.getElementById("cartBrief").value = cookie2;

    }) 
    // Función para pasar a Zip Code Validation

    $(".nxt1").on("click", function () {
        $("#experienciasCards").hide();
        $(".zonasEntrega, .zonaNotFound").show(1000)
        $(".unit1, .unit2, .unit3, .unit4, .unit5Premium, .unit6Premium").hide();

    });

    // Función para ver premium box
    $(".unit5Premium, .unit6Premium").hide();
    

    function ready() {
        var removeCartItemButtons = document.getElementsByClassName('btn-danger')
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i]
            button.addEventListener('click', removeCartItem)
        }

        var quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i]
            input.addEventListener('change', quantityChanged)
        }

        var addToCartButtons = document.getElementsByClassName('shop-item-button')
        for (var i = 0; i < addToCartButtons.length; i++) {
            var button = addToCartButtons[i]
            button.addEventListener('click', addToCartClicked)
        }

        document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    }

    var stripeHandler = StripeCheckout.configure({
        key: stripePublicKey,
        locale: 'en',
        token: function (token) {
            var items = []
            var cartItemContainer = document.getElementsByClassName('cart-items')[0]
            var cartRows = cartItemContainer.getElementsByClassName('cart-row')
            for (var i = 0; i < cartRows.length; i++) {
                var cartRow = cartRows[i]
                var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
                var quantity = quantityElement.value
                var id = cartRow.dataset.itemId
                // console.log(cartRow);
                items.push({
                    id: id,
                    quantity: quantity
                })
            }

            fetch('/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    stripeTokenId: token.id,
                    items: items
                })
            }).then(function (res) {
                return res.json()
            }).then(function (data) {
                alert(data.message)
                var cartItems = document.getElementsByClassName('cart-items')[0]
                while (cartItems.hasChildNodes()) {
                    cartItems.removeChild(cartItems.firstChild)
                }
                updateCartTotal()
            }).catch(function (error) {
                console.error(error)
            })
        }
    })

    function purchaseClicked() {
        var priceElement = document.getElementsByClassName('cart-total-price')[0]
        var price = parseFloat(priceElement.innerText.replace('$', '')) * 100
        stripeHandler.open({
            amount: price
        })
    }

    function removeCartItem(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    }

    function quantityChanged(event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        updateCartTotal()
    }

    function addToCartClicked(event) {
        var button = event.target
        var shopItem = button.parentElement.parentElement
        var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
        var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
        var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
        var id = shopItem.getElementsByClassName('shop-item-id')[0].innerText
        addItemToCart(title, price, imageSrc, id)
        updateCartTotal()
    }
    var number = 1;

    function addItemToCart(title, price, imageSrc, id) {
        number++;
        var cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');
        cartRow.dataset.itemId = id;
        var cartItems = document.getElementsByClassName('cart-items')[0];
        var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
        for (var i = 0; i < cartItemNames.length; i++) {
            if (cartItemNames[i].innerText == title) {
                alert('Esta experiencia ya ha sido añadida al carrito');
                return;
            }
        }

        var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <input type="hidden" value="${title}" name="title${id}">
            <span class="cart-item-title" >${title}</span>
        </div>
        <span class="cart-price cart-column" name="price">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" name="quantity${id}">
            <button class="btn btn-danger btnDangerSmaller" type="button">ELIMINAR</button>
        </div>`
        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);

    }
    

    function updateCartTotal() {
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')
        var total = 0
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            var price = parseFloat(priceElement.innerText.replace('$', ''))
            var quantity = quantityElement.value
            total = total + (price * quantity)
        }
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    }
});
