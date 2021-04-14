let r, g, b;
let mic, fft;
let p;

let startButton;

let hasAudio = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  r = random(255);
  g = random(255);
  b = random(255);
  
  textAlign(CENTER, CENTER)
  p = createP("NOT A BOUTIQUE");
  p.center();
  //position(windowWidth/2, 0);

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
  background(0); //'#4E58A1'

  // fill(r, g, b, 127);

  if(!hasAudio) { return; }

  let spectrum = fft.analyze();

  let bass = fft.getEnergy("bass");
  let lowMid = fft.getEnergy("lowMid");
  let mid = fft.getEnergy("mid");
  let highMid = fft.getEnergy("highMid");
  let treble = fft.getEnergy("treble");
  
  fill(255, 10, 10, 255);
  ellipse(100, height / 2, bass, bass);
  
  fill(10, 255, 10, 255);
  ellipse(250, height / 2, mid, mid);
  
  fill(10, 10, 255, 255);
  ellipse(450, height / 2, highMid, highMid);

  let bassNormalized = map(highMid, 0, 255, 100 ,700);
  // let bassWidth = map(bass, 0, 255, 0 ,25);
  // let midNormalized = map(mid, 0, 255, 300 ,35);
  // let highMidNormalized = map(highMid, 0, 255, 0 ,35);
  // let slant = map(highMid, 0, 255, 12 ,0);

  // p.elt.style['font-variation-settings'] = `"WGHT" ${bassNormalized}, "SERI" ${midNormalized}, "PATT" ${highMidNormalized}, "MONO" ${highMidNormalized}, "SLNT" ${slant}`;
  p.elt.style['font-variation-settings'] = `"wght" ${bassNormalized}`;
  console.log(bass + " " + bassNormalized);

  // let textColor = color(bass*2, mid, 255-highMid*2);

  // p.elt.style['-webkit-text-stroke-width'] = `${bassWidth}px`;
  // p.elt.style['letter-spacing'] = `${bassWidth}px`;
  

  // p.style('color', textColor);  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}