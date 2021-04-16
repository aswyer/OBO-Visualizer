let r, g, b;
let mic, fft;
let title, subtitleL, subtitleR;

let startButton;

let hasAudio = false;

let radius = 700;

function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  
  textAlign(LEFT, BASELINE);


  title = createP("ONEBYONE*"); 
  title.style('font-size', '10em');
  title.position(50, windowHeight-400);
  
  subtitleL = createP("ZION "); 
  subtitleL.style('font-size', '2em');
  subtitleL.position(windowWidth-240, windowHeight-125);

  subtitleR = createP("GOINZ"); 
  subtitleR.style('font-size', '2em');
  subtitleR.position(windowWidth-145, windowHeight-125);

  startButton = createButton('start audio');
  startButton.mouseClicked(startAudio);
}

function startAudio() {
  //for mic
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  getAudioContext().resume();

  startButton.remove();

  hasAudio = true;
}

function draw() {
  background(sin(millis()/100)*230); //'#4E58A1'

  if(!hasAudio) { return; }

  let spectrum = fft.analyze();
  noFill();
  stroke(255);
  strokeWeight(2);

  beginShape();

  for(i = 0; i<spectrum.length*0.3; i+=1) {

    let angle = map(i, 0, spectrum.length*0.3, 180, 360);

    let normalized = map(spectrum[i], 0, 255, 0, 1);

    let x = normalized * radius * cos(angle);
    let y = normalized * radius *  sin(angle);

    vertex(x + windowWidth/2, y + windowHeight);
  }

  endShape();

  let bass = fft.getEnergy("bass");
  // let lowMid = fft.getEnergy("lowMid");
  let mid = fft.getEnergy("mid");
  let highMid = fft.getEnergy("highMid");
  // let treble = fft.getEnergy("treble");


  let bassNormalized = map(bass, 0, 255, 0 ,windowHeight);
  let midNormalized = map(mid, 0, 255, 100 ,700);
  let highMidNormalized = map(highMid, 0, 255, 0 ,windowHeight);
  // let highMidNormalized = map(highMid, 0, 255, 0 ,35);
  // let slant = map(highMid, 0, 255, 12 ,0);


  title.elt.style['font-variation-settings'] = `"wght" ${midNormalized}`;
  subtitleL.position(windowWidth-240, windowHeight-125-highMidNormalized);
  subtitleR.position(windowWidth-145, windowHeight-125-bassNormalized);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}