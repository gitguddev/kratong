"use strict";

const kratongImg = new Image();
kratongImg.src = "./kratong.png"; //By North
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d", { alpha: false });

function canvasResizer() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", canvasResizer);
canvasResizer();

function Kratong(name, message, photo) {
  function Photo(photo) {
    const image = new Image();
    image.src = photo;

    return image;
  }
  this.name = name;
  this.message = message;
  this.photo = Photo(photo);
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.verticalDir = Math.floor(Math.random() * 1.9);
  this.herizontalDir = Math.floor(Math.random() * 1.9);
  this.speed = Math.random() * 0.1 + 0.1;
  this.mover = () => {
    if (this.herizontalDir) {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }
    if (this.verticalDir) {
      this.y += this.speed;
    } else {
      this.y -= this.speed;
    }

    if (this.x >= canvas.width) {
      this.herizontalDir = 0;
    }
    if (this.x <= 0) {
      this.herizontalDir = 1;
    }

    if (this.y >= canvas.height) {
      this.verticalDir = 0;
    }
    if (this.y <= 0) {
      this.verticalDir = 1;
    }
  };
}

let KratongList = [
  {
    name: "เกม",
    message: "ขอให้ทุกคนประสบความสำเร็จดั่งใจหวังทุกคนนะครับ",
    photo:
      "https://scontent.fbkk5-5.fna.fbcdn.net/v/t1.0-9/120433326_2067189880080899_4863950730108708947_o.jpg?_nc_cat=100&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEWV_-TtycLXEgjycR_EcodmT3ymtf9GXaZPfKa1_0ZdhyMjId6vVaeY5oFec0t-WH3NBDJ8KKOo47EQKtilylR&_nc_ohc=h_SNtfoOkQwAX_lju7k&_nc_ht=scontent.fbkk5-5.fna&oh=13397d7a3fcf94bfc5a76e0673b919e2&oe=5FC14CDD",
  },
  {
    name: "North",
    message:
      "(เหนือ) ขอให้ทุกคนในกลุ่มอยู่กันอย่างมีความสุข ความเจริญรุ่งเรืองสมบูรณ์ ไม่มีไข้เจ็บปวดทั้งสิ้น สาธุ 99",
    photo:
      "https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.0-9/118791412_2695907100691047_313690294550642642_o.jpg?_nc_cat=102&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeE_owTzWCgCDc9bb-kFnOaB93MvORlOATf3cy85GU4BNwR7IaQfp-SGD1l5qGKpE9L2PttjO2zpZDCEikqCV8TW&_nc_ohc=pJdKto6SxBUAX8e2K-w&_nc_ht=scontent.fbkk5-6.fna&oh=630be02f07d3f0e7e3b53faab3dfabcf&oe=5FC48D34",
  },
  {
    name: "ช้าง",
    message: "ขอให้ได้กาแฟ 3 แก้ว",
    photo:
      "https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.0-9/119893992_649118545984323_1295299608743336286_n.jpg?_nc_cat=101&ccb=2&_nc_sid=174925&_nc_eui2=AeEVbSpM24Ol8RkOTKSLiPrEgk0g0BV9sPaCTSDQFX2w9mYK-GibX9aOZsyzHNNLBdPeQLz37HkHrAAq-xKCenh5&_nc_ohc=4jXcNku5wSIAX_XYgDi&_nc_ht=scontent.fbkk5-6.fna&oh=f3e952fe4af02dc87bef7e1fb3e4ccf1&oe=5FC3A42C",
  },
  {
    name: "เต้",
    message: "ขอให้ทุกคนเรียนจบไปด้วยกัน",
    photo:
      "https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.0-9/82859128_2582758038718349_5708485176787468288_n.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeE0ud_KRW1JuS1i9-gYCCBkojvAycSu4-qiO8DJxK7j6jndjnyenU8reB_vqMIrNBFbiIusVVV1CJrwRyhkLdsx&_nc_ohc=EUVfCatPYd4AX9mgZTE&_nc_ht=scontent.fbkk5-3.fna&oh=f4a05386f394988f36182597398b795f&oe=5FC4E771",
  },
];

KratongList = KratongList.map(
  (map) => new Kratong(map.name, map.message, map.photo)
);

function Updater() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#050505";
  context.fillRect(0, 0, canvas.width, canvas.height);

  //GitGud Title
  context.fillStyle = "#222";
  context.font = "50px monospace";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("GitGud Dev", canvas.width / 2, canvas.height / 2);

  KratongList = KratongList.sort((a, b) => a.y - b.y);

  KratongList.forEach((each) => {
    each.mover();
    context.drawImage(kratongImg, each.x, each.y, 100, 100);
    context.drawImage(each.photo, each.x + 25, each.y - 50, 50, 50);
    context.fillStyle = "white";
    context.font = "16px monospace";
    context.textAlign = "center";
    context.textBaseline = "top";
    context.fillText(each.message, each.x + 50, each.y + 100);
  });
}

function Start() {
  console.log(
    "GitGud Kratong\nMade for canvas educational purpose\nFollow us on github.com/gitguddev 🚀"
  );
  function Renderer() {
    Updater();
    requestAnimationFrame(Renderer);
  }
  requestAnimationFrame(Renderer);
}

Start();
