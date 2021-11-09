video= ""
status=""
objects= []
function preload(){
    video= createVideo('video.mp4')
    video.hide()
}

function setup(){
    canvas= createCanvas(480,380);
    canvas.center();
}

function draw(){
    image(video,0,0,480,380);
    if (status!=""){
        object_detector.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML= "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML= "Number of Objects Detected are "+ objects.length;
            fill('#cc1800');
            percentage= floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%",objects[i].x+10,objects[i].y+30);
            noFill()
            stroke('cc1800');
            rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height)

        }
    }
    }

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects= results;
    }
}

function start(){
    object_detector=ml5.objectDetector('cocossd',ModelLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";
}

function ModelLoaded(){
    console.log("Model Loaded")
    status= true;
    video.loop();
    video.speed(1);
    video.volume(0);
}