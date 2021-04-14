let r, g, b;
let mic, fft;
let p;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  r = random(255);
  g = random(255);
  b = random(255);
  
  //for mic
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  
  p = createP("NOT A BOUTIQUE");

  getAudioContext().resume();
}

function draw() {
  background(0);

  fill(r, g, b, 127);

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

  // console.log(bass);
  
  // color.setRed(bass);
  // color.setRed(bass);

  // let settings = 'seri ' + 500;
  //+ ' 'WDTH " 100, "CNTR" 0, "SLNT" 0, "SERI" 300, "MONO" 0, "PATT" 0';
  let bassNormalized = map(bass, 0, 255, 600 ,300);
  let midNormalized = map(mid, 0, 255, 300 ,35);
  let highMidNormalized = map(highMid, 0, 255, 0 ,35);
  let slant = map(highMid, 0, 255, 12 ,0);

  p.elt.style['font-variation-settings'] = `"WGHT" ${bassNormalized}, "SERI" ${midNormalized}, "PATT" ${highMidNormalized}, "MONO" ${highMidNormalized}, "SLNT" ${slant}`;

  let textColor = color(bass*2, mid, 255-highMid*2);
  p.style('color', textColor);  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}