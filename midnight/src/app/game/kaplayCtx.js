import kaplay from "kaplay";

const k = kaplay({
  root: document.getElementById("game-container"), // Attach to specific container
  width: 1920,
  height: 1080,
  letterbox: true,
  background: [0, 0, 0],
  global: false,
  buttons: {
    jump: {
      keyboard: ["space"],
      mouse: "left",
    },
  },
  touchToMouse: true,
  debug: false,
});

export default k;