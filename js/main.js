(function ($) {
    "use strict";

    // Initiate superfish on nav menu
    $('.nav-menu').superfish({
        animation: {opacity: 'show'},
        speed: 400
    });

    // Mobile Navigation
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({id: 'mobile-nav'});
        $mobile_nav.find('> ul').attr({'class': '', 'id': ''});
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function (e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function (e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').toggle();
        });

        $(document).click(function (e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    // Stick the header at top on scroll
    $("#header").sticky({topSpacing: 0, zIndex: '50'});

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Header scroll class
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }

    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
    });
    
    // Date and time picker
    $('#date').datetimepicker({
        format: 'L'
    });
    $('#time').datetimepicker({
        format: 'LT'
    });
    
})(jQuery);

function testConnection() {
  const host = document.getElementById("hostname").value || "localhost";
  const db = document.getElementById("dbname").value || "TestDB";
  const user = document.getElementById("username").value || "srctopology";
  const pass = document.getElementById("password").value || "default_password";

  document.getElementById("loading").style.display = "block";
  document.getElementById("resultBox").style.display = "none";
  document.getElementById("resultOutput").innerText = "";

  fetch("/test-db", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ host, db, user, pass })
  })
  .then(res => res.json())
  .then(result => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("resultBox").style.display = "block";
    if (result.status === "success") {
      document.getElementById("resultOutput").innerText = `✅ ${result.message}`;
      document.getElementById("resultBox").style.borderLeft = "5px solid #28a745";
    } else {
      document.getElementById("resultOutput").innerText = `❌ ${result.message}`;
      document.getElementById("resultBox").style.borderLeft = "5px solid red";
    }
  })
  .catch(error => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("resultBox").style.display = "block";
    document.getElementById("resultOutput").innerText = `❌ Connection error: ${error.message}`;
    document.getElementById("resultBox").style.borderLeft = "5px solid red";
  });
}

