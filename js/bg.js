var canvas;
var stars_count;
var stars;
ini();
makeStars();
var interval = setInterval(function() {
    drawStars();
}, 50); // 定时刷新星星数据

function ini() { // 初始化
    canvas = document.getElementById("starfield");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    stars = Array(); // 数组存放随机生成的星星数据（x, y, 大小，颜色，速度，闪烁值）
    stars_count = 800; // 星星数量
    clearInterval(interval);
}

function makeStars() { // 随机生成星星数据
    for (var i = 0; i < stars_count; i++) {
        let x = Math.random() * canvas.offsetWidth;
        let y = Math.random() * canvas.offsetHeight;
        let radius = Math.random() * 0.6;
        let speed = Math.random() * 0.5;
        let twinkle = Math.random(); // 初始闪烁值
        let arr = {
            'x': x,
            'y': y,
            'radius': radius,
            'speed': speed,
            'twinkle': twinkle
        }; // (x, y, 大小, 速度, 闪烁值)
        stars.push(arr); // 随机生成的星星数据存在这里
    }
}

function drawStars() { // 把星星画到画布上
    context.fillStyle = "#000000"; // 背景颜色
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < stars.length; i++) {
        var x = stars[i]['x'] - stars[i]['speed'];
        if (x < -2 * stars[i]['radius']) x = canvas.width;
        stars[i]['x'] = x;
        var y = stars[i]['y'];
        var radius = stars[i]['radius'];
        stars[i]['twinkle'] += (Math.random() - 0.5) * 1; // 调整闪烁值
        if (stars[i]['twinkle'] > 1) stars[i]['twinkle'] = 1;
        if (stars[i]['twinkle'] < 0) stars[i]['twinkle'] = 0;
        var opacity = 0.5 + stars[i]['twinkle'] * 0.5; // 计算新的透明度，范围在0.5到1之间
        context.beginPath();
        context.arc(x, y, radius * 2, 0, 2 * Math.PI);
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`; // 使用白色绘制星星，并通过透明度实现闪烁效果
        context.fill();
    }
}

window.onresize = function() { // 窗口大小发生变化时重新随机生成星星数据
    ini();
    makeStars();
    interval = setInterval(function() {
        drawStars();
    }, 50);
}