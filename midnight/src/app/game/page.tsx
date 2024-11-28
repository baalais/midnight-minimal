"use client"; // Force this page to render only on the client side

import { useEffect } from "react";
import k from "./kaplayCtx";
import disclaimer from "../../scenes/disclaimer";
import game from "../../scenes/game";
import gameover from "../../scenes/gameover";
import mainMenu from "../../scenes/mainMenu";

const GamePage = () => {
  useEffect(() => {
    // Ensure this code runs only in the browser
    if (typeof window !== "undefined") {
      // Load assets
      k.loadSprite("chemical-bg", "graphics/chemical-bg.png");
      k.loadSprite("platforms", "graphics/platforms.png");
      k.loadSprite("sonic", "graphics/sonic.png", {
        sliceX: 8,
        sliceY: 2,
        anims: {
          run: { from: 0, to: 7, loop: true, speed: 30 },
          jump: { from: 8, to: 15, loop: true, speed: 100 },
        },
      });
      k.loadSprite("ring", "graphics/ring.png", {
        sliceX: 16,
        sliceY: 1,
        anims: {
          spin: { from: 0, to: 15, loop: true, speed: 30 },
        },
      });
      k.loadSprite("motobug", "graphics/motobug.png", {
        sliceX: 5,
        sliceY: 1,
        anims: {
          run: { from: 0, to: 4, loop: true, speed: 8 },
        },
      });
      k.loadFont("mania", "fonts/mania.ttf");
      k.loadSound("destroy", "sounds/Destroy.wav");
      k.loadSound("hurt", "sounds/Hurt.wav");
      k.loadSound("hyper-ring", "sounds/HyperRing.wav");
      k.loadSound("jump", "sounds/Jump.wav");
      k.loadSound("ring", "sounds/Ring.wav");
      k.loadSound("city", "sounds/city.mp3");

      // Define scenes
      k.scene("disclaimer", disclaimer);
      k.scene("main-menu", mainMenu);
      k.scene("game", game);
      k.scene("gameover", gameover);

      // Start the initial scene
      k.go("disclaimer");
    }
  }, []); // Run once when the component is mounted

  return (
    <div
      id="game-container"
      style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}
    />
  );
};

export default GamePage;
