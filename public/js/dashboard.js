
var xValues = ["Session1", "Session2", "Session3", "Session4", "Session5","Session6"];
var yValues = [3, 5, 1, 6, 2, 5];
var barColors = ["red", "green","blue","orange","brown","grey"];
let mcqScore = document.getElementById('mcqHBS').innerText;

new Chart("myChart", {
type: "bar",
data: {
    labels: xValues,
    datasets: [{
    backgroundColor: barColors,
    data: yValues
    }]
},
options: {
    scales: {
            y: {
                suggestedMax: 6
            }
    },
    plugins: {
        legend: {display: false},
        title: {
            display: true,
            text: "Flashcard Test Results"
        }
    }
    
}
});


let mcqSessionIdHBS = document.getElementById('mcqSessionIdHBS').innerText;
let xValues1 = mcqSessionIdHBS.split(",");

let mcqValues = document.getElementById('mcqSessionHBS').innerText;

var yValues1 = mcqValues.split(",");
for(let i=0;i<yValues1.length;i++){
    xValues1[i] = "Session "+xValues1[i];
    yValues1[i]=parseInt(yValues1[i]);
}

var barColors1 = ["red", "green","blue","orange","brown","grey"];

new Chart("myChart1", {
type: "bar",
data: {
    labels: xValues1,
    datasets: [{
    backgroundColor: barColors1,
    data: yValues1
    }]
},
options: {
    scales: {
            y: {
                suggestedMax: 10
            }
    },
    plugins: {
        legend: {display: false},
        title: {
            display: true,
            text: "MCQ Test Results"
        }
    }
    
}
});

function triggerEvents(){
    triggerGraphs();
}

function triggerGraphs(){
    console.log("entered");
    let percentage1=100;
    let percentage2=mcqScore;
    let percentage3=70;
    document.getElementById('i-circle1').innerText=percentage1.toString()+"%";
    let deg1=(percentage1/100*360)/2;
    degree1=deg1.toString()+"deg";
    fill1=document.getElementsByClassName('fill1');
    full1=document.getElementsByClassName('full1');
    const t1=new TimelineMax();
    t1.fromTo(fill1,1,{transition: "transform",transform:"rotate(0deg)",ease:Power1.easeInOut},{transition: "transform",transform:"rotate("+degree1+")"}).
    fromTo(full1,1,{transition: "transform",transform:"rotate(0deg)",ease:Power1.easeInOut},{transition: "transform",transform:"rotate("+degree1+")"},"-=1");

    document.getElementById('i-circle2').innerText=percentage2.toString()+"%";
    let deg2=(percentage2/100*360)/2;
    degree2=deg2.toString()+"deg";
    fill2=document.getElementsByClassName('fill2');
    full2=document.getElementsByClassName('full2');
    const t2=new TimelineMax();
    t2.fromTo(fill2,2,{transition: "transform",transform:"rotate(0deg)",ease:SlowMo.easeOut},{transition: "transform",transform:"rotate("+degree2+")"}).
    fromTo(full2,2,{transition: "transform",transform:"rotate(0deg)",ease:SlowMo.easeOut},{transition: "transform",transform:"rotate("+degree2+")"},"-=2");

}

