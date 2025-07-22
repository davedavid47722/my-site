/*  ---------------------------------------------------
Template Name: Ashion
Description: Ashion ecommerce template
Author: Colorib - Enhanced by AI Assistant
Version: 2.0 - Fully Functional
---------------------------------------------------------  */

'use strict';

(function ($) {
    console.log('🚀 Ashion Enhanced Cart System Loading...');

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
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    if(mm == 12) {
        mm = '01';
        yyyy = yyyy + 1;
    } else {
        mm = parseInt(mm) + 1;
        mm = String(mm).padStart(2, '0');
    }
    var timerdate = mm + '/' + dd + '/' + yyyy;

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

    // ===================================================
    // ULTRA RELIABLE CART SYSTEM - WORKS ON ALL PAGES
    // ===================================================

    // Global variables
    window.AshionCart = {
        initialized: false,
        debug: true
    };

    function log(message, data) {
        if (window.AshionCart.debug) {
            console.log('[ASHION CART]', message, data || '');
        }
    }

    // Notification system
    function showMessage(message, type) {
        type = type || 'success';
        var colors = {
            success: '#28a745',
            error: '#dc3545', 
            info: '#17a2b8',
            warning: '#ffc107'
        };

        $('.cart-notification').remove();

        var notification = $('<div class="cart-notification">' + message + '</div>');
        notification.css({
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: colors[type],
            color: 'white',
            padding: '15px 25px',
            borderRadius: '8px',
            zIndex: '999999',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
            maxWidth: '350px',
            animation: 'slideInRight 0.3s ease'
        });

        $('body').append(notification);
        setTimeout(() => notification.fadeOut(300, () => notification.remove()), 3000);
        log('Notification:', message);
    }

    // Cart management
    function getCart() {
        try {
            return JSON.parse(localStorage.getItem('ashion_cart') || '[]');
        } catch (e) {
            log('Error reading cart:', e);
            return [];
        }
    }

    function saveCart(cart) {
        try {
            localStorage.setItem('ashion_cart', JSON.stringify(cart));
            updateCartDisplay();
            log('Cart saved:', cart);
            return true;
        } catch (e) {
            log('Error saving cart:', e);
            showMessage('Failed to save cart', 'error');
            return false;
        }
    }

    function updateCartDisplay() {
        var cart = getCart();
        var totalItems = cart.reduce((sum, item) => sum + parseInt(item.quantity || 0), 0);
        $('.tip').text(totalItems);
        log('Cart display updated:', totalItems);
    }

    function addToCart(product) {
        log('Adding to cart:', product);
        
        if (!product.name || !product.price) {
            showMessage('Invalid product information', 'error');
            return false;
        }

        var cart = getCart();
        var existing = cart.find(item => item.name === product.name);

        if (existing) {
            existing.quantity = parseInt(existing.quantity) + parseInt(product.quantity || 1);
        } else {
            cart.push({
                id: Date.now(),
                name: product.name,
                price: parseFloat(product.price),
                quantity: parseInt(product.quantity || 1),
                image: product.image || 'img/product/product-1.jpg'
            });
        }

        if (saveCart(cart)) {
            showMessage('✅ ' + product.name + ' added to cart!', 'success');
            return true;
        }
        return false;
    }

    function removeFromCart(index) {
        var cart = getCart();
        if (index >= 0 && index < cart.length) {
            var item = cart.splice(index, 1)[0];
            saveCart(cart);
            showMessage('Item removed from cart', 'info');
            return true;
        }
        return false;
    }

    function updateQuantity(index, quantity) {
        var cart = getCart();
        if (index >= 0 && index < cart.length && quantity > 0) {
            cart[index].quantity = parseInt(quantity);
            saveCart(cart);
            return true;
        }
        return false;
    }

    function clearCart() {
        localStorage.removeItem('ashion_cart');
        updateCartDisplay();
        log('Cart cleared');
    }

    // ===================================================
    // QUANTITY CONTROLS - ENHANCED VERSION
    // ===================================================

    function setupQuantityControls() {
        $('.pro-qty').each(function() {
            var $qty = $(this);
            if (!$qty.find('.qtybtn').length) {
                $qty.prepend('<span class="dec qtybtn">-</span>');
                $qty.append('<span class="inc qtybtn">+</span>');
            }
        });
        log('Quantity controls setup completed');
    }

    $(document).on('click', '.qtybtn', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var $btn = $(this);
        var $input = $btn.siblings('input');
        var current = parseInt($input.val()) || 1;
        var newVal = $btn.hasClass('inc') ? current + 1 : Math.max(1, current - 1);
        
        $input.val(newVal);

        // Update cart if on cart page
        var $row = $btn.closest('tr[data-idx]');
        if ($row.length) {
            var index = parseInt($row.data('idx'));
            updateQuantity(index, newVal);
            renderCartPage();
        }
        
        log('Quantity updated:', {old: current, new: newVal});
    });

    // ===================================================
    // ADD TO CART BUTTONS - MULTIPLE METHODS
    // ===================================================

    // Method 1: Product hover icons
    $(document).on('click', '.product__hover .icon_bag_alt', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var $item = $(this).closest('.product__item');
        var name = $item.find('h6 a').text().trim() || 'Product';
        var priceText = $item.find('.product__price').text();
        var price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 29.99;
        var image = $item.find('.set-bg').data('setbg') || 'img/product/product-1.jpg';
        
        addToCart({name, price, quantity: 1, image});
    });

    // Method 2: Cart button (product details)
    $(document).on('click', '.cart-btn', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var $details = $(this).closest('.product__details__text');
        var name = $details.find('h3').clone().children().remove().end().text().trim();
        var priceText = $details.find('.product__details__price').text();
        var price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        var quantity = parseInt($details.find('.pro-qty input').val()) || 1;
        var image = $('.product__big__img').attr('src') || 'img/product/product-1.jpg';
        
        if (!name || !price) {
            showMessage('Product information missing', 'error');
            return;
        }
        
        addToCart({name, price, quantity, image});
    });

    // Method 3: Any element with add-to-cart class
    $(document).on('click', '.add-to-cart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var $elem = $(this);
        var product = {
            name: $elem.data('name') || 'Product',
            price: parseFloat($elem.data('price')) || 19.99,
            quantity: parseInt($elem.data('quantity')) || 1,
            image: $elem.data('image') || 'img/product/product-1.jpg'
        };
        
        addToCart(product);
    });

    // ===================================================
    // NAVIGATION BUTTONS
    // ===================================================

    // Cart icon navigation
    $(document).on('click', '.header__right__widget .icon_bag_alt, .offcanvas__widget .icon_bag_alt', function(e) {
        if (!$(this).closest('.product__hover').length) {
            e.preventDefault();
            window.location.href = 'shop-cart.html';
        }
    });

    // Checkout buttons
    $(document).on('click', '.primary-btn', function(e) {
        var text = $(this).text().toLowerCase();
        if (text.includes('checkout') || text.includes('proceed')) {
            var cart = getCart();
            if (cart.length === 0) {
                e.preventDefault();
                showMessage('Cart is empty! Add some products first.', 'warning');
                return;
            }
            if (!window.location.pathname.includes('checkout.html')) {
                e.preventDefault();
                window.location.href = 'checkout.html';
            }
        }
    });

    // Continue shopping
    $(document).on('click', 'a', function(e) {
        if ($(this).text().toLowerCase().includes('continue shopping')) {
            e.preventDefault();
            window.location.href = 'shop.html';
        }
    });

    // ===================================================
    // CART PAGE FUNCTIONALITY
    // ===================================================

    function renderCartPage() {
        if (!window.location.pathname.includes('shop-cart.html')) return;
        
        var cart = getCart();
        var $tbody = $('.shop__cart__table tbody');
        var $total = $('.cart__total__procced ul');
        
        $tbody.empty();
        
        if (cart.length === 0) {
            $tbody.append(`
                <tr><td colspan="5" style="text-align: center; padding: 50px;">
                    <h4>Your cart is empty</h4>
                    <p>Add some products to get started!</p>
                    <a href="shop.html" class="primary-btn">Continue Shopping</a>
                </td></tr>
            `);
            $total.html('<li>Subtotal <span>$ 0.00</span></li><li>Total <span>$ 0.00</span></li>');
            return;
        }
        
        var subtotal = 0;
        cart.forEach((item, index) => {
            var total = item.price * item.quantity;
            subtotal += total;
            
            $tbody.append(`
                <tr data-idx="${index}">
                    <td class="cart__product__item">
                        <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover;">
                        <div class="cart__product__item__title">
                            <h6>${item.name}</h6>
                        </div>
                    </td>
                    <td class="cart__price">$ ${item.price.toFixed(2)}</td>
                    <td class="cart__quantity">
                        <div class="pro-qty">
                            <span class="dec qtybtn">-</span>
                            <input type="text" value="${item.quantity}">
                            <span class="inc qtybtn">+</span>
                        </div>
                    </td>
                    <td class="cart__total">$ ${total.toFixed(2)}</td>
                    <td class="cart__close"><span class="icon_close" data-remove="${index}"></span></td>
                </tr>
            `);
        });
        
        $total.html(`
            <li>Subtotal <span>$ ${subtotal.toFixed(2)}</span></li>
            <li>Total <span>$ ${subtotal.toFixed(2)}</span></li>
        `);
        
        log('Cart page rendered');
    }

    // Remove from cart
    $(document).on('click', '.icon_close', function(e) {
        e.preventDefault();
        var index = parseInt($(this).data('remove'));
        if (!isNaN(index)) {
            removeFromCart(index);
            renderCartPage();
        }
    });

    // Update cart on input change
    $(document).on('change', '.shop__cart__table .pro-qty input', function() {
        var index = parseInt($(this).closest('tr').data('idx'));
        var quantity = parseInt($(this).val()) || 1;
        if (!isNaN(index)) {
            updateQuantity(index, quantity);
            renderCartPage();
        }
    });

    // ===================================================
    // CHECKOUT PAGE FUNCTIONALITY
    // ===================================================

    function renderCheckoutPage() {
        if (!window.location.pathname.includes('checkout.html')) return;
        
        var cart = getCart();
        var $orderList = $('.checkout__order__product ul');
        var $orderTotal = $('.checkout__order__total ul');
        
        if ($orderList.length) {
            $orderList.empty();
            $orderList.append('<li><span class="top__text">Product</span><span class="top__text__right">Total</span></li>');
            
            var subtotal = 0;
            cart.forEach(item => {
                var total = item.price * item.quantity;
                subtotal += total;
                $orderList.append(`<li>${item.name} x${item.quantity} <span>$ ${total.toFixed(2)}</span></li>`);
            });
            
            if ($orderTotal.length) {
                $orderTotal.html(`
                    <li>Subtotal <span>$ ${subtotal.toFixed(2)}</span></li>
                    <li>Total <span>$ ${subtotal.toFixed(2)}</span></li>
                `);
            }
        }
        log('Checkout page rendered');
    }

    // Place order
    $(document).on('click', '.site-btn', function(e) {
        var text = $(this).text().toLowerCase();
        if (text.includes('place order')) {
            e.preventDefault();
            var cart = getCart();
            if (cart.length === 0) {
                showMessage('Cart is empty!', 'error');
                return;
            }
            
            showMessage('Processing order...', 'info');
            setTimeout(() => {
                clearCart();
                showMessage('Order placed successfully! Thank you!', 'success');
                setTimeout(() => window.location.href = 'index.html', 2000);
            }, 1500);
        }
    });

    // ===================================================
    // FORM FUNCTIONALITY
    // ===================================================

    // Newsletter
    $(document).on('click', '.site-btn', function(e) {
        var text = $(this).text().toLowerCase();
        if (text.includes('subscribe')) {
            e.preventDefault();
            var email = $(this).closest('form').find('input').val().trim();
            if (email && email.includes('@') && email.includes('.')) {
                showMessage('Subscribed successfully!', 'success');
                $(this).closest('form')[0].reset();
            } else {
                showMessage('Please enter a valid email', 'error');
            }
        }
    });

    // Contact form
    $(document).on('click', '.site-btn', function(e) {
        var text = $(this).text().toLowerCase();
        if (text.includes('send') && !text.includes('subscribe')) {
            e.preventDefault();
            var $form = $(this).closest('form');
            var hasContent = false;
            $form.find('input, textarea').each(function() {
                if ($(this).val().trim()) hasContent = true;
            });
            
            if (hasContent) {
                showMessage('Message sent successfully!', 'success');
                $form[0].reset();
            } else {
                showMessage('Please fill required fields', 'error');
            }
        }
    });

    // Coupon codes
    $(document).on('click', '.site-btn', function(e) {
        var text = $(this).text().toLowerCase();
        if (text.includes('apply')) {
            e.preventDefault();
            var coupon = $(this).closest('form').find('input').val().trim().toUpperCase();
            var validCoupons = ['SAVE10', 'DISCOUNT20', 'WELCOME', 'SUMMER25', 'NEWUSER'];
            
            if (coupon && validCoupons.includes(coupon)) {
                showMessage(`Coupon "${coupon}" applied!`, 'success');
            } else if (coupon) {
                showMessage('Invalid coupon code', 'error');
            } else {
                showMessage('Enter a coupon code', 'error');
            }
        }
    });

    // ===================================================
    // WISHLIST FUNCTIONALITY
    // ===================================================

    $(document).on('click', '.icon_heart_alt', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var $item = $(this).closest('.product__item, .product__details__text');
        var name = $item.find('h6 a, h3').first().text().trim() || 'Product';
        
        var wishlist = JSON.parse(localStorage.getItem('ashion_wishlist') || '[]');
        if (!wishlist.includes(name)) {
            wishlist.push(name);
            localStorage.setItem('ashion_wishlist', JSON.stringify(wishlist));
            showMessage(`Added "${name}" to wishlist!`, 'success');
        } else {
            showMessage('Already in wishlist', 'info');
        }
    });

    // ===================================================
    // INITIALIZATION & SETUP
    // ===================================================

    function initializeSystem() {
        if (window.AshionCart.initialized) return;
        
        log('🚀 Initializing Ashion Cart System');
        
        // Setup quantity controls
        setupQuantityControls();
        
        // Update cart display
        updateCartDisplay();
        
        // Initialize page-specific features
        var path = window.location.pathname;
        if (path.includes('shop-cart.html')) {
            renderCartPage();
        }
        if (path.includes('checkout.html')) {
            renderCheckoutPage();
        }
        
        window.AshionCart.initialized = true;
        log('✅ System initialized successfully');
    }

    // Initialize immediately
    initializeSystem();
    
    // Re-initialize on DOM ready
    $(document).ready(function() {
        setTimeout(initializeSystem, 100);
        
        // Periodic maintenance
        setInterval(() => {
            setupQuantityControls();
            updateCartDisplay();
        }, 3000);
        
        log('🎉 Ashion Enhanced Cart System Ready!');
    });

    // Radio button functionality
    $(".size__btn label").on('click', function () {
        $(".size__btn label").removeClass('active');
        $(this).addClass('active');
    });

})(jQuery);
