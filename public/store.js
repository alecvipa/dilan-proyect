$(document).ready(function () {

    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', ready)
    } else {
        ready()
    }
    $(".zipAlert, .zipAlert2, .formdiv, .purchDiv, .zipCodeBrowser").hide();
    $(".unit1, .unit2, .unit3, .unit4, .unit5, .unit6").hide();

    // Función para botones de imágen
    $(".btn1first").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/Album1.png)");
    });
    $(".btn1second").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/Album2.png)");
    });
    $(".btn1third").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/Album3.png)");
    });
    $(".btn2first").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/Album1.png)");
    });
    $(".btn2second").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/Album2.png)");
    });
    $(".btn2third").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/Album3.png)");
    });
    $(".btn3first").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/Album1.png)");
    });
    $(".btn3second").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/Album2.png)");
    });
    $(".btn3third").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/Album3.png)");
    });
    $(".btn4first").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/Album1.png)");
    });
    $(".btn4second").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/Album2.png)");
    });
    $(".btn4third").on("click", function () {
        $('.imgPre').css("background-image", "url(Images/Album3.png)");
    });
    // FUNCION PARA BOTONES DE DETALLES
    $("#detail1").on("click", function () {
        $(".unit1").show();
        $(".unit2, .unit3, .unit4, .unit5, .unit6, #experienciasCards").hide();
    });
    $("#detail2").on("click", function () {
        $(".unit2").show();
        $(".unit1, .unit3, .unit4, .unit5, .unit6, #experienciasCards").hide();
    });
    $("#detail3").on("click", function () {
        $(".unit3").show();
        $(".unit1, .unit2, .unit4, .unit5, .unit6, #experienciasCards").hide();
    });
    $("#detail4").on("click", function () {
        $(".unit4").show();
        $(".unit1, .unit2, .unit3, .unit5, .unit6, #experienciasCards").hide();
    });
    $("#detail5").on("click", function () {
        $(".unit5").show();
        $(".unit1, .unit2, .unit3, .unit4, .unit6, #experienciasCards").hide();
    });
    $("#detail6").on("click", function () {
        $(".unit6").show();
        $(".unit1, .unit2, .unit3, .unit4, .unit5, #experienciasCards").hide();
    });
    $(".btnRegresar").on("click", function () {
        $("#experienciasCards").show();
        $(".unit1, .unit2, .unit3, .unit4, .unit5, .unit6, .zipCodeBrowser, .zipAlert, .zipAlert2, .formdiv, .purchDiv").hide();
    });

    // Función para pasar a Zip Code Validation

    $(".nxt1").on("click", function () {
        $("#experienciasCards").hide();
        $(".unit1, .unit2, .unit3, .unit4, .unit5, .unit6").hide();
        $(".zipCodeBrowser").show(1000)

    });

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
        var id = shopItem.dataset.itemId
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
            <input type="hidden" value="${title}" name="title">
            <span class="cart-item-title" >${title}</span>
        </div>
        <span class="cart-price cart-column" name="price">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" name="quantity">
            <button class="btn btn-danger" type="button">ELIMINAR</button>
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
