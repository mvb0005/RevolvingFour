var sketches = new Array();
$(document).ready(function () {
    var cards = $('.card');
    for (var x = 0; x < cards.length; x++) {
        var card = cards[x];
        var sketch = function (p) {
            p.radius = 200 / 7;
            p.boardStatus = $('.board', card).val();
            p.preload = function () {
                p.img = p.loadImage("../Content/gameboard.png")
            }
            p.setup = function () {
                p.createCanvas(200, 200);
                p.rectMode(p.CORNER);
                p.ellipseMode(p.CORNER);
                p.noStroke();
                p.noLoop();
            };
            p.draw = function () {
                p.image(p.img, 0, 0, 200, 200)
                for (var i = 0; i < 7; i++) {
                    for (var j = 0; j < 7; j++) {
                        if (p.boardStatus[i * 7 + j] != 0) {
                            p.boardStatus[i * 7 + j] == 1 ? p.fill(0) : p.fill(255,0,0); 
                            p.ellipse(i * p.radius, (6 - j) * p.radius, p.radius);
                        }
                    }
                }
            }
        };
        sketches.push(new p5(sketch, $('.card-header', card)[0]));
        $('button', card).click(function () {
            console.log(document.location.href = "GamePlayer/" + $(this).val());
        })
    }
});
