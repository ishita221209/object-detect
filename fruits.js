my_status = "";
myresults = [];
//https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/assortment-of-colorful-ripe-tropical-fruits-top-royalty-free-image-995518546-1564092355.jpg
function preload() {
    pic_fruits = loadImage("fruit1.jpg");
}

function setup() {
    canvas = createCanvas(780, 439);
    canvas.position(385, 300);
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}

function draw() {
    image(pic_fruits, 0, 0, 780, 439);
    if (my_status != "") {
      
        for(i = 0; i < myresults.length; i++){
          
            stroke("red");
            x = myresults[i].x;
            y = myresults[i].y;
            width = myresults[i].width;
            height =  myresults[i].height;
            confidence = floor(myresults[i].confidence*100) + "%";
            fill("white");
            rect(x+5,y+10,80,25);
            fill("black");
            text(myresults[i].label + " " + confidence, myresults[i].x + 10, myresults[i].y +25);
            
            noFill();
            rect(x,y, width, height);
        }
        //objectDetector.detect(pic_fruits, gotResults);
    }
}

function modelLoaded() {
    console.log("Model is loaded.");
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    objectDetector.detect(pic_fruits, gotResults);
}


function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        my_status = "true";
        console.log(results);
        myresults = results;
        document.getElementById("status").innerHTML = "Status: Objects Detected";
        document.getElementById("objects").innerHTML = "Number of objects detected: " + myresults.length;
    }
}

function back(){
    window.location = "index.html";
}