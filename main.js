leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;


leftWristscore=0;
rightWristscore=0;


song1="";
song2="";
function preload(){
    song1=loadSound("BTS.mp3");
    song2=loadSound("LovingCaliber.mp3");
}

function play(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function draw(){
image(video,0,0,600,500);
song1_status=song1.isPlaying();
song2_status=song2.isPlaying();
fill("yellow");
stroke("black");
if(leftWristscore>0.2){

circle(leftWristX,leftWristY,20);
song2.stop();
if(song1_status==false){
    song1.play();
}
}
}

function modelLoaded(){
console.log("poseNet is loaded");
}


function gotPoses(results){
if(results.length>0){
    console.log(results);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("Left Wrist X="+leftWristX+" Left Wrist Y="+leftWristY);
    console.log("Right Wrist X="+rightWristX+" Right Wrist Y="+rightWristY);
leftWristscore=results[0].pose.keypoints[9].score;
rightWristscore=results[0].pose.keypoints[10].score;
}
}