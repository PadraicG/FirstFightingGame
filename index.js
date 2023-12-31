const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
//set ratio to 16:9
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, 1024, 576)

const gravity = 0.7

//create class for sprites including constructor with pos and velocity
class Sprite {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastKey;
    }
    //draw initial sprites
    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }
    //adds 10 pixels to y value every time update it called
    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        //if the sprites y position combined with its height and velocity reached the height of the canvas, set velocity to 0
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        //there was a gap between player and floor so I added gravity to fix
        } else this.velocity.y += gravity;
    }
}
//add player object
const player = new Sprite({
    position: {
    x:0,
    y:0},
    velocity: {
        x:0,
        y:0
    }
})


//add enemy object
const enemy = new Sprite({
    position: {
    x:400,
    y:100},
    velocity: {
        x:0,
        y:0
    }
})

console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    }
}


//function to allow for animation
function animate(){
    window.requestAnimationFrame(animate)
    console.log('animation is being called')
    //by setting c.fillstyle to black it differentiates itself from fillStyle for sprites which is red
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
    
    player.velocity.x = 0;
    enemy.velocity.x =0;

    //lastKey is used as well to overwrite current key with the most recently pressed one for smoother movement
    //player movement
    if (keys.a.pressed && player.lastKey == 'a'){
        player.velocity.x = -5;
    } else if (keys.d.pressed && player.lastKey == 'd'){
        player.velocity.x = 5;
        
    }
    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft'){
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight'){
        enemy.velocity.x = 5;
        
    }
}
//calling animate function
animate();


//Used booleans for pressed/not pressed because having velocity directly tied to movement caused issues when multiple buttons were pressed
window.addEventListener("keydown", (event) =>{
    console.log(event.key)
    switch (event.key){
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd'
        break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a'
        break;
        case 'w':
            //for w, we just set velocity straight away because we already set up gravity
            player.velocity.y = -20;
        break;
        //enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight'
        break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft'
        break;
        case 'ArrowUp':
            //for w, we just set velocity straight away because we already set up gravity
            enemy.velocity.y = -20;
        break;
    }
})

window.addEventListener("keyup", (event) =>{
    switch (event.key){
        case 'd':
            keys.d.pressed = false;
        break;
        case 'a':
            keys.a.pressed = false;
        break;
        case 'w':
            keys.w.pressed = false;
        break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
        break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
        break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
        break;
    }
})