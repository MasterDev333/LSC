var $ = jQuery.noConflict();
jQuery(document).ready(function () {
  $(".frm-g-recaptcha").each(function (i) {
    var thisID = $(this).attr("id");
    $(this).attr("id", thisID + "_" + i);
  });

  $(".phone-field input").on("blur", function (e) {
    if ($(this).val() != "___-___-____") {
      $(this).siblings(".an-input-placeholder").addClass("_hide");
    } else {
      $(this).siblings(".an-input-placeholder").removeClass("_hide");
    }
  });

  // single function
  initMobileMenu();
  initSmartMenu();
  stickyElemenets();
  initCustomForms();
  initCounter();
  initAnchor();

  // isElementExist helper
  isElementExist(".btn-search-open", addRemoveClassOnClick, [
    ".btn-search-open",
    ".btn-search-close",
    ".header",
    "search-open",
  ]);
  isElementExist(".img-a", anImgRightOnScrollVewportChecker);
  isElementExist(".img-a-left", anImgLeftOnScrollVewportChecker);
  isElementExist(".img-a-up", anImgUpOnScrollVewportChecker);
  isElementExist(".img-a-video", anImgRightOnScrollVewportCheckerAndVideo);
  isElementExist(".popup-video-show", videoPopupMagnific);
  isElementExist(".swiper-slider", swipeCommunityInit);
  isElementExist(".slick-slider", slickSliderInit);
  isElementExist(".scroll-link", myScrollLink);
  isElementExist(".a-bg-up", blockHeight, [".a-bg-up"]);
  isElementExist(".a-bg-down", blockHeight, [".a-bg-down"]);
  isElementExist(".swiper-review", swiperReviewInit);
  isElementExist(".plans-controls-list", changeActivePlan);
  isElementExist(".tab-mob-btn", seeMapMob);
  isElementExist(".result-sidebar", jqScrollyInit);
  // isElementExist(".gate", gateLogick);
  anInputPlaceholder();

  // viewportCheckerAnimate function
  viewportCheckerAnimate(".a-bg-up", "_animate");
  viewportCheckerAnimate(".a-bg-down", "_animate");
  viewportCheckerAnimate(".a-up", "fadeInUp", true);
  viewportCheckerAnimate(".a-down", "fadeInDown");
  viewportCheckerAnimate(".a-down-full", "downFull");
  viewportCheckerAnimate(".a-up-full", "upFull");
  viewportCheckerAnimate(".a-up-nested > *:not([class*='img-a'])", "fadeInUp");
  viewportCheckerAnimate(".a-left", "fadeInLeft");
  viewportCheckerAnimate(".a-right", "fadeInRight");
  viewportCheckerAnimate(".a-op", "fade");
  viewportCheckerAnimate(".a-b-up", "beforeHeightUp");

  $(document).on("click", ".img-a-img picture", function () {
    console.log("play video");
    $(this).parent().addClass("active");
    $(this).siblings().find("video").get(0).play();
    return false;
  });

  // faq show/hide locations
  $(".location-filters a").on("click", function (e) {
    e.preventDefault();

    var identifier = $(this).data("hash");
    console.log(identifier);

    $(".location-filters li").removeClass("active");
    $(this).parent().addClass("active");

    if (identifier == undefined) {
      $(".location-accordion").removeClass("hidden");
    } else {
      $(".location-accordion").addClass("hidden");
      // $( '#location-' + term_id ).removeClass( 'hidden' );
      $('ul[data-hash="' + identifier + '"]').removeClass("hidden");
    }
  });
	
  // Video play
  $('.custom-video .box-play').on('click', function() {
	  let $parent = $(this).closest('.custom-video');
	  $parent.addClass('active');
	  $parent.find('video').get(0).play();	  
  });
	
  $(".location-dropdown").on("change", function (e) {
     e.preventDefault();
    console.log("dropdown");
    var term_id = $(this).val();
    console.log( term_id );

    // $( '.location-filters li' ).removeClass( 'active' );
    // $( this ).parent().addClass( 'active' );


    if (term_id == 'all') {
      $(".location-accordion").removeClass("hidden");
    } 
    else {
	    $(".location-accordion").addClass("hidden");
	    $("#location-" + term_id).removeClass("hidden");
    }
  });

  // open faq tab based on url hash
  var identifier = window.location.hash;
  var pathname = window.location.pathname;
  if (pathname.indexOf("faq") >= 0) {
    // console.log( 'faq page' );
    // console.log( identifier );
    if (identifier != "") {
      var hash_exists = $('a[data-hash="' + identifier + '"]').length;
      // console.log( hash_exists );
      if (hash_exists > 0) {
        // desktop list
        $(".location-filters li").removeClass("active");
        $('a[data-hash="' + identifier + '"]')
          .parent()
          .addClass("active");

        // mobile dropdown
        $(".location-dropdown").val(0);
        $('.location-dropdown option[data-hash="' + identifier + '"]').attr(
          "selected",
          "selected"
        );

        $(".location-accordion").addClass("hidden");
        $('ul[data-hash="' + identifier + '"]').removeClass("hidden");
      }
    }
  }

  // blog
  $(document).on("click", ".blog-pagination a", function (e) {
    if ($(".search-pagination").length) {
      return true;
    }

    e.preventDefault();

    console.log("pagination");

    var page = $(this).text();

    if (page == "Next >") {
      t = parseInt($(".blog-pagination .page-numbers.current").text());
      console.log(t);
      page = t + 1;
      // console.log( page );
    }
    if (page == "< Previous") {
      t = parseInt($(".blog-pagination .page-numbers.current").text());
      console.log(t);
      page = t - 1;
    }
    console.log(page);
    // Next >
    //< Previous
    $("#page").val(page);
    console.log(page);

    // $('#filter-form').submit();
    blog_form_submit();
  });

  $(".blog-filter-category").on("change", function (e) {
    console.log("category dropdown");
    blog_form_submit();
  });

  $(".blog-filter-btn").on("click", function (e) {
    e.preventDefault();
    console.log("search");
    blog_form_submit();
  });

  function blog_form_submit() {
    var form = $("#filter-blog-form");

    $.ajax({
      type: "POST",
      url: ajaxurl,
      dataType: "json",
      data: form.serialize(),
      beforeSend: function () {
        $("#blog-wrapper").html('<div class="signal-loading"></div>');
      },
      success: function (data) {
        // $( '.signal-loading' ).remove();
        $("html, body").animate(
          {
            scrollTop: $("#blog-wrapper").offset().top - 100,
          },
          200
        );
        $("#blog-wrapper").html(data.res);
        anImgRightOnScrollVewportChecker();
      },
      error: function (errorThrown) {
        console.log(errorThrown);
      },
    });
  }

  // guide cookie
  $("#view-guide-button").on("click", function (e) {
    e.preventDefault();
    $(".gate").removeClass("d-none");
  });
  $(".gate .btn-gate-close").on("click", function (e) {
    e.preventDefault();
    $(".gate").addClass("d-none");
  });
});

//-------- -------- -------- --------
//-------- js custom start
//-------- -------- -------- --------

// register ScrollTrigger Plugin for gsap
// gsap.registerPlugin(ScrollTrigger);
// for debug gsap + ScrollTrigger
// ScrollTrigger.defaults({markers: true});

// Helper if element exist then call function
function isElementExist(_el, _cb, _argCb) {
  var elem = document.querySelector(_el);
  if (document.body.contains(elem)) {
    try {
      if (arguments.length <= 2) {
        _cb();
      } else {
        _cb(..._argCb);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

function initCounter() {
  jQuery(".counter").counterUp({
    delay: 10,
    time: 1000,
  });
}

function initAnchor() {
  $(".arrow-bottom").click(function (event) {
    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top,
      },
      500
    );
    event.preventDefault();
  });
}

// initialize custom form elements (checkbox, radio, select) https://github.com/w3co/jcf
function initCustomForms() {
  jcf.setOptions("Select", {
    maxVisibleItems: 5, // visible dropdown items before scroll appear
    wrapNative: false,
    fakeDropInBody: false,
  });
  jcf.replaceAll();
}

// slideChangeTransitionEnd

// helper blockHeight
function blockHeight(whatElementHeight) {
  jQuery(whatElementHeight).each((index, element) => {
    jQuery(element).css("--block-height", jQuery(element).innerHeight() + "px");
  });
}

// helper windowResize
function windowResize(functName) {
  $(window).on("resize orientationchange", debounce(functName, 200));
}

// helper addRemoveClassOnClick
function addRemoveClassOnClick(btnOpen, btnClose, parent, whatClassAddRemove) {
  jQuery(".btn-search-open").on("click", function () {
    jQuery(".btn-search-open").parents(".header").addClass("search-open");
  });
  jQuery(".btn-search-close").on("click", function (e) {
    e.preventDefault();
    jQuery(".btn-search-open").parents(".header").removeClass("search-open");
  });
}

// helper Smooth Scroll Link
function myScrollLink() {
  var navLink = jQuery(".scroll-link");
  navLink.on("click", function (e) {
    var elementClick = jQuery(this).attr("href");
    var destination = jQuery(elementClick).offset().top;
    var scrollTime =
      jQuery(this).attr("data-scrollTime") != undefined
        ? +jQuery(this).attr("data-scrollTime")
        : 1000;
    var scrollTopVar =
      jQuery(this).attr("data-scrollTop") != undefined
        ? +jQuery(this).attr("data-scrollTop")
        : 0;
    var scrollBottomVar =
      jQuery(this).attr("data-scrollBottom") != undefined
        ? +jQuery(this).attr("data-scrollBottom")
        : 0;
    var destinationFull = destination - scrollTopVar + scrollBottomVar;

    jQuery("html,body").stop().animate(
      {
        scrollTop: destinationFull,
      },
      scrollTime
    );
    return false;
  });
}

// seeMapMob
function seeMapMob() {
  jQuery(".btn-see-map").on("click", function (e) {
    jQuery(".tab-content").addClass("_hide");
    jQuery(".bg-map").addClass("_show");
    jQuery(this).removeClass("_active");
    jQuery(".btn-see-list").addClass("_active");
  });
  jQuery(".btn-see-list").on("click", function (e) {
    jQuery(".bg-map").removeClass("_show");
    jQuery(".tab-content").removeClass("_hide");
    jQuery(this).removeClass("_active");
    jQuery(".btn-see-map").addClass("_active");
  });
}

// changeActivePlan
function changeActivePlan() {
  const controlsListContainer = document.querySelector(".plans-controls-list");
  const controlsList = controlsListContainer.querySelectorAll(
    ".plans-controls-list-item"
  );

  const imgsListContainer = document.querySelector(".floor-plans-imgs");
  const imgsList = imgsListContainer.querySelectorAll(".plans-img-list-item");

  const plansSelect = document.getElementById("floor-plans-select");

  controlsList.forEach((control) => {
    control.querySelector("a").addEventListener("click", (e) => {
      e.preventDefault();

      if (!control.classList.contains("_active")) {
        controlsListContainer
          .querySelector(".plans-controls-list-item._active")
          .classList.remove("_active");
        control.classList.add("_active");

        changeActivePlanImg(control.dataset.planId);

        imgsListContainer
          .querySelector(".plans-img-list-item._active")
          .classList.remove("_active");
        imgsList.forEach((imgsListItem, index) => {
          if (imgsListItem.dataset.planId == control.dataset.planId) {
            imgsListItem.classList.add("_active");

            // change active marker position
            controlsListContainer.style.setProperty("--active-item", index + 1);
          }
        });
      }
    });
  });

  plansSelect.addEventListener("change", (e) => {
    const planId =
      plansSelect.options[plansSelect.selectedIndex].dataset.planId;

    changeActivePlanImg(planId);
  });

  function changeActivePlanImg(_id) {
    imgsListContainer
      .querySelector(".plans-img-list-item._active")
      .classList.remove("_active");

    imgsList.forEach((imgsListItem) => {
      if (imgsListItem.dataset.planId == _id) {
        imgsListItem.classList.add("_active");
      }
    });
  }
}

// initMobileMenu function
function initMobileMenu() {
  $("#mobile-menu-btn").sidr({
    displace: false,
    source: ".mobile-menu-container",
    renaming: false,
    side: "left",
    speed: 400,
    onOpen: function () {
      $("html, body").css({
        overflow: "hidden",
      });
    },
    onClose: function () {
      $("html, body").css({
        overflow: "auto",
      });
    },
    onOpenEnd: function () {
      $(".sidr").addClass("opened");
    },
    onCloseEnd: function () {
      $(".sidr").removeClass("opened");
    },
  });

  $(".mobile-menu .menu-item-has-children > a").on("click", function (e) {
    e.preventDefault();
    $(".mobile-menu-content").addClass("sub-menu-shown");
    $(".sub-menu-active").addClass("sub-menu-node-active");
    $(".sub-menu-active").removeClass("sub-menu-active");
    $(this).parent(".menu-item-has-children").addClass("sub-menu-active");
  });

  $("#sidr").on("click", "#sub-menu-back-btn", function (e) {
    e.preventDefault();

    if ($(".sub-menu-node-active").length) {
      $(".sub-menu-active").removeClass("sub-menu-active");
      $(".sub-menu-node-active").addClass("sub-menu-active");
      $(".sub-menu-node-active").removeClass("sub-menu-node-active");
    } else {
      $(".sub-menu-active").removeClass("sub-menu-active");
      $(".mobile-menu-content").removeClass("sub-menu-shown");
    }
  });

  $("#sidr").on("click", "#search-mob-menu-btn", function (e) {
    e.preventDefault();
    $(".mobile-menu-content").addClass("mobile-search-active");
  });

  $("#sidr").on("click", "#cancel-search-mob-menu-btn", function (e) {
    e.preventDefault();
    $(".mobile-menu-content").removeClass("mobile-search-active");
  });

  $("#sidr").on("click", "#close-mob-menu-btn", function (e) {
    $.sidr("close");
  });
}

// viewportCheckerAnimate function
function viewportCheckerAnimate(
  whatElement,
  whatClassAdded,
  classAfterAnimate
) {
  jQuery(whatElement)
    .addClass("a-hidden")
    .viewportChecker({
      classToRemove: "a-hidden",
      classToAdd: "animated " + whatClassAdded,
      offset: 10,
      callbackFunction: function (elem) {
        if (classAfterAnimate) {
          elem.on("animationend", function () {
            elem.addClass("animation-end");
          });
        }
      },
    });
}

// animation Input Placeholder
function anInputPlaceholder() {
  var elements = document.querySelectorAll(".an-input-placeholder");

  elements.forEach(function (el) {
    el.innerHTML = el.innerHTML.replace(/(.)/g, "<span>$1</span>");
  });

  jQuery(".an-input").on("click", function (e) {
    jQuery(this)
      .parents("form")
      .find(".input-focus")
      .removeClass("input-focus");
    jQuery(this).addClass("input-focus");
  });

  jQuery(".an-input input").on("input", function (e) {
    if (jQuery(this).val().length > 0) {
      jQuery(this).parents(".an-input").addClass("input-active");
    } else {
      jQuery(this).parents(".an-input").removeClass("input-active");
    }
  });

  jQuery(document).mouseup(function (e) {
    var div = jQuery(".an-input input");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
      jQuery(".input-focus").removeClass("input-focus");
    }
  });
}

// function animate on scroll init
function anImgRightOnScrollVewportChecker() {
  $("<div/>").attr("class", "img-a-decor").appendTo(".img-a");
  jQuery(".img-a").viewportChecker({
    classToAdd: "",
    classToRemove: "",
    classToAddForFullView: "",
    offset: 100,
    callbackFunction: function (elem, action) {
      let tl = gsap.timeline();
      let decor = elem.find(".img-a-decor");
      let elImg = elem.find(".img-a-img img");
      var durationVar = 0.5;
      tl.to(decor, { duration: durationVar, x: "0%" })
        .to(decor, { duration: durationVar, xPercent: 100 })
        .to(
          elImg,
          {
            duration: durationVar,
            "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          "-=" + durationVar
        )
        .to(decor, { duration: 0, opacity: 0 });
    },
  });
}

// function animate on scroll init
function anImgRightOnScrollVewportCheckerAndVideo() {
  $("<div/>").attr("class", "img-a-decor").appendTo(".img-a-video");
  jQuery(".img-a-video").viewportChecker({
    classToAdd: "",
    classToRemove: "",
    classToAddForFullView: "",
    offset: 100,
    callbackFunction: function (elem, action) {
      let tl = gsap.timeline();
      let decor = elem.find(".img-a-decor");
      let elImg = elem.find(".img-a-img img");
      let elVideo = elem.find(".hero-img-popup-link");
      var durationVar = 0.5;
      tl.to(decor, { duration: durationVar, x: "0%" })
        .to(decor, { duration: durationVar, xPercent: 100 })
        .to(
          elImg,
          {
            duration: durationVar,
            "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          "-=" + durationVar
        )
        .to(elVideo, { duration: 1, opacity: 1 }, "+=" + 1)
        .to(decor, { duration: 0.2, opacity: 0 })
        .to(elImg, { duration: 0.2, opacity: 0 });
    },
  });
}

// function animate on scroll init
function anImgLeftOnScrollVewportChecker() {
  $("<div/>").attr("class", "img-a-decor").appendTo(".img-a-left");
  jQuery(".img-a-left").viewportChecker({
    classToAdd: "",
    classToRemove: "",
    classToAddForFullView: "",
    offset: 100,
    callbackFunction: function (elem, action) {
      let tl = gsap.timeline();
      let decor = elem.find(".img-a-decor");
      let elImg = elem.find(".img-a-img img");
      var durationVar = 0.5;
      tl.to(decor, { duration: durationVar, x: "0%" })
        .to(decor, { duration: durationVar, xPercent: -100 })
        .to(elImg, { duration: durationVar, width: "100%" }, "-=" + durationVar)
        .to(decor, { duration: 0.2, opacity: 0 });
    },
  });
}

// function animate on scroll init
function anImgUpOnScrollVewportChecker() {
  $("<div/>").attr("class", "img-a-decor").appendTo(".img-a-up");
  jQuery(".img-a-up").viewportChecker({
    classToAdd: "",
    classToRemove: "",
    classToAddForFullView: "",
    offset: 100,
    callbackFunction: function (elem, action) {
      let tl = gsap.timeline();
      let decor = elem.find(".img-a-decor");
      let elImg = elem.find(".img-a-img img");
      var durationVar = 0.5;
      tl.to(decor, { duration: durationVar, x: "0%" })
        .to(decor, { duration: durationVar, xPercent: 100 })
        .to(
          elImg,
          { duration: durationVar, yPercent: -100 },
          "-=" + durationVar
        )
        .to(decor, { duration: 0.2, opacity: 0 });
    },
  });
}

// smart menu init
function initSmartMenu() {
  jQuery(".header-menu").smartmenus({
    collapsibleBehavior: "accordion",
    subMenusMinWidth: "250px",
    subMenusSubOffsetY: 0,
    mainMenuSubOffsetY: 0,
    showTimeout: 0,
    hideTimeout: 0,
  });

  // changed date attribute to a class (need to reverse last item menu)
  if (document.documentElement.clientWidth < 1200) {
    jQuery(".header-menu").children().last().addClass("nav-sm-reverse");
  }

  jQuery("body").mobileNav({
    menuActiveClass: "nav-active",
    menuOpener: ".nav-opener",
    hideOnClickOutside: false,
    menuDrop: ".nav-drop",
  }),
    "ontouchstart" in document.documentElement ||
      jQuery(window).on("resize orientationchange", function () {
        jQuery("body").removeClass("nav-active"), $.SmartMenus.hideAll();
      });

  $(".header-menu > li > a").on("click", function (e) {
    e.preventDefault();
  });
}

// function add class on sticky header
function stickyElemenets() {
  // more option see https://github.com/chayka/jQuery.Scroolly
  // adds class on header
  jQuery(".header").scroolly([
    {
      from: "doc-top + 2px",
      to: "doc-bottom",
      addClass: "header-sticky",
    },
    {
      from: "doc-top",
      to: "doc-top + 1px",
      removeClass: "header-sticky",
    },
  ]);

  // adds class on header-cta-mob
  jQuery(".header-cta-mob").scroolly([
    {
      from: "doc-top + 100px",
      to: "doc-bottom",
      direction: 1,
      addClass: "_active",
    },
    {
      from: "doc-top",
      to: "doc-bottom",
      direction: -1,
      removeClass: "_active",
    },
  ]);
}

// function init
/* Popup
* Website: http://dimsemenov.com/plugins/magnific-popup/
==========================================================================
*/
function videoPopupMagnific() {
  function extendMagnificIframe() {
    var $start = 0;
    var $iframe = {
      markup:
        '<div class="mfp-iframe-video-wrapper">' +
        '<div class="mfp-iframe-scaler">' +
        '<div class="mfp-close"></div>' +
        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
        "</div>" +
        '<div class="mfp-bottom-bar">' +
        '<div class="mfp-title"></div>' +
        "</div>" +
        "</div>",
      patterns: {
        youtube: {
          index: "youtu",
          id: function (url) {
            var m = url.match(
              /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/
            );
            if (!m || !m[1]) return null;

            if (url.indexOf("t=") != -1) {
              var $split = url.split("t=");
              var hms = $split[1]
                .replace("h", ":")
                .replace("m", ":")
                .replace("s", "");
              var a = hms.split(":");

              if (a.length == 1) {
                $start = a[0];
              } else if (a.length == 2) {
                $start = +a[0] * 60 + +a[1];
              } else if (a.length == 3) {
                $start = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
              }
            }

            var suffix = "?autoplay=1";

            if ($start > 0) {
              suffix = "?start=" + $start + "&autoplay=1";
            }

            return m[1] + suffix;
          },
          src: "//www.youtube.com/embed/%id%",
        },
        vimeo: {
          index: "vimeo.com/",
          id: function (url) {
            var m = url.match(
              /(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/
            );
            if (!m || !m[5]) return null;
            return m[5];
          },
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
      },
    };
    return $iframe;
  }

  jQuery(".popup-video-show").magnificPopup({
    type: "iframe",
    iframe: extendMagnificIframe(),
  });
}

// swiperReviewInit
function swiperReviewInit() {
  const swiper = new Swiper(".swiper-review", {
    speed: 400,
    spaceBetween: 50,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// swipeCommunityInit
function swipeCommunityInit() {
  // Params interleave Offset
  var interleaveOffset = 0.6;

  // community Slider
  
  const swiperCommunity = new Swiper(".swiper-slider", {
    speed: 1000,
    watchSlidesProgress: true,
    spaceBetween: 10,
    centeredSlides: true,
    roundLengths: true,
    loop: true,
    breakpoints: {
      767: {
        spaceBetween: 30,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    on: {
		init: function (event) {
			var elActive = event.$el.find(".swiper-slide-active");
			var elDataBlock = event.$el.find(".swiper-data-tittle");
			$(elDataBlock).text($(elActive).attr("data-tittle"));
		},
		slideNextTransitionEnd: function(event) {
			var elActive = event.$el.find(".swiper-slide-active");
			var elDataBlock = event.$el.find(".swiper-data-tittle");
			$(elDataBlock).text($(elActive).attr("data-tittle"));
		},
		slidePrevTransitionEnd: function(event) {
			var elActive = event.$el.find(".swiper-slide-active");
			var elDataBlock = event.$el.find(".swiper-data-tittle");
			$(elDataBlock).text($(elActive).attr("data-tittle"));
		},
		progress: function () {
			let swiper = this;
			for (let i = 0; i < swiper.slides.length; i++) {
				let slideProgress = swiper.slides[i].progress,
					innerOffset = swiper.width * interleaveOffset,
					innerTranslate = slideProgress * innerOffset;
				console.log(slideProgress, )
				swiper.slides[i].querySelector(".slide-bgimg").style.transform =
					"translateX(" + innerTranslate + "px)";
			}
		},
		touchStart: function () {
			let swiper = this;
			for (let i = 0; i < swiper.slides.length; i++) {
				swiper.slides[i].style.transition = "";
			}
		},
		click: function(swiper, event) {
			let $elClicked = $(event.target).closest('.swiper-slide');
			if ($elClicked.hasClass('swiper-slide-next')) {
				swiper.slideNext();
			} else if ($elClicked.hasClass('swiper-slide-prev')) {
				swiper.slidePrev();
			}
		},
		setTransition: function (event, speed) {
			let swiper = this;
			for (let i = 0; i < swiper.slides.length; i++) {
				swiper.slides[i].style.transition = speed + "ms";
				swiper.slides[i].querySelector(".slide-bgimg").style.transition =
					speed + "ms";
			}
		},
    },
  });
}

// slick Slider
function slickSliderInit() {
  let $slider = $('.slick-slider').find('.slider-wrapper');
  $slider.on('init reinit afterChange', function(event, slick, currentSlide, nextSlide) {
	  let $navigator = $(this)
	  .parent(".slick-slider")
	  .find(".swiper-pagination");
	  var i = (currentSlide ? currentSlide : 0) + 1;
	  let curText = ("0" + i).slice(-2);
	  let totalText = ("0" + slick.slideCount).slice(-2);
	  $navigator.text(curText + " / " + totalText);
  });
  $slider.slick({
    dots: false,
    arrows: true,
    speed: 1000,
    variableWidth: true,
	centerMode: true,
	centerPadding: "10%",
	focusOnSelect: true,
    prevArrow: $('.swiper-button-prev'),
    nextArrow: $('.swiper-button-next'),
	responsive: [{
		breakpoint: 767,
		settings: [{
			centerMode: false,
			variableWidth: false,	
		}]
	}]
  });
}

// stick plugin - more options http://leafo.net/sticky-kit/#reference
function jqScrollyInit() {
  function sidebarScrolly() {
    if (document.documentElement.clientWidth > 768) {
      jQuery(".result-sidebar").stick_in_parent({
        offset_top: 100,
      });
    } else {
      jQuery(".result-sidebar").trigger("sticky_kit:detach");
    }
  }
  sidebarScrolly();
  windowResize(sidebarScrolly);
}

function gateLogick() {
  jQuery("body").addClass("ov-h");
  jQuery(".btn-gate-close").on("click", function () {
    jQuery(".gate").addClass("d-none");
    jQuery("body").removeClass("ov-h");
  });
}

//-------- -------- -------- --------
//-------- js custom end
//-------- -------- -------- --------

//-------- -------- -------- --------
//-------- included js libs start
//-------- -------- -------- --------

// custom helper function for debounce - how to work see https://codepen.io/Hyubert/pen/abZmXjm
/*
 * Debounce
 * need for once call function
 *
 * @param { function } - callback function
 * @param { number } - timeout time (ms)
 * @return { function }
 */
function debounce(func, timeout) {
  var timeoutID,
    timeout = timeout || 200;
  return function () {
    var scope = this,
      args = arguments;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function () {
      func.apply(scope, Array.prototype.slice.call(args));
    }, timeout);
  };
}

// library smartmenus (if you dont have menu in the project - just remove)
/*
 * Simple Mobile Navigation
 */
(function ($) {
  function MobileNav(options) {
    this.options = $.extend(
      {
        container: null,
        hideOnClickOutside: false,
        menuActiveClass: "nav-active",
        menuOpener: ".nav-opener",
        menuDrop: ".nav-drop",
        toggleEvent: "click",
        outsideClickEvent: "click touchstart pointerdown MSPointerDown",
      },
      options
    );
    this.initStructure();
    this.attachEvents();
  }
  MobileNav.prototype = {
    initStructure: function () {
      this.page = $("html");
      this.container = $(this.options.container);
      this.opener = this.container.find(this.options.menuOpener);
      this.drop = this.container.find(this.options.menuDrop);
    },
    attachEvents: function () {
      var self = this;
      if (activateResizeHandler) {
        activateResizeHandler();
        activateResizeHandler = null;
      }
      this.outsideClickHandler = function (e) {
        if (self.isOpened()) {
          var target = $(e.target);
          if (
            !target.closest(self.opener).length &&
            !target.closest(self.drop).length
          ) {
            self.hide();
          }
        }
      };
      this.openerClickHandler = function (e) {
        e.preventDefault();
        self.toggle();
      };
      this.opener.on(this.options.toggleEvent, this.openerClickHandler);
    },
    isOpened: function () {
      return this.container.hasClass(this.options.menuActiveClass);
    },
    show: function () {
      this.container.addClass(this.options.menuActiveClass);
      if (this.options.hideOnClickOutside) {
        this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    hide: function () {
      this.container.removeClass(this.options.menuActiveClass);
      if (this.options.hideOnClickOutside) {
        this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    toggle: function () {
      if (this.isOpened()) {
        this.hide();
      } else {
        this.show();
      }
    },
    destroy: function () {
      this.container.removeClass(this.options.menuActiveClass);
      this.opener.off(this.options.toggleEvent, this.clickHandler);
      this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
    },
  };
  var activateResizeHandler = function () {
    var win = $(window),
      doc = $("html"),
      resizeClass = "resize-active",
      flag,
      timer;
    var removeClassHandler = function () {
      flag = false;
      doc.removeClass(resizeClass);
    };
    var resizeHandler = function () {
      if (!flag) {
        flag = true;
        doc.addClass(resizeClass);
      }
      clearTimeout(timer);
      timer = setTimeout(removeClassHandler, 500);
    };
    win.on("resize orientationchange", resizeHandler);
  };
  $.fn.mobileNav = function (opt) {
    var args = Array.prototype.slice.call(arguments);
    var method = args[0];
    return this.each(function () {
      var $container = jQuery(this);
      var instance = $container.data("MobileNav");
      if (typeof opt === "object" || typeof opt === "undefined") {
        $container.data(
          "MobileNav",
          new MobileNav(
            $.extend(
              {
                container: this,
              },
              opt
            )
          )
        );
      } else if (typeof method === "string" && instance) {
        if (typeof instance[method] === "function") {
          args.shift();
          instance[method].apply(instance, args);
        }
      }
    });
  };
})(jQuery);
/*
 * SmartMenus jQuery v1.1.0+
 * http://www.smartmenus.org/
 *
 * Copyright Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com/
 *
 * Released under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function (factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define(["jquery"], factory);
  } else if (typeof module === "object" && typeof module.exports === "object") {
    // CommonJS
    module.exports = factory(require("jquery"));
  } else {
    // Global jQuery
    factory(jQuery);
  }
})(function ($) {
  var menuTrees = [],
    mouse = false, // optimize for touch by default - we will detect for mouse input
    touchEvents = "ontouchstart" in window, // we use this just to choose between toucn and pointer events, not for touch screen detection
    mouseDetectionEnabled = false,
    requestAnimationFrame =
      window.requestAnimationFrame ||
      function (callback) {
        return setTimeout(callback, 1000 / 60);
      },
    cancelAnimationFrame =
      window.cancelAnimationFrame ||
      function (id) {
        clearTimeout(id);
      },
    canAnimate = !!$.fn.animate;
  // Handle detection for mouse input (i.e. desktop browsers, tablets with a mouse, etc.)
  function initMouseDetection(disable) {
    var eNS = ".smartmenus_mouse";
    if (!mouseDetectionEnabled && !disable) {
      // if we get two consecutive mousemoves within 2 pixels from each other and within 300ms, we assume a real mouse/cursor is present
      // in practice, this seems like impossible to trick unintentianally with a real mouse and a pretty safe detection on touch devices (even with older browsers that do not support touch events)
      var firstTime = true,
        lastMove = null,
        events = {
          mousemove: function (e) {
            var thisMove = {
              x: e.pageX,
              y: e.pageY,
              timeStamp: new Date().getTime(),
            };
            if (lastMove) {
              var deltaX = Math.abs(lastMove.x - thisMove.x),
                deltaY = Math.abs(lastMove.y - thisMove.y);
              if (
                (deltaX > 0 || deltaY > 0) &&
                deltaX <= 2 &&
                deltaY <= 2 &&
                thisMove.timeStamp - lastMove.timeStamp <= 300
              ) {
                mouse = true;
                // if this is the first check after page load, check if we are not over some item by chance and call the mouseenter handler if yes
                if (firstTime) {
                  var $a = $(e.target).closest("a");
                  if ($a.is("a")) {
                    $.each(menuTrees, function () {
                      if ($.contains(this.$root[0], $a[0])) {
                        this.itemEnter({ currentTarget: $a[0] });
                        return false;
                      }
                    });
                  }
                  firstTime = false;
                }
              }
            }
            lastMove = thisMove;
          },
        };
      events[
        touchEvents
          ? "touchstart"
          : "pointerover pointermove pointerout MSPointerOver MSPointerMove MSPointerOut"
      ] = function (e) {
        if (isTouchEvent(e.originalEvent)) {
          mouse = false;
        }
      };
      $(document).on(getEventsNS(events, eNS));
      mouseDetectionEnabled = true;
    } else if (mouseDetectionEnabled && disable) {
      $(document).off(eNS);
      mouseDetectionEnabled = false;
    }
  }

  function isTouchEvent(e) {
    return !/^(4|mouse)$/.test(e.pointerType);
  }
  // returns a jQuery on() ready object
  function getEventsNS(events, eNS) {
    if (!eNS) {
      eNS = "";
    }
    var eventsNS = {};
    for (var i in events) {
      eventsNS[i.split(" ").join(eNS + " ") + eNS] = events[i];
    }
    return eventsNS;
  }
  $.SmartMenus = function (elm, options) {
    this.$root = $(elm);
    this.opts = options;
    this.rootId = ""; // internal
    this.accessIdPrefix = "";
    this.$subArrow = null;
    this.activatedItems = []; // stores last activated A's for each level
    this.visibleSubMenus = []; // stores visible sub menus UL's (might be in no particular order)
    this.showTimeout = 0;
    this.hideTimeout = 0;
    this.scrollTimeout = 0;
    this.clickActivated = false;
    this.focusActivated = false;
    this.zIndexInc = 0;
    this.idInc = 0;
    this.$firstLink = null; // we'll use these for some tests
    this.$firstSub = null; // at runtime so we'll cache them
    this.disabled = false;
    this.$disableOverlay = null;
    this.$touchScrollingSub = null;
    this.cssTransforms3d =
      "perspective" in elm.style || "webkitPerspective" in elm.style;
    this.wasCollapsible = false;
    this.init();
  };
  $.extend($.SmartMenus, {
    hideAll: function () {
      $.each(menuTrees, function () {
        this.menuHideAll();
      });
    },
    destroy: function () {
      while (menuTrees.length) {
        menuTrees[0].destroy();
      }
      initMouseDetection(true);
    },
    prototype: {
      init: function (refresh) {
        var self = this;
        if (!refresh) {
          menuTrees.push(this);
          this.rootId = (new Date().getTime() + Math.random() + "").replace(
            /\D/g,
            ""
          );
          this.accessIdPrefix = "sm-" + this.rootId + "-";
          if (this.$root.hasClass("sm-rtl")) {
            this.opts.rightToLeftSubMenus = true;
          }
          // init root (main menu)
          var eNS = ".smartmenus";
          this.$root
            .data("smartmenus", this)
            .attr("data-smartmenus-id", this.rootId)
            .dataSM("level", 1)
            .on(
              getEventsNS(
                {
                  "mouseover focusin": $.proxy(this.rootOver, this),
                  "mouseout focusout": $.proxy(this.rootOut, this),
                  keydown: $.proxy(this.rootKeyDown, this),
                },
                eNS
              )
            )
            .on(
              getEventsNS(
                {
                  mouseenter: $.proxy(this.itemEnter, this),
                  mouseleave: $.proxy(this.itemLeave, this),
                  mousedown: $.proxy(this.itemDown, this),
                  focus: $.proxy(this.itemFocus, this),
                  blur: $.proxy(this.itemBlur, this),
                  click: $.proxy(this.itemClick, this),
                },
                eNS
              ),
              "a"
            );
          // hide menus on tap or click outside the root UL
          eNS += this.rootId;
          if (this.opts.hideOnClick) {
            $(document).on(
              getEventsNS(
                {
                  touchstart: $.proxy(this.docTouchStart, this),
                  touchmove: $.proxy(this.docTouchMove, this),
                  touchend: $.proxy(this.docTouchEnd, this),
                  // for Opera Mobile < 11.5, webOS browser, etc. we'll check click too
                  click: $.proxy(this.docClick, this),
                },
                eNS
              )
            );
          }
          // hide sub menus on resize
          $(window).on(
            getEventsNS(
              { "resize orientationchange": $.proxy(this.winResize, this) },
              eNS
            )
          );
          if (this.opts.subIndicators) {
            this.$subArrow = $("<span/>").addClass("sub-arrow");
            if (this.opts.subIndicatorsText) {
              this.$subArrow.html(this.opts.subIndicatorsText);
            }
          }
          // make sure mouse detection is enabled
          initMouseDetection();
        }
        // init sub menus
        this.$firstSub = this.$root
          .find("ul")
          .each(function () {
            self.menuInit($(this));
          })
          .eq(0);
        this.$firstLink = this.$root.find("a").eq(0);
        // find current item
        if (this.opts.markCurrentItem) {
          var reDefaultDoc = /(index|default)\.[^#\?\/]*/i,
            reHash = /#.*/,
            locHref = window.location.href.replace(reDefaultDoc, ""),
            locHrefNoHash = locHref.replace(reHash, "");
          this.$root.find("a:not(.mega-menu a)").each(function () {
            var href = this.href.replace(reDefaultDoc, ""),
              $this = $(this);
            if (href == locHref || href == locHrefNoHash) {
              $this.addClass("current");
              if (self.opts.markCurrentTree) {
                $this
                  .parentsUntil("[data-smartmenus-id]", "ul")
                  .each(function () {
                    $(this).dataSM("parent-a").addClass("current");
                  });
              }
            }
          });
        }
        // save initial state
        this.wasCollapsible = this.isCollapsible();
      },
      destroy: function (refresh) {
        if (!refresh) {
          var eNS = ".smartmenus";
          this.$root
            .removeData("smartmenus")
            .removeAttr("data-smartmenus-id")
            .removeDataSM("level")
            .off(eNS);
          eNS += this.rootId;
          $(document).off(eNS);
          $(window).off(eNS);
          if (this.opts.subIndicators) {
            this.$subArrow = null;
          }
        }
        this.menuHideAll();
        var self = this;
        this.$root
          .find("ul")
          .each(function () {
            var $this = $(this);
            if ($this.dataSM("scroll-arrows")) {
              $this.dataSM("scroll-arrows").remove();
            }
            if ($this.dataSM("shown-before")) {
              if (self.opts.subMenusMinWidth || self.opts.subMenusMaxWidth) {
                $this
                  .css({ width: "", minWidth: "", maxWidth: "" })
                  .removeClass("sm-nowrap");
              }
              if ($this.dataSM("scroll-arrows")) {
                $this.dataSM("scroll-arrows").remove();
              }
              $this.css({
                zIndex: "",
                top: "",
                left: "",
                marginLeft: "",
                marginTop: "",
                display: "",
              });
            }
            if (($this.attr("id") || "").indexOf(self.accessIdPrefix) == 0) {
              $this.removeAttr("id");
            }
          })
          .removeDataSM("in-mega")
          .removeDataSM("shown-before")
          .removeDataSM("scroll-arrows")
          .removeDataSM("parent-a")
          .removeDataSM("level")
          .removeDataSM("beforefirstshowfired")
          .removeAttr("role")
          .removeAttr("aria-hidden")
          .removeAttr("aria-labelledby")
          .removeAttr("aria-expanded");
        this.$root
          .find("a.has-submenu")
          .each(function () {
            var $this = $(this);
            if ($this.attr("id").indexOf(self.accessIdPrefix) == 0) {
              $this.removeAttr("id");
            }
          })
          .removeClass("has-submenu")
          .removeDataSM("sub")
          .removeAttr("aria-haspopup")
          .removeAttr("aria-controls")
          .removeAttr("aria-expanded")
          .closest("li")
          .removeDataSM("sub");
        if (this.opts.subIndicators) {
          this.$root.find("span.sub-arrow").remove();
        }
        if (this.opts.markCurrentItem) {
          this.$root.find("a.current").removeClass("current");
        }
        if (!refresh) {
          this.$root = null;
          this.$firstLink = null;
          this.$firstSub = null;
          if (this.$disableOverlay) {
            this.$disableOverlay.remove();
            this.$disableOverlay = null;
          }
          menuTrees.splice($.inArray(this, menuTrees), 1);
        }
      },
      disable: function (noOverlay) {
        if (!this.disabled) {
          this.menuHideAll();
          // display overlay over the menu to prevent interaction
          if (!noOverlay && !this.opts.isPopup && this.$root.is(":visible")) {
            var pos = this.$root.offset();
            this.$disableOverlay = $('<div class="sm-jquery-disable-overlay"/>')
              .css({
                position: "absolute",
                top: pos.top,
                left: pos.left,
                width: this.$root.outerWidth(),
                height: this.$root.outerHeight(),
                zIndex: this.getStartZIndex(true),
                opacity: 0,
              })
              .appendTo(document.body);
          }
          this.disabled = true;
        }
      },
      docClick: function (e) {
        if (this.$touchScrollingSub) {
          this.$touchScrollingSub = null;
          return;
        }
        // hide on any click outside the menu or on a menu link
        if (
          (this.visibleSubMenus.length &&
            !$.contains(this.$root[0], e.target)) ||
          $(e.target).closest("a").length
        ) {
          this.menuHideAll();
        }
      },
      docTouchEnd: function (e) {
        if (!this.lastTouch) {
          return;
        }
        if (
          this.visibleSubMenus.length &&
          (this.lastTouch.x2 === undefined ||
            this.lastTouch.x1 == this.lastTouch.x2) &&
          (this.lastTouch.y2 === undefined ||
            this.lastTouch.y1 == this.lastTouch.y2) &&
          (!this.lastTouch.target ||
            !$.contains(this.$root[0], this.lastTouch.target))
        ) {
          if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = 0;
          }
          // hide with a delay to prevent triggering accidental unwanted click on some page element
          var self = this;
          this.hideTimeout = setTimeout(function () {
            self.menuHideAll();
          }, 350);
        }
        this.lastTouch = null;
      },
      docTouchMove: function (e) {
        if (!this.lastTouch) {
          return;
        }
        var touchPoint = e.originalEvent.touches[0];
        this.lastTouch.x2 = touchPoint.pageX;
        this.lastTouch.y2 = touchPoint.pageY;
      },
      docTouchStart: function (e) {
        var touchPoint = e.originalEvent.touches[0];
        this.lastTouch = {
          x1: touchPoint.pageX,
          y1: touchPoint.pageY,
          target: touchPoint.target,
        };
      },
      enable: function () {
        if (this.disabled) {
          if (this.$disableOverlay) {
            this.$disableOverlay.remove();
            this.$disableOverlay = null;
          }
          this.disabled = false;
        }
      },
      getClosestMenu: function (elm) {
        var $closestMenu = $(elm).closest("ul");
        while ($closestMenu.dataSM("in-mega")) {
          $closestMenu = $closestMenu.parent().closest("ul");
        }
        return $closestMenu[0] || null;
      },
      getHeight: function ($elm) {
        return this.getOffset($elm, true);
      },
      // returns precise width/height float values
      getOffset: function ($elm, height) {
        var old;
        if ($elm.css("display") == "none") {
          old = {
            position: $elm[0].style.position,
            visibility: $elm[0].style.visibility,
          };
          $elm.css({ position: "absolute", visibility: "hidden" }).show();
        }
        var box =
            $elm[0].getBoundingClientRect && $elm[0].getBoundingClientRect(),
          val =
            box &&
            (height
              ? box.height || box.bottom - box.top
              : box.width || box.right - box.left);
        if (!val && val !== 0) {
          val = height ? $elm[0].offsetHeight : $elm[0].offsetWidth;
        }
        if (old) {
          $elm.hide().css(old);
        }
        return val;
      },
      getStartZIndex: function (root) {
        var zIndex = parseInt(
          this[root ? "$root" : "$firstSub"].css("z-index")
        );
        if (!root && isNaN(zIndex)) {
          zIndex = parseInt(this.$root.css("z-index"));
        }
        return !isNaN(zIndex) ? zIndex : 1;
      },
      getTouchPoint: function (e) {
        return (
          (e.touches && e.touches[0]) ||
          (e.changedTouches && e.changedTouches[0]) ||
          e
        );
      },
      getViewport: function (height) {
        var name = height ? "Height" : "Width",
          val = document.documentElement["client" + name],
          val2 = window["inner" + name];
        if (val2) {
          val = Math.min(val, val2);
        }
        return val;
      },
      getViewportHeight: function () {
        return this.getViewport(true);
      },
      getViewportWidth: function () {
        return this.getViewport();
      },
      getWidth: function ($elm) {
        return this.getOffset($elm);
      },
      handleEvents: function () {
        return !this.disabled && this.isCSSOn();
      },
      handleItemEvents: function ($a) {
        return this.handleEvents() && !this.isLinkInMegaMenu($a);
      },
      isCollapsible: function () {
        return this.$firstSub.css("position") == "static";
      },
      isCSSOn: function () {
        return this.$firstLink.css("display") != "inline";
      },
      isFixed: function () {
        var isFixed = this.$root.css("position") == "fixed";
        if (!isFixed) {
          this.$root.parentsUntil("body").each(function () {
            if ($(this).css("position") == "fixed") {
              isFixed = true;
              return false;
            }
          });
        }
        return isFixed;
      },
      isLinkInMegaMenu: function ($a) {
        return $(this.getClosestMenu($a[0])).hasClass("mega-menu");
      },
      isTouchMode: function () {
        return !mouse || this.opts.noMouseOver || this.isCollapsible();
      },
      itemActivate: function ($a, hideDeeperSubs) {
        var $ul = $a.closest("ul"),
          level = $ul.dataSM("level");
        // if for some reason the parent item is not activated (e.g. this is an API call to activate the item), activate all parent items first
        if (
          level > 1 &&
          (!this.activatedItems[level - 2] ||
            this.activatedItems[level - 2][0] != $ul.dataSM("parent-a")[0])
        ) {
          var self = this;
          $($ul.parentsUntil("[data-smartmenus-id]", "ul").get().reverse())
            .add($ul)
            .each(function () {
              self.itemActivate($(this).dataSM("parent-a"));
            });
        }
        // hide any visible deeper level sub menus
        if (!this.isCollapsible() || hideDeeperSubs) {
          this.menuHideSubMenus(
            !this.activatedItems[level - 1] ||
              this.activatedItems[level - 1][0] != $a[0]
              ? level - 1
              : level
          );
        }
        // save new active item for this level
        this.activatedItems[level - 1] = $a;
        if (this.$root.triggerHandler("activate.smapi", $a[0]) === false) {
          return;
        }
        // show the sub menu if this item has one
        var $sub = $a.dataSM("sub");
        if (
          $sub &&
          (this.isTouchMode() || !this.opts.showOnClick || this.clickActivated)
        ) {
          this.menuShow($sub);
        }
      },
      itemBlur: function (e) {
        var $a = $(e.currentTarget);
        if (!this.handleItemEvents($a)) {
          return;
        }
        this.$root.triggerHandler("blur.smapi", $a[0]);
      },
      itemClick: function (e) {
        var $a = $(e.currentTarget);
        if (!this.handleItemEvents($a)) {
          return;
        }
        if (
          this.$touchScrollingSub &&
          this.$touchScrollingSub[0] == $a.closest("ul")[0]
        ) {
          this.$touchScrollingSub = null;
          e.stopPropagation();
          return false;
        }
        if (this.$root.triggerHandler("click.smapi", $a[0]) === false) {
          return false;
        }
        var $sub = $a.dataSM("sub"),
          firstLevelSub = $sub ? $sub.dataSM("level") == 2 : false;
        if ($sub) {
          var subArrowClicked = $(e.target).is(".sub-arrow"),
            collapsible = this.isCollapsible(),
            behaviorToggle = /toggle$/.test(this.opts.collapsibleBehavior),
            behaviorLink = /link$/.test(this.opts.collapsibleBehavior),
            behaviorAccordion = /^accordion/.test(
              this.opts.collapsibleBehavior
            );
          // if the sub is hidden, try to show it
          if (!$sub.is(":visible")) {
            if (!behaviorLink || !collapsible || subArrowClicked) {
              if (this.opts.showOnClick && firstLevelSub) {
                this.clickActivated = true;
              }
              // try to activate the item and show the sub
              this.itemActivate($a, behaviorAccordion);
              // if "itemActivate" showed the sub, prevent the click so that the link is not loaded
              // if it couldn't show it, then the sub menus are disabled with an !important declaration (e.g. via mobile styles) so let the link get loaded
              if ($sub.is(":visible")) {
                this.focusActivated = true;
                return false;
              }
            }
            // if the sub is visible and we are in collapsible mode
          } else if (collapsible && (behaviorToggle || subArrowClicked)) {
            this.itemActivate($a, behaviorAccordion);
            this.menuHide($sub);
            if (behaviorToggle) {
              this.focusActivated = false;
            }
            return false;
          }
        }
        if (
          (this.opts.showOnClick && firstLevelSub) ||
          $a.hasClass("disabled") ||
          this.$root.triggerHandler("select.smapi", $a[0]) === false
        ) {
          return false;
        }
      },
      itemDown: function (e) {
        var $a = $(e.currentTarget);
        if (!this.handleItemEvents($a)) {
          return;
        }
        $a.dataSM("mousedown", true);
      },
      itemEnter: function (e) {
        var $a = $(e.currentTarget);
        if (!this.handleItemEvents($a)) {
          return;
        }
        if (!this.isTouchMode()) {
          if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = 0;
          }
          var self = this;
          this.showTimeout = setTimeout(
            function () {
              self.itemActivate($a);
            },
            this.opts.showOnClick && $a.closest("ul").dataSM("level") == 1
              ? 1
              : this.opts.showTimeout
          );
        }
        this.$root.triggerHandler("mouseenter.smapi", $a[0]);
      },
      itemFocus: function (e) {
        var $a = $(e.currentTarget);
        if (!this.handleItemEvents($a)) {
          return;
        }
        // fix (the mousedown check): in some browsers a tap/click produces consecutive focus + click events so we don't need to activate the item on focus
        if (
          this.focusActivated &&
          (!this.isTouchMode() || !$a.dataSM("mousedown")) &&
          (!this.activatedItems.length ||
            this.activatedItems[this.activatedItems.length - 1][0] != $a[0])
        ) {
          this.itemActivate($a, true);
        }
        this.$root.triggerHandler("focus.smapi", $a[0]);
      },
      itemLeave: function (e) {
        var $a = $(e.currentTarget);
        if (!this.handleItemEvents($a)) {
          return;
        }
        if (!this.isTouchMode()) {
          $a[0].blur();
          if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = 0;
          }
        }
        $a.removeDataSM("mousedown");
        this.$root.triggerHandler("mouseleave.smapi", $a[0]);
      },
      menuHide: function ($sub) {
        if (this.$root.triggerHandler("beforehide.smapi", $sub[0]) === false) {
          return;
        }
        if (canAnimate) {
          $sub.stop(true, true);
        }
        if ($sub.css("display") != "none") {
          var complete = function () {
            // unset z-index
            $sub.css("z-index", "");
          };
          // if sub is collapsible (mobile view)
          if (this.isCollapsible()) {
            if (canAnimate && this.opts.collapsibleHideFunction) {
              this.opts.collapsibleHideFunction.call(this, $sub, complete);
            } else {
              $sub.hide(this.opts.collapsibleHideDuration, complete);
            }
          } else {
            if (canAnimate && this.opts.hideFunction) {
              this.opts.hideFunction.call(this, $sub, complete);
            } else {
              $sub.hide(this.opts.hideDuration, complete);
            }
          }
          // deactivate scrolling if it is activated for this sub
          if ($sub.dataSM("scroll")) {
            this.menuScrollStop($sub);
            $sub
              .css({
                "touch-action": "",
                "-ms-touch-action": "",
                "-webkit-transform": "",
                transform: "",
              })
              .off(".smartmenus_scroll")
              .removeDataSM("scroll")
              .dataSM("scroll-arrows")
              .hide();
          }
          // unhighlight parent item + accessibility
          $sub
            .dataSM("parent-a")
            .removeClass("highlighted")
            .attr("aria-expanded", "false");
          $sub.attr({
            "aria-expanded": "false",
            "aria-hidden": "true",
          });
          var level = $sub.dataSM("level");
          this.activatedItems.splice(level - 1, 1);
          this.visibleSubMenus.splice($.inArray($sub, this.visibleSubMenus), 1);
          this.$root.triggerHandler("hide.smapi", $sub[0]);
        }
      },
      menuHideAll: function () {
        if (this.showTimeout) {
          clearTimeout(this.showTimeout);
          this.showTimeout = 0;
        }
        // hide all subs
        // if it's a popup, this.visibleSubMenus[0] is the root UL
        var level = this.opts.isPopup ? 1 : 0;
        for (var i = this.visibleSubMenus.length - 1; i >= level; i--) {
          this.menuHide(this.visibleSubMenus[i]);
        }
        // hide root if it's popup
        if (this.opts.isPopup) {
          if (canAnimate) {
            this.$root.stop(true, true);
          }
          if (this.$root.is(":visible")) {
            if (canAnimate && this.opts.hideFunction) {
              this.opts.hideFunction.call(this, this.$root);
            } else {
              this.$root.hide(this.opts.hideDuration);
            }
          }
        }
        this.activatedItems = [];
        this.visibleSubMenus = [];
        this.clickActivated = false;
        this.focusActivated = false;
        // reset z-index increment
        this.zIndexInc = 0;
        this.$root.triggerHandler("hideAll.smapi");
      },
      menuHideSubMenus: function (level) {
        for (var i = this.activatedItems.length - 1; i >= level; i--) {
          var $sub = this.activatedItems[i].dataSM("sub");
          if ($sub) {
            this.menuHide($sub);
          }
        }
      },
      menuInit: function ($ul) {
        if (!$ul.dataSM("in-mega")) {
          // mark UL's in mega drop downs (if any) so we can neglect them
          if ($ul.hasClass("mega-menu")) {
            $ul.find("ul").dataSM("in-mega", true);
          }
          // get level (much faster than, for example, using parentsUntil)
          var level = 2,
            par = $ul[0];
          while ((par = par.parentNode.parentNode) != this.$root[0]) {
            level++;
          }
          // cache stuff for quick access
          var $a = $ul.prevAll("a").eq(-1);
          // if the link is nested (e.g. in a heading)
          if (!$a.length) {
            $a = $ul.prevAll().find("a").eq(-1);
          }
          $a.addClass("has-submenu").dataSM("sub", $ul);
          $ul
            .dataSM("parent-a", $a)
            .dataSM("level", level)
            .parent()
            .dataSM("sub", $ul);
          // accessibility
          var aId = $a.attr("id") || this.accessIdPrefix + ++this.idInc,
            ulId = $ul.attr("id") || this.accessIdPrefix + ++this.idInc;
          $a.attr({
            id: aId,
            "aria-haspopup": "true",
            "aria-controls": ulId,
            "aria-expanded": "false",
          });
          $ul.attr({
            id: ulId,
            role: "group",
            "aria-hidden": "true",
            "aria-labelledby": aId,
            "aria-expanded": "false",
          });
          // add sub indicator to parent item
          if (this.opts.subIndicators) {
            $a[this.opts.subIndicatorsPos](this.$subArrow.clone());
          }
        }
      },
      menuPosition: function ($sub) {
        var $a = $sub.dataSM("parent-a"),
          $li = $a.closest("li"),
          $ul = $li.parent(),
          level = $sub.dataSM("level"),
          subW = this.getWidth($sub),
          subH = this.getHeight($sub),
          itemOffset = $a.offset(),
          itemX = itemOffset.left,
          itemY = itemOffset.top,
          itemW = this.getWidth($a),
          itemH = this.getHeight($a),
          $win = $(window),
          winX = $win.scrollLeft(),
          winY = $win.scrollTop(),
          winW = this.getViewportWidth(),
          winH = this.getViewportHeight(),
          horizontalParent =
            $ul.parent().is("[data-sm-horizontal-sub]") ||
            (level == 2 && !$ul.hasClass("sm-vertical")),
          rightToLeft =
            (this.opts.rightToLeftSubMenus && !$li.is(".nav-sm-reverse")) ||
            (!this.opts.rightToLeftSubMenus && $li.is(".nav-sm-reverse")),
          subOffsetX =
            level == 2
              ? this.opts.mainMenuSubOffsetX
              : this.opts.subMenusSubOffsetX,
          subOffsetY =
            level == 2
              ? this.opts.mainMenuSubOffsetY
              : this.opts.subMenusSubOffsetY,
          x,
          y;
        if (horizontalParent) {
          x = rightToLeft ? itemW - subW - subOffsetX : subOffsetX;
          y = this.opts.bottomToTopSubMenus
            ? -subH - subOffsetY
            : itemH + subOffsetY;
        } else {
          x = rightToLeft ? subOffsetX - subW : itemW - subOffsetX;
          y = this.opts.bottomToTopSubMenus
            ? itemH - subOffsetY - subH
            : subOffsetY;
        }
        if (this.opts.keepInViewport) {
          var absX = itemX + x,
            absY = itemY + y;
          if (rightToLeft && absX < winX) {
            x = horizontalParent ? winX - absX + x : itemW - subOffsetX;
          } else if (!rightToLeft && absX + subW > winX + winW) {
            x = horizontalParent
              ? winX + winW - subW - absX + x
              : subOffsetX - subW;
          }
          if (!horizontalParent) {
            if (subH < winH && absY + subH > winY + winH) {
              y += winY + winH - subH - absY;
            } else if (subH >= winH || absY < winY) {
              y += winY - absY;
            }
          }
          // do we need scrolling?
          // 0.49 used for better precision when dealing with float values
          if (
            (horizontalParent &&
              (absY + subH > winY + winH + 0.49 || absY < winY)) ||
            (!horizontalParent && subH > winH + 0.49)
          ) {
            var self = this;
            if (!$sub.dataSM("scroll-arrows")) {
              $sub.dataSM(
                "scroll-arrows",
                $([
                  $(
                    '<span class="scroll-up"><span class="scroll-up-arrow"></span></span>'
                  )[0],
                  $(
                    '<span class="scroll-down"><span class="scroll-down-arrow"></span></span>'
                  )[0],
                ])
                  .on({
                    mouseenter: function () {
                      $sub.dataSM("scroll").up = $(this).hasClass("scroll-up");
                      self.menuScroll($sub);
                    },
                    mouseleave: function (e) {
                      self.menuScrollStop($sub);
                      self.menuScrollOut($sub, e);
                    },
                    "mousewheel DOMMouseScroll": function (e) {
                      e.preventDefault();
                    },
                  })
                  .insertAfter($sub)
              );
            }
            // bind scroll events and save scroll data for this sub
            var eNS = ".smartmenus_scroll";
            $sub
              .dataSM("scroll", {
                y: this.cssTransforms3d ? 0 : y - itemH,
                step: 1,
                // cache stuff for faster recalcs later
                itemH: itemH,
                subH: subH,
                arrowDownH: this.getHeight($sub.dataSM("scroll-arrows").eq(1)),
              })
              .on(
                getEventsNS(
                  {
                    mouseover: function (e) {
                      self.menuScrollOver($sub, e);
                    },
                    mouseout: function (e) {
                      self.menuScrollOut($sub, e);
                    },
                    "mousewheel DOMMouseScroll": function (e) {
                      self.menuScrollMousewheel($sub, e);
                    },
                  },
                  eNS
                )
              )
              .dataSM("scroll-arrows")
              .css({
                top: "auto",
                left: "0",
                marginLeft: x + (parseInt($sub.css("border-left-width")) || 0),
                width:
                  subW -
                  (parseInt($sub.css("border-left-width")) || 0) -
                  (parseInt($sub.css("border-right-width")) || 0),
                zIndex: $sub.css("z-index"),
              })
              .eq(horizontalParent && this.opts.bottomToTopSubMenus ? 0 : 1)
              .show();
            // when a menu tree is fixed positioned we allow scrolling via touch too
            // since there is no other way to access such long sub menus if no mouse is present
            if (this.isFixed()) {
              var events = {};
              events[
                touchEvents
                  ? "touchstart touchmove touchend"
                  : "pointerdown pointermove pointerup MSPointerDown MSPointerMove MSPointerUp"
              ] = function (e) {
                self.menuScrollTouch($sub, e);
              };
              $sub
                .css({ "touch-action": "none", "-ms-touch-action": "none" })
                .on(getEventsNS(events, eNS));
            }
          }
        }
        $sub.css({
          top: "auto",
          left: "0",
          marginLeft: x,
          marginTop: y - itemH,
        });
      },
      menuScroll: function ($sub, once, step) {
        var data = $sub.dataSM("scroll"),
          $arrows = $sub.dataSM("scroll-arrows"),
          end = data.up ? data.upEnd : data.downEnd,
          diff;
        if (!once && data.momentum) {
          data.momentum *= 0.92;
          diff = data.momentum;
          if (diff < 0.5) {
            this.menuScrollStop($sub);
            return;
          }
        } else {
          diff =
            step ||
            (once || !this.opts.scrollAccelerate
              ? this.opts.scrollStep
              : Math.floor(data.step));
        }
        // hide any visible deeper level sub menus
        var level = $sub.dataSM("level");
        if (
          this.activatedItems[level - 1] &&
          this.activatedItems[level - 1].dataSM("sub") &&
          this.activatedItems[level - 1].dataSM("sub").is(":visible")
        ) {
          this.menuHideSubMenus(level - 1);
        }
        data.y =
          (data.up && end <= data.y) || (!data.up && end >= data.y)
            ? data.y
            : Math.abs(end - data.y) > diff
            ? data.y + (data.up ? diff : -diff)
            : end;
        $sub.css(
          this.cssTransforms3d
            ? {
                "-webkit-transform": "translate3d(0, " + data.y + "px, 0)",
                transform: "translate3d(0, " + data.y + "px, 0)",
              }
            : { marginTop: data.y }
        );
        // show opposite arrow if appropriate
        if (
          mouse &&
          ((data.up && data.y > data.downEnd) ||
            (!data.up && data.y < data.upEnd))
        ) {
          $arrows.eq(data.up ? 1 : 0).show();
        }
        // if we've reached the end
        if (data.y == end) {
          if (mouse) {
            $arrows.eq(data.up ? 0 : 1).hide();
          }
          this.menuScrollStop($sub);
        } else if (!once) {
          if (this.opts.scrollAccelerate && data.step < this.opts.scrollStep) {
            data.step += 0.2;
          }
          var self = this;
          this.scrollTimeout = requestAnimationFrame(function () {
            self.menuScroll($sub);
          });
        }
      },
      menuScrollMousewheel: function ($sub, e) {
        if (this.getClosestMenu(e.target) == $sub[0]) {
          e = e.originalEvent;
          var up = (e.wheelDelta || -e.detail) > 0;
          if (
            $sub
              .dataSM("scroll-arrows")
              .eq(up ? 0 : 1)
              .is(":visible")
          ) {
            $sub.dataSM("scroll").up = up;
            this.menuScroll($sub, true);
          }
        }
        e.preventDefault();
      },
      menuScrollOut: function ($sub, e) {
        if (mouse) {
          if (
            !/^scroll-(up|down)/.test((e.relatedTarget || "").className) &&
            (($sub[0] != e.relatedTarget &&
              !$.contains($sub[0], e.relatedTarget)) ||
              this.getClosestMenu(e.relatedTarget) != $sub[0])
          ) {
            $sub.dataSM("scroll-arrows").css("visibility", "hidden");
          }
        }
      },
      menuScrollOver: function ($sub, e) {
        if (mouse) {
          if (
            !/^scroll-(up|down)/.test(e.target.className) &&
            this.getClosestMenu(e.target) == $sub[0]
          ) {
            this.menuScrollRefreshData($sub);
            var data = $sub.dataSM("scroll"),
              upEnd =
                $(window).scrollTop() -
                $sub.dataSM("parent-a").offset().top -
                data.itemH;
            $sub
              .dataSM("scroll-arrows")
              .eq(0)
              .css("margin-top", upEnd)
              .end()
              .eq(1)
              .css(
                "margin-top",
                upEnd + this.getViewportHeight() - data.arrowDownH
              )
              .end()
              .css("visibility", "visible");
          }
        }
      },
      menuScrollRefreshData: function ($sub) {
        var data = $sub.dataSM("scroll"),
          upEnd =
            $(window).scrollTop() -
            $sub.dataSM("parent-a").offset().top -
            data.itemH;
        if (this.cssTransforms3d) {
          upEnd = -(parseFloat($sub.css("margin-top")) - upEnd);
        }
        $.extend(data, {
          upEnd: upEnd,
          downEnd: upEnd + this.getViewportHeight() - data.subH,
        });
      },
      menuScrollStop: function ($sub) {
        if (this.scrollTimeout) {
          cancelAnimationFrame(this.scrollTimeout);
          this.scrollTimeout = 0;
          $sub.dataSM("scroll").step = 1;
          return true;
        }
      },
      menuScrollTouch: function ($sub, e) {
        e = e.originalEvent;
        if (isTouchEvent(e)) {
          var touchPoint = this.getTouchPoint(e);
          // neglect event if we touched a visible deeper level sub menu
          if (this.getClosestMenu(touchPoint.target) == $sub[0]) {
            var data = $sub.dataSM("scroll");
            if (/(start|down)$/i.test(e.type)) {
              if (this.menuScrollStop($sub)) {
                // if we were scrolling, just stop and don't activate any link on the first touch
                e.preventDefault();
                this.$touchScrollingSub = $sub;
              } else {
                this.$touchScrollingSub = null;
              }
              // update scroll data since the user might have zoomed, etc.
              this.menuScrollRefreshData($sub);
              // extend it with the touch properties
              $.extend(data, {
                touchStartY: touchPoint.pageY,
                touchStartTime: e.timeStamp,
              });
            } else if (/move$/i.test(e.type)) {
              var prevY =
                data.touchY !== undefined ? data.touchY : data.touchStartY;
              if (prevY !== undefined && prevY != touchPoint.pageY) {
                this.$touchScrollingSub = $sub;
                var up = prevY < touchPoint.pageY;
                // changed direction? reset...
                if (data.up !== undefined && data.up != up) {
                  $.extend(data, {
                    touchStartY: touchPoint.pageY,
                    touchStartTime: e.timeStamp,
                  });
                }
                $.extend(data, {
                  up: up,
                  touchY: touchPoint.pageY,
                });
                this.menuScroll($sub, true, Math.abs(touchPoint.pageY - prevY));
              }
              e.preventDefault();
            } else {
              // touchend/pointerup
              if (data.touchY !== undefined) {
                if (
                  (data.momentum =
                    Math.pow(
                      Math.abs(touchPoint.pageY - data.touchStartY) /
                        (e.timeStamp - data.touchStartTime),
                      2
                    ) * 15)
                ) {
                  this.menuScrollStop($sub);
                  this.menuScroll($sub);
                  e.preventDefault();
                }
                delete data.touchY;
              }
            }
          }
        }
      },
      menuShow: function ($sub) {
        if (!$sub.dataSM("beforefirstshowfired")) {
          $sub.dataSM("beforefirstshowfired", true);
          if (
            this.$root.triggerHandler("beforefirstshow.smapi", $sub[0]) ===
            false
          ) {
            return;
          }
        }
        if (this.$root.triggerHandler("beforeshow.smapi", $sub[0]) === false) {
          return;
        }
        $sub.dataSM("shown-before", true);
        if (canAnimate) {
          $sub.stop(true, true);
        }
        if (!$sub.is(":visible")) {
          // highlight parent item
          var $a = $sub.dataSM("parent-a"),
            collapsible = this.isCollapsible();
          if (this.opts.keepHighlighted || collapsible) {
            $a.addClass("highlighted");
          }
          if (collapsible) {
            $sub.removeClass("sm-nowrap").css({
              zIndex: "",
              width: "auto",
              minWidth: "",
              maxWidth: "",
              top: "",
              left: "",
              marginLeft: "",
              marginTop: "",
            });
          } else {
            // set z-index
            $sub.css(
              "z-index",
              (this.zIndexInc = (this.zIndexInc || this.getStartZIndex()) + 1)
            );
            // min/max-width fix - no way to rely purely on CSS as all UL's are nested
            if (this.opts.subMenusMinWidth || this.opts.subMenusMaxWidth) {
              $sub
                .css({ width: "auto", minWidth: "", maxWidth: "" })
                .addClass("sm-nowrap");
              if (this.opts.subMenusMinWidth) {
                $sub.css("min-width", this.opts.subMenusMinWidth);
              }
              if (this.opts.subMenusMaxWidth) {
                var noMaxWidth = this.getWidth($sub);
                $sub.css("max-width", this.opts.subMenusMaxWidth);
                if (noMaxWidth > this.getWidth($sub)) {
                  $sub
                    .removeClass("sm-nowrap")
                    .css("width", this.opts.subMenusMaxWidth);
                }
              }
            }
            this.menuPosition($sub);
          }
          var complete = function () {
            // fix: "overflow: hidden;" is not reset on animation complete in jQuery < 1.9.0 in Chrome when global "box-sizing: border-box;" is used
            $sub.css("overflow", "");
          };
          // if sub is collapsible (mobile view)
          if (collapsible) {
            if (canAnimate && this.opts.collapsibleShowFunction) {
              this.opts.collapsibleShowFunction.call(this, $sub, complete);
            } else {
              $sub.show(this.opts.collapsibleShowDuration, complete);
            }
          } else {
            if (canAnimate && this.opts.showFunction) {
              this.opts.showFunction.call(this, $sub, complete);
            } else {
              $sub.show(this.opts.showDuration, complete);
            }
          }
          // accessibility
          $a.attr("aria-expanded", "true");
          $sub.attr({
            "aria-expanded": "true",
            "aria-hidden": "false",
          });
          // store sub menu in visible array
          this.visibleSubMenus.push($sub);
          this.$root.triggerHandler("show.smapi", $sub[0]);
        }
      },
      popupHide: function (noHideTimeout) {
        if (this.hideTimeout) {
          clearTimeout(this.hideTimeout);
          this.hideTimeout = 0;
        }
        var self = this;
        this.hideTimeout = setTimeout(
          function () {
            self.menuHideAll();
          },
          noHideTimeout ? 1 : this.opts.hideTimeout
        );
      },
      popupShow: function (left, top) {
        if (!this.opts.isPopup) {
          alert(
            'SmartMenus jQuery Error:\n\nIf you want to show this menu via the "popupShow" method, set the isPopup:true option.'
          );
          return;
        }
        if (this.hideTimeout) {
          clearTimeout(this.hideTimeout);
          this.hideTimeout = 0;
        }
        this.$root.dataSM("shown-before", true);
        if (canAnimate) {
          this.$root.stop(true, true);
        }
        if (!this.$root.is(":visible")) {
          this.$root.css({ left: left, top: top });
          // show menu
          var self = this,
            complete = function () {
              self.$root.css("overflow", "");
            };
          if (canAnimate && this.opts.showFunction) {
            this.opts.showFunction.call(this, this.$root, complete);
          } else {
            this.$root.show(this.opts.showDuration, complete);
          }
          this.visibleSubMenus[0] = this.$root;
        }
      },
      refresh: function () {
        this.destroy(true);
        this.init(true);
      },
      rootKeyDown: function (e) {
        if (!this.handleEvents()) {
          return;
        }
        switch (e.keyCode) {
          case 27: // reset on Esc
            var $activeTopItem = this.activatedItems[0];
            if ($activeTopItem) {
              this.menuHideAll();
              $activeTopItem[0].focus();
              var $sub = $activeTopItem.dataSM("sub");
              if ($sub) {
                this.menuHide($sub);
              }
            }
            break;
          case 32: // activate item's sub on Space
            var $target = $(e.target);
            if ($target.is("a") && this.handleItemEvents($target)) {
              var $sub = $target.dataSM("sub");
              if ($sub && !$sub.is(":visible")) {
                this.itemClick({ currentTarget: e.target });
                e.preventDefault();
              }
            }
            break;
        }
      },
      rootOut: function (e) {
        if (
          !this.handleEvents() ||
          this.isTouchMode() ||
          e.target == this.$root[0]
        ) {
          return;
        }
        if (this.hideTimeout) {
          clearTimeout(this.hideTimeout);
          this.hideTimeout = 0;
        }
        if (!this.opts.showOnClick || !this.opts.hideOnClick) {
          var self = this;
          this.hideTimeout = setTimeout(function () {
            self.menuHideAll();
          }, this.opts.hideTimeout);
        }
      },
      rootOver: function (e) {
        if (
          !this.handleEvents() ||
          this.isTouchMode() ||
          e.target == this.$root[0]
        ) {
          return;
        }
        if (this.hideTimeout) {
          clearTimeout(this.hideTimeout);
          this.hideTimeout = 0;
        }
      },
      winResize: function (e) {
        if (!this.handleEvents()) {
          // we still need to resize the disable overlay if it's visible
          if (this.$disableOverlay) {
            var pos = this.$root.offset();
            this.$disableOverlay.css({
              top: pos.top,
              left: pos.left,
              width: this.$root.outerWidth(),
              height: this.$root.outerHeight(),
            });
          }
          return;
        }
        // hide sub menus on resize - on mobile do it only on orientation change
        if (
          !("onorientationchange" in window) ||
          e.type == "orientationchange"
        ) {
          var collapsible = this.isCollapsible();
          // if it was collapsible before resize and still is, don't do it
          if (!(this.wasCollapsible && collapsible)) {
            if (this.activatedItems.length) {
              this.activatedItems[this.activatedItems.length - 1][0].blur();
            }
            this.menuHideAll();
          }
          this.wasCollapsible = collapsible;
        }
      },
    },
  });
  $.fn.dataSM = function (key, val) {
    if (val) {
      return this.data(key + "_smartmenus", val);
    }
    return this.data(key + "_smartmenus");
  };
  $.fn.removeDataSM = function (key) {
    return this.removeData(key + "_smartmenus");
  };
  $.fn.smartmenus = function (options) {
    if (typeof options == "string") {
      var args = arguments,
        method = options;
      Array.prototype.shift.call(args);
      return this.each(function () {
        var smartmenus = $(this).data("smartmenus");
        if (smartmenus && smartmenus[method]) {
          smartmenus[method].apply(smartmenus, args);
        }
      });
    }
    return this.each(function () {
      // [data-sm-options] attribute on the root UL
      var dataOpts = $(this).data("sm-options") || null;
      if (dataOpts) {
        try {
          dataOpts = eval("(" + dataOpts + ")");
        } catch (e) {
          dataOpts = null;
          alert(
            'ERROR\n\nSmartMenus jQuery init:\nInvalid "data-sm-options" attribute value syntax.'
          );
        }
      }
      new $.SmartMenus(
        this,
        $.extend({}, $.fn.smartmenus.defaults, options, dataOpts)
      );
    });
  };
  // default settings
  $.fn.smartmenus.defaults = {
    isPopup: false, // is this a popup menu (can be shown via the popupShow/popupHide methods) or a permanent menu bar
    mainMenuSubOffsetX: 0, // pixels offset from default position
    mainMenuSubOffsetY: 0, // pixels offset from default position
    subMenusSubOffsetX: 0, // pixels offset from default position
    subMenusSubOffsetY: 0, // pixels offset from default position
    subMenusMinWidth: "10em", // min-width for the sub menus (any CSS unit) - if set, the fixed width set in CSS will be ignored
    subMenusMaxWidth: "20em", // max-width for the sub menus (any CSS unit) - if set, the fixed width set in CSS will be ignored
    subIndicators: true, // create sub menu indicators - creates a SPAN and inserts it in the A
    subIndicatorsPos: "append", // position of the SPAN relative to the menu item content ('append', 'prepend')
    subIndicatorsText: "", // [optionally] add text in the SPAN (e.g. '+') (you may want to check the CSS for the sub indicators too)
    scrollStep: 30, // pixels step when scrolling long sub menus that do not fit in the viewport height
    scrollAccelerate: true, // accelerate scrolling or use a fixed step
    showTimeout: 250, // timeout before showing the sub menus
    hideTimeout: 500, // timeout before hiding the sub menus
    showDuration: 0, // duration for show animation - set to 0 for no animation - matters only if showFunction:null
    showFunction: null, // custom function to use when showing a sub menu (the default is the jQuery 'show')
    // don't forget to call complete() at the end of whatever you do
    // e.g.: function($ul, complete) { $ul.fadeIn(250, complete); }
    hideDuration: 0, // duration for hide animation - set to 0 for no animation - matters only if hideFunction:null
    hideFunction: function ($ul, complete) {
      $ul.fadeOut(200, complete);
    }, // custom function to use when hiding a sub menu (the default is the jQuery 'hide')
    // don't forget to call complete() at the end of whatever you do
    // e.g.: function($ul, complete) { $ul.fadeOut(250, complete); }
    collapsibleShowDuration: 0, // duration for show animation for collapsible sub menus - matters only if collapsibleShowFunction:null
    collapsibleShowFunction: function ($ul, complete) {
      $ul.slideDown(200, complete);
    }, // custom function to use when showing a collapsible sub menu
    // (i.e. when mobile styles are used to make the sub menus collapsible)
    collapsibleHideDuration: 0, // duration for hide animation for collapsible sub menus - matters only if collapsibleHideFunction:null
    collapsibleHideFunction: function ($ul, complete) {
      $ul.slideUp(200, complete);
    }, // custom function to use when hiding a collapsible sub menu
    // (i.e. when mobile styles are used to make the sub menus collapsible)
    showOnClick: false, // show the first-level sub menus onclick instead of onmouseover (i.e. mimic desktop app menus) (matters only for mouse input)
    hideOnClick: true, // hide the sub menus on click/tap anywhere on the page
    noMouseOver: false, // disable sub menus activation onmouseover (i.e. behave like in touch mode - use just mouse clicks) (matters only for mouse input)
    keepInViewport: true, // reposition the sub menus if needed to make sure they always appear inside the viewport
    keepHighlighted: true, // keep all ancestor items of the current sub menu highlighted (adds the 'highlighted' class to the A's)
    markCurrentItem: false, // automatically add the 'current' class to the A element of the item linking to the current URL
    markCurrentTree: true, // add the 'current' class also to the A elements of all ancestor items of the current item
    rightToLeftSubMenus: false, // right to left display of the sub menus (check the CSS for the sub indicators' position)
    bottomToTopSubMenus: false, // bottom to top display of the sub menus
    collapsibleBehavior: "default", // parent items behavior in collapsible (mobile) view ('default', 'toggle', 'link', 'accordion', 'accordion-toggle', 'accordion-link')
    // 'default' - first tap on parent item expands sub, second tap loads its link
    // 'toggle' - the whole parent item acts just as a toggle button for its sub menu (expands/collapses on each tap)
    // 'link' - the parent item acts as a regular item (first tap loads its link), the sub menu can be expanded only via the +/- button
    // 'accordion' - like 'default' but on expand also resets any visible sub menus from deeper levels or other branches
    // 'accordion-toggle' - like 'toggle' but on expand also resets any visible sub menus from deeper levels or other branches
    // 'accordion-link' - like 'link' but on expand also resets any visible sub menus from deeper levels or other branches
  };
  return $;
});

// library for viewportchecker animate
/*
The MIT License (MIT)

Copyright (c) 2014 Dirk Groenen

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
*/
(function ($) {
  $.fn.viewportChecker = function (useroptions) {
    // Define options and extend with user
    var options = {
      classToAdd: "visible",
      classToRemove: "invisible",
      classToAddForFullView: "full-visible",
      removeClassAfterAnimation: false,
      offset: 100,
      repeat: false,
      invertBottomOffset: true,
      callbackFunction: function (elem, action) {},
      scrollHorizontal: false,
      scrollBox: window,
    };
    $.extend(options, useroptions);
    // Cache the given element and height of the browser
    var $elem = this,
      boxSize = {
        height: $(options.scrollBox).height(),
        width: $(options.scrollBox).width(),
      };
    /*
     * Main method that checks the elements and adds or removes the class(es)
     */
    this.checkElements = function () {
      var viewportStart, viewportEnd;
      // Set some vars to check with
      if (!options.scrollHorizontal) {
        viewportStart = Math.max(
          $("html").scrollTop(),
          $("body").scrollTop(),
          $(window).scrollTop()
        );
        viewportEnd = viewportStart + boxSize.height;
      } else {
        viewportStart = Math.max(
          $("html").scrollLeft(),
          $("body").scrollLeft(),
          $(window).scrollLeft()
        );
        viewportEnd = viewportStart + boxSize.width;
      }
      // Loop through all given dom elements
      $elem.each(function () {
        var $obj = $(this),
          objOptions = {},
          attrOptions = {};
        //  Get any individual attribution data
        if ($obj.data("vp-add-class"))
          attrOptions.classToAdd = $obj.data("vp-add-class");
        if ($obj.data("vp-remove-class"))
          attrOptions.classToRemove = $obj.data("vp-remove-class");
        if ($obj.data("vp-add-class-full-view"))
          attrOptions.classToAddForFullView = $obj.data(
            "vp-add-class-full-view"
          );
        if ($obj.data("vp-keep-add-class"))
          attrOptions.removeClassAfterAnimation = $obj.data(
            "vp-remove-after-animation"
          );
        if ($obj.data("vp-offset")) attrOptions.offset = $obj.data("vp-offset");
        if ($obj.data("vp-repeat")) attrOptions.repeat = $obj.data("vp-repeat");
        if ($obj.data("vp-scrollHorizontal"))
          attrOptions.scrollHorizontal = $obj.data("vp-scrollHorizontal");
        if ($obj.data("vp-invertBottomOffset"))
          attrOptions.scrollHorizontal = $obj.data("vp-invertBottomOffset");
        // Extend objOptions with data attributes and default options
        $.extend(objOptions, options);
        $.extend(objOptions, attrOptions);
        // If class already exists; quit
        if ($obj.data("vp-animated") && !objOptions.repeat) {
          return;
        }
        // Check if the offset is percentage based
        if (String(objOptions.offset).indexOf("%") > 0) {
          console.log("if string");
          objOptions.offset =
            (parseInt(objOptions.offset) / 100) * boxSize.height;
        }
        // Get the raw start and end positions
        var rawStart = !objOptions.scrollHorizontal
            ? $obj.offset().top
            : $obj.offset().left,
          rawEnd = !objOptions.scrollHorizontal
            ? rawStart + $obj.height()
            : rawStart + $obj.width();
        // Add the defined offset
        var elemStart = Math.round(rawStart) + objOptions.offset,
          elemEnd = !objOptions.scrollHorizontal
            ? elemStart + $obj.height()
            : elemStart + $obj.width();
        if (objOptions.invertBottomOffset) elemEnd -= objOptions.offset * 2;
        // Add class if in viewport
        if (elemStart < viewportEnd && elemEnd > viewportStart) {
          // Remove class
          $obj.removeClass(objOptions.classToRemove);
          $obj.addClass(objOptions.classToAdd);
          // Do the callback function. Callback wil send the jQuery object as parameter
          objOptions.callbackFunction($obj, "add");
          // Check if full element is in view
          if (rawEnd <= viewportEnd && rawStart >= viewportStart)
            $obj.addClass(objOptions.classToAddForFullView);
          else $obj.removeClass(objOptions.classToAddForFullView);
          // Set element as already animated
          $obj.data("vp-animated", true);
          if (objOptions.removeClassAfterAnimation) {
            $obj.one(
              "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
              function () {
                $obj.removeClass(objOptions.classToAdd);
              }
            );
          }
          // Remove class if not in viewport and repeat is true
        } else if ($obj.hasClass(objOptions.classToAdd) && objOptions.repeat) {
          $obj.removeClass(
            objOptions.classToAdd + " " + objOptions.classToAddForFullView
          );
          // Do the callback function.
          objOptions.callbackFunction($obj, "remove");
          // Remove already-animated-flag
          $obj.data("vp-animated", false);
        }
      });
    };
    /**
     * Binding the correct event listener is still a tricky thing.
     * People have expierenced sloppy scrolling when both scroll and touch
     * events are added, but to make sure devices with both scroll and touch
     * are handles too we always have to add the window.scroll event
     *
     * @see  https://github.com/dirkgroenen/jQuery-viewport-checker/issues/25
     * @see  https://github.com/dirkgroenen/jQuery-viewport-checker/issues/27
     */
    // Select the correct events
    if ("ontouchstart" in window || "onmsgesturechange" in window) {
      // Device with touchscreen
      $(document).bind(
        "touchmove MSPointerMove pointermove",
        this.checkElements
      );
    }
    // Always load on window load
    $(options.scrollBox).bind("load scroll", this.checkElements);
    // On resize change the height var
    $(window).resize(function (e) {
      boxSize = {
        height: $(options.scrollBox).height(),
        width: $(options.scrollBox).width(),
      };
      $elem.checkElements();
    });
    // trigger inital check if elements already visible
    this.checkElements();
    // Default jquery plugin behaviour
    return this;
  };
})(jQuery);

// library for popup https://dimsemenov.com/plugins/magnific-popup/
/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
(function (factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // Node/CommonJS
    factory(require("jquery"));
  } else {
    // Browser globals
    factory(window.jQuery || window.Zepto);
  }
})(function ($) {
  /*>>core*/
  /**
   *
   * Magnific Popup Core JS file
   *
   */

  /**
   * Private static constants
   */
  var CLOSE_EVENT = "Close",
    BEFORE_CLOSE_EVENT = "BeforeClose",
    AFTER_CLOSE_EVENT = "AfterClose",
    BEFORE_APPEND_EVENT = "BeforeAppend",
    MARKUP_PARSE_EVENT = "MarkupParse",
    OPEN_EVENT = "Open",
    CHANGE_EVENT = "Change",
    NS = "mfp",
    EVENT_NS = "." + NS,
    READY_CLASS = "mfp-ready",
    REMOVING_CLASS = "mfp-removing",
    PREVENT_CLOSE_CLASS = "mfp-prevent-close";

  /**
   * Private vars
   */
  /*jshint -W079 */
  var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
    MagnificPopup = function () {},
    _isJQ = !!window.jQuery,
    _prevStatus,
    _window = $(window),
    _document,
    _prevContentType,
    _wrapClasses,
    _currPopupType;

  /**
   * Private functions
   */
  var _mfpOn = function (name, f) {
      mfp.ev.on(NS + name + EVENT_NS, f);
    },
    _getEl = function (className, appendTo, html, raw) {
      var el = document.createElement("div");
      el.className = "mfp-" + className;
      if (html) {
        el.innerHTML = html;
      }
      if (!raw) {
        el = $(el);
        if (appendTo) {
          el.appendTo(appendTo);
        }
      } else if (appendTo) {
        appendTo.appendChild(el);
      }
      return el;
    },
    _mfpTrigger = function (e, data) {
      mfp.ev.triggerHandler(NS + e, data);

      if (mfp.st.callbacks) {
        // converts "mfpEventName" to "eventName" callback and triggers it if it's present
        e = e.charAt(0).toLowerCase() + e.slice(1);
        if (mfp.st.callbacks[e]) {
          mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
        }
      }
    },
    _getCloseBtn = function (type) {
      if (type !== _currPopupType || !mfp.currTemplate.closeBtn) {
        mfp.currTemplate.closeBtn = $(
          mfp.st.closeMarkup.replace("%title%", mfp.st.tClose)
        );
        _currPopupType = type;
      }
      return mfp.currTemplate.closeBtn;
    },
    // Initialize Magnific Popup only when called at least once
    _checkInstance = function () {
      if (!$.magnificPopup.instance) {
        /*jshint -W020 */
        mfp = new MagnificPopup();
        mfp.init();
        $.magnificPopup.instance = mfp;
      }
    },
    // CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
    supportsTransitions = function () {
      var s = document.createElement("p").style, // 's' for style. better to create an element if body yet to exist
        v = ["ms", "O", "Moz", "Webkit"]; // 'v' for vendor

      if (s["transition"] !== undefined) {
        return true;
      }

      while (v.length) {
        if (v.pop() + "Transition" in s) {
          return true;
        }
      }

      return false;
    };

  /**
   * Public functions
   */
  MagnificPopup.prototype = {
    constructor: MagnificPopup,

    /**
     * Initializes Magnific Popup plugin.
     * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
     */
    init: function () {
      var appVersion = navigator.appVersion;
      mfp.isLowIE = mfp.isIE8 = document.all && !document.addEventListener;
      mfp.isAndroid = /android/gi.test(appVersion);
      mfp.isIOS = /iphone|ipad|ipod/gi.test(appVersion);
      mfp.supportsTransition = supportsTransitions();

      // We disable fixed positioned lightbox on devices that don't handle it nicely.
      // If you know a better way of detecting this - let me know.
      mfp.probablyMobile =
        mfp.isAndroid ||
        mfp.isIOS ||
        /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
          navigator.userAgent
        );
      _document = $(document);

      mfp.popupsCache = {};
    },

    /**
     * Opens popup
     * @param  data [description]
     */
    open: function (data) {
      var i;

      if (data.isObj === false) {
        // convert jQuery collection to array to avoid conflicts later
        mfp.items = data.items.toArray();

        mfp.index = 0;
        var items = data.items,
          item;
        for (i = 0; i < items.length; i++) {
          item = items[i];
          if (item.parsed) {
            item = item.el[0];
          }
          if (item === data.el[0]) {
            mfp.index = i;
            break;
          }
        }
      } else {
        mfp.items = $.isArray(data.items) ? data.items : [data.items];
        mfp.index = data.index || 0;
      }

      // if popup is already opened - we just update the content
      if (mfp.isOpen) {
        mfp.updateItemHTML();
        return;
      }

      mfp.types = [];
      _wrapClasses = "";
      if (data.mainEl && data.mainEl.length) {
        mfp.ev = data.mainEl.eq(0);
      } else {
        mfp.ev = _document;
      }

      if (data.key) {
        if (!mfp.popupsCache[data.key]) {
          mfp.popupsCache[data.key] = {};
        }
        mfp.currTemplate = mfp.popupsCache[data.key];
      } else {
        mfp.currTemplate = {};
      }

      mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data);
      mfp.fixedContentPos =
        mfp.st.fixedContentPos === "auto"
          ? !mfp.probablyMobile
          : mfp.st.fixedContentPos;

      if (mfp.st.modal) {
        mfp.st.closeOnContentClick = false;
        mfp.st.closeOnBgClick = false;
        mfp.st.showCloseBtn = false;
        mfp.st.enableEscapeKey = false;
      }

      // Building markup
      // main containers are created only once
      if (!mfp.bgOverlay) {
        // Dark overlay
        mfp.bgOverlay = _getEl("bg").on("click" + EVENT_NS, function () {
          mfp.close();
        });

        mfp.wrap = _getEl("wrap")
          .attr("tabindex", -1)
          .on("click" + EVENT_NS, function (e) {
            if (mfp._checkIfClose(e.target)) {
              mfp.close();
            }
          });

        mfp.container = _getEl("container", mfp.wrap);
      }

      mfp.contentContainer = _getEl("content");
      if (mfp.st.preloader) {
        mfp.preloader = _getEl("preloader", mfp.container, mfp.st.tLoading);
      }

      // Initializing modules
      var modules = $.magnificPopup.modules;
      for (i = 0; i < modules.length; i++) {
        var n = modules[i];
        n = n.charAt(0).toUpperCase() + n.slice(1);
        mfp["init" + n].call(mfp);
      }
      _mfpTrigger("BeforeOpen");

      if (mfp.st.showCloseBtn) {
        // Close button
        if (!mfp.st.closeBtnInside) {
          mfp.wrap.append(_getCloseBtn());
        } else {
          _mfpOn(MARKUP_PARSE_EVENT, function (e, template, values, item) {
            values.close_replaceWith = _getCloseBtn(item.type);
          });
          _wrapClasses += " mfp-close-btn-in";
        }
      }

      if (mfp.st.alignTop) {
        _wrapClasses += " mfp-align-top";
      }

      if (mfp.fixedContentPos) {
        mfp.wrap.css({
          overflow: mfp.st.overflowY,
          overflowX: "hidden",
          overflowY: mfp.st.overflowY,
        });
      } else {
        mfp.wrap.css({
          top: _window.scrollTop(),
          position: "absolute",
        });
      }
      if (
        mfp.st.fixedBgPos === false ||
        (mfp.st.fixedBgPos === "auto" && !mfp.fixedContentPos)
      ) {
        mfp.bgOverlay.css({
          height: _document.height(),
          position: "absolute",
        });
      }

      if (mfp.st.enableEscapeKey) {
        // Close on ESC key
        _document.on("keyup" + EVENT_NS, function (e) {
          if (e.keyCode === 27) {
            mfp.close();
          }
        });
      }

      _window.on("resize" + EVENT_NS, function () {
        mfp.updateSize();
      });

      if (!mfp.st.closeOnContentClick) {
        _wrapClasses += " mfp-auto-cursor";
      }

      if (_wrapClasses) mfp.wrap.addClass(_wrapClasses);

      // this triggers recalculation of layout, so we get it once to not to trigger twice
      var windowHeight = (mfp.wH = _window.height());

      var windowStyles = {};

      if (mfp.fixedContentPos) {
        if (mfp._hasScrollBar(windowHeight)) {
          var s = mfp._getScrollbarSize();
          if (s) {
            windowStyles.marginRight = s;
          }
        }
      }

      if (mfp.fixedContentPos) {
        if (!mfp.isIE7) {
          windowStyles.overflow = "hidden";
        } else {
          // ie7 double-scroll bug
          $("body, html").css("overflow", "hidden");
        }
      }

      var classesToadd = mfp.st.mainClass;
      if (mfp.isIE7) {
        classesToadd += " mfp-ie7";
      }
      if (classesToadd) {
        mfp._addClassToMFP(classesToadd);
      }

      // add content
      mfp.updateItemHTML();

      _mfpTrigger("BuildControls");

      // remove scrollbar, add margin e.t.c
      $("html").css(windowStyles);

      // add everything to DOM
      mfp.bgOverlay
        .add(mfp.wrap)
        .prependTo(mfp.st.prependTo || $(document.body));

      // Save last focused element
      mfp._lastFocusedEl = document.activeElement;

      // Wait for next cycle to allow CSS transition
      setTimeout(function () {
        if (mfp.content) {
          mfp._addClassToMFP(READY_CLASS);
          mfp._setFocus();
        } else {
          // if content is not defined (not loaded e.t.c) we add class only for BG
          mfp.bgOverlay.addClass(READY_CLASS);
        }

        // Trap the focus in popup
        _document.on("focusin" + EVENT_NS, mfp._onFocusIn);
      }, 16);

      mfp.isOpen = true;
      mfp.updateSize(windowHeight);
      _mfpTrigger(OPEN_EVENT);

      return data;
    },

    /**
     * Closes the popup
     */
    close: function () {
      if (!mfp.isOpen) return;
      _mfpTrigger(BEFORE_CLOSE_EVENT);

      mfp.isOpen = false;
      // for CSS3 animation
      if (mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition) {
        mfp._addClassToMFP(REMOVING_CLASS);
        setTimeout(function () {
          mfp._close();
        }, mfp.st.removalDelay);
      } else {
        mfp._close();
      }
    },

    /**
     * Helper for close() function
     */
    _close: function () {
      _mfpTrigger(CLOSE_EVENT);

      var classesToRemove = REMOVING_CLASS + " " + READY_CLASS + " ";

      mfp.bgOverlay.detach();
      mfp.wrap.detach();
      mfp.container.empty();

      if (mfp.st.mainClass) {
        classesToRemove += mfp.st.mainClass + " ";
      }

      mfp._removeClassFromMFP(classesToRemove);

      if (mfp.fixedContentPos) {
        var windowStyles = { marginRight: "" };
        if (mfp.isIE7) {
          $("body, html").css("overflow", "");
        } else {
          windowStyles.overflow = "";
        }
        $("html").css(windowStyles);
      }

      _document.off("keyup" + EVENT_NS + " focusin" + EVENT_NS);
      mfp.ev.off(EVENT_NS);

      // clean up DOM elements that aren't removed
      mfp.wrap.attr("class", "mfp-wrap").removeAttr("style");
      mfp.bgOverlay.attr("class", "mfp-bg");
      mfp.container.attr("class", "mfp-container");

      // remove close button from target element
      if (
        mfp.st.showCloseBtn &&
        (!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)
      ) {
        if (mfp.currTemplate.closeBtn) mfp.currTemplate.closeBtn.detach();
      }

      if (mfp.st.autoFocusLast && mfp._lastFocusedEl) {
        $(mfp._lastFocusedEl).focus(); // put tab focus back
      }
      mfp.currItem = null;
      mfp.content = null;
      mfp.currTemplate = null;
      mfp.prevHeight = 0;

      _mfpTrigger(AFTER_CLOSE_EVENT);
    },

    updateSize: function (winHeight) {
      if (mfp.isIOS) {
        // fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
        var zoomLevel =
          document.documentElement.clientWidth / window.innerWidth;
        var height = window.innerHeight * zoomLevel;
        mfp.wrap.css("height", height);
        mfp.wH = height;
      } else {
        mfp.wH = winHeight || _window.height();
      }
      // Fixes #84: popup incorrectly positioned with position:relative on body
      if (!mfp.fixedContentPos) {
        mfp.wrap.css("height", mfp.wH);
      }

      _mfpTrigger("Resize");
    },

    /**
     * Set content of popup based on current index
     */
    updateItemHTML: function () {
      var item = mfp.items[mfp.index];

      // Detach and perform modifications
      mfp.contentContainer.detach();

      if (mfp.content) mfp.content.detach();

      if (!item.parsed) {
        item = mfp.parseEl(mfp.index);
      }

      var type = item.type;

      _mfpTrigger("BeforeChange", [
        mfp.currItem ? mfp.currItem.type : "",
        type,
      ]);
      // BeforeChange event works like so:
      // _mfpOn('BeforeChange', function(e, prevType, newType) { });

      mfp.currItem = item;

      if (!mfp.currTemplate[type]) {
        var markup = mfp.st[type] ? mfp.st[type].markup : false;

        // allows to modify markup
        _mfpTrigger("FirstMarkupParse", markup);

        if (markup) {
          mfp.currTemplate[type] = $(markup);
        } else {
          // if there is no markup found we just define that template is parsed
          mfp.currTemplate[type] = true;
        }
      }

      if (_prevContentType && _prevContentType !== item.type) {
        mfp.container.removeClass("mfp-" + _prevContentType + "-holder");
      }

      var newContent = mfp[
        "get" + type.charAt(0).toUpperCase() + type.slice(1)
      ](item, mfp.currTemplate[type]);
      mfp.appendContent(newContent, type);

      item.preloaded = true;

      _mfpTrigger(CHANGE_EVENT, item);
      _prevContentType = item.type;

      // Append container back after its content changed
      mfp.container.prepend(mfp.contentContainer);

      _mfpTrigger("AfterChange");
    },

    /**
     * Set HTML content of popup
     */
    appendContent: function (newContent, type) {
      mfp.content = newContent;

      if (newContent) {
        if (
          mfp.st.showCloseBtn &&
          mfp.st.closeBtnInside &&
          mfp.currTemplate[type] === true
        ) {
          // if there is no markup, we just append close button element inside
          if (!mfp.content.find(".mfp-close").length) {
            mfp.content.append(_getCloseBtn());
          }
        } else {
          mfp.content = newContent;
        }
      } else {
        mfp.content = "";
      }

      _mfpTrigger(BEFORE_APPEND_EVENT);
      mfp.container.addClass("mfp-" + type + "-holder");

      mfp.contentContainer.append(mfp.content);
    },

    /**
     * Creates Magnific Popup data object based on given data
     * @param  {int} index Index of item to parse
     */
    parseEl: function (index) {
      var item = mfp.items[index],
        type;

      if (item.tagName) {
        item = { el: $(item) };
      } else {
        type = item.type;
        item = { data: item, src: item.src };
      }

      if (item.el) {
        var types = mfp.types;

        // check for 'mfp-TYPE' class
        for (var i = 0; i < types.length; i++) {
          if (item.el.hasClass("mfp-" + types[i])) {
            type = types[i];
            break;
          }
        }

        item.src = item.el.attr("data-mfp-src");
        if (!item.src) {
          item.src = item.el.attr("href");
        }
      }

      item.type = type || mfp.st.type || "inline";
      item.index = index;
      item.parsed = true;
      mfp.items[index] = item;
      _mfpTrigger("ElementParse", item);

      return mfp.items[index];
    },

    /**
     * Initializes single popup or a group of popups
     */
    addGroup: function (el, options) {
      var eHandler = function (e) {
        e.mfpEl = this;
        mfp._openClick(e, el, options);
      };

      if (!options) {
        options = {};
      }

      var eName = "click.magnificPopup";
      options.mainEl = el;

      if (options.items) {
        options.isObj = true;
        el.off(eName).on(eName, eHandler);
      } else {
        options.isObj = false;
        if (options.delegate) {
          el.off(eName).on(eName, options.delegate, eHandler);
        } else {
          options.items = el;
          el.off(eName).on(eName, eHandler);
        }
      }
    },
    _openClick: function (e, el, options) {
      var midClick =
        options.midClick !== undefined
          ? options.midClick
          : $.magnificPopup.defaults.midClick;

      if (
        !midClick &&
        (e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)
      ) {
        return;
      }

      var disableOn =
        options.disableOn !== undefined
          ? options.disableOn
          : $.magnificPopup.defaults.disableOn;

      if (disableOn) {
        if ($.isFunction(disableOn)) {
          if (!disableOn.call(mfp)) {
            return true;
          }
        } else {
          // else it's number
          if (_window.width() < disableOn) {
            return true;
          }
        }
      }

      if (e.type) {
        e.preventDefault();

        // This will prevent popup from closing if element is inside and popup is already opened
        if (mfp.isOpen) {
          e.stopPropagation();
        }
      }

      options.el = $(e.mfpEl);
      if (options.delegate) {
        options.items = el.find(options.delegate);
      }
      mfp.open(options);
    },

    /**
     * Updates text on preloader
     */
    updateStatus: function (status, text) {
      if (mfp.preloader) {
        if (_prevStatus !== status) {
          mfp.container.removeClass("mfp-s-" + _prevStatus);
        }

        if (!text && status === "loading") {
          text = mfp.st.tLoading;
        }

        var data = {
          status: status,
          text: text,
        };
        // allows to modify status
        _mfpTrigger("UpdateStatus", data);

        status = data.status;
        text = data.text;

        mfp.preloader.html(text);

        mfp.preloader.find("a").on("click", function (e) {
          e.stopImmediatePropagation();
        });

        mfp.container.addClass("mfp-s-" + status);
        _prevStatus = status;
      }
    },

    /*
		"Private" helpers that aren't private at all
	 */
    // Check to close popup or not
    // "target" is an element that was clicked
    _checkIfClose: function (target) {
      if ($(target).hasClass(PREVENT_CLOSE_CLASS)) {
        return;
      }

      var closeOnContent = mfp.st.closeOnContentClick;
      var closeOnBg = mfp.st.closeOnBgClick;

      if (closeOnContent && closeOnBg) {
        return true;
      } else {
        // We close the popup if click is on close button or on preloader. Or if there is no content.
        if (
          !mfp.content ||
          $(target).hasClass("mfp-close") ||
          (mfp.preloader && target === mfp.preloader[0])
        ) {
          return true;
        }

        // if click is outside the content
        if (target !== mfp.content[0] && !$.contains(mfp.content[0], target)) {
          if (closeOnBg) {
            // last check, if the clicked element is in DOM, (in case it's removed onclick)
            if ($.contains(document, target)) {
              return true;
            }
          }
        } else if (closeOnContent) {
          return true;
        }
      }
      return false;
    },
    _addClassToMFP: function (cName) {
      mfp.bgOverlay.addClass(cName);
      mfp.wrap.addClass(cName);
    },
    _removeClassFromMFP: function (cName) {
      this.bgOverlay.removeClass(cName);
      mfp.wrap.removeClass(cName);
    },
    _hasScrollBar: function (winHeight) {
      return (
        (mfp.isIE7 ? _document.height() : document.body.scrollHeight) >
        (winHeight || _window.height())
      );
    },
    _setFocus: function () {
      (mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
    },
    _onFocusIn: function (e) {
      if (e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target)) {
        mfp._setFocus();
        return false;
      }
    },
    _parseMarkup: function (template, values, item) {
      var arr;
      if (item.data) {
        values = $.extend(item.data, values);
      }
      _mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item]);

      $.each(values, function (key, value) {
        if (value === undefined || value === false) {
          return true;
        }
        arr = key.split("_");
        if (arr.length > 1) {
          var el = template.find(EVENT_NS + "-" + arr[0]);

          if (el.length > 0) {
            var attr = arr[1];
            if (attr === "replaceWith") {
              if (el[0] !== value[0]) {
                el.replaceWith(value);
              }
            } else if (attr === "img") {
              if (el.is("img")) {
                el.attr("src", value);
              } else {
                el.replaceWith(
                  $("<img>").attr("src", value).attr("class", el.attr("class"))
                );
              }
            } else {
              el.attr(arr[1], value);
            }
          }
        } else {
          template.find(EVENT_NS + "-" + key).html(value);
        }
      });
    },

    _getScrollbarSize: function () {
      // thx David
      if (mfp.scrollbarSize === undefined) {
        var scrollDiv = document.createElement("div");
        scrollDiv.style.cssText =
          "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
        document.body.appendChild(scrollDiv);
        mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
      }
      return mfp.scrollbarSize;
    },
  }; /* MagnificPopup core prototype end */

  /**
   * Public static functions
   */
  $.magnificPopup = {
    instance: null,
    proto: MagnificPopup.prototype,
    modules: [],

    open: function (options, index) {
      _checkInstance();

      if (!options) {
        options = {};
      } else {
        options = $.extend(true, {}, options);
      }

      options.isObj = true;
      options.index = index || 0;
      return this.instance.open(options);
    },

    close: function () {
      return $.magnificPopup.instance && $.magnificPopup.instance.close();
    },

    registerModule: function (name, module) {
      if (module.options) {
        $.magnificPopup.defaults[name] = module.options;
      }
      $.extend(this.proto, module.proto);
      this.modules.push(name);
    },

    defaults: {
      // Info about options is in docs:
      // http://dimsemenov.com/plugins/magnific-popup/documentation.html#options

      disableOn: 0,

      key: null,

      midClick: false,

      mainClass: "",

      preloader: true,

      focus: "", // CSS selector of input to focus after popup is opened

      closeOnContentClick: false,

      closeOnBgClick: true,

      closeBtnInside: true,

      showCloseBtn: true,

      enableEscapeKey: true,

      modal: false,

      alignTop: false,

      removalDelay: 0,

      prependTo: null,

      fixedContentPos: "auto",

      fixedBgPos: "auto",

      overflowY: "auto",

      closeMarkup:
        '<button title="%title%" type="button" class="mfp-close">&#215;</button>',

      tClose: "Close (Esc)",

      tLoading: "Loading...",

      autoFocusLast: true,
    },
  };

  $.fn.magnificPopup = function (options) {
    _checkInstance();

    var jqEl = $(this);

    // We call some API method of first param is a string
    if (typeof options === "string") {
      if (options === "open") {
        var items,
          itemOpts = _isJQ ? jqEl.data("magnificPopup") : jqEl[0].magnificPopup,
          index = parseInt(arguments[1], 10) || 0;

        if (itemOpts.items) {
          items = itemOpts.items[index];
        } else {
          items = jqEl;
          if (itemOpts.delegate) {
            items = items.find(itemOpts.delegate);
          }
          items = items.eq(index);
        }
        mfp._openClick({ mfpEl: items }, jqEl, itemOpts);
      } else {
        if (mfp.isOpen)
          mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
      }
    } else {
      // clone options obj
      options = $.extend(true, {}, options);

      /*
       * As Zepto doesn't support .data() method for objects
       * and it works only in normal browsers
       * we assign "options" object directly to the DOM element. FTW!
       */
      if (_isJQ) {
        jqEl.data("magnificPopup", options);
      } else {
        jqEl[0].magnificPopup = options;
      }

      mfp.addGroup(jqEl, options);
    }
    return jqEl;
  };

  /*>>core*/

  /*>>inline*/

  var INLINE_NS = "inline",
    _hiddenClass,
    _inlinePlaceholder,
    _lastInlineElement,
    _putInlineElementsBack = function () {
      if (_lastInlineElement) {
        _inlinePlaceholder
          .after(_lastInlineElement.addClass(_hiddenClass))
          .detach();
        _lastInlineElement = null;
      }
    };

  $.magnificPopup.registerModule(INLINE_NS, {
    options: {
      hiddenClass: "hide", // will be appended with `mfp-` prefix
      markup: "",
      tNotFound: "Content not found",
    },
    proto: {
      initInline: function () {
        mfp.types.push(INLINE_NS);

        _mfpOn(CLOSE_EVENT + "." + INLINE_NS, function () {
          _putInlineElementsBack();
        });
      },

      getInline: function (item, template) {
        _putInlineElementsBack();

        if (item.src) {
          var inlineSt = mfp.st.inline,
            el = $(item.src);

          if (el.length) {
            // If target element has parent - we replace it with placeholder and put it back after popup is closed
            var parent = el[0].parentNode;
            if (parent && parent.tagName) {
              if (!_inlinePlaceholder) {
                _hiddenClass = inlineSt.hiddenClass;
                _inlinePlaceholder = _getEl(_hiddenClass);
                _hiddenClass = "mfp-" + _hiddenClass;
              }
              // replace target inline element with placeholder
              _lastInlineElement = el
                .after(_inlinePlaceholder)
                .detach()
                .removeClass(_hiddenClass);
            }

            mfp.updateStatus("ready");
          } else {
            mfp.updateStatus("error", inlineSt.tNotFound);
            el = $("<div>");
          }

          item.inlineElement = el;
          return el;
        }

        mfp.updateStatus("ready");
        mfp._parseMarkup(template, {}, item);
        return template;
      },
    },
  });

  /*>>inline*/

  /*>>ajax*/
  var AJAX_NS = "ajax",
    _ajaxCur,
    _removeAjaxCursor = function () {
      if (_ajaxCur) {
        $(document.body).removeClass(_ajaxCur);
      }
    },
    _destroyAjaxRequest = function () {
      _removeAjaxCursor();
      if (mfp.req) {
        mfp.req.abort();
      }
    };

  $.magnificPopup.registerModule(AJAX_NS, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.',
    },

    proto: {
      initAjax: function () {
        mfp.types.push(AJAX_NS);
        _ajaxCur = mfp.st.ajax.cursor;

        _mfpOn(CLOSE_EVENT + "." + AJAX_NS, _destroyAjaxRequest);
        _mfpOn("BeforeChange." + AJAX_NS, _destroyAjaxRequest);
      },
      getAjax: function (item) {
        if (_ajaxCur) {
          $(document.body).addClass(_ajaxCur);
        }

        mfp.updateStatus("loading");

        var opts = $.extend(
          {
            url: item.src,
            success: function (data, textStatus, jqXHR) {
              var temp = {
                data: data,
                xhr: jqXHR,
              };

              _mfpTrigger("ParseAjax", temp);

              mfp.appendContent($(temp.data), AJAX_NS);

              item.finished = true;

              _removeAjaxCursor();

              mfp._setFocus();

              setTimeout(function () {
                mfp.wrap.addClass(READY_CLASS);
              }, 16);

              mfp.updateStatus("ready");

              _mfpTrigger("AjaxContentAdded");
            },
            error: function () {
              _removeAjaxCursor();
              item.finished = item.loadError = true;
              mfp.updateStatus(
                "error",
                mfp.st.ajax.tError.replace("%url%", item.src)
              );
            },
          },
          mfp.st.ajax.settings
        );

        mfp.req = $.ajax(opts);

        return "";
      },
    },
  });

  /*>>ajax*/

  /*>>image*/
  var _imgInterval,
    _getTitle = function (item) {
      if (item.data && item.data.title !== undefined) return item.data.title;

      var src = mfp.st.image.titleSrc;

      if (src) {
        if ($.isFunction(src)) {
          return src.call(mfp, item);
        } else if (item.el) {
          return item.el.attr(src) || "";
        }
      }
      return "";
    };

  $.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure">' +
        '<div class="mfp-close"></div>' +
        "<figure>" +
        '<div class="mfp-img"></div>' +
        "<figcaption>" +
        '<div class="mfp-bottom-bar">' +
        '<div class="mfp-title"></div>' +
        '<div class="mfp-counter"></div>' +
        "</div>" +
        "</figcaption>" +
        "</figure>" +
        "</div>",
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: true,
      tError: '<a href="%url%">The image</a> could not be loaded.',
    },

    proto: {
      initImage: function () {
        var imgSt = mfp.st.image,
          ns = ".image";

        mfp.types.push("image");

        _mfpOn(OPEN_EVENT + ns, function () {
          if (mfp.currItem.type === "image" && imgSt.cursor) {
            $(document.body).addClass(imgSt.cursor);
          }
        });

        _mfpOn(CLOSE_EVENT + ns, function () {
          if (imgSt.cursor) {
            $(document.body).removeClass(imgSt.cursor);
          }
          _window.off("resize" + EVENT_NS);
        });

        _mfpOn("Resize" + ns, mfp.resizeImage);
        if (mfp.isLowIE) {
          _mfpOn("AfterChange", mfp.resizeImage);
        }
      },
      resizeImage: function () {
        var item = mfp.currItem;
        if (!item || !item.img) return;

        if (mfp.st.image.verticalFit) {
          var decr = 0;
          // fix box-sizing in ie7/8
          if (mfp.isLowIE) {
            decr =
              parseInt(item.img.css("padding-top"), 10) +
              parseInt(item.img.css("padding-bottom"), 10);
          }
          item.img.css("max-height", mfp.wH - decr);
        }
      },
      _onImageHasSize: function (item) {
        if (item.img) {
          item.hasSize = true;

          if (_imgInterval) {
            clearInterval(_imgInterval);
          }

          item.isCheckingImgSize = false;

          _mfpTrigger("ImageHasSize", item);

          if (item.imgHidden) {
            if (mfp.content) mfp.content.removeClass("mfp-loading");

            item.imgHidden = false;
          }
        }
      },

      /**
       * Function that loops until the image has size to display elements that rely on it asap
       */
      findImageSize: function (item) {
        var counter = 0,
          img = item.img[0],
          mfpSetInterval = function (delay) {
            if (_imgInterval) {
              clearInterval(_imgInterval);
            }
            // decelerating interval that checks for size of an image
            _imgInterval = setInterval(function () {
              if (img.naturalWidth > 0) {
                mfp._onImageHasSize(item);
                return;
              }

              if (counter > 200) {
                clearInterval(_imgInterval);
              }

              counter++;
              if (counter === 3) {
                mfpSetInterval(10);
              } else if (counter === 40) {
                mfpSetInterval(50);
              } else if (counter === 100) {
                mfpSetInterval(500);
              }
            }, delay);
          };

        mfpSetInterval(1);
      },

      getImage: function (item, template) {
        var guard = 0,
          // image load complete handler
          onLoadComplete = function () {
            if (item) {
              if (item.img[0].complete) {
                item.img.off(".mfploader");

                if (item === mfp.currItem) {
                  mfp._onImageHasSize(item);

                  mfp.updateStatus("ready");
                }

                item.hasSize = true;
                item.loaded = true;

                _mfpTrigger("ImageLoadComplete");
              } else {
                // if image complete check fails 200 times (20 sec), we assume that there was an error.
                guard++;
                if (guard < 200) {
                  setTimeout(onLoadComplete, 100);
                } else {
                  onLoadError();
                }
              }
            }
          },
          // image error handler
          onLoadError = function () {
            if (item) {
              item.img.off(".mfploader");
              if (item === mfp.currItem) {
                mfp._onImageHasSize(item);
                mfp.updateStatus(
                  "error",
                  imgSt.tError.replace("%url%", item.src)
                );
              }

              item.hasSize = true;
              item.loaded = true;
              item.loadError = true;
            }
          },
          imgSt = mfp.st.image;

        var el = template.find(".mfp-img");
        if (el.length) {
          var img = document.createElement("img");
          img.className = "mfp-img";
          if (item.el && item.el.find("img").length) {
            img.alt = item.el.find("img").attr("alt");
          }
          item.img = $(img)
            .on("load.mfploader", onLoadComplete)
            .on("error.mfploader", onLoadError);
          img.src = item.src;

          // without clone() "error" event is not firing when IMG is replaced by new IMG
          // TODO: find a way to avoid such cloning
          if (el.is("img")) {
            item.img = item.img.clone();
          }

          img = item.img[0];
          if (img.naturalWidth > 0) {
            item.hasSize = true;
          } else if (!img.width) {
            item.hasSize = false;
          }
        }

        mfp._parseMarkup(
          template,
          {
            title: _getTitle(item),
            img_replaceWith: item.img,
          },
          item
        );

        mfp.resizeImage();

        if (item.hasSize) {
          if (_imgInterval) clearInterval(_imgInterval);

          if (item.loadError) {
            template.addClass("mfp-loading");
            mfp.updateStatus("error", imgSt.tError.replace("%url%", item.src));
          } else {
            template.removeClass("mfp-loading");
            mfp.updateStatus("ready");
          }
          return template;
        }

        mfp.updateStatus("loading");
        item.loading = true;

        if (!item.hasSize) {
          item.imgHidden = true;
          template.addClass("mfp-loading");
          mfp.findImageSize(item);
        }

        return template;
      },
    },
  });

  /*>>image*/

  /*>>zoom*/
  var hasMozTransform,
    getHasMozTransform = function () {
      if (hasMozTransform === undefined) {
        hasMozTransform =
          document.createElement("p").style.MozTransform !== undefined;
      }
      return hasMozTransform;
    };

  $.magnificPopup.registerModule("zoom", {
    options: {
      enabled: false,
      easing: "ease-in-out",
      duration: 300,
      opener: function (element) {
        return element.is("img") ? element : element.find("img");
      },
    },

    proto: {
      initZoom: function () {
        var zoomSt = mfp.st.zoom,
          ns = ".zoom",
          image;

        if (!zoomSt.enabled || !mfp.supportsTransition) {
          return;
        }

        var duration = zoomSt.duration,
          getElToAnimate = function (image) {
            var newImg = image
                .clone()
                .removeAttr("style")
                .removeAttr("class")
                .addClass("mfp-animated-image"),
              transition =
                "all " + zoomSt.duration / 1000 + "s " + zoomSt.easing,
              cssObj = {
                position: "fixed",
                zIndex: 9999,
                left: 0,
                top: 0,
                "-webkit-backface-visibility": "hidden",
              },
              t = "transition";

            cssObj["-webkit-" + t] =
              cssObj["-moz-" + t] =
              cssObj["-o-" + t] =
              cssObj[t] =
                transition;

            newImg.css(cssObj);
            return newImg;
          },
          showMainContent = function () {
            mfp.content.css("visibility", "visible");
          },
          openTimeout,
          animatedImg;

        _mfpOn("BuildControls" + ns, function () {
          if (mfp._allowZoom()) {
            clearTimeout(openTimeout);
            mfp.content.css("visibility", "hidden");

            // Basically, all code below does is clones existing image, puts in on top of the current one and animated it

            image = mfp._getItemToZoom();

            if (!image) {
              showMainContent();
              return;
            }

            animatedImg = getElToAnimate(image);

            animatedImg.css(mfp._getOffset());

            mfp.wrap.append(animatedImg);

            openTimeout = setTimeout(function () {
              animatedImg.css(mfp._getOffset(true));
              openTimeout = setTimeout(function () {
                showMainContent();

                setTimeout(function () {
                  animatedImg.remove();
                  image = animatedImg = null;
                  _mfpTrigger("ZoomAnimationEnded");
                }, 16); // avoid blink when switching images
              }, duration); // this timeout equals animation duration
            }, 16); // by adding this timeout we avoid short glitch at the beginning of animation

            // Lots of timeouts...
          }
        });
        _mfpOn(BEFORE_CLOSE_EVENT + ns, function () {
          if (mfp._allowZoom()) {
            clearTimeout(openTimeout);

            mfp.st.removalDelay = duration;

            if (!image) {
              image = mfp._getItemToZoom();
              if (!image) {
                return;
              }
              animatedImg = getElToAnimate(image);
            }

            animatedImg.css(mfp._getOffset(true));
            mfp.wrap.append(animatedImg);
            mfp.content.css("visibility", "hidden");

            setTimeout(function () {
              animatedImg.css(mfp._getOffset());
            }, 16);
          }
        });

        _mfpOn(CLOSE_EVENT + ns, function () {
          if (mfp._allowZoom()) {
            showMainContent();
            if (animatedImg) {
              animatedImg.remove();
            }
            image = null;
          }
        });
      },

      _allowZoom: function () {
        return mfp.currItem.type === "image";
      },

      _getItemToZoom: function () {
        if (mfp.currItem.hasSize) {
          return mfp.currItem.img;
        } else {
          return false;
        }
      },

      // Get element postion relative to viewport
      _getOffset: function (isLarge) {
        var el;
        if (isLarge) {
          el = mfp.currItem.img;
        } else {
          el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
        }

        var offset = el.offset();
        var paddingTop = parseInt(el.css("padding-top"), 10);
        var paddingBottom = parseInt(el.css("padding-bottom"), 10);
        offset.top -= $(window).scrollTop() - paddingTop;

        /*

			Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.

			 */
        var obj = {
          width: el.width(),
          // fix Zepto height+padding issue
          height:
            (_isJQ ? el.innerHeight() : el[0].offsetHeight) -
            paddingBottom -
            paddingTop,
        };

        // I hate to do this, but there is no another option
        if (getHasMozTransform()) {
          obj["-moz-transform"] = obj["transform"] =
            "translate(" + offset.left + "px," + offset.top + "px)";
        } else {
          obj.left = offset.left;
          obj.top = offset.top;
        }
        return obj;
      },
    },
  });

  /*>>zoom*/

  /*>>iframe*/

  var IFRAME_NS = "iframe",
    _emptyPage = "//about:blank",
    _fixIframeBugs = function (isShowing) {
      if (mfp.currTemplate[IFRAME_NS]) {
        var el = mfp.currTemplate[IFRAME_NS].find("iframe");
        if (el.length) {
          // reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
          if (!isShowing) {
            el[0].src = _emptyPage;
          }

          // IE8 black screen bug fix
          if (mfp.isIE8) {
            el.css("display", isShowing ? "block" : "none");
          }
        }
      }
    };

  $.magnificPopup.registerModule(IFRAME_NS, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler">' +
        '<div class="mfp-close"></div>' +
        '<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>' +
        "</div>",

      srcAction: "iframe_src",

      // we don't care and support only one default type of URL by default
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
        gmaps: {
          index: "//maps.google.",
          src: "%id%&output=embed",
        },
      },
    },

    proto: {
      initIframe: function () {
        mfp.types.push(IFRAME_NS);

        _mfpOn("BeforeChange", function (e, prevType, newType) {
          if (prevType !== newType) {
            if (prevType === IFRAME_NS) {
              _fixIframeBugs(); // iframe if removed
            } else if (newType === IFRAME_NS) {
              _fixIframeBugs(true); // iframe is showing
            }
          } // else {
          // iframe source is switched, don't do anything
          //}
        });

        _mfpOn(CLOSE_EVENT + "." + IFRAME_NS, function () {
          _fixIframeBugs();
        });
      },

      getIframe: function (item, template) {
        var embedSrc = item.src;
        var iframeSt = mfp.st.iframe;

        $.each(iframeSt.patterns, function () {
          if (embedSrc.indexOf(this.index) > -1) {
            if (this.id) {
              if (typeof this.id === "string") {
                embedSrc = embedSrc.substr(
                  embedSrc.lastIndexOf(this.id) + this.id.length,
                  embedSrc.length
                );
              } else {
                embedSrc = this.id.call(this, embedSrc);
              }
            }
            embedSrc = this.src.replace("%id%", embedSrc);
            return false; // break;
          }
        });

        var dataObj = {};
        if (iframeSt.srcAction) {
          dataObj[iframeSt.srcAction] = embedSrc;
        }
        mfp._parseMarkup(template, dataObj, item);

        mfp.updateStatus("ready");

        return template;
      },
    },
  });

  /*>>iframe*/

  /*>>gallery*/
  /**
   * Get looped index depending on number of slides
   */
  var _getLoopedId = function (index) {
      var numSlides = mfp.items.length;
      if (index > numSlides - 1) {
        return index - numSlides;
      } else if (index < 0) {
        return numSlides + index;
      }
      return index;
    },
    _replaceCurrTotal = function (text, curr, total) {
      return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
    };

  $.magnificPopup.registerModule("gallery", {
    options: {
      enabled: false,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: true,
      arrows: true,

      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%",
    },

    proto: {
      initGallery: function () {
        var gSt = mfp.st.gallery,
          ns = ".mfp-gallery";

        mfp.direction = true; // true - next, false - prev

        if (!gSt || !gSt.enabled) return false;

        _wrapClasses += " mfp-gallery";

        _mfpOn(OPEN_EVENT + ns, function () {
          if (gSt.navigateByImgClick) {
            mfp.wrap.on("click" + ns, ".mfp-img", function () {
              if (mfp.items.length > 1) {
                mfp.next();
                return false;
              }
            });
          }

          _document.on("keydown" + ns, function (e) {
            if (e.keyCode === 37) {
              mfp.prev();
            } else if (e.keyCode === 39) {
              mfp.next();
            }
          });
        });

        _mfpOn("UpdateStatus" + ns, function (e, data) {
          if (data.text) {
            data.text = _replaceCurrTotal(
              data.text,
              mfp.currItem.index,
              mfp.items.length
            );
          }
        });

        _mfpOn(MARKUP_PARSE_EVENT + ns, function (e, element, values, item) {
          var l = mfp.items.length;
          values.counter =
            l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : "";
        });

        _mfpOn("BuildControls" + ns, function () {
          if (mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
            var markup = gSt.arrowMarkup,
              arrowLeft = (mfp.arrowLeft = $(
                markup
                  .replace(/%title%/gi, gSt.tPrev)
                  .replace(/%dir%/gi, "left")
              ).addClass(PREVENT_CLOSE_CLASS)),
              arrowRight = (mfp.arrowRight = $(
                markup
                  .replace(/%title%/gi, gSt.tNext)
                  .replace(/%dir%/gi, "right")
              ).addClass(PREVENT_CLOSE_CLASS));

            arrowLeft.click(function () {
              mfp.prev();
            });
            arrowRight.click(function () {
              mfp.next();
            });

            mfp.container.append(arrowLeft.add(arrowRight));
          }
        });

        _mfpOn(CHANGE_EVENT + ns, function () {
          if (mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);

          mfp._preloadTimeout = setTimeout(function () {
            mfp.preloadNearbyImages();
            mfp._preloadTimeout = null;
          }, 16);
        });

        _mfpOn(CLOSE_EVENT + ns, function () {
          _document.off(ns);
          mfp.wrap.off("click" + ns);
          mfp.arrowRight = mfp.arrowLeft = null;
        });
      },
      next: function () {
        mfp.direction = true;
        mfp.index = _getLoopedId(mfp.index + 1);
        mfp.updateItemHTML();
      },
      prev: function () {
        mfp.direction = false;
        mfp.index = _getLoopedId(mfp.index - 1);
        mfp.updateItemHTML();
      },
      goTo: function (newIndex) {
        mfp.direction = newIndex >= mfp.index;
        mfp.index = newIndex;
        mfp.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var p = mfp.st.gallery.preload,
          preloadBefore = Math.min(p[0], mfp.items.length),
          preloadAfter = Math.min(p[1], mfp.items.length),
          i;

        for (i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
          mfp._preloadItem(mfp.index + i);
        }
        for (i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
          mfp._preloadItem(mfp.index - i);
        }
      },
      _preloadItem: function (index) {
        index = _getLoopedId(index);

        if (mfp.items[index].preloaded) {
          return;
        }

        var item = mfp.items[index];
        if (!item.parsed) {
          item = mfp.parseEl(index);
        }

        _mfpTrigger("LazyLoad", item);

        if (item.type === "image") {
          item.img = $('<img class="mfp-img" />')
            .on("load.mfploader", function () {
              item.hasSize = true;
            })
            .on("error.mfploader", function () {
              item.hasSize = true;
              item.loadError = true;
              _mfpTrigger("LazyLoadError", item);
            })
            .attr("src", item.src);
        }

        item.preloaded = true;
      },
    },
  });

  /*>>gallery*/

  /*>>retina*/

  var RETINA_NS = "retina";

  $.magnificPopup.registerModule(RETINA_NS, {
    options: {
      replaceSrc: function (item) {
        return item.src.replace(/\.\w+$/, function (m) {
          return "@2x" + m;
        });
      },
      ratio: 1, // Function or number.  Set to 1 to disable.
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var st = mfp.st.retina,
            ratio = st.ratio;

          ratio = !isNaN(ratio) ? ratio : ratio();

          if (ratio > 1) {
            _mfpOn("ImageHasSize" + "." + RETINA_NS, function (e, item) {
              item.img.css({
                "max-width": item.img[0].naturalWidth / ratio,
                width: "100%",
              });
            });
            _mfpOn("ElementParse" + "." + RETINA_NS, function (e, item) {
              item.src = st.replaceSrc(item, ratio);
            });
          }
        }
      },
    },
  });

  /*>>retina*/
  _checkInstance();
});

/*! sidr - v2.2.1 - 2016-02-17
 * http://www.berriart.com/sidr/
 * Copyright (c) 2013-2016 Alberto Varela; Licensed MIT */
!(function () {
  "use strict";
  function a(a, b, c) {
    var d = new o(b);
    switch (a) {
      case "open":
        d.open(c);
        break;
      case "close":
        d.close(c);
        break;
      case "toggle":
        d.toggle(c);
        break;
      default:
        p.error("Method " + a + " does not exist on jQuery.sidr");
    }
  }
  function b(a) {
    return "status" === a
      ? h
      : s[a]
      ? s[a].apply(this, Array.prototype.slice.call(arguments, 1))
      : "function" != typeof a && "string" != typeof a && a
      ? void q.error("Method " + a + " does not exist on jQuery.sidr")
      : s.toggle.apply(this, arguments);
  }
  function c(a, b) {
    if ("function" == typeof b.source) {
      var c = b.source(name);
      a.html(c);
    } else if ("string" == typeof b.source && i.isUrl(b.source))
      u.get(b.source, function (b) {
        a.html(b);
      });
    else if ("string" == typeof b.source) {
      var d = "",
        e = b.source.split(",");
      if (
        (u.each(e, function (a, b) {
          d += '<div class="sidr-inner">' + u(b).html() + "</div>";
        }),
        b.renaming)
      ) {
        var f = u("<div />").html(d);
        f.find("*").each(function (a, b) {
          var c = u(b);
          i.addPrefixes(c);
        }),
          (d = f.html());
      }
      a.html(d);
    } else null !== b.source && u.error("Invalid Sidr Source");
    return a;
  }
  function d(a) {
    var d = i.transitions,
      e = u.extend(
        {
          name: "sidr",
          speed: 200,
          side: "left",
          source: null,
          renaming: !0,
          body: "body",
          displace: !0,
          timing: "ease",
          method: "toggle",
          bind: "touchstart click",
          onOpen: function () {},
          onClose: function () {},
          onOpenEnd: function () {},
          onCloseEnd: function () {},
        },
        a
      ),
      f = e.name,
      g = u("#" + f);
    return (
      0 === g.length && (g = u("<div />").attr("id", f).appendTo(u("body"))),
      d.supported &&
        g.css(d.property, e.side + " " + e.speed / 1e3 + "s " + e.timing),
      g.addClass("sidr").addClass(e.side).data({
        speed: e.speed,
        side: e.side,
        body: e.body,
        displace: e.displace,
        timing: e.timing,
        method: e.method,
        onOpen: e.onOpen,
        onClose: e.onClose,
        onOpenEnd: e.onOpenEnd,
        onCloseEnd: e.onCloseEnd,
      }),
      (g = c(g, e)),
      this.each(function () {
        var a = u(this),
          c = a.data("sidr"),
          d = !1;
        c ||
          ((h.moving = !1),
          (h.opened = !1),
          a.data("sidr", f),
          a.bind(e.bind, function (a) {
            a.preventDefault(),
              d ||
                ((d = !0),
                b(e.method, f),
                setTimeout(function () {
                  d = !1;
                }, 100));
          }));
      })
    );
  }
  var e = {};
  (e.classCallCheck = function (a, b) {
    if (!(a instanceof b))
      throw new TypeError("Cannot call a class as a function");
  }),
    (e.createClass = (function () {
      function a(a, b) {
        for (var c = 0; c < b.length; c++) {
          var d = b[c];
          (d.enumerable = d.enumerable || !1),
            (d.configurable = !0),
            "value" in d && (d.writable = !0),
            Object.defineProperty(a, d.key, d);
        }
      }
      return function (b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b;
      };
    })());
  var f,
    g,
    h = { moving: !1, opened: !1 },
    i = {
      isUrl: function (a) {
        var b = new RegExp(
          "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
          "i"
        );
        return b.test(a) ? !0 : !1;
      },
      addPrefixes: function (a) {
        this.addPrefix(a, "id"),
          this.addPrefix(a, "class"),
          a.removeAttr("style");
      },
      addPrefix: function (a, b) {
        var c = a.attr(b);
        "string" == typeof c &&
          "" !== c &&
          "sidr-inner" !== c &&
          a.attr(b, c.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-" + b + "-$1"));
      },
      transitions: (function () {
        var a = document.body || document.documentElement,
          b = a.style,
          c = !1,
          d = "transition";
        return (
          d in b
            ? (c = !0)
            : !(function () {
                var a = ["moz", "webkit", "o", "ms"],
                  e = void 0,
                  f = void 0;
                (d = d.charAt(0).toUpperCase() + d.substr(1)),
                  (c = (function () {
                    for (f = 0; f < a.length; f++)
                      if (((e = a[f]), e + d in b)) return !0;
                    return !1;
                  })()),
                  (d = c
                    ? "-" + e.toLowerCase() + "-" + d.toLowerCase()
                    : null);
              })(),
          { supported: c, property: d }
        );
      })(),
    },
    j = jQuery,
    k = "sidr-animating",
    l = "open",
    m = "close",
    n =
      "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
    o = (function () {
      function a(b) {
        e.classCallCheck(this, a),
          (this.name = b),
          (this.item = j("#" + b)),
          (this.openClass =
            "sidr" === b ? "sidr-open" : "sidr-open " + b + "-open"),
          (this.menuWidth = this.item.outerWidth(!0)),
          (this.speed = this.item.data("speed")),
          (this.side = this.item.data("side")),
          (this.displace = this.item.data("displace")),
          (this.timing = this.item.data("timing")),
          (this.method = this.item.data("method")),
          (this.onOpenCallback = this.item.data("onOpen")),
          (this.onCloseCallback = this.item.data("onClose")),
          (this.onOpenEndCallback = this.item.data("onOpenEnd")),
          (this.onCloseEndCallback = this.item.data("onCloseEnd")),
          (this.body = j(this.item.data("body")));
      }
      return (
        e.createClass(a, [
          {
            key: "getAnimation",
            value: function (a, b) {
              var c = {},
                d = this.side;
              return (
                "open" === a && "body" === b
                  ? (c[d] = this.menuWidth + "px")
                  : "close" === a && "menu" === b
                  ? (c[d] = "-" + this.menuWidth + "px")
                  : (c[d] = 0),
                c
              );
            },
          },
          {
            key: "prepareBody",
            value: function (a) {
              var b = "open" === a ? "hidden" : "";
              if (this.body.is("body")) {
                var c = j("html"),
                  d = c.scrollTop();
                c.css("overflow-x", b).scrollTop(d);
              }
            },
          },
          {
            key: "openBody",
            value: function () {
              if (this.displace) {
                var a = i.transitions,
                  b = this.body;
                if (a.supported)
                  b
                    .css(
                      a.property,
                      this.side + " " + this.speed / 1e3 + "s " + this.timing
                    )
                    .css(this.side, 0)
                    .css({ width: b.width(), position: "absolute" }),
                    b.css(this.side, this.menuWidth + "px");
                else {
                  var c = this.getAnimation(l, "body");
                  b.css({ width: b.width(), position: "absolute" }).animate(c, {
                    queue: !1,
                    duration: this.speed,
                  });
                }
              }
            },
          },
          {
            key: "onCloseBody",
            value: function () {
              var a = i.transitions,
                b = { width: "", position: "", right: "", left: "" };
              a.supported && (b[a.property] = ""), this.body.css(b).unbind(n);
            },
          },
          {
            key: "closeBody",
            value: function () {
              var a = this;
              if (this.displace)
                if (i.transitions.supported)
                  this.body.css(this.side, 0).one(n, function () {
                    a.onCloseBody();
                  });
                else {
                  var b = this.getAnimation(m, "body");
                  this.body.animate(b, {
                    queue: !1,
                    duration: this.speed,
                    complete: function () {
                      a.onCloseBody();
                    },
                  });
                }
            },
          },
          {
            key: "moveBody",
            value: function (a) {
              a === l ? this.openBody() : this.closeBody();
            },
          },
          {
            key: "onOpenMenu",
            value: function (a) {
              var b = this.name;
              (h.moving = !1),
                (h.opened = b),
                this.item.unbind(n),
                this.body.removeClass(k).addClass(this.openClass),
                this.onOpenEndCallback(),
                "function" == typeof a && a(b);
            },
          },
          {
            key: "openMenu",
            value: function (a) {
              var b = this,
                c = this.item;
              if (i.transitions.supported)
                c.css(this.side, 0).one(n, function () {
                  b.onOpenMenu(a);
                });
              else {
                var d = this.getAnimation(l, "menu");
                c.css("display", "block").animate(d, {
                  queue: !1,
                  duration: this.speed,
                  complete: function () {
                    b.onOpenMenu(a);
                  },
                });
              }
            },
          },
          {
            key: "onCloseMenu",
            value: function (a) {
              this.item.css({ left: "", right: "" }).unbind(n),
                j("html").css("overflow-x", ""),
                (h.moving = !1),
                (h.opened = !1),
                this.body.removeClass(k).removeClass(this.openClass),
                this.onCloseEndCallback(),
                "function" == typeof a && a(name);
            },
          },
          {
            key: "closeMenu",
            value: function (a) {
              var b = this,
                c = this.item;
              if (i.transitions.supported)
                c.css(this.side, "").one(n, function () {
                  b.onCloseMenu(a);
                });
              else {
                var d = this.getAnimation(m, "menu");
                c.animate(d, {
                  queue: !1,
                  duration: this.speed,
                  complete: function () {
                    b.onCloseMenu();
                  },
                });
              }
            },
          },
          {
            key: "moveMenu",
            value: function (a, b) {
              this.body.addClass(k),
                a === l ? this.openMenu(b) : this.closeMenu(b);
            },
          },
          {
            key: "move",
            value: function (a, b) {
              (h.moving = !0),
                this.prepareBody(a),
                this.moveBody(a),
                this.moveMenu(a, b);
            },
          },
          {
            key: "open",
            value: function (b) {
              var c = this;
              if (h.opened !== this.name && !h.moving) {
                if (h.opened !== !1) {
                  var d = new a(h.opened);
                  return void d.close(function () {
                    c.open(b);
                  });
                }
                this.move("open", b), this.onOpenCallback();
              }
            },
          },
          {
            key: "close",
            value: function (a) {
              h.opened !== this.name ||
                h.moving ||
                (this.move("close", a), this.onCloseCallback());
            },
          },
          {
            key: "toggle",
            value: function (a) {
              h.opened === this.name ? this.close(a) : this.open(a);
            },
          },
        ]),
        a
      );
    })(),
    p = jQuery,
    q = jQuery,
    r = ["open", "close", "toggle"],
    s = {},
    t = function (b) {
      return function (c, d) {
        "function" == typeof c ? ((d = c), (c = "sidr")) : c || (c = "sidr"),
          a(b, c, d);
      };
    };
  for (f = 0; f < r.length; f++) (g = r[f]), (s[g] = t(g));
  var u = jQuery;
  (jQuery.sidr = b), (jQuery.fn.sidr = d);
})();

// library for slider swiper
/**
 * Swiper 6.6.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2021 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: May 19, 2021
 */

!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper =
        t());
})(this, function () {
  "use strict";
  function e(e, t) {
    for (var a = 0; a < t.length; a++) {
      var i = t[a];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(e, i.key, i);
    }
  }
  function t() {
    return (t =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = arguments[t];
          for (var i in a)
            Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
        }
        return e;
      }).apply(this, arguments);
  }
  function a(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function i(e, t) {
    void 0 === e && (e = {}),
      void 0 === t && (t = {}),
      Object.keys(t).forEach(function (s) {
        void 0 === e[s]
          ? (e[s] = t[s])
          : a(t[s]) && a(e[s]) && Object.keys(t[s]).length > 0 && i(e[s], t[s]);
      });
  }
  var s = {
    body: {},
    addEventListener: function () {},
    removeEventListener: function () {},
    activeElement: { blur: function () {}, nodeName: "" },
    querySelector: function () {
      return null;
    },
    querySelectorAll: function () {
      return [];
    },
    getElementById: function () {
      return null;
    },
    createEvent: function () {
      return { initEvent: function () {} };
    },
    createElement: function () {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function () {},
        getElementsByTagName: function () {
          return [];
        },
      };
    },
    createElementNS: function () {
      return {};
    },
    importNode: function () {
      return null;
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function r() {
    var e = "undefined" != typeof document ? document : {};
    return i(e, s), e;
  }
  var n = {
    document: s,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: {
      replaceState: function () {},
      pushState: function () {},
      go: function () {},
      back: function () {},
    },
    CustomEvent: function () {
      return this;
    },
    addEventListener: function () {},
    removeEventListener: function () {},
    getComputedStyle: function () {
      return {
        getPropertyValue: function () {
          return "";
        },
      };
    },
    Image: function () {},
    Date: function () {},
    screen: {},
    setTimeout: function () {},
    clearTimeout: function () {},
    matchMedia: function () {
      return {};
    },
    requestAnimationFrame: function (e) {
      return "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0);
    },
    cancelAnimationFrame: function (e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function l() {
    var e = "undefined" != typeof window ? window : {};
    return i(e, n), e;
  }
  function o(e) {
    return (o = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
  }
  function d(e, t) {
    return (d =
      Object.setPrototypeOf ||
      function (e, t) {
        return (e.__proto__ = t), e;
      })(e, t);
  }
  function p() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return (
        Date.prototype.toString.call(
          Reflect.construct(Date, [], function () {})
        ),
        !0
      );
    } catch (e) {
      return !1;
    }
  }
  function u(e, t, a) {
    return (u = p()
      ? Reflect.construct
      : function (e, t, a) {
          var i = [null];
          i.push.apply(i, t);
          var s = new (Function.bind.apply(e, i))();
          return a && d(s, a.prototype), s;
        }).apply(null, arguments);
  }
  function c(e) {
    var t = "function" == typeof Map ? new Map() : void 0;
    return (c = function (e) {
      if (
        null === e ||
        ((a = e), -1 === Function.toString.call(a).indexOf("[native code]"))
      )
        return e;
      var a;
      if ("function" != typeof e)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      if (void 0 !== t) {
        if (t.has(e)) return t.get(e);
        t.set(e, i);
      }
      function i() {
        return u(e, arguments, o(this).constructor);
      }
      return (
        (i.prototype = Object.create(e.prototype, {
          constructor: {
            value: i,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
        d(i, e)
      );
    })(e);
  }
  var h = (function (e) {
    var t, a;
    function i(t) {
      var a, i, s;
      return (
        (a = e.call.apply(e, [this].concat(t)) || this),
        (i = (function (e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return e;
        })(a)),
        (s = i.__proto__),
        Object.defineProperty(i, "__proto__", {
          get: function () {
            return s;
          },
          set: function (e) {
            s.__proto__ = e;
          },
        }),
        a
      );
    }
    return (
      (a = e),
      ((t = i).prototype = Object.create(a.prototype)),
      (t.prototype.constructor = t),
      (t.__proto__ = a),
      i
    );
  })(c(Array));
  function v(e) {
    void 0 === e && (e = []);
    var t = [];
    return (
      e.forEach(function (e) {
        Array.isArray(e) ? t.push.apply(t, v(e)) : t.push(e);
      }),
      t
    );
  }
  function f(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function m(e, t) {
    var a = l(),
      i = r(),
      s = [];
    if (!t && e instanceof h) return e;
    if (!e) return new h(s);
    if ("string" == typeof e) {
      var n = e.trim();
      if (n.indexOf("<") >= 0 && n.indexOf(">") >= 0) {
        var o = "div";
        0 === n.indexOf("<li") && (o = "ul"),
          0 === n.indexOf("<tr") && (o = "tbody"),
          (0 !== n.indexOf("<td") && 0 !== n.indexOf("<th")) || (o = "tr"),
          0 === n.indexOf("<tbody") && (o = "table"),
          0 === n.indexOf("<option") && (o = "select");
        var d = i.createElement(o);
        d.innerHTML = n;
        for (var p = 0; p < d.childNodes.length; p += 1)
          s.push(d.childNodes[p]);
      } else
        s = (function (e, t) {
          if ("string" != typeof e) return [e];
          for (
            var a = [], i = t.querySelectorAll(e), s = 0;
            s < i.length;
            s += 1
          )
            a.push(i[s]);
          return a;
        })(e.trim(), t || i);
    } else if (e.nodeType || e === a || e === i) s.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof h) return e;
      s = e;
    }
    return new h(
      (function (e) {
        for (var t = [], a = 0; a < e.length; a += 1)
          -1 === t.indexOf(e[a]) && t.push(e[a]);
        return t;
      })(s)
    );
  }
  m.fn = h.prototype;
  var g,
    b,
    y,
    w = {
      addClass: function () {
        for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
          t[a] = arguments[a];
        var i = v(
          t.map(function (e) {
            return e.split(" ");
          })
        );
        return (
          this.forEach(function (e) {
            var t;
            (t = e.classList).add.apply(t, i);
          }),
          this
        );
      },
      removeClass: function () {
        for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
          t[a] = arguments[a];
        var i = v(
          t.map(function (e) {
            return e.split(" ");
          })
        );
        return (
          this.forEach(function (e) {
            var t;
            (t = e.classList).remove.apply(t, i);
          }),
          this
        );
      },
      hasClass: function () {
        for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
          t[a] = arguments[a];
        var i = v(
          t.map(function (e) {
            return e.split(" ");
          })
        );
        return (
          f(this, function (e) {
            return (
              i.filter(function (t) {
                return e.classList.contains(t);
              }).length > 0
            );
          }).length > 0
        );
      },
      toggleClass: function () {
        for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
          t[a] = arguments[a];
        var i = v(
          t.map(function (e) {
            return e.split(" ");
          })
        );
        this.forEach(function (e) {
          i.forEach(function (t) {
            e.classList.toggle(t);
          });
        });
      },
      attr: function (e, t) {
        if (1 === arguments.length && "string" == typeof e)
          return this[0] ? this[0].getAttribute(e) : void 0;
        for (var a = 0; a < this.length; a += 1)
          if (2 === arguments.length) this[a].setAttribute(e, t);
          else
            for (var i in e) (this[a][i] = e[i]), this[a].setAttribute(i, e[i]);
        return this;
      },
      removeAttr: function (e) {
        for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
        return this;
      },
      transform: function (e) {
        for (var t = 0; t < this.length; t += 1) this[t].style.transform = e;
        return this;
      },
      transition: function (e) {
        for (var t = 0; t < this.length; t += 1)
          this[t].style.transitionDuration =
            "string" != typeof e ? e + "ms" : e;
        return this;
      },
      on: function () {
        for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
          t[a] = arguments[a];
        var i = t[0],
          s = t[1],
          r = t[2],
          n = t[3];
        function l(e) {
          var t = e.target;
          if (t) {
            var a = e.target.dom7EventData || [];
            if ((a.indexOf(e) < 0 && a.unshift(e), m(t).is(s))) r.apply(t, a);
            else
              for (var i = m(t).parents(), n = 0; n < i.length; n += 1)
                m(i[n]).is(s) && r.apply(i[n], a);
          }
        }
        function o(e) {
          var t = (e && e.target && e.target.dom7EventData) || [];
          t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t);
        }
        "function" == typeof t[1] &&
          ((i = t[0]), (r = t[1]), (n = t[2]), (s = void 0)),
          n || (n = !1);
        for (var d, p = i.split(" "), u = 0; u < this.length; u += 1) {
          var c = this[u];
          if (s)
            for (d = 0; d < p.length; d += 1) {
              var h = p[d];
              c.dom7LiveListeners || (c.dom7LiveListeners = {}),
                c.dom7LiveListeners[h] || (c.dom7LiveListeners[h] = []),
                c.dom7LiveListeners[h].push({ listener: r, proxyListener: l }),
                c.addEventListener(h, l, n);
            }
          else
            for (d = 0; d < p.length; d += 1) {
              var v = p[d];
              c.dom7Listeners || (c.dom7Listeners = {}),
                c.dom7Listeners[v] || (c.dom7Listeners[v] = []),
                c.dom7Listeners[v].push({ listener: r, proxyListener: o }),
                c.addEventListener(v, o, n);
            }
        }
        return this;
      },
      off: function () {
        for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
          t[a] = arguments[a];
        var i = t[0],
          s = t[1],
          r = t[2],
          n = t[3];
        "function" == typeof t[1] &&
          ((i = t[0]), (r = t[1]), (n = t[2]), (s = void 0)),
          n || (n = !1);
        for (var l = i.split(" "), o = 0; o < l.length; o += 1)
          for (var d = l[o], p = 0; p < this.length; p += 1) {
            var u = this[p],
              c = void 0;
            if (
              (!s && u.dom7Listeners
                ? (c = u.dom7Listeners[d])
                : s && u.dom7LiveListeners && (c = u.dom7LiveListeners[d]),
              c && c.length)
            )
              for (var h = c.length - 1; h >= 0; h -= 1) {
                var v = c[h];
                (r && v.listener === r) ||
                (r &&
                  v.listener &&
                  v.listener.dom7proxy &&
                  v.listener.dom7proxy === r)
                  ? (u.removeEventListener(d, v.proxyListener, n),
                    c.splice(h, 1))
                  : r ||
                    (u.removeEventListener(d, v.proxyListener, n),
                    c.splice(h, 1));
              }
          }
        return this;
      },
      trigger: function () {
        for (
          var e = l(), t = arguments.length, a = new Array(t), i = 0;
          i < t;
          i++
        )
          a[i] = arguments[i];
        for (var s = a[0].split(" "), r = a[1], n = 0; n < s.length; n += 1)
          for (var o = s[n], d = 0; d < this.length; d += 1) {
            var p = this[d];
            if (e.CustomEvent) {
              var u = new e.CustomEvent(o, {
                detail: r,
                bubbles: !0,
                cancelable: !0,
              });
              (p.dom7EventData = a.filter(function (e, t) {
                return t > 0;
              })),
                p.dispatchEvent(u),
                (p.dom7EventData = []),
                delete p.dom7EventData;
            }
          }
        return this;
      },
      transitionEnd: function (e) {
        var t = this;
        return (
          e &&
            t.on("transitionend", function a(i) {
              i.target === this && (e.call(this, i), t.off("transitionend", a));
            }),
          this
        );
      },
      outerWidth: function (e) {
        if (this.length > 0) {
          if (e) {
            var t = this.styles();
            return (
              this[0].offsetWidth +
              parseFloat(t.getPropertyValue("margin-right")) +
              parseFloat(t.getPropertyValue("margin-left"))
            );
          }
          return this[0].offsetWidth;
        }
        return null;
      },
      outerHeight: function (e) {
        if (this.length > 0) {
          if (e) {
            var t = this.styles();
            return (
              this[0].offsetHeight +
              parseFloat(t.getPropertyValue("margin-top")) +
              parseFloat(t.getPropertyValue("margin-bottom"))
            );
          }
          return this[0].offsetHeight;
        }
        return null;
      },
      styles: function () {
        var e = l();
        return this[0] ? e.getComputedStyle(this[0], null) : {};
      },
      offset: function () {
        if (this.length > 0) {
          var e = l(),
            t = r(),
            a = this[0],
            i = a.getBoundingClientRect(),
            s = t.body,
            n = a.clientTop || s.clientTop || 0,
            o = a.clientLeft || s.clientLeft || 0,
            d = a === e ? e.scrollY : a.scrollTop,
            p = a === e ? e.scrollX : a.scrollLeft;
          return { top: i.top + d - n, left: i.left + p - o };
        }
        return null;
      },
      css: function (e, t) {
        var a,
          i = l();
        if (1 === arguments.length) {
          if ("string" != typeof e) {
            for (a = 0; a < this.length; a += 1)
              for (var s in e) this[a].style[s] = e[s];
            return this;
          }
          if (this[0])
            return i.getComputedStyle(this[0], null).getPropertyValue(e);
        }
        if (2 === arguments.length && "string" == typeof e) {
          for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
          return this;
        }
        return this;
      },
      each: function (e) {
        return e
          ? (this.forEach(function (t, a) {
              e.apply(t, [t, a]);
            }),
            this)
          : this;
      },
      html: function (e) {
        if (void 0 === e) return this[0] ? this[0].innerHTML : null;
        for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
        return this;
      },
      text: function (e) {
        if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
        for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
        return this;
      },
      is: function (e) {
        var t,
          a,
          i = l(),
          s = r(),
          n = this[0];
        if (!n || void 0 === e) return !1;
        if ("string" == typeof e) {
          if (n.matches) return n.matches(e);
          if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
          if (n.msMatchesSelector) return n.msMatchesSelector(e);
          for (t = m(e), a = 0; a < t.length; a += 1) if (t[a] === n) return !0;
          return !1;
        }
        if (e === s) return n === s;
        if (e === i) return n === i;
        if (e.nodeType || e instanceof h) {
          for (t = e.nodeType ? [e] : e, a = 0; a < t.length; a += 1)
            if (t[a] === n) return !0;
          return !1;
        }
        return !1;
      },
      index: function () {
        var e,
          t = this[0];
        if (t) {
          for (e = 0; null !== (t = t.previousSibling); )
            1 === t.nodeType && (e += 1);
          return e;
        }
      },
      eq: function (e) {
        if (void 0 === e) return this;
        var t = this.length;
        if (e > t - 1) return m([]);
        if (e < 0) {
          var a = t + e;
          return m(a < 0 ? [] : [this[a]]);
        }
        return m([this[e]]);
      },
      append: function () {
        for (var e, t = r(), a = 0; a < arguments.length; a += 1) {
          e = a < 0 || arguments.length <= a ? void 0 : arguments[a];
          for (var i = 0; i < this.length; i += 1)
            if ("string" == typeof e) {
              var s = t.createElement("div");
              for (s.innerHTML = e; s.firstChild; )
                this[i].appendChild(s.firstChild);
            } else if (e instanceof h)
              for (var n = 0; n < e.length; n += 1) this[i].appendChild(e[n]);
            else this[i].appendChild(e);
        }
        return this;
      },
      prepend: function (e) {
        var t,
          a,
          i = r();
        for (t = 0; t < this.length; t += 1)
          if ("string" == typeof e) {
            var s = i.createElement("div");
            for (s.innerHTML = e, a = s.childNodes.length - 1; a >= 0; a -= 1)
              this[t].insertBefore(s.childNodes[a], this[t].childNodes[0]);
          } else if (e instanceof h)
            for (a = 0; a < e.length; a += 1)
              this[t].insertBefore(e[a], this[t].childNodes[0]);
          else this[t].insertBefore(e, this[t].childNodes[0]);
        return this;
      },
      next: function (e) {
        return this.length > 0
          ? e
            ? this[0].nextElementSibling && m(this[0].nextElementSibling).is(e)
              ? m([this[0].nextElementSibling])
              : m([])
            : this[0].nextElementSibling
            ? m([this[0].nextElementSibling])
            : m([])
          : m([]);
      },
      nextAll: function (e) {
        var t = [],
          a = this[0];
        if (!a) return m([]);
        for (; a.nextElementSibling; ) {
          var i = a.nextElementSibling;
          e ? m(i).is(e) && t.push(i) : t.push(i), (a = i);
        }
        return m(t);
      },
      prev: function (e) {
        if (this.length > 0) {
          var t = this[0];
          return e
            ? t.previousElementSibling && m(t.previousElementSibling).is(e)
              ? m([t.previousElementSibling])
              : m([])
            : t.previousElementSibling
            ? m([t.previousElementSibling])
            : m([]);
        }
        return m([]);
      },
      prevAll: function (e) {
        var t = [],
          a = this[0];
        if (!a) return m([]);
        for (; a.previousElementSibling; ) {
          var i = a.previousElementSibling;
          e ? m(i).is(e) && t.push(i) : t.push(i), (a = i);
        }
        return m(t);
      },
      parent: function (e) {
        for (var t = [], a = 0; a < this.length; a += 1)
          null !== this[a].parentNode &&
            (e
              ? m(this[a].parentNode).is(e) && t.push(this[a].parentNode)
              : t.push(this[a].parentNode));
        return m(t);
      },
      parents: function (e) {
        for (var t = [], a = 0; a < this.length; a += 1)
          for (var i = this[a].parentNode; i; )
            e ? m(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
        return m(t);
      },
      closest: function (e) {
        var t = this;
        return void 0 === e ? m([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
      },
      find: function (e) {
        for (var t = [], a = 0; a < this.length; a += 1) {
          try {
            var i = this[a].querySelectorAll(e);
          } catch (t) {
            console.log(e);
          }
          for (var s = 0; s < i.length; s += 1) t.push(i[s]);
        }
        return m(t);
      },
      children: function (e) {
        for (var t = [], a = 0; a < this.length; a += 1)
          for (var i = this[a].children, s = 0; s < i.length; s += 1)
            (e && !m(i[s]).is(e)) || t.push(i[s]);
        return m(t);
      },
      filter: function (e) {
        return m(f(this, e));
      },
      remove: function () {
        for (var e = 0; e < this.length; e += 1)
          this[e].parentNode && this[e].parentNode.removeChild(this[e]);
        return this;
      },
    };
  function E(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function x() {
    return Date.now();
  }
  function T(e, t) {
    void 0 === t && (t = "x");
    var a,
      i,
      s,
      r = l(),
      n = (function (e) {
        var t,
          a = l();
        return (
          a.getComputedStyle && (t = a.getComputedStyle(e, null)),
          !t && e.currentStyle && (t = e.currentStyle),
          t || (t = e.style),
          t
        );
      })(e);
    return (
      r.WebKitCSSMatrix
        ? ((i = n.transform || n.webkitTransform).split(",").length > 6 &&
            (i = i
              .split(", ")
              .map(function (e) {
                return e.replace(",", ".");
              })
              .join(", ")),
          (s = new r.WebKitCSSMatrix("none" === i ? "" : i)))
        : (a = (s =
            n.MozTransform ||
            n.OTransform ||
            n.MsTransform ||
            n.msTransform ||
            n.transform ||
            n
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,"))
            .toString()
            .split(",")),
      "x" === t &&
        (i = r.WebKitCSSMatrix
          ? s.m41
          : 16 === a.length
          ? parseFloat(a[12])
          : parseFloat(a[4])),
      "y" === t &&
        (i = r.WebKitCSSMatrix
          ? s.m42
          : 16 === a.length
          ? parseFloat(a[13])
          : parseFloat(a[5])),
      i || 0
    );
  }
  function C(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function S() {
    for (
      var e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
        t = ["__proto__", "constructor", "prototype"],
        a = 1;
      a < arguments.length;
      a += 1
    ) {
      var i = a < 0 || arguments.length <= a ? void 0 : arguments[a];
      if (null != i)
        for (
          var s = Object.keys(Object(i)).filter(function (e) {
              return t.indexOf(e) < 0;
            }),
            r = 0,
            n = s.length;
          r < n;
          r += 1
        ) {
          var l = s[r],
            o = Object.getOwnPropertyDescriptor(i, l);
          void 0 !== o &&
            o.enumerable &&
            (C(e[l]) && C(i[l])
              ? i[l].__swiper__
                ? (e[l] = i[l])
                : S(e[l], i[l])
              : !C(e[l]) && C(i[l])
              ? ((e[l] = {}), i[l].__swiper__ ? (e[l] = i[l]) : S(e[l], i[l]))
              : (e[l] = i[l]));
        }
    }
    return e;
  }
  function M(e, t) {
    Object.keys(t).forEach(function (a) {
      C(t[a]) &&
        Object.keys(t[a]).forEach(function (i) {
          "function" == typeof t[a][i] && (t[a][i] = t[a][i].bind(e));
        }),
        (e[a] = t[a]);
    });
  }
  function z(e) {
    return (
      void 0 === e && (e = ""),
      "." +
        e
          .trim()
          .replace(/([\.:\/])/g, "\\$1")
          .replace(/ /g, ".")
    );
  }
  function P() {
    return (
      g ||
        (g = (function () {
          var e = l(),
            t = r();
          return {
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            pointerEvents:
              !!e.PointerEvent &&
              "maxTouchPoints" in e.navigator &&
              e.navigator.maxTouchPoints >= 0,
            observer: "MutationObserver" in e || "WebkitMutationObserver" in e,
            passiveListener: (function () {
              var t = !1;
              try {
                var a = Object.defineProperty({}, "passive", {
                  get: function () {
                    t = !0;
                  },
                });
                e.addEventListener("testPassiveListener", null, a);
              } catch (e) {}
              return t;
            })(),
            gestures: "ongesturestart" in e,
          };
        })()),
      g
    );
  }
  function k(e) {
    return (
      void 0 === e && (e = {}),
      b ||
        (b = (function (e) {
          var t = (void 0 === e ? {} : e).userAgent,
            a = P(),
            i = l(),
            s = i.navigator.platform,
            r = t || i.navigator.userAgent,
            n = { ios: !1, android: !1 },
            o = i.screen.width,
            d = i.screen.height,
            p = r.match(/(Android);?[\s\/]+([\d.]+)?/),
            u = r.match(/(iPad).*OS\s([\d_]+)/),
            c = r.match(/(iPod)(.*OS\s([\d_]+))?/),
            h = !u && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            v = "Win32" === s,
            f = "MacIntel" === s;
          return (
            !u &&
              f &&
              a.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(o + "x" + d) >= 0 &&
              ((u = r.match(/(Version)\/([\d.]+)/)) || (u = [0, 1, "13_0_0"]),
              (f = !1)),
            p && !v && ((n.os = "android"), (n.android = !0)),
            (u || h || c) && ((n.os = "ios"), (n.ios = !0)),
            n
          );
        })(e)),
      b
    );
  }
  function $() {
    return (
      y ||
        (y = (function () {
          var e,
            t = l();
          return {
            isEdge: !!t.navigator.userAgent.match(/Edge/g),
            isSafari:
              ((e = t.navigator.userAgent.toLowerCase()),
              e.indexOf("safari") >= 0 &&
                e.indexOf("chrome") < 0 &&
                e.indexOf("android") < 0),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              t.navigator.userAgent
            ),
          };
        })()),
      y
    );
  }
  Object.keys(w).forEach(function (e) {
    Object.defineProperty(m.fn, e, { value: w[e], writable: !0 });
  });
  var L = {
      name: "resize",
      create: function () {
        var e = this;
        S(e, {
          resize: {
            observer: null,
            createObserver: function () {
              e &&
                !e.destroyed &&
                e.initialized &&
                ((e.resize.observer = new ResizeObserver(function (t) {
                  var a = e.width,
                    i = e.height,
                    s = a,
                    r = i;
                  t.forEach(function (t) {
                    var a = t.contentBoxSize,
                      i = t.contentRect,
                      n = t.target;
                    (n && n !== e.el) ||
                      ((s = i ? i.width : (a[0] || a).inlineSize),
                      (r = i ? i.height : (a[0] || a).blockSize));
                  }),
                    (s === a && r === i) || e.resize.resizeHandler();
                })),
                e.resize.observer.observe(e.el));
            },
            removeObserver: function () {
              e.resize.observer &&
                e.resize.observer.unobserve &&
                e.el &&
                (e.resize.observer.unobserve(e.el), (e.resize.observer = null));
            },
            resizeHandler: function () {
              e &&
                !e.destroyed &&
                e.initialized &&
                (e.emit("beforeResize"), e.emit("resize"));
            },
            orientationChangeHandler: function () {
              e && !e.destroyed && e.initialized && e.emit("orientationchange");
            },
          },
        });
      },
      on: {
        init: function (e) {
          var t = l();
          e.params.resizeObserver && void 0 !== l().ResizeObserver
            ? e.resize.createObserver()
            : (t.addEventListener("resize", e.resize.resizeHandler),
              t.addEventListener(
                "orientationchange",
                e.resize.orientationChangeHandler
              ));
        },
        destroy: function (e) {
          var t = l();
          e.resize.removeObserver(),
            t.removeEventListener("resize", e.resize.resizeHandler),
            t.removeEventListener(
              "orientationchange",
              e.resize.orientationChangeHandler
            );
        },
      },
    },
    I = {
      attach: function (e, t) {
        void 0 === t && (t = {});
        var a = l(),
          i = this,
          s = new (a.MutationObserver || a.WebkitMutationObserver)(function (
            e
          ) {
            if (1 !== e.length) {
              var t = function () {
                i.emit("observerUpdate", e[0]);
              };
              a.requestAnimationFrame
                ? a.requestAnimationFrame(t)
                : a.setTimeout(t, 0);
            } else i.emit("observerUpdate", e[0]);
          });
        s.observe(e, {
          attributes: void 0 === t.attributes || t.attributes,
          childList: void 0 === t.childList || t.childList,
          characterData: void 0 === t.characterData || t.characterData,
        }),
          i.observer.observers.push(s);
      },
      init: function () {
        var e = this;
        if (e.support.observer && e.params.observer) {
          if (e.params.observeParents)
            for (var t = e.$el.parents(), a = 0; a < t.length; a += 1)
              e.observer.attach(t[a]);
          e.observer.attach(e.$el[0], {
            childList: e.params.observeSlideChildren,
          }),
            e.observer.attach(e.$wrapperEl[0], { attributes: !1 });
        }
      },
      destroy: function () {
        this.observer.observers.forEach(function (e) {
          e.disconnect();
        }),
          (this.observer.observers = []);
      },
    },
    O = {
      name: "observer",
      params: { observer: !1, observeParents: !1, observeSlideChildren: !1 },
      create: function () {
        M(this, { observer: t({}, I, { observers: [] }) });
      },
      on: {
        init: function (e) {
          e.observer.init();
        },
        destroy: function (e) {
          e.observer.destroy();
        },
      },
    };
  function A(e) {
    var t = this,
      a = r(),
      i = l(),
      s = t.touchEventsData,
      n = t.params,
      o = t.touches;
    if (t.enabled && (!t.animating || !n.preventInteractionOnTransition)) {
      var d = e;
      d.originalEvent && (d = d.originalEvent);
      var p = m(d.target);
      if ("wrapper" !== n.touchEventsTarget || p.closest(t.wrapperEl).length)
        if (
          ((s.isTouchEvent = "touchstart" === d.type),
          s.isTouchEvent || !("which" in d) || 3 !== d.which)
        )
          if (!(!s.isTouchEvent && "button" in d && d.button > 0))
            if (!s.isTouched || !s.isMoved)
              if (
                (!!n.noSwipingClass &&
                  "" !== n.noSwipingClass &&
                  d.target &&
                  d.target.shadowRoot &&
                  e.path &&
                  e.path[0] &&
                  (p = m(e.path[0])),
                n.noSwiping &&
                  p.closest(
                    n.noSwipingSelector
                      ? n.noSwipingSelector
                      : "." + n.noSwipingClass
                  )[0])
              )
                t.allowClick = !0;
              else if (!n.swipeHandler || p.closest(n.swipeHandler)[0]) {
                (o.currentX =
                  "touchstart" === d.type ? d.targetTouches[0].pageX : d.pageX),
                  (o.currentY =
                    "touchstart" === d.type
                      ? d.targetTouches[0].pageY
                      : d.pageY);
                var u = o.currentX,
                  c = o.currentY,
                  h = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection,
                  v = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
                if (h && (u <= v || u >= i.innerWidth - v)) {
                  if ("prevent" !== h) return;
                  e.preventDefault();
                }
                if (
                  (S(s, {
                    isTouched: !0,
                    isMoved: !1,
                    allowTouchCallbacks: !0,
                    isScrolling: void 0,
                    startMoving: void 0,
                  }),
                  (o.startX = u),
                  (o.startY = c),
                  (s.touchStartTime = x()),
                  (t.allowClick = !0),
                  t.updateSize(),
                  (t.swipeDirection = void 0),
                  n.threshold > 0 && (s.allowThresholdMove = !1),
                  "touchstart" !== d.type)
                ) {
                  var f = !0;
                  p.is(s.formElements) && (f = !1),
                    a.activeElement &&
                      m(a.activeElement).is(s.formElements) &&
                      a.activeElement !== p[0] &&
                      a.activeElement.blur();
                  var g = f && t.allowTouchMove && n.touchStartPreventDefault;
                  (!n.touchStartForcePreventDefault && !g) ||
                    p[0].isContentEditable ||
                    d.preventDefault();
                }
                t.emit("touchStart", d);
              }
    }
  }
  function D(e) {
    var t = r(),
      a = this,
      i = a.touchEventsData,
      s = a.params,
      n = a.touches,
      l = a.rtlTranslate;
    if (a.enabled) {
      var o = e;
      if ((o.originalEvent && (o = o.originalEvent), i.isTouched)) {
        if (!i.isTouchEvent || "touchmove" === o.type) {
          var d =
              "touchmove" === o.type &&
              o.targetTouches &&
              (o.targetTouches[0] || o.changedTouches[0]),
            p = "touchmove" === o.type ? d.pageX : o.pageX,
            u = "touchmove" === o.type ? d.pageY : o.pageY;
          if (o.preventedByNestedSwiper)
            return (n.startX = p), void (n.startY = u);
          if (!a.allowTouchMove)
            return (
              (a.allowClick = !1),
              void (
                i.isTouched &&
                (S(n, { startX: p, startY: u, currentX: p, currentY: u }),
                (i.touchStartTime = x()))
              )
            );
          if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
            if (a.isVertical()) {
              if (
                (u < n.startY && a.translate <= a.maxTranslate()) ||
                (u > n.startY && a.translate >= a.minTranslate())
              )
                return (i.isTouched = !1), void (i.isMoved = !1);
            } else if (
              (p < n.startX && a.translate <= a.maxTranslate()) ||
              (p > n.startX && a.translate >= a.minTranslate())
            )
              return;
          if (
            i.isTouchEvent &&
            t.activeElement &&
            o.target === t.activeElement &&
            m(o.target).is(i.formElements)
          )
            return (i.isMoved = !0), void (a.allowClick = !1);
          if (
            (i.allowTouchCallbacks && a.emit("touchMove", o),
            !(o.targetTouches && o.targetTouches.length > 1))
          ) {
            (n.currentX = p), (n.currentY = u);
            var c = n.currentX - n.startX,
              h = n.currentY - n.startY;
            if (
              !(
                a.params.threshold &&
                Math.sqrt(Math.pow(c, 2) + Math.pow(h, 2)) < a.params.threshold
              )
            ) {
              var v;
              if (void 0 === i.isScrolling)
                (a.isHorizontal() && n.currentY === n.startY) ||
                (a.isVertical() && n.currentX === n.startX)
                  ? (i.isScrolling = !1)
                  : c * c + h * h >= 25 &&
                    ((v =
                      (180 * Math.atan2(Math.abs(h), Math.abs(c))) / Math.PI),
                    (i.isScrolling = a.isHorizontal()
                      ? v > s.touchAngle
                      : 90 - v > s.touchAngle));
              if (
                (i.isScrolling && a.emit("touchMoveOpposite", o),
                void 0 === i.startMoving &&
                  ((n.currentX === n.startX && n.currentY === n.startY) ||
                    (i.startMoving = !0)),
                i.isScrolling)
              )
                i.isTouched = !1;
              else if (i.startMoving) {
                (a.allowClick = !1),
                  !s.cssMode && o.cancelable && o.preventDefault(),
                  s.touchMoveStopPropagation &&
                    !s.nested &&
                    o.stopPropagation(),
                  i.isMoved ||
                    (s.loop && a.loopFix(),
                    (i.startTranslate = a.getTranslate()),
                    a.setTransition(0),
                    a.animating &&
                      a.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
                    (i.allowMomentumBounce = !1),
                    !s.grabCursor ||
                      (!0 !== a.allowSlideNext && !0 !== a.allowSlidePrev) ||
                      a.setGrabCursor(!0),
                    a.emit("sliderFirstMove", o)),
                  a.emit("sliderMove", o),
                  (i.isMoved = !0);
                var f = a.isHorizontal() ? c : h;
                (n.diff = f),
                  (f *= s.touchRatio),
                  l && (f = -f),
                  (a.swipeDirection = f > 0 ? "prev" : "next"),
                  (i.currentTranslate = f + i.startTranslate);
                var g = !0,
                  b = s.resistanceRatio;
                if (
                  (s.touchReleaseOnEdges && (b = 0),
                  f > 0 && i.currentTranslate > a.minTranslate()
                    ? ((g = !1),
                      s.resistance &&
                        (i.currentTranslate =
                          a.minTranslate() -
                          1 +
                          Math.pow(
                            -a.minTranslate() + i.startTranslate + f,
                            b
                          )))
                    : f < 0 &&
                      i.currentTranslate < a.maxTranslate() &&
                      ((g = !1),
                      s.resistance &&
                        (i.currentTranslate =
                          a.maxTranslate() +
                          1 -
                          Math.pow(
                            a.maxTranslate() - i.startTranslate - f,
                            b
                          ))),
                  g && (o.preventedByNestedSwiper = !0),
                  !a.allowSlideNext &&
                    "next" === a.swipeDirection &&
                    i.currentTranslate < i.startTranslate &&
                    (i.currentTranslate = i.startTranslate),
                  !a.allowSlidePrev &&
                    "prev" === a.swipeDirection &&
                    i.currentTranslate > i.startTranslate &&
                    (i.currentTranslate = i.startTranslate),
                  a.allowSlidePrev ||
                    a.allowSlideNext ||
                    (i.currentTranslate = i.startTranslate),
                  s.threshold > 0)
                ) {
                  if (!(Math.abs(f) > s.threshold || i.allowThresholdMove))
                    return void (i.currentTranslate = i.startTranslate);
                  if (!i.allowThresholdMove)
                    return (
                      (i.allowThresholdMove = !0),
                      (n.startX = n.currentX),
                      (n.startY = n.currentY),
                      (i.currentTranslate = i.startTranslate),
                      void (n.diff = a.isHorizontal()
                        ? n.currentX - n.startX
                        : n.currentY - n.startY)
                    );
                }
                s.followFinger &&
                  !s.cssMode &&
                  ((s.freeMode ||
                    s.watchSlidesProgress ||
                    s.watchSlidesVisibility) &&
                    (a.updateActiveIndex(), a.updateSlidesClasses()),
                  s.freeMode &&
                    (0 === i.velocities.length &&
                      i.velocities.push({
                        position: n[a.isHorizontal() ? "startX" : "startY"],
                        time: i.touchStartTime,
                      }),
                    i.velocities.push({
                      position: n[a.isHorizontal() ? "currentX" : "currentY"],
                      time: x(),
                    })),
                  a.updateProgress(i.currentTranslate),
                  a.setTranslate(i.currentTranslate));
              }
            }
          }
        }
      } else i.startMoving && i.isScrolling && a.emit("touchMoveOpposite", o);
    }
  }
  function N(e) {
    var t = this,
      a = t.touchEventsData,
      i = t.params,
      s = t.touches,
      r = t.rtlTranslate,
      n = t.$wrapperEl,
      l = t.slidesGrid,
      o = t.snapGrid;
    if (t.enabled) {
      var d = e;
      if (
        (d.originalEvent && (d = d.originalEvent),
        a.allowTouchCallbacks && t.emit("touchEnd", d),
        (a.allowTouchCallbacks = !1),
        !a.isTouched)
      )
        return (
          a.isMoved && i.grabCursor && t.setGrabCursor(!1),
          (a.isMoved = !1),
          void (a.startMoving = !1)
        );
      i.grabCursor &&
        a.isMoved &&
        a.isTouched &&
        (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
        t.setGrabCursor(!1);
      var p,
        u = x(),
        c = u - a.touchStartTime;
      if (
        (t.allowClick &&
          (t.updateClickedSlide(d),
          t.emit("tap click", d),
          c < 300 &&
            u - a.lastClickTime < 300 &&
            t.emit("doubleTap doubleClick", d)),
        (a.lastClickTime = x()),
        E(function () {
          t.destroyed || (t.allowClick = !0);
        }),
        !a.isTouched ||
          !a.isMoved ||
          !t.swipeDirection ||
          0 === s.diff ||
          a.currentTranslate === a.startTranslate)
      )
        return (a.isTouched = !1), (a.isMoved = !1), void (a.startMoving = !1);
      if (
        ((a.isTouched = !1),
        (a.isMoved = !1),
        (a.startMoving = !1),
        (p = i.followFinger
          ? r
            ? t.translate
            : -t.translate
          : -a.currentTranslate),
        !i.cssMode)
      )
        if (i.freeMode) {
          if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
          if (p > -t.maxTranslate())
            return void (t.slides.length < o.length
              ? t.slideTo(o.length - 1)
              : t.slideTo(t.slides.length - 1));
          if (i.freeModeMomentum) {
            if (a.velocities.length > 1) {
              var h = a.velocities.pop(),
                v = a.velocities.pop(),
                f = h.position - v.position,
                m = h.time - v.time;
              (t.velocity = f / m),
                (t.velocity /= 2),
                Math.abs(t.velocity) < i.freeModeMinimumVelocity &&
                  (t.velocity = 0),
                (m > 150 || x() - h.time > 300) && (t.velocity = 0);
            } else t.velocity = 0;
            (t.velocity *= i.freeModeMomentumVelocityRatio),
              (a.velocities.length = 0);
            var g = 1e3 * i.freeModeMomentumRatio,
              b = t.velocity * g,
              y = t.translate + b;
            r && (y = -y);
            var w,
              T,
              C = !1,
              S = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio;
            if (y < t.maxTranslate())
              i.freeModeMomentumBounce
                ? (y + t.maxTranslate() < -S && (y = t.maxTranslate() - S),
                  (w = t.maxTranslate()),
                  (C = !0),
                  (a.allowMomentumBounce = !0))
                : (y = t.maxTranslate()),
                i.loop && i.centeredSlides && (T = !0);
            else if (y > t.minTranslate())
              i.freeModeMomentumBounce
                ? (y - t.minTranslate() > S && (y = t.minTranslate() + S),
                  (w = t.minTranslate()),
                  (C = !0),
                  (a.allowMomentumBounce = !0))
                : (y = t.minTranslate()),
                i.loop && i.centeredSlides && (T = !0);
            else if (i.freeModeSticky) {
              for (var M, z = 0; z < o.length; z += 1)
                if (o[z] > -y) {
                  M = z;
                  break;
                }
              y = -(y =
                Math.abs(o[M] - y) < Math.abs(o[M - 1] - y) ||
                "next" === t.swipeDirection
                  ? o[M]
                  : o[M - 1]);
            }
            if (
              (T &&
                t.once("transitionEnd", function () {
                  t.loopFix();
                }),
              0 !== t.velocity)
            ) {
              if (
                ((g = r
                  ? Math.abs((-y - t.translate) / t.velocity)
                  : Math.abs((y - t.translate) / t.velocity)),
                i.freeModeSticky)
              ) {
                var P = Math.abs((r ? -y : y) - t.translate),
                  k = t.slidesSizesGrid[t.activeIndex];
                g = P < k ? i.speed : P < 2 * k ? 1.5 * i.speed : 2.5 * i.speed;
              }
            } else if (i.freeModeSticky) return void t.slideToClosest();
            i.freeModeMomentumBounce && C
              ? (t.updateProgress(w),
                t.setTransition(g),
                t.setTranslate(y),
                t.transitionStart(!0, t.swipeDirection),
                (t.animating = !0),
                n.transitionEnd(function () {
                  t &&
                    !t.destroyed &&
                    a.allowMomentumBounce &&
                    (t.emit("momentumBounce"),
                    t.setTransition(i.speed),
                    setTimeout(function () {
                      t.setTranslate(w),
                        n.transitionEnd(function () {
                          t && !t.destroyed && t.transitionEnd();
                        });
                    }, 0));
                }))
              : t.velocity
              ? (t.updateProgress(y),
                t.setTransition(g),
                t.setTranslate(y),
                t.transitionStart(!0, t.swipeDirection),
                t.animating ||
                  ((t.animating = !0),
                  n.transitionEnd(function () {
                    t && !t.destroyed && t.transitionEnd();
                  })))
              : (t.emit("_freeModeNoMomentumRelease"), t.updateProgress(y)),
              t.updateActiveIndex(),
              t.updateSlidesClasses();
          } else {
            if (i.freeModeSticky) return void t.slideToClosest();
            i.freeMode && t.emit("_freeModeNoMomentumRelease");
          }
          (!i.freeModeMomentum || c >= i.longSwipesMs) &&
            (t.updateProgress(),
            t.updateActiveIndex(),
            t.updateSlidesClasses());
        } else {
          for (
            var $ = 0, L = t.slidesSizesGrid[0], I = 0;
            I < l.length;
            I += I < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
          ) {
            var O = I < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
            void 0 !== l[I + O]
              ? p >= l[I] && p < l[I + O] && (($ = I), (L = l[I + O] - l[I]))
              : p >= l[I] && (($ = I), (L = l[l.length - 1] - l[l.length - 2]));
          }
          var A = (p - l[$]) / L,
            D = $ < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
          if (c > i.longSwipesMs) {
            if (!i.longSwipes) return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection &&
              (A >= i.longSwipesRatio ? t.slideTo($ + D) : t.slideTo($)),
              "prev" === t.swipeDirection &&
                (A > 1 - i.longSwipesRatio ? t.slideTo($ + D) : t.slideTo($));
          } else {
            if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
            t.navigation &&
            (d.target === t.navigation.nextEl ||
              d.target === t.navigation.prevEl)
              ? d.target === t.navigation.nextEl
                ? t.slideTo($ + D)
                : t.slideTo($)
              : ("next" === t.swipeDirection && t.slideTo($ + D),
                "prev" === t.swipeDirection && t.slideTo($));
          }
        }
    }
  }
  function G() {
    var e = this,
      t = e.params,
      a = e.el;
    if (!a || 0 !== a.offsetWidth) {
      t.breakpoints && e.setBreakpoint();
      var i = e.allowSlideNext,
        s = e.allowSlidePrev,
        r = e.snapGrid;
      (e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses(),
        ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
        e.isEnd &&
        !e.isBeginning &&
        !e.params.centeredSlides
          ? e.slideTo(e.slides.length - 1, 0, !1, !0)
          : e.slideTo(e.activeIndex, 0, !1, !0),
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          e.autoplay.run(),
        (e.allowSlidePrev = s),
        (e.allowSlideNext = i),
        e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
    }
  }
  function B(e) {
    var t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function H() {
    var e = this,
      t = e.wrapperEl,
      a = e.rtlTranslate;
    if (e.enabled) {
      (e.previousTranslate = e.translate),
        e.isHorizontal()
          ? (e.translate = a
              ? t.scrollWidth - t.offsetWidth - t.scrollLeft
              : -t.scrollLeft)
          : (e.translate = -t.scrollTop),
        -0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
      var i = e.maxTranslate() - e.minTranslate();
      (0 === i ? 0 : (e.translate - e.minTranslate()) / i) !== e.progress &&
        e.updateProgress(a ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1);
    }
  }
  var X = !1;
  function Y() {}
  var R = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "container",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !1,
      nested: !1,
      enabled: !0,
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      freeMode: !1,
      freeModeMomentum: !0,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: !0,
      freeModeMomentumBounceRatio: 1,
      freeModeMomentumVelocityRatio: 1,
      freeModeSticky: !1,
      freeModeMinimumVelocity: 0.02,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: "column",
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !1,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      watchSlidesVisibility: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      loopPreventsSlide: !0,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      containerModifierClass: "swiper-container-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0,
      _emitClasses: !1,
    },
    W = {
      modular: {
        useParams: function (e) {
          var t = this;
          t.modules &&
            Object.keys(t.modules).forEach(function (a) {
              var i = t.modules[a];
              i.params && S(e, i.params);
            });
        },
        useModules: function (e) {
          void 0 === e && (e = {});
          var t = this;
          t.modules &&
            Object.keys(t.modules).forEach(function (a) {
              var i = t.modules[a],
                s = e[a] || {};
              i.on &&
                t.on &&
                Object.keys(i.on).forEach(function (e) {
                  t.on(e, i.on[e]);
                }),
                i.create && i.create.bind(t)(s);
            });
        },
      },
      eventsEmitter: {
        on: function (e, t, a) {
          var i = this;
          if ("function" != typeof t) return i;
          var s = a ? "unshift" : "push";
          return (
            e.split(" ").forEach(function (e) {
              i.eventsListeners[e] || (i.eventsListeners[e] = []),
                i.eventsListeners[e][s](t);
            }),
            i
          );
        },
        once: function (e, t, a) {
          var i = this;
          if ("function" != typeof t) return i;
          function s() {
            i.off(e, s), s.__emitterProxy && delete s.__emitterProxy;
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            t.apply(i, r);
          }
          return (s.__emitterProxy = t), i.on(e, s, a);
        },
        onAny: function (e, t) {
          var a = this;
          if ("function" != typeof e) return a;
          var i = t ? "unshift" : "push";
          return (
            a.eventsAnyListeners.indexOf(e) < 0 && a.eventsAnyListeners[i](e), a
          );
        },
        offAny: function (e) {
          var t = this;
          if (!t.eventsAnyListeners) return t;
          var a = t.eventsAnyListeners.indexOf(e);
          return a >= 0 && t.eventsAnyListeners.splice(a, 1), t;
        },
        off: function (e, t) {
          var a = this;
          return a.eventsListeners
            ? (e.split(" ").forEach(function (e) {
                void 0 === t
                  ? (a.eventsListeners[e] = [])
                  : a.eventsListeners[e] &&
                    a.eventsListeners[e].forEach(function (i, s) {
                      (i === t ||
                        (i.__emitterProxy && i.__emitterProxy === t)) &&
                        a.eventsListeners[e].splice(s, 1);
                    });
              }),
              a)
            : a;
        },
        emit: function () {
          var e,
            t,
            a,
            i = this;
          if (!i.eventsListeners) return i;
          for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)
            r[n] = arguments[n];
          "string" == typeof r[0] || Array.isArray(r[0])
            ? ((e = r[0]), (t = r.slice(1, r.length)), (a = i))
            : ((e = r[0].events), (t = r[0].data), (a = r[0].context || i)),
            t.unshift(a);
          var l = Array.isArray(e) ? e : e.split(" ");
          return (
            l.forEach(function (e) {
              i.eventsAnyListeners &&
                i.eventsAnyListeners.length &&
                i.eventsAnyListeners.forEach(function (i) {
                  i.apply(a, [e].concat(t));
                }),
                i.eventsListeners &&
                  i.eventsListeners[e] &&
                  i.eventsListeners[e].forEach(function (e) {
                    e.apply(a, t);
                  });
            }),
            i
          );
        },
      },
      update: {
        updateSize: function () {
          var e,
            t,
            a = this,
            i = a.$el;
          (e =
            void 0 !== a.params.width && null !== a.params.width
              ? a.params.width
              : i[0].clientWidth),
            (t =
              void 0 !== a.params.height && null !== a.params.height
                ? a.params.height
                : i[0].clientHeight),
            (0 === e && a.isHorizontal()) ||
              (0 === t && a.isVertical()) ||
              ((e =
                e -
                parseInt(i.css("padding-left") || 0, 10) -
                parseInt(i.css("padding-right") || 0, 10)),
              (t =
                t -
                parseInt(i.css("padding-top") || 0, 10) -
                parseInt(i.css("padding-bottom") || 0, 10)),
              Number.isNaN(e) && (e = 0),
              Number.isNaN(t) && (t = 0),
              S(a, { width: e, height: t, size: a.isHorizontal() ? e : t }));
        },
        updateSlides: function () {
          var e = this;
          function t(t) {
            return e.isHorizontal()
              ? t
              : {
                  width: "height",
                  "margin-top": "margin-left",
                  "margin-bottom ": "margin-right",
                  "margin-left": "margin-top",
                  "margin-right": "margin-bottom",
                  "padding-left": "padding-top",
                  "padding-right": "padding-bottom",
                  marginRight: "marginBottom",
                }[t];
          }
          function a(e, a) {
            return parseFloat(e.getPropertyValue(t(a)) || 0);
          }
          var i = e.params,
            s = e.$wrapperEl,
            r = e.size,
            n = e.rtlTranslate,
            l = e.wrongRTL,
            o = e.virtual && i.virtual.enabled,
            d = o ? e.virtual.slides.length : e.slides.length,
            p = s.children("." + e.params.slideClass),
            u = o ? e.virtual.slides.length : p.length,
            c = [],
            h = [],
            v = [],
            f = i.slidesOffsetBefore;
          "function" == typeof f && (f = i.slidesOffsetBefore.call(e));
          var m = i.slidesOffsetAfter;
          "function" == typeof m && (m = i.slidesOffsetAfter.call(e));
          var g = e.snapGrid.length,
            b = e.slidesGrid.length,
            y = i.spaceBetween,
            w = -f,
            E = 0,
            x = 0;
          if (void 0 !== r) {
            var T, C;
            "string" == typeof y &&
              y.indexOf("%") >= 0 &&
              (y = (parseFloat(y.replace("%", "")) / 100) * r),
              (e.virtualSize = -y),
              n
                ? p.css({ marginLeft: "", marginTop: "" })
                : p.css({ marginRight: "", marginBottom: "" }),
              i.slidesPerColumn > 1 &&
                ((T =
                  Math.floor(u / i.slidesPerColumn) ===
                  u / e.params.slidesPerColumn
                    ? u
                    : Math.ceil(u / i.slidesPerColumn) * i.slidesPerColumn),
                "auto" !== i.slidesPerView &&
                  "row" === i.slidesPerColumnFill &&
                  (T = Math.max(T, i.slidesPerView * i.slidesPerColumn)));
            for (
              var M,
                z,
                P,
                k = i.slidesPerColumn,
                $ = T / k,
                L = Math.floor(u / i.slidesPerColumn),
                I = 0;
              I < u;
              I += 1
            ) {
              C = 0;
              var O = p.eq(I);
              if (i.slidesPerColumn > 1) {
                var A = void 0,
                  D = void 0,
                  N = void 0;
                if ("row" === i.slidesPerColumnFill && i.slidesPerGroup > 1) {
                  var G = Math.floor(
                      I / (i.slidesPerGroup * i.slidesPerColumn)
                    ),
                    B = I - i.slidesPerColumn * i.slidesPerGroup * G,
                    H =
                      0 === G
                        ? i.slidesPerGroup
                        : Math.min(
                            Math.ceil((u - G * k * i.slidesPerGroup) / k),
                            i.slidesPerGroup
                          );
                  (A =
                    (D =
                      B - (N = Math.floor(B / H)) * H + G * i.slidesPerGroup) +
                    (N * T) / k),
                    O.css({
                      "-webkit-box-ordinal-group": A,
                      "-moz-box-ordinal-group": A,
                      "-ms-flex-order": A,
                      "-webkit-order": A,
                      order: A,
                    });
                } else
                  "column" === i.slidesPerColumnFill
                    ? ((N = I - (D = Math.floor(I / k)) * k),
                      (D > L || (D === L && N === k - 1)) &&
                        (N += 1) >= k &&
                        ((N = 0), (D += 1)))
                    : (D = I - (N = Math.floor(I / $)) * $);
                O.css(
                  t("margin-top"),
                  0 !== N && i.spaceBetween && i.spaceBetween + "px"
                );
              }
              if ("none" !== O.css("display")) {
                if ("auto" === i.slidesPerView) {
                  var X = getComputedStyle(O[0]),
                    Y = O[0].style.transform,
                    R = O[0].style.webkitTransform;
                  if (
                    (Y && (O[0].style.transform = "none"),
                    R && (O[0].style.webkitTransform = "none"),
                    i.roundLengths)
                  )
                    C = e.isHorizontal() ? O.outerWidth(!0) : O.outerHeight(!0);
                  else {
                    var W = a(X, "width"),
                      V = a(X, "padding-left"),
                      F = a(X, "padding-right"),
                      _ = a(X, "margin-left"),
                      q = a(X, "margin-right"),
                      j = X.getPropertyValue("box-sizing");
                    if (j && "border-box" === j) C = W + _ + q;
                    else {
                      var U = O[0],
                        K = U.clientWidth;
                      C = W + V + F + _ + q + (U.offsetWidth - K);
                    }
                  }
                  Y && (O[0].style.transform = Y),
                    R && (O[0].style.webkitTransform = R),
                    i.roundLengths && (C = Math.floor(C));
                } else
                  (C = (r - (i.slidesPerView - 1) * y) / i.slidesPerView),
                    i.roundLengths && (C = Math.floor(C)),
                    p[I] && (p[I].style[t("width")] = C + "px");
                p[I] && (p[I].swiperSlideSize = C),
                  v.push(C),
                  i.centeredSlides
                    ? ((w = w + C / 2 + E / 2 + y),
                      0 === E && 0 !== I && (w = w - r / 2 - y),
                      0 === I && (w = w - r / 2 - y),
                      Math.abs(w) < 0.001 && (w = 0),
                      i.roundLengths && (w = Math.floor(w)),
                      x % i.slidesPerGroup == 0 && c.push(w),
                      h.push(w))
                    : (i.roundLengths && (w = Math.floor(w)),
                      (x - Math.min(e.params.slidesPerGroupSkip, x)) %
                        e.params.slidesPerGroup ==
                        0 && c.push(w),
                      h.push(w),
                      (w = w + C + y)),
                  (e.virtualSize += C + y),
                  (E = C),
                  (x += 1);
              }
            }
            if (
              ((e.virtualSize = Math.max(e.virtualSize, r) + m),
              n &&
                l &&
                ("slide" === i.effect || "coverflow" === i.effect) &&
                s.css({ width: e.virtualSize + i.spaceBetween + "px" }),
              i.setWrapperSize)
            )
              s.css(
                (((z = {})[t("width")] = e.virtualSize + i.spaceBetween + "px"),
                z)
              );
            if (i.slidesPerColumn > 1)
              if (
                ((e.virtualSize = (C + i.spaceBetween) * T),
                (e.virtualSize =
                  Math.ceil(e.virtualSize / i.slidesPerColumn) -
                  i.spaceBetween),
                s.css(
                  (((P = {})[t("width")] =
                    e.virtualSize + i.spaceBetween + "px"),
                  P)
                ),
                i.centeredSlides)
              ) {
                M = [];
                for (var Z = 0; Z < c.length; Z += 1) {
                  var J = c[Z];
                  i.roundLengths && (J = Math.floor(J)),
                    c[Z] < e.virtualSize + c[0] && M.push(J);
                }
                c = M;
              }
            if (!i.centeredSlides) {
              M = [];
              for (var Q = 0; Q < c.length; Q += 1) {
                var ee = c[Q];
                i.roundLengths && (ee = Math.floor(ee)),
                  c[Q] <= e.virtualSize - r && M.push(ee);
              }
              (c = M),
                Math.floor(e.virtualSize - r) - Math.floor(c[c.length - 1]) >
                  1 && c.push(e.virtualSize - r);
            }
            if ((0 === c.length && (c = [0]), 0 !== i.spaceBetween)) {
              var te,
                ae = e.isHorizontal() && n ? "marginLeft" : t("marginRight");
              p.filter(function (e, t) {
                return !i.cssMode || t !== p.length - 1;
              }).css((((te = {})[ae] = y + "px"), te));
            }
            if (i.centeredSlides && i.centeredSlidesBounds) {
              var ie = 0;
              v.forEach(function (e) {
                ie += e + (i.spaceBetween ? i.spaceBetween : 0);
              });
              var se = (ie -= i.spaceBetween) - r;
              c = c.map(function (e) {
                return e < 0 ? -f : e > se ? se + m : e;
              });
            }
            if (i.centerInsufficientSlides) {
              var re = 0;
              if (
                (v.forEach(function (e) {
                  re += e + (i.spaceBetween ? i.spaceBetween : 0);
                }),
                (re -= i.spaceBetween) < r)
              ) {
                var ne = (r - re) / 2;
                c.forEach(function (e, t) {
                  c[t] = e - ne;
                }),
                  h.forEach(function (e, t) {
                    h[t] = e + ne;
                  });
              }
            }
            S(e, { slides: p, snapGrid: c, slidesGrid: h, slidesSizesGrid: v }),
              u !== d && e.emit("slidesLengthChange"),
              c.length !== g &&
                (e.params.watchOverflow && e.checkOverflow(),
                e.emit("snapGridLengthChange")),
              h.length !== b && e.emit("slidesGridLengthChange"),
              (i.watchSlidesProgress || i.watchSlidesVisibility) &&
                e.updateSlidesOffset();
          }
        },
        updateAutoHeight: function (e) {
          var t,
            a = this,
            i = [],
            s = a.virtual && a.params.virtual.enabled,
            r = 0;
          "number" == typeof e
            ? a.setTransition(e)
            : !0 === e && a.setTransition(a.params.speed);
          var n = function (e) {
            return s
              ? a.slides.filter(function (t) {
                  return (
                    parseInt(t.getAttribute("data-swiper-slide-index"), 10) ===
                    e
                  );
                })[0]
              : a.slides.eq(e)[0];
          };
          if ("auto" !== a.params.slidesPerView && a.params.slidesPerView > 1)
            if (a.params.centeredSlides)
              a.visibleSlides.each(function (e) {
                i.push(e);
              });
            else
              for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
                var l = a.activeIndex + t;
                if (l > a.slides.length && !s) break;
                i.push(n(l));
              }
          else i.push(n(a.activeIndex));
          for (t = 0; t < i.length; t += 1)
            if (void 0 !== i[t]) {
              var o = i[t].offsetHeight;
              r = o > r ? o : r;
            }
          r && a.$wrapperEl.css("height", r + "px");
        },
        updateSlidesOffset: function () {
          for (var e = this.slides, t = 0; t < e.length; t += 1)
            e[t].swiperSlideOffset = this.isHorizontal()
              ? e[t].offsetLeft
              : e[t].offsetTop;
        },
        updateSlidesProgress: function (e) {
          void 0 === e && (e = (this && this.translate) || 0);
          var t = this,
            a = t.params,
            i = t.slides,
            s = t.rtlTranslate;
          if (0 !== i.length) {
            void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
            var r = -e;
            s && (r = e),
              i.removeClass(a.slideVisibleClass),
              (t.visibleSlidesIndexes = []),
              (t.visibleSlides = []);
            for (var n = 0; n < i.length; n += 1) {
              var l = i[n],
                o =
                  (r +
                    (a.centeredSlides ? t.minTranslate() : 0) -
                    l.swiperSlideOffset) /
                  (l.swiperSlideSize + a.spaceBetween);
              if (
                a.watchSlidesVisibility ||
                (a.centeredSlides && a.autoHeight)
              ) {
                var d = -(r - l.swiperSlideOffset),
                  p = d + t.slidesSizesGrid[n];
                ((d >= 0 && d < t.size - 1) ||
                  (p > 1 && p <= t.size) ||
                  (d <= 0 && p >= t.size)) &&
                  (t.visibleSlides.push(l),
                  t.visibleSlidesIndexes.push(n),
                  i.eq(n).addClass(a.slideVisibleClass));
              }
              l.progress = s ? -o : o;
            }
            t.visibleSlides = m(t.visibleSlides);
          }
        },
        updateProgress: function (e) {
          var t = this;
          if (void 0 === e) {
            var a = t.rtlTranslate ? -1 : 1;
            e = (t && t.translate && t.translate * a) || 0;
          }
          var i = t.params,
            s = t.maxTranslate() - t.minTranslate(),
            r = t.progress,
            n = t.isBeginning,
            l = t.isEnd,
            o = n,
            d = l;
          0 === s
            ? ((r = 0), (n = !0), (l = !0))
            : ((n = (r = (e - t.minTranslate()) / s) <= 0), (l = r >= 1)),
            S(t, { progress: r, isBeginning: n, isEnd: l }),
            (i.watchSlidesProgress ||
              i.watchSlidesVisibility ||
              (i.centeredSlides && i.autoHeight)) &&
              t.updateSlidesProgress(e),
            n && !o && t.emit("reachBeginning toEdge"),
            l && !d && t.emit("reachEnd toEdge"),
            ((o && !n) || (d && !l)) && t.emit("fromEdge"),
            t.emit("progress", r);
        },
        updateSlidesClasses: function () {
          var e,
            t = this,
            a = t.slides,
            i = t.params,
            s = t.$wrapperEl,
            r = t.activeIndex,
            n = t.realIndex,
            l = t.virtual && i.virtual.enabled;
          a.removeClass(
            i.slideActiveClass +
              " " +
              i.slideNextClass +
              " " +
              i.slidePrevClass +
              " " +
              i.slideDuplicateActiveClass +
              " " +
              i.slideDuplicateNextClass +
              " " +
              i.slideDuplicatePrevClass
          ),
            (e = l
              ? t.$wrapperEl.find(
                  "." + i.slideClass + '[data-swiper-slide-index="' + r + '"]'
                )
              : a.eq(r)).addClass(i.slideActiveClass),
            i.loop &&
              (e.hasClass(i.slideDuplicateClass)
                ? s
                    .children(
                      "." +
                        i.slideClass +
                        ":not(." +
                        i.slideDuplicateClass +
                        ')[data-swiper-slide-index="' +
                        n +
                        '"]'
                    )
                    .addClass(i.slideDuplicateActiveClass)
                : s
                    .children(
                      "." +
                        i.slideClass +
                        "." +
                        i.slideDuplicateClass +
                        '[data-swiper-slide-index="' +
                        n +
                        '"]'
                    )
                    .addClass(i.slideDuplicateActiveClass));
          var o = e
            .nextAll("." + i.slideClass)
            .eq(0)
            .addClass(i.slideNextClass);
          i.loop && 0 === o.length && (o = a.eq(0)).addClass(i.slideNextClass);
          var d = e
            .prevAll("." + i.slideClass)
            .eq(0)
            .addClass(i.slidePrevClass);
          i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass),
            i.loop &&
              (o.hasClass(i.slideDuplicateClass)
                ? s
                    .children(
                      "." +
                        i.slideClass +
                        ":not(." +
                        i.slideDuplicateClass +
                        ')[data-swiper-slide-index="' +
                        o.attr("data-swiper-slide-index") +
                        '"]'
                    )
                    .addClass(i.slideDuplicateNextClass)
                : s
                    .children(
                      "." +
                        i.slideClass +
                        "." +
                        i.slideDuplicateClass +
                        '[data-swiper-slide-index="' +
                        o.attr("data-swiper-slide-index") +
                        '"]'
                    )
                    .addClass(i.slideDuplicateNextClass),
              d.hasClass(i.slideDuplicateClass)
                ? s
                    .children(
                      "." +
                        i.slideClass +
                        ":not(." +
                        i.slideDuplicateClass +
                        ')[data-swiper-slide-index="' +
                        d.attr("data-swiper-slide-index") +
                        '"]'
                    )
                    .addClass(i.slideDuplicatePrevClass)
                : s
                    .children(
                      "." +
                        i.slideClass +
                        "." +
                        i.slideDuplicateClass +
                        '[data-swiper-slide-index="' +
                        d.attr("data-swiper-slide-index") +
                        '"]'
                    )
                    .addClass(i.slideDuplicatePrevClass)),
            t.emitSlidesClasses();
        },
        updateActiveIndex: function (e) {
          var t,
            a = this,
            i = a.rtlTranslate ? a.translate : -a.translate,
            s = a.slidesGrid,
            r = a.snapGrid,
            n = a.params,
            l = a.activeIndex,
            o = a.realIndex,
            d = a.snapIndex,
            p = e;
          if (void 0 === p) {
            for (var u = 0; u < s.length; u += 1)
              void 0 !== s[u + 1]
                ? i >= s[u] && i < s[u + 1] - (s[u + 1] - s[u]) / 2
                  ? (p = u)
                  : i >= s[u] && i < s[u + 1] && (p = u + 1)
                : i >= s[u] && (p = u);
            n.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0);
          }
          if (r.indexOf(i) >= 0) t = r.indexOf(i);
          else {
            var c = Math.min(n.slidesPerGroupSkip, p);
            t = c + Math.floor((p - c) / n.slidesPerGroup);
          }
          if ((t >= r.length && (t = r.length - 1), p !== l)) {
            var h = parseInt(
              a.slides.eq(p).attr("data-swiper-slide-index") || p,
              10
            );
            S(a, {
              snapIndex: t,
              realIndex: h,
              previousIndex: l,
              activeIndex: p,
            }),
              a.emit("activeIndexChange"),
              a.emit("snapIndexChange"),
              o !== h && a.emit("realIndexChange"),
              (a.initialized || a.params.runCallbacksOnInit) &&
                a.emit("slideChange");
          } else t !== d && ((a.snapIndex = t), a.emit("snapIndexChange"));
        },
        updateClickedSlide: function (e) {
          var t,
            a = this,
            i = a.params,
            s = m(e.target).closest("." + i.slideClass)[0],
            r = !1;
          if (s)
            for (var n = 0; n < a.slides.length; n += 1)
              if (a.slides[n] === s) {
                (r = !0), (t = n);
                break;
              }
          if (!s || !r)
            return (a.clickedSlide = void 0), void (a.clickedIndex = void 0);
          (a.clickedSlide = s),
            a.virtual && a.params.virtual.enabled
              ? (a.clickedIndex = parseInt(
                  m(s).attr("data-swiper-slide-index"),
                  10
                ))
              : (a.clickedIndex = t),
            i.slideToClickedSlide &&
              void 0 !== a.clickedIndex &&
              a.clickedIndex !== a.activeIndex &&
              a.slideToClickedSlide();
        },
      },
      translate: {
        getTranslate: function (e) {
          void 0 === e && (e = this.isHorizontal() ? "x" : "y");
          var t = this,
            a = t.params,
            i = t.rtlTranslate,
            s = t.translate,
            r = t.$wrapperEl;
          if (a.virtualTranslate) return i ? -s : s;
          if (a.cssMode) return s;
          var n = T(r[0], e);
          return i && (n = -n), n || 0;
        },
        setTranslate: function (e, t) {
          var a = this,
            i = a.rtlTranslate,
            s = a.params,
            r = a.$wrapperEl,
            n = a.wrapperEl,
            l = a.progress,
            o = 0,
            d = 0;
          a.isHorizontal() ? (o = i ? -e : e) : (d = e),
            s.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
            s.cssMode
              ? (n[a.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                  a.isHorizontal() ? -o : -d)
              : s.virtualTranslate ||
                r.transform("translate3d(" + o + "px, " + d + "px, 0px)"),
            (a.previousTranslate = a.translate),
            (a.translate = a.isHorizontal() ? o : d);
          var p = a.maxTranslate() - a.minTranslate();
          (0 === p ? 0 : (e - a.minTranslate()) / p) !== l &&
            a.updateProgress(e),
            a.emit("setTranslate", a.translate, t);
        },
        minTranslate: function () {
          return -this.snapGrid[0];
        },
        maxTranslate: function () {
          return -this.snapGrid[this.snapGrid.length - 1];
        },
        translateTo: function (e, t, a, i, s) {
          void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === a && (a = !0),
            void 0 === i && (i = !0);
          var r = this,
            n = r.params,
            l = r.wrapperEl;
          if (r.animating && n.preventInteractionOnTransition) return !1;
          var o,
            d = r.minTranslate(),
            p = r.maxTranslate();
          if (
            ((o = i && e > d ? d : i && e < p ? p : e),
            r.updateProgress(o),
            n.cssMode)
          ) {
            var u,
              c = r.isHorizontal();
            if (0 === t) l[c ? "scrollLeft" : "scrollTop"] = -o;
            else if (l.scrollTo)
              l.scrollTo(
                (((u = {})[c ? "left" : "top"] = -o),
                (u.behavior = "smooth"),
                u)
              );
            else l[c ? "scrollLeft" : "scrollTop"] = -o;
            return !0;
          }
          return (
            0 === t
              ? (r.setTransition(0),
                r.setTranslate(o),
                a &&
                  (r.emit("beforeTransitionStart", t, s),
                  r.emit("transitionEnd")))
              : (r.setTransition(t),
                r.setTranslate(o),
                a &&
                  (r.emit("beforeTransitionStart", t, s),
                  r.emit("transitionStart")),
                r.animating ||
                  ((r.animating = !0),
                  r.onTranslateToWrapperTransitionEnd ||
                    (r.onTranslateToWrapperTransitionEnd = function (e) {
                      r &&
                        !r.destroyed &&
                        e.target === this &&
                        (r.$wrapperEl[0].removeEventListener(
                          "transitionend",
                          r.onTranslateToWrapperTransitionEnd
                        ),
                        r.$wrapperEl[0].removeEventListener(
                          "webkitTransitionEnd",
                          r.onTranslateToWrapperTransitionEnd
                        ),
                        (r.onTranslateToWrapperTransitionEnd = null),
                        delete r.onTranslateToWrapperTransitionEnd,
                        a && r.emit("transitionEnd"));
                    }),
                  r.$wrapperEl[0].addEventListener(
                    "transitionend",
                    r.onTranslateToWrapperTransitionEnd
                  ),
                  r.$wrapperEl[0].addEventListener(
                    "webkitTransitionEnd",
                    r.onTranslateToWrapperTransitionEnd
                  ))),
            !0
          );
        },
      },
      transition: {
        setTransition: function (e, t) {
          var a = this;
          a.params.cssMode || a.$wrapperEl.transition(e),
            a.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          var a = this,
            i = a.activeIndex,
            s = a.params,
            r = a.previousIndex;
          if (!s.cssMode) {
            s.autoHeight && a.updateAutoHeight();
            var n = t;
            if (
              (n || (n = i > r ? "next" : i < r ? "prev" : "reset"),
              a.emit("transitionStart"),
              e && i !== r)
            ) {
              if ("reset" === n)
                return void a.emit("slideResetTransitionStart");
              a.emit("slideChangeTransitionStart"),
                "next" === n
                  ? a.emit("slideNextTransitionStart")
                  : a.emit("slidePrevTransitionStart");
            }
          }
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          var a = this,
            i = a.activeIndex,
            s = a.previousIndex,
            r = a.params;
          if (((a.animating = !1), !r.cssMode)) {
            a.setTransition(0);
            var n = t;
            if (
              (n || (n = i > s ? "next" : i < s ? "prev" : "reset"),
              a.emit("transitionEnd"),
              e && i !== s)
            ) {
              if ("reset" === n) return void a.emit("slideResetTransitionEnd");
              a.emit("slideChangeTransitionEnd"),
                "next" === n
                  ? a.emit("slideNextTransitionEnd")
                  : a.emit("slidePrevTransitionEnd");
            }
          }
        },
      },
      slide: {
        slideTo: function (e, t, a, i, s) {
          if (
            (void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === a && (a = !0),
            "number" != typeof e && "string" != typeof e)
          )
            throw new Error(
              "The 'index' argument cannot have type other than 'number' or 'string'. [" +
                typeof e +
                "] given."
            );
          if ("string" == typeof e) {
            var r = parseInt(e, 10);
            if (!isFinite(r))
              throw new Error(
                "The passed-in 'index' (string) couldn't be converted to 'number'. [" +
                  e +
                  "] given."
              );
            e = r;
          }
          var n = this,
            l = e;
          l < 0 && (l = 0);
          var o = n.params,
            d = n.snapGrid,
            p = n.slidesGrid,
            u = n.previousIndex,
            c = n.activeIndex,
            h = n.rtlTranslate,
            v = n.wrapperEl,
            f = n.enabled;
          if (
            (n.animating && o.preventInteractionOnTransition) ||
            (!f && !i && !s)
          )
            return !1;
          var m = Math.min(n.params.slidesPerGroupSkip, l),
            g = m + Math.floor((l - m) / n.params.slidesPerGroup);
          g >= d.length && (g = d.length - 1),
            (c || o.initialSlide || 0) === (u || 0) &&
              a &&
              n.emit("beforeSlideChangeStart");
          var b,
            y = -d[g];
          if ((n.updateProgress(y), o.normalizeSlideIndex))
            for (var w = 0; w < p.length; w += 1) {
              var E = -Math.floor(100 * y),
                x = Math.floor(100 * p[w]),
                T = Math.floor(100 * p[w + 1]);
              void 0 !== p[w + 1]
                ? E >= x && E < T - (T - x) / 2
                  ? (l = w)
                  : E >= x && E < T && (l = w + 1)
                : E >= x && (l = w);
            }
          if (n.initialized && l !== c) {
            if (!n.allowSlideNext && y < n.translate && y < n.minTranslate())
              return !1;
            if (
              !n.allowSlidePrev &&
              y > n.translate &&
              y > n.maxTranslate() &&
              (c || 0) !== l
            )
              return !1;
          }
          if (
            ((b = l > c ? "next" : l < c ? "prev" : "reset"),
            (h && -y === n.translate) || (!h && y === n.translate))
          )
            return (
              n.updateActiveIndex(l),
              o.autoHeight && n.updateAutoHeight(),
              n.updateSlidesClasses(),
              "slide" !== o.effect && n.setTranslate(y),
              "reset" !== b && (n.transitionStart(a, b), n.transitionEnd(a, b)),
              !1
            );
          if (o.cssMode) {
            var C,
              S = n.isHorizontal(),
              M = -y;
            if ((h && (M = v.scrollWidth - v.offsetWidth - M), 0 === t))
              v[S ? "scrollLeft" : "scrollTop"] = M;
            else if (v.scrollTo)
              v.scrollTo(
                (((C = {})[S ? "left" : "top"] = M), (C.behavior = "smooth"), C)
              );
            else v[S ? "scrollLeft" : "scrollTop"] = M;
            return !0;
          }
          return (
            0 === t
              ? (n.setTransition(0),
                n.setTranslate(y),
                n.updateActiveIndex(l),
                n.updateSlidesClasses(),
                n.emit("beforeTransitionStart", t, i),
                n.transitionStart(a, b),
                n.transitionEnd(a, b))
              : (n.setTransition(t),
                n.setTranslate(y),
                n.updateActiveIndex(l),
                n.updateSlidesClasses(),
                n.emit("beforeTransitionStart", t, i),
                n.transitionStart(a, b),
                n.animating ||
                  ((n.animating = !0),
                  n.onSlideToWrapperTransitionEnd ||
                    (n.onSlideToWrapperTransitionEnd = function (e) {
                      n &&
                        !n.destroyed &&
                        e.target === this &&
                        (n.$wrapperEl[0].removeEventListener(
                          "transitionend",
                          n.onSlideToWrapperTransitionEnd
                        ),
                        n.$wrapperEl[0].removeEventListener(
                          "webkitTransitionEnd",
                          n.onSlideToWrapperTransitionEnd
                        ),
                        (n.onSlideToWrapperTransitionEnd = null),
                        delete n.onSlideToWrapperTransitionEnd,
                        n.transitionEnd(a, b));
                    }),
                  n.$wrapperEl[0].addEventListener(
                    "transitionend",
                    n.onSlideToWrapperTransitionEnd
                  ),
                  n.$wrapperEl[0].addEventListener(
                    "webkitTransitionEnd",
                    n.onSlideToWrapperTransitionEnd
                  ))),
            !0
          );
        },
        slideToLoop: function (e, t, a, i) {
          void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === a && (a = !0);
          var s = this,
            r = e;
          return s.params.loop && (r += s.loopedSlides), s.slideTo(r, t, a, i);
        },
        slideNext: function (e, t, a) {
          void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
          var i = this,
            s = i.params,
            r = i.animating;
          if (!i.enabled) return i;
          var n = i.activeIndex < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup;
          if (s.loop) {
            if (r && s.loopPreventsSlide) return !1;
            i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
          }
          return i.slideTo(i.activeIndex + n, e, t, a);
        },
        slidePrev: function (e, t, a) {
          void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
          var i = this,
            s = i.params,
            r = i.animating,
            n = i.snapGrid,
            l = i.slidesGrid,
            o = i.rtlTranslate;
          if (!i.enabled) return i;
          if (s.loop) {
            if (r && s.loopPreventsSlide) return !1;
            i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
          }
          function d(e) {
            return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
          }
          var p = d(o ? i.translate : -i.translate),
            u = n.map(function (e) {
              return d(e);
            });
          n[u.indexOf(p)];
          var c,
            h = n[u.indexOf(p) - 1];
          return (
            void 0 === h &&
              s.cssMode &&
              n.forEach(function (e) {
                !h && p >= e && (h = e);
              }),
            void 0 !== h && (c = l.indexOf(h)) < 0 && (c = i.activeIndex - 1),
            i.slideTo(c, e, t, a)
          );
        },
        slideReset: function (e, t, a) {
          return (
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            this.slideTo(this.activeIndex, e, t, a)
          );
        },
        slideToClosest: function (e, t, a, i) {
          void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            void 0 === i && (i = 0.5);
          var s = this,
            r = s.activeIndex,
            n = Math.min(s.params.slidesPerGroupSkip, r),
            l = n + Math.floor((r - n) / s.params.slidesPerGroup),
            o = s.rtlTranslate ? s.translate : -s.translate;
          if (o >= s.snapGrid[l]) {
            var d = s.snapGrid[l];
            o - d > (s.snapGrid[l + 1] - d) * i &&
              (r += s.params.slidesPerGroup);
          } else {
            var p = s.snapGrid[l - 1];
            o - p <= (s.snapGrid[l] - p) * i && (r -= s.params.slidesPerGroup);
          }
          return (
            (r = Math.max(r, 0)),
            (r = Math.min(r, s.slidesGrid.length - 1)),
            s.slideTo(r, e, t, a)
          );
        },
        slideToClickedSlide: function () {
          var e,
            t = this,
            a = t.params,
            i = t.$wrapperEl,
            s =
              "auto" === a.slidesPerView
                ? t.slidesPerViewDynamic()
                : a.slidesPerView,
            r = t.clickedIndex;
          if (a.loop) {
            if (t.animating) return;
            (e = parseInt(
              m(t.clickedSlide).attr("data-swiper-slide-index"),
              10
            )),
              a.centeredSlides
                ? r < t.loopedSlides - s / 2 ||
                  r > t.slides.length - t.loopedSlides + s / 2
                  ? (t.loopFix(),
                    (r = i
                      .children(
                        "." +
                          a.slideClass +
                          '[data-swiper-slide-index="' +
                          e +
                          '"]:not(.' +
                          a.slideDuplicateClass +
                          ")"
                      )
                      .eq(0)
                      .index()),
                    E(function () {
                      t.slideTo(r);
                    }))
                  : t.slideTo(r)
                : r > t.slides.length - s
                ? (t.loopFix(),
                  (r = i
                    .children(
                      "." +
                        a.slideClass +
                        '[data-swiper-slide-index="' +
                        e +
                        '"]:not(.' +
                        a.slideDuplicateClass +
                        ")"
                    )
                    .eq(0)
                    .index()),
                  E(function () {
                    t.slideTo(r);
                  }))
                : t.slideTo(r);
          } else t.slideTo(r);
        },
      },
      loop: {
        loopCreate: function () {
          var e = this,
            t = r(),
            a = e.params,
            i = e.$wrapperEl;
          i.children("." + a.slideClass + "." + a.slideDuplicateClass).remove();
          var s = i.children("." + a.slideClass);
          if (a.loopFillGroupWithBlank) {
            var n = a.slidesPerGroup - (s.length % a.slidesPerGroup);
            if (n !== a.slidesPerGroup) {
              for (var l = 0; l < n; l += 1) {
                var o = m(t.createElement("div")).addClass(
                  a.slideClass + " " + a.slideBlankClass
                );
                i.append(o);
              }
              s = i.children("." + a.slideClass);
            }
          }
          "auto" !== a.slidesPerView ||
            a.loopedSlides ||
            (a.loopedSlides = s.length),
            (e.loopedSlides = Math.ceil(
              parseFloat(a.loopedSlides || a.slidesPerView, 10)
            )),
            (e.loopedSlides += a.loopAdditionalSlides),
            e.loopedSlides > s.length && (e.loopedSlides = s.length);
          var d = [],
            p = [];
          s.each(function (t, a) {
            var i = m(t);
            a < e.loopedSlides && p.push(t),
              a < s.length && a >= s.length - e.loopedSlides && d.push(t),
              i.attr("data-swiper-slide-index", a);
          });
          for (var u = 0; u < p.length; u += 1)
            i.append(m(p[u].cloneNode(!0)).addClass(a.slideDuplicateClass));
          for (var c = d.length - 1; c >= 0; c -= 1)
            i.prepend(m(d[c].cloneNode(!0)).addClass(a.slideDuplicateClass));
        },
        loopFix: function () {
          var e = this;
          e.emit("beforeLoopFix");
          var t,
            a = e.activeIndex,
            i = e.slides,
            s = e.loopedSlides,
            r = e.allowSlidePrev,
            n = e.allowSlideNext,
            l = e.snapGrid,
            o = e.rtlTranslate;
          (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
          var d = -l[a] - e.getTranslate();
          if (a < s)
            (t = i.length - 3 * s + a),
              (t += s),
              e.slideTo(t, 0, !1, !0) &&
                0 !== d &&
                e.setTranslate((o ? -e.translate : e.translate) - d);
          else if (a >= i.length - s) {
            (t = -i.length + a + s),
              (t += s),
              e.slideTo(t, 0, !1, !0) &&
                0 !== d &&
                e.setTranslate((o ? -e.translate : e.translate) - d);
          }
          (e.allowSlidePrev = r), (e.allowSlideNext = n), e.emit("loopFix");
        },
        loopDestroy: function () {
          var e = this,
            t = e.$wrapperEl,
            a = e.params,
            i = e.slides;
          t
            .children(
              "." +
                a.slideClass +
                "." +
                a.slideDuplicateClass +
                ",." +
                a.slideClass +
                "." +
                a.slideBlankClass
            )
            .remove(),
            i.removeAttr("data-swiper-slide-index");
        },
      },
      grabCursor: {
        setGrabCursor: function (e) {
          var t = this;
          if (
            !(
              t.support.touch ||
              !t.params.simulateTouch ||
              (t.params.watchOverflow && t.isLocked) ||
              t.params.cssMode
            )
          ) {
            var a = t.el;
            (a.style.cursor = "move"),
              (a.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
              (a.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
              (a.style.cursor = e ? "grabbing" : "grab");
          }
        },
        unsetGrabCursor: function () {
          var e = this;
          e.support.touch ||
            (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e.el.style.cursor = "");
        },
      },
      manipulation: {
        appendSlide: function (e) {
          var t = this,
            a = t.$wrapperEl,
            i = t.params;
          if (
            (i.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
          )
            for (var s = 0; s < e.length; s += 1) e[s] && a.append(e[s]);
          else a.append(e);
          i.loop && t.loopCreate(),
            (i.observer && t.support.observer) || t.update();
        },
        prependSlide: function (e) {
          var t = this,
            a = t.params,
            i = t.$wrapperEl,
            s = t.activeIndex;
          a.loop && t.loopDestroy();
          var r = s + 1;
          if ("object" == typeof e && "length" in e) {
            for (var n = 0; n < e.length; n += 1) e[n] && i.prepend(e[n]);
            r = s + e.length;
          } else i.prepend(e);
          a.loop && t.loopCreate(),
            (a.observer && t.support.observer) || t.update(),
            t.slideTo(r, 0, !1);
        },
        addSlide: function (e, t) {
          var a = this,
            i = a.$wrapperEl,
            s = a.params,
            r = a.activeIndex;
          s.loop &&
            ((r -= a.loopedSlides),
            a.loopDestroy(),
            (a.slides = i.children("." + s.slideClass)));
          var n = a.slides.length;
          if (e <= 0) a.prependSlide(t);
          else if (e >= n) a.appendSlide(t);
          else {
            for (var l = r > e ? r + 1 : r, o = [], d = n - 1; d >= e; d -= 1) {
              var p = a.slides.eq(d);
              p.remove(), o.unshift(p);
            }
            if ("object" == typeof t && "length" in t) {
              for (var u = 0; u < t.length; u += 1) t[u] && i.append(t[u]);
              l = r > e ? r + t.length : r;
            } else i.append(t);
            for (var c = 0; c < o.length; c += 1) i.append(o[c]);
            s.loop && a.loopCreate(),
              (s.observer && a.support.observer) || a.update(),
              s.loop
                ? a.slideTo(l + a.loopedSlides, 0, !1)
                : a.slideTo(l, 0, !1);
          }
        },
        removeSlide: function (e) {
          var t = this,
            a = t.params,
            i = t.$wrapperEl,
            s = t.activeIndex;
          a.loop &&
            ((s -= t.loopedSlides),
            t.loopDestroy(),
            (t.slides = i.children("." + a.slideClass)));
          var r,
            n = s;
          if ("object" == typeof e && "length" in e) {
            for (var l = 0; l < e.length; l += 1)
              (r = e[l]),
                t.slides[r] && t.slides.eq(r).remove(),
                r < n && (n -= 1);
            n = Math.max(n, 0);
          } else
            (r = e),
              t.slides[r] && t.slides.eq(r).remove(),
              r < n && (n -= 1),
              (n = Math.max(n, 0));
          a.loop && t.loopCreate(),
            (a.observer && t.support.observer) || t.update(),
            a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1);
        },
        removeAllSlides: function () {
          for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
          this.removeSlide(e);
        },
      },
      events: {
        attachEvents: function () {
          var e = this,
            t = r(),
            a = e.params,
            i = e.touchEvents,
            s = e.el,
            n = e.wrapperEl,
            l = e.device,
            o = e.support;
          (e.onTouchStart = A.bind(e)),
            (e.onTouchMove = D.bind(e)),
            (e.onTouchEnd = N.bind(e)),
            a.cssMode && (e.onScroll = H.bind(e)),
            (e.onClick = B.bind(e));
          var d = !!a.nested;
          if (!o.touch && o.pointerEvents)
            s.addEventListener(i.start, e.onTouchStart, !1),
              t.addEventListener(i.move, e.onTouchMove, d),
              t.addEventListener(i.end, e.onTouchEnd, !1);
          else {
            if (o.touch) {
              var p = !(
                "touchstart" !== i.start ||
                !o.passiveListener ||
                !a.passiveListeners
              ) && { passive: !0, capture: !1 };
              s.addEventListener(i.start, e.onTouchStart, p),
                s.addEventListener(
                  i.move,
                  e.onTouchMove,
                  o.passiveListener ? { passive: !1, capture: d } : d
                ),
                s.addEventListener(i.end, e.onTouchEnd, p),
                i.cancel && s.addEventListener(i.cancel, e.onTouchEnd, p),
                X || (t.addEventListener("touchstart", Y), (X = !0));
            }
            ((a.simulateTouch && !l.ios && !l.android) ||
              (a.simulateTouch && !o.touch && l.ios)) &&
              (s.addEventListener("mousedown", e.onTouchStart, !1),
              t.addEventListener("mousemove", e.onTouchMove, d),
              t.addEventListener("mouseup", e.onTouchEnd, !1));
          }
          (a.preventClicks || a.preventClicksPropagation) &&
            s.addEventListener("click", e.onClick, !0),
            a.cssMode && n.addEventListener("scroll", e.onScroll),
            a.updateOnWindowResize
              ? e.on(
                  l.ios || l.android
                    ? "resize orientationchange observerUpdate"
                    : "resize observerUpdate",
                  G,
                  !0
                )
              : e.on("observerUpdate", G, !0);
        },
        detachEvents: function () {
          var e = this,
            t = r(),
            a = e.params,
            i = e.touchEvents,
            s = e.el,
            n = e.wrapperEl,
            l = e.device,
            o = e.support,
            d = !!a.nested;
          if (!o.touch && o.pointerEvents)
            s.removeEventListener(i.start, e.onTouchStart, !1),
              t.removeEventListener(i.move, e.onTouchMove, d),
              t.removeEventListener(i.end, e.onTouchEnd, !1);
          else {
            if (o.touch) {
              var p = !(
                "onTouchStart" !== i.start ||
                !o.passiveListener ||
                !a.passiveListeners
              ) && { passive: !0, capture: !1 };
              s.removeEventListener(i.start, e.onTouchStart, p),
                s.removeEventListener(i.move, e.onTouchMove, d),
                s.removeEventListener(i.end, e.onTouchEnd, p),
                i.cancel && s.removeEventListener(i.cancel, e.onTouchEnd, p);
            }
            ((a.simulateTouch && !l.ios && !l.android) ||
              (a.simulateTouch && !o.touch && l.ios)) &&
              (s.removeEventListener("mousedown", e.onTouchStart, !1),
              t.removeEventListener("mousemove", e.onTouchMove, d),
              t.removeEventListener("mouseup", e.onTouchEnd, !1));
          }
          (a.preventClicks || a.preventClicksPropagation) &&
            s.removeEventListener("click", e.onClick, !0),
            a.cssMode && n.removeEventListener("scroll", e.onScroll),
            e.off(
              l.ios || l.android
                ? "resize orientationchange observerUpdate"
                : "resize observerUpdate",
              G
            );
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          var e = this,
            t = e.activeIndex,
            a = e.initialized,
            i = e.loopedSlides,
            s = void 0 === i ? 0 : i,
            r = e.params,
            n = e.$el,
            l = r.breakpoints;
          if (l && (!l || 0 !== Object.keys(l).length)) {
            var o = e.getBreakpoint(l, e.params.breakpointsBase, e.el);
            if (o && e.currentBreakpoint !== o) {
              var d = o in l ? l[o] : void 0;
              d &&
                [
                  "slidesPerView",
                  "spaceBetween",
                  "slidesPerGroup",
                  "slidesPerGroupSkip",
                  "slidesPerColumn",
                ].forEach(function (e) {
                  var t = d[e];
                  void 0 !== t &&
                    (d[e] =
                      "slidesPerView" !== e || ("AUTO" !== t && "auto" !== t)
                        ? "slidesPerView" === e
                          ? parseFloat(t)
                          : parseInt(t, 10)
                        : "auto");
                });
              var p = d || e.originalParams,
                u = r.slidesPerColumn > 1,
                c = p.slidesPerColumn > 1,
                h = r.enabled;
              u && !c
                ? (n.removeClass(
                    r.containerModifierClass +
                      "multirow " +
                      r.containerModifierClass +
                      "multirow-column"
                  ),
                  e.emitContainerClasses())
                : !u &&
                  c &&
                  (n.addClass(r.containerModifierClass + "multirow"),
                  "column" === p.slidesPerColumnFill &&
                    n.addClass(r.containerModifierClass + "multirow-column"),
                  e.emitContainerClasses());
              var v = p.direction && p.direction !== r.direction,
                f = r.loop && (p.slidesPerView !== r.slidesPerView || v);
              v && a && e.changeDirection(), S(e.params, p);
              var m = e.params.enabled;
              S(e, {
                allowTouchMove: e.params.allowTouchMove,
                allowSlideNext: e.params.allowSlideNext,
                allowSlidePrev: e.params.allowSlidePrev,
              }),
                h && !m ? e.disable() : !h && m && e.enable(),
                (e.currentBreakpoint = o),
                e.emit("_beforeBreakpoint", p),
                f &&
                  a &&
                  (e.loopDestroy(),
                  e.loopCreate(),
                  e.updateSlides(),
                  e.slideTo(t - s + e.loopedSlides, 0, !1)),
                e.emit("breakpoint", p);
            }
          }
        },
        getBreakpoint: function (e, t, a) {
          if ((void 0 === t && (t = "window"), e && ("container" !== t || a))) {
            var i = !1,
              s = l(),
              r = "window" === t ? s.innerWidth : a.clientWidth,
              n = "window" === t ? s.innerHeight : a.clientHeight,
              o = Object.keys(e).map(function (e) {
                if ("string" == typeof e && 0 === e.indexOf("@")) {
                  var t = parseFloat(e.substr(1));
                  return { value: n * t, point: e };
                }
                return { value: e, point: e };
              });
            o.sort(function (e, t) {
              return parseInt(e.value, 10) - parseInt(t.value, 10);
            });
            for (var d = 0; d < o.length; d += 1) {
              var p = o[d],
                u = p.point;
              p.value <= r && (i = u);
            }
            return i || "max";
          }
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          var e = this,
            t = e.params,
            a = e.isLocked,
            i =
              e.slides.length > 0 &&
              t.slidesOffsetBefore +
                t.spaceBetween * (e.slides.length - 1) +
                e.slides[0].offsetWidth * e.slides.length;
          t.slidesOffsetBefore && t.slidesOffsetAfter && i
            ? (e.isLocked = i <= e.size)
            : (e.isLocked = 1 === e.snapGrid.length),
            (e.allowSlideNext = !e.isLocked),
            (e.allowSlidePrev = !e.isLocked),
            a !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"),
            a &&
              a !== e.isLocked &&
              ((e.isEnd = !1), e.navigation && e.navigation.update());
        },
      },
      classes: {
        addClasses: function () {
          var e,
            t,
            a,
            i = this,
            s = i.classNames,
            r = i.params,
            n = i.rtl,
            l = i.$el,
            o = i.device,
            d = i.support,
            p =
              ((e = [
                "initialized",
                r.direction,
                { "pointer-events": d.pointerEvents && !d.touch },
                { "free-mode": r.freeMode },
                { autoheight: r.autoHeight },
                { rtl: n },
                { multirow: r.slidesPerColumn > 1 },
                {
                  "multirow-column":
                    r.slidesPerColumn > 1 && "column" === r.slidesPerColumnFill,
                },
                { android: o.android },
                { ios: o.ios },
                { "css-mode": r.cssMode },
              ]),
              (t = r.containerModifierClass),
              (a = []),
              e.forEach(function (e) {
                "object" == typeof e
                  ? Object.keys(e).forEach(function (i) {
                      e[i] && a.push(t + i);
                    })
                  : "string" == typeof e && a.push(t + e);
              }),
              a);
          s.push.apply(s, p),
            l.addClass([].concat(s).join(" ")),
            i.emitContainerClasses();
        },
        removeClasses: function () {
          var e = this,
            t = e.$el,
            a = e.classNames;
          t.removeClass(a.join(" ")), e.emitContainerClasses();
        },
      },
      images: {
        loadImage: function (e, t, a, i, s, r) {
          var n,
            o = l();
          function d() {
            r && r();
          }
          m(e).parent("picture")[0] || (e.complete && s)
            ? d()
            : t
            ? (((n = new o.Image()).onload = d),
              (n.onerror = d),
              i && (n.sizes = i),
              a && (n.srcset = a),
              t && (n.src = t))
            : d();
        },
        preloadImages: function () {
          var e = this;
          function t() {
            null != e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit("imagesReady")));
          }
          e.imagesToLoad = e.$el.find("img");
          for (var a = 0; a < e.imagesToLoad.length; a += 1) {
            var i = e.imagesToLoad[a];
            e.loadImage(
              i,
              i.currentSrc || i.getAttribute("src"),
              i.srcset || i.getAttribute("srcset"),
              i.sizes || i.getAttribute("sizes"),
              !0,
              t
            );
          }
        },
      },
    },
    V = {},
    F = (function () {
      function t() {
        for (
          var e, a, i = arguments.length, s = new Array(i), r = 0;
          r < i;
          r++
        )
          s[r] = arguments[r];
        if (
          (1 === s.length &&
          s[0].constructor &&
          "Object" === Object.prototype.toString.call(s[0]).slice(8, -1)
            ? (a = s[0])
            : ((e = s[0]), (a = s[1])),
          a || (a = {}),
          (a = S({}, a)),
          e && !a.el && (a.el = e),
          a.el && m(a.el).length > 1)
        ) {
          var n = [];
          return (
            m(a.el).each(function (e) {
              var i = S({}, a, { el: e });
              n.push(new t(i));
            }),
            n
          );
        }
        var l = this;
        (l.__swiper__ = !0),
          (l.support = P()),
          (l.device = k({ userAgent: a.userAgent })),
          (l.browser = $()),
          (l.eventsListeners = {}),
          (l.eventsAnyListeners = []),
          void 0 === l.modules && (l.modules = {}),
          Object.keys(l.modules).forEach(function (e) {
            var t = l.modules[e];
            if (t.params) {
              var i = Object.keys(t.params)[0],
                s = t.params[i];
              if ("object" != typeof s || null === s) return;
              if (!(i in a) || !("enabled" in s)) return;
              !0 === a[i] && (a[i] = { enabled: !0 }),
                "object" != typeof a[i] ||
                  "enabled" in a[i] ||
                  (a[i].enabled = !0),
                a[i] || (a[i] = { enabled: !1 });
            }
          });
        var o,
          d,
          p = S({}, R);
        return (
          l.useParams(p),
          (l.params = S({}, p, V, a)),
          (l.originalParams = S({}, l.params)),
          (l.passedParams = S({}, a)),
          l.params &&
            l.params.on &&
            Object.keys(l.params.on).forEach(function (e) {
              l.on(e, l.params.on[e]);
            }),
          l.params && l.params.onAny && l.onAny(l.params.onAny),
          (l.$ = m),
          S(l, {
            enabled: l.params.enabled,
            el: e,
            classNames: [],
            slides: m(),
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: function () {
              return "horizontal" === l.params.direction;
            },
            isVertical: function () {
              return "vertical" === l.params.direction;
            },
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: l.params.allowSlideNext,
            allowSlidePrev: l.params.allowSlidePrev,
            touchEvents:
              ((o = ["touchstart", "touchmove", "touchend", "touchcancel"]),
              (d = ["mousedown", "mousemove", "mouseup"]),
              l.support.pointerEvents &&
                (d = ["pointerdown", "pointermove", "pointerup"]),
              (l.touchEventsTouch = {
                start: o[0],
                move: o[1],
                end: o[2],
                cancel: o[3],
              }),
              (l.touchEventsDesktop = { start: d[0], move: d[1], end: d[2] }),
              l.support.touch || !l.params.simulateTouch
                ? l.touchEventsTouch
                : l.touchEventsDesktop),
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              formElements:
                "input, select, option, textarea, button, video, label",
              lastClickTime: x(),
              clickTimeout: void 0,
              velocities: [],
              allowMomentumBounce: void 0,
              isTouchEvent: void 0,
              startMoving: void 0,
            },
            allowClick: !0,
            allowTouchMove: l.params.allowTouchMove,
            touches: {
              startX: 0,
              startY: 0,
              currentX: 0,
              currentY: 0,
              diff: 0,
            },
            imagesToLoad: [],
            imagesLoaded: 0,
          }),
          l.useModules(),
          l.emit("_swiper"),
          l.params.init && l.init(),
          l
        );
      }
      var a,
        i,
        s,
        r = t.prototype;
      return (
        (r.enable = function () {
          var e = this;
          e.enabled ||
            ((e.enabled = !0),
            e.params.grabCursor && e.setGrabCursor(),
            e.emit("enable"));
        }),
        (r.disable = function () {
          var e = this;
          e.enabled &&
            ((e.enabled = !1),
            e.params.grabCursor && e.unsetGrabCursor(),
            e.emit("disable"));
        }),
        (r.setProgress = function (e, t) {
          var a = this;
          e = Math.min(Math.max(e, 0), 1);
          var i = a.minTranslate(),
            s = (a.maxTranslate() - i) * e + i;
          a.translateTo(s, void 0 === t ? 0 : t),
            a.updateActiveIndex(),
            a.updateSlidesClasses();
        }),
        (r.emitContainerClasses = function () {
          var e = this;
          if (e.params._emitClasses && e.el) {
            var t = e.el.className.split(" ").filter(function (t) {
              return (
                0 === t.indexOf("swiper-container") ||
                0 === t.indexOf(e.params.containerModifierClass)
              );
            });
            e.emit("_containerClasses", t.join(" "));
          }
        }),
        (r.getSlideClasses = function (e) {
          var t = this;
          return e.className
            .split(" ")
            .filter(function (e) {
              return (
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass)
              );
            })
            .join(" ");
        }),
        (r.emitSlidesClasses = function () {
          var e = this;
          if (e.params._emitClasses && e.el) {
            var t = [];
            e.slides.each(function (a) {
              var i = e.getSlideClasses(a);
              t.push({ slideEl: a, classNames: i }),
                e.emit("_slideClass", a, i);
            }),
              e.emit("_slideClasses", t);
          }
        }),
        (r.slidesPerViewDynamic = function () {
          var e = this,
            t = e.params,
            a = e.slides,
            i = e.slidesGrid,
            s = e.size,
            r = e.activeIndex,
            n = 1;
          if (t.centeredSlides) {
            for (
              var l, o = a[r].swiperSlideSize, d = r + 1;
              d < a.length;
              d += 1
            )
              a[d] &&
                !l &&
                ((n += 1), (o += a[d].swiperSlideSize) > s && (l = !0));
            for (var p = r - 1; p >= 0; p -= 1)
              a[p] &&
                !l &&
                ((n += 1), (o += a[p].swiperSlideSize) > s && (l = !0));
          } else
            for (var u = r + 1; u < a.length; u += 1)
              i[u] - i[r] < s && (n += 1);
          return n;
        }),
        (r.update = function () {
          var e = this;
          if (e && !e.destroyed) {
            var t = e.snapGrid,
              a = e.params;
            a.breakpoints && e.setBreakpoint(),
              e.updateSize(),
              e.updateSlides(),
              e.updateProgress(),
              e.updateSlidesClasses(),
              e.params.freeMode
                ? (i(), e.params.autoHeight && e.updateAutoHeight())
                : (("auto" === e.params.slidesPerView ||
                    e.params.slidesPerView > 1) &&
                  e.isEnd &&
                  !e.params.centeredSlides
                    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                    : e.slideTo(e.activeIndex, 0, !1, !0)) || i(),
              a.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
              e.emit("update");
          }
          function i() {
            var t = e.rtlTranslate ? -1 * e.translate : e.translate,
              a = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
            e.setTranslate(a), e.updateActiveIndex(), e.updateSlidesClasses();
          }
        }),
        (r.changeDirection = function (e, t) {
          void 0 === t && (t = !0);
          var a = this,
            i = a.params.direction;
          return (
            e || (e = "horizontal" === i ? "vertical" : "horizontal"),
            e === i ||
              ("horizontal" !== e && "vertical" !== e) ||
              (a.$el
                .removeClass("" + a.params.containerModifierClass + i)
                .addClass("" + a.params.containerModifierClass + e),
              a.emitContainerClasses(),
              (a.params.direction = e),
              a.slides.each(function (t) {
                "vertical" === e ? (t.style.width = "") : (t.style.height = "");
              }),
              a.emit("changeDirection"),
              t && a.update()),
            a
          );
        }),
        (r.mount = function (e) {
          var t = this;
          if (t.mounted) return !0;
          var a,
            i = m(e || t.params.el);
          return (
            !!(e = i[0]) &&
            ((e.swiper = t),
            e && e.shadowRoot && e.shadowRoot.querySelector
              ? ((a = m(
                  e.shadowRoot.querySelector("." + t.params.wrapperClass)
                )).children = function (e) {
                  return i.children(e);
                })
              : (a = i.children("." + t.params.wrapperClass)),
            S(t, {
              $el: i,
              el: e,
              $wrapperEl: a,
              wrapperEl: a[0],
              mounted: !0,
              rtl:
                "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
              rtlTranslate:
                "horizontal" === t.params.direction &&
                ("rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction")),
              wrongRTL: "-webkit-box" === a.css("display"),
            }),
            !0)
          );
        }),
        (r.init = function (e) {
          var t = this;
          return (
            t.initialized ||
              !1 === t.mount(e) ||
              (t.emit("beforeInit"),
              t.params.breakpoints && t.setBreakpoint(),
              t.addClasses(),
              t.params.loop && t.loopCreate(),
              t.updateSize(),
              t.updateSlides(),
              t.params.watchOverflow && t.checkOverflow(),
              t.params.grabCursor && t.enabled && t.setGrabCursor(),
              t.params.preloadImages && t.preloadImages(),
              t.params.loop
                ? t.slideTo(
                    t.params.initialSlide + t.loopedSlides,
                    0,
                    t.params.runCallbacksOnInit,
                    !1,
                    !0
                  )
                : t.slideTo(
                    t.params.initialSlide,
                    0,
                    t.params.runCallbacksOnInit,
                    !1,
                    !0
                  ),
              t.attachEvents(),
              (t.initialized = !0),
              t.emit("init"),
              t.emit("afterInit")),
            t
          );
        }),
        (r.destroy = function (e, t) {
          void 0 === e && (e = !0), void 0 === t && (t = !0);
          var a,
            i = this,
            s = i.params,
            r = i.$el,
            n = i.$wrapperEl,
            l = i.slides;
          return (
            void 0 === i.params ||
              i.destroyed ||
              (i.emit("beforeDestroy"),
              (i.initialized = !1),
              i.detachEvents(),
              s.loop && i.loopDestroy(),
              t &&
                (i.removeClasses(),
                r.removeAttr("style"),
                n.removeAttr("style"),
                l &&
                  l.length &&
                  l
                    .removeClass(
                      [
                        s.slideVisibleClass,
                        s.slideActiveClass,
                        s.slideNextClass,
                        s.slidePrevClass,
                      ].join(" ")
                    )
                    .removeAttr("style")
                    .removeAttr("data-swiper-slide-index")),
              i.emit("destroy"),
              Object.keys(i.eventsListeners).forEach(function (e) {
                i.off(e);
              }),
              !1 !== e &&
                ((i.$el[0].swiper = null),
                (a = i),
                Object.keys(a).forEach(function (e) {
                  try {
                    a[e] = null;
                  } catch (e) {}
                  try {
                    delete a[e];
                  } catch (e) {}
                })),
              (i.destroyed = !0)),
            null
          );
        }),
        (t.extendDefaults = function (e) {
          S(V, e);
        }),
        (t.installModule = function (e) {
          t.prototype.modules || (t.prototype.modules = {});
          var a = e.name || Object.keys(t.prototype.modules).length + "_" + x();
          t.prototype.modules[a] = e;
        }),
        (t.use = function (e) {
          return Array.isArray(e)
            ? (e.forEach(function (e) {
                return t.installModule(e);
              }),
              t)
            : (t.installModule(e), t);
        }),
        (a = t),
        (s = [
          {
            key: "extendedDefaults",
            get: function () {
              return V;
            },
          },
          {
            key: "defaults",
            get: function () {
              return R;
            },
          },
        ]),
        (i = null) && e(a.prototype, i),
        s && e(a, s),
        t
      );
    })();
  Object.keys(W).forEach(function (e) {
    Object.keys(W[e]).forEach(function (t) {
      F.prototype[t] = W[e][t];
    });
  }),
    F.use([L, O]);
  var _ = {
      update: function (e) {
        var t = this,
          a = t.params,
          i = a.slidesPerView,
          s = a.slidesPerGroup,
          r = a.centeredSlides,
          n = t.params.virtual,
          l = n.addSlidesBefore,
          o = n.addSlidesAfter,
          d = t.virtual,
          p = d.from,
          u = d.to,
          c = d.slides,
          h = d.slidesGrid,
          v = d.renderSlide,
          f = d.offset;
        t.updateActiveIndex();
        var m,
          g,
          b,
          y = t.activeIndex || 0;
        (m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top"),
          r
            ? ((g = Math.floor(i / 2) + s + o), (b = Math.floor(i / 2) + s + l))
            : ((g = i + (s - 1) + o), (b = s + l));
        var w = Math.max((y || 0) - b, 0),
          E = Math.min((y || 0) + g, c.length - 1),
          x = (t.slidesGrid[w] || 0) - (t.slidesGrid[0] || 0);
        function T() {
          t.updateSlides(),
            t.updateProgress(),
            t.updateSlidesClasses(),
            t.lazy && t.params.lazy.enabled && t.lazy.load();
        }
        if (
          (S(t.virtual, {
            from: w,
            to: E,
            offset: x,
            slidesGrid: t.slidesGrid,
          }),
          p === w && u === E && !e)
        )
          return (
            t.slidesGrid !== h && x !== f && t.slides.css(m, x + "px"),
            void t.updateProgress()
          );
        if (t.params.virtual.renderExternal)
          return (
            t.params.virtual.renderExternal.call(t, {
              offset: x,
              from: w,
              to: E,
              slides: (function () {
                for (var e = [], t = w; t <= E; t += 1) e.push(c[t]);
                return e;
              })(),
            }),
            void (t.params.virtual.renderExternalUpdate && T())
          );
        var C = [],
          M = [];
        if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
        else
          for (var z = p; z <= u; z += 1)
            (z < w || z > E) &&
              t.$wrapperEl
                .find(
                  "." +
                    t.params.slideClass +
                    '[data-swiper-slide-index="' +
                    z +
                    '"]'
                )
                .remove();
        for (var P = 0; P < c.length; P += 1)
          P >= w &&
            P <= E &&
            (void 0 === u || e
              ? M.push(P)
              : (P > u && M.push(P), P < p && C.push(P)));
        M.forEach(function (e) {
          t.$wrapperEl.append(v(c[e], e));
        }),
          C.sort(function (e, t) {
            return t - e;
          }).forEach(function (e) {
            t.$wrapperEl.prepend(v(c[e], e));
          }),
          t.$wrapperEl.children(".swiper-slide").css(m, x + "px"),
          T();
      },
      renderSlide: function (e, t) {
        var a = this,
          i = a.params.virtual;
        if (i.cache && a.virtual.cache[t]) return a.virtual.cache[t];
        var s = i.renderSlide
          ? m(i.renderSlide.call(a, e, t))
          : m(
              '<div class="' +
                a.params.slideClass +
                '" data-swiper-slide-index="' +
                t +
                '">' +
                e +
                "</div>"
            );
        return (
          s.attr("data-swiper-slide-index") ||
            s.attr("data-swiper-slide-index", t),
          i.cache && (a.virtual.cache[t] = s),
          s
        );
      },
      appendSlide: function (e) {
        var t = this;
        if ("object" == typeof e && "length" in e)
          for (var a = 0; a < e.length; a += 1)
            e[a] && t.virtual.slides.push(e[a]);
        else t.virtual.slides.push(e);
        t.virtual.update(!0);
      },
      prependSlide: function (e) {
        var t = this,
          a = t.activeIndex,
          i = a + 1,
          s = 1;
        if (Array.isArray(e)) {
          for (var r = 0; r < e.length; r += 1)
            e[r] && t.virtual.slides.unshift(e[r]);
          (i = a + e.length), (s = e.length);
        } else t.virtual.slides.unshift(e);
        if (t.params.virtual.cache) {
          var n = t.virtual.cache,
            l = {};
          Object.keys(n).forEach(function (e) {
            var t = n[e],
              a = t.attr("data-swiper-slide-index");
            a && t.attr("data-swiper-slide-index", parseInt(a, 10) + 1),
              (l[parseInt(e, 10) + s] = t);
          }),
            (t.virtual.cache = l);
        }
        t.virtual.update(!0), t.slideTo(i, 0);
      },
      removeSlide: function (e) {
        var t = this;
        if (null != e) {
          var a = t.activeIndex;
          if (Array.isArray(e))
            for (var i = e.length - 1; i >= 0; i -= 1)
              t.virtual.slides.splice(e[i], 1),
                t.params.virtual.cache && delete t.virtual.cache[e[i]],
                e[i] < a && (a -= 1),
                (a = Math.max(a, 0));
          else
            t.virtual.slides.splice(e, 1),
              t.params.virtual.cache && delete t.virtual.cache[e],
              e < a && (a -= 1),
              (a = Math.max(a, 0));
          t.virtual.update(!0), t.slideTo(a, 0);
        }
      },
      removeAllSlides: function () {
        var e = this;
        (e.virtual.slides = []),
          e.params.virtual.cache && (e.virtual.cache = {}),
          e.virtual.update(!0),
          e.slideTo(0, 0);
      },
    },
    q = {
      name: "virtual",
      params: {
        virtual: {
          enabled: !1,
          slides: [],
          cache: !0,
          renderSlide: null,
          renderExternal: null,
          renderExternalUpdate: !0,
          addSlidesBefore: 0,
          addSlidesAfter: 0,
        },
      },
      create: function () {
        M(this, {
          virtual: t({}, _, { slides: this.params.virtual.slides, cache: {} }),
        });
      },
      on: {
        beforeInit: function (e) {
          if (e.params.virtual.enabled) {
            e.classNames.push(e.params.containerModifierClass + "virtual");
            var t = { watchSlidesProgress: !0 };
            S(e.params, t),
              S(e.originalParams, t),
              e.params.initialSlide || e.virtual.update();
          }
        },
        setTranslate: function (e) {
          e.params.virtual.enabled && e.virtual.update();
        },
      },
    },
    j = {
      handle: function (e) {
        var t = this;
        if (t.enabled) {
          var a = l(),
            i = r(),
            s = t.rtlTranslate,
            n = e;
          n.originalEvent && (n = n.originalEvent);
          var o = n.keyCode || n.charCode,
            d = t.params.keyboard.pageUpDown,
            p = d && 33 === o,
            u = d && 34 === o,
            c = 37 === o,
            h = 39 === o,
            v = 38 === o,
            f = 40 === o;
          if (
            !t.allowSlideNext &&
            ((t.isHorizontal() && h) || (t.isVertical() && f) || u)
          )
            return !1;
          if (
            !t.allowSlidePrev &&
            ((t.isHorizontal() && c) || (t.isVertical() && v) || p)
          )
            return !1;
          if (
            !(
              n.shiftKey ||
              n.altKey ||
              n.ctrlKey ||
              n.metaKey ||
              (i.activeElement &&
                i.activeElement.nodeName &&
                ("input" === i.activeElement.nodeName.toLowerCase() ||
                  "textarea" === i.activeElement.nodeName.toLowerCase()))
            )
          ) {
            if (
              t.params.keyboard.onlyInViewport &&
              (p || u || c || h || v || f)
            ) {
              var m = !1;
              if (
                t.$el.parents("." + t.params.slideClass).length > 0 &&
                0 === t.$el.parents("." + t.params.slideActiveClass).length
              )
                return;
              var g = t.$el,
                b = g[0].clientWidth,
                y = g[0].clientHeight,
                w = a.innerWidth,
                E = a.innerHeight,
                x = t.$el.offset();
              s && (x.left -= t.$el[0].scrollLeft);
              for (
                var T = [
                    [x.left, x.top],
                    [x.left + b, x.top],
                    [x.left, x.top + y],
                    [x.left + b, x.top + y],
                  ],
                  C = 0;
                C < T.length;
                C += 1
              ) {
                var S = T[C];
                if (S[0] >= 0 && S[0] <= w && S[1] >= 0 && S[1] <= E) {
                  if (0 === S[0] && 0 === S[1]) continue;
                  m = !0;
                }
              }
              if (!m) return;
            }
            t.isHorizontal()
              ? ((p || u || c || h) &&
                  (n.preventDefault
                    ? n.preventDefault()
                    : (n.returnValue = !1)),
                (((u || h) && !s) || ((p || c) && s)) && t.slideNext(),
                (((p || c) && !s) || ((u || h) && s)) && t.slidePrev())
              : ((p || u || v || f) &&
                  (n.preventDefault
                    ? n.preventDefault()
                    : (n.returnValue = !1)),
                (u || f) && t.slideNext(),
                (p || v) && t.slidePrev()),
              t.emit("keyPress", o);
          }
        }
      },
      enable: function () {
        var e = this,
          t = r();
        e.keyboard.enabled ||
          (m(t).on("keydown", e.keyboard.handle), (e.keyboard.enabled = !0));
      },
      disable: function () {
        var e = this,
          t = r();
        e.keyboard.enabled &&
          (m(t).off("keydown", e.keyboard.handle), (e.keyboard.enabled = !1));
      },
    },
    U = {
      name: "keyboard",
      params: { keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } },
      create: function () {
        M(this, { keyboard: t({ enabled: !1 }, j) });
      },
      on: {
        init: function (e) {
          e.params.keyboard.enabled && e.keyboard.enable();
        },
        destroy: function (e) {
          e.keyboard.enabled && e.keyboard.disable();
        },
      },
    };
  var K = {
      lastScrollTime: x(),
      lastEventBeforeSnap: void 0,
      recentWheelEvents: [],
      event: function () {
        return l().navigator.userAgent.indexOf("firefox") > -1
          ? "DOMMouseScroll"
          : (function () {
              var e = r(),
                t = "onwheel",
                a = t in e;
              if (!a) {
                var i = e.createElement("div");
                i.setAttribute(t, "return;"),
                  (a = "function" == typeof i.onwheel);
              }
              return (
                !a &&
                  e.implementation &&
                  e.implementation.hasFeature &&
                  !0 !== e.implementation.hasFeature("", "") &&
                  (a = e.implementation.hasFeature("Events.wheel", "3.0")),
                a
              );
            })()
          ? "wheel"
          : "mousewheel";
      },
      normalize: function (e) {
        var t = 0,
          a = 0,
          i = 0,
          s = 0;
        return (
          "detail" in e && (a = e.detail),
          "wheelDelta" in e && (a = -e.wheelDelta / 120),
          "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120),
          "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
          "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = a), (a = 0)),
          (i = 10 * t),
          (s = 10 * a),
          "deltaY" in e && (s = e.deltaY),
          "deltaX" in e && (i = e.deltaX),
          e.shiftKey && !i && ((i = s), (s = 0)),
          (i || s) &&
            e.deltaMode &&
            (1 === e.deltaMode
              ? ((i *= 40), (s *= 40))
              : ((i *= 800), (s *= 800))),
          i && !t && (t = i < 1 ? -1 : 1),
          s && !a && (a = s < 1 ? -1 : 1),
          { spinX: t, spinY: a, pixelX: i, pixelY: s }
        );
      },
      handleMouseEnter: function () {
        this.enabled && (this.mouseEntered = !0);
      },
      handleMouseLeave: function () {
        this.enabled && (this.mouseEntered = !1);
      },
      handle: function (e) {
        var t = e,
          a = this;
        if (a.enabled) {
          var i = a.params.mousewheel;
          a.params.cssMode && t.preventDefault();
          var s = a.$el;
          if (
            ("container" !== a.params.mousewheel.eventsTarget &&
              (s = m(a.params.mousewheel.eventsTarget)),
            !a.mouseEntered && !s[0].contains(t.target) && !i.releaseOnEdges)
          )
            return !0;
          t.originalEvent && (t = t.originalEvent);
          var r = 0,
            n = a.rtlTranslate ? -1 : 1,
            l = K.normalize(t);
          if (i.forceToAxis)
            if (a.isHorizontal()) {
              if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY))) return !0;
              r = -l.pixelX * n;
            } else {
              if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX))) return !0;
              r = -l.pixelY;
            }
          else
            r =
              Math.abs(l.pixelX) > Math.abs(l.pixelY)
                ? -l.pixelX * n
                : -l.pixelY;
          if (0 === r) return !0;
          i.invert && (r = -r);
          var o = a.getTranslate() + r * i.sensitivity;
          if (
            (o >= a.minTranslate() && (o = a.minTranslate()),
            o <= a.maxTranslate() && (o = a.maxTranslate()),
            (!!a.params.loop ||
              !(o === a.minTranslate() || o === a.maxTranslate())) &&
              a.params.nested &&
              t.stopPropagation(),
            a.params.freeMode)
          ) {
            var d = { time: x(), delta: Math.abs(r), direction: Math.sign(r) },
              p = a.mousewheel.lastEventBeforeSnap,
              u =
                p &&
                d.time < p.time + 500 &&
                d.delta <= p.delta &&
                d.direction === p.direction;
            if (!u) {
              (a.mousewheel.lastEventBeforeSnap = void 0),
                a.params.loop && a.loopFix();
              var c = a.getTranslate() + r * i.sensitivity,
                h = a.isBeginning,
                v = a.isEnd;
              if (
                (c >= a.minTranslate() && (c = a.minTranslate()),
                c <= a.maxTranslate() && (c = a.maxTranslate()),
                a.setTransition(0),
                a.setTranslate(c),
                a.updateProgress(),
                a.updateActiveIndex(),
                a.updateSlidesClasses(),
                ((!h && a.isBeginning) || (!v && a.isEnd)) &&
                  a.updateSlidesClasses(),
                a.params.freeModeSticky)
              ) {
                clearTimeout(a.mousewheel.timeout),
                  (a.mousewheel.timeout = void 0);
                var f = a.mousewheel.recentWheelEvents;
                f.length >= 15 && f.shift();
                var g = f.length ? f[f.length - 1] : void 0,
                  b = f[0];
                if (
                  (f.push(d),
                  g && (d.delta > g.delta || d.direction !== g.direction))
                )
                  f.splice(0);
                else if (
                  f.length >= 15 &&
                  d.time - b.time < 500 &&
                  b.delta - d.delta >= 1 &&
                  d.delta <= 6
                ) {
                  var y = r > 0 ? 0.8 : 0.2;
                  (a.mousewheel.lastEventBeforeSnap = d),
                    f.splice(0),
                    (a.mousewheel.timeout = E(function () {
                      a.slideToClosest(a.params.speed, !0, void 0, y);
                    }, 0));
                }
                a.mousewheel.timeout ||
                  (a.mousewheel.timeout = E(function () {
                    (a.mousewheel.lastEventBeforeSnap = d),
                      f.splice(0),
                      a.slideToClosest(a.params.speed, !0, void 0, 0.5);
                  }, 500));
              }
              if (
                (u || a.emit("scroll", t),
                a.params.autoplay &&
                  a.params.autoplayDisableOnInteraction &&
                  a.autoplay.stop(),
                c === a.minTranslate() || c === a.maxTranslate())
              )
                return !0;
            }
          } else {
            var w = {
                time: x(),
                delta: Math.abs(r),
                direction: Math.sign(r),
                raw: e,
              },
              T = a.mousewheel.recentWheelEvents;
            T.length >= 2 && T.shift();
            var C = T.length ? T[T.length - 1] : void 0;
            if (
              (T.push(w),
              C
                ? (w.direction !== C.direction ||
                    w.delta > C.delta ||
                    w.time > C.time + 150) &&
                  a.mousewheel.animateSlider(w)
                : a.mousewheel.animateSlider(w),
              a.mousewheel.releaseScroll(w))
            )
              return !0;
          }
          return (
            t.preventDefault ? t.preventDefault() : (t.returnValue = !1), !1
          );
        }
      },
      animateSlider: function (e) {
        var t = this,
          a = l();
        return (
          !(
            this.params.mousewheel.thresholdDelta &&
            e.delta < this.params.mousewheel.thresholdDelta
          ) &&
          !(
            this.params.mousewheel.thresholdTime &&
            x() - t.mousewheel.lastScrollTime <
              this.params.mousewheel.thresholdTime
          ) &&
          ((e.delta >= 6 && x() - t.mousewheel.lastScrollTime < 60) ||
            (e.direction < 0
              ? (t.isEnd && !t.params.loop) ||
                t.animating ||
                (t.slideNext(), t.emit("scroll", e.raw))
              : (t.isBeginning && !t.params.loop) ||
                t.animating ||
                (t.slidePrev(), t.emit("scroll", e.raw)),
            (t.mousewheel.lastScrollTime = new a.Date().getTime()),
            !1))
        );
      },
      releaseScroll: function (e) {
        var t = this,
          a = t.params.mousewheel;
        if (e.direction < 0) {
          if (t.isEnd && !t.params.loop && a.releaseOnEdges) return !0;
        } else if (t.isBeginning && !t.params.loop && a.releaseOnEdges)
          return !0;
        return !1;
      },
      enable: function () {
        var e = this,
          t = K.event();
        if (e.params.cssMode)
          return e.wrapperEl.removeEventListener(t, e.mousewheel.handle), !0;
        if (!t) return !1;
        if (e.mousewheel.enabled) return !1;
        var a = e.$el;
        return (
          "container" !== e.params.mousewheel.eventsTarget &&
            (a = m(e.params.mousewheel.eventsTarget)),
          a.on("mouseenter", e.mousewheel.handleMouseEnter),
          a.on("mouseleave", e.mousewheel.handleMouseLeave),
          a.on(t, e.mousewheel.handle),
          (e.mousewheel.enabled = !0),
          !0
        );
      },
      disable: function () {
        var e = this,
          t = K.event();
        if (e.params.cssMode)
          return e.wrapperEl.addEventListener(t, e.mousewheel.handle), !0;
        if (!t) return !1;
        if (!e.mousewheel.enabled) return !1;
        var a = e.$el;
        return (
          "container" !== e.params.mousewheel.eventsTarget &&
            (a = m(e.params.mousewheel.eventsTarget)),
          a.off(t, e.mousewheel.handle),
          (e.mousewheel.enabled = !1),
          !0
        );
      },
    },
    Z = {
      toggleEl: function (e, t) {
        e[t ? "addClass" : "removeClass"](this.params.navigation.disabledClass),
          e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = t);
      },
      update: function () {
        var e = this,
          t = e.params.navigation,
          a = e.navigation.toggleEl;
        if (!e.params.loop) {
          var i = e.navigation,
            s = i.$nextEl,
            r = i.$prevEl;
          r &&
            r.length > 0 &&
            (e.isBeginning ? a(r, !0) : a(r, !1),
            e.params.watchOverflow &&
              e.enabled &&
              r[e.isLocked ? "addClass" : "removeClass"](t.lockClass)),
            s &&
              s.length > 0 &&
              (e.isEnd ? a(s, !0) : a(s, !1),
              e.params.watchOverflow &&
                e.enabled &&
                s[e.isLocked ? "addClass" : "removeClass"](t.lockClass));
        }
      },
      onPrevClick: function (e) {
        var t = this;
        e.preventDefault(), (t.isBeginning && !t.params.loop) || t.slidePrev();
      },
      onNextClick: function (e) {
        var t = this;
        e.preventDefault(), (t.isEnd && !t.params.loop) || t.slideNext();
      },
      init: function () {
        var e,
          t,
          a = this,
          i = a.params.navigation;
        (i.nextEl || i.prevEl) &&
          (i.nextEl &&
            ((e = m(i.nextEl)),
            a.params.uniqueNavElements &&
              "string" == typeof i.nextEl &&
              e.length > 1 &&
              1 === a.$el.find(i.nextEl).length &&
              (e = a.$el.find(i.nextEl))),
          i.prevEl &&
            ((t = m(i.prevEl)),
            a.params.uniqueNavElements &&
              "string" == typeof i.prevEl &&
              t.length > 1 &&
              1 === a.$el.find(i.prevEl).length &&
              (t = a.$el.find(i.prevEl))),
          e && e.length > 0 && e.on("click", a.navigation.onNextClick),
          t && t.length > 0 && t.on("click", a.navigation.onPrevClick),
          S(a.navigation, {
            $nextEl: e,
            nextEl: e && e[0],
            $prevEl: t,
            prevEl: t && t[0],
          }),
          a.enabled ||
            (e && e.addClass(i.lockClass), t && t.addClass(i.lockClass)));
      },
      destroy: function () {
        var e = this,
          t = e.navigation,
          a = t.$nextEl,
          i = t.$prevEl;
        a &&
          a.length &&
          (a.off("click", e.navigation.onNextClick),
          a.removeClass(e.params.navigation.disabledClass)),
          i &&
            i.length &&
            (i.off("click", e.navigation.onPrevClick),
            i.removeClass(e.params.navigation.disabledClass));
      },
    },
    J = {
      update: function () {
        var e = this,
          t = e.rtl,
          a = e.params.pagination;
        if (
          a.el &&
          e.pagination.el &&
          e.pagination.$el &&
          0 !== e.pagination.$el.length
        ) {
          var i,
            s =
              e.virtual && e.params.virtual.enabled
                ? e.virtual.slides.length
                : e.slides.length,
            r = e.pagination.$el,
            n = e.params.loop
              ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup)
              : e.snapGrid.length;
          if (
            (e.params.loop
              ? ((i = Math.ceil(
                  (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
                )) >
                  s - 1 - 2 * e.loopedSlides && (i -= s - 2 * e.loopedSlides),
                i > n - 1 && (i -= n),
                i < 0 && "bullets" !== e.params.paginationType && (i = n + i))
              : (i = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
            "bullets" === a.type &&
              e.pagination.bullets &&
              e.pagination.bullets.length > 0)
          ) {
            var l,
              o,
              d,
              p = e.pagination.bullets;
            if (
              (a.dynamicBullets &&
                ((e.pagination.bulletSize = p
                  .eq(0)
                  [e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                r.css(
                  e.isHorizontal() ? "width" : "height",
                  e.pagination.bulletSize * (a.dynamicMainBullets + 4) + "px"
                ),
                a.dynamicMainBullets > 1 &&
                  void 0 !== e.previousIndex &&
                  ((e.pagination.dynamicBulletIndex += i - e.previousIndex),
                  e.pagination.dynamicBulletIndex > a.dynamicMainBullets - 1
                    ? (e.pagination.dynamicBulletIndex =
                        a.dynamicMainBullets - 1)
                    : e.pagination.dynamicBulletIndex < 0 &&
                      (e.pagination.dynamicBulletIndex = 0)),
                (l = i - e.pagination.dynamicBulletIndex),
                (d =
                  ((o = l + (Math.min(p.length, a.dynamicMainBullets) - 1)) +
                    l) /
                  2)),
              p.removeClass(
                a.bulletActiveClass +
                  " " +
                  a.bulletActiveClass +
                  "-next " +
                  a.bulletActiveClass +
                  "-next-next " +
                  a.bulletActiveClass +
                  "-prev " +
                  a.bulletActiveClass +
                  "-prev-prev " +
                  a.bulletActiveClass +
                  "-main"
              ),
              r.length > 1)
            )
              p.each(function (e) {
                var t = m(e),
                  s = t.index();
                s === i && t.addClass(a.bulletActiveClass),
                  a.dynamicBullets &&
                    (s >= l &&
                      s <= o &&
                      t.addClass(a.bulletActiveClass + "-main"),
                    s === l &&
                      t
                        .prev()
                        .addClass(a.bulletActiveClass + "-prev")
                        .prev()
                        .addClass(a.bulletActiveClass + "-prev-prev"),
                    s === o &&
                      t
                        .next()
                        .addClass(a.bulletActiveClass + "-next")
                        .next()
                        .addClass(a.bulletActiveClass + "-next-next"));
              });
            else {
              var u = p.eq(i),
                c = u.index();
              if ((u.addClass(a.bulletActiveClass), a.dynamicBullets)) {
                for (var h = p.eq(l), v = p.eq(o), f = l; f <= o; f += 1)
                  p.eq(f).addClass(a.bulletActiveClass + "-main");
                if (e.params.loop)
                  if (c >= p.length - a.dynamicMainBullets) {
                    for (var g = a.dynamicMainBullets; g >= 0; g -= 1)
                      p.eq(p.length - g).addClass(
                        a.bulletActiveClass + "-main"
                      );
                    p.eq(p.length - a.dynamicMainBullets - 1).addClass(
                      a.bulletActiveClass + "-prev"
                    );
                  } else
                    h
                      .prev()
                      .addClass(a.bulletActiveClass + "-prev")
                      .prev()
                      .addClass(a.bulletActiveClass + "-prev-prev"),
                      v
                        .next()
                        .addClass(a.bulletActiveClass + "-next")
                        .next()
                        .addClass(a.bulletActiveClass + "-next-next");
                else
                  h
                    .prev()
                    .addClass(a.bulletActiveClass + "-prev")
                    .prev()
                    .addClass(a.bulletActiveClass + "-prev-prev"),
                    v
                      .next()
                      .addClass(a.bulletActiveClass + "-next")
                      .next()
                      .addClass(a.bulletActiveClass + "-next-next");
              }
            }
            if (a.dynamicBullets) {
              var b = Math.min(p.length, a.dynamicMainBullets + 4),
                y =
                  (e.pagination.bulletSize * b - e.pagination.bulletSize) / 2 -
                  d * e.pagination.bulletSize,
                w = t ? "right" : "left";
              p.css(e.isHorizontal() ? w : "top", y + "px");
            }
          }
          if (
            ("fraction" === a.type &&
              (r.find(z(a.currentClass)).text(a.formatFractionCurrent(i + 1)),
              r.find(z(a.totalClass)).text(a.formatFractionTotal(n))),
            "progressbar" === a.type)
          ) {
            var E;
            E = a.progressbarOpposite
              ? e.isHorizontal()
                ? "vertical"
                : "horizontal"
              : e.isHorizontal()
              ? "horizontal"
              : "vertical";
            var x = (i + 1) / n,
              T = 1,
              C = 1;
            "horizontal" === E ? (T = x) : (C = x),
              r
                .find(z(a.progressbarFillClass))
                .transform(
                  "translate3d(0,0,0) scaleX(" + T + ") scaleY(" + C + ")"
                )
                .transition(e.params.speed);
          }
          "custom" === a.type && a.renderCustom
            ? (r.html(a.renderCustom(e, i + 1, n)),
              e.emit("paginationRender", r[0]))
            : e.emit("paginationUpdate", r[0]),
            e.params.watchOverflow &&
              e.enabled &&
              r[e.isLocked ? "addClass" : "removeClass"](a.lockClass);
        }
      },
      render: function () {
        var e = this,
          t = e.params.pagination;
        if (
          t.el &&
          e.pagination.el &&
          e.pagination.$el &&
          0 !== e.pagination.$el.length
        ) {
          var a =
              e.virtual && e.params.virtual.enabled
                ? e.virtual.slides.length
                : e.slides.length,
            i = e.pagination.$el,
            s = "";
          if ("bullets" === t.type) {
            var r = e.params.loop
              ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup)
              : e.snapGrid.length;
            e.params.freeMode && !e.params.loop && r > a && (r = a);
            for (var n = 0; n < r; n += 1)
              t.renderBullet
                ? (s += t.renderBullet.call(e, n, t.bulletClass))
                : (s +=
                    "<" +
                    t.bulletElement +
                    ' class="' +
                    t.bulletClass +
                    '"></' +
                    t.bulletElement +
                    ">");
            i.html(s), (e.pagination.bullets = i.find(z(t.bulletClass)));
          }
          "fraction" === t.type &&
            ((s = t.renderFraction
              ? t.renderFraction.call(e, t.currentClass, t.totalClass)
              : '<span class="' +
                t.currentClass +
                '"></span> / <span class="' +
                t.totalClass +
                '"></span>'),
            i.html(s)),
            "progressbar" === t.type &&
              ((s = t.renderProgressbar
                ? t.renderProgressbar.call(e, t.progressbarFillClass)
                : '<span class="' + t.progressbarFillClass + '"></span>'),
              i.html(s)),
            "custom" !== t.type &&
              e.emit("paginationRender", e.pagination.$el[0]);
        }
      },
      init: function () {
        var e = this,
          t = e.params.pagination;
        if (t.el) {
          var a = m(t.el);
          0 !== a.length &&
            (e.params.uniqueNavElements &&
              "string" == typeof t.el &&
              a.length > 1 &&
              (a = e.$el.find(t.el)),
            "bullets" === t.type && t.clickable && a.addClass(t.clickableClass),
            a.addClass(t.modifierClass + t.type),
            "bullets" === t.type &&
              t.dynamicBullets &&
              (a.addClass("" + t.modifierClass + t.type + "-dynamic"),
              (e.pagination.dynamicBulletIndex = 0),
              t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
            "progressbar" === t.type &&
              t.progressbarOpposite &&
              a.addClass(t.progressbarOppositeClass),
            t.clickable &&
              a.on("click", z(t.bulletClass), function (t) {
                t.preventDefault();
                var a = m(this).index() * e.params.slidesPerGroup;
                e.params.loop && (a += e.loopedSlides), e.slideTo(a);
              }),
            S(e.pagination, { $el: a, el: a[0] }),
            e.enabled || a.addClass(t.lockClass));
        }
      },
      destroy: function () {
        var e = this,
          t = e.params.pagination;
        if (
          t.el &&
          e.pagination.el &&
          e.pagination.$el &&
          0 !== e.pagination.$el.length
        ) {
          var a = e.pagination.$el;
          a.removeClass(t.hiddenClass),
            a.removeClass(t.modifierClass + t.type),
            e.pagination.bullets &&
              e.pagination.bullets.removeClass(t.bulletActiveClass),
            t.clickable && a.off("click", z(t.bulletClass));
        }
      },
    },
    Q = {
      setTranslate: function () {
        var e = this;
        if (e.params.scrollbar.el && e.scrollbar.el) {
          var t = e.scrollbar,
            a = e.rtlTranslate,
            i = e.progress,
            s = t.dragSize,
            r = t.trackSize,
            n = t.$dragEl,
            l = t.$el,
            o = e.params.scrollbar,
            d = s,
            p = (r - s) * i;
          a
            ? (p = -p) > 0
              ? ((d = s - p), (p = 0))
              : -p + s > r && (d = r + p)
            : p < 0
            ? ((d = s + p), (p = 0))
            : p + s > r && (d = r - p),
            e.isHorizontal()
              ? (n.transform("translate3d(" + p + "px, 0, 0)"),
                (n[0].style.width = d + "px"))
              : (n.transform("translate3d(0px, " + p + "px, 0)"),
                (n[0].style.height = d + "px")),
            o.hide &&
              (clearTimeout(e.scrollbar.timeout),
              (l[0].style.opacity = 1),
              (e.scrollbar.timeout = setTimeout(function () {
                (l[0].style.opacity = 0), l.transition(400);
              }, 1e3)));
        }
      },
      setTransition: function (e) {
        var t = this;
        t.params.scrollbar.el &&
          t.scrollbar.el &&
          t.scrollbar.$dragEl.transition(e);
      },
      updateSize: function () {
        var e = this;
        if (e.params.scrollbar.el && e.scrollbar.el) {
          var t = e.scrollbar,
            a = t.$dragEl,
            i = t.$el;
          (a[0].style.width = ""), (a[0].style.height = "");
          var s,
            r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
            n = e.size / e.virtualSize,
            l = n * (r / e.size);
          (s =
            "auto" === e.params.scrollbar.dragSize
              ? r * n
              : parseInt(e.params.scrollbar.dragSize, 10)),
            e.isHorizontal()
              ? (a[0].style.width = s + "px")
              : (a[0].style.height = s + "px"),
            (i[0].style.display = n >= 1 ? "none" : ""),
            e.params.scrollbar.hide && (i[0].style.opacity = 0),
            S(t, { trackSize: r, divider: n, moveDivider: l, dragSize: s }),
            e.params.watchOverflow &&
              e.enabled &&
              t.$el[e.isLocked ? "addClass" : "removeClass"](
                e.params.scrollbar.lockClass
              );
        }
      },
      getPointerPosition: function (e) {
        return this.isHorizontal()
          ? "touchstart" === e.type || "touchmove" === e.type
            ? e.targetTouches[0].clientX
            : e.clientX
          : "touchstart" === e.type || "touchmove" === e.type
          ? e.targetTouches[0].clientY
          : e.clientY;
      },
      setDragPosition: function (e) {
        var t,
          a = this,
          i = a.scrollbar,
          s = a.rtlTranslate,
          r = i.$el,
          n = i.dragSize,
          l = i.trackSize,
          o = i.dragStartPos;
        (t =
          (i.getPointerPosition(e) -
            r.offset()[a.isHorizontal() ? "left" : "top"] -
            (null !== o ? o : n / 2)) /
          (l - n)),
          (t = Math.max(Math.min(t, 1), 0)),
          s && (t = 1 - t);
        var d = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
        a.updateProgress(d),
          a.setTranslate(d),
          a.updateActiveIndex(),
          a.updateSlidesClasses();
      },
      onDragStart: function (e) {
        var t = this,
          a = t.params.scrollbar,
          i = t.scrollbar,
          s = t.$wrapperEl,
          r = i.$el,
          n = i.$dragEl;
        (t.scrollbar.isTouched = !0),
          (t.scrollbar.dragStartPos =
            e.target === n[0] || e.target === n
              ? i.getPointerPosition(e) -
                e.target.getBoundingClientRect()[
                  t.isHorizontal() ? "left" : "top"
                ]
              : null),
          e.preventDefault(),
          e.stopPropagation(),
          s.transition(100),
          n.transition(100),
          i.setDragPosition(e),
          clearTimeout(t.scrollbar.dragTimeout),
          r.transition(0),
          a.hide && r.css("opacity", 1),
          t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"),
          t.emit("scrollbarDragStart", e);
      },
      onDragMove: function (e) {
        var t = this,
          a = t.scrollbar,
          i = t.$wrapperEl,
          s = a.$el,
          r = a.$dragEl;
        t.scrollbar.isTouched &&
          (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
          a.setDragPosition(e),
          i.transition(0),
          s.transition(0),
          r.transition(0),
          t.emit("scrollbarDragMove", e));
      },
      onDragEnd: function (e) {
        var t = this,
          a = t.params.scrollbar,
          i = t.scrollbar,
          s = t.$wrapperEl,
          r = i.$el;
        t.scrollbar.isTouched &&
          ((t.scrollbar.isTouched = !1),
          t.params.cssMode &&
            (t.$wrapperEl.css("scroll-snap-type", ""), s.transition("")),
          a.hide &&
            (clearTimeout(t.scrollbar.dragTimeout),
            (t.scrollbar.dragTimeout = E(function () {
              r.css("opacity", 0), r.transition(400);
            }, 1e3))),
          t.emit("scrollbarDragEnd", e),
          a.snapOnRelease && t.slideToClosest());
      },
      enableDraggable: function () {
        var e = this;
        if (e.params.scrollbar.el) {
          var t = r(),
            a = e.scrollbar,
            i = e.touchEventsTouch,
            s = e.touchEventsDesktop,
            n = e.params,
            l = e.support,
            o = a.$el[0],
            d = !(!l.passiveListener || !n.passiveListeners) && {
              passive: !1,
              capture: !1,
            },
            p = !(!l.passiveListener || !n.passiveListeners) && {
              passive: !0,
              capture: !1,
            };
          o &&
            (l.touch
              ? (o.addEventListener(i.start, e.scrollbar.onDragStart, d),
                o.addEventListener(i.move, e.scrollbar.onDragMove, d),
                o.addEventListener(i.end, e.scrollbar.onDragEnd, p))
              : (o.addEventListener(s.start, e.scrollbar.onDragStart, d),
                t.addEventListener(s.move, e.scrollbar.onDragMove, d),
                t.addEventListener(s.end, e.scrollbar.onDragEnd, p)));
        }
      },
      disableDraggable: function () {
        var e = this;
        if (e.params.scrollbar.el) {
          var t = r(),
            a = e.scrollbar,
            i = e.touchEventsTouch,
            s = e.touchEventsDesktop,
            n = e.params,
            l = e.support,
            o = a.$el[0],
            d = !(!l.passiveListener || !n.passiveListeners) && {
              passive: !1,
              capture: !1,
            },
            p = !(!l.passiveListener || !n.passiveListeners) && {
              passive: !0,
              capture: !1,
            };
          o &&
            (l.touch
              ? (o.removeEventListener(i.start, e.scrollbar.onDragStart, d),
                o.removeEventListener(i.move, e.scrollbar.onDragMove, d),
                o.removeEventListener(i.end, e.scrollbar.onDragEnd, p))
              : (o.removeEventListener(s.start, e.scrollbar.onDragStart, d),
                t.removeEventListener(s.move, e.scrollbar.onDragMove, d),
                t.removeEventListener(s.end, e.scrollbar.onDragEnd, p)));
        }
      },
      init: function () {
        var e = this;
        if (e.params.scrollbar.el) {
          var t = e.scrollbar,
            a = e.$el,
            i = e.params.scrollbar,
            s = m(i.el);
          e.params.uniqueNavElements &&
            "string" == typeof i.el &&
            s.length > 1 &&
            1 === a.find(i.el).length &&
            (s = a.find(i.el));
          var r = s.find("." + e.params.scrollbar.dragClass);
          0 === r.length &&
            ((r = m(
              '<div class="' + e.params.scrollbar.dragClass + '"></div>'
            )),
            s.append(r)),
            S(t, { $el: s, el: s[0], $dragEl: r, dragEl: r[0] }),
            i.draggable && t.enableDraggable(),
            s &&
              s[e.enabled ? "removeClass" : "addClass"](
                e.params.scrollbar.lockClass
              );
        }
      },
      destroy: function () {
        this.scrollbar.disableDraggable();
      },
    },
    ee = {
      setTransform: function (e, t) {
        var a = this.rtl,
          i = m(e),
          s = a ? -1 : 1,
          r = i.attr("data-swiper-parallax") || "0",
          n = i.attr("data-swiper-parallax-x"),
          l = i.attr("data-swiper-parallax-y"),
          o = i.attr("data-swiper-parallax-scale"),
          d = i.attr("data-swiper-parallax-opacity");
        if (
          (n || l
            ? ((n = n || "0"), (l = l || "0"))
            : this.isHorizontal()
            ? ((n = r), (l = "0"))
            : ((l = r), (n = "0")),
          (n =
            n.indexOf("%") >= 0
              ? parseInt(n, 10) * t * s + "%"
              : n * t * s + "px"),
          (l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px"),
          null != d)
        ) {
          var p = d - (d - 1) * (1 - Math.abs(t));
          i[0].style.opacity = p;
        }
        if (null == o) i.transform("translate3d(" + n + ", " + l + ", 0px)");
        else {
          var u = o - (o - 1) * (1 - Math.abs(t));
          i.transform(
            "translate3d(" + n + ", " + l + ", 0px) scale(" + u + ")"
          );
        }
      },
      setTranslate: function () {
        var e = this,
          t = e.$el,
          a = e.slides,
          i = e.progress,
          s = e.snapGrid;
        t
          .children(
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
          )
          .each(function (t) {
            e.parallax.setTransform(t, i);
          }),
          a.each(function (t, a) {
            var r = t.progress;
            e.params.slidesPerGroup > 1 &&
              "auto" !== e.params.slidesPerView &&
              (r += Math.ceil(a / 2) - i * (s.length - 1)),
              (r = Math.min(Math.max(r, -1), 1)),
              m(t)
                .find(
                  "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                )
                .each(function (t) {
                  e.parallax.setTransform(t, r);
                });
          });
      },
      setTransition: function (e) {
        void 0 === e && (e = this.params.speed);
        this.$el
          .find(
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
          )
          .each(function (t) {
            var a = m(t),
              i = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
            0 === e && (i = 0), a.transition(i);
          });
      },
    },
    te = {
      getDistanceBetweenTouches: function (e) {
        if (e.targetTouches.length < 2) return 1;
        var t = e.targetTouches[0].pageX,
          a = e.targetTouches[0].pageY,
          i = e.targetTouches[1].pageX,
          s = e.targetTouches[1].pageY;
        return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2));
      },
      onGestureStart: function (e) {
        var t = this,
          a = t.support,
          i = t.params.zoom,
          s = t.zoom,
          r = s.gesture;
        if (
          ((s.fakeGestureTouched = !1), (s.fakeGestureMoved = !1), !a.gestures)
        ) {
          if (
            "touchstart" !== e.type ||
            ("touchstart" === e.type && e.targetTouches.length < 2)
          )
            return;
          (s.fakeGestureTouched = !0),
            (r.scaleStart = te.getDistanceBetweenTouches(e));
        }
        (r.$slideEl && r.$slideEl.length) ||
        ((r.$slideEl = m(e.target).closest("." + t.params.slideClass)),
        0 === r.$slideEl.length && (r.$slideEl = t.slides.eq(t.activeIndex)),
        (r.$imageEl = r.$slideEl.find(
          "img, svg, canvas, picture, .swiper-zoom-target"
        )),
        (r.$imageWrapEl = r.$imageEl.parent("." + i.containerClass)),
        (r.maxRatio = r.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio),
        0 !== r.$imageWrapEl.length)
          ? (r.$imageEl && r.$imageEl.transition(0), (t.zoom.isScaling = !0))
          : (r.$imageEl = void 0);
      },
      onGestureChange: function (e) {
        var t = this,
          a = t.support,
          i = t.params.zoom,
          s = t.zoom,
          r = s.gesture;
        if (!a.gestures) {
          if (
            "touchmove" !== e.type ||
            ("touchmove" === e.type && e.targetTouches.length < 2)
          )
            return;
          (s.fakeGestureMoved = !0),
            (r.scaleMove = te.getDistanceBetweenTouches(e));
        }
        r.$imageEl && 0 !== r.$imageEl.length
          ? (a.gestures
              ? (s.scale = e.scale * s.currentScale)
              : (s.scale = (r.scaleMove / r.scaleStart) * s.currentScale),
            s.scale > r.maxRatio &&
              (s.scale =
                r.maxRatio - 1 + Math.pow(s.scale - r.maxRatio + 1, 0.5)),
            s.scale < i.minRatio &&
              (s.scale =
                i.minRatio + 1 - Math.pow(i.minRatio - s.scale + 1, 0.5)),
            r.$imageEl.transform("translate3d(0,0,0) scale(" + s.scale + ")"))
          : "gesturechange" === e.type && s.onGestureStart(e);
      },
      onGestureEnd: function (e) {
        var t = this,
          a = t.device,
          i = t.support,
          s = t.params.zoom,
          r = t.zoom,
          n = r.gesture;
        if (!i.gestures) {
          if (!r.fakeGestureTouched || !r.fakeGestureMoved) return;
          if (
            "touchend" !== e.type ||
            ("touchend" === e.type && e.changedTouches.length < 2 && !a.android)
          )
            return;
          (r.fakeGestureTouched = !1), (r.fakeGestureMoved = !1);
        }
        n.$imageEl &&
          0 !== n.$imageEl.length &&
          ((r.scale = Math.max(Math.min(r.scale, n.maxRatio), s.minRatio)),
          n.$imageEl
            .transition(t.params.speed)
            .transform("translate3d(0,0,0) scale(" + r.scale + ")"),
          (r.currentScale = r.scale),
          (r.isScaling = !1),
          1 === r.scale && (n.$slideEl = void 0));
      },
      onTouchStart: function (e) {
        var t = this.device,
          a = this.zoom,
          i = a.gesture,
          s = a.image;
        i.$imageEl &&
          0 !== i.$imageEl.length &&
          (s.isTouched ||
            (t.android && e.cancelable && e.preventDefault(),
            (s.isTouched = !0),
            (s.touchesStart.x =
              "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX),
            (s.touchesStart.y =
              "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY)));
      },
      onTouchMove: function (e) {
        var t = this,
          a = t.zoom,
          i = a.gesture,
          s = a.image,
          r = a.velocity;
        if (
          i.$imageEl &&
          0 !== i.$imageEl.length &&
          ((t.allowClick = !1), s.isTouched && i.$slideEl)
        ) {
          s.isMoved ||
            ((s.width = i.$imageEl[0].offsetWidth),
            (s.height = i.$imageEl[0].offsetHeight),
            (s.startX = T(i.$imageWrapEl[0], "x") || 0),
            (s.startY = T(i.$imageWrapEl[0], "y") || 0),
            (i.slideWidth = i.$slideEl[0].offsetWidth),
            (i.slideHeight = i.$slideEl[0].offsetHeight),
            i.$imageWrapEl.transition(0),
            t.rtl && ((s.startX = -s.startX), (s.startY = -s.startY)));
          var n = s.width * a.scale,
            l = s.height * a.scale;
          if (!(n < i.slideWidth && l < i.slideHeight)) {
            if (
              ((s.minX = Math.min(i.slideWidth / 2 - n / 2, 0)),
              (s.maxX = -s.minX),
              (s.minY = Math.min(i.slideHeight / 2 - l / 2, 0)),
              (s.maxY = -s.minY),
              (s.touchesCurrent.x =
                "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
              (s.touchesCurrent.y =
                "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
              !s.isMoved && !a.isScaling)
            ) {
              if (
                t.isHorizontal() &&
                ((Math.floor(s.minX) === Math.floor(s.startX) &&
                  s.touchesCurrent.x < s.touchesStart.x) ||
                  (Math.floor(s.maxX) === Math.floor(s.startX) &&
                    s.touchesCurrent.x > s.touchesStart.x))
              )
                return void (s.isTouched = !1);
              if (
                !t.isHorizontal() &&
                ((Math.floor(s.minY) === Math.floor(s.startY) &&
                  s.touchesCurrent.y < s.touchesStart.y) ||
                  (Math.floor(s.maxY) === Math.floor(s.startY) &&
                    s.touchesCurrent.y > s.touchesStart.y))
              )
                return void (s.isTouched = !1);
            }
            e.cancelable && e.preventDefault(),
              e.stopPropagation(),
              (s.isMoved = !0),
              (s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX),
              (s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY),
              s.currentX < s.minX &&
                (s.currentX =
                  s.minX + 1 - Math.pow(s.minX - s.currentX + 1, 0.8)),
              s.currentX > s.maxX &&
                (s.currentX =
                  s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, 0.8)),
              s.currentY < s.minY &&
                (s.currentY =
                  s.minY + 1 - Math.pow(s.minY - s.currentY + 1, 0.8)),
              s.currentY > s.maxY &&
                (s.currentY =
                  s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, 0.8)),
              r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x),
              r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y),
              r.prevTime || (r.prevTime = Date.now()),
              (r.x =
                (s.touchesCurrent.x - r.prevPositionX) /
                (Date.now() - r.prevTime) /
                2),
              (r.y =
                (s.touchesCurrent.y - r.prevPositionY) /
                (Date.now() - r.prevTime) /
                2),
              Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0),
              Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0),
              (r.prevPositionX = s.touchesCurrent.x),
              (r.prevPositionY = s.touchesCurrent.y),
              (r.prevTime = Date.now()),
              i.$imageWrapEl.transform(
                "translate3d(" + s.currentX + "px, " + s.currentY + "px,0)"
              );
          }
        }
      },
      onTouchEnd: function () {
        var e = this.zoom,
          t = e.gesture,
          a = e.image,
          i = e.velocity;
        if (t.$imageEl && 0 !== t.$imageEl.length) {
          if (!a.isTouched || !a.isMoved)
            return (a.isTouched = !1), void (a.isMoved = !1);
          (a.isTouched = !1), (a.isMoved = !1);
          var s = 300,
            r = 300,
            n = i.x * s,
            l = a.currentX + n,
            o = i.y * r,
            d = a.currentY + o;
          0 !== i.x && (s = Math.abs((l - a.currentX) / i.x)),
            0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
          var p = Math.max(s, r);
          (a.currentX = l), (a.currentY = d);
          var u = a.width * e.scale,
            c = a.height * e.scale;
          (a.minX = Math.min(t.slideWidth / 2 - u / 2, 0)),
            (a.maxX = -a.minX),
            (a.minY = Math.min(t.slideHeight / 2 - c / 2, 0)),
            (a.maxY = -a.minY),
            (a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX)),
            (a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY)),
            t.$imageWrapEl
              .transition(p)
              .transform(
                "translate3d(" + a.currentX + "px, " + a.currentY + "px,0)"
              );
        }
      },
      onTransitionEnd: function () {
        var e = this,
          t = e.zoom,
          a = t.gesture;
        a.$slideEl &&
          e.previousIndex !== e.activeIndex &&
          (a.$imageEl && a.$imageEl.transform("translate3d(0,0,0) scale(1)"),
          a.$imageWrapEl && a.$imageWrapEl.transform("translate3d(0,0,0)"),
          (t.scale = 1),
          (t.currentScale = 1),
          (a.$slideEl = void 0),
          (a.$imageEl = void 0),
          (a.$imageWrapEl = void 0));
      },
      toggle: function (e) {
        var t = this.zoom;
        t.scale && 1 !== t.scale ? t.out() : t.in(e);
      },
      in: function (e) {
        var t,
          a,
          i,
          s,
          r,
          n,
          o,
          d,
          p,
          u,
          c,
          h,
          v,
          f,
          m,
          g,
          b = this,
          y = l(),
          w = b.zoom,
          E = b.params.zoom,
          x = w.gesture,
          T = w.image;
        (x.$slideEl ||
          (b.params.virtual && b.params.virtual.enabled && b.virtual
            ? (x.$slideEl = b.$wrapperEl.children(
                "." + b.params.slideActiveClass
              ))
            : (x.$slideEl = b.slides.eq(b.activeIndex)),
          (x.$imageEl = x.$slideEl.find(
            "img, svg, canvas, picture, .swiper-zoom-target"
          )),
          (x.$imageWrapEl = x.$imageEl.parent("." + E.containerClass))),
        x.$imageEl &&
          0 !== x.$imageEl.length &&
          x.$imageWrapEl &&
          0 !== x.$imageWrapEl.length) &&
          (x.$slideEl.addClass("" + E.zoomedSlideClass),
          void 0 === T.touchesStart.x && e
            ? ((t =
                "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX),
              (a = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY))
            : ((t = T.touchesStart.x), (a = T.touchesStart.y)),
          (w.scale = x.$imageWrapEl.attr("data-swiper-zoom") || E.maxRatio),
          (w.currentScale =
            x.$imageWrapEl.attr("data-swiper-zoom") || E.maxRatio),
          e
            ? ((m = x.$slideEl[0].offsetWidth),
              (g = x.$slideEl[0].offsetHeight),
              (i = x.$slideEl.offset().left + y.scrollX + m / 2 - t),
              (s = x.$slideEl.offset().top + y.scrollY + g / 2 - a),
              (o = x.$imageEl[0].offsetWidth),
              (d = x.$imageEl[0].offsetHeight),
              (p = o * w.scale),
              (u = d * w.scale),
              (v = -(c = Math.min(m / 2 - p / 2, 0))),
              (f = -(h = Math.min(g / 2 - u / 2, 0))),
              (r = i * w.scale) < c && (r = c),
              r > v && (r = v),
              (n = s * w.scale) < h && (n = h),
              n > f && (n = f))
            : ((r = 0), (n = 0)),
          x.$imageWrapEl
            .transition(300)
            .transform("translate3d(" + r + "px, " + n + "px,0)"),
          x.$imageEl
            .transition(300)
            .transform("translate3d(0,0,0) scale(" + w.scale + ")"));
      },
      out: function () {
        var e = this,
          t = e.zoom,
          a = e.params.zoom,
          i = t.gesture;
        i.$slideEl ||
          (e.params.virtual && e.params.virtual.enabled && e.virtual
            ? (i.$slideEl = e.$wrapperEl.children(
                "." + e.params.slideActiveClass
              ))
            : (i.$slideEl = e.slides.eq(e.activeIndex)),
          (i.$imageEl = i.$slideEl.find(
            "img, svg, canvas, picture, .swiper-zoom-target"
          )),
          (i.$imageWrapEl = i.$imageEl.parent("." + a.containerClass))),
          i.$imageEl &&
            0 !== i.$imageEl.length &&
            i.$imageWrapEl &&
            0 !== i.$imageWrapEl.length &&
            ((t.scale = 1),
            (t.currentScale = 1),
            i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
            i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
            i.$slideEl.removeClass("" + a.zoomedSlideClass),
            (i.$slideEl = void 0));
      },
      toggleGestures: function (e) {
        var t = this,
          a = t.zoom,
          i = a.slideSelector,
          s = a.passiveListener;
        t.$wrapperEl[e]("gesturestart", i, a.onGestureStart, s),
          t.$wrapperEl[e]("gesturechange", i, a.onGestureChange, s),
          t.$wrapperEl[e]("gestureend", i, a.onGestureEnd, s);
      },
      enableGestures: function () {
        this.zoom.gesturesEnabled ||
          ((this.zoom.gesturesEnabled = !0), this.zoom.toggleGestures("on"));
      },
      disableGestures: function () {
        this.zoom.gesturesEnabled &&
          ((this.zoom.gesturesEnabled = !1), this.zoom.toggleGestures("off"));
      },
      enable: function () {
        var e = this,
          t = e.support,
          a = e.zoom;
        if (!a.enabled) {
          a.enabled = !0;
          var i = !(
              "touchstart" !== e.touchEvents.start ||
              !t.passiveListener ||
              !e.params.passiveListeners
            ) && { passive: !0, capture: !1 },
            s = !t.passiveListener || { passive: !1, capture: !0 },
            r = "." + e.params.slideClass;
          (e.zoom.passiveListener = i),
            (e.zoom.slideSelector = r),
            t.gestures
              ? (e.$wrapperEl.on(e.touchEvents.start, e.zoom.enableGestures, i),
                e.$wrapperEl.on(e.touchEvents.end, e.zoom.disableGestures, i))
              : "touchstart" === e.touchEvents.start &&
                (e.$wrapperEl.on(e.touchEvents.start, r, a.onGestureStart, i),
                e.$wrapperEl.on(e.touchEvents.move, r, a.onGestureChange, s),
                e.$wrapperEl.on(e.touchEvents.end, r, a.onGestureEnd, i),
                e.touchEvents.cancel &&
                  e.$wrapperEl.on(e.touchEvents.cancel, r, a.onGestureEnd, i)),
            e.$wrapperEl.on(
              e.touchEvents.move,
              "." + e.params.zoom.containerClass,
              a.onTouchMove,
              s
            );
        }
      },
      disable: function () {
        var e = this,
          t = e.zoom;
        if (t.enabled) {
          var a = e.support;
          e.zoom.enabled = !1;
          var i = !(
              "touchstart" !== e.touchEvents.start ||
              !a.passiveListener ||
              !e.params.passiveListeners
            ) && { passive: !0, capture: !1 },
            s = !a.passiveListener || { passive: !1, capture: !0 },
            r = "." + e.params.slideClass;
          a.gestures
            ? (e.$wrapperEl.off(e.touchEvents.start, e.zoom.enableGestures, i),
              e.$wrapperEl.off(e.touchEvents.end, e.zoom.disableGestures, i))
            : "touchstart" === e.touchEvents.start &&
              (e.$wrapperEl.off(e.touchEvents.start, r, t.onGestureStart, i),
              e.$wrapperEl.off(e.touchEvents.move, r, t.onGestureChange, s),
              e.$wrapperEl.off(e.touchEvents.end, r, t.onGestureEnd, i),
              e.touchEvents.cancel &&
                e.$wrapperEl.off(e.touchEvents.cancel, r, t.onGestureEnd, i)),
            e.$wrapperEl.off(
              e.touchEvents.move,
              "." + e.params.zoom.containerClass,
              t.onTouchMove,
              s
            );
        }
      },
    },
    ae = {
      loadInSlide: function (e, t) {
        void 0 === t && (t = !0);
        var a = this,
          i = a.params.lazy;
        if (void 0 !== e && 0 !== a.slides.length) {
          var s =
              a.virtual && a.params.virtual.enabled
                ? a.$wrapperEl.children(
                    "." +
                      a.params.slideClass +
                      '[data-swiper-slide-index="' +
                      e +
                      '"]'
                  )
                : a.slides.eq(e),
            r = s.find(
              "." +
                i.elementClass +
                ":not(." +
                i.loadedClass +
                "):not(." +
                i.loadingClass +
                ")"
            );
          !s.hasClass(i.elementClass) ||
            s.hasClass(i.loadedClass) ||
            s.hasClass(i.loadingClass) ||
            r.push(s[0]),
            0 !== r.length &&
              r.each(function (e) {
                var r = m(e);
                r.addClass(i.loadingClass);
                var n = r.attr("data-background"),
                  l = r.attr("data-src"),
                  o = r.attr("data-srcset"),
                  d = r.attr("data-sizes"),
                  p = r.parent("picture");
                a.loadImage(r[0], l || n, o, d, !1, function () {
                  if (null != a && a && (!a || a.params) && !a.destroyed) {
                    if (
                      (n
                        ? (r.css("background-image", 'url("' + n + '")'),
                          r.removeAttr("data-background"))
                        : (o &&
                            (r.attr("srcset", o), r.removeAttr("data-srcset")),
                          d && (r.attr("sizes", d), r.removeAttr("data-sizes")),
                          p.length &&
                            p.children("source").each(function (e) {
                              var t = m(e);
                              t.attr("data-srcset") &&
                                (t.attr("srcset", t.attr("data-srcset")),
                                t.removeAttr("data-srcset"));
                            }),
                          l && (r.attr("src", l), r.removeAttr("data-src"))),
                      r.addClass(i.loadedClass).removeClass(i.loadingClass),
                      s.find("." + i.preloaderClass).remove(),
                      a.params.loop && t)
                    ) {
                      var e = s.attr("data-swiper-slide-index");
                      if (s.hasClass(a.params.slideDuplicateClass)) {
                        var u = a.$wrapperEl.children(
                          '[data-swiper-slide-index="' +
                            e +
                            '"]:not(.' +
                            a.params.slideDuplicateClass +
                            ")"
                        );
                        a.lazy.loadInSlide(u.index(), !1);
                      } else {
                        var c = a.$wrapperEl.children(
                          "." +
                            a.params.slideDuplicateClass +
                            '[data-swiper-slide-index="' +
                            e +
                            '"]'
                        );
                        a.lazy.loadInSlide(c.index(), !1);
                      }
                    }
                    a.emit("lazyImageReady", s[0], r[0]),
                      a.params.autoHeight && a.updateAutoHeight();
                  }
                }),
                  a.emit("lazyImageLoad", s[0], r[0]);
              });
        }
      },
      load: function () {
        var e = this,
          t = e.$wrapperEl,
          a = e.params,
          i = e.slides,
          s = e.activeIndex,
          r = e.virtual && a.virtual.enabled,
          n = a.lazy,
          l = a.slidesPerView;
        function o(e) {
          if (r) {
            if (
              t.children(
                "." + a.slideClass + '[data-swiper-slide-index="' + e + '"]'
              ).length
            )
              return !0;
          } else if (i[e]) return !0;
          return !1;
        }
        function d(e) {
          return r ? m(e).attr("data-swiper-slide-index") : m(e).index();
        }
        if (
          ("auto" === l && (l = 0),
          e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0),
          e.params.watchSlidesVisibility)
        )
          t.children("." + a.slideVisibleClass).each(function (t) {
            var a = r ? m(t).attr("data-swiper-slide-index") : m(t).index();
            e.lazy.loadInSlide(a);
          });
        else if (l > 1)
          for (var p = s; p < s + l; p += 1) o(p) && e.lazy.loadInSlide(p);
        else e.lazy.loadInSlide(s);
        if (n.loadPrevNext)
          if (l > 1 || (n.loadPrevNextAmount && n.loadPrevNextAmount > 1)) {
            for (
              var u = n.loadPrevNextAmount,
                c = l,
                h = Math.min(s + c + Math.max(u, c), i.length),
                v = Math.max(s - Math.max(c, u), 0),
                f = s + l;
              f < h;
              f += 1
            )
              o(f) && e.lazy.loadInSlide(f);
            for (var g = v; g < s; g += 1) o(g) && e.lazy.loadInSlide(g);
          } else {
            var b = t.children("." + a.slideNextClass);
            b.length > 0 && e.lazy.loadInSlide(d(b));
            var y = t.children("." + a.slidePrevClass);
            y.length > 0 && e.lazy.loadInSlide(d(y));
          }
      },
      checkInViewOnLoad: function () {
        var e = l(),
          t = this;
        if (t && !t.destroyed) {
          var a = t.params.lazy.scrollingElement
              ? m(t.params.lazy.scrollingElement)
              : m(e),
            i = a[0] === e,
            s = i ? e.innerWidth : a[0].offsetWidth,
            r = i ? e.innerHeight : a[0].offsetHeight,
            n = t.$el.offset(),
            o = !1;
          t.rtlTranslate && (n.left -= t.$el[0].scrollLeft);
          for (
            var d = [
                [n.left, n.top],
                [n.left + t.width, n.top],
                [n.left, n.top + t.height],
                [n.left + t.width, n.top + t.height],
              ],
              p = 0;
            p < d.length;
            p += 1
          ) {
            var u = d[p];
            if (u[0] >= 0 && u[0] <= s && u[1] >= 0 && u[1] <= r) {
              if (0 === u[0] && 0 === u[1]) continue;
              o = !0;
            }
          }
          o
            ? (t.lazy.load(), a.off("scroll", t.lazy.checkInViewOnLoad))
            : t.lazy.scrollHandlerAttached ||
              ((t.lazy.scrollHandlerAttached = !0),
              a.on("scroll", t.lazy.checkInViewOnLoad));
        }
      },
    },
    ie = {
      LinearSpline: function (e, t) {
        var a,
          i,
          s,
          r,
          n,
          l = function (e, t) {
            for (i = -1, a = e.length; a - i > 1; )
              e[(s = (a + i) >> 1)] <= t ? (i = s) : (a = s);
            return a;
          };
        return (
          (this.x = e),
          (this.y = t),
          (this.lastIndex = e.length - 1),
          (this.interpolate = function (e) {
            return e
              ? ((n = l(this.x, e)),
                (r = n - 1),
                ((e - this.x[r]) * (this.y[n] - this.y[r])) /
                  (this.x[n] - this.x[r]) +
                  this.y[r])
              : 0;
          }),
          this
        );
      },
      getInterpolateFunction: function (e) {
        var t = this;
        t.controller.spline ||
          (t.controller.spline = t.params.loop
            ? new ie.LinearSpline(t.slidesGrid, e.slidesGrid)
            : new ie.LinearSpline(t.snapGrid, e.snapGrid));
      },
      setTranslate: function (e, t) {
        var a,
          i,
          s = this,
          r = s.controller.control,
          n = s.constructor;
        function l(e) {
          var t = s.rtlTranslate ? -s.translate : s.translate;
          "slide" === s.params.controller.by &&
            (s.controller.getInterpolateFunction(e),
            (i = -s.controller.spline.interpolate(-t))),
            (i && "container" !== s.params.controller.by) ||
              ((a =
                (e.maxTranslate() - e.minTranslate()) /
                (s.maxTranslate() - s.minTranslate())),
              (i = (t - s.minTranslate()) * a + e.minTranslate())),
            s.params.controller.inverse && (i = e.maxTranslate() - i),
            e.updateProgress(i),
            e.setTranslate(i, s),
            e.updateActiveIndex(),
            e.updateSlidesClasses();
        }
        if (Array.isArray(r))
          for (var o = 0; o < r.length; o += 1)
            r[o] !== t && r[o] instanceof n && l(r[o]);
        else r instanceof n && t !== r && l(r);
      },
      setTransition: function (e, t) {
        var a,
          i = this,
          s = i.constructor,
          r = i.controller.control;
        function n(t) {
          t.setTransition(e, i),
            0 !== e &&
              (t.transitionStart(),
              t.params.autoHeight &&
                E(function () {
                  t.updateAutoHeight();
                }),
              t.$wrapperEl.transitionEnd(function () {
                r &&
                  (t.params.loop &&
                    "slide" === i.params.controller.by &&
                    t.loopFix(),
                  t.transitionEnd());
              }));
        }
        if (Array.isArray(r))
          for (a = 0; a < r.length; a += 1)
            r[a] !== t && r[a] instanceof s && n(r[a]);
        else r instanceof s && t !== r && n(r);
      },
    },
    se = {
      getRandomNumber: function (e) {
        void 0 === e && (e = 16);
        return "x".repeat(e).replace(/x/g, function () {
          return Math.round(16 * Math.random()).toString(16);
        });
      },
      makeElFocusable: function (e) {
        return e.attr("tabIndex", "0"), e;
      },
      makeElNotFocusable: function (e) {
        return e.attr("tabIndex", "-1"), e;
      },
      addElRole: function (e, t) {
        return e.attr("role", t), e;
      },
      addElRoleDescription: function (e, t) {
        return e.attr("aria-roledescription", t), e;
      },
      addElControls: function (e, t) {
        return e.attr("aria-controls", t), e;
      },
      addElLabel: function (e, t) {
        return e.attr("aria-label", t), e;
      },
      addElId: function (e, t) {
        return e.attr("id", t), e;
      },
      addElLive: function (e, t) {
        return e.attr("aria-live", t), e;
      },
      disableEl: function (e) {
        return e.attr("aria-disabled", !0), e;
      },
      enableEl: function (e) {
        return e.attr("aria-disabled", !1), e;
      },
      onEnterOrSpaceKey: function (e) {
        if (13 === e.keyCode || 32 === e.keyCode) {
          var t = this,
            a = t.params.a11y,
            i = m(e.target);
          t.navigation &&
            t.navigation.$nextEl &&
            i.is(t.navigation.$nextEl) &&
            ((t.isEnd && !t.params.loop) || t.slideNext(),
            t.isEnd
              ? t.a11y.notify(a.lastSlideMessage)
              : t.a11y.notify(a.nextSlideMessage)),
            t.navigation &&
              t.navigation.$prevEl &&
              i.is(t.navigation.$prevEl) &&
              ((t.isBeginning && !t.params.loop) || t.slidePrev(),
              t.isBeginning
                ? t.a11y.notify(a.firstSlideMessage)
                : t.a11y.notify(a.prevSlideMessage)),
            t.pagination &&
              i.is(z(t.params.pagination.bulletClass)) &&
              i[0].click();
        }
      },
      notify: function (e) {
        var t = this.a11y.liveRegion;
        0 !== t.length && (t.html(""), t.html(e));
      },
      updateNavigation: function () {
        var e = this;
        if (!e.params.loop && e.navigation) {
          var t = e.navigation,
            a = t.$nextEl,
            i = t.$prevEl;
          i &&
            i.length > 0 &&
            (e.isBeginning
              ? (e.a11y.disableEl(i), e.a11y.makeElNotFocusable(i))
              : (e.a11y.enableEl(i), e.a11y.makeElFocusable(i))),
            a &&
              a.length > 0 &&
              (e.isEnd
                ? (e.a11y.disableEl(a), e.a11y.makeElNotFocusable(a))
                : (e.a11y.enableEl(a), e.a11y.makeElFocusable(a)));
        }
      },
      updatePagination: function () {
        var e = this,
          t = e.params.a11y;
        e.pagination &&
          e.params.pagination.clickable &&
          e.pagination.bullets &&
          e.pagination.bullets.length &&
          e.pagination.bullets.each(function (a) {
            var i = m(a);
            e.a11y.makeElFocusable(i),
              e.params.pagination.renderBullet ||
                (e.a11y.addElRole(i, "button"),
                e.a11y.addElLabel(
                  i,
                  t.paginationBulletMessage.replace(
                    /\{\{index\}\}/,
                    i.index() + 1
                  )
                ));
          });
      },
      init: function () {
        var e = this,
          t = e.params.a11y;
        e.$el.append(e.a11y.liveRegion);
        var a = e.$el;
        t.containerRoleDescriptionMessage &&
          e.a11y.addElRoleDescription(a, t.containerRoleDescriptionMessage),
          t.containerMessage && e.a11y.addElLabel(a, t.containerMessage);
        var i,
          s,
          r = e.$wrapperEl,
          n = r.attr("id") || "swiper-wrapper-" + e.a11y.getRandomNumber(16),
          l = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
        e.a11y.addElId(r, n),
          e.a11y.addElLive(r, l),
          t.itemRoleDescriptionMessage &&
            e.a11y.addElRoleDescription(
              m(e.slides),
              t.itemRoleDescriptionMessage
            ),
          e.a11y.addElRole(m(e.slides), t.slideRole),
          e.slides.each(function (a) {
            var i = m(a),
              s = t.slideLabelMessage
                .replace(/\{\{index\}\}/, i.index() + 1)
                .replace(/\{\{slidesLength\}\}/, e.slides.length);
            e.a11y.addElLabel(i, s);
          }),
          e.navigation && e.navigation.$nextEl && (i = e.navigation.$nextEl),
          e.navigation && e.navigation.$prevEl && (s = e.navigation.$prevEl),
          i &&
            i.length &&
            (e.a11y.makeElFocusable(i),
            "BUTTON" !== i[0].tagName &&
              (e.a11y.addElRole(i, "button"),
              i.on("keydown", e.a11y.onEnterOrSpaceKey)),
            e.a11y.addElLabel(i, t.nextSlideMessage),
            e.a11y.addElControls(i, n)),
          s &&
            s.length &&
            (e.a11y.makeElFocusable(s),
            "BUTTON" !== s[0].tagName &&
              (e.a11y.addElRole(s, "button"),
              s.on("keydown", e.a11y.onEnterOrSpaceKey)),
            e.a11y.addElLabel(s, t.prevSlideMessage),
            e.a11y.addElControls(s, n)),
          e.pagination &&
            e.params.pagination.clickable &&
            e.pagination.bullets &&
            e.pagination.bullets.length &&
            e.pagination.$el.on(
              "keydown",
              z(e.params.pagination.bulletClass),
              e.a11y.onEnterOrSpaceKey
            );
      },
      destroy: function () {
        var e,
          t,
          a = this;
        a.a11y.liveRegion &&
          a.a11y.liveRegion.length > 0 &&
          a.a11y.liveRegion.remove(),
          a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl),
          a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl),
          e && e.off("keydown", a.a11y.onEnterOrSpaceKey),
          t && t.off("keydown", a.a11y.onEnterOrSpaceKey),
          a.pagination &&
            a.params.pagination.clickable &&
            a.pagination.bullets &&
            a.pagination.bullets.length &&
            a.pagination.$el.off(
              "keydown",
              z(a.params.pagination.bulletClass),
              a.a11y.onEnterOrSpaceKey
            );
      },
    },
    re = {
      init: function () {
        var e = this,
          t = l();
        if (e.params.history) {
          if (!t.history || !t.history.pushState)
            return (
              (e.params.history.enabled = !1),
              void (e.params.hashNavigation.enabled = !0)
            );
          var a = e.history;
          (a.initialized = !0),
            (a.paths = re.getPathValues(e.params.url)),
            (a.paths.key || a.paths.value) &&
              (a.scrollToSlide(0, a.paths.value, e.params.runCallbacksOnInit),
              e.params.history.replaceState ||
                t.addEventListener("popstate", e.history.setHistoryPopState));
        }
      },
      destroy: function () {
        var e = l();
        this.params.history.replaceState ||
          e.removeEventListener("popstate", this.history.setHistoryPopState);
      },
      setHistoryPopState: function () {
        var e = this;
        (e.history.paths = re.getPathValues(e.params.url)),
          e.history.scrollToSlide(e.params.speed, e.history.paths.value, !1);
      },
      getPathValues: function (e) {
        var t = l(),
          a = (e ? new URL(e) : t.location).pathname
            .slice(1)
            .split("/")
            .filter(function (e) {
              return "" !== e;
            }),
          i = a.length;
        return { key: a[i - 2], value: a[i - 1] };
      },
      setHistory: function (e, t) {
        var a = this,
          i = l();
        if (a.history.initialized && a.params.history.enabled) {
          var s;
          s = a.params.url ? new URL(a.params.url) : i.location;
          var r = a.slides.eq(t),
            n = re.slugify(r.attr("data-history"));
          if (a.params.history.root.length > 0) {
            var o = a.params.history.root;
            "/" === o[o.length - 1] && (o = o.slice(0, o.length - 1)),
              (n = o + "/" + e + "/" + n);
          } else s.pathname.includes(e) || (n = e + "/" + n);
          var d = i.history.state;
          (d && d.value === n) ||
            (a.params.history.replaceState
              ? i.history.replaceState({ value: n }, null, n)
              : i.history.pushState({ value: n }, null, n));
        }
      },
      slugify: function (e) {
        return e
          .toString()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")
          .replace(/--+/g, "-")
          .replace(/^-+/, "")
          .replace(/-+$/, "");
      },
      scrollToSlide: function (e, t, a) {
        var i = this;
        if (t)
          for (var s = 0, r = i.slides.length; s < r; s += 1) {
            var n = i.slides.eq(s);
            if (
              re.slugify(n.attr("data-history")) === t &&
              !n.hasClass(i.params.slideDuplicateClass)
            ) {
              var l = n.index();
              i.slideTo(l, e, a);
            }
          }
        else i.slideTo(0, e, a);
      },
    },
    ne = {
      onHashCange: function () {
        var e = this,
          t = r();
        e.emit("hashChange");
        var a = t.location.hash.replace("#", "");
        if (a !== e.slides.eq(e.activeIndex).attr("data-hash")) {
          var i = e.$wrapperEl
            .children("." + e.params.slideClass + '[data-hash="' + a + '"]')
            .index();
          if (void 0 === i) return;
          e.slideTo(i);
        }
      },
      setHash: function () {
        var e = this,
          t = l(),
          a = r();
        if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
          if (
            e.params.hashNavigation.replaceState &&
            t.history &&
            t.history.replaceState
          )
            t.history.replaceState(
              null,
              null,
              "#" + e.slides.eq(e.activeIndex).attr("data-hash") || ""
            ),
              e.emit("hashSet");
          else {
            var i = e.slides.eq(e.activeIndex),
              s = i.attr("data-hash") || i.attr("data-history");
            (a.location.hash = s || ""), e.emit("hashSet");
          }
      },
      init: function () {
        var e = this,
          t = r(),
          a = l();
        if (
          !(
            !e.params.hashNavigation.enabled ||
            (e.params.history && e.params.history.enabled)
          )
        ) {
          e.hashNavigation.initialized = !0;
          var i = t.location.hash.replace("#", "");
          if (i)
            for (var s = 0, n = e.slides.length; s < n; s += 1) {
              var o = e.slides.eq(s);
              if (
                (o.attr("data-hash") || o.attr("data-history")) === i &&
                !o.hasClass(e.params.slideDuplicateClass)
              ) {
                var d = o.index();
                e.slideTo(d, 0, e.params.runCallbacksOnInit, !0);
              }
            }
          e.params.hashNavigation.watchState &&
            m(a).on("hashchange", e.hashNavigation.onHashCange);
        }
      },
      destroy: function () {
        var e = l();
        this.params.hashNavigation.watchState &&
          m(e).off("hashchange", this.hashNavigation.onHashCange);
      },
    },
    le = {
      run: function () {
        var e = this,
          t = e.slides.eq(e.activeIndex),
          a = e.params.autoplay.delay;
        t.attr("data-swiper-autoplay") &&
          (a = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
          clearTimeout(e.autoplay.timeout),
          (e.autoplay.timeout = E(function () {
            var t;
            e.params.autoplay.reverseDirection
              ? e.params.loop
                ? (e.loopFix(),
                  (t = e.slidePrev(e.params.speed, !0, !0)),
                  e.emit("autoplay"))
                : e.isBeginning
                ? e.params.autoplay.stopOnLastSlide
                  ? e.autoplay.stop()
                  : ((t = e.slideTo(
                      e.slides.length - 1,
                      e.params.speed,
                      !0,
                      !0
                    )),
                    e.emit("autoplay"))
                : ((t = e.slidePrev(e.params.speed, !0, !0)),
                  e.emit("autoplay"))
              : e.params.loop
              ? (e.loopFix(),
                (t = e.slideNext(e.params.speed, !0, !0)),
                e.emit("autoplay"))
              : e.isEnd
              ? e.params.autoplay.stopOnLastSlide
                ? e.autoplay.stop()
                : ((t = e.slideTo(0, e.params.speed, !0, !0)),
                  e.emit("autoplay"))
              : ((t = e.slideNext(e.params.speed, !0, !0)), e.emit("autoplay")),
              ((e.params.cssMode && e.autoplay.running) || !1 === t) &&
                e.autoplay.run();
          }, a));
      },
      start: function () {
        var e = this;
        return (
          void 0 === e.autoplay.timeout &&
          !e.autoplay.running &&
          ((e.autoplay.running = !0),
          e.emit("autoplayStart"),
          e.autoplay.run(),
          !0)
        );
      },
      stop: function () {
        var e = this;
        return (
          !!e.autoplay.running &&
          void 0 !== e.autoplay.timeout &&
          (e.autoplay.timeout &&
            (clearTimeout(e.autoplay.timeout), (e.autoplay.timeout = void 0)),
          (e.autoplay.running = !1),
          e.emit("autoplayStop"),
          !0)
        );
      },
      pause: function (e) {
        var t = this;
        t.autoplay.running &&
          (t.autoplay.paused ||
            (t.autoplay.timeout && clearTimeout(t.autoplay.timeout),
            (t.autoplay.paused = !0),
            0 !== e && t.params.autoplay.waitForTransition
              ? ["transitionend", "webkitTransitionEnd"].forEach(function (e) {
                  t.$wrapperEl[0].addEventListener(
                    e,
                    t.autoplay.onTransitionEnd
                  );
                })
              : ((t.autoplay.paused = !1), t.autoplay.run())));
      },
      onVisibilityChange: function () {
        var e = this,
          t = r();
        "hidden" === t.visibilityState &&
          e.autoplay.running &&
          e.autoplay.pause(),
          "visible" === t.visibilityState &&
            e.autoplay.paused &&
            (e.autoplay.run(), (e.autoplay.paused = !1));
      },
      onTransitionEnd: function (e) {
        var t = this;
        t &&
          !t.destroyed &&
          t.$wrapperEl &&
          e.target === t.$wrapperEl[0] &&
          (["transitionend", "webkitTransitionEnd"].forEach(function (e) {
            t.$wrapperEl[0].removeEventListener(e, t.autoplay.onTransitionEnd);
          }),
          (t.autoplay.paused = !1),
          t.autoplay.running ? t.autoplay.run() : t.autoplay.stop());
      },
      onMouseEnter: function () {
        var e = this;
        e.autoplay.pause(),
          ["transitionend", "webkitTransitionEnd"].forEach(function (t) {
            e.$wrapperEl[0].removeEventListener(t, e.autoplay.onTransitionEnd);
          });
      },
      onMouseLeave: function () {
        (this.autoplay.paused = !1), this.autoplay.run();
      },
      attachMouseEvents: function () {
        var e = this;
        e.params.autoplay.pauseOnMouseEnter &&
          (e.$el.on("mouseenter", e.autoplay.onMouseEnter),
          e.$el.on("mouseleave", e.autoplay.onMouseLeave));
      },
      detachMouseEvents: function () {
        var e = this;
        e.$el.off("mouseenter", e.autoplay.onMouseEnter),
          e.$el.off("mouseleave", e.autoplay.onMouseLeave);
      },
    },
    oe = {
      setTranslate: function () {
        for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
          var i = e.slides.eq(a),
            s = -i[0].swiperSlideOffset;
          e.params.virtualTranslate || (s -= e.translate);
          var r = 0;
          e.isHorizontal() || ((r = s), (s = 0));
          var n = e.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs(i[0].progress), 0)
            : 1 + Math.min(Math.max(i[0].progress, -1), 0);
          i.css({ opacity: n }).transform(
            "translate3d(" + s + "px, " + r + "px, 0px)"
          );
        }
      },
      setTransition: function (e) {
        var t = this,
          a = t.slides,
          i = t.$wrapperEl;
        if ((a.transition(e), t.params.virtualTranslate && 0 !== e)) {
          var s = !1;
          a.transitionEnd(function () {
            if (!s && t && !t.destroyed) {
              (s = !0), (t.animating = !1);
              for (
                var e = ["webkitTransitionEnd", "transitionend"], a = 0;
                a < e.length;
                a += 1
              )
                i.trigger(e[a]);
            }
          });
        }
      },
    },
    de = {
      setTranslate: function () {
        var e,
          t = this,
          a = t.$el,
          i = t.$wrapperEl,
          s = t.slides,
          r = t.width,
          n = t.height,
          l = t.rtlTranslate,
          o = t.size,
          d = t.browser,
          p = t.params.cubeEffect,
          u = t.isHorizontal(),
          c = t.virtual && t.params.virtual.enabled,
          h = 0;
        p.shadow &&
          (u
            ? (0 === (e = i.find(".swiper-cube-shadow")).length &&
                ((e = m('<div class="swiper-cube-shadow"></div>')),
                i.append(e)),
              e.css({ height: r + "px" }))
            : 0 === (e = a.find(".swiper-cube-shadow")).length &&
              ((e = m('<div class="swiper-cube-shadow"></div>')), a.append(e)));
        for (var v = 0; v < s.length; v += 1) {
          var f = s.eq(v),
            g = v;
          c && (g = parseInt(f.attr("data-swiper-slide-index"), 10));
          var b = 90 * g,
            y = Math.floor(b / 360);
          l && ((b = -b), (y = Math.floor(-b / 360)));
          var w = Math.max(Math.min(f[0].progress, 1), -1),
            E = 0,
            x = 0,
            T = 0;
          g % 4 == 0
            ? ((E = 4 * -y * o), (T = 0))
            : (g - 1) % 4 == 0
            ? ((E = 0), (T = 4 * -y * o))
            : (g - 2) % 4 == 0
            ? ((E = o + 4 * y * o), (T = o))
            : (g - 3) % 4 == 0 && ((E = -o), (T = 3 * o + 4 * o * y)),
            l && (E = -E),
            u || ((x = E), (E = 0));
          var C =
            "rotateX(" +
            (u ? 0 : -b) +
            "deg) rotateY(" +
            (u ? b : 0) +
            "deg) translate3d(" +
            E +
            "px, " +
            x +
            "px, " +
            T +
            "px)";
          if (
            (w <= 1 &&
              w > -1 &&
              ((h = 90 * g + 90 * w), l && (h = 90 * -g - 90 * w)),
            f.transform(C),
            p.slideShadows)
          ) {
            var S = u
                ? f.find(".swiper-slide-shadow-left")
                : f.find(".swiper-slide-shadow-top"),
              M = u
                ? f.find(".swiper-slide-shadow-right")
                : f.find(".swiper-slide-shadow-bottom");
            0 === S.length &&
              ((S = m(
                '<div class="swiper-slide-shadow-' +
                  (u ? "left" : "top") +
                  '"></div>'
              )),
              f.append(S)),
              0 === M.length &&
                ((M = m(
                  '<div class="swiper-slide-shadow-' +
                    (u ? "right" : "bottom") +
                    '"></div>'
                )),
                f.append(M)),
              S.length && (S[0].style.opacity = Math.max(-w, 0)),
              M.length && (M[0].style.opacity = Math.max(w, 0));
          }
        }
        if (
          (i.css({
            "-webkit-transform-origin": "50% 50% -" + o / 2 + "px",
            "-moz-transform-origin": "50% 50% -" + o / 2 + "px",
            "-ms-transform-origin": "50% 50% -" + o / 2 + "px",
            "transform-origin": "50% 50% -" + o / 2 + "px",
          }),
          p.shadow)
        )
          if (u)
            e.transform(
              "translate3d(0px, " +
                (r / 2 + p.shadowOffset) +
                "px, " +
                -r / 2 +
                "px) rotateX(90deg) rotateZ(0deg) scale(" +
                p.shadowScale +
                ")"
            );
          else {
            var z = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
              P =
                1.5 -
                (Math.sin((2 * z * Math.PI) / 360) / 2 +
                  Math.cos((2 * z * Math.PI) / 360) / 2),
              k = p.shadowScale,
              $ = p.shadowScale / P,
              L = p.shadowOffset;
            e.transform(
              "scale3d(" +
                k +
                ", 1, " +
                $ +
                ") translate3d(0px, " +
                (n / 2 + L) +
                "px, " +
                -n / 2 / $ +
                "px) rotateX(-90deg)"
            );
          }
        var I = d.isSafari || d.isWebView ? -o / 2 : 0;
        i.transform(
          "translate3d(0px,0," +
            I +
            "px) rotateX(" +
            (t.isHorizontal() ? 0 : h) +
            "deg) rotateY(" +
            (t.isHorizontal() ? -h : 0) +
            "deg)"
        );
      },
      setTransition: function (e) {
        var t = this,
          a = t.$el;
        t.slides
          .transition(e)
          .find(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
          )
          .transition(e),
          t.params.cubeEffect.shadow &&
            !t.isHorizontal() &&
            a.find(".swiper-cube-shadow").transition(e);
      },
    },
    pe = {
      setTranslate: function () {
        for (
          var e = this, t = e.slides, a = e.rtlTranslate, i = 0;
          i < t.length;
          i += 1
        ) {
          var s = t.eq(i),
            r = s[0].progress;
          e.params.flipEffect.limitRotation &&
            (r = Math.max(Math.min(s[0].progress, 1), -1));
          var n = -180 * r,
            l = 0,
            o = -s[0].swiperSlideOffset,
            d = 0;
          if (
            (e.isHorizontal()
              ? a && (n = -n)
              : ((d = o), (o = 0), (l = -n), (n = 0)),
            (s[0].style.zIndex = -Math.abs(Math.round(r)) + t.length),
            e.params.flipEffect.slideShadows)
          ) {
            var p = e.isHorizontal()
                ? s.find(".swiper-slide-shadow-left")
                : s.find(".swiper-slide-shadow-top"),
              u = e.isHorizontal()
                ? s.find(".swiper-slide-shadow-right")
                : s.find(".swiper-slide-shadow-bottom");
            0 === p.length &&
              ((p = m(
                '<div class="swiper-slide-shadow-' +
                  (e.isHorizontal() ? "left" : "top") +
                  '"></div>'
              )),
              s.append(p)),
              0 === u.length &&
                ((u = m(
                  '<div class="swiper-slide-shadow-' +
                    (e.isHorizontal() ? "right" : "bottom") +
                    '"></div>'
                )),
                s.append(u)),
              p.length && (p[0].style.opacity = Math.max(-r, 0)),
              u.length && (u[0].style.opacity = Math.max(r, 0));
          }
          s.transform(
            "translate3d(" +
              o +
              "px, " +
              d +
              "px, 0px) rotateX(" +
              l +
              "deg) rotateY(" +
              n +
              "deg)"
          );
        }
      },
      setTransition: function (e) {
        var t = this,
          a = t.slides,
          i = t.activeIndex,
          s = t.$wrapperEl;
        if (
          (a
            .transition(e)
            .find(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            )
            .transition(e),
          t.params.virtualTranslate && 0 !== e)
        ) {
          var r = !1;
          a.eq(i).transitionEnd(function () {
            if (!r && t && !t.destroyed) {
              (r = !0), (t.animating = !1);
              for (
                var e = ["webkitTransitionEnd", "transitionend"], a = 0;
                a < e.length;
                a += 1
              )
                s.trigger(e[a]);
            }
          });
        }
      },
    },
    ue = {
      setTranslate: function () {
        for (
          var e = this,
            t = e.width,
            a = e.height,
            i = e.slides,
            s = e.slidesSizesGrid,
            r = e.params.coverflowEffect,
            n = e.isHorizontal(),
            l = e.translate,
            o = n ? t / 2 - l : a / 2 - l,
            d = n ? r.rotate : -r.rotate,
            p = r.depth,
            u = 0,
            c = i.length;
          u < c;
          u += 1
        ) {
          var h = i.eq(u),
            v = s[u],
            f = ((o - h[0].swiperSlideOffset - v / 2) / v) * r.modifier,
            g = n ? d * f : 0,
            b = n ? 0 : d * f,
            y = -p * Math.abs(f),
            w = r.stretch;
          "string" == typeof w &&
            -1 !== w.indexOf("%") &&
            (w = (parseFloat(r.stretch) / 100) * v);
          var E = n ? 0 : w * f,
            x = n ? w * f : 0,
            T = 1 - (1 - r.scale) * Math.abs(f);
          Math.abs(x) < 0.001 && (x = 0),
            Math.abs(E) < 0.001 && (E = 0),
            Math.abs(y) < 0.001 && (y = 0),
            Math.abs(g) < 0.001 && (g = 0),
            Math.abs(b) < 0.001 && (b = 0),
            Math.abs(T) < 0.001 && (T = 0);
          var C =
            "translate3d(" +
            x +
            "px," +
            E +
            "px," +
            y +
            "px)  rotateX(" +
            b +
            "deg) rotateY(" +
            g +
            "deg) scale(" +
            T +
            ")";
          if (
            (h.transform(C),
            (h[0].style.zIndex = 1 - Math.abs(Math.round(f))),
            r.slideShadows)
          ) {
            var S = n
                ? h.find(".swiper-slide-shadow-left")
                : h.find(".swiper-slide-shadow-top"),
              M = n
                ? h.find(".swiper-slide-shadow-right")
                : h.find(".swiper-slide-shadow-bottom");
            0 === S.length &&
              ((S = m(
                '<div class="swiper-slide-shadow-' +
                  (n ? "left" : "top") +
                  '"></div>'
              )),
              h.append(S)),
              0 === M.length &&
                ((M = m(
                  '<div class="swiper-slide-shadow-' +
                    (n ? "right" : "bottom") +
                    '"></div>'
                )),
                h.append(M)),
              S.length && (S[0].style.opacity = f > 0 ? f : 0),
              M.length && (M[0].style.opacity = -f > 0 ? -f : 0);
          }
        }
      },
      setTransition: function (e) {
        this.slides
          .transition(e)
          .find(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
          )
          .transition(e);
      },
    },
    ce = {
      init: function () {
        var e = this,
          t = e.params.thumbs;
        if (e.thumbs.initialized) return !1;
        e.thumbs.initialized = !0;
        var a = e.constructor;
        return (
          t.swiper instanceof a
            ? ((e.thumbs.swiper = t.swiper),
              S(e.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1,
              }),
              S(e.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1,
              }))
            : C(t.swiper) &&
              ((e.thumbs.swiper = new a(
                S({}, t.swiper, {
                  watchSlidesVisibility: !0,
                  watchSlidesProgress: !0,
                  slideToClickedSlide: !1,
                })
              )),
              (e.thumbs.swiperCreated = !0)),
          e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),
          e.thumbs.swiper.on("tap", e.thumbs.onThumbClick),
          !0
        );
      },
      onThumbClick: function () {
        var e = this,
          t = e.thumbs.swiper;
        if (t) {
          var a = t.clickedIndex,
            i = t.clickedSlide;
          if (
            !(
              (i && m(i).hasClass(e.params.thumbs.slideThumbActiveClass)) ||
              null == a
            )
          ) {
            var s;
            if (
              ((s = t.params.loop
                ? parseInt(
                    m(t.clickedSlide).attr("data-swiper-slide-index"),
                    10
                  )
                : a),
              e.params.loop)
            ) {
              var r = e.activeIndex;
              e.slides.eq(r).hasClass(e.params.slideDuplicateClass) &&
                (e.loopFix(),
                (e._clientLeft = e.$wrapperEl[0].clientLeft),
                (r = e.activeIndex));
              var n = e.slides
                  .eq(r)
                  .prevAll('[data-swiper-slide-index="' + s + '"]')
                  .eq(0)
                  .index(),
                l = e.slides
                  .eq(r)
                  .nextAll('[data-swiper-slide-index="' + s + '"]')
                  .eq(0)
                  .index();
              s = void 0 === n ? l : void 0 === l ? n : l - r < r - n ? l : n;
            }
            e.slideTo(s);
          }
        }
      },
      update: function (e) {
        var t = this,
          a = t.thumbs.swiper;
        if (a) {
          var i =
              "auto" === a.params.slidesPerView
                ? a.slidesPerViewDynamic()
                : a.params.slidesPerView,
            s = t.params.thumbs.autoScrollOffset,
            r = s && !a.params.loop;
          if (t.realIndex !== a.realIndex || r) {
            var n,
              l,
              o = a.activeIndex;
            if (a.params.loop) {
              a.slides.eq(o).hasClass(a.params.slideDuplicateClass) &&
                (a.loopFix(),
                (a._clientLeft = a.$wrapperEl[0].clientLeft),
                (o = a.activeIndex));
              var d = a.slides
                  .eq(o)
                  .prevAll('[data-swiper-slide-index="' + t.realIndex + '"]')
                  .eq(0)
                  .index(),
                p = a.slides
                  .eq(o)
                  .nextAll('[data-swiper-slide-index="' + t.realIndex + '"]')
                  .eq(0)
                  .index();
              (n =
                void 0 === d
                  ? p
                  : void 0 === p
                  ? d
                  : p - o == o - d
                  ? o
                  : p - o < o - d
                  ? p
                  : d),
                (l = t.activeIndex > t.previousIndex ? "next" : "prev");
            } else l = (n = t.realIndex) > t.previousIndex ? "next" : "prev";
            r && (n += "next" === l ? s : -1 * s),
              a.visibleSlidesIndexes &&
                a.visibleSlidesIndexes.indexOf(n) < 0 &&
                (a.params.centeredSlides
                  ? (n =
                      n > o
                        ? n - Math.floor(i / 2) + 1
                        : n + Math.floor(i / 2) - 1)
                  : n > o && (n = n - i + 1),
                a.slideTo(n, e ? 0 : void 0));
          }
          var u = 1,
            c = t.params.thumbs.slideThumbActiveClass;
          if (
            (t.params.slidesPerView > 1 &&
              !t.params.centeredSlides &&
              (u = t.params.slidesPerView),
            t.params.thumbs.multipleActiveThumbs || (u = 1),
            (u = Math.floor(u)),
            a.slides.removeClass(c),
            a.params.loop || (a.params.virtual && a.params.virtual.enabled))
          )
            for (var h = 0; h < u; h += 1)
              a.$wrapperEl
                .children(
                  '[data-swiper-slide-index="' + (t.realIndex + h) + '"]'
                )
                .addClass(c);
          else
            for (var v = 0; v < u; v += 1)
              a.slides.eq(t.realIndex + v).addClass(c);
        }
      },
    },
    he = [
      q,
      U,
      {
        name: "mousewheel",
        params: {
          mousewheel: {
            enabled: !1,
            releaseOnEdges: !1,
            invert: !1,
            forceToAxis: !1,
            sensitivity: 1,
            eventsTarget: "container",
            thresholdDelta: null,
            thresholdTime: null,
          },
        },
        create: function () {
          M(this, {
            mousewheel: {
              enabled: !1,
              lastScrollTime: x(),
              lastEventBeforeSnap: void 0,
              recentWheelEvents: [],
              enable: K.enable,
              disable: K.disable,
              handle: K.handle,
              handleMouseEnter: K.handleMouseEnter,
              handleMouseLeave: K.handleMouseLeave,
              animateSlider: K.animateSlider,
              releaseScroll: K.releaseScroll,
            },
          });
        },
        on: {
          init: function (e) {
            !e.params.mousewheel.enabled &&
              e.params.cssMode &&
              e.mousewheel.disable(),
              e.params.mousewheel.enabled && e.mousewheel.enable();
          },
          destroy: function (e) {
            e.params.cssMode && e.mousewheel.enable(),
              e.mousewheel.enabled && e.mousewheel.disable();
          },
        },
      },
      {
        name: "navigation",
        params: {
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
          },
        },
        create: function () {
          M(this, { navigation: t({}, Z) });
        },
        on: {
          init: function (e) {
            e.navigation.init(), e.navigation.update();
          },
          toEdge: function (e) {
            e.navigation.update();
          },
          fromEdge: function (e) {
            e.navigation.update();
          },
          destroy: function (e) {
            e.navigation.destroy();
          },
          "enable disable": function (e) {
            var t = e.navigation,
              a = t.$nextEl,
              i = t.$prevEl;
            a &&
              a[e.enabled ? "removeClass" : "addClass"](
                e.params.navigation.lockClass
              ),
              i &&
                i[e.enabled ? "removeClass" : "addClass"](
                  e.params.navigation.lockClass
                );
          },
          click: function (e, t) {
            var a = e.navigation,
              i = a.$nextEl,
              s = a.$prevEl,
              r = t.target;
            if (e.params.navigation.hideOnClick && !m(r).is(s) && !m(r).is(i)) {
              if (
                e.pagination &&
                e.params.pagination &&
                e.params.pagination.clickable &&
                (e.pagination.el === r || e.pagination.el.contains(r))
              )
                return;
              var n;
              i
                ? (n = i.hasClass(e.params.navigation.hiddenClass))
                : s && (n = s.hasClass(e.params.navigation.hiddenClass)),
                !0 === n ? e.emit("navigationShow") : e.emit("navigationHide"),
                i && i.toggleClass(e.params.navigation.hiddenClass),
                s && s.toggleClass(e.params.navigation.hiddenClass);
            }
          },
        },
      },
      {
        name: "pagination",
        params: {
          pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: function (e) {
              return e;
            },
            formatFractionTotal: function (e) {
              return e;
            },
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            modifierClass: "swiper-pagination-",
            currentClass: "swiper-pagination-current",
            totalClass: "swiper-pagination-total",
            hiddenClass: "swiper-pagination-hidden",
            progressbarFillClass: "swiper-pagination-progressbar-fill",
            progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
            clickableClass: "swiper-pagination-clickable",
            lockClass: "swiper-pagination-lock",
          },
        },
        create: function () {
          M(this, { pagination: t({ dynamicBulletIndex: 0 }, J) });
        },
        on: {
          init: function (e) {
            e.pagination.init(), e.pagination.render(), e.pagination.update();
          },
          activeIndexChange: function (e) {
            (e.params.loop || void 0 === e.snapIndex) && e.pagination.update();
          },
          snapIndexChange: function (e) {
            e.params.loop || e.pagination.update();
          },
          slidesLengthChange: function (e) {
            e.params.loop && (e.pagination.render(), e.pagination.update());
          },
          snapGridLengthChange: function (e) {
            e.params.loop || (e.pagination.render(), e.pagination.update());
          },
          destroy: function (e) {
            e.pagination.destroy();
          },
          "enable disable": function (e) {
            var t = e.pagination.$el;
            t &&
              t[e.enabled ? "removeClass" : "addClass"](
                e.params.pagination.lockClass
              );
          },
          click: function (e, t) {
            var a = t.target;
            if (
              e.params.pagination.el &&
              e.params.pagination.hideOnClick &&
              e.pagination.$el.length > 0 &&
              !m(a).hasClass(e.params.pagination.bulletClass)
            ) {
              if (
                e.navigation &&
                ((e.navigation.nextEl && a === e.navigation.nextEl) ||
                  (e.navigation.prevEl && a === e.navigation.prevEl))
              )
                return;
              !0 === e.pagination.$el.hasClass(e.params.pagination.hiddenClass)
                ? e.emit("paginationShow")
                : e.emit("paginationHide"),
                e.pagination.$el.toggleClass(e.params.pagination.hiddenClass);
            }
          },
        },
      },
      {
        name: "scrollbar",
        params: {
          scrollbar: {
            el: null,
            dragSize: "auto",
            hide: !1,
            draggable: !1,
            snapOnRelease: !0,
            lockClass: "swiper-scrollbar-lock",
            dragClass: "swiper-scrollbar-drag",
          },
        },
        create: function () {
          M(this, {
            scrollbar: t(
              { isTouched: !1, timeout: null, dragTimeout: null },
              Q
            ),
          });
        },
        on: {
          init: function (e) {
            e.scrollbar.init(),
              e.scrollbar.updateSize(),
              e.scrollbar.setTranslate();
          },
          update: function (e) {
            e.scrollbar.updateSize();
          },
          resize: function (e) {
            e.scrollbar.updateSize();
          },
          observerUpdate: function (e) {
            e.scrollbar.updateSize();
          },
          setTranslate: function (e) {
            e.scrollbar.setTranslate();
          },
          setTransition: function (e, t) {
            e.scrollbar.setTransition(t);
          },
          "enable disable": function (e) {
            var t = e.scrollbar.$el;
            t &&
              t[e.enabled ? "removeClass" : "addClass"](
                e.params.scrollbar.lockClass
              );
          },
          destroy: function (e) {
            e.scrollbar.destroy();
          },
        },
      },
      {
        name: "parallax",
        params: { parallax: { enabled: !1 } },
        create: function () {
          M(this, { parallax: t({}, ee) });
        },
        on: {
          beforeInit: function (e) {
            e.params.parallax.enabled &&
              ((e.params.watchSlidesProgress = !0),
              (e.originalParams.watchSlidesProgress = !0));
          },
          init: function (e) {
            e.params.parallax.enabled && e.parallax.setTranslate();
          },
          setTranslate: function (e) {
            e.params.parallax.enabled && e.parallax.setTranslate();
          },
          setTransition: function (e, t) {
            e.params.parallax.enabled && e.parallax.setTransition(t);
          },
        },
      },
      {
        name: "zoom",
        params: {
          zoom: {
            enabled: !1,
            maxRatio: 3,
            minRatio: 1,
            toggle: !0,
            containerClass: "swiper-zoom-container",
            zoomedSlideClass: "swiper-slide-zoomed",
          },
        },
        create: function () {
          var e = this;
          M(e, {
            zoom: t(
              {
                enabled: !1,
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                  $slideEl: void 0,
                  slideWidth: void 0,
                  slideHeight: void 0,
                  $imageEl: void 0,
                  $imageWrapEl: void 0,
                  maxRatio: 3,
                },
                image: {
                  isTouched: void 0,
                  isMoved: void 0,
                  currentX: void 0,
                  currentY: void 0,
                  minX: void 0,
                  minY: void 0,
                  maxX: void 0,
                  maxY: void 0,
                  width: void 0,
                  height: void 0,
                  startX: void 0,
                  startY: void 0,
                  touchesStart: {},
                  touchesCurrent: {},
                },
                velocity: {
                  x: void 0,
                  y: void 0,
                  prevPositionX: void 0,
                  prevPositionY: void 0,
                  prevTime: void 0,
                },
              },
              te
            ),
          });
          var a = 1;
          Object.defineProperty(e.zoom, "scale", {
            get: function () {
              return a;
            },
            set: function (t) {
              if (a !== t) {
                var i = e.zoom.gesture.$imageEl
                    ? e.zoom.gesture.$imageEl[0]
                    : void 0,
                  s = e.zoom.gesture.$slideEl
                    ? e.zoom.gesture.$slideEl[0]
                    : void 0;
                e.emit("zoomChange", t, i, s);
              }
              a = t;
            },
          });
        },
        on: {
          init: function (e) {
            e.params.zoom.enabled && e.zoom.enable();
          },
          destroy: function (e) {
            e.zoom.disable();
          },
          touchStart: function (e, t) {
            e.zoom.enabled && e.zoom.onTouchStart(t);
          },
          touchEnd: function (e, t) {
            e.zoom.enabled && e.zoom.onTouchEnd(t);
          },
          doubleTap: function (e, t) {
            !e.animating &&
              e.params.zoom.enabled &&
              e.zoom.enabled &&
              e.params.zoom.toggle &&
              e.zoom.toggle(t);
          },
          transitionEnd: function (e) {
            e.zoom.enabled && e.params.zoom.enabled && e.zoom.onTransitionEnd();
          },
          slideChange: function (e) {
            e.zoom.enabled &&
              e.params.zoom.enabled &&
              e.params.cssMode &&
              e.zoom.onTransitionEnd();
          },
        },
      },
      {
        name: "lazy",
        params: {
          lazy: {
            checkInView: !1,
            enabled: !1,
            loadPrevNext: !1,
            loadPrevNextAmount: 1,
            loadOnTransitionStart: !1,
            scrollingElement: "",
            elementClass: "swiper-lazy",
            loadingClass: "swiper-lazy-loading",
            loadedClass: "swiper-lazy-loaded",
            preloaderClass: "swiper-lazy-preloader",
          },
        },
        create: function () {
          M(this, { lazy: t({ initialImageLoaded: !1 }, ae) });
        },
        on: {
          beforeInit: function (e) {
            e.params.lazy.enabled &&
              e.params.preloadImages &&
              (e.params.preloadImages = !1);
          },
          init: function (e) {
            e.params.lazy.enabled &&
              !e.params.loop &&
              0 === e.params.initialSlide &&
              (e.params.lazy.checkInView
                ? e.lazy.checkInViewOnLoad()
                : e.lazy.load());
          },
          scroll: function (e) {
            e.params.freeMode && !e.params.freeModeSticky && e.lazy.load();
          },
          "scrollbarDragMove resize _freeModeNoMomentumRelease": function (e) {
            e.params.lazy.enabled && e.lazy.load();
          },
          transitionStart: function (e) {
            e.params.lazy.enabled &&
              (e.params.lazy.loadOnTransitionStart ||
                (!e.params.lazy.loadOnTransitionStart &&
                  !e.lazy.initialImageLoaded)) &&
              e.lazy.load();
          },
          transitionEnd: function (e) {
            e.params.lazy.enabled &&
              !e.params.lazy.loadOnTransitionStart &&
              e.lazy.load();
          },
          slideChange: function (e) {
            e.params.lazy.enabled && e.params.cssMode && e.lazy.load();
          },
        },
      },
      {
        name: "controller",
        params: { controller: { control: void 0, inverse: !1, by: "slide" } },
        create: function () {
          M(this, {
            controller: t({ control: this.params.controller.control }, ie),
          });
        },
        on: {
          update: function (e) {
            e.controller.control &&
              e.controller.spline &&
              ((e.controller.spline = void 0), delete e.controller.spline);
          },
          resize: function (e) {
            e.controller.control &&
              e.controller.spline &&
              ((e.controller.spline = void 0), delete e.controller.spline);
          },
          observerUpdate: function (e) {
            e.controller.control &&
              e.controller.spline &&
              ((e.controller.spline = void 0), delete e.controller.spline);
          },
          setTranslate: function (e, t, a) {
            e.controller.control && e.controller.setTranslate(t, a);
          },
          setTransition: function (e, t, a) {
            e.controller.control && e.controller.setTransition(t, a);
          },
        },
      },
      {
        name: "a11y",
        params: {
          a11y: {
            enabled: !0,
            notificationClass: "swiper-notification",
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            slideLabelMessage: "{{index}} / {{slidesLength}}",
            containerMessage: null,
            containerRoleDescriptionMessage: null,
            itemRoleDescriptionMessage: null,
            slideRole: "group",
          },
        },
        create: function () {
          M(this, {
            a11y: t({}, se, {
              liveRegion: m(
                '<span class="' +
                  this.params.a11y.notificationClass +
                  '" aria-live="assertive" aria-atomic="true"></span>'
              ),
            }),
          });
        },
        on: {
          afterInit: function (e) {
            e.params.a11y.enabled && (e.a11y.init(), e.a11y.updateNavigation());
          },
          toEdge: function (e) {
            e.params.a11y.enabled && e.a11y.updateNavigation();
          },
          fromEdge: function (e) {
            e.params.a11y.enabled && e.a11y.updateNavigation();
          },
          paginationUpdate: function (e) {
            e.params.a11y.enabled && e.a11y.updatePagination();
          },
          destroy: function (e) {
            e.params.a11y.enabled && e.a11y.destroy();
          },
        },
      },
      {
        name: "history",
        params: {
          history: { enabled: !1, root: "", replaceState: !1, key: "slides" },
        },
        create: function () {
          M(this, { history: t({}, re) });
        },
        on: {
          init: function (e) {
            e.params.history.enabled && e.history.init();
          },
          destroy: function (e) {
            e.params.history.enabled && e.history.destroy();
          },
          "transitionEnd _freeModeNoMomentumRelease": function (e) {
            e.history.initialized &&
              e.history.setHistory(e.params.history.key, e.activeIndex);
          },
          slideChange: function (e) {
            e.history.initialized &&
              e.params.cssMode &&
              e.history.setHistory(e.params.history.key, e.activeIndex);
          },
        },
      },
      {
        name: "hash-navigation",
        params: {
          hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 },
        },
        create: function () {
          M(this, { hashNavigation: t({ initialized: !1 }, ne) });
        },
        on: {
          init: function (e) {
            e.params.hashNavigation.enabled && e.hashNavigation.init();
          },
          destroy: function (e) {
            e.params.hashNavigation.enabled && e.hashNavigation.destroy();
          },
          "transitionEnd _freeModeNoMomentumRelease": function (e) {
            e.hashNavigation.initialized && e.hashNavigation.setHash();
          },
          slideChange: function (e) {
            e.hashNavigation.initialized &&
              e.params.cssMode &&
              e.hashNavigation.setHash();
          },
        },
      },
      {
        name: "autoplay",
        params: {
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !0,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1,
          },
        },
        create: function () {
          M(this, { autoplay: t({}, le, { running: !1, paused: !1 }) });
        },
        on: {
          init: function (e) {
            e.params.autoplay.enabled &&
              (e.autoplay.start(),
              r().addEventListener(
                "visibilitychange",
                e.autoplay.onVisibilityChange
              ),
              e.autoplay.attachMouseEvents());
          },
          beforeTransitionStart: function (e, t, a) {
            e.autoplay.running &&
              (a || !e.params.autoplay.disableOnInteraction
                ? e.autoplay.pause(t)
                : e.autoplay.stop());
          },
          sliderFirstMove: function (e) {
            e.autoplay.running &&
              (e.params.autoplay.disableOnInteraction
                ? e.autoplay.stop()
                : e.autoplay.pause());
          },
          touchEnd: function (e) {
            e.params.cssMode &&
              e.autoplay.paused &&
              !e.params.autoplay.disableOnInteraction &&
              e.autoplay.run();
          },
          destroy: function (e) {
            e.autoplay.detachMouseEvents(),
              e.autoplay.running && e.autoplay.stop(),
              r().removeEventListener(
                "visibilitychange",
                e.autoplay.onVisibilityChange
              );
          },
        },
      },
      {
        name: "effect-fade",
        params: { fadeEffect: { crossFade: !1 } },
        create: function () {
          M(this, { fadeEffect: t({}, oe) });
        },
        on: {
          beforeInit: function (e) {
            if ("fade" === e.params.effect) {
              e.classNames.push(e.params.containerModifierClass + "fade");
              var t = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !0,
              };
              S(e.params, t), S(e.originalParams, t);
            }
          },
          setTranslate: function (e) {
            "fade" === e.params.effect && e.fadeEffect.setTranslate();
          },
          setTransition: function (e, t) {
            "fade" === e.params.effect && e.fadeEffect.setTransition(t);
          },
        },
      },
      {
        name: "effect-cube",
        params: {
          cubeEffect: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: 0.94,
          },
        },
        create: function () {
          M(this, { cubeEffect: t({}, de) });
        },
        on: {
          beforeInit: function (e) {
            if ("cube" === e.params.effect) {
              e.classNames.push(e.params.containerModifierClass + "cube"),
                e.classNames.push(e.params.containerModifierClass + "3d");
              var t = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: !1,
                virtualTranslate: !0,
              };
              S(e.params, t), S(e.originalParams, t);
            }
          },
          setTranslate: function (e) {
            "cube" === e.params.effect && e.cubeEffect.setTranslate();
          },
          setTransition: function (e, t) {
            "cube" === e.params.effect && e.cubeEffect.setTransition(t);
          },
        },
      },
      {
        name: "effect-flip",
        params: { flipEffect: { slideShadows: !0, limitRotation: !0 } },
        create: function () {
          M(this, { flipEffect: t({}, pe) });
        },
        on: {
          beforeInit: function (e) {
            if ("flip" === e.params.effect) {
              e.classNames.push(e.params.containerModifierClass + "flip"),
                e.classNames.push(e.params.containerModifierClass + "3d");
              var t = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !0,
              };
              S(e.params, t), S(e.originalParams, t);
            }
          },
          setTranslate: function (e) {
            "flip" === e.params.effect && e.flipEffect.setTranslate();
          },
          setTransition: function (e, t) {
            "flip" === e.params.effect && e.flipEffect.setTransition(t);
          },
        },
      },
      {
        name: "effect-coverflow",
        params: {
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            scale: 1,
            modifier: 1,
            slideShadows: !0,
          },
        },
        create: function () {
          M(this, { coverflowEffect: t({}, ue) });
        },
        on: {
          beforeInit: function (e) {
            "coverflow" === e.params.effect &&
              (e.classNames.push(e.params.containerModifierClass + "coverflow"),
              e.classNames.push(e.params.containerModifierClass + "3d"),
              (e.params.watchSlidesProgress = !0),
              (e.originalParams.watchSlidesProgress = !0));
          },
          setTranslate: function (e) {
            "coverflow" === e.params.effect && e.coverflowEffect.setTranslate();
          },
          setTransition: function (e, t) {
            "coverflow" === e.params.effect &&
              e.coverflowEffect.setTransition(t);
          },
        },
      },
      {
        name: "thumbs",
        params: {
          thumbs: {
            swiper: null,
            multipleActiveThumbs: !0,
            autoScrollOffset: 0,
            slideThumbActiveClass: "swiper-slide-thumb-active",
            thumbsContainerClass: "swiper-container-thumbs",
          },
        },
        create: function () {
          M(this, { thumbs: t({ swiper: null, initialized: !1 }, ce) });
        },
        on: {
          beforeInit: function (e) {
            var t = e.params.thumbs;
            t && t.swiper && (e.thumbs.init(), e.thumbs.update(!0));
          },
          slideChange: function (e) {
            e.thumbs.swiper && e.thumbs.update();
          },
          update: function (e) {
            e.thumbs.swiper && e.thumbs.update();
          },
          resize: function (e) {
            e.thumbs.swiper && e.thumbs.update();
          },
          observerUpdate: function (e) {
            e.thumbs.swiper && e.thumbs.update();
          },
          setTransition: function (e, t) {
            var a = e.thumbs.swiper;
            a && a.setTransition(t);
          },
          beforeDestroy: function (e) {
            var t = e.thumbs.swiper;
            t && e.thumbs.swiperCreated && t && t.destroy();
          },
        },
      },
    ];
  return F.use(he), F;
});

// library for scroll https://github.com/chayka/jQuery.Scroolly
// https://github.com/chayka/jQuery.Scroolly
!(function (a, b) {
  "use strict";
  return "function" == typeof define && define.amd
    ? void define(["jquery"], function (c) {
        return b(a, c, !1);
      })
    : void b(a, a.jQuery || a.Zepto || a.ender || a.$, !0);
})(this, function (a, b, c) {
  "use strict";
  var d;
  return (
    (d = {
      options: { timeout: null, meter: b(".scroolly"), body: document },
      theCSSPrefix: "",
      theDashedCSSPrefix: "",
      isMobile: !1,
      isInitialized: !1,
      animFrame: null,
      direction: 0,
      scrollTop: 0,
      scrollCenter: 0,
      scrollBottom: 0,
      docHeight: 0,
      docMiddle: 0,
      winHeight: b(window).height(),
    }),
    (d.scrollLayout = {}),
    (d._isObject = function (a) {
      return "object" == typeof a;
    }),
    (d._isArray = function (a) {
      return a instanceof Array;
    }),
    (d._isNumber = function (a) {
      return a instanceof Number || "number" == typeof a;
    }),
    (d._isString = function (a) {
      return a instanceof String || "string" == typeof a;
    }),
    (d._default = function (a, b, c) {
      void 0 === c && (c = null);
      var e = (b + "").split(".");
      if (a && (d._isObject(a) || d._isArray(a))) {
        var f,
          g = a;
        for (var h in e) {
          if (
            ((f = e[h]), (!d._isObject(g) && !d._isArray(g)) || void 0 === g[f])
          )
            return c;
          g = g[f];
        }
        return g;
      }
      return c;
    }),
    (d.parseCoords = function (a) {
      var b = a.split(/\s*=\s*/),
        c = b[0] || "doc-top",
        e = d.parseCoord(c),
        f = b[1] || e.anchor,
        g = d.parseCoord(f);
      return [e, g];
    }),
    (d.parseCoord = function (a) {
      var b = /((vp|doc|el|con)-)?(top|center|bottom)?/i,
        c = "(\\+|-)?\\s*(\\d+)(\\%|vp|doc|el|con)?",
        d = new RegExp(c, "gi"),
        e = a.match(b),
        f = a.match(d);
      if (!e && !f) return !1;
      var g = e[1] ? e[2] : "vp",
        h = e[3] || "top",
        i = [];
      if (f) {
        d = new RegExp(c, "i");
        for (var j, k, l, m, n, o = 0; o < f.length; o++)
          (j = f[o]),
            (k = j.match(d)),
            (l = k[1] && "-" === k[1] ? -1 : 1),
            (m = (k[2] && parseInt(k[2]) * l) || 0),
            (n = "px"),
            k[3] && (n = "%" === k[3] ? g : k[3]),
            i.push({ offset: m, subject: n });
      }
      return { original: a, subject: g, anchor: h, offsets: i };
    }),
    (d.calculateCoord = function (a, b, c) {
      d._isString(a) && (a = d.parseCoord(a));
      var e = 0;
      if ("vp" === a.subject)
        switch (a.anchor) {
          case "top":
            e = d.scrollTop;
            break;
          case "center":
            e = d.scrollCenter;
            break;
          case "bottom":
            e = d.scrollBottom;
        }
      else if ("doc" === a.subject)
        switch (a.anchor) {
          case "top":
            e = 0;
            break;
          case "center":
            e = d.docMiddle;
            break;
          case "bottom":
            e = d.docHeight;
        }
      else {
        var f = "con" === a.subject ? c : b,
          g = f.outerHeight(),
          h = f.offset().top,
          i = h + g,
          j = h + Math.floor(g / 2);
        switch (a.anchor) {
          case "top":
            e = h;
            break;
          case "center":
            e = j;
            break;
          case "bottom":
            e = i;
        }
      }
      var k, l, m, n;
      for (k = 0; k < a.offsets.length; k++) {
        if (((l = a.offsets[k]), (m = l.offset), "px" !== l.subject)) {
          switch (((n = 0), l.subject)) {
            case "vp":
              n = d.winHeight;
              break;
            case "doc":
              n = d.docHeight;
              break;
            case "el":
              n = b.outerHeight();
              break;
            case "con":
              n = c.outerHeight();
          }
          m = Math.ceil((l.offset / 100) * n);
        }
        e += m;
      }
      return e;
    }),
    (d.cmpCoords = function (a, b, c) {
      return d.calculateCoord(a[0], b, c) - d.calculateCoord(a[1], b, c);
    }),
    (d.isRuleInActiveWidthRange = function (a) {
      var c,
        e,
        f,
        g = d._default(a, "minWidth", 0),
        h = d._default(a, "maxWidth", "infinity"),
        i = d._default(d.options, "meter"),
        j = b(window).width();
      return i.length
        ? ((c = i.length ? parseInt(i.css("min-width")) : 0),
          (e = i.length ? i.css("max-width") : "none"),
          (e = "none" === e ? "infinity" : parseInt(e)),
          (f = c >= g && ("infinity" === h || h >= e)))
        : j > g && ("infinity" === h || h >= j);
    }),
    (d.isRuleActive = function (a, b, c) {
      var e = d.isRuleInActiveWidthRange(a);
      if (!e) return !1;
      var f = d._default(a, "direction", 0),
        g = d.direction;
      if (f && ((f > 0 && 0 > g) || (0 > f && g >= 0))) return !1;
      var h = d._default(a, "from", "0"),
        i = d._default(a, "to", "finish"),
        j = d.cmpCoords(h, b, c);
      if (j > 0) return !1;
      var k = d.cmpCoords(i, b, c);
      return 0 >= k ? !1 : { offset: -j, length: k - j };
    }),
    (d.getScrollLayoutLength = function () {
      return Object.keys
        ? Object.keys(d.scrollLayout).length
        : b.map(d.scrollLayout, function () {
            return 1;
          }).length;
    }),
    (d.addItem = function (a, c, e, f) {
      if (!c.length) return !1;
      f = f || "self";
      var g, h, i, j, k, l, m;
      m = function (a, b, c, e) {
        var f,
          g,
          h = b / c,
          i = d._default(e, "cssFrom"),
          j = d._default(e, "cssTo"),
          k = {};
        for (var l in i)
          (f = i[l]),
            (g = d._default(j, l, f)),
            (k[l] = d.getTransitionValue(f, g, h));
        a.css(d.extendCssWithPrefix(k));
      };
      for (var n in e)
        (g = e[n]),
          (h = !f),
          (i = d._default(g, "from", "doc-top")),
          (d._isString(i) || d._isNumber(i)) &&
            ((i = d.parseCoords("" + i)), (g.from = i)),
          (j = d._default(g, "to", "doc-bottom")),
          (d._isString(j) || d._isNumber(j)) &&
            ((j = d.parseCoords("" + j)), (g.to = j)),
          (k = d._default(g, "cssFrom")),
          (l = d._default(g, "cssTo")),
          k && l && (g.cssOnScroll = m);
      if (c.length > 1)
        return (
          c.each(function (c) {
            for (var g, h, i = [], j = null, k = 0; k < e.length; k++)
              (g = e[k]), (h = {}), b.extend(h, g), i.push(h);
            f &&
              (j =
                "self" === f ? f : f.length > 1 && c < f.length ? b(f[c]) : f),
              d.addItem(a + "-" + c, b(this), i, j);
          }),
          !0
        );
      var o = d._default(d.scrollLayout, a);
      return (
        o
          ? o.rules.concat(e)
          : (d.scrollLayout[a] = { element: c, container: f, rules: e }),
        !0
      );
    }),
    (d.factory = function (a, b, c, e) {
      return (
        d.init(),
        a.length && b
          ? ((e = e || a[0].tagName + "_" + d.getScrollLayoutLength()),
            void d.addItem(e, a, b, c, !1))
          : !1
      );
    }),
    (d.stickItem = function (a, b, c) {
      d.stickItemXY(a, b, c instanceof Array ? c : [c]);
    }),
    (d.stickItemXY = function (a, c, e) {
      e = e || [];
      var f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n = [];
      for (var o in e)
        (f = e[o]),
          (g = d._default(f, "$bottomContainer", b("body"))),
          (h = d._default(f, "mode")),
          (i = d._default(f, "offsetTop", 0)),
          (j = d._default(f, "offsetBottom", 0)),
          (k = d._default(f, "minWidth", 0)),
          (l = d._default(f, "maxWidth", "infinity")),
          (m = d._default(f, "static", !1)),
          "next" === g
            ? ((h = h || "margin"), (g = b(c).next()))
            : ("parent" !== g && g) ||
              ((h = h || "padding"), (g = b(c).parent())),
          m
            ? n.push({
                source: "sticky",
                alias: "static",
                minWidth: k,
                maxWidth: l,
                bottomContainer: g,
              })
            : (n.push({
                source: "sticky",
                alias: "top",
                minWidth: k,
                maxWidth: l,
                offsetTop: i,
                offsetBottom: j,
                bottomContainer: g,
                mode: h,
              }),
              n.push({
                source: "sticky",
                alias: "fixed",
                minWidth: k,
                maxWidth: l,
                offsetTop: i,
                offsetBottom: j,
                bottomContainer: g,
                mode: h,
              }),
              n.push({
                source: "sticky",
                alias: "bottom",
                minWidth: k,
                maxWidth: l,
                offsetTop: i,
                offsetBottom: j,
                bottomContainer: g,
                mode: h,
              }));
      d.addItem(a, b(c), n);
    }),
    (d.processStickyItemRange = function (a, c) {
      c = c || {};
      var e = d._default(c, "bottomContainer", b("body")),
        f = (d._default(c, "mode"), d._default(c, "offsetTop", 0)),
        g = d._default(c, "offsetBottom", 0),
        h =
          parseInt(a.css("margin-top")) +
          a.height() +
          parseInt(a.css("margin-bottom"));
      "border-box" === a.css("box-sizing") &&
        (h +=
          parseInt(a.css("padding-top")) + parseInt(a.css("padding-bottom")));
      var i =
        parseInt(e.css("margin-top")) +
        e.height() +
        parseInt(e.css("margin-bottom"));
      "border-box" === e.css("box-sizing") &&
        (i +=
          parseInt(e.css("padding-top")) + parseInt(e.css("padding-bottom")));
      var j = Math.round(a.offset().top - parseInt(a.css("margin-top"))),
        k = Math.round(e.offset().top + (i - h - g));
      switch (c.alias) {
        case "top":
          (c.from = 0),
            (c.to = j - f),
            (c.css = { position: "absolute", top: j + "px" }),
            (c.itemHeight = h);
          break;
        case "fixed":
          (c.from = j - f),
            (c.to = k),
            (c.css = { position: "fixed", top: f + "px" }),
            (c.itemHeight = h);
          break;
        case "bottom":
          (c.from = k),
            (c.css = { position: "absolute", top: k + f + "px" }),
            (c.itemHeight = h);
          break;
        case "static":
          (c.from = 0), (c.css = { position: "", top: "" }), (c.itemHeight = 0);
      }
      return c;
    }),
    (d.onResize = function () {
      (d.winHeight = b(window).height()),
        (d.docHeight = d.body.height()),
        (d.docMiddle = Math.floor(d.docHeight / 2));
      var a = !1;
      for (var c in d.scrollLayout) {
        var e,
          f,
          g,
          h = d.scrollLayout[c];
        for (var i in h.rules)
          (e = h.rules[i]),
            (f = d.isRuleInActiveWidthRange(e)),
            (a |= f),
            f &&
              void 0 === e.from &&
              (b(h.element).css("position", ""),
              b(h.element).css("top", ""),
              e.bottomContainer && e.bottomContainer.css("margin-top", ""),
              (g = d._default(e, "source")),
              "sticky" === g &&
                (h.rules[i] = d.processStickyItemRange(h.element, e)));
      }
      return (
        a &&
          ((d.scrollLayout = d.scrollLayout),
          setTimeout(function () {
            d.onScroll(!0);
          }, 0)),
        !0
      );
    }),
    (d.getProgress = function (a, b) {
      var c = a / b;
      return {
        offset: a,
        length: b,
        relative: c,
        left: b - a,
        leftRelative: 1 - c,
      };
    }),
    (d.getTransitionFloatValue = function (a, b, c) {
      return 0 >= c ? a : c >= 1 ? b : a + (b - a) * c;
    }),
    (d.getTransitionIntValue = function (a, b, c) {
      return Math.round(d.getTransitionFloatValue(a, b, c));
    }),
    (d.hashColor2rgb = function (a) {
      var b = a.match(/^#([0-9a-f]{3})$/i);
      return b
        ? [
            17 * parseInt(b[1].charAt(0), 16),
            17 * parseInt(b[1].charAt(1), 16),
            17 * parseInt(b[1].charAt(2), 16),
          ]
        : (b = a.match(/^#([0-9a-f]{6})$/i))
        ? [
            parseInt(b[1].substr(0, 2), 16),
            parseInt(b[1].substr(2, 2), 16),
            parseInt(b[1].substr(4, 2), 16),
          ]
        : [0, 0, 0];
    }),
    (d.rgb2HashColor = function (a, b, c) {
      var d,
        e,
        f = "#";
      for (var g in arguments)
        (d = arguments[g]),
          (e = d.toString(16)),
          16 > d && (e = "0" + e),
          (f += e);
      return f;
    }),
    (d.getTransitionColorValue = function (a, b, c) {
      if (0 >= c) return a;
      if (c >= 1) return b;
      var e = d.hashColor2rgb(a),
        f = d.hashColor2rgb(b),
        g = d.getTransitionIntValue(e[0], f[0], c),
        h = d.getTransitionIntValue(e[1], f[1], c),
        i = d.getTransitionIntValue(e[2], f[2], c);
      return d.rgb2HashColor(g, h, i);
    }),
    (d.getTransitionValue = function (a, b, c) {
      if (0 >= c) return a;
      if (c >= 1) return b;
      var e = 0;
      if (d._isNumber(a) && d._isNumber(b))
        return d.getTransitionFloatValue(a, b, c);
      var f = /(\d*\.\d+)|(\d+)|(#[0-9a-f]{6})|(#[0-9a-f]{3})/gi,
        g = ("" + b).match(f);
      return ("" + a).replace(f, function (a, b, f, h, i) {
        var j = g[e];
        return (
          e++,
          f && f.length
            ? /\d*\.\d+/.test(j)
              ? d.getTransitionFloatValue(parseFloat(a), parseFloat(j), c)
              : d.getTransitionIntValue(parseInt(a), parseInt(j), c)
            : b && b.length
            ? d.getTransitionFloatValue(parseFloat(a), parseFloat(j), c)
            : (h && h.length) || (i && i.length)
            ? d.getTransitionColorValue(a, j, c)
            : a
        );
      });
    }),
    (d.onScroll = function (a) {
      var b = d.body.scrollTop();
      if (!a && b === d.scrollTop) return !1;
      var c = d.scrollTop,
        e = d.direction;
      (d.scrollTop = b),
        (d.scrollBottom = b + d.winHeight),
        (d.scrollCenter = b + Math.floor(d.winHeight / 2)),
        (d.direction = b - c);
      var f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u,
        v = !(
          d.direction === e ||
          (d.direction < 0 && 0 > e) ||
          (d.direction > 0 && e > 0)
        );
      for (k in d.scrollLayout) {
        for (
          f = d.scrollLayout[k],
            g = f.rules.length,
            h = [],
            i = [],
            j = [],
            l = 0;
          g > l;
          l++
        )
          (o = f.rules[l]),
            (p = d._default(o, "minWidth", 0)),
            (q = d._default(o, "maxWidth", "infinity")),
            (r = "self" === f.container ? f.element : f.container),
            (o.checkin = d.isRuleActive(o, f.element, r)),
            (o["class"] =
              o["class"] ||
              "scroll-pos-" + o.alias + " window-width-" + p + "-to-" + q),
            o.checkin
              ? (j.push(l), o.isActive || ((o.isActive = !0), h.push(l)))
              : o.isActive && ((o.isActive = !1), i.push(l)),
            (f.rules[l] = o);
        for (n = 0; n < i.length; n++)
          (l = i[n]),
            (o = f.rules[l]),
            f.element.removeClass(o["class"]),
            o.cssOnScroll &&
              ((m = o.length || 0),
              o.cssOnScroll(f.element, b > c ? m : 0, m, o)),
            o.onScroll &&
              ((m = o.length || 0), o.onScroll(f.element, b > c ? m : 0, m, o)),
            o.onCheckOut && o.onCheckOut(f.element, o),
            o.onTopOut && c > b
              ? o.onTopOut(f.element, o)
              : o.onBottomOut && b > c && o.onBottomOut(f.element, o);
        for (n = 0; n < h.length; n++)
          (l = h[n]),
            (o = f.rules[l]),
            o.css && f.element.css(d.extendCssWithPrefix(o.css)),
            o.addClass && f.element.addClass(o.addClass),
            o.removeClass && f.element.removeClass(o.removeClass),
            f.element.addClass(o["class"]),
            (s = d._default(o, "bottomContainer")),
            (t = d._default(o, "mode")),
            (u = d._default(o, "itemHeight")),
            s && t && u && s.css(t + "-top", u + "px"),
            o.onCheckIn && o.onCheckIn(f.element, o),
            o.onTopIn && b > c
              ? o.onTopIn(f.element, o)
              : o.onBottomIn && c > b && o.onBottomIn(f.element, o),
            (o.length = o.checkin.length);
        for (n = 0; n < j.length; n++)
          (l = j[n]),
            (o = f.rules[l]),
            o.cssOnScroll &&
              o.cssOnScroll(f.element, o.checkin.offset, o.checkin.length, o),
            o.onScroll &&
              o.onScroll(f.element, o.checkin.offset, o.checkin.length, o),
            v &&
              o.onDirectionChanged &&
              o.onDirectionChanged(f.element, d.direction, o);
        d.scrollLayout[k] = f;
      }
    }),
    (d.detectCSSPrefix = function () {
      var a = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
      if (window.getComputedStyle) {
        var b = window.getComputedStyle(document.body, null);
        for (var c in b)
          if (
            ((d.theCSSPrefix = c.match(a) || (+c === c && b[c].match(a))),
            d.theCSSPrefix)
          )
            break;
        if (!d.theCSSPrefix)
          return void (d.theCSSPrefix = d.theDashedCSSPrefix = "");
        (d.theCSSPrefix = d.theCSSPrefix[0]),
          "-" === d.theCSSPrefix.slice(0, 1)
            ? ((d.theDashedCSSPrefix = d.theCSSPrefix),
              (d.theCSSPrefix = {
                "-webkit-": "webkit",
                "-moz-": "Moz",
                "-ms-": "ms",
                "-o-": "O",
              }[d.theCSSPrefix]))
            : (d.theDashedCSSPrefix = "-" + d.theCSSPrefix.toLowerCase() + "-");
      }
    }),
    (d.cssPrefix = function (a) {
      return d.theDashedCSSPrefix + a;
    }),
    (d.extendCssWithPrefix = function (a) {
      var c,
        e,
        f,
        g,
        h,
        i = {};
      for (c in a)
        (e = /^-(moz-|webkit-|o-|ms-)?/i),
          (f = c.match(e)),
          (g = c.slice(1)),
          f &&
            !f[1] &&
            ((h = a[c]), (i[g] = h), (i[d.cssPrefix(g)] = h), delete a[c]);
      return b.extend(a, i), a;
    }),
    (d.now =
      Date.now ||
      function () {
        return +new Date();
      }),
    (d.getRAF = function () {
      var a =
          window.requestAnimationFrame ||
          window[d.theCSSPrefix.toLowerCase() + "RequestAnimationFrame"],
        b = d.now();
      return (
        a ||
          (a = function (a) {
            var c = d.now() - b,
              e = Math.max(0, 1e3 / 60 - c);
            return window.setTimeout(function () {
              (b = d.now()), a();
            }, e);
          }),
        a
      );
    }),
    (d.getCAF = function () {
      var a =
        window.cancelAnimationFrame ||
        window[d.theCSSPrefix.toLowerCase() + "CancelAnimationFrame"];
      return (
        (d.isMobile || !a) &&
          (a = function (a) {
            return window.clearTimeout(a);
          }),
        a
      );
    }),
    (d.animLoop = function () {
      d.onScroll(), (d.animFrame = window.requestAnimFrame(d.animLoop));
    }),
    (d.init = function (a) {
      return d.isInitialized
        ? !1
        : (b.extend(d.options, a),
          (d.isMobile = d._default(
            d.options,
            "isMobile",
            /Android|iPhone|iPad|iPod|BlackBerry/i.test(
              navigator.userAgent || navigator.vendor || window.opera
            )
          )),
          d.detectCSSPrefix(),
          (d.body = b(d.options.body)),
          (window.requestAnimFrame = d.getRAF()),
          (window.cancelAnimFrame = d.getCAF()),
          (d.timesCalled = 0),
          b(document).ready(function () {
            b(window).resize(d.onResize).resize(), d.animLoop();
          }),
          void (d.isInitialized = !0));
    }),
    (d.destroy = function () {
      window.cancelAnimFrame(d.animFrame);
    }),
    (d.factorySticky = function (a, b, c) {
      return (
        (c = c || a[0].tagName + "_" + d.getScrollLayoutLength()),
        d.stickItemXY(c, a, b instanceof Array ? b : [b]) ? c : !1
      );
    }),
    c &&
      ((b.scroolly = d),
      (b.fn.scroolly = function (a, b, c) {
        return d.factory(this, a, b, c), this;
      }),
      (b.fn.scroollySticky = function (a, b) {
        return d.init(), this.length ? d.factorySticky(this, a, b) : !1;
      })),
    d
  );
});

// library for sticky more options https://github.com/leafo/sticky-kit
/*
 Sticky-kit v1.1.3 | MIT | Leaf Corcoran 2015 | http://leafo.net
*/
(function () {
  var c, f;
  c = window.jQuery;
  f = c(window);
  c.fn.stick_in_parent = function (b) {
    var A, w, J, n, B, K, p, q, L, k, E, t;
    null == b && (b = {});
    t = b.sticky_class;
    B = b.inner_scrolling;
    E = b.recalc_every;
    k = b.parent;
    q = b.offset_top;
    p = b.spacer;
    w = b.bottoming;
    null == q && (q = 0);
    null == k && (k = void 0);
    null == B && (B = !0);
    null == t && (t = "is_stuck");
    A = c(document);
    null == w && (w = !0);
    L = function (a) {
      var b;
      return window.getComputedStyle
        ? ((a = window.getComputedStyle(a[0])),
          (b =
            parseFloat(a.getPropertyValue("width")) +
            parseFloat(a.getPropertyValue("margin-left")) +
            parseFloat(a.getPropertyValue("margin-right"))),
          "border-box" !== a.getPropertyValue("box-sizing") &&
            (b +=
              parseFloat(a.getPropertyValue("border-left-width")) +
              parseFloat(a.getPropertyValue("border-right-width")) +
              parseFloat(a.getPropertyValue("padding-left")) +
              parseFloat(a.getPropertyValue("padding-right"))),
          b)
        : a.outerWidth(!0);
    };
    J = function (a, b, n, C, F, u, r, G) {
      var v, H, m, D, I, d, g, x, y, z, h, l;
      if (!a.data("sticky_kit")) {
        a.data("sticky_kit", !0);
        I = A.height();
        g = a.parent();
        null != k && (g = g.closest(k));
        if (!g.length) throw "failed to find stick parent";
        v = m = !1;
        (h = null != p ? p && a.closest(p) : c("<div />")) &&
          h.css("position", a.css("position"));
        x = function () {
          var d, f, e;
          if (
            !G &&
            ((I = A.height()),
            (d = parseInt(g.css("border-top-width"), 10)),
            (f = parseInt(g.css("padding-top"), 10)),
            (b = parseInt(g.css("padding-bottom"), 10)),
            (n = g.offset().top + d + f),
            (C = g.height()),
            m &&
              ((v = m = !1),
              null == p && (a.insertAfter(h), h.detach()),
              a
                .css({ position: "", top: "", width: "", bottom: "" })
                .removeClass(t),
              (e = !0)),
            (F = a.offset().top - (parseInt(a.css("margin-top"), 10) || 0) - q),
            (u = a.outerHeight(!0)),
            (r = a.css("float")),
            h &&
              h.css({
                width: L(a),
                height: u,
                display: a.css("display"),
                "vertical-align": a.css("vertical-align"),
                float: r,
              }),
            e)
          )
            return l();
        };
        x();
        if (u !== C)
          return (
            (D = void 0),
            (d = q),
            (z = E),
            (l = function () {
              var c, l, e, k;
              if (
                !G &&
                ((e = !1),
                null != z && (--z, 0 >= z && ((z = E), x(), (e = !0))),
                e || A.height() === I || x(),
                (e = f.scrollTop()),
                null != D && (l = e - D),
                (D = e),
                m
                  ? (w &&
                      ((k = e + u + d > C + n),
                      v &&
                        !k &&
                        ((v = !1),
                        a
                          .css({ position: "fixed", bottom: "", top: d })
                          .trigger("sticky_kit:unbottom"))),
                    e < F &&
                      ((m = !1),
                      (d = q),
                      null == p &&
                        (("left" !== r && "right" !== r) || a.insertAfter(h),
                        h.detach()),
                      (c = { position: "", width: "", top: "" }),
                      a.css(c).removeClass(t).trigger("sticky_kit:unstick")),
                    B &&
                      ((c = f.height()),
                      u + q > c &&
                        !v &&
                        ((d -= l),
                        (d = Math.max(c - u, d)),
                        (d = Math.min(q, d)),
                        m && a.css({ top: d + "px" }))))
                  : e > F &&
                    ((m = !0),
                    (c = { position: "fixed", top: d }),
                    (c.width =
                      "border-box" === a.css("box-sizing")
                        ? a.outerWidth() + "px"
                        : a.width() + "px"),
                    a.css(c).addClass(t),
                    null == p &&
                      (a.after(h),
                      ("left" !== r && "right" !== r) || h.append(a)),
                    a.trigger("sticky_kit:stick")),
                m && w && (null == k && (k = e + u + d > C + n), !v && k))
              )
                return (
                  (v = !0),
                  "static" === g.css("position") &&
                    g.css({ position: "relative" }),
                  a
                    .css({ position: "absolute", bottom: b, top: "auto" })
                    .trigger("sticky_kit:bottom")
                );
            }),
            (y = function () {
              x();
              return l();
            }),
            (H = function () {
              G = !0;
              f.off("touchmove", l);
              f.off("scroll", l);
              f.off("resize", y);
              c(document.body).off("sticky_kit:recalc", y);
              a.off("sticky_kit:detach", H);
              a.removeData("sticky_kit");
              a.css({ position: "", bottom: "", top: "", width: "" });
              g.position("position", "");
              if (m)
                return (
                  null == p &&
                    (("left" !== r && "right" !== r) || a.insertAfter(h),
                    h.remove()),
                  a.removeClass(t)
                );
            }),
            f.on("touchmove", l),
            f.on("scroll", l),
            f.on("resize", y),
            c(document.body).on("sticky_kit:recalc", y),
            a.on("sticky_kit:detach", H),
            setTimeout(l, 0)
          );
      }
    };
    n = 0;
    for (K = this.length; n < K; n++) (b = this[n]), J(c(b));
    return this;
  };
}.call(this));

// library for tabs
// function on
jQuery(document).ready(function () {
  simpleTabsInnit();
});

// В плагине е�?ть �?ледующие опции (указано �?о�?то�?ние по умолчанию):
// jQuery('ul.tabset').contentTabs({
// 	activeClass: 'active',	// активный кла�?�? дл�? таб-�?�?ылки
// 	addToParent: false,		// добавл�?ть активный кла�?�? не на �?�?ылку, а не её родител�?
// 	autoHeight: false,		// плавное изменение вы�?оты при �?мене табов (берёт�?�? непо�?ред�?твенный родитель табов)
// 	animSpeed: 500,			// �?коро�?ть анимации
// 	tabLinks: 'a',			// �?електор таб-�?�?ылок внутри таб�?ета
// 	event: 'click'			// �?обытие таб-�?�?ылок "click", "mouseover" и т.п.
// });

function simpleTabsInnit() {
  jQuery(
    ".slide-tabset .tabset, .fade-tabset .tabset, .custom-tabset .tabset"
  ).tabset({
    autoHeight: true,
  });
  jQuery(".no-effect-tabset .tabset").tabset();
}
(function ($, $win) {
  "use strict";

  function Tabset($holder, options) {
    this.$holder = $holder;
    this.options = options;

    this.init();
  }

  Tabset.prototype = {
    init: function () {
      this.$tabLinks = this.$holder.find(this.options.tabLinks);

      this.setStartActiveIndex();
      this.setActiveTab();

      if (this.options.autoHeight) {
        this.$tabHolder = $(
          this.$tabLinks.eq(0).attr(this.options.attrib)
        ).parent();
      }
    },

    setStartActiveIndex: function () {
      var $classTargets = this.getClassTarget(this.$tabLinks);
      var $activeLink = $classTargets.filter("." + this.options.activeClass);
      var $hashLink = this.$tabLinks.filter(
        "[" + this.options.attrib + '="' + location.hash + '"]'
      );
      var activeIndex;

      if (this.options.checkHash && $hashLink.length) {
        $activeLink = $hashLink;
      }

      activeIndex = $classTargets.index($activeLink);

      this.activeTabIndex = this.prevTabIndex =
        activeIndex === -1 ? (this.options.defaultTab ? 0 : null) : activeIndex;
    },

    setActiveTab: function () {
      var self = this;

      this.$tabLinks.each(function (i, link) {
        var $link = $(link);
        var $classTarget = self.getClassTarget($link);
        var $tab = $($link.attr(self.options.attrib));

        if (i !== self.activeTabIndex) {
          $classTarget.removeClass(self.options.activeClass);
          $tab
            .addClass(self.options.tabHiddenClass)
            .removeClass(self.options.activeClass);
        } else {
          $classTarget.addClass(self.options.activeClass);
          $tab
            .removeClass(self.options.tabHiddenClass)
            .addClass(self.options.activeClass);
        }

        self.attachTabLink($link, i);
      });
    },

    attachTabLink: function ($link, i) {
      var self = this;

      $link.on(this.options.event + ".tabset", function (e) {
        e.preventDefault();

        if (
          self.activeTabIndex === self.prevTabIndex &&
          self.activeTabIndex !== i
        ) {
          self.activeTabIndex = i;
          self.switchTabs();
        }
      });
    },

    resizeHolder: function (height) {
      var self = this;

      if (height) {
        this.$tabHolder.height(height);
        setTimeout(function () {
          self.$tabHolder.addClass("transition");
        }, 10);
      } else {
        self.$tabHolder.removeClass("transition").height("");
      }
    },

    switchTabs: function () {
      var self = this;

      var $prevLink = this.$tabLinks.eq(this.prevTabIndex);
      var $nextLink = this.$tabLinks.eq(this.activeTabIndex);

      var $prevTab = this.getTab($prevLink);
      var $nextTab = this.getTab($nextLink);

      $prevTab.removeClass(this.options.activeClass);

      if (self.haveTabHolder()) {
        this.resizeHolder($prevTab.outerHeight());
      }

      setTimeout(
        function () {
          self.getClassTarget($prevLink).removeClass(self.options.activeClass);

          $prevTab.addClass(self.options.tabHiddenClass);
          $nextTab
            .removeClass(self.options.tabHiddenClass)
            .addClass(self.options.activeClass);

          self.getClassTarget($nextLink).addClass(self.options.activeClass);

          if (self.haveTabHolder()) {
            self.resizeHolder($nextTab.outerHeight());

            setTimeout(function () {
              self.resizeHolder();
              self.prevTabIndex = self.activeTabIndex;
            }, self.options.animSpeed);
          } else {
            self.prevTabIndex = self.activeTabIndex;
          }
        },
        this.options.autoHeight ? this.options.animSpeed : 1
      );
    },

    getClassTarget: function ($link) {
      return this.options.addToParent ? $link.parent() : $link;
    },

    getActiveTab: function () {
      return this.getTab(this.$tabLinks.eq(this.activeTabIndex));
    },

    getTab: function ($link) {
      return $($link.attr(this.options.attrib));
    },

    haveTabHolder: function () {
      return this.$tabHolder && this.$tabHolder.length;
    },

    destroy: function () {
      var self = this;

      this.$tabLinks.off(".tabset").each(function () {
        var $link = $(this);

        self.getClassTarget($link).removeClass(self.options.activeClass);
        $($link.attr(self.options.attrib)).removeClass(
          self.options.activeClass + " " + self.options.tabHiddenClass
        );
      });

      this.$holder.removeData("Tabset");
    },
  };

  $.fn.tabset = function (options) {
    options = $.extend(
      {
        activeClass: "active",
        addToParent: false,
        autoHeight: false,
        checkHash: false,
        defaultTab: true,
        animSpeed: 500,
        tabLinks: "a",
        attrib: "href",
        event: "click",
        tabHiddenClass: "js-tab-hidden",
      },
      options
    );
    options.autoHeight = options.autoHeight && $.support.opacity;

    return this.each(function () {
      var $holder = $(this);

      if (!$holder.data("Tabset")) {
        $holder.data("Tabset", new Tabset($holder, options));
      }
    });
  };
})(jQuery, jQuery(window));

// library for accordion
// function on
jQuery(document).ready(function () {
  initAccordion();
});
// function init
function initAccordion() {
  jQuery(".simple-accordion").slideAccordion({
    activeClass: "active",
    opener: ">a.opener",
    slider: ">div.slide",
    animSpeed: 300,
  });
  jQuery(".multilevel-accordion").slideAccordion({
    opener: ">a.opener",
    slider: ">div.slide",
    animSpeed: 300,
    scrollToActiveItem: {
      enable: true,
      breakpoint: 1920, // max-width
      animSpeed: 600,
      extraOffset: null,
    },
  });
}

/*
 * jQuery Accordion plugin new
 */
(function (root, factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("jquery"));
  } else {
    root.SlideAccordion = factory(jQuery);
  }
})(this, function ($) {
  "use strict";
  var accHiddenClass = "js-acc-hidden";

  function SlideAccordion(options) {
    this.options = $.extend(
      true,
      {
        allowClickWhenExpanded: false,
        activeClass: "active",
        opener: ".opener",
        slider: ".slide",
        animSpeed: 300,
        collapsible: true,
        event: "click",
        scrollToActiveItem: {
          enable: false,
          breakpoint: 767, // max-width
          animSpeed: 600,
          extraOffset: null,
        },
      },
      options
    );
    this.init();
  }

  SlideAccordion.prototype = {
    init: function () {
      if (this.options.holder) {
        this.findElements();
        this.setStateOnInit();
        this.attachEvents();
        this.makeCallback("onInit");
      }
    },

    findElements: function () {
      this.$holder = $(this.options.holder).data("SlideAccordion", this);
      this.$items = this.$holder.find(":has(" + this.options.slider + ")");
    },

    setStateOnInit: function () {
      var self = this;

      this.$items.each(function () {
        if (!$(this).hasClass(self.options.activeClass)) {
          $(this).find(self.options.slider).addClass(accHiddenClass);
        }
      });
    },

    attachEvents: function () {
      var self = this;

      this.accordionToggle = function (e) {
        var $item = jQuery(this).closest(self.$items);
        var $actiItem = self.getActiveItem($item);

        if (
          !self.options.allowClickWhenExpanded ||
          !$item.hasClass(self.options.activeClass)
        ) {
          e.preventDefault();
          self.toggle($item, $actiItem);
        }
      };

      this.$items.on(
        this.options.event,
        this.options.opener,
        this.accordionToggle
      );
    },

    toggle: function ($item, $prevItem) {
      if (!$item.hasClass(this.options.activeClass)) {
        this.show($item);
      } else if (this.options.collapsible) {
        this.hide($item);
      }

      if (!$item.is($prevItem) && $prevItem.length) {
        this.hide($prevItem);
      }

      this.makeCallback("beforeToggle");
    },

    show: function ($item) {
      var $slider = $item.find(this.options.slider);

      $item.addClass(this.options.activeClass);
      $slider
        .stop()
        .hide()
        .removeClass(accHiddenClass)
        .slideDown({
          duration: this.options.animSpeed,
          complete: function () {
            $slider.removeAttr("style");
            if (
              this.options.scrollToActiveItem.enable &&
              window.innerWidth <= this.options.scrollToActiveItem.breakpoint
            ) {
              this.goToItem($item);
            }
            this.makeCallback("onShow", $item);
          }.bind(this),
        });

      this.makeCallback("beforeShow", $item);
    },

    hide: function ($item) {
      var $slider = $item.find(this.options.slider);

      $item.removeClass(this.options.activeClass);
      $slider
        .stop()
        .show()
        .slideUp({
          duration: this.options.animSpeed,
          complete: function () {
            $slider.addClass(accHiddenClass);
            $slider.removeAttr("style");
            this.makeCallback("onHide", $item);
          }.bind(this),
        });

      this.makeCallback("beforeHide", $item);
    },

    goToItem: function ($item) {
      var itemOffset = $item.offset().top;

      if (itemOffset < $(window).scrollTop()) {
        // handle extra offset
        if (typeof this.options.scrollToActiveItem.extraOffset === "number") {
          itemOffset -= this.options.scrollToActiveItem.extraOffset;
        } else if (
          typeof this.options.scrollToActiveItem.extraOffset === "function"
        ) {
          itemOffset -= this.options.scrollToActiveItem.extraOffset();
        }

        $("body, html").animate(
          {
            scrollTop: itemOffset,
          },
          this.options.scrollToActiveItem.animSpeed
        );
      }
    },

    getActiveItem: function ($item) {
      return $item.siblings().filter("." + this.options.activeClass);
    },

    makeCallback: function (name) {
      if (typeof this.options[name] === "function") {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.options[name].apply(this, args);
      }
    },

    destroy: function () {
      this.$holder.removeData("SlideAccordion");
      this.$items.off(
        this.options.event,
        this.options.opener,
        this.accordionToggle
      );
      this.$items.removeClass(this.options.activeClass).each(
        function (i, item) {
          $(item)
            .find(this.options.slider)
            .removeAttr("style")
            .removeClass(accHiddenClass);
        }.bind(this)
      );
      this.makeCallback("onDestroy");
    },
  };

  $.fn.slideAccordion = function (opt) {
    var args = Array.prototype.slice.call(arguments);
    var method = args[0];

    return this.each(function () {
      var $holder = jQuery(this);
      var instance = $holder.data("SlideAccordion");

      if (typeof opt === "object" || typeof opt === "undefined") {
        new SlideAccordion(
          $.extend(
            true,
            {
              holder: this,
            },
            opt
          )
        );
      } else if (typeof method === "string" && instance) {
        if (typeof instance[method] === "function") {
          args.shift();
          instance[method].apply(instance, args);
        }
      }
    });
  };

  (function () {
    var tabStyleSheet = $('<style type="text/css">')[0];
    var tabStyleRule = "." + accHiddenClass;
    tabStyleRule +=
      "{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important; width: 100% !important;}";
    if (tabStyleSheet.styleSheet) {
      tabStyleSheet.styleSheet.cssText = tabStyleRule;
    } else {
      tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
    }
    $("head").append(tabStyleSheet);
  })();

  return SlideAccordion;
});

// library for custom form
/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
(function (root, factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("jquery"));
  } else {
    root.jcf = factory(jQuery);
  }
})(this, function ($) {
  "use strict";

  // define version
  var version = "1.1.3";

  // private variables
  var customInstances = [];

  // default global options
  var commonOptions = {
    optionsKey: "jcf",
    dataKey: "jcf-instance",
    rtlClass: "jcf-rtl",
    focusClass: "jcf-focus",
    pressedClass: "jcf-pressed",
    disabledClass: "jcf-disabled",
    hiddenClass: "jcf-hidden",
    resetAppearanceClass: "jcf-reset-appearance",
    unselectableClass: "jcf-unselectable",
  };

  // detect device type
  var isTouchDevice =
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch),
    isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
  commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);

  var isIOS = /(iPad|iPhone).*OS ([0-9_]*) .*/.exec(navigator.userAgent);
  if (isIOS) isIOS = parseFloat(isIOS[2].replace(/_/g, "."));
  commonOptions.ios = isIOS;

  // create global stylesheet if custom forms are used
  var createStyleSheet = function () {
    var styleTag = $("<style>").appendTo("head"),
      styleSheet = styleTag.prop("sheet") || styleTag.prop("styleSheet");

    // crossbrowser style handling
    var addCSSRule = function (selector, rules, index) {
      if (styleSheet.insertRule) {
        styleSheet.insertRule(selector + "{" + rules + "}", index);
      } else {
        styleSheet.addRule(selector, rules, index);
      }
    };

    // add special rules
    addCSSRule(
      "." + commonOptions.hiddenClass,
      "position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none"
    );
    addCSSRule(
      "." + commonOptions.rtlClass + " ." + commonOptions.hiddenClass,
      "right:-9999px !important; left: auto !important"
    );
    addCSSRule(
      "." + commonOptions.unselectableClass,
      "-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);"
    );
    addCSSRule(
      "." + commonOptions.resetAppearanceClass,
      "background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);"
    );

    // detect rtl pages
    var html = $("html"),
      body = $("body");
    if (html.css("direction") === "rtl" || body.css("direction") === "rtl") {
      html.addClass(commonOptions.rtlClass);
    }

    // handle form reset event
    html.on("reset", function () {
      setTimeout(function () {
        api.refreshAll();
      }, 0);
    });

    // mark stylesheet as created
    commonOptions.styleSheetCreated = true;
  };

  // simplified pointer events handler
  (function () {
    var pointerEventsSupported =
        navigator.pointerEnabled || navigator.msPointerEnabled,
      touchEventsSupported =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch),
      eventList,
      eventMap = {},
      eventPrefix = "jcf-";

    // detect events to attach
    if (pointerEventsSupported) {
      eventList = {
        pointerover: navigator.pointerEnabled ? "pointerover" : "MSPointerOver",
        pointerdown: navigator.pointerEnabled ? "pointerdown" : "MSPointerDown",
        pointermove: navigator.pointerEnabled ? "pointermove" : "MSPointerMove",
        pointerup: navigator.pointerEnabled ? "pointerup" : "MSPointerUp",
      };
    } else {
      eventList = {
        pointerover: "mouseover",
        pointerdown: "mousedown" + (touchEventsSupported ? " touchstart" : ""),
        pointermove: "mousemove" + (touchEventsSupported ? " touchmove" : ""),
        pointerup: "mouseup" + (touchEventsSupported ? " touchend" : ""),
      };
    }

    // create event map
    $.each(eventList, function (targetEventName, fakeEventList) {
      $.each(fakeEventList.split(" "), function (index, fakeEventName) {
        eventMap[fakeEventName] = targetEventName;
      });
    });

    // jQuery event hooks
    $.each(eventList, function (eventName, eventHandlers) {
      eventHandlers = eventHandlers.split(" ");
      $.event.special[eventPrefix + eventName] = {
        setup: function () {
          var self = this;
          $.each(eventHandlers, function (index, fallbackEvent) {
            if (self.addEventListener)
              self.addEventListener(fallbackEvent, fixEvent, false);
            else self["on" + fallbackEvent] = fixEvent;
          });
        },
        teardown: function () {
          var self = this;
          $.each(eventHandlers, function (index, fallbackEvent) {
            if (self.addEventListener)
              self.removeEventListener(fallbackEvent, fixEvent, false);
            else self["on" + fallbackEvent] = null;
          });
        },
      };
    });

    // check that mouse event are not simulated by mobile browsers
    var lastTouch = null;
    var mouseEventSimulated = function (e) {
      var dx = Math.abs(e.pageX - lastTouch.x),
        dy = Math.abs(e.pageY - lastTouch.y),
        rangeDistance = 25;

      if (dx <= rangeDistance && dy <= rangeDistance) {
        return true;
      }
    };

    // normalize event
    var fixEvent = function (e) {
      var origEvent = e || window.event,
        touchEventData = null,
        targetEventName = eventMap[origEvent.type];

      e = $.event.fix(origEvent);
      e.type = eventPrefix + targetEventName;

      if (origEvent.pointerType) {
        switch (origEvent.pointerType) {
          case 2:
            e.pointerType = "touch";
            break;
          case 3:
            e.pointerType = "pen";
            break;
          case 4:
            e.pointerType = "mouse";
            break;
          default:
            e.pointerType = origEvent.pointerType;
        }
      } else {
        e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
      }

      if (!e.pageX && !e.pageY) {
        touchEventData = origEvent.changedTouches
          ? origEvent.changedTouches[0]
          : origEvent;
        e.pageX = touchEventData.pageX;
        e.pageY = touchEventData.pageY;
      }

      if (origEvent.type === "touchend") {
        lastTouch = { x: e.pageX, y: e.pageY };
      }
      if (e.pointerType === "mouse" && lastTouch && mouseEventSimulated(e)) {
        return;
      } else {
        return ($.event.dispatch || $.event.handle).call(this, e);
      }
    };
  })();

  // custom mousewheel/trackpad handler
  (function () {
    var wheelEvents = (
        "onwheel" in document || document.documentMode >= 9
          ? "wheel"
          : "mousewheel DOMMouseScroll"
      ).split(" "),
      shimEventName = "jcf-mousewheel";

    $.event.special[shimEventName] = {
      setup: function () {
        var self = this;
        $.each(wheelEvents, function (index, fallbackEvent) {
          if (self.addEventListener)
            self.addEventListener(fallbackEvent, fixEvent, false);
          else self["on" + fallbackEvent] = fixEvent;
        });
      },
      teardown: function () {
        var self = this;
        $.each(wheelEvents, function (index, fallbackEvent) {
          if (self.addEventListener)
            self.removeEventListener(fallbackEvent, fixEvent, false);
          else self["on" + fallbackEvent] = null;
        });
      },
    };

    var fixEvent = function (e) {
      var origEvent = e || window.event;
      e = $.event.fix(origEvent);
      e.type = shimEventName;

      // old wheel events handler
      if ("detail" in origEvent) {
        e.deltaY = -origEvent.detail;
      }
      if ("wheelDelta" in origEvent) {
        e.deltaY = -origEvent.wheelDelta;
      }
      if ("wheelDeltaY" in origEvent) {
        e.deltaY = -origEvent.wheelDeltaY;
      }
      if ("wheelDeltaX" in origEvent) {
        e.deltaX = -origEvent.wheelDeltaX;
      }

      // modern wheel event handler
      if ("deltaY" in origEvent) {
        e.deltaY = origEvent.deltaY;
      }
      if ("deltaX" in origEvent) {
        e.deltaX = origEvent.deltaX;
      }

      // handle deltaMode for mouse wheel
      e.delta = e.deltaY || e.deltaX;
      if (origEvent.deltaMode === 1) {
        var lineHeight = 16;
        e.delta *= lineHeight;
        e.deltaY *= lineHeight;
        e.deltaX *= lineHeight;
      }

      return ($.event.dispatch || $.event.handle).call(this, e);
    };
  })();

  // extra module methods
  var moduleMixin = {
    // provide function for firing native events
    fireNativeEvent: function (elements, eventName) {
      $(elements).each(function () {
        var element = this,
          eventObject;
        if (element.dispatchEvent) {
          eventObject = document.createEvent("HTMLEvents");
          eventObject.initEvent(eventName, true, true);
          element.dispatchEvent(eventObject);
        } else if (document.createEventObject) {
          eventObject = document.createEventObject();
          eventObject.target = element;
          element.fireEvent("on" + eventName, eventObject);
        }
      });
    },
    // bind event handlers for module instance (functions beggining with "on")
    bindHandlers: function () {
      var self = this;
      $.each(self, function (propName, propValue) {
        if (propName.indexOf("on") === 0 && $.isFunction(propValue)) {
          // dont use $.proxy here because it doesn't create unique handler
          self[propName] = function () {
            return propValue.apply(self, arguments);
          };
        }
      });
    },
  };

  // public API
  var api = {
    version: version,
    modules: {},
    getOptions: function () {
      return $.extend({}, commonOptions);
    },
    setOptions: function (moduleName, moduleOptions) {
      if (arguments.length > 1) {
        // set module options
        if (this.modules[moduleName]) {
          $.extend(this.modules[moduleName].prototype.options, moduleOptions);
        }
      } else {
        // set common options
        $.extend(commonOptions, moduleName);
      }
    },
    addModule: function (proto) {
      // add module to list
      var Module = function (options) {
        // save instance to collection
        if (!options.element.data(commonOptions.dataKey)) {
          options.element.data(commonOptions.dataKey, this);
        }
        customInstances.push(this);

        // save options
        this.options = $.extend(
          {},
          commonOptions,
          this.options,
          getInlineOptions(options.element),
          options
        );

        // bind event handlers to instance
        this.bindHandlers();

        // call constructor
        this.init.apply(this, arguments);
      };

      // parse options from HTML attribute
      var getInlineOptions = function (element) {
        var dataOptions = element.data(commonOptions.optionsKey),
          attrOptions = element.attr(commonOptions.optionsKey);

        if (dataOptions) {
          return dataOptions;
        } else if (attrOptions) {
          try {
            return $.parseJSON(attrOptions);
          } catch (e) {
            // ignore invalid attributes
          }
        }
      };

      // set proto as prototype for new module
      Module.prototype = proto;

      // add mixin methods to module proto
      $.extend(proto, moduleMixin);
      if (proto.plugins) {
        $.each(proto.plugins, function (pluginName, plugin) {
          $.extend(plugin.prototype, moduleMixin);
        });
      }

      // override destroy method
      var originalDestroy = Module.prototype.destroy;
      Module.prototype.destroy = function () {
        this.options.element.removeData(this.options.dataKey);

        for (var i = customInstances.length - 1; i >= 0; i--) {
          if (customInstances[i] === this) {
            customInstances.splice(i, 1);
            break;
          }
        }

        if (originalDestroy) {
          originalDestroy.apply(this, arguments);
        }
      };

      // save module to list
      this.modules[proto.name] = Module;
    },
    getInstance: function (element) {
      return $(element).data(commonOptions.dataKey);
    },
    replace: function (elements, moduleName, customOptions) {
      var self = this,
        instance;

      if (!commonOptions.styleSheetCreated) {
        createStyleSheet();
      }

      $(elements).each(function () {
        var moduleOptions,
          element = $(this);

        instance = element.data(commonOptions.dataKey);
        if (instance) {
          instance.refresh();
        } else {
          if (!moduleName) {
            $.each(self.modules, function (currentModuleName, module) {
              if (
                module.prototype.matchElement.call(module.prototype, element)
              ) {
                moduleName = currentModuleName;
                return false;
              }
            });
          }
          if (moduleName) {
            moduleOptions = $.extend({ element: element }, customOptions);
            instance = new self.modules[moduleName](moduleOptions);
          }
        }
      });
      return instance;
    },
    refresh: function (elements) {
      $(elements).each(function () {
        var instance = $(this).data(commonOptions.dataKey);
        if (instance) {
          instance.refresh();
        }
      });
    },
    destroy: function (elements) {
      $(elements).each(function () {
        var instance = $(this).data(commonOptions.dataKey);
        if (instance) {
          instance.destroy();
        }
      });
    },
    replaceAll: function (context) {
      var self = this;
      $.each(this.modules, function (moduleName, module) {
        $(module.prototype.selector, context).each(function () {
          if (this.className.indexOf("jcf-ignore") < 0) {
            self.replace(this, moduleName);
          }
        });
      });
    },
    refreshAll: function (context) {
      if (context) {
        $.each(this.modules, function (moduleName, module) {
          $(module.prototype.selector, context).each(function () {
            var instance = $(this).data(commonOptions.dataKey);
            if (instance) {
              instance.refresh();
            }
          });
        });
      } else {
        for (var i = customInstances.length - 1; i >= 0; i--) {
          customInstances[i].refresh();
        }
      }
    },
    destroyAll: function (context) {
      if (context) {
        $.each(this.modules, function (moduleName, module) {
          $(module.prototype.selector, context).each(function (index, element) {
            var instance = $(element).data(commonOptions.dataKey);
            if (instance) {
              instance.destroy();
            }
          });
        });
      } else {
        while (customInstances.length) {
          customInstances[0].destroy();
        }
      }
    },
  };

  // always export API to the global window object
  window.jcf = api;

  return api;
});

/*!
 * JavaScript Custom Forms : Select Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
(function ($, window) {
  "use strict";

  jcf.addModule({
    name: "Select",
    selector: "select",
    options: {
      element: null,
      multipleCompactStyle: false,
    },
    plugins: {
      ListBox: ListBox,
      ComboBox: ComboBox,
      SelectList: SelectList,
    },
    matchElement: function (element) {
      return element.is("select");
    },
    init: function () {
      this.element = $(this.options.element);
      this.createInstance();
    },
    isListBox: function () {
      return this.element.is("[size]:not([jcf-size]), [multiple]");
    },
    createInstance: function () {
      if (this.instance) {
        this.instance.destroy();
      }
      if (this.isListBox() && !this.options.multipleCompactStyle) {
        this.instance = new ListBox(this.options);
      } else {
        this.instance = new ComboBox(this.options);
      }
    },
    refresh: function () {
      var typeMismatch =
        (this.isListBox() && this.instance instanceof ComboBox) ||
        (!this.isListBox() && this.instance instanceof ListBox);

      if (typeMismatch) {
        this.createInstance();
      } else {
        this.instance.refresh();
      }
    },
    destroy: function () {
      this.instance.destroy();
    },
  });

  // combobox module
  function ComboBox(options) {
    this.options = $.extend(
      {
        wrapNative: true,
        wrapNativeOnMobile: true,
        fakeDropInBody: true,
        useCustomScroll: true,
        flipDropToFit: true,
        maxVisibleItems: 10,
        fakeAreaStructure:
          '<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',
        fakeDropStructure:
          '<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',
        optionClassPrefix: "jcf-option-",
        selectClassPrefix: "jcf-select-",
        dropContentSelector: ".jcf-select-drop-content",
        selectTextSelector: ".jcf-select-text",
        dropActiveClass: "jcf-drop-active",
        flipDropClass: "jcf-drop-flipped",
      },
      options
    );
    this.init();
  }
  $.extend(ComboBox.prototype, {
    init: function () {
      this.initStructure();
      this.bindHandlers();
      this.attachEvents();
      this.refresh();
    },
    initStructure: function () {
      // prepare structure
      this.win = $(window);
      this.doc = $(document);
      this.realElement = $(this.options.element);
      this.fakeElement = $(this.options.fakeAreaStructure).insertAfter(
        this.realElement
      );
      this.selectTextContainer = this.fakeElement.find(
        this.options.selectTextSelector
      );
      this.selectText = $("<span></span>").appendTo(this.selectTextContainer);
      makeUnselectable(this.fakeElement);

      // copy classes from original select
      this.fakeElement.addClass(
        getPrefixedClasses(
          this.realElement.prop("className"),
          this.options.selectClassPrefix
        )
      );

      // handle compact multiple style
      if (this.realElement.prop("multiple")) {
        this.fakeElement.addClass("jcf-compact-multiple");
      }

      // detect device type and dropdown behavior
      if (
        this.options.isMobileDevice &&
        this.options.wrapNativeOnMobile &&
        !this.options.wrapNative
      ) {
        this.options.wrapNative = true;
      }

      if (this.options.wrapNative) {
        // wrap native select inside fake block
        this.realElement
          .prependTo(this.fakeElement)
          .css({
            position: "absolute",
            height: "100%",
            width: "100%",
          })
          .addClass(this.options.resetAppearanceClass);
      } else {
        // just hide native select
        this.realElement.addClass(this.options.hiddenClass);
        this.fakeElement.attr("title", this.realElement.attr("title"));
        this.fakeDropTarget = this.options.fakeDropInBody
          ? $("body")
          : this.fakeElement;
      }
    },
    attachEvents: function () {
      // delayed refresh handler
      var self = this;
      this.delayedRefresh = function () {
        setTimeout(function () {
          self.refresh();
          if (self.list) {
            self.list.refresh();
            self.list.scrollToActiveOption();
          }
        }, 1);
      };

      // native dropdown event handlers
      if (this.options.wrapNative) {
        this.realElement.on({
          focus: this.onFocus,
          change: this.onChange,
          click: this.onChange,
          keydown: this.onChange,
        });
      } else {
        // custom dropdown event handlers
        this.realElement.on({
          focus: this.onFocus,
          change: this.onChange,
          keydown: this.onKeyDown,
        });
        this.fakeElement.on({
          "jcf-pointerdown": this.onSelectAreaPress,
        });
      }
    },
    onKeyDown: function (e) {
      if (e.which === 13) {
        this.toggleDropdown();
      } else if (this.dropActive) {
        this.delayedRefresh();
      }
    },
    onChange: function () {
      this.refresh();
    },
    onFocus: function () {
      if (!this.pressedFlag || !this.focusedFlag) {
        this.fakeElement.addClass(this.options.focusClass);
        this.realElement.on("blur", this.onBlur);
        this.toggleListMode(true);
        this.focusedFlag = true;
      }
    },
    onBlur: function () {
      if (!this.pressedFlag) {
        this.fakeElement.removeClass(this.options.focusClass);
        this.realElement.off("blur", this.onBlur);
        this.toggleListMode(false);
        this.focusedFlag = false;
      }
    },
    onResize: function () {
      if (this.dropActive) {
        this.hideDropdown();
      }
    },
    onSelectDropPress: function () {
      this.pressedFlag = true;
    },
    onSelectDropRelease: function (e, pointerEvent) {
      this.pressedFlag = false;
      if (pointerEvent.pointerType === "mouse") {
        this.realElement.focus();
      }
    },
    onSelectAreaPress: function (e) {
      // skip click if drop inside fake element or real select is disabled
      var dropClickedInsideFakeElement =
        !this.options.fakeDropInBody &&
        $(e.target).closest(this.dropdown).length;
      if (
        dropClickedInsideFakeElement ||
        e.button > 1 ||
        this.realElement.is(":disabled")
      ) {
        return;
      }

      // toggle dropdown visibility
      this.selectOpenedByEvent = e.pointerType;
      this.toggleDropdown();

      // misc handlers
      if (!this.focusedFlag) {
        if (e.pointerType === "mouse") {
          this.realElement.focus();
        } else {
          this.onFocus(e);
        }
      }
      this.pressedFlag = true;
      this.fakeElement.addClass(this.options.pressedClass);
      this.doc.on("jcf-pointerup", this.onSelectAreaRelease);
    },
    onSelectAreaRelease: function (e) {
      if (this.focusedFlag && e.pointerType === "mouse") {
        this.realElement.focus();
      }
      this.pressedFlag = false;
      this.fakeElement.removeClass(this.options.pressedClass);
      this.doc.off("jcf-pointerup", this.onSelectAreaRelease);
    },
    onOutsideClick: function (e) {
      var target = $(e.target),
        clickedInsideSelect =
          target.closest(this.fakeElement).length ||
          target.closest(this.dropdown).length;

      if (!clickedInsideSelect) {
        this.hideDropdown();
      }
    },
    onSelect: function () {
      this.refresh();

      if (this.realElement.prop("multiple")) {
        this.repositionDropdown();
      } else {
        this.hideDropdown();
      }

      this.fireNativeEvent(this.realElement, "change");
    },
    toggleListMode: function (state) {
      if (!this.options.wrapNative) {
        if (state) {
          // temporary change select to list to avoid appearing of native dropdown
          this.realElement.attr({
            size: 4,
            "jcf-size": "",
          });
        } else {
          // restore select from list mode to dropdown select
          if (!this.options.wrapNative) {
            this.realElement.removeAttr("size jcf-size");
          }
        }
      }
    },
    createDropdown: function () {
      // destroy previous dropdown if needed
      if (this.dropdown) {
        this.list.destroy();
        this.dropdown.remove();
      }

      // create new drop container
      this.dropdown = $(this.options.fakeDropStructure).appendTo(
        this.fakeDropTarget
      );
      this.dropdown.addClass(
        getPrefixedClasses(
          this.realElement.prop("className"),
          this.options.selectClassPrefix
        )
      );
      makeUnselectable(this.dropdown);

      // handle compact multiple style
      if (this.realElement.prop("multiple")) {
        this.dropdown.addClass("jcf-compact-multiple");
      }

      // set initial styles for dropdown in body
      if (this.options.fakeDropInBody) {
        this.dropdown.css({
          position: "absolute",
          top: -9999,
        });
      }

      // create new select list instance
      this.list = new SelectList({
        useHoverClass: true,
        handleResize: false,
        alwaysPreventMouseWheel: true,
        maxVisibleItems: this.options.maxVisibleItems,
        useCustomScroll: this.options.useCustomScroll,
        holder: this.dropdown.find(this.options.dropContentSelector),
        multipleSelectWithoutKey: this.realElement.prop("multiple"),
        element: this.realElement,
      });
      $(this.list).on({
        select: this.onSelect,
        press: this.onSelectDropPress,
        release: this.onSelectDropRelease,
      });
    },
    repositionDropdown: function () {
      var selectOffset = this.fakeElement.offset(),
        selectWidth = this.fakeElement.outerWidth(),
        selectHeight = this.fakeElement.outerHeight(),
        dropHeight = this.dropdown.css("width", selectWidth).outerHeight(),
        winScrollTop = this.win.scrollTop(),
        winHeight = this.win.height(),
        calcTop,
        calcLeft,
        bodyOffset,
        needFlipDrop = false;

      // check flip drop position
      if (
        selectOffset.top + selectHeight + dropHeight >
          winScrollTop + winHeight &&
        selectOffset.top - dropHeight > winScrollTop
      ) {
        needFlipDrop = true;
      }

      if (this.options.fakeDropInBody) {
        bodyOffset =
          this.fakeDropTarget.css("position") !== "static"
            ? this.fakeDropTarget.offset().top
            : 0;
        if (this.options.flipDropToFit && needFlipDrop) {
          // calculate flipped dropdown position
          calcLeft = selectOffset.left;
          calcTop = selectOffset.top - dropHeight - bodyOffset;
        } else {
          // calculate default drop position
          calcLeft = selectOffset.left;
          calcTop = selectOffset.top + selectHeight - bodyOffset;
        }

        // update drop styles
        this.dropdown.css({
          width: selectWidth,
          left: calcLeft,
          top: calcTop,
        });
      }

      // refresh flipped class
      this.dropdown
        .add(this.fakeElement)
        .toggleClass(
          this.options.flipDropClass,
          this.options.flipDropToFit && needFlipDrop
        );
    },
    showDropdown: function () {
      // do not show empty custom dropdown
      if (!this.realElement.prop("options").length) {
        return;
      }

      // create options list if not created
      if (!this.dropdown) {
        this.createDropdown();
      }

      // show dropdown
      this.dropActive = true;
      this.dropdown.appendTo(this.fakeDropTarget);
      this.fakeElement.addClass(this.options.dropActiveClass);
      this.refreshSelectedText();
      this.repositionDropdown();
      this.list.setScrollTop(this.savedScrollTop);
      this.list.refresh();

      // add temporary event handlers
      this.win.on("resize", this.onResize);
      this.doc.on("jcf-pointerdown", this.onOutsideClick);
    },
    hideDropdown: function () {
      if (this.dropdown) {
        this.savedScrollTop = this.list.getScrollTop();
        this.fakeElement.removeClass(
          this.options.dropActiveClass + " " + this.options.flipDropClass
        );
        this.dropdown.removeClass(this.options.flipDropClass).detach();
        this.doc.off("jcf-pointerdown", this.onOutsideClick);
        this.win.off("resize", this.onResize);
        this.dropActive = false;
        if (this.selectOpenedByEvent === "touch") {
          this.onBlur();
        }
      }
    },
    toggleDropdown: function () {
      if (this.dropActive) {
        this.hideDropdown();
      } else {
        this.showDropdown();
      }
    },
    refreshSelectedText: function () {
      // redraw selected area
      var selectedIndex = this.realElement.prop("selectedIndex"),
        selectedOption = this.realElement.prop("options")[selectedIndex],
        selectedOptionImage = selectedOption
          ? selectedOption.getAttribute("data-image")
          : null,
        selectedOptionText = "",
        selectedOptionClasses,
        self = this;

      if (this.realElement.prop("multiple")) {
        $.each(this.realElement.prop("options"), function (index, option) {
          if (option.selected) {
            selectedOptionText +=
              (selectedOptionText ? ", " : "") + option.innerHTML;
          }
        });
        if (!selectedOptionText) {
          selectedOptionText = self.realElement.attr("placeholder") || "";
        }
        this.selectText.removeAttr("class").html(selectedOptionText);
      } else if (!selectedOption) {
        if (this.selectImage) {
          this.selectImage.hide();
        }
        this.selectText.removeAttr("class").empty();
      } else if (
        this.currentSelectedText !== selectedOption.innerHTML ||
        this.currentSelectedImage !== selectedOptionImage
      ) {
        selectedOptionClasses = getPrefixedClasses(
          selectedOption.className,
          this.options.optionClassPrefix
        );
        this.selectText
          .attr("class", selectedOptionClasses)
          .html(selectedOption.innerHTML);

        if (selectedOptionImage) {
          if (!this.selectImage) {
            this.selectImage = $("<img>")
              .prependTo(this.selectTextContainer)
              .hide();
          }
          this.selectImage.attr("src", selectedOptionImage).show();
        } else if (this.selectImage) {
          this.selectImage.hide();
        }

        this.currentSelectedText = selectedOption.innerHTML;
        this.currentSelectedImage = selectedOptionImage;
      }
    },
    refresh: function () {
      // refresh fake select visibility
      if (this.realElement.prop("style").display === "none") {
        this.fakeElement.hide();
      } else {
        this.fakeElement.show();
      }

      // refresh selected text
      this.refreshSelectedText();

      // handle disabled state
      this.fakeElement.toggleClass(
        this.options.disabledClass,
        this.realElement.is(":disabled")
      );
    },
    destroy: function () {
      // restore structure
      if (this.options.wrapNative) {
        this.realElement
          .insertBefore(this.fakeElement)
          .css({
            position: "",
            height: "",
            width: "",
          })
          .removeClass(this.options.resetAppearanceClass);
      } else {
        this.realElement.removeClass(this.options.hiddenClass);
        if (this.realElement.is("[jcf-size]")) {
          this.realElement.removeAttr("size jcf-size");
        }
      }

      // removing element will also remove its event handlers
      this.fakeElement.remove();

      // remove other event handlers
      this.doc.off("jcf-pointerup", this.onSelectAreaRelease);
      this.realElement.off({
        focus: this.onFocus,
      });
    },
  });

  // listbox module
  function ListBox(options) {
    this.options = $.extend(
      {
        wrapNative: true,
        useCustomScroll: true,
        fakeStructure:
          '<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',
        selectClassPrefix: "jcf-select-",
        listHolder: ".jcf-list-wrapper",
      },
      options
    );
    this.init();
  }
  $.extend(ListBox.prototype, {
    init: function () {
      this.bindHandlers();
      this.initStructure();
      this.attachEvents();
    },
    initStructure: function () {
      this.realElement = $(this.options.element);
      this.fakeElement = $(this.options.fakeStructure).insertAfter(
        this.realElement
      );
      this.listHolder = this.fakeElement.find(this.options.listHolder);
      makeUnselectable(this.fakeElement);

      // copy classes from original select
      this.fakeElement.addClass(
        getPrefixedClasses(
          this.realElement.prop("className"),
          this.options.selectClassPrefix
        )
      );
      this.realElement.addClass(this.options.hiddenClass);

      this.list = new SelectList({
        useCustomScroll: this.options.useCustomScroll,
        holder: this.listHolder,
        selectOnClick: false,
        element: this.realElement,
      });
    },
    attachEvents: function () {
      // delayed refresh handler
      var self = this;
      this.delayedRefresh = function (e) {
        if (e && e.which === 16) {
          // ignore SHIFT key
          return;
        } else {
          clearTimeout(self.refreshTimer);
          self.refreshTimer = setTimeout(function () {
            self.refresh();
            self.list.scrollToActiveOption();
          }, 1);
        }
      };

      // other event handlers
      this.realElement.on({
        focus: this.onFocus,
        click: this.delayedRefresh,
        keydown: this.delayedRefresh,
      });

      // select list event handlers
      $(this.list).on({
        select: this.onSelect,
        press: this.onFakeOptionsPress,
        release: this.onFakeOptionsRelease,
      });
    },
    onFakeOptionsPress: function (e, pointerEvent) {
      this.pressedFlag = true;
      if (pointerEvent.pointerType === "mouse") {
        this.realElement.focus();
      }
    },
    onFakeOptionsRelease: function (e, pointerEvent) {
      this.pressedFlag = false;
      if (pointerEvent.pointerType === "mouse") {
        this.realElement.focus();
      }
    },
    onSelect: function () {
      this.fireNativeEvent(this.realElement, "change");
      this.fireNativeEvent(this.realElement, "click");
    },
    onFocus: function () {
      if (!this.pressedFlag || !this.focusedFlag) {
        this.fakeElement.addClass(this.options.focusClass);
        this.realElement.on("blur", this.onBlur);
        this.focusedFlag = true;
      }
    },
    onBlur: function () {
      if (!this.pressedFlag) {
        this.fakeElement.removeClass(this.options.focusClass);
        this.realElement.off("blur", this.onBlur);
        this.focusedFlag = false;
      }
    },
    refresh: function () {
      this.fakeElement.toggleClass(
        this.options.disabledClass,
        this.realElement.is(":disabled")
      );
      this.list.refresh();
    },
    destroy: function () {
      this.list.destroy();
      this.realElement
        .insertBefore(this.fakeElement)
        .removeClass(this.options.hiddenClass);
      this.fakeElement.remove();
    },
  });

  // options list module
  function SelectList(options) {
    this.options = $.extend(
      {
        holder: null,
        maxVisibleItems: 10,
        selectOnClick: true,
        useHoverClass: false,
        useCustomScroll: false,
        handleResize: true,
        multipleSelectWithoutKey: false,
        alwaysPreventMouseWheel: false,
        indexAttribute: "data-index",
        cloneClassPrefix: "jcf-option-",
        containerStructure:
          '<span class="jcf-list"><span class="jcf-list-content"></span></span>',
        containerSelector: ".jcf-list-content",
        captionClass: "jcf-optgroup-caption",
        disabledClass: "jcf-disabled",
        optionClass: "jcf-option",
        groupClass: "jcf-optgroup",
        hoverClass: "jcf-hover",
        selectedClass: "jcf-selected",
        scrollClass: "jcf-scroll-active",
      },
      options
    );
    this.init();
  }
  $.extend(SelectList.prototype, {
    init: function () {
      this.initStructure();
      this.refreshSelectedClass();
      this.attachEvents();
    },
    initStructure: function () {
      this.element = $(this.options.element);
      this.indexSelector = "[" + this.options.indexAttribute + "]";
      this.container = $(this.options.containerStructure).appendTo(
        this.options.holder
      );
      this.listHolder = this.container.find(this.options.containerSelector);
      this.lastClickedIndex = this.element.prop("selectedIndex");
      this.rebuildList();
    },
    attachEvents: function () {
      this.bindHandlers();
      this.listHolder.on(
        "jcf-pointerdown",
        this.indexSelector,
        this.onItemPress
      );
      this.listHolder.on("jcf-pointerdown", this.onPress);

      if (this.options.useHoverClass) {
        this.listHolder.on(
          "jcf-pointerover",
          this.indexSelector,
          this.onHoverItem
        );
      }
    },
    onPress: function (e) {
      $(this).trigger("press", e);
      this.listHolder.on("jcf-pointerup", this.onRelease);
    },
    onRelease: function (e) {
      $(this).trigger("release", e);
      this.listHolder.off("jcf-pointerup", this.onRelease);
    },
    onHoverItem: function (e) {
      var hoverIndex = parseFloat(
        e.currentTarget.getAttribute(this.options.indexAttribute)
      );
      this.fakeOptions
        .removeClass(this.options.hoverClass)
        .eq(hoverIndex)
        .addClass(this.options.hoverClass);
    },
    onItemPress: function (e) {
      if (e.pointerType === "touch" || this.options.selectOnClick) {
        // select option after "click"
        this.tmpListOffsetTop = this.list.offset().top;
        this.listHolder.on(
          "jcf-pointerup",
          this.indexSelector,
          this.onItemRelease
        );
      } else {
        // select option immediately
        this.onSelectItem(e);
      }
    },
    onItemRelease: function (e) {
      // remove event handlers and temporary data
      this.listHolder.off(
        "jcf-pointerup",
        this.indexSelector,
        this.onItemRelease
      );

      // simulate item selection
      if (this.tmpListOffsetTop === this.list.offset().top) {
        this.listHolder.on(
          "click",
          this.indexSelector,
          { savedPointerType: e.pointerType },
          this.onSelectItem
        );
      }
      delete this.tmpListOffsetTop;
    },
    onSelectItem: function (e) {
      var clickedIndex = parseFloat(
          e.currentTarget.getAttribute(this.options.indexAttribute)
        ),
        pointerType =
          (e.data && e.data.savedPointerType) || e.pointerType || "mouse",
        range;

      // remove click event handler
      this.listHolder.off("click", this.indexSelector, this.onSelectItem);

      // ignore clicks on disabled options
      if (e.button > 1 || this.realOptions[clickedIndex].disabled) {
        return;
      }

      if (this.element.prop("multiple")) {
        if (
          e.metaKey ||
          e.ctrlKey ||
          pointerType === "touch" ||
          this.options.multipleSelectWithoutKey
        ) {
          // if CTRL/CMD pressed or touch devices - toggle selected option
          this.realOptions[clickedIndex].selected =
            !this.realOptions[clickedIndex].selected;
        } else if (e.shiftKey) {
          // if SHIFT pressed - update selection
          range = [this.lastClickedIndex, clickedIndex].sort(function (a, b) {
            return a - b;
          });
          this.realOptions.each(function (index, option) {
            option.selected = index >= range[0] && index <= range[1];
          });
        } else {
          // set single selected index
          this.element.prop("selectedIndex", clickedIndex);
        }
      } else {
        this.element.prop("selectedIndex", clickedIndex);
      }

      // save last clicked option
      if (!e.shiftKey) {
        this.lastClickedIndex = clickedIndex;
      }

      // refresh classes
      this.refreshSelectedClass();

      // scroll to active item in desktop browsers
      if (pointerType === "mouse") {
        this.scrollToActiveOption();
      }

      // make callback when item selected
      $(this).trigger("select");
    },
    rebuildList: function () {
      // rebuild options
      var self = this,
        rootElement = this.element[0];

      // recursively create fake options
      this.storedSelectHTML = rootElement.innerHTML;
      this.optionIndex = 0;
      this.list = $(this.createOptionsList(rootElement));
      this.listHolder.empty().append(this.list);
      this.realOptions = this.element.find("option");
      this.fakeOptions = this.list.find(this.indexSelector);
      this.fakeListItems = this.list.find(
        "." + this.options.captionClass + "," + this.indexSelector
      );
      delete this.optionIndex;

      // detect max visible items
      var maxCount = this.options.maxVisibleItems,
        sizeValue = this.element.prop("size");
      if (sizeValue > 1 && !this.element.is("[jcf-size]")) {
        maxCount = sizeValue;
      }

      // handle scrollbar
      var needScrollBar = this.fakeOptions.length > maxCount;
      this.container.toggleClass(this.options.scrollClass, needScrollBar);
      if (needScrollBar) {
        // change max-height
        this.listHolder.css({
          maxHeight: this.getOverflowHeight(maxCount),
          overflow: "auto",
        });

        if (this.options.useCustomScroll && jcf.modules.Scrollable) {
          // add custom scrollbar if specified in options
          jcf.replace(this.listHolder, "Scrollable", {
            handleResize: this.options.handleResize,
            alwaysPreventMouseWheel: this.options.alwaysPreventMouseWheel,
          });
          return;
        }
      }

      // disable edge wheel scrolling
      if (this.options.alwaysPreventMouseWheel) {
        this.preventWheelHandler = function (e) {
          var currentScrollTop = self.listHolder.scrollTop(),
            maxScrollTop =
              self.listHolder.prop("scrollHeight") -
              self.listHolder.innerHeight();

          // check edge cases
          if (
            (currentScrollTop <= 0 && e.deltaY < 0) ||
            (currentScrollTop >= maxScrollTop && e.deltaY > 0)
          ) {
            e.preventDefault();
          }
        };
        this.listHolder.on("jcf-mousewheel", this.preventWheelHandler);
      }
    },
    refreshSelectedClass: function () {
      var self = this,
        selectedItem,
        isMultiple = this.element.prop("multiple"),
        selectedIndex = this.element.prop("selectedIndex");

      if (isMultiple) {
        this.realOptions.each(function (index, option) {
          self.fakeOptions
            .eq(index)
            .toggleClass(self.options.selectedClass, !!option.selected);
        });
      } else {
        this.fakeOptions.removeClass(
          this.options.selectedClass + " " + this.options.hoverClass
        );
        selectedItem = this.fakeOptions
          .eq(selectedIndex)
          .addClass(this.options.selectedClass);
        if (this.options.useHoverClass) {
          selectedItem.addClass(this.options.hoverClass);
        }
      }
    },
    scrollToActiveOption: function () {
      // scroll to target option
      var targetOffset = this.getActiveOptionOffset();
      if (typeof targetOffset === "number") {
        this.listHolder.prop("scrollTop", targetOffset);
      }
    },
    getSelectedIndexRange: function () {
      var firstSelected = -1,
        lastSelected = -1;
      this.realOptions.each(function (index, option) {
        if (option.selected) {
          if (firstSelected < 0) {
            firstSelected = index;
          }
          lastSelected = index;
        }
      });
      return [firstSelected, lastSelected];
    },
    getChangedSelectedIndex: function () {
      var selectedIndex = this.element.prop("selectedIndex"),
        targetIndex;

      if (this.element.prop("multiple")) {
        // multiple selects handling
        if (!this.previousRange) {
          this.previousRange = [selectedIndex, selectedIndex];
        }
        this.currentRange = this.getSelectedIndexRange();
        targetIndex =
          this.currentRange[
            this.currentRange[0] !== this.previousRange[0] ? 0 : 1
          ];
        this.previousRange = this.currentRange;
        return targetIndex;
      } else {
        // single choice selects handling
        return selectedIndex;
      }
    },
    getActiveOptionOffset: function () {
      // calc values
      var dropHeight = this.listHolder.height(),
        dropScrollTop = this.listHolder.prop("scrollTop"),
        currentIndex = this.getChangedSelectedIndex(),
        fakeOption = this.fakeOptions.eq(currentIndex),
        fakeOptionOffset = fakeOption.offset().top - this.list.offset().top,
        fakeOptionHeight = fakeOption.innerHeight();

      // scroll list
      if (fakeOptionOffset + fakeOptionHeight >= dropScrollTop + dropHeight) {
        // scroll down (always scroll to option)
        return fakeOptionOffset - dropHeight + fakeOptionHeight;
      } else if (fakeOptionOffset < dropScrollTop) {
        // scroll up to option
        return fakeOptionOffset;
      }
    },
    getOverflowHeight: function (sizeValue) {
      var item = this.fakeListItems.eq(sizeValue - 1),
        listOffset = this.list.offset().top,
        itemOffset = item.offset().top,
        itemHeight = item.innerHeight();

      return itemOffset + itemHeight - listOffset;
    },
    getScrollTop: function () {
      return this.listHolder.scrollTop();
    },
    setScrollTop: function (value) {
      this.listHolder.scrollTop(value);
    },
    createOption: function (option) {
      var newOption = document.createElement("span");
      newOption.className = this.options.optionClass;
      newOption.innerHTML = option.innerHTML;
      newOption.setAttribute(this.options.indexAttribute, this.optionIndex++);

      var optionImage,
        optionImageSrc = option.getAttribute("data-image");
      if (optionImageSrc) {
        optionImage = document.createElement("img");
        optionImage.src = optionImageSrc;
        newOption.insertBefore(optionImage, newOption.childNodes[0]);
      }
      if (option.disabled) {
        newOption.className += " " + this.options.disabledClass;
      }
      if (option.className) {
        newOption.className +=
          " " +
          getPrefixedClasses(option.className, this.options.cloneClassPrefix);
      }
      return newOption;
    },
    createOptGroup: function (optgroup) {
      var optGroupContainer = document.createElement("span"),
        optGroupName = optgroup.getAttribute("label"),
        optGroupCaption,
        optGroupList;

      // create caption
      optGroupCaption = document.createElement("span");
      optGroupCaption.className = this.options.captionClass;
      optGroupCaption.innerHTML = optGroupName;
      optGroupContainer.appendChild(optGroupCaption);

      // create list of options
      if (optgroup.children.length) {
        optGroupList = this.createOptionsList(optgroup);
        optGroupContainer.appendChild(optGroupList);
      }

      optGroupContainer.className = this.options.groupClass;
      return optGroupContainer;
    },
    createOptionContainer: function () {
      var optionContainer = document.createElement("li");
      return optionContainer;
    },
    createOptionsList: function (container) {
      var self = this,
        list = document.createElement("ul");

      $.each(container.children, function (index, currentNode) {
        var item = self.createOptionContainer(currentNode),
          newNode;

        switch (currentNode.tagName.toLowerCase()) {
          case "option":
            newNode = self.createOption(currentNode);
            break;
          case "optgroup":
            newNode = self.createOptGroup(currentNode);
            break;
        }
        list.appendChild(item).appendChild(newNode);
      });
      return list;
    },
    refresh: function () {
      // check for select innerHTML changes
      if (this.storedSelectHTML !== this.element.prop("innerHTML")) {
        this.rebuildList();
      }

      // refresh custom scrollbar
      var scrollInstance = jcf.getInstance(this.listHolder);
      if (scrollInstance) {
        scrollInstance.refresh();
      }

      // refresh selectes classes
      this.refreshSelectedClass();
    },
    destroy: function () {
      this.listHolder.off("jcf-mousewheel", this.preventWheelHandler);
      this.listHolder.off(
        "jcf-pointerdown",
        this.indexSelector,
        this.onSelectItem
      );
      this.listHolder.off(
        "jcf-pointerover",
        this.indexSelector,
        this.onHoverItem
      );
      this.listHolder.off("jcf-pointerdown", this.onPress);
    },
  });

  // helper functions
  var getPrefixedClasses = function (className, prefixToAdd) {
    return className
      ? className.replace(/[\s]*([\S]+)+[\s]*/gi, prefixToAdd + "$1 ")
      : "";
  };
  var makeUnselectable = (function () {
    var unselectableClass = jcf.getOptions().unselectableClass;
    function preventHandler(e) {
      e.preventDefault();
    }
    return function (node) {
      node.addClass(unselectableClass).on("selectstart", preventHandler);
    };
  })();
})(jQuery, this);

/*!
 * JavaScript Custom Forms : Radio Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
(function ($) {
  "use strict";

  jcf.addModule({
    name: "Radio",
    selector: 'input[type="radio"]',
    options: {
      wrapNative: true,
      checkedClass: "jcf-checked",
      uncheckedClass: "jcf-unchecked",
      labelActiveClass: "jcf-label-active",
      fakeStructure: '<span class="jcf-radio"><span></span></span>',
    },
    matchElement: function (element) {
      return element.is(":radio");
    },
    init: function () {
      this.initStructure();
      this.attachEvents();
      this.refresh();
    },
    initStructure: function () {
      // prepare structure
      this.doc = $(document);
      this.realElement = $(this.options.element);
      this.fakeElement = $(this.options.fakeStructure).insertAfter(
        this.realElement
      );
      this.labelElement = this.getLabelFor();

      if (this.options.wrapNative) {
        // wrap native radio inside fake block
        this.realElement.prependTo(this.fakeElement).css({
          position: "absolute",
          opacity: 0,
        });
      } else {
        // just hide native radio
        this.realElement.addClass(this.options.hiddenClass);
      }
    },
    attachEvents: function () {
      // add event handlers
      this.realElement.on({
        focus: this.onFocus,
        click: this.onRealClick,
      });
      this.fakeElement.on("click", this.onFakeClick);
      this.fakeElement.on("jcf-pointerdown", this.onPress);
    },
    onRealClick: function (e) {
      // redraw current radio and its group (setTimeout handles click that might be prevented)
      var self = this;
      this.savedEventObject = e;
      setTimeout(function () {
        self.refreshRadioGroup();
      }, 0);
    },
    onFakeClick: function (e) {
      // skip event if clicked on real element inside wrapper
      if (this.options.wrapNative && this.realElement.is(e.target)) {
        return;
      }

      // toggle checked class
      if (!this.realElement.is(":disabled")) {
        delete this.savedEventObject;
        this.currentActiveRadio = this.getCurrentActiveRadio();
        this.stateChecked = this.realElement.prop("checked");
        this.realElement.prop("checked", true);
        this.fireNativeEvent(this.realElement, "click");
        if (
          this.savedEventObject &&
          this.savedEventObject.isDefaultPrevented()
        ) {
          this.realElement.prop("checked", this.stateChecked);
          this.currentActiveRadio.prop("checked", true);
        } else {
          this.fireNativeEvent(this.realElement, "change");
        }
        delete this.savedEventObject;
      }
    },
    onFocus: function () {
      if (!this.pressedFlag || !this.focusedFlag) {
        this.focusedFlag = true;
        this.fakeElement.addClass(this.options.focusClass);
        this.realElement.on("blur", this.onBlur);
      }
    },
    onBlur: function () {
      if (!this.pressedFlag) {
        this.focusedFlag = false;
        this.fakeElement.removeClass(this.options.focusClass);
        this.realElement.off("blur", this.onBlur);
      }
    },
    onPress: function (e) {
      if (!this.focusedFlag && e.pointerType === "mouse") {
        this.realElement.focus();
      }
      this.pressedFlag = true;
      this.fakeElement.addClass(this.options.pressedClass);
      this.doc.on("jcf-pointerup", this.onRelease);
    },
    onRelease: function (e) {
      if (this.focusedFlag && e.pointerType === "mouse") {
        this.realElement.focus();
      }
      this.pressedFlag = false;
      this.fakeElement.removeClass(this.options.pressedClass);
      this.doc.off("jcf-pointerup", this.onRelease);
    },
    getCurrentActiveRadio: function () {
      return this.getRadioGroup(this.realElement).filter(":checked");
    },
    getRadioGroup: function (radio) {
      // find radio group for specified radio button
      var name = radio.attr("name"),
        parentForm = radio.parents("form");

      if (name) {
        if (parentForm.length) {
          return parentForm.find('input[name="' + name + '"]');
        } else {
          return $('input[name="' + name + '"]:not(form input)');
        }
      } else {
        return radio;
      }
    },
    getLabelFor: function () {
      var parentLabel = this.realElement.closest("label"),
        elementId = this.realElement.prop("id");

      if (!parentLabel.length && elementId) {
        parentLabel = $('label[for="' + elementId + '"]');
      }
      return parentLabel.length ? parentLabel : null;
    },
    refreshRadioGroup: function () {
      // redraw current radio and its group
      this.getRadioGroup(this.realElement).each(function () {
        jcf.refresh(this);
      });
    },
    refresh: function () {
      // redraw current radio button
      var isChecked = this.realElement.is(":checked"),
        isDisabled = this.realElement.is(":disabled");

      this.fakeElement
        .toggleClass(this.options.checkedClass, isChecked)
        .toggleClass(this.options.uncheckedClass, !isChecked)
        .toggleClass(this.options.disabledClass, isDisabled);

      if (this.labelElement) {
        this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
      }
    },
    destroy: function () {
      // restore structure
      if (this.options.wrapNative) {
        this.realElement.insertBefore(this.fakeElement).css({
          position: "",
          width: "",
          height: "",
          opacity: "",
          margin: "",
        });
      } else {
        this.realElement.removeClass(this.options.hiddenClass);
      }

      // removing element will also remove its event handlers
      this.fakeElement.off("jcf-pointerdown", this.onPress);
      this.fakeElement.remove();

      // remove other event handlers
      this.doc.off("jcf-pointerup", this.onRelease);
      this.realElement.off({
        blur: this.onBlur,
        focus: this.onFocus,
        click: this.onRealClick,
      });
    },
  });
})(jQuery);

/*!
 * JavaScript Custom Forms : Checkbox Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
(function ($) {
  "use strict";

  jcf.addModule({
    name: "Checkbox",
    selector: 'input[type="checkbox"]',
    options: {
      wrapNative: true,
      checkedClass: "jcf-checked",
      uncheckedClass: "jcf-unchecked",
      labelActiveClass: "jcf-label-active",
      fakeStructure: '<span class="jcf-checkbox"><span></span></span>',
    },
    matchElement: function (element) {
      return element.is(":checkbox");
    },
    init: function () {
      this.initStructure();
      this.attachEvents();
      this.refresh();
    },
    initStructure: function () {
      // prepare structure
      this.doc = $(document);
      this.realElement = $(this.options.element);
      this.fakeElement = $(this.options.fakeStructure).insertAfter(
        this.realElement
      );
      this.labelElement = this.getLabelFor();

      if (this.options.wrapNative) {
        // wrap native checkbox inside fake block
        this.realElement.appendTo(this.fakeElement).css({
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: 0,
          margin: 0,
        });
      } else {
        // just hide native checkbox
        this.realElement.addClass(this.options.hiddenClass);
      }
    },
    attachEvents: function () {
      // add event handlers
      this.realElement.on({
        focus: this.onFocus,
        click: this.onRealClick,
      });
      this.fakeElement.on("click", this.onFakeClick);
      this.fakeElement.on("jcf-pointerdown", this.onPress);
    },
    onRealClick: function (e) {
      // just redraw fake element (setTimeout handles click that might be prevented)
      var self = this;
      this.savedEventObject = e;
      setTimeout(function () {
        self.refresh();
      }, 0);
    },
    onFakeClick: function (e) {
      // skip event if clicked on real element inside wrapper
      if (this.options.wrapNative && this.realElement.is(e.target)) {
        return;
      }

      // toggle checked class
      if (!this.realElement.is(":disabled")) {
        delete this.savedEventObject;
        this.stateChecked = this.realElement.prop("checked");
        this.realElement.prop("checked", !this.stateChecked);
        this.fireNativeEvent(this.realElement, "click");
        if (
          this.savedEventObject &&
          this.savedEventObject.isDefaultPrevented()
        ) {
          this.realElement.prop("checked", this.stateChecked);
        } else {
          this.fireNativeEvent(this.realElement, "change");
        }
        delete this.savedEventObject;
      }
    },
    onFocus: function () {
      if (!this.pressedFlag || !this.focusedFlag) {
        this.focusedFlag = true;
        this.fakeElement.addClass(this.options.focusClass);
        this.realElement.on("blur", this.onBlur);
      }
    },
    onBlur: function () {
      if (!this.pressedFlag) {
        this.focusedFlag = false;
        this.fakeElement.removeClass(this.options.focusClass);
        this.realElement.off("blur", this.onBlur);
      }
    },
    onPress: function (e) {
      if (!this.focusedFlag && e.pointerType === "mouse") {
        this.realElement.focus();
      }
      this.pressedFlag = true;
      this.fakeElement.addClass(this.options.pressedClass);
      this.doc.on("jcf-pointerup", this.onRelease);
    },
    onRelease: function (e) {
      if (this.focusedFlag && e.pointerType === "mouse") {
        this.realElement.focus();
      }
      this.pressedFlag = false;
      this.fakeElement.removeClass(this.options.pressedClass);
      this.doc.off("jcf-pointerup", this.onRelease);
    },
    getLabelFor: function () {
      var parentLabel = this.realElement.closest("label"),
        elementId = this.realElement.prop("id");

      if (!parentLabel.length && elementId) {
        parentLabel = $('label[for="' + elementId + '"]');
      }
      return parentLabel.length ? parentLabel : null;
    },
    refresh: function () {
      // redraw custom checkbox
      var isChecked = this.realElement.is(":checked"),
        isDisabled = this.realElement.is(":disabled");

      this.fakeElement
        .toggleClass(this.options.checkedClass, isChecked)
        .toggleClass(this.options.uncheckedClass, !isChecked)
        .toggleClass(this.options.disabledClass, isDisabled);

      if (this.labelElement) {
        this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
      }
    },
    destroy: function () {
      // restore structure
      if (this.options.wrapNative) {
        this.realElement.insertBefore(this.fakeElement).css({
          position: "",
          width: "",
          height: "",
          opacity: "",
          margin: "",
        });
      } else {
        this.realElement.removeClass(this.options.hiddenClass);
      }

      // removing element will also remove its event handlers
      this.fakeElement.off("jcf-pointerdown", this.onPress);
      this.fakeElement.remove();

      // remove other event handlers
      this.doc.off("jcf-pointerup", this.onRelease);
      this.realElement.off({
        focus: this.onFocus,
        click: this.onRealClick,
      });
    },
  });
})(jQuery);

// library for counter https://github.com/bfintal/Counter-Up
/*!
Waypoints - 4.0.1
Copyright � 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
!(function () {
  "use strict";
  function t(o) {
    if (!o) throw new Error("No options passed to Waypoint constructor");
    if (!o.element)
      throw new Error("No element option passed to Waypoint constructor");
    if (!o.handler)
      throw new Error("No handler option passed to Waypoint constructor");
    (this.key = "waypoint-" + e),
      (this.options = t.Adapter.extend({}, t.defaults, o)),
      (this.element = this.options.element),
      (this.adapter = new t.Adapter(this.element)),
      (this.callback = o.handler),
      (this.axis = this.options.horizontal ? "horizontal" : "vertical"),
      (this.enabled = this.options.enabled),
      (this.triggerPoint = null),
      (this.group = t.Group.findOrCreate({
        name: this.options.group,
        axis: this.axis,
      })),
      (this.context = t.Context.findOrCreateByElement(this.options.context)),
      t.offsetAliases[this.options.offset] &&
        (this.options.offset = t.offsetAliases[this.options.offset]),
      this.group.add(this),
      this.context.add(this),
      (i[this.key] = this),
      (e += 1);
  }
  var e = 0,
    i = {};
  (t.prototype.queueTrigger = function (t) {
    this.group.queueTrigger(this, t);
  }),
    (t.prototype.trigger = function (t) {
      this.enabled && this.callback && this.callback.apply(this, t);
    }),
    (t.prototype.destroy = function () {
      this.context.remove(this), this.group.remove(this), delete i[this.key];
    }),
    (t.prototype.disable = function () {
      return (this.enabled = !1), this;
    }),
    (t.prototype.enable = function () {
      return this.context.refresh(), (this.enabled = !0), this;
    }),
    (t.prototype.next = function () {
      return this.group.next(this);
    }),
    (t.prototype.previous = function () {
      return this.group.previous(this);
    }),
    (t.invokeAll = function (t) {
      var e = [];
      for (var o in i) e.push(i[o]);
      for (var n = 0, r = e.length; r > n; n++) e[n][t]();
    }),
    (t.destroyAll = function () {
      t.invokeAll("destroy");
    }),
    (t.disableAll = function () {
      t.invokeAll("disable");
    }),
    (t.enableAll = function () {
      t.Context.refreshAll();
      for (var e in i) i[e].enabled = !0;
      return this;
    }),
    (t.refreshAll = function () {
      t.Context.refreshAll();
    }),
    (t.viewportHeight = function () {
      return window.innerHeight || document.documentElement.clientHeight;
    }),
    (t.viewportWidth = function () {
      return document.documentElement.clientWidth;
    }),
    (t.adapters = []),
    (t.defaults = {
      context: window,
      continuous: !0,
      enabled: !0,
      group: "default",
      horizontal: !1,
      offset: 0,
    }),
    (t.offsetAliases = {
      "bottom-in-view": function () {
        return this.context.innerHeight() - this.adapter.outerHeight();
      },
      "right-in-view": function () {
        return this.context.innerWidth() - this.adapter.outerWidth();
      },
    }),
    (window.Waypoint = t);
})(),
  (function () {
    "use strict";
    function t(t) {
      window.setTimeout(t, 1e3 / 60);
    }
    function e(t) {
      (this.element = t),
        (this.Adapter = n.Adapter),
        (this.adapter = new this.Adapter(t)),
        (this.key = "waypoint-context-" + i),
        (this.didScroll = !1),
        (this.didResize = !1),
        (this.oldScroll = {
          x: this.adapter.scrollLeft(),
          y: this.adapter.scrollTop(),
        }),
        (this.waypoints = { vertical: {}, horizontal: {} }),
        (t.waypointContextKey = this.key),
        (o[t.waypointContextKey] = this),
        (i += 1),
        n.windowContext ||
          ((n.windowContext = !0), (n.windowContext = new e(window))),
        this.createThrottledScrollHandler(),
        this.createThrottledResizeHandler();
    }
    var i = 0,
      o = {},
      n = window.Waypoint,
      r = window.onload;
    (e.prototype.add = function (t) {
      var e = t.options.horizontal ? "horizontal" : "vertical";
      (this.waypoints[e][t.key] = t), this.refresh();
    }),
      (e.prototype.checkEmpty = function () {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
          e = this.Adapter.isEmptyObject(this.waypoints.vertical),
          i = this.element == this.element.window;
        t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key]);
      }),
      (e.prototype.createThrottledResizeHandler = function () {
        function t() {
          e.handleResize(), (e.didResize = !1);
        }
        var e = this;
        this.adapter.on("resize.waypoints", function () {
          e.didResize || ((e.didResize = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.createThrottledScrollHandler = function () {
        function t() {
          e.handleScroll(), (e.didScroll = !1);
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function () {
          (!e.didScroll || n.isTouch) &&
            ((e.didScroll = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.handleResize = function () {
        n.Context.refreshAll();
      }),
      (e.prototype.handleScroll = function () {
        var t = {},
          e = {
            horizontal: {
              newScroll: this.adapter.scrollLeft(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
            },
            vertical: {
              newScroll: this.adapter.scrollTop(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
            },
          };
        for (var i in e) {
          var o = e[i],
            n = o.newScroll > o.oldScroll,
            r = n ? o.forward : o.backward;
          for (var s in this.waypoints[i]) {
            var a = this.waypoints[i][s];
            if (null !== a.triggerPoint) {
              var l = o.oldScroll < a.triggerPoint,
                h = o.newScroll >= a.triggerPoint,
                p = l && h,
                u = !l && !h;
              (p || u) && (a.queueTrigger(r), (t[a.group.id] = a.group));
            }
          }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll };
      }),
      (e.prototype.innerHeight = function () {
        return this.element == this.element.window
          ? n.viewportHeight()
          : this.adapter.innerHeight();
      }),
      (e.prototype.remove = function (t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty();
      }),
      (e.prototype.innerWidth = function () {
        return this.element == this.element.window
          ? n.viewportWidth()
          : this.adapter.innerWidth();
      }),
      (e.prototype.destroy = function () {
        var t = [];
        for (var e in this.waypoints)
          for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy();
      }),
      (e.prototype.refresh = function () {
        var t,
          e = this.element == this.element.window,
          i = e ? void 0 : this.adapter.offset(),
          o = {};
        this.handleScroll(),
          (t = {
            horizontal: {
              contextOffset: e ? 0 : i.left,
              contextScroll: e ? 0 : this.oldScroll.x,
              contextDimension: this.innerWidth(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
              offsetProp: "left",
            },
            vertical: {
              contextOffset: e ? 0 : i.top,
              contextScroll: e ? 0 : this.oldScroll.y,
              contextDimension: this.innerHeight(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
              offsetProp: "top",
            },
          });
        for (var r in t) {
          var s = t[r];
          for (var a in this.waypoints[r]) {
            var l,
              h,
              p,
              u,
              c,
              d = this.waypoints[r][a],
              f = d.options.offset,
              w = d.triggerPoint,
              y = 0,
              g = null == w;
            d.element !== d.element.window &&
              (y = d.adapter.offset()[s.offsetProp]),
              "function" == typeof f
                ? (f = f.apply(d))
                : "string" == typeof f &&
                  ((f = parseFloat(f)),
                  d.options.offset.indexOf("%") > -1 &&
                    (f = Math.ceil((s.contextDimension * f) / 100))),
              (l = s.contextScroll - s.contextOffset),
              (d.triggerPoint = Math.floor(y + l - f)),
              (h = w < s.oldScroll),
              (p = d.triggerPoint >= s.oldScroll),
              (u = h && p),
              (c = !h && !p),
              !g && u
                ? (d.queueTrigger(s.backward), (o[d.group.id] = d.group))
                : !g && c
                ? (d.queueTrigger(s.forward), (o[d.group.id] = d.group))
                : g &&
                  s.oldScroll >= d.triggerPoint &&
                  (d.queueTrigger(s.forward), (o[d.group.id] = d.group));
          }
        }
        return (
          n.requestAnimationFrame(function () {
            for (var t in o) o[t].flushTriggers();
          }),
          this
        );
      }),
      (e.findOrCreateByElement = function (t) {
        return e.findByElement(t) || new e(t);
      }),
      (e.refreshAll = function () {
        for (var t in o) o[t].refresh();
      }),
      (e.findByElement = function (t) {
        return o[t.waypointContextKey];
      }),
      (window.onload = function () {
        r && r(), e.refreshAll();
      }),
      (n.requestAnimationFrame = function (e) {
        var i =
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          t;
        i.call(window, e);
      }),
      (n.Context = e);
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      return t.triggerPoint - e.triggerPoint;
    }
    function e(t, e) {
      return e.triggerPoint - t.triggerPoint;
    }
    function i(t) {
      (this.name = t.name),
        (this.axis = t.axis),
        (this.id = this.name + "-" + this.axis),
        (this.waypoints = []),
        this.clearTriggerQueues(),
        (o[this.axis][this.name] = this);
    }
    var o = { vertical: {}, horizontal: {} },
      n = window.Waypoint;
    (i.prototype.add = function (t) {
      this.waypoints.push(t);
    }),
      (i.prototype.clearTriggerQueues = function () {
        this.triggerQueues = { up: [], down: [], left: [], right: [] };
      }),
      (i.prototype.flushTriggers = function () {
        for (var i in this.triggerQueues) {
          var o = this.triggerQueues[i],
            n = "up" === i || "left" === i;
          o.sort(n ? e : t);
          for (var r = 0, s = o.length; s > r; r += 1) {
            var a = o[r];
            (a.options.continuous || r === o.length - 1) && a.trigger([i]);
          }
        }
        this.clearTriggerQueues();
      }),
      (i.prototype.next = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
          o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1];
      }),
      (i.prototype.previous = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null;
      }),
      (i.prototype.queueTrigger = function (t, e) {
        this.triggerQueues[e].push(t);
      }),
      (i.prototype.remove = function (t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1);
      }),
      (i.prototype.first = function () {
        return this.waypoints[0];
      }),
      (i.prototype.last = function () {
        return this.waypoints[this.waypoints.length - 1];
      }),
      (i.findOrCreate = function (t) {
        return o[t.axis][t.name] || new i(t);
      }),
      (n.Group = i);
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.$element = e(t);
    }
    var e = window.jQuery,
      i = window.Waypoint;
    e.each(
      [
        "innerHeight",
        "innerWidth",
        "off",
        "offset",
        "on",
        "outerHeight",
        "outerWidth",
        "scrollLeft",
        "scrollTop",
      ],
      function (e, i) {
        t.prototype[i] = function () {
          var t = Array.prototype.slice.call(arguments);
          return this.$element[i].apply(this.$element, t);
        };
      }
    ),
      e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
        t[o] = e[o];
      }),
      i.adapters.push({ name: "jquery", Adapter: t }),
      (i.Adapter = t);
  })(),
  (function () {
    "use strict";
    function t(t) {
      return function () {
        var i = [],
          o = arguments[0];
        return (
          t.isFunction(arguments[0]) &&
            ((o = t.extend({}, arguments[1])), (o.handler = arguments[0])),
          this.each(function () {
            var n = t.extend({}, o, { element: this });
            "string" == typeof n.context &&
              (n.context = t(this).closest(n.context)[0]),
              i.push(new e(n));
          }),
          i
        );
      };
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
      window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
  })();
/*!
 * jquery.counterup.js 1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Date: Nov 26, 2013
 */ (function (e) {
  "use strict";
  e.fn.counterUp = function (t) {
    var n = e.extend({ time: 400, delay: 10 }, t);
    return this.each(function () {
      var t = e(this),
        r = n,
        i = function () {
          var e = [],
            n = r.time / r.delay,
            i = t.text(),
            s = /[0-9]+,[0-9]+/.test(i);
          i = i.replace(/,/g, "");
          var o = /^[0-9]+$/.test(i),
            u = /^[0-9]+\.[0-9]+$/.test(i),
            a = u ? (i.split(".")[1] || []).length : 0;
          for (var f = n; f >= 1; f--) {
            var l = parseInt((i / n) * f);
            u && (l = parseFloat((i / n) * f).toFixed(a));
            if (s)
              while (/(\d+)(\d{3})/.test(l.toString()))
                l = l.toString().replace(/(\d+)(\d{3})/, "$1,$2");
            e.unshift(l);
          }
          t.data("counterup-nums", e);
          t.text("0");
          var c = function () {
            t.text(t.data("counterup-nums").shift());
            if (t.data("counterup-nums").length)
              setTimeout(t.data("counterup-func"), r.delay);
            else {
              delete t.data("counterup-nums");
              t.data("counterup-nums", null);
              t.data("counterup-func", null);
            }
          };
          t.data("counterup-func", c);
          setTimeout(t.data("counterup-func"), r.delay);
        };
      t.waypoint(i, { offset: "100%", triggerOnce: !0 });
    });
  };
})(jQuery);

//-------- -------- -------- --------
//-------- included js libs end
//-------- -------- -------- --------
