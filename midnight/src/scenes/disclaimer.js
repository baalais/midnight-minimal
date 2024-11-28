import k from "../app/game/kaplayCtx";

export default function disclaimer() {
  // Display the Sonic ownership text
  k.add([
    k.text(
      `Sonic is owned by SEGA.
      \nThis is a fun game using assets from Sonic Mania.`,
      {
        font: "mania",
        size: 32,
      }
    ),
    k.pos(k.center().x, k.center().y - 100), // Position text slightly above center
    k.origin("center"),
  ]);

  // Display the start prompt
  k.add([
    k.text("Press Space/Click/Touch to Start The Game", {
      font: "mania",
      size: 64,
    }),
    k.pos(k.center()), // Center text on the screen
    k.origin("center"),
  ]);

  // Transition to the main menu on button press
  k.onButtonPress("jump", () => {
    console.log("Starting main menu...");
    k.go("main-menu");
  });
}
