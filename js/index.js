window.addEventListener('load', function () {
    var dotbar = document.querySelector('.dotbar');
    var adverbar = document.querySelector('.adverbar');
    // 小圓點
    for (var i = 0; i < adverbar.children.length - 2; i++) {
        var span = document.createElement('span');
        dotbar.appendChild(span);
    }
    dotbar.children[0].className = 'current';
    // banner自動滾動
    var adver = document.querySelector('.advertising');
    var w = adver.offsetWidth;
    var index = 0;
    var timer = setInterval(function () {
        index++;
        translatex = -index * w;
        adverbar.style.transition = 'all .3s';
        adverbar.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    adverbar.addEventListener('transitionend', function () {
        if (index >= adverbar.children.length - 2) {
            index = 0;
            adverbar.style.transition = 'none';
            translatex = -index * w;
            adverbar.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = adverbar.children.length - 3;
            adverbar.style.transition = 'none';
            translatex = -index * w;
            adverbar.style.transform = 'translateX(' + translatex + 'px)';
        }
        dotbar.querySelector('.current').classList.remove('current');
        dotbar.children[index].classList.add('current');
    })
    // 滾動屏幕
    var startX = 0;
    var move = 0;
    var flag = false;
    adverbar.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    });
    adverbar.addEventListener('touchmove', function (e) {
        flag = true;
        move = e.targetTouches[0].pageX - startX;
        translatex = -index * w + move;
        adverbar.style.transition = 'none';
        adverbar.style.transform = 'translateX(' + translatex + 'px)';
        e.preventDefault();
    });
    adverbar.addEventListener('touchend', function () {
        if (flag) {
            if (Math.abs(move) > 50) {
                if (move < 0) {
                    index++;
                } else {
                    index--;
                }
                moveGet();
            } else {
                moveGet();
            }
            flag = false;
        }
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            translatex = -index * w;
            adverbar.style.transition = 'all .3s';
            adverbar.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);
    })
    function moveGet() {
        translatex = -index * w;
        adverbar.style.transition = 'all .3s';
        adverbar.style.transform = 'translateX(' + translatex + 'px)';
    };
})
