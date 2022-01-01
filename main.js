//https://teachablemachine.withgoogle.com/models/fWRpHVT3m/
prediction1="";
prediction2="";
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera=document.getElementById("camera");
Webcam.attach(camera);
function takePicture() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML="<img src="+data_uri+" id='imgResult'>"
    })
}
console.log("ml5version=",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/fWRpHVT3m/model.json",modelLoaded);
function modelLoaded() {
    console.log("model loaded");
}
function check() {
    imgResult=document.getElementById("imgResult");
    classifier.classify(imgResult, gotResult);
}
function speak() {
    synth = window.speechSynthesis;
    speakData1 = "The first prediction is " + prediction1;
    speakData2 = "The second prediction is " + prediction2;
    utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        prediction1=results[0].label;
        prediction2=results[1].label;
        document.getElementById("prediction1").innerHTML=results[0].label;
        document.getElementById("prediction2").innerHTML=results[1].label;
        document.getElementById("confidence1").innerHTML="Confidence: "+results[0].confidence.toFixed(3);
        document.getElementById("confidence2").innerHTML="Confidence: "+results[1].confidence.toFixed(3);
        speak();
        if (prediction1=="thumbs-up") {
            document.getElementById("emoji1").innerHTML="&#128077;";
        }
        if (prediction1=="rockstar") {
            document.getElementById("emoji1").innerHTML="&#129304;";
        }
        if (prediction1=="perfect") {
            document.getElementById("emoji1").innerHTML="&#128076;";
        }
        if (prediction1=="fist") {
            document.getElementById("emoji1").innerHTML="&#9994;";
        }
        if (prediction1=="peace") {
            document.getElementById("emoji1").innerHTML="&#9996;";
        }
        if (prediction2=="thumbs-up") {
            document.getElementById("emoji2").innerHTML="&#128077;";
        }
        if (prediction2=="rockstar") {
            document.getElementById("emoji2").innerHTML="&#129304;";
        }
        if (prediction2=="perfect") {
            document.getElementById("emoji2").innerHTML="&#128076;";
        }
        if (prediction2=="fist") {
            document.getElementById("emoji2").innerHTML="&#9994;";
        }
        if (prediction2=="peace") {
            document.getElementById("emoji2").innerHTML="&#9996;";
        }
    }
}
