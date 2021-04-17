let intensity = 0.8;

let mic, fft;
let title, subtitleL, subtitleR;
let startButton;

let radius;

let hasAudio = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  angleMode(DEGREES);
  textAlign(LEFT, BASELINE);

  noFill();
  stroke(255);
  strokeWeight(2);

  radius = windowHeight * intensity;

  title = createP("Onebyone*"); 
  title.style('font-size', '15em');
  title.position(50, windowHeight-700);
  
  subtitleL = createP("ZION "); 
  subtitleL.style('font-size', '2em');
  subtitleL.position(windowWidth-240, windowHeight-125);

  subtitleR = createP("GOINS"); 
  subtitleR.style('font-size', '2em');
  subtitleR.position(windowWidth-145, windowHeight-125);

  startButton = createButton('start audio');
  startButton.mouseClicked(startAudio);
}

function startAudio() {
  //mic input
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  //resume 
  getAudioContext().resume();

  //remove button and enable drawing
  startButton.remove();
  hasAudio = true;
}

function draw() {
  // let bgSpeed = 100;
  // let lightness = sin(millis()/bgSpeed);
  // background(lightness * 10, lightness * 10, lightness * 255); //'#4E58A1' sin(millis()/100)*230
   background(0);

  if(!hasAudio) { return; }

  //DRAW SPECTRUM
  let spectrum = fft.analyze();
  beginShape();
  for(i = 0; i < spectrum.length*0.3; i+=1) {

    let angle = map(i, 0, spectrum.length*0.3, 180, 360);

    let normalized = map(spectrum[i], 0, 255, 0, 1);

    let x = normalized * radius * cos(angle);
    let y = normalized * radius *  sin(angle);

    vertex(x + windowWidth/2, y + windowHeight);
  }
  endShape();

  //ENERGY
  let bass = fft.getEnergy("bass");
  // let lowMid = fft.getEnergy("lowMid");
  let mid = fft.getEnergy("mid");
  let highMid = fft.getEnergy("highMid");
  // let treble = fft.getEnergy("treble");


  //MAP
  let midNormalized = map(mid, 0, 255, 100 ,900);

  let bassNormalized = map(bass, 0, 255, 0 ,windowHeight*intensity);
  let highMidNormalized = map(highMid, 0, 255, 0 ,windowHeight*intensity);


  //APPLY
  title.elt.style['font-variation-settings'] = `"wght" ${midNormalized}`;

  subtitleL.position(1500, windowHeight-125-highMidNormalized); //windowWidth-240
  subtitleR.position(1600, windowHeight-125-bassNormalized*0.7); //windowWidth-145
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}