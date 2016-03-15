$(document).ready(function () {
    var mousePressed = false,
        X,
        Y,
        canvas = $("canvas").get(0).getContext("2d"),
        crayon = true,
        rectangle = false,
        trait = false,
        cercle = false,
        all = false,
        i = 0;

    $('#trait').click(function(){reset();trait = true;});
    $('#crayon').click(function(){reset();crayon = true;});
    $('#rect').click(function(){reset();rectangle = true;});
    $('#cercle').click(function(){reset();cercle = true;});

    $('#canvas').mousedown(function (e){
        if(crayon){
            mousePressed = true;
            draw(e.pageX-$(this).offset().left, e.pageY-$(this).offset().top, false);
        }else if(trait){
            mousePressed = false;
            draw(e.pageX-$(this).offset().left, e.pageY-$(this).offset().top, true);
        }else if(rectangle){
            mousePressed = false;
            draw(e.pageX-$(this).offset().left, e.pageY-$(this).offset().top, true);
        }else if(cercle){
            mousePressed = false;
            draw(e.pageX-$(this).offset().left, e.pageY-$(this).offset().top, true);
        }
    });

    $('#canvas').mousemove(function (e){
        if(mousePressed){
            draw(e.pageX-$(this).offset().left, e.pageY-$(this).offset().top, true);
        }
    });

    $('#canvas').mouseup(function (){
        mousePressed = false;
    });

    $('#canvas').mouseleave(function (){
        mousePressed = false;
    });
    $('#clear').click(function (){
        canvas.clearRect(0, 0, 600, 500);
    });
    function draw(x, y, fix){
        if(!fix){
            X = x - 1;
            Y = y;
        }
        if(crayon || trait){
            if((trait && i === 1) || crayon){
                canvas.beginPath();
                canvas.strokeStyle = $('#color').val();
                canvas.lineWidth = $('#size').val();
                canvas.moveTo(X, Y);
                canvas.lineTo(x, y);
                canvas.closePath();
                canvas.stroke();
                i = 0;
            }else{
                i += 1;
            }
        }else if(rectangle){
            if(i === 1){
                canvas.beginPath();
                canvas.strokeStyle = $('#color').val();
                canvas.lineWidth = $('#size').val();
                canvas.rect(X, Y, x - X, y - Y);
                canvas.closePath();
                canvas.stroke();
                i = 0;
            }else{
                i += 1;
            }
        }else if(cercle){
            if(i === 1){
                canvas.beginPath();
                canvas.strokeStyle = $('#color').val();
                canvas.lineWidth = $('#size').val(); 
                canvas.arc(X, Y, Math.sqrt(Math.pow(x - X, 2) + Math.pow(y - Y, 2)), 0, 2 * Math.PI);
                canvas.closePath();
                canvas.stroke();
                i = 0;
            }else{
                i += 1;
            }
        }
        X = x;
        Y = y;
    }

    function reset(){
        trait = false;
        crayon = false;
        rectangle = false;
        cercle = false;
        all = false;
    }
});