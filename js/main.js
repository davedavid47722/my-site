/*  ---------------------------------------------------
Template Name: Ashion
Description: Ashion ecommerce template
Author: Colorib
Author URI: https://colorlib.com/
Version: 1.0
Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Product filter
        --------------------*/
        $('.filter__controls li').on('click', function () {
            $('.filter__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.property__gallery').length > 0) {
            var containerEl = document.querySelector('.property__gallery');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Search Switch
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    //Canvas Menu
    $(".canvas__open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("active");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay, .offcanvas__close").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("active");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    /*------------------
		Navigation
	--------------------*/
    $(".header__menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Accordin Active
    --------------------*/
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });

    /*--------------------------
        Banner Slider
    ----------------------------*/
    $(".banner__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*--------------------------
        Product Details Slider
    ----------------------------*/
    $(".product__details__pic__slider").owlCarousel({
        loop: false,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<i class='arrow_carrot-left'></i>","<i class='arrow_carrot-right'></i>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false,
        mouseDrag: false,
        startPosition: 'URLHash'
    }).on('changed.owl.carousel', function(event) {
        var indexNum = event.item.index + 1;
        product_thumbs(indexNum);
    });

    function product_thumbs (num) {
        var thumbs = document.querySelectorAll('.product__thumb a');
        thumbs.forEach(function (e) {
            e.classList.remove("active");
            if(e.hash.split("-")[1] == num) {
                e.classList.add("active");
            }
        })
    }


    /*------------------
		Magnific
    --------------------*/
    $('.image-popup').magnificPopup({
        type: 'image'
    });


    $(".nice-scroll").niceScroll({
        cursorborder:"",
        cursorcolor:"#dddddd",
        boxzoom:false,
        cursorwidth: 5,
        background: 'rgba(0, 0, 0, 0.2)',
        cursorborderradius:50,
        horizrailenabled: false
    });

    /*------------------
        CountDown
    --------------------*/
    // For demo preview start
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    if(mm == 12) {
        mm = '01';
        yyyy = yyyy + 1;
    } else {
        mm = parseInt(mm) + 1;
        mm = String(mm).padStart(2, '0');
    }
    var timerdate = mm + '/' + dd + '/' + yyyy;
    // For demo preview end


    // Uncomment below and use your date //

    /* var timerdate = "2020/12/30" */

	$("#countdown-time").countdown(timerdate, function(event) {
        $(this).html(event.strftime("<div class='countdown__item'><span>%D</span> <p>Day</p> </div>" + "<div class='countdown__item'><span>%H</span> <p>Hour</p> </div>" + "<div class='countdown__item'><span>%M</span> <p>Min</p> </div>" + "<div class='countdown__item'><span>%S</span> <p>Sec</p> </div>"));
    });

    /*-------------------
		Range Slider
	--------------------- */
	var rangeSlider = $(".price-range"),
    minamount = $("#minamount"),
    maxamount = $("#maxamount"),
    minPrice = rangeSlider.data('min'),
    maxPrice = rangeSlider.data('max');
    rangeSlider.slider({
    range: true,
    min: minPrice,
    max: maxPrice,
    values: [minPrice, maxPrice],
    slide: function (event, ui) {
        minamount.val('$' + ui.values[0]);
        maxamount.val('$' + ui.values[1]);
        }
    });
    minamount.val('$' + rangeSlider.slider("values", 0));
    maxamount.val('$' + rangeSlider.slider("values", 1));

    /*------------------
		Single Product
	--------------------*/
	$('.product__thumb .pt').on('click', function(){
		var imgurl = $(this).data('imgbigurl');
		var bigImg = $('.product__big__img').attr('src');
		if(imgurl != bigImg) {
			$('.product__big__img').attr({src: imgurl});
		}
    });
    
    /*-------------------
		Quantity change
	--------------------- */
    var proQty = $('.pro-qty');
	proQty.prepend('<span class="dec qtybtn">-</span>');
	proQty.append('<span class="inc qtybtn">+</span>');
	proQty.on('click', '.qtybtn', function () {
		var $button = $(this);
		var oldValue = $button.parent().find('input').val();
		if ($button.hasClass('inc')) {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			// Don't allow decrementing below zero
			if (oldValue > 0) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 0;
			}
		}
		$button.parent().find('input').val(newVal);
    });
    
    /*-------------------
		Radio Btn
	--------------------- */
    $(".size__btn label").on('click', function () {
        $(".size__btn label").removeClass('active');
        $(this).addClass('active');
    });

    // === CART & BUTTON FUNCTIONALITY ADDED ===

    // Utility functions for cart
    function getCart() {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    }
    function setCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    function updateCartCount() {
        var cart = getCart();
        var count = cart.reduce((sum, item) => sum + item.quantity, 0);
        // Update all cart icons
        $('.icon_bag_alt').each(function() {
            var tip = $(this).siblings('.tip');
            if (tip.length) tip.text(count);
            else $(this).after('<div class="tip">' + count + '</div>');
        });
    }

    // Add to cart button (on product-details.html)
    $('button.cart-btn, .cart-btn').on('click', function(e) {
        e.preventDefault();
        var $pd = $(this).closest('.product__details__text');
        var name = $pd.find('h3').clone().children().remove().end().text().trim();
        var priceText = $pd.find('.product__details__price').text().trim();
        var price = parseFloat(priceText.split('$')[1]);
        var img = $('.product__big__img').first().attr('src');
        var qty = parseInt($pd.find('.pro-qty input').val()) || 1;
        var cart = getCart();
        var existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity += qty;
        } else {
            cart.push({ name, price, img, quantity: qty });
        }
        setCart(cart);
        updateCartCount();
        alert('Added to cart!');
    });

    // On all pages, update cart count on load
    $(document).ready(function() {
        updateCartCount();
    });

    // Cart page logic (shop-cart.html)
    if (window.location.pathname.includes('shop-cart.html')) {
        function renderCart() {
            var cart = getCart();
            var $tbody = $('.shop__cart__table tbody');
            $tbody.empty();
            var subtotal = 0;
            cart.forEach((item, idx) => {
                var total = item.price * item.quantity;
                subtotal += total;
                $tbody.append(`
                    <tr data-idx="${idx}">
                        <td class="cart__product__item">
                            <img src="${item.img}" alt="">
                            <div class="cart__product__item__title">
                                <h6>${item.name}</h6>
                            </div>
                        </td>
                        <td class="cart__price">$ ${item.price.toFixed(2)}</td>
                        <td class="cart__quantity">
                            <div class="pro-qty"><input type="text" value="${item.quantity}"></div>
                        </td>
                        <td class="cart__total">$ ${(total).toFixed(2)}</td>
                        <td class="cart__close"><span class="icon_close"></span></td>
                    </tr>
                `);
            });
            // Update totals
            $('.cart__total__procced ul').html(`
                <li>Subtotal <span>$ ${subtotal.toFixed(2)}</span></li>
                <li>Total <span>$ ${subtotal.toFixed(2)}</span></li>
            `);
        }
        renderCart();
        // Remove item
        $('.shop__cart__table').on('click', '.icon_close', function() {
            var idx = $(this).closest('tr').data('idx');
            var cart = getCart();
            cart.splice(idx, 1);
            setCart(cart);
            renderCart();
            updateCartCount();
        });
        // Update quantity
        $('.shop__cart__table').on('change', '.pro-qty input', function() {
            var idx = $(this).closest('tr').data('idx');
            var cart = getCart();
            var val = parseInt($(this).val());
            if (val > 0) cart[idx].quantity = val;
            setCart(cart);
            renderCart();
            updateCartCount();
        });
        // Proceed to checkout
        $('button.primary-btn, .primary-btn').on('click', function(e) {
            e.preventDefault();
            window.location.href = 'checkout.html';
        });
    }

    // Checkout page logic (checkout.html)
    if (window.location.pathname.includes('checkout.html')) {
        var cart = getCart();
        var subtotal = 0;
        var $orderList = $('.checkout__order__product ul');
        $orderList.empty();
        $orderList.append('<li><span class="top__text">Product</span><span class="top__text__right">Total</span></li>');
        cart.forEach((item, idx) => {
            var total = item.price * item.quantity;
            subtotal += total;
            $orderList.append(`<li>${item.name} x${item.quantity} <span>$ ${total.toFixed(2)}</span></li>`);
        });
        $('.checkout__order__total ul').html(`
            <li>Subtotal <span>$ ${subtotal.toFixed(2)}</span></li>
            <li>Total <span>$ ${subtotal.toFixed(2)}</span></li>
        `);
        // Place order button
        $('.site-btn').on('click', function(e) {
            if ($(this).text().toLowerCase().includes('place')) {
                e.preventDefault();
                localStorage.removeItem('cart');
                updateCartCount();
                alert('Order placed! Thank you.');
                window.location.href = 'index.html';
            }
        });
    }

    // Show success message for all site-btn and primary-btn (Subscribe, Send Message, etc)
    $(document).on('click', '.site-btn, .primary-btn', function(e) {
        var btnText = $(this).text().toLowerCase();
        if (btnText.includes('subscribe')) {
            e.preventDefault();
            alert('Subscribed successfully!');
        } else if (btnText.includes('send message')) {
            e.preventDefault();
            alert('Message sent!');
        } else if (btnText.includes('apply')) {
            e.preventDefault();
            alert('Coupon applied!');
        }
    });

})(jQuery);