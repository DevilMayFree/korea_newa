

jQuery(function ($) {

    isScrolled();

    function isScrolled() {
        var bodyOffset = $('body').offset();
        var body = $("body");
        var header = $("header");
        $(window).scroll(function () {
            if ($(document).scrollTop() > bodyOffset.top) {
                $(body).addClass("is-scrolled");

                if ($("body").hasClass("home") || $("body").hasClass("page-template-about") ) {

                    $(header).addClass("text-dark");
                    $(header).removeClass("text-light");

                } else {

                }
            } else {
                $(body).removeClass("is-scrolled");


                if ($("body").hasClass("home") || $("body").hasClass("page-template-about")) {

                    $(header).removeClass("text-dark");
                    $(header).addClass("text-light");

                } else {

                }
            }

        });
    }



// 숫자를 애니메이션으로 증가시키는 함수를 정의합니다.
const animateCountUp = (element) => {
    gsap.to(element, {
      duration: 1, // 애니메이션 지속 시간 (초)
      innerHTML: element.dataset.target, // 목표값으로 설정
      roundProps: "innerHTML", // 숫자를 정수로 반올림


      scrollTrigger: {
        // markers: true,
        trigger: element, // 현재 요소를 트리거로 설정
        start: "top bottom", // 화면 중앙에 도달했을 때 애니메이션 시작
        toggleActions: "play reset restart reset" // 애니메이션이 한 번만 실행되도록 설정
      }
    });
  };

  // 클래스 'count'를 가진 모든 요소에 대해 애니메이션을 적용합니다.
  document.querySelectorAll('.countup').forEach(animateCountUp);




    const documentHeight = () => {
        const doc = document.documentElement;
        doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
    };
    window.addEventListener("resize", documentHeight);
    documentHeight();

    AOS.init({
    	duration: 1000,
    	easing: 'ease',
    });

    if($('body').hasClass('home')){
        popup_slider();


        if($.cookie('.popup') == 'hidden') {
            $('.popup').css('display', 'none');
        }else {
            $('.popup').css('display', 'block');
        }

        $('.popup-day-close').on('click', function(e) {
            e.preventDefault();
            $.cookie('.popup', 'hidden', {expires: 1});
            $('.popup').css('display', 'none');
        })

        $('.popup-close').on('click', function(e) {
            e.preventDefault();
            $('.popup').css('display', 'none');
        })
    }


    if($('body').hasClass('page-template-about')){
        gallery_slider();

    }


    function popup_slider() {
        var slide = new Swiper( '.popup-carousel', {
            loop         : true,
            slidesPerView: 1,
            autoplay: true,
            speed: 1000,
            autoplaySpeed: 1000,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },


            slidesPerView: 1,
            spaceBetween : 0,
        } );
    }


    function gallery_slider(){

        var slide = new Swiper( '.horizontal-carousel', {
            loop         : true,
            slidesPerView: 1,
            scrollbar    : {
                el       : '.swiper-scrollbar',
                hide     : true,
                draggable: false,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },

            autoplay      : true,
            autoplaySpeed : 1000,
            slidesPerView: 2,
            speed:2000,
            spaceBetween : 40,
            breakpoints  : {
                360 : {
                    slidesPerView: 1.2,
                    spaceBetween : 16,

                },
                768 : {
                    slidesPerView: 2,
                    spaceBetween : 16,

                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween : 10,
                }
            }
        } );
    }


    // isScrolled();
    // function isScrolled() {
    //     var bodyOffset = $('body').offset();
    //     var body = $("body");
    //     var header = $("header");
    //     $(window).scroll(function () {
    //         if ($(document).scrollTop() > bodyOffset.top) {
    //             $(body).addClass("is-scrolled");

    //         } else {
    //             $(body).removeClass("is-scrolled");

    //         }

    //     });
    // }
    var home_hero_progress = null;
    home_hero()
    function home_hero() {
        var home_hero = new Swiper('.swiper-hero', {
            loop: true,
            slidesPerView: 1,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },

            autoplay: true,
            speed: 1000,
            autoplaySpeed: 5000,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: {
                el: ' .swiper-pagination',
                type: 'fraction',
                renderFraction: function (currentClass, totalClass) {

                    return '<span lang="en" class="' + currentClass + '"></span>' +
                           '<span class="swiper_progress_hidden_space"></span>' +
                           '<span lang="en" class="' + totalClass + '"></span>';

                }
            },

            on: {

                  slideChangeTransitionStart: function () {

                    home_hero_state(5000);
                    // 슬라이드 변경 시 이미지 확대 효과 실행


                    var currentSlide = this.slides[this.activeIndex];
                    var image = currentSlide.querySelector('.asset');
                    var title = currentSlide.querySelector('h1');
                    var desc = currentSlide.querySelector('h3');

                    console.log(this.activeIndex, image)
                    // GSAP 애니메이션으로 이미지 확대
                    let tl = gsap.timeline()

                   tl
                    .to(image, {
                        scale: 1.2,
                        duration: 5,
                    })
                    .to(title, {
                        autoAlpha: 1,
                        duration: 1,
                        y: -20,
                    },0.25)
                    .to(desc, {
                        autoAlpha: 1,
                        duration: 1,
                        x: 0,
                    },0.75)



                },

                slideChangeTransitionEnd: function () {

                    var images = this.el.querySelectorAll('.swiper-slide .asset');
                    var titles = this.el.querySelectorAll('.swiper-slide h1');
                    var descs = this.el.querySelectorAll('.swiper-slide h3');
                    for (var i = 0; i < titles.length; i++) {
                        if (i !== this.activeIndex) {
                        gsap.killTweensOf(images[i]);
                        gsap.killTweensOf(titles[i]);
                        gsap.killTweensOf(descs[i]);
                        gsap.to(images[i], {
                            scale: 1, // 이미지 크기 초기화
                            duration: 0, // 애니메이션 지속 시간 0초 (즉시 적용)
                        });
                        }
                        gsap.to(titles[i],{
                            autoAlpha: 0,
                            duration: 0,
                            y: 0
                        })
                        gsap.to(descs[i],{
                            autoAlpha: 0,
                            duration:0
                        })
                    }
                },

                init: function() {
                    // home_hero_transition(true);
                    home_hero_state(5000);
                }
            },

        });

    }


    function home_hero_state(speed) {
        var $state = $('.hero').find('.swiper_play_state');
        var $progress = $('.hero').find('.swiper_progress');

        if (home_hero_progress != null) {
            home_hero_progress.kill();
        }

        home_hero_progress = gsap.fromTo($progress, parseInt(speed / 1000), {
            width: '0%'
        }, {
            width: '100%',
            ease: Power0.easeNone,
            onStart: function () {
            $state.removeClass('progress_max');
            },
            onComplete: function () {
            $state.addClass('progress_max');
            $('.swiper-hero')[0].swiper.slideNext();
            }
        });
    }

    // if ($('body').hasClass('home')) {
    // 	if ($('header').hasClass('text-dark')) {
    // 		$('header').removeClass('text-dark ')
    // 		$('header').addClass('text-light')

    // 	}
    // } else {
    // 	if ($('header').hasClass('text-dark')) {

    // 	}
    // }

    if ($("body").hasClass("archive") || $("body").hasClass("page-template-contact") || $("body").hasClass("single")) {
        if ($("header").hasClass("text-light")) {
            $('header').removeClass('text-light ')
            $('header').addClass('text-dark');
            $('header').removeClass('transparent');
        }


    } else {
        // if ($('header').hasClass('text-light')) {
        // 	$('header').removeClass('text-light ')
        // 	$('header').addClass('light ')
        // }
    }

    var toggleHamburgerScreen = function () {
        $(document.body)
            .on("click", ".header-hamburger", function (event) {
                event.preventDefault();
                var $el = $(this),
                    $screen = $("#" + $el.data("target"));

                $screen.fadeToggle(function () {
                    $(".hamburger-menu", $screen).addClass("active");
                });
                $screen.addClass("open");
            })
            .on(
                "click",
                "#hamburger-fullscreen .button-close",
                function (event) {
                    event.stopPropagation();

                    var $el = $(this),
                        $screen = $("#hamburger-fullscreen");

                    $el.removeClass("active");
                    $screen.removeClass("open");

                    setTimeout(function () {
                        $screen.fadeOut();
                    }, 420);
                }
            );

        if (typeof PerfectScrollbar !== "undefined") {
            var $hamburgerScreen = $("#hamburger-fullscreen");

            if ($hamburgerScreen.length) {
                new PerfectScrollbar(
                    $(".hamburger-screen-content", $hamburgerScreen).get(0)
                );
            }
        }
    };

    toggleHamburgerScreen();

    var toggleOffCanvas = function () {
        $(document.body)
            .on("click", '[data-toggle="off-canvas"]', function (event) {
                var target = "#" + $(this).data("target");
                console.log(target);

                if ($(target).hasClass("open")) {
                    closeOffCanvas(target);
                } else if (openOffCanvas(target)) {
                    event.preventDefault();
                }
            })
            .on(
                "click",
                ".offscreen-panel .button-close, .offscreen-panel .backdrop",
                function (event) {
                    event.preventDefault();

                    closeOffCanvas(this);
                }
            )
            .on("keyup", function (e) {
                if (e.keyCode === 27) {
                    closeOffCanvas();
                }
            });
    };

    var openOffCanvas = function (target) {
        var $target = $(target);

        if (!$target.length) {
            return false;
        }

        $target.fadeIn();
        $target.addClass("open");

        $(document.body)
            .addClass("offcanvas-opened " + $target.attr("id") + "-opened")
            .trigger("dbd_off_canvas_opened", [$target]);

        return true;
    };

    var closeOffCanvas = function (target) {
        if (!target) {
            $(".offscreen-panel").each(function () {
                var $panel = $(this);

                if (!$panel.hasClass("open")) {
                    return;
                }

                $panel.removeClass("open").fadeOut();
                $(document.body).removeClass($panel.attr("id") + "-opened");
            });
        } else {
            target = $(target).closest(".offscreen-panel");
            target.removeClass("open").fadeOut();

            $(document.body).removeClass(target.attr("id") + "-opened");
        }

        $(document.body)
            .removeClass("offcanvas-opened")
            .trigger("dbd_off_canvas_closed", [target]);
    };

    toggleOffCanvas();

    var HamburgerMenu = function () {
        $(document.body)
            .on("click", ".header-hamburger", function (event) {
                event.preventDefault();
                var $el = $(this),
                    $screen = $("#" + $el.data("target"));

                $screen.fadeToggle(function () {
                    $(".hamburger-menu", $screen).addClass("active");
                });
                $screen.addClass("open");
            })
            .on(
                "click",
                "#hamburger-fullscreen .button-close",
                function (event) {
                    event.stopPropagation();

                    var $el = $(this),
                        $screen = $("#hamburger-fullscreen");

                    $el.removeClass("active");
                    $screen.removeClass("open");

                    setTimeout(function () {
                        $screen.fadeOut();
                    }, 420);
                }
            );
    };
    HamburgerMenu();

    var mobileMenu = function () {
        var $mobileMenu = $("#mobile-menu");
        $mobileMenu.find("");

        $mobileMenu
            .find(
                ".menu > .menu-item-has-children, .menu > li > ul > .menu-item-has-children"
            )
            .filter(function () {
                return (
                    $(this).hasClass("current-menu-item") ||
                    $(this).hasClass("current-menu-ancestor")
                );
            })
            .addClass("open");

        $mobileMenu
            .on("click", ".menu-item-has-children > a", function (event) {
                var $li = $(this).parent();

                if (
                    $li.hasClass("open") &&
                    $li.hasClass("clicked") &&
                    "#" !== $(this).attr("href")
                ) {
                    return true;
                }

                event.stopPropagation();
                event.preventDefault();

                $li.addClass("clicked");

                $li.toggleClass("open").children("ul").slideToggle();
                $li.siblings(".open")
                    .removeClass("open clicked")
                    .children("ul")
                    .slideUp();
            })
            .on("click", ".menu-item-has-children > .toggle", function (event) {
                event.stopPropagation();
                event.preventDefault();

                var $li = $(this).parent();

                $li.toggleClass("open").children("ul").slideToggle();
                $li.siblings(".open")
                    .removeClass("open")
                    .children("ul")
                    .slideUp();
            });

        $mobileMenu.on(
            "click",
            '[data-toggle="off-canvas"], [data-toggle="modal"]',
            function () {
                if ("mobile-menu" !== $(this).data("target")) {
                    closeModal();
                    closeOffCanvas();
                }
            }
        );
    };

    mobileMenu();

    var toggleModals = function () {
        $(document.body)
            .on("click", '[data-toggle="modal"]', function (event) {
                var target = "#" + $(this).data("target");

                if ($(target).hasClass("open")) {
                    closeModal(target);
                } else if (openModal(target)) {
                    event.preventDefault();
                }
            })
            .on(
                "click",
                ".modal .button-close, .modal .backdrop",
                function (event) {
                    event.preventDefault();

                    closeModal(this);
                }
            )
            .on("keyup", function (e) {
                if (e.keyCode === 27) {
                    closeModal();
                }
            });
    };

    toggleModals();

    var openModal = function (target) {
        var $target = $(target);

        var $search = $target.find("input.search-field");
        if (!$target.length) {
            return false;
        }

        $target.fadeIn();
        $target.addClass("open");

        $search.focus();
        $(document.body)
            .addClass("modal-opened " + $target.attr("id") + "-opened")
            .trigger("modal_opened", [$target]);

        return true;
    };
    openModal();

    var closeModal = function (target) {
        if (!target) {
            $(".modal").removeClass("open").fadeOut();

            $(".modal").each(function () {
                var $modal = $(this);

                if (!$modal.hasClass("open")) {
                    return;
                }

                $modal.removeClass("open").fadeOut();
                $(document.body).removeClass($modal.attr("id") + "-opened");
            });
        } else {
            target = $(target).closest(".modal");
            target.removeClass("open").fadeOut();

            $(document.body).removeClass(target.attr("id") + "-opened");
        }

        $(document.body)
            .removeClass("modal-opened")
            .trigger("modal_closed", [target]);
    };
    closeModal();
}); // End jQuery


