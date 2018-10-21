// 0 ×
// 1 ○
// 2 □
// 3 △
// 4 L1
// 5 R1
// 6 L2
// 7 R2
// 8 share
// 9 options
// 10 L3
// 11 R3
// 12 方向キー上
// 13 方向キー下
// 14 方向キー左
// 15 方向キー右
// 16 PSボタン
// 17 タッチパッド

var buttonNames = [
  "×", "○", "□", "△",
  "L1", "R1", "L2", "R2",
  "SH", "OP",
  "L3", "R3",
  "↑", "↓", "←", "→",
  "PS", "TP"
];

function setup() {
  createCanvas(800, 450);
  strokeJoin(ROUND);
  textAlign(CENTER, CENTER);

}

function draw() {
  background(200);

  // スティック用枠
  stroke(0);
  noFill();
  strokeWeight(3);
  rectMode(CORNER);
  rect(25, 25, 300, 300);
  rect(375, 25, 300, 300);

  // ボタン名テキスト
  noStroke();
  fill(0);
  textSize(20);
  for (var i = 0; i < buttonNames.length; i++) {
    text(buttonNames[i], i * 40 + 30, 410);
  }
  text("Lstick", 175, 350);
  text("Rstick", 525, 350);

  var pads = navigator.getGamepads ? navigator.getGamepads() :
    (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

  pads = pads[0];
  if (pads) {
    var but = [];
    for (var i = 0; i < pads.buttons.length; i++) {
      var val = pads.buttons[i];
      var pressed = val == 1.0;
      if (typeof(val) == "object") {
        pressed = val.pressed;
        val = val.value;
      }
      but[i] = val;
    }

    // 押されたら枠をつける
    noFill();
    strokeWeight(3);
    stroke(255, 0, 0);
    for (var index = 0; index < but.length; index++) {
      if (but[index] == 1) {
        rectMode(CENTER);
        rect(index * 40 + 30, 410, 40, 30);
      }
    }

    var axes = pads.axes;

    // スティックの位置をマッピング
    var Lx = map(axes[0], -1, 1, 25, 325);
    var Ly = map(axes[1], -1, 1, 25, 325);
    var Rx = map(axes[2], -1, 1, 375, 675);
    var Ry = map(axes[3], -1, 1, 25, 325);

    strokeWeight(1);
    stroke(0);
    fill(255);
    ellipse(Lx, Ly, 20, 20);
    ellipse(Rx, Ry, 20, 20);
  }
}
