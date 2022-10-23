function scale(facX, facY) {
    ratioW = window.innerWidth / facX;
    ratioH = window.innerHeight / facY;
    ratio = 2 * Math.min(ratioH, ratioW);
    $('body').css('-moz-transform', 'scale(' + ratio + ')');
    $('body').css('-o-transform', 'scale(' + ratio + ')');
    $('body').css('-webkit-transform', 'scale(' + ratio + ')');
    $('body').css('transform', 'scale(' + ratio + ')');
    console.log("autoscale")
}
