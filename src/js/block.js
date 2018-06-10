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
  SITE_URLS : ["localhost", "127.0.0.1", "huiyadanli.github.io", "huiyadanli.coding.me", "www.huiyadan.com"],

  BANNER_START_NUM : 1,
  BANNER_END_NUM : 22
};
/**
 * --------------------------------------------------
 *                 global variable 
 * --------------------------------------------------
 */
var today = new Date();
var heartClickCounter = 0;

var live2DHelper;

// Valine Comment
// var valineOption = {
//   el:'.comment',
//   app_id:'T3BE7EKhbYY2AUTh1oGjiWYv-gzGzoHsz',
//   app_key:'XDgghIHlt0vSINLIn0pRIQnr',
//   placeholder:'ヾﾉ≧∀≦) 提交评论前请先按F5刷新当前页面…',
//   region:'cn',
//   path:window.location.pathname,
//   avatar:'mm',
//   pageSize:10
// };
// var valine;
/**
 * --------------------------------------------------
 *                 page initializes 
 * --------------------------------------------------
 */
$(function(){

  // init
  initNProgress();
  initPageScript();
  initFavicon();
  initMenu();
  initMousetrap();
  initHeaderImage();
  initContentImage();
  initModal();
  //initComment();

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

function initNProgress() {
  NProgress.start();
  $(document).ajaxStop(function(){
    NProgress.done();
  });
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

  // i am sorry (url hash game)
  Mousetrap.bind('s', function() {
    Mousetrap.unbind('s');
    // off pjax
    $(document).off('click', 'a[data-pjax]');
    // $(".wrapper").slideUp();
    // load url hash game
    $.getScript("/js/iamsorry.min.js")
    .done(function() {
      setCurrentFun('shark');
    });
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

// function initComment() {
//   if(valine == null) {
//     valine = new Valine(valineOption);
//   } else {
//     valine.init(valineOption);
//   }
// }

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
      //goToTop();
      $('.content').fadeOut(500);
      NProgress.start();
    },
    'pjax:start': function () {

    },
    'pjax:end': function () {
      // $('.content').removeClass('animated fadeOutRight').addClass('animated fadeInRight');
      $('.content').fadeIn(500);

      addPjaxAttr();
      // init
      initPageScript();
      initFavicon();
      initMenu();
      initHeaderImage();
      initContentImage();
      initModal();
      //initComment();
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
  if(!isMySite(document.referrer)) {
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
  var arr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "33", "34", "35", "36", "37", "38", "39", "40", "41", "43", "44", "45", "46", "47", "48", "49", "50", "52", "53", "54"];
  arr = shuffle(arr);
  var path = "/live2d/asuna/asuna_" + arr[0] + "/asuna_" + arr[0] + ".edit.model.json";
  console.log("[Live2D] 主电源连接完毕...");
  live2DHelper.loadModel(path, function(){
    console.log("[Live2D] 交互界面连接...");
    live2DHelper.startMotion("", "3");
    live2DHelper.startTurnHead();
    followMouse();
    console.log("[Live2D] 思考形态以中文作为基准，进行思维连接...");
    welcome();
    saySomething();
   
    // console.log("[Live2D] 同步率为 1000.0000%%");
    // console.log("[Live2D] 第一锁定器解除...");
    // console.log("[Live2D] 第二锁定器解除...");

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
    if(live2DHelper != null) {
      live2DHelper.followPointer(e);
      //console.log("---"  + e.pageX + "   " + e.pageY)
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
  var $canvas = $("#glcanvas");
  var a = $canvas.width();
  var b = $canvas.height();
  var c = $(window).width();
  var d = $(window).height();
  console.log(a + " " + c + " " + b + " " + d)
  $("a[data-pjax]").mousemove(function(e){
    if(live2DHelper != null) {
      //live2DHelper.followPointer(e);
      // live2DHelper.viewPointer(parseInt(e.pageX * a / c), parseInt(e.pageY * b / d));
      // console.log(parseInt(e.pageX * a / c)+ "   " + parseInt(e.pageY * b / d))
    }
  })
  .mouseout(function(e){
    if(live2DHelper != null) {
      live2DHelper.viewPointer(0, 0);
    }
  });
}

function welcome() {
  // 应该把表情和动作都放在这里
  var text;
  if(document.referrer !== ''){
    var referrer = document.createElement('a');
    referrer.href = document.referrer;
    text = '你好! 来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友';
    var domain = referrer.hostname.split('.')[1];
    if (domain == 'baidu') {
        text = '你好! 来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&wd=')[1].split('&')[0] + '</span> 找到的我吗？';
    }else if (domain == 'so') {
        text = '你好! 来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&q=')[1].split('&')[0] + '</span> 找到的我吗？';
    }else if (domain == 'google') {
        text = '你好! 来自 谷歌搜索 的朋友<br>欢迎阅读 <span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
    }
  } else {
    if (isMySite(window.location.href)) { //如果是主页
      var now = (new Date()).getHours();
      if (now > 23 || now <= 5) {
          text = '早点睡觉，才能有更好的精神去迎接新的一天';
      } else if (now > 5 && now <= 7) {
          text = '早上好！一日之计在于晨，美好的一天就要开始了';
      } else if (now > 7 && now <= 11) {
          text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
      } else if (now > 11 && now <= 14) {
          text = '中午了，工作了一个上午，现在是午餐时间！';
      } else if (now > 14 && now <= 17) {
          text = '午后很容易犯困呢，今天的运动目标完成了吗？';
      } else if (now > 17 && now <= 19) {
          text = '傍晚了！窗外夕阳的景色很美丽呢。';
      } else if (now > 19 && now <= 21) {
          text = '晚上好，今天过得怎么样？';
      } else if (now > 21 && now <= 23) {
          text = '已经这么晚了呀，早点休息吧，晚安~';
      } else {
          text = '嗨~';
      }
    } else {
      text = '欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
    }
  }
  // 记录进入次数
  var objCount = JSON.parse(window.localStorage.getItem('enterCount'));
  var cnt = 0;
  var now = Date.parse(new Date());
  if(objCount != null && objCount.expired + objCount.date > now) {
    cnt = objCount.count;
    objCount.count = cnt + 1;
    if(cnt >= 5) {
      text = '你在 <span style="color:#0099cc;">'+ (now - objCount.date) / 1000 +'s</span> 内刷新了这么多次，是想看我换装吗';
    }
  } else {
    objCount = {};
    objCount.count = 0;
    objCount.expired = 60 * 1000; // 过期时间 ms
    objCount.date = now;
  }
  window.localStorage.setItem('enterCount',JSON.stringify(objCount));
  

  showMessage(text, 6000);
}

function saySomething() {
  // var re = /x/;
  // console.log(re);
  // re.toString = function() {
  //     showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
  //     return '';
  // };
  
  var once = true;
  $(document).on('copy', function (){
      showMessage('你都复制了些什么呀，转载要记得加上出处哦', 5000);
      if(once) {
        live2DHelper.startMotion("", "11");
        once = false;
      }
  });
  
  $.ajax({
    cache: true,
    url: "/live2d/live2d-tips.json",
    dataType: "json",
    success: function (result){
      console.log("[Live2D] 连接没有异常");
      $.each(result.mouseover, function (index, tips){
        $(document).on("mouseover", tips.selector, function (){
          if(!isEmpty(tips.expression) && live2DHelper != null){
            live2DHelper.setExpression(tips.expression);
          }
          var text = tips.text;
          if(!isEmpty(text)) {
            if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
            text = text.render({text: $(this).text()});
            showMessage(text, 3000);
          }
        });
      });
      $.each(result.click, function (index, tips){
        $(document).on("click", tips.selector, function (){
          if(!isEmpty(tips.expression) && live2DHelper != null){
            live2DHelper.setExpression(tips.expression);
          }
          var text = tips.text;
          if(!isEmpty(text)) {
            if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
            text = text.render({text: $(this).text()});
            showMessage(text, 3000);
          }
        });
      });
      console.log("[Live2D] 初次见面，我是结城明日奈。");
    },
    error: function(){
      console.log("%c[Live2D] 思维连接出现异常", "color:red");
    }
  });
}

function showMessage(text, timeout){
  if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
  $('.live2d-tips').stop();
  $('.live2d-tips').html(text).fadeTo(200, 1);
  if (timeout === null) timeout = 5000;
  hideMessage(timeout);
}
function hideMessage(timeout){
  $('.live2d-tips').stop().css('opacity',1);
  if (timeout === null) timeout = 5000;
  $('.live2d-tips').delay(timeout).fadeTo(200, 0);
}

/**
 * --------------------------------------------------
 *                 special effects
 * --------------------------------------------------
 */
function fun() {
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // console ~
  console.log("%c(。﹏。) 不要这么看人家，人家害羞\nCopyright © 2013-2017 Made with ♥ by huiyadanli","text-shadow: -2px 0 rgba(0, 255, 255, .5), 2px 0 rgba(255, 0, 0, .5)");
  console.log("------------------------------------------------\n");
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

function isEmpty(obj) {
  if(typeof obj == "undefined" || obj == null || obj == ""){
    return true;
  } else {
    return false;
  }
}

function isMySite(url) {
  var res = false;
  for(x in BlockConfig.SITE_URLS) {
    if(url.indexOf(BlockConfig.SITE_URLS[x]) >= 0) {
      res = true;
      break;
    }
  }
  return res;
}
/**
 * 简单的模板渲染
 */
function render(template, context) {
  var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
  return template.replace(tokenReg, function (word, slash1, token, slash2) {
      if (slash1 || slash2) {  
          return word.replace('\\', '');
      }
      var variables = token.replace(/\s/g, '').split('.');
      var currentObject = context;
      var i, length, variable;

      for (i = 0, length = variables.length; i < length; ++i) {
          variable = variables[i];
          currentObject = currentObject[variable];
          if (currentObject === undefined || currentObject === null) return '';
      }
      return currentObject;
  });
}
String.prototype.render = function (context) {
  return render(this, context);
};