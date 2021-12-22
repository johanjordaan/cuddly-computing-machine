degrees_to_radians = (degrees) => {
    return degrees * (Math.PI/180);
}

// alpha = Progress around ellipse
// theta = tilt of ellipse
// cx,cy = position
// a = major axis
// b = minor axis
get_ellipse_point = (cx,cy,a,b,alpha,theta) => {
    const cos_alpha = Math.cos(alpha);
    const sin_alpha = Math.sin(alpha);
    const cos_theta = Math.cos(theta);
    const sin_theta = Math.sin(theta);
    let x = a * cos_alpha * cos_theta - b * sin_alpha * sin_theta + cx;
    let y = a * cos_alpha * sin_theta + b * sin_alpha * cos_theta + cy;
    return [x, y];
}

// x, y = position
// a = major axis
// b = minor axis
draw_ellipse = (ctx, x, y, a, b, tilt, jitter) => {
    let tilt_radians = degrees_to_radians(tilt);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(100,100,100,0.01)';
    for (let angle = 0; angle < 360; angle++) {
        let [xn, yn] = get_ellipse_point(x, y, a, b, degrees_to_radians(angle), tilt_radians)
        if(jitter) {
            xn += 30-Math.random()*15;
            yn += 30-Math.random()*15;
        }
        ctx.fillRect(xn, yn, 1, 1);
    }
    ctx.stroke();
}

draw_wave = (ctx, x, y, min_a, max_a, jitter) => {
    //let a_f = interpolation.linear(min_a,max_a,150)
    let a_f = interpolation.stacked_linear([
        [min_a,min_a+50,20],
        [min_a+51,max_a,100],
    ]);

    //let tilt_f = interpolation.linear(0,180, 180)
    let tilt_f = interpolation.project(0,200, min_a,max_a)

    while (a_f.hasNext()) {
        let a = a_f.next()

        if (!tilt_f.hasNext())
            tilt_f.reset();
        let tilt = tilt_f.next(a);


        draw_ellipse(ctx, x, y, a, a * .8, tilt, jitter)
    }
}

clear_canvas = (ctx, w, h) => {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.fillRect(0, 0, w, h);
    ctx.stroke();
}
