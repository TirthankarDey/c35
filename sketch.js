var ball;
var database, ballPosition, ref;

function setup(){
    createCanvas(500,500);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //Create a firebase database object
    database = firebase.database();

    //Create a reference to the database location
    ref = database.ref('ball/position');

    //.on () - creates a listener to the values at the given database location
    ref.on("value", readPosition, showError );

}



function draw(){
    background("white");
     if(ballPosition !== undefined){

        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();
    }
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}


function readPosition(data){
    ballPosition = data.val();
    console.log(ballPosition);
    ball.x = ballPosition.x;
    ball.y = ballPosition.y;
}

function showError (){
    console.log("There is an error");
}

function writePosition(x,y){
    database.ref('ball/position').set({
        x: ballPosition.x + x,
        y: ballPosition.y + y
    })
}


/*
ball : {
    position : {
        x: 200, 
        y: 200}
    }
}


*/