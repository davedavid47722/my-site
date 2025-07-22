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
	
    // Quantity button functionality
	$(document).on('click', '.qtybtn', function () {
		var $button = $(this);
		var $input = $button.parent().find('input');
		var oldValue = parseInt($input.val()) || 0;
        var newVal;
        
		if ($button.hasClass('inc')) {
			newVal = oldValue + 1;
		} else {
			// Don't allow decrementing below 1
			newVal = oldValue > 1 ? oldValue - 1 : 1;
		}
        
		$input.val(newVal);
        
        // If this is on cart page, update cart immediately
        if (window.location.pathname.includes('shop-cart.html')) {
            var idx = $button.closest('tr').data('idx');
            if (typeof idx !== 'undefined') {
                updateCartItemQuantity(idx, newVal);
            }
        }
    });
    
    /*-------------------
		Radio Btn
	--------------------- */
    $(".size__btn label").on('click', function () {
        $(".size__btn label").removeClass('active');
        $(this).addClass('active');
    });

    // ===============================================
    // COMPLETE CART & BUTTON FUNCTIONALITY
    // ===============================================

    // Cart management functions
    function getCart() {
        try {
            return JSON.parse(localStorage.getItem('ashion_cart') || '[]');
        } catch (e) {
            console.error('Error reading cart:', e);
            return [];
        }
    }

    function setCart(cart) {
        try {
            localStorage.setItem('ashion_cart', JSON.stringify(cart));
            updateCartCount();
        } catch (e) {
            console.error('Error saving cart:', e);
        }
    }

    function updateCartCount() {
        var cart = getCart();
        var totalItems = cart.reduce(function(sum, item) { 
            return sum + (parseInt(item.quantity) || 0); 
        }, 0);
        
        // Update all cart counters
        $('.tip').text(totalItems);
        
        // Update cart badge in header
        $('.header__right__widget .tip, .offcanvas__widget .tip').text(totalItems);
        
        console.log('Cart updated. Total items:', totalItems);
    }

    function addToCart(productData) {
        var cart = getCart();
        var existingItem = cart.find(function(item) { 
            return item.name === productData.name; 
        });
        
        if (existingItem) {
            existingItem.quantity = parseInt(existingItem.quantity) + parseInt(productData.quantity);
        } else {
            cart.push(productData);
        }
        
        setCart(cart);
        showNotification('Product added to cart successfully!', 'success');
    }

    function removeFromCart(index) {
        var cart = getCart();
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1);
            setCart(cart);
            showNotification('Item removed from cart', 'info');
        }
    }

    function updateCartItemQuantity(index, quantity) {
        var cart = getCart();
        if (index >= 0 && index < cart.length && quantity > 0) {
            cart[index].quantity = parseInt(quantity);
            setCart(cart);
            renderCartPage();
        }
    }

    function clearCart() {
        localStorage.removeItem('ashion_cart');
        updateCartCount();
    }

    function showNotification(message, type) {
        type = type || 'success';
        
        // Create notification element
        var notification = $('<div class="notification notification-' + type + '">' + message + '</div>');
        
        // Add styles
        notification.css({
            'position': 'fixed',
            'top': '20px',
            'right': '20px',
            'background': type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8',
            'color': 'white',
            'padding': '15px 20px',
            'border-radius': '5px',
            'z-index': '9999',
            'font-size': '14px',
            'box-shadow': '0 4px 6px rgba(0,0,0,0.1)',
            'max-width': '300px'
        });
        
        // Add to body
        $('body').append(notification);
        
        // Fade in
        notification.fadeIn(300);
        
        // Remove after 3 seconds
        setTimeout(function() {
            notification.fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    }

    // Add to cart from product listings (index.html, shop.html)
    $(document).on('click', '.product__hover .icon_bag_alt', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var $productItem = $(this).closest('.product__item');
        var name = $productItem.find('h6 a').text().trim();
        var priceText = $productItem.find('.product__price').text().trim();
        var price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        var img = $productItem.find('.set-bg').data('setbg') || 'img/product/product-1.jpg';
        
        if (!name) {
            name = 'Product';
        }
        if (!price || isNaN(price)) {
            price = 0;
        }
        
        var productData = {
            name: name,
            price: price,
            image: img,
            quantity: 1
        };
        
        addToCart(productData);
    });

    // Add to cart from product details page
    $(document).on('click', '.cart-btn', function(e) {
        e.preventDefault();
        
        var $productSection = $(this).closest('.product__details__text');
        var name = $productSection.find('h3').clone().children().remove().end().text().trim();
        var priceText = $productSection.find('.product__details__price').text().trim();
        var price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        var quantity = parseInt($productSection.find('.pro-qty input').val()) || 1;
        var img = $('.product__big__img').first().attr('src') || 'img/product/product-1.jpg';
        
        if (!name) {
            showNotification('Product name not found', 'error');
            return;
        }
        
        if (!price || isNaN(price)) {
            showNotification('Product price not found', 'error');
            return;
        }
        
        var productData = {
            name: name,
            price: price,
            image: img,
            quantity: quantity
        };
        
        addToCart(productData);
    });

    // Cart icon click - navigate to cart page (but not from product hover buttons)
    $(document).on('click', '.header__right__widget .icon_bag_alt, .offcanvas__widget .icon_bag_alt', function(e) {
        e.preventDefault();
        window.location.href = 'shop-cart.html';
    });

    // Wishlist functionality
    $(document).on('click', '.icon_heart_alt', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var $productItem = $(this).closest('.product__item, .product__details__text');
        var name = $productItem.find('h6 a, h3').first().text().trim() || 'Product';
        
        // Store in wishlist (using localStorage)
        var wishlist = JSON.parse(localStorage.getItem('ashion_wishlist') || '[]');
        if (!wishlist.includes(name)) {
            wishlist.push(name);
            localStorage.setItem('ashion_wishlist', JSON.stringify(wishlist));
            showNotification('Added "' + name + '" to wishlist!', 'success');
        } else {
            showNotification('Product already in wishlist', 'info');
        }
    });

    // ===============================================
    // CART PAGE FUNCTIONALITY
    // ===============================================
    
    function renderCartPage() {
        if (!window.location.pathname.includes('shop-cart.html')) {
            return;
        }
        
        var cart = getCart();
        var $tbody = $('.shop__cart__table tbody');
        var $cartTotal = $('.cart__total__procced ul');
        
        // Clear existing content
        $tbody.empty();
        
        if (cart.length === 0) {
            $tbody.append(
                '<tr><td colspan="5" style="text-align: center; padding: 50px; font-size: 18px;">' +
                'Your cart is empty<br><br>' +
                '<a href="shop.html" class="primary-btn">Continue Shopping</a>' +
                '</td></tr>'
            );
            $cartTotal.html('<li>Subtotal <span>$ 0.00</span></li><li>Total <span>$ 0.00</span></li>');
            return;
        }
        
        var subtotal = 0;
        
        cart.forEach(function(item, index) {
            var itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            $tbody.append(
                '<tr data-idx="' + index + '">' +
                    '<td class="cart__product__item">' +
                        '<img src="' + item.image + '" alt="' + item.name + '" style="width: 80px; height: 80px; object-fit: cover;">' +
                        '<div class="cart__product__item__title">' +
                            '<h6>' + item.name + '</h6>' +
                        '</div>' +
                    '</td>' +
                    '<td class="cart__price">$ ' + item.price.toFixed(2) + '</td>' +
                    '<td class="cart__quantity">' +
                        '<div class="pro-qty">' +
                            '<span class="dec qtybtn">-</span>' +
                            '<input type="text" value="' + item.quantity + '">' +
                            '<span class="inc qtybtn">+</span>' +
                        '</div>' +
                    '</td>' +
                    '<td class="cart__total">$ ' + itemTotal.toFixed(2) + '</td>' +
                    '<td class="cart__close"><span class="icon_close"></span></td>' +
                '</tr>'
            );
        });
        
        // Update totals
        $cartTotal.html(
            '<li>Subtotal <span>$ ' + subtotal.toFixed(2) + '</span></li>' +
            '<li>Total <span>$ ' + subtotal.toFixed(2) + '</span></li>'
        );
    }

    // Remove item from cart
    $(document).on('click', '.cart__close .icon_close', function(e) {
        e.preventDefault();
        var index = $(this).closest('tr').data('idx');
        removeFromCart(index);
        renderCartPage();
    });

    // Update cart quantity on input change
    $(document).on('change', '.shop__cart__table .pro-qty input', function() {
        var index = $(this).closest('tr').data('idx');
        var quantity = parseInt($(this).val()) || 1;
        updateCartItemQuantity(index, quantity);
    });

    // Continue shopping button
    $(document).on('click', 'a[href="#"]', function(e) {
        var linkText = $(this).text().toLowerCase();
        if (linkText.includes('continue shopping')) {
            e.preventDefault();
            window.location.href = 'shop.html';
        }
    });

    // Update cart button
    $(document).on('click', '.update__btn a', function(e) {
        e.preventDefault();
        renderCartPage();
        showNotification('Cart updated successfully!', 'success');
    });

    // ===============================================
    // CHECKOUT PAGE FUNCTIONALITY
    // ===============================================
    
    function renderCheckoutPage() {
        if (!window.location.pathname.includes('checkout.html')) {
            return;
        }
        
        var cart = getCart();
        var $orderList = $('.checkout__order__product ul');
        var $orderTotal = $('.checkout__order__total ul');
        
        if ($orderList.length) {
            $orderList.empty();
            $orderList.append('<li><span class="top__text">Product</span><span class="top__text__right">Total</span></li>');
            
            var subtotal = 0;
            
            cart.forEach(function(item) {
                var itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                $orderList.append(
                    '<li>' + item.name + ' x' + item.quantity + 
                    ' <span>$ ' + itemTotal.toFixed(2) + '</span></li>'
                );
            });
            
            if ($orderTotal.length) {
                $orderTotal.html(
                    '<li>Subtotal <span>$ ' + subtotal.toFixed(2) + '</span></li>' +
                    '<li>Total <span>$ ' + subtotal.toFixed(2) + '</span></li>'
                );
            }
        }
    }

    // Proceed to checkout button
    $(document).on('click', '.primary-btn', function(e) {
        var btnText = $(this).text().toLowerCase();
        
        if (btnText.includes('proceed to checkout') || btnText.includes('checkout')) {
            var cart = getCart();
            if (cart.length === 0) {
                e.preventDefault();
                showNotification('Your cart is empty! Add some products first.', 'error');
                return;
            }
            
            if (!window.location.pathname.includes('checkout.html')) {
                e.preventDefault();
                window.location.href = 'checkout.html';
            }
        }
    });

    // Place order button
    $(document).on('click', '.site-btn', function(e) {
        var btnText = $(this).text().toLowerCase();
        
        if (btnText.includes('place order')) {
            e.preventDefault();
            
            var cart = getCart();
            if (cart.length === 0) {
                showNotification('Your cart is empty!', 'error');
                return;
            }
            
            // Simulate order processing
            showNotification('Processing your order...', 'info');
            
            setTimeout(function() {
                clearCart();
                showNotification('Order placed successfully! Thank you for your purchase.', 'success');
                
                setTimeout(function() {
                    window.location.href = 'index.html';
                }, 2000);
            }, 1500);
        }
    });

    // ===============================================
    // FORM FUNCTIONALITY
    // ===============================================
    
    // Newsletter subscription
    $(document).on('click', '.site-btn', function(e) {
        var btnText = $(this).text().toLowerCase();
        var $form = $(this).closest('form');
        
        if (btnText.includes('subscribe')) {
            e.preventDefault();
            
            var email = $form.find('input[type="text"], input[type="email"]').val().trim();
            if (email && email.includes('@') && email.includes('.')) {
                showNotification('Successfully subscribed to newsletter!', 'success');
                $form[0].reset();
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        }
    });

    // Contact form
    $(document).on('click', '.site-btn', function(e) {
        var btnText = $(this).text().toLowerCase();
        var $form = $(this).closest('form');
        
        if (btnText.includes('send message') || btnText.includes('send')) {
            e.preventDefault();
            
            var hasContent = false;
            $form.find('input[type="text"], input[type="email"], textarea').each(function() {
                if ($(this).val().trim()) {
                    hasContent = true;
                }
            });
            
            if (hasContent) {
                showNotification('Message sent successfully! We will get back to you soon.', 'success');
                $form[0].reset();
            } else {
                showNotification('Please fill in the required fields', 'error');
            }
        }
    });

    // Coupon application
    $(document).on('click', '.site-btn', function(e) {
        var btnText = $(this).text().toLowerCase();
        var $form = $(this).closest('form');
        
        if (btnText.includes('apply')) {
            e.preventDefault();
            
            var coupon = $form.find('input[type="text"]').val().trim();
            if (coupon) {
                // Simulate coupon validation
                var validCoupons = ['SAVE10', 'DISCOUNT20', 'WELCOME'];
                if (validCoupons.includes(coupon.toUpperCase())) {
                    showNotification('Coupon "' + coupon + '" applied successfully!', 'success');
                } else {
                    showNotification('Invalid coupon code', 'error');
                }
            } else {
                showNotification('Please enter a coupon code', 'error');
            }
        }
    });

    // ===============================================
    // INITIALIZATION
    // ===============================================
    
    // Initialize on page load
    $(document).ready(function() {
        updateCartCount();
        
        // Initialize cart page if we're on it
        if (window.location.pathname.includes('shop-cart.html')) {
            renderCartPage();
        }
        
        // Initialize checkout page if we're on it
        if (window.location.pathname.includes('checkout.html')) {
            renderCheckoutPage();
        }
        
        console.log('Ashion cart system initialized');
    });

})(jQuery);