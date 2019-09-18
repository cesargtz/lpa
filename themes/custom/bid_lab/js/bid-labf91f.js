(function ($) {$('.accordion h2.component-title').click(function(e){
  $(this).toggleClass('active');
  $(this).next().slideToggle();
});

$(".colorbox_team_member").colorbox({
  inline:true,
  width:"80%",
  rel:'team_member_hidden',
});

/**
 * logic for new hamburger menu
 */

$(document).ready(function () {
    //close clicking anywhere
    $('#sidr-rigth .menu-item').click(function () {
        $.sidr('close', "sidr-rigth")
    });

    //add close button
    $("#sidr-rigth .sidr-inner").prepend('<i class="closeButton fa fa-times fa-2x"></i>');

    //closeButton click
    $(".closeButton").click(function (e) {
        $.sidr('close', "sidr-rigth")
    });

    //hide elements with ul childs in menu
    $("#sidr-rigth .menu-item--expanded ul").hide();

    //add chevron down to elements with childs
    $("#sidr-rigth .menu-item--expanded > a").append('<i class="fa fa-chevron-down"></i>');

    //avoid click if element has child
    $("#sidr-rigth .menu-item--expanded > a").click(function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    //toggle elements in hovover
    jQuery("#sidr-rigth .menu-item--expanded").hover(function () {
        jQuery(this).find("ul.menu").toggle();
    }, function () {
        jQuery(this).find("ul.menu").toggle();
    });

    //if home page hide home link
    if ($("body").hasClass("page-node-1")) {
        $("ul.menu li a.is-active").remove();
    }
});
$('#navbar_toggle').click(function(){
  $(this).addClass('active');
  $('#block-bid-lab-main-menu').addClass('active');
  $('#close_main_menu').addClass('active');
  $('#block-languageswitcher').addClass('active');
});

$('#close_main_menu').click(function(){
  $(this).removeClass('active');
  $('#navbar_toggle').removeClass('active');
  $('#block-bid-lab-main-menu').removeClass('active');
  $('#block-languageswitcher').removeClass('active');
});


window.onscroll = function() {
  myFunction();
};
var header = document.getElementById("bid_lab_header");

function myFunction() {
  var sticky = header.offsetTop;
  if (window.pageYOffset > sticky) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
}

$('ul.menu li ul.menu li a').click(function(e){
  var parent_li = $(this).parent('li').parent('ul.menu').parent('li');
  if( parent_li.hasClass('menu-item--active-trail') ) {
    e.preventDefault();
    scrollToDiv($(this));
  }
});

$('.como_trabajamos .field--name-body a').click(function(e){
  scrollToDiv($(this));
});

function scrollToDiv(_link) {
  var href = _link.attr('href');
  var hash = href.split('#')[1];

  $('html,body').animate({
     scrollTop: $("#" + hash).offset().top - 80
  },'fast');
}


// César code

$('.questions_contain_slick').slick({
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
      }
    },
  ]
});



$('.service-contain-slick').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: true,

  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
  ]
});
// autoplay: 800,
// infinite:true,

//  César End

$('.text_slider').slick({
  dots: false,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
});


// Team slider
var width = $(window).width();
var maxWidth = 768;
var slickVar = {
  dots:true,
  centerMode: false,
  centerPadding: '80px',
  slidesToShow: 1,
};
var slick = false;
if(width < maxWidth) {
  slick = true;
  $('.team_slider').slick(slickVar);
}
$(window).on('resize', function(){
  width = $(window).width();
  if(width < maxWidth && slick == false) {
    slick = true;
    $('.team_slider').slick(slickVar);
    console.log('activate slick');
  }else if( slick == true ) {
    $('.team_slider').slick('unslick');
    slick = false;
    console.log('unativate slick');
  }
});

if( $('.block-views-blockhome-alert-block-1 .view-content').length > 0 ) {
  $('body').addClass('home_alert');
  //$("#page-wrapper").addClass("overlayDiv");
  $(".view-display-id-block_1").append("<div class='closeButton'><i class='fa fa-times-circle fa-3x'></i></div>");
}


$(".closeButton").click(function(e){
  $(".featured-top").remove();
  //$("#page-wrapper").removeClass("overlayDiv");
});
}(jQuery));