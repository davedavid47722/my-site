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

    // === ENHANCED CART & BUTTON FUNCTIONALITY ===

    // Utility functions for cart management
    function getCart() {
        try {
            return JSON.parse(localStorage.getItem('cart') || '[]');
        } catch (e) {
            console.error('Error reading cart:', e);
            return [];
        }
    }

    function setCart(cart) {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (e) {
            console.error('Error saving cart:', e);
        }
    }

    function updateCartCount() {
        var cart = getCart();
        var count = cart.reduce(function(sum, item) { return sum + item.quantity; }, 0);
        
        // Update all cart badge icons
        $('.tip').text(count);
        
        // If no tip elements exist, create them
        $('.icon_bag_alt').each(function() {
            if ($(this).siblings('.tip').length === 0) {
                $(this).after('<div class="tip">' + count + '</div>');
            }
        });
    }

    function showMessage(message, type) {
        type = type || 'success';
        if (typeof alert !== 'undefined') {
            alert(message);
        } else {
            console.log(message);
        }
    }

    // Add to cart functionality (product-details.html)
    $(document).on('click', '.cart-btn', function(e) {
        e.preventDefault();
        
        try {
            var $productSection = $(this).closest('.product__details__text');
            var name = $productSection.find('h3').clone().children().remove().end().text().trim();
            var priceText = $productSection.find('.product__details__price').text().trim();
            var price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            var qty = parseInt($productSection.find('.pro-qty input').val()) || 1;
            var img = $('.product__big__img').first().attr('src') || 'img/product/product-1.jpg';
            
            if (!name || !price) {
                showMessage('Error: Product information not found', 'error');
                return;
            }

            var cart = getCart();
            var existingItem = cart.find(function(item) { return item.name === name; });
            
            if (existingItem) {
                existingItem.quantity += qty;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    img: img,
                    quantity: qty
                });
            }
            
            setCart(cart);
            updateCartCount();
            showMessage('Product added to cart successfully!');
            
        } catch (error) {
            console.error('Error adding to cart:', error);
            showMessage('Error adding product to cart', 'error');
        }
    });

    // Add to cart from product hover icons (index.html, shop.html, etc.)
    $(document).on('click', '.product__hover .icon_bag_alt', function(e) {
        e.preventDefault();
        
        try {
            var $productItem = $(this).closest('.product__item');
            var name = $productItem.find('h6 a').text().trim();
            var priceText = $productItem.find('.product__price').text().trim();
            var price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            var img = $productItem.find('.set-bg').data('setbg') || 'img/product/product-1.jpg';
            
            if (!name || !price) {
                showMessage('Error: Product information not found', 'error');
                return;
            }

            var cart = getCart();
            var existingItem = cart.find(function(item) { return item.name === name; });
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    img: img,
                    quantity: 1
                });
            }
            
            setCart(cart);
            updateCartCount();
            showMessage('Product added to cart!');
            
        } catch (error) {
            console.error('Error adding to cart:', error);
            showMessage('Error adding product to cart', 'error');
        }
    });

    // Initialize cart count on page load
    $(document).ready(function() {
        updateCartCount();
    });

    // Cart page functionality (shop-cart.html)
    if (window.location.pathname.includes('shop-cart.html')) {
        function renderCart() {
            var cart = getCart();
            var $tbody = $('.shop__cart__table tbody');
            var $totals = $('.cart__total__procced ul');
            
            $tbody.empty();
            
            if (cart.length === 0) {
                $tbody.append('<tr><td colspan="5" style="text-align: center; padding: 50px;">Your cart is empty</td></tr>');
                $totals.html('<li>Subtotal <span>$ 0.00</span></li><li>Total <span>$ 0.00</span></li>');
                return;
            }
            
            var subtotal = 0;
            
            cart.forEach(function(item, idx) {
                var total = item.price * item.quantity;
                subtotal += total;
                
                $tbody.append(
                    '<tr data-idx="' + idx + '">' +
                        '<td class="cart__product__item">' +
                            '<img src="' + item.img + '" alt="" style="width: 80px;">' +
                            '<div class="cart__product__item__title">' +
                                '<h6>' + item.name + '</h6>' +
                            '</div>' +
                        '</td>' +
                        '<td class="cart__price">$ ' + item.price.toFixed(2) + '</td>' +
                        '<td class="cart__quantity">' +
                            '<div class="pro-qty">' +
                                '<input type="text" value="' + item.quantity + '">' +
                            '</div>' +
                        '</td>' +
                        '<td class="cart__total">$ ' + total.toFixed(2) + '</td>' +
                        '<td class="cart__close"><span class="icon_close"></span></td>' +
                    '</tr>'
                );
            });
            
            $totals.html(
                '<li>Subtotal <span>$ ' + subtotal.toFixed(2) + '</span></li>' +
                '<li>Total <span>$ ' + subtotal.toFixed(2) + '</span></li>'
            );
        }
        
        // Render cart on page load
        renderCart();
        
        // Remove item from cart
        $(document).on('click', '.icon_close', function() {
            var idx = $(this).closest('tr').data('idx');
            var cart = getCart();
            cart.splice(idx, 1);
            setCart(cart);
            renderCart();
            updateCartCount();
            showMessage('Item removed from cart');
        });
        
        // Update quantity
        $(document).on('change', '.shop__cart__table .pro-qty input', function() {
            var idx = $(this).closest('tr').data('idx');
            var newQty = parseInt($(this).val());
            
            if (newQty > 0) {
                var cart = getCart();
                cart[idx].quantity = newQty;
                setCart(cart);
                renderCart();
                updateCartCount();
            }
        });
        
        // Proceed to checkout button
        $(document).on('click', '.primary-btn', function(e) {
            var cart = getCart();
            if (cart.length === 0) {
                e.preventDefault();
                showMessage('Your cart is empty!');
                return;
            }
            // Allow normal navigation to checkout
        });
    }

    // Checkout page functionality (checkout.html)
    if (window.location.pathname.includes('checkout.html')) {
        var cart = getCart();
        var subtotal = 0;
        var $orderList = $('.checkout__order__product ul');
        var $orderTotal = $('.checkout__order__total ul');
        
        if ($orderList.length) {
            $orderList.empty();
            $orderList.append('<li><span class="top__text">Product</span><span class="top__text__right">Total</span></li>');
            
            cart.forEach(function(item) {
                var total = item.price * item.quantity;
                subtotal += total;
                $orderList.append('<li>' + item.name + ' x' + item.quantity + ' <span>$ ' + total.toFixed(2) + '</span></li>');
            });
        }
        
        if ($orderTotal.length) {
            $orderTotal.html(
                '<li>Subtotal <span>$ ' + subtotal.toFixed(2) + '</span></li>' +
                '<li>Total <span>$ ' + subtotal.toFixed(2) + '</span></li>'
            );
        }
        
        // Place order button
        $(document).on('click', '.site-btn', function(e) {
            if ($(this).text().toLowerCase().includes('place')) {
                e.preventDefault();
                localStorage.removeItem('cart');
                updateCartCount();
                showMessage('Order placed successfully! Thank you for your purchase.');
                setTimeout(function() {
                    window.location.href = 'index.html';
                }, 2000);
            }
        });
    }

    // Newsletter subscription and contact form buttons
    $(document).on('click', '.site-btn', function(e) {
        var btnText = $(this).text().toLowerCase();
        var $form = $(this).closest('form');
        
        if (btnText.includes('subscribe')) {
            e.preventDefault();
            var email = $form.find('input[type="text"], input[type="email"]').val();
            if (email && email.includes('@')) {
                showMessage('Successfully subscribed to newsletter!');
                $form[0].reset();
            } else {
                showMessage('Please enter a valid email address');
            }
        } else if (btnText.includes('send message')) {
            e.preventDefault();
            showMessage('Message sent successfully! We will get back to you soon.');
            $form[0].reset();
        } else if (btnText.includes('apply')) {
            e.preventDefault();
            var coupon = $form.find('input[type="text"]').val();
            if (coupon) {
                showMessage('Coupon code applied!');
            } else {
                showMessage('Please enter a coupon code');
            }
        }
    });

    // Wishlist functionality
    $(document).on('click', '.icon_heart_alt', function(e) {
        e.preventDefault();
        var $productItem = $(this).closest('.product__item, .product__details__text');
        var name = $productItem.find('h6 a, h3').first().text().trim();
        
        if (name) {
            showMessage('Added "' + name + '" to wishlist!');
        }
    });

    // Continue shopping button
    $(document).on('click', 'a[href="#"]', function(e) {
        var linkText = $(this).text().toLowerCase();
        if (linkText.includes('continue shopping')) {
            e.preventDefault();
            window.location.href = 'shop.html';
        }
    });

})(jQuery);