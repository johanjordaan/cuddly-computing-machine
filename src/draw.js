degrees_to_radians = (degrees) => {
    var pi = Math.PI;
    return degrees * (pi/180);
}

get_ellipse_point = (cx,cy,a,b,alpha,theta) => {
    x = a * Math.cos(alpha) * Math.cos(theta) - b * Math.sin(alpha) * Math.sin(theta) + cx
    y = a * Math.cos(alpha) * Math.sin(theta) + b * Math.sin(alpha) * Math.cos(theta) + cy
    return [x, y]
}

draw_ellipse = (ctx, x, y, a, b, tilt) => {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(10,10,10,.5)';
    for (let angle = 0; angle < 360; angle++) {
        [xn, yn] = get_ellipse_point(x, y, a, b, degrees_to_radians(angle), degrees_to_radians(tilt))
        ctx.fillRect(xn, yn, 1, 1);
    }
    ctx.stroke();
}
