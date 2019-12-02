var image = new Image();
var columns = 4;
var rows = 4    ;
var piece_height;
var piece_width;
var tiles = [];
var zbychu;
var padding = 15;
var cur_red;
var canvas_height = 720;
var have_modified = false;
var tempimg ;
var tempx;
var tempy;
var photos = ["im1.jpg", "im2.jpg", "im3.jpg", "im4.jpg", "im5.jpg", "im6.jpg", "im7.jpg", "im8.jpg", "im9.jpg", "im10.jpg", "im11.jpg", "im12.jpg"];
image.onload = function() {
piece_height = image.height/rows;
piece_width = image.width/columns;
}

function pupulate_menu(){
photos.forEach(el=> {
    var img = document.createElement("img"); 
    img.src=el;
    img.style.width = '10%'

    document.body.appendChild(img);

    img.addEventListener("click", function(i) {
        var col = document.forms["form"]["col"].value;
        var row_nr = document.forms["form"]["rows"].value;
        if( col>1 && row_nr>1 ){
            columns=col;
            rows=row_nr;
        }
        play(img.src)
    });


});
}   


window.onload = init;
function init(){
    pupulate_menu();
}

function play(src) {
    image.src=src;
    piece_height = image.height/rows;
    piece_width = image.width/columns;
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }


    zbychu = document.createElement("canvas"); 
    zbychu.width = image.width;
    zbychu.height = image.height;
    document.body.appendChild(zbychu);
    

    reset = document.createElement("button"); 
    reset.innerHTML = 'reset';
    reset.addEventListener("click", function(i) {
        tiles = [];
        cur_red = null
        split();
        initial_random_generator(ctx);
    });

    document.body.appendChild(reset);
    menu = document.createElement("button"); 
    menu.innerHTML = 'menu';
    menu.addEventListener("click", function(i) {
        tiles = [];
        cur_red = null
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
          } 

          var f = document.createElement("form");
            f.setAttribute('id', "form");        
            f.innerHTML="Columns:<br>"  
            var i = document.createElement("input"); 
            f.appendChild(i);
            i.setAttribute('type',"number");
          i.setAttribute('name',"col");
          f.innerHTML+="<br>Rows:<br>"  
          var s = document.createElement("input"); 
          s.setAttribute('type',"number");
          s.setAttribute('name',"rows");

          f.appendChild(s)

          document.body.appendChild(f);

          pupulate_menu();
    });
    document.body.appendChild(menu);
    
    
    ctx = zbychu.getContext("2d");

    zbychu.onclick = function (e) {
        var x = e.pageX - image.offsetLeft;
        var y = e.pageY - image.offsetTop;
        tiles.forEach(tile => {
            if(tile.is_adjacent_to_red && tile.x*tile.width<x && tile.x*tile.width+tile.width>x && tile.y*tile.height<y && tile.y*tile.height + tile.height>y){
                    swap(tile);
                    ctx.beginPath();
                    ctx.rect(cur_red.x*piece_width, cur_red.y*piece_height , tile.width, tile.height);
                    ctx.fillStyle = "red";
                    ctx.fill();
                    ctx.drawImage(tile.image, tile.x*piece_width, tile.y*piece_height, tile.width, tile.height)
                }
            })  
            test_if_adjacent_red();
            test_finished();
    }

    zbychu.onmousemove = function(e){
        var x = e.pageX - image.offsetLeft;
        var y = e.pageY - image.offsetTop;

        tiles.forEach(tile => {
            if(tile.is_adjacent_to_red && tile.x*tile.width<x && tile.x*tile.width+tile.width>x && tile.y*tile.height<y && tile.y*tile.height + tile.height>y){
                ctx.beginPath();
                ctx.globalAlpha = 0.02;
                ctx.fillStyle = "white";
                ctx.fillRect(tile.x*piece_width, tile.y*piece_height, piece_width, piece_height);
                ctx.globalAlpha = 1;
                ctx.beginPath();

                have_modified = true;
                tempx=tile.x;
                tempy=tile.y;
                tempimg=tile.image;
            }
            })  
            if(have_modified && !(tempx*tile.width<x && tempx*tile.width+tile.width>x && tempy*tile.height<y && tempy*tile.height + tile.height>y)){
                if(!(tempx==cur_red.x && tempy==cur_red.y)){
                    ctx.drawImage(tempimg, tempx*piece_width, tempy*piece_height, piece_width, piece_height)
                }
                have_modified=false;

            }

    }
    split();
    initial_random_generator(ctx);

}

function swap(tile){
    var tempx = cur_red.x;
    var tempy=cur_red.y;
    cur_red.x=tile.x;
    cur_red.y=tile.y;
    tile.x=tempx;
    tile.y=tempy;
}


class Tile{
    constructor(x, y, correct_x, correct_y, width, height, image, is_red=false, is_adjacent_to_red=false){
        this.x=x;
        this.y=y;
        this.correct_x=correct_x;
        this.correct_y=correct_y;
        this.width=width;
        this.height=height;
        this.image=image;
        this.is_red=is_red;
        this.is_adjacent_to_red=is_adjacent_to_red;
        this.ctx=image.getContext("2d");
    }
}

function split(){
    for(var x = 0; x < columns; ++x) {
        for(var y = 0; y < rows; ++y) {
            this.canvas = this.document.createElement('canvas');
            canvas.width = piece_width;
            canvas.height = piece_height;
            this.context = this.canvas.getContext('2d');
            context.drawImage(image, x * piece_width, y * piece_height, piece_width, piece_height, 0, 0, canvas.width, canvas.height);
            tile = new Tile(x, y, x, y,  canvas.width, canvas.height, this.canvas);
            tiles.push(this.tile);
        }
    }
}

function initial_random_generator(ctx){
    it = 0;
    shuffle(tiles);
    temp_ctx=tiles[0].image.getContext("2d");
    temp_ctx.rect(0, 0, tile.width, tile.height);
    temp_ctx.fillStyle = "red";
    temp_ctx.fill();
    tiles[0].is_red=true;
    tiles[0].x=0;
    tiles[0].y=0;
    cur_red=tiles[0];
    for(var x = 0; x < columns; ++x) {
        for(var y = 0; y < rows; ++y) {
            tiles[it].x=x;
            tiles[it].y=y;
        
            ctx.drawImage(tiles[it++].image, x*piece_width, y*piece_height); 
        }
    }
    test_if_adjacent_red();
}


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function test_if_adjacent_red() {
    tiles.forEach(tile => {
        if((tile.x==cur_red.x && (tile.y-1==cur_red.y || tile.y+1==cur_red.y)) || (tile.y==cur_red.y && (tile.x-1==cur_red.x || tile.x+1==cur_red.x))){
            tile.is_adjacent_to_red=true;
        }else{
            tile.is_adjacent_to_red=false;
        }
    });
}

function test_finished(){
    var dont_write_code_like_that = true;
    tiles.forEach(tile => {
        if (tile.x!=tile.correct_x || tile.y!=tile.correct_y){
            dont_write_code_like_that = false;
        }
    });
    if(dont_write_code_like_that){
        window.alert("Damn you good, start again.")
        tiles = [];
        cur_red = null
        split();
        initial_random_generator(ctx);
    }
}