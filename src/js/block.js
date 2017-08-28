/**
 * Author: huiyadanli
 * Email: huiyadanli#126.com
 */

/**
 * --------------------------------------------------
 *                    config 
 * --------------------------------------------------
 */
var BlockConfig = {
  SITE_URLS : ["localhost", "127.0.0.1", "huiyadanli.github.io", "huiyadanli.coding.me"],

  BANNER_START_NUM : 1,
  BANNER_END_NUM : 20
};
/**
 * --------------------------------------------------
 *                 global variable 
 * --------------------------------------------------
 */
var today = new Date();
var heartClickCounter = 0;

var live2DHelper;

/**
 * --------------------------------------------------
 *                 page initializes 
 * --------------------------------------------------
 */
$(function(){
  // init
  initPageScript();
  initFavicon();
  initMenu();
  initMousetrap();
  initHeaderImage();
  initContentImage();
  initModal();

  // something fun
  initLive2D();
  fun();

  // prompt
  notification();
  modal();

  // pjax
  initPjax();
});

/**
 * page script
 */
function initPageScript() {
  initTocInPostPage();
  initSearchInTagPage();
}

function initTocInPostPage() {
  var $toc = $(".post-toc");
  if($toc.length > 0) {
    if($("ol.toc").children().length > 5) {
      $toc.show();
    }
    $(window).scroll(function () {
      var scrollTop = $(window).scrollTop();
      var offset = 155 - scrollTop;
      if(offset >= 10) {
        $toc.css("top", offset);
      } else {
        $toc.css("top", 10);
      }
    });
    $("#btn-list").click(function(){
      if($toc.find(".toc").length == 0) {
        Materialize.toast("本文没有目录", 1500);
        return;
      }
      if($toc.css("display") == "none") {
        $toc.show();
        $toc.addClass('animated fadeInRight');
        setTimeout(function(){
          $toc.removeClass('animated fadeInRight');
        },1000)
      } else {
        $toc.addClass('animated fadeOutRight');
        setTimeout(function(){
          $toc.removeClass('animated fadeOutRight');
          $toc.hide();
        },1000)
        
      }
    });

    $("#btn-list-close").click(function(){
      $toc.addClass('animated fadeOutRight');
      setTimeout(function(){
        $toc.removeClass('animated fadeOutRight');
        $toc.hide();
      },1000)
    });

    $("#btn-to-top").click(function(){
      goToTop();
    });
  }
}

function initSearchInTagPage() {
  var $input = $("#search");
  if($input.length > 0) {
    var $a = $(".tag-cloud a");
    $input.on("keyup blur", function(){
      $a.each(function(){
        if($(this).text().toLowerCase().indexOf($input.val().toLowerCase()) > -1) {
          //$(this).css("visibility", "visible");
          $(this).show();
        } else {
          //$(this).css("visibility", "hidden");
          $(this).hide();
        }
      });
    });
  }
}

/**
 * fix stylesheets
 */
/*function fixStylesheets() {
  // footer should on bottom
  var defereds = [];
  $(".card-image img").each(function() {
    var dfd = $.Deferred();
    $(this).bind('load',function(){
      dfd.resolve();
    }).bind('error',function(){
      dfd.resolve();
    });
    defereds.push(dfd);
  });
  $.when.apply(null, defereds).done(function() {
    setFooterPosition();
  });
  

  $(window).resize(function() {
    setFooterPosition();
  });
}*/

/**
 * calculate footer position
 */
/*function setFooterPosition() {
  var $footer = $(".footer-line");
  var margin_top = parseFloat($footer.css("margin-top").replace("px",""));
  var offset = $(window).height() - $footer.offset().top - $footer.height();
  if(offset > 0 || margin_top > 50) {
    var px = offset + margin_top;
    $footer.css("margin-top", px);
  }
  if($footer.css("visibility") == "hidden") {
    $footer.css("visibility", "visible");
    if(!$footer.hasClass("animated")) {
      $footer.addClass("animated fadeIn");
    }
  }
}*/


/**
 * change the favicon by url
 */
function initFavicon() {
  var pathnames = [
    "/categories/代码/", 
    "/categories/日常/",
    "/categories/研究/"
  ];
  var favicons = [
    "/images/favicon/01.ico", 
    "/images/favicon/mario.ico",
    "/images/favicon/book.ico"
  ];
  var i = 0;
  for(i = 0; i < pathnames.length; i++){
    if(window.location.pathname == encodeURI(pathnames[i])) {
      $("#favicon").attr("href", favicons[i]);
      break;
    }
  }
  if(i == pathnames.length) {
    $("#favicon").attr("href", "/favicon.ico");
  }
}

/**
 * menu init
 */
function initMenu() {
  // revert style
  $("#menu-categories").html("分类");
  $("#menu-categories").addClass("grey darken-2");

  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 0,
      constrain_width: true, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
  );
  // change categories menu's words
  var matchStr = "/categories/";
  var pathname = decodeURI(window.location.pathname);
  if(pathname.substr(0, matchStr.length) == matchStr) {
    var surplus = pathname.substring(matchStr.length, pathname.length - 1);
    $("#menu-categories").html(surplus);
    $("#menu-categories").removeClass("grey darken-2");
    $("#menu-categories").css("background-color", "#ab8c91");
  }
}

/**
 * shortcut key by use Mousetrap
 */
function initMousetrap() {
  // next post
  Mousetrap.bind('right', function() {
    var $next = $(".block-pagination a[rel='next']");
    $next.trigger('click');
  });

  // prev post
  Mousetrap.bind('left', function() {
    var $prev = $(".block-pagination a[rel='prev']");
    $prev.trigger('click');
  });

  // go to top
  Mousetrap.bind('g g', function() {
      goToTop();
  });

  // go to Bottom
  Mousetrap.bind('G', function() {
      goToBottom();
  });

  // // konami code!
  // Mousetrap.bind('k', function() {
  //     console.log("321!");
  //     Mousetrap.unpause();
  // });
}

/**
 * set post banner
 */
function initHeaderImage() {
  var arr = getRandomArr(BlockConfig.BANNER_START_NUM, BlockConfig.BANNER_END_NUM);
  var i = 0;
  $(".post .card-image img").each(function(){
    var imgUrl = "/images/banner/" + arr[i] + ".jpg";
    var thisRef = $(this);
    $.ajax({    
      type:"GET",    
      url: imgUrl,
      success: function(data){    
        thisRef.attr("src", imgUrl);
      }
    });
    i++;
  });
}

function initContentImage() {
  $(".card-content img").materialbox();
}

function initModal() {
  $('.modal-trigger').leanModal({
    starting_top: '10%',
    ending_top: '30%'
  });
}

/**
 * pjax init
 */
function initPjax() {

  if($.pjax == null) {
    return;
  }
  
  addPjaxAttr();
  // pjax
  $(document).pjax('a[data-pjax]', '.content', { fragment: '.content', timeout: 10000 });
  $(document).on({
    'pjax:click': function () {
      // $('.content').removeClass('animated fadeInRight').addClass('animated fadeOutRight');
      $('.content').fadeOut(500);
      NProgress.start();
    },
    'pjax:start': function () {

    },
    'pjax:end': function () {
      // $('.content').removeClass('animated fadeOutRight').addClass('animated fadeInRight');
      $('.content').fadeIn(500);
      NProgress.done();

      addPjaxAttr();
      // init
      initPageScript();
      initFavicon();
      initMenu();
      initHeaderImage();
      initContentImage();
      initModal();
    },
    'pjax:popstate': function () {

    }
  });
}

function addPjaxAttr() {
  // pagination link
  var $objs = [
    $(".page-number"),
    $(".extend"),
    $(".tag-cloud a")
  ];
  for (var i = 0; i < $objs.length; i++) {
    if($objs[i] != null) {
      $objs[i].attr("data-pjax", "");
    }
  }
}

/**
 * --------------------------------------------------
 *                      prompt
 * --------------------------------------------------
 */
function notification() {
  // delete it when seach function have finshed
  var $btnSearchPanel = $("#btnSearchPanel")
  if($btnSearchPanel.length > 0) {
    $btnSearchPanel.click(function(){
      Materialize.toast("搜索功能施工中...", 1500);
    });
  }
  // say good night
  var isMySite = false;
  for(x in BlockConfig.SITE_URLS) {
    if(document.referrer.indexOf(BlockConfig.SITE_URLS[x]) >= 0) {
      isMySite = true;
      break;
    }
  }
  if(!isMySite) {
    var hour = today.getHours();
    if(hour == 0) {
      Materialize.toast("这么晚了还不睡吗？", 3000);
    } else if(hour == 1) {
      Materialize.toast("现在已经1点了", 3000);
      var $content = $("<img src='/images/expression/xiuxian1.jpg' width='140px' />");
      Materialize.toast($content, 4000);
    } else if(hour >= 2 && hour <= 4) {
      Materialize.toast("这个时间点还没睡，莫非你也在修仙", 3000);
      var $content = $("<img src='/images/expression/xiuxian2.jpg' width='140px' />");
      Materialize.toast($content, 4000);
    }
  }
}

function modal() {
  $("#keybinding-info").click(function(){

  });
}

/**
 * --------------------------------------------------
 *                     live2d
 * --------------------------------------------------
 */
function initLive2D() {
  if($("#glcanvas").length == 0) {
    return;
  }
  if($(window).width() < 1150) {
    return;
  }
  $.getScript("/js/live2d.min.js").done(function() {
    $.getScript("/js/live2d-helper.min.js").done(function() {
      loadModel();
    });
  });
}

function loadModel() {
  live2DHelper = new Live2DHelper({canvas: 'glcanvas'});
  var n = getRandomNum(2, 4);
  var path = "/live2d/asuna/asuna_0" + n + "/asuna_0" + n + ".model.json";
  live2DHelper.loadModel(path, function(){
    live2DHelper.startTurnHead();
    followMouse();

    if(!$("#glcanvas").hasClass("animated")) {
      $("#glcanvas").addClass("animated fadeIn");
    }
    //seeMenu();
  });
}

function followMouse() {
  // head follow mouse
  var isMouseDown = false;
  $("#glcanvas").mousedown(function(e){
    isMouseDown = true;
  })
  .mouseup(function(e){
    isMouseDown = false;
  })
  .mouseout(function(e){
    isMouseDown = false;
    if(live2DHelper != null) {
      live2DHelper.viewPointer(0, 0);
    }
  })
  .mousemove(function(e){
    if(live2DHelper != null && isMouseDown) {
      live2DHelper.followPointer(e);
    }
  });
  // click
  // $(".wrapper").click(function(e){
  //   if(live2DHelper != null) {
  //     live2DHelper.followPointer(e);
  //   }
  // });
}

function seeMenu() {
  $(".menu-item").mousemove(function(e){
    if(live2DHelper != null) {
      live2DHelper.viewPointer(e.pageX, e.pageY);
    }
  });
}

/**
 * --------------------------------------------------
 *                 special effects
 * --------------------------------------------------
 */
function fun() {
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // console ~
  console.log("(。﹏。) 不要这么看人家，人家害羞\nCopyright © 2013-2017 Made with ♥ by huiyadanli");
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // what the fuking Valentine's Day
  // enable it at 14th every month!
  if(today.getDate() == 14) {
    $("html").click(function(e) {
      var n=18;
      //var $i=$("<b></b>").text("+"+n);
      var $i;
      heartClickCounter++;
      if(heartClickCounter==10) {
          $i=$("<b></b>").text("OωO");
      } else if(heartClickCounter==20) {
          $i=$("<b></b>").text("(๑•́ ∀ •̀๑)");
      } else if(heartClickCounter==30) {
          $i=$("<b></b>").text("(๑•́ ₃ •̀๑)");
      } else if(heartClickCounter==40) {
          $i=$("<b></b>").text("(๑•̀_•́๑)");
      } else if(heartClickCounter==50) {
          $i=$("<b></b>").text("（￣へ￣）");
      } else if(heartClickCounter==60) {
          $i=$("<b></b>").text("(╯°口°)╯(┴—┴");
      } else if(heartClickCounter==70) {
          $i=$("<b></b>").text("૮( ᵒ̌皿ᵒ̌ )ა");
      } else if(heartClickCounter==80) {
          $i=$("<b></b>").text("╮(｡>口<｡)╭");
      } else if(heartClickCounter==90) {
          $i=$("<b></b>").text("( ง ᵒ̌皿ᵒ̌)ง⁼³₌₃");
          // Fuzzy magic!
          Materialize.toast("Fuzzy magic!", 3000);
          $("p").css("color", "transparent");
          $("p").css("text-shadow", "#111 0 0 5px");
      } else if(heartClickCounter==100) {
          $i=$("<b></b>").text("(ꐦ°᷄д°᷅)");
          // shake it!
          // $("div").addClass("shake-hard shake-constant");
      } else if(heartClickCounter>100 && heartClickCounter<=105) {
          $i=$("<b></b>").text("(ꐦ°᷄д°᷅)");
      } else {
          $i=$("<i class='material-icons'>favorite</i>");
          n=Math.round(Math.random()*14+6)
      }
      var x=e.pageX,y=e.pageY;
      $i.css({
          "z-index":9999,
          "top":y-20,
          "left":x,
          "position":"absolute",
          "color":"#E94F06",
          "font-size":n,
          "-moz-user-select": "none",
          "-webkit-user-select": "none",
          "-ms-user-select": "none"
      });
      $("body").append($i);
      $i.animate(
          {"top":y-180,"opacity":0},
          1500,
          function(){$i.remove();}
      );
      //e.stopPropagation();
    });
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function c() {
      document.title = document[a] ? "标题被我吃掉了 (°∀°)ﾉ - " + d : d
  }
  var a, b, d = document.title;
  "undefined" != typeof document.hidden ? (a = "hidden", b = "visibilitychange") : "undefined" != typeof document.mozHidden ? (a = "mozHidden", b = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (a = "webkitHidden", b = "webkitvisibilitychange");
  "undefined" == typeof document.addEventListener && "undefined" == typeof document[a] || document.addEventListener(b, c, !1)
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

/**
 * --------------------------------------------------
 *                       tool
 * --------------------------------------------------
 */

/**
 * return a random number
 * @param  {int} min number
 * @param  {int} max number
 * @return {int} random number
 */
function getRandomNum(min, max) {
  var range = max - min;   
  return (min + Math.round(Math.random() * range));
}

/**
 * return a random array
 * @param  {int} min number
 * @param  {int} max number
 * @return {Array} shuffle array
 */
function getRandomArr(min, max){
  var arr = [];
  for(var i = 0; i <= max - min; i++){
    arr[i] = min + i;
  }
  // arr.sort(function(){
  //   return 0.5-Math.random();
  // });
  shuffle(arr);
  return arr;
}

/**
 * shuffle
 * @param  {Array} 
 * @return {Array} 
 */
function shuffle(arr){
  var length = arr.length,
    temp,
    random;
  while(0 != length){
    random = Math.floor(Math.random() * length)
    length--;
    // swap
    temp = arr[length];
    arr[length] = arr[random];
    arr[random] = temp;
  }
  return arr;
}

/**
 * go to top
 */
function goToTop() {
  $("html, body").animate({
    'scrollTop':0
  },500);
}

/**
 * go to bottom
 */
function goToBottom() {
  $("html, body").animate({
    'scrollTop':$(document).height()
  },500);
}