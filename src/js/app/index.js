require(['jquery', 'swiper', 'bscroll', 'rander', 'text!block1', 'text!block2', 'getSlideDirection'], function($, swiper, bscroll, rander, block1, block2, getSlideDirection) {

    //实例化banner轮播
    function autoPlay() {
        var banner = new swiper('.banner', {
            autoplay: 1500,
            // loop: true,
            pagination: '.swiper-pagination'
        });
    };
    //初始化页面
    function initPage() {
        $('body').append(block1);
        $('body').append(block2);
        $.ajax({
            url: '/api/homeJson',
            dataType: 'json',
            success: function(res) {
                var swipweData = res.items[0].data.data.filter(function(v) {
                    if (v.ad_copy == '[[type|slider]]') {
                        return v;
                    };
                });
                var typeData = res.items[0].data.data.slice(2);
                var hotData = res.items[1].data.data;
                var listOne = [res.items[2].data.data[0]];
                var listData = res.items[2].data.data;
                var girlData = res.items[3].data.data
                    //轮播部分
                rander(swipweData, $('#swiper'), $('.swiper-wrapper'), false);
                rander(typeData, $('#type'), $('.list'));
                autoPlay();
                //本周最火
                rander(hotData, $('#count'), $('.count'));
                //重磅推荐
                rander(listOne, $('#block1'), $('.hot-inner>ul'));
                rander(listData, $('#list'), $('.hot-inner>ul'));

                //女生最爱
                rander(girlData, $('#block1'), $('.lists'));
            },
            error: function(e) {
                console.warn(e)
            }
        });
    };
    initPage();
    //实例化页面滚动
    var myBscroll = new bscroll('.swiper-page', {
        probeType: 2,
        click: true
    });
    //上拉加载相关参数
    var pageNum = 1, //默认加载第一页
        total, //总页数
        count = 10, //每页的条数
        upLoadTip = "上拉加载更多",
        downRefesh = "下拉刷新",
        rebaseMore = "释放加载更多",
        rebaseRefresh = "释放刷新",
        noneDataTip = "暂无数据";
    //缓存元素
    var _line = $('.tab-line');
    var scroll = $('.scroll-wrap');
    //计算scroll滚动尺寸
    var htmlFz = $('html').css('fontSize');
    var size = parseFloat(htmlFz) * 44 / 37.5;

    //scoll滚动事件
    myBscroll.on('scroll', function() {
        if (this.y < this.maxScrollY - size) {
            if (total && pageNum > total) {
                scroll.attr('down', '暂无数据');
            } else {
                scroll.attr('down', '释放加载更多');
            }
        } else {
            if (total && pageNum > total) {
                scroll.attr('down', '暂无数据');
            } else {
                scroll.attr('down', '上拉加载更多');
            }
        }
        if (this.y > size) {
            scroll.attr('up', '释放刷新');
        } else {
            scroll.attr('up', '下拉刷新');
        };
    });
    //滚动事件结束
    myBscroll.on('scrollEnd', function() {

        if (total && pageNum > total) {
            scroll.attr('down', '暂无数据');
        } else {
            scroll.attr('down', '释放加载更多');
        }
        scroll.attr('up', '下拉刷新');
    });
    //滑动结束事件
    myBscroll.on('touchEnd', function() {
        // scroll.attr('down', '上拉加载更多');

        if (scroll.attr('down') == '释放加载更多') {
            if (total && pageNum > total) {
                return false;
            } else {
                loadMore(pageNum);
                pageNum++;
            }
        }
        if (scroll.attr('up') == '释放刷新') {
            location.reload();
        }
    });

    function loadMore(pageNum) {
        $.ajax({
            url: '/api/recommed?pageNum=' + pageNum + '&count=' + count,
            dataType: 'json',
            success: function(res) {
                rander(res.items, $('#block1'), $('.lists'));
                myBscroll.refresh();
                console.log(res, res.items, res.total, total)
                total = res.total / count;
            },
            error: function(e) {
                console.warn(e)
            }
        })
    }
    //实例化tab切换
    var mySwiper = new swiper('.content');

    $('.tab span').on('click', function() {
        mySwiper.slideTo($(this).index());
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).index() == 0) {
            _line.removeClass('active');
        } else {
            _line.addClass('active');
        };
    });
    //滑动处理  
    var startX, startY;
    document.addEventListener('touchstart', function(ev) {
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY;
    }, false);
    document.addEventListener('touchend', function(ev) {
        var endX, endY;
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
        var direction = getSlideDirection(startX, startY, endX, endY);
        switch (direction) {
            case 3:
                mySwiper.slideTo(1);
                _line.addClass("active");
                $(".tab span").eq(1).addClass("active").siblings().removeClass("active");
                break;
            case 4:
                mySwiper.slideTo(0);
                _line.removeClass("active");
                $(".tab span").eq(0).addClass("active").siblings().removeClass("active");
                break;
            default:
        }
    }, false);
});