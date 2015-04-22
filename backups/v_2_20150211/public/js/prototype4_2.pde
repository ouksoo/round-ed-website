Ball[] particles;
Ball logo;
Circle[] circles;
static final int numParticles = 60;
static final int numCircles = 4;
static final int numParticlesNode = 4;
float centerX = 0;
float centerY = 0;
float minDist = 100;
float minRadius = 200;
float maxRadius = 800;
float minSpeed = 0.005;//0.009;
float maxSpeed = 0.01;//0.01;

float externalAx = 0.0;
float externalAy = 0.0;

int docWidth = 1024;
int docHeight = 1024;

void setup() {
  getWindowSizeFromPS();
  
  size(docWidth, docHeight);
  frameRate(60);  
  initialize();
  
//  background(254, 195, 35);
//  background(0);
}

void reSize(int w, int h) {
  docWidth = w;
  docHeight = h;
  
  size(docWidth, docHeight);
  centerX = docWidth * 0.5;
  centerY = docHeight * 0.5;
}
 
void initialize() {
  smooth();
  noStroke();
  
  float radius = 0.0;
  
  centerX = docWidth * 0.5;
  centerY = docHeight * 0.5;
  
  radius = 20;
  logo = new Ball(radius);
  
  logo.x = docWidth*0.5;//random(width);
  logo.y = docHeight*0.5;//random(height);
  logo.vx = logo.x;
  logo.vy = logo.y;
  logo.radiusX = radius;
  logo.radiusY = radius;
//  logo.angle = 0;
  logo.speed = 0.12;
  logo.setFillColor(color(255, 255, 255));
  
  particles = new Ball[numParticles];
  radius = 0.0;
  for(int i=0; i<numParticles; i++) {
    particles[i] = new Ball(2);
    particles[i].x = docWidth*0.5;//random(width);
    particles[i].y = docHeight*0.5;//random(height);
    particles[i].vx = particles[i].x;
    particles[i].vy = particles[i].y;
//    float radius = minRadius + maxRadius*i/numParticles;
    if (i<numParticles*0.5)
      radius = random(minRadius, maxRadius*0.25);
    else 
      radius = random(minRadius+minRadius*0.3, maxRadius);
    particles[i].radiusX = radius;
    particles[i].radiusY = radius;
    particles[i].speed = random(minSpeed, maxSpeed) + particles[i].radiusX*0.000005;
//    particles[i].speed = random(0.01, 0.04);
    particles[i].acc = random(-1, 1) < 0 ? -1 : 1;
    particles[i].angle = random(360);
    particles[i].setFillColor(color(255, 255, 255));
  }
  
  circles = new Circle[numCircles];
  radius = 400;
  for(int i=0; i<numCircles; i++) {
    circles[i] = new Circle(radius);
    circles[i].radiusX = radius + 250;
    circles[i].radiusY = radius + 250;
    circles[i].speed = minSpeed * 0.5;
    circles[i].angle = (360 * i/numCircles) * PI / 180;
    circles[i].setStrokeColor(color(255, 255, 255));
    circles[i].x = centerX + cos(circles[i].angle) * radius;
    circles[i].y = centerY + sin(circles[i].angle) * radius;
    circles[i].vx = circles[i].x;
    circles[i].vy = circles[i].y;
    
  }
}
 
void draw() {
  background(254, 195, 35);
 
//  fill(254, 195, 35, 50);
//  rect(0,0,width,height);
  
  homeEffect();
  
  fill(255);
 // text("ftp : " + nf(frameRate, 2, 2), 10, 20);
 // text("ax : " + externalAx , 10, 40);
 // text("ay : " + externalAy , 10, 60);
  
  sendJSFromPS(nf(frameRate, 2, 2));
}

// TODO :: only local. 
//void sendJSFromPS(String fps) {}
//void getWindowSizeFromPS() {}

void setAccData(float ax, float ay)
{
  externalAx = ax;
  externalAy = ay;
} 
float getCalcAccX(){
  float ax = centerX + centerX * externalAx;
  return ax;
}
float getCalcAccY(){
  float ay = centerY + centerY * externalAy;
  return ay;
}
 
void homeEffect() {
  float gx = 0, gy = 0;
  float dx, dy = 0;
  float ax, ay = 0;
  float dist = 0;
  float px, py = 0;
  
  if (externalAx != 0.0 && externalAx != 0.0)
  {
    gx = 1 * ((getCalcAccX()-width*0.5)/width) * .7;
    gy = 1 * ((getCalcAccY()-height*0.5)/height) * .7;
  }
  
  
  // logo
  if (mousePressed)
  {
    logo.vx += (mouseX - logo.vx) * logo.speed;
    logo.vy += (mouseY - logo.vy) * logo.speed;
  }
  else
  {
    logo.vx += (centerX - logo.vx) * logo.speed;
    logo.vy += (centerY - logo.vy) * logo.speed;
  }
  logo.x = logo.vx;
  logo.y = logo.vy;
  logo.update();
  
  // particles
  for(int i=0; i<numParticles; i++){
    Ball p0 = particles[i];
    
    dx = getCalcAccX() - p0.x;
    dy = getCalcAccY() - p0.y;
    dist = sqrt(dx * dx + dy * dy);
    p0.radius = 2;//1 + 20 * (p0.radiusX-minRadius)/maxRadius;
    
    if (mousePressed && dist < maxRadius ) 
    {
//      println(dist);
      px = logo.x;
      py = logo.y;
      gx = 0;
      gy = 0;
      stroke(p0.getFillColor(), (255 - 255 * dist/maxRadius) * 0.5);
      line(p0.x, p0.y, logo.x, logo.y);
    }
    else
    {
      px = centerX;
      py = centerY;
    }
    
    ax = (px + (p0.radiusX * gx));
    ay = (py + (p0.radiusY * gy));
    ax += cos(p0.angle) * p0.radiusX * p0.acc;
    ay += sin(p0.angle) * p0.radiusY;
    p0.vx += (ax - p0.vx) * p0.speed;
    p0.vy += (ay - p0.vy) * p0.speed;
    p0.angle += p0.speed;
    
    int cnt = 0;
    for(int j=i+1; j<numParticles; j++){
      if (cnt < numParticlesNode)
      {
        Ball p1 = particles[j];
        dx = p1.x - p0.x;
        dy = p1.y - p0.y;
        dist = sqrt(dx * dx + dy * dy);
        if(dist < minDist) {// && cnt < 1){
          stroke(p0.getFillColor(), (255 - 255 * dist/minDist) * 1);
          line(p0.x, p0.y, p1.x, p1.y);
          cnt += 1;
        }
      }
    }
    noStroke();
    
    p0.x = p0.vx;
    p0.y = p0.vy;
    
    p0.update();
  }
  
  // circle
  noFill();
  for(int i=0; i<numCircles; i++){
    Circle c = circles[i];
    dx = getCalcAccX() - c.x;
    dy = getCalcAccY() - c.y;
    dist = sqrt(dx * dx + dy * dy);
    
    ax = (centerX + (c.radiusX * gx * 0.5));
    ay = (centerY + (c.radiusY * gy * 0.5));
    ax += cos(c.angle) * c.radiusX;
    ay += sin(c.angle) * c.radiusY;
    c.vx += (ax - c.vx) * c.speed;
    c.vy += (ay - c.vy) * c.speed;
    c.angle += c.speed;
    
    c.x = c.vx;
    c.y = c.vy;
    
    c.update();
  }
  
  logo.x = logo.vx;
  logo.y = logo.vy;
  logo.update();
}
 
////////////////////////////////
 
class Circle extends Sprite {
  float radius;
  float radiusX, radiusY;
  float speed;
  float angle;
  float vx, vy;
  float acc;
  float mass = 1;
   
  Circle(float radius){
    super();
    this.radius = radius;
  }
   
  void draw(){
    stroke(this.strokeColor, 50);
    ellipse(0, 0, radius*2, radius*2);
  }
}

////////////////////////////////
 
class Ball extends Sprite {
  float radius;
  float radiusX, radiusY;
  float speed;
  float angle;
  float vx, vy;
  float acc;
  float mass = 1;
   
  Ball(float radius){
    super();
    this.radius = radius;
  }
   
  void draw(){
    fill(color(255, 255, 255));
    ellipse(0, 0, radius*3, radius*3);
    fill(254, 195, 35);
    ellipse(0, 0, radius*2, radius*2);
  }
}
 
////////////////////////////////
 
class Sprite extends Object {
  float x, y;
  float scaleX, scaleY;
  float width, height;
  float rotation;
  boolean visible;
  color strokeColor;
  color fillColor;
  Boolean isStroke;
  Boolean isFill;
  
  Sprite() {
    super();
    scaleX = 1.0;
    scaleY = 1.0;
    strokeColor = color(0);
    fillColor = color(0);
    isStroke = false;
    isFill = false;
    visible = true;
  }
   
  void update() {
    if(! visible) return;
    pushMatrix();
    translate(x, y);
    scale(scaleX, scaleY);
    rotate(rotation * PI / 180.0);
    if(isStroke) stroke(strokeColor);
    if(isFill) fill(fillColor);
    draw();
    popMatrix();
  }
   
  void setStrokeColor(color strokeColor) {
    this.strokeColor = strokeColor;
    isStroke = true;
  }
   
  void setFillColor(color fillColor) {
    this.fillColor = fillColor;
    isFill = true;
  }
  
  color getStrokeColor()
  {
    return this.strokeColor;
  }
  
  color getFillColor()
  {
    return this.fillColor;
  }
   
  void draw() {}
}


