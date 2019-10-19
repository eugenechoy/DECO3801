

//red and blue parameters are here
var gap, speed;
var strip_width;
var red_strip_pos, blue_strip_pos;
var red_strips = [];
var blue_strips = [];
var scene, camera, render;
var number_of_red_strips, number_of_blue_strips;
var window_width = window.innerWidth;
var window_height = window.innerHeight;
var blue_strips_dir, red_strips_dir;

// A custom class to store the position of a geometry element
class Position {
    constructor(x,y,z) {
        this._x = x;
        this._y = y;
        this._z = z;
    }
    get x() {return this._x;}
    get y() {return this._y;}
    get z() {return this._z;}

    set x(x) {this._x = x;}
    set y(x) {this._y = x;}
    set z(x) {this._z = x;}
}

/*
Initialise the animation canvas
*/
function canvasInit() {
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera( 
        window.innerWidth / - 2, 
        window.innerWidth / 2, 
        window.innerHeight / 2, 
        window.innerHeight / - 2, 
        1, 
        100
    );

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    scene.add(camera);
    renderer.setSize(window_width,window_height);
    document.getElementById('test').appendChild(renderer.domElement);
}

/*
Initialise the stripes attributes
*/
function attrInit() {
    //number of stripes
    strip_width = 10;
    gap = 8;

    blue_strips_dir = -1;
    red_strips_dir = 1;
    //strips position
    red_strip_pos = new Position(-window_width/2, 0, -100);
    blue_strip_pos = new Position(0, -window_height/2, -100);

    
    number_of_blue_strips = Math.floor(window_height/(strip_width + gap)) ;
    number_of_red_strips = Math.floor(window_width/(strip_width + gap));
    speed = 1;

}

/*
create scripes and add them into lists
*/
function addStripes() {
    
    var geometry = new THREE.BoxGeometry(
        strip_width, 
        window_height,
        1); 
    // blue horizontal (width, height, depth) 
    var geometry2 = new THREE.BoxGeometry(
        window_width,
        strip_width,
        1); 

    var material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.5,
        }); //color of stripe
    var material2 = new THREE.MeshBasicMaterial({
        color: 0x0000FF,
        transparent: true,   //make the stripe transparent like in the video
        opacity: 0.5,       
    });

    for(var i = 0; i < number_of_red_strips; i++) {
        var red = new THREE.Mesh(geometry,material); 
        red_strips.push(red);
        scene.add(red_strips[i]);
        red_strips[i].position.z = red_strip_pos.z;            //all reds will be at the same depth
        red_strips[i].position.x = red_strip_pos.x + (strip_width + gap) * i;      //tranX is the space between each red stripe
        red_strips[i].position.y = red_strip_pos.y;              //all red will be at the same y position
        //offset += gap;

    }
    for(var i = 0; i < number_of_blue_strips; i++) {
        var blue = new THREE.Mesh(geometry2,material2);
        blue_strips.push(blue);
        scene.add(blue_strips[i]);
        blue_strips[i].position.z = blue_strip_pos.z;           //all blues will be at the same z position
        blue_strips[i].position.x = blue_strip_pos.x;          //all blue will start at same x position
        blue_strips[i].position.y = blue_strip_pos.y + (strip_width + gap) * i;  //tranY is the space between each blue stripe
    }
}

/*
Create a mask to allow user to see only a circle of the strips
*/
function createMask() {
    var mask_pos = new Position(0, 0, -5);
    var mask_material = new THREE.MeshBasicMaterial(
        {color:0x000000});

    var plane_geometry = new THREE.BoxGeometry(
        window_width ,
        window_height,
        1);
    var plane_mesh = new THREE.Mesh(plane_geometry);
    
    var sphere_geometry = new THREE.SphereGeometry(100, 32, 32);
    var sphere_mesh = new THREE.Mesh(sphere_geometry);
    
    var plane_bsp = new ThreeBSP(plane_mesh);
    var sphere_bsp = new ThreeBSP(sphere_mesh);
    var mask_bsp = plane_bsp.subtract(sphere_bsp);

    var mask = mask_bsp.toMesh(mask_material);

    scene.add(mask);
    mask.position.x = mask_pos.x;
    mask.position.y = mask_pos.y;
    mask.position.z = mask_pos.z;
   
}

/*
move the stripe in given direction -1 , 0 or 1
*/
function move(strip_color, direction) {
    if(strip_color == 'red') {
        for (var i = 0; i < number_of_red_strips; i++) {
            red_strips[i].translateX(speed * direction);
            if (red_strips[i].position.x <= -window_width/2 && 
                direction == -1) {
                red_strips[i].position.x = window_width/2 ;
            }
            if (red_strips[i].position.x >= window_width/2 &&
                direction == 1) {
                red_strips[i].position.x = -window_width/2;
            }
        }
    }
    if(strip_color == 'blue') {
        for (var i = 0; i < number_of_blue_strips; i++) {
            blue_strips[i].translateY(speed * direction);
            if (blue_strips[i].position.y <= -window_height/2 &&
                direction == -1) {
                blue_strips[i].position.y = window_height/2;
            }
            if (blue_strips[i].position.y >= window_height/2 &&
                direction == 1) {
                blue_strips[i].position.y = -window_height/2;
            }
        }
    }
}

/*
animate function here
*/
var animate = function() {
    move('red', 1);
    move('blue', -1);
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    
}
 


