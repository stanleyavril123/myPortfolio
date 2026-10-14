import React from "react";
import { Box } from "@mui/material";
import customIllustrations from "../assets/project-ascii.json";

const illustrations = {
  SpaceMind: String.raw`
       .----------------.
      /                /|
     /________________/ |
     |  .----------.  | |
     |  | . . . .  |  | |
     |  '----------'  | |
     |  .----------.  | |
     |  | . . . .  |  | |
     |  '----------'  | |
     |   [____]  o o  | /
     '----------------'
        /  /   /  /
       *  *   *  *`,
  "CodeCell Live": String.raw`
   .----------------------.
   | o o o                |
   |----------------------|
   |                      |
   |    {             }   |
   |      >_              |
   |           /\         |
   |          /  \        |
   |          '--'        |
   |______________________|
          |      |
       ___|______|___`,
  "SMS Booking AI Agent": String.raw`
   .-----------.
   |    ___    |
   |           |    .-------.
   | .-------. |    | o   o |
   | | ...   | |    |-------|
   | '---.---' |----|  [x]  |
   |    .----. |    |       |
   |    | ok | |    '-------'
   |    '----' |
   |     o     |
   '-----------'`,
  "Authorized Recon Data Pipeline": String.raw`
           .-----.
           |  o  |
           '-----'
              |
       .------+------.
       |             |
   .-------.     .-------.
   |  >_   |-----|  ...  |
   '-------'     '-------'
       |             |
       '------+------'
              |
          [ .json ]`,
  "AI Voice Detector": String.raw`
               |       |
       |       |   |   |
       |   |   |   |   |   |
   |   |   |   |   |   |   |
 --+---+---+---+---+---+---+--
   |   |   |   |   |   |   |
       |   |   |   |   |   |
       |       |   |   |
               |       |

          [ 0 ] [ 1 ]`,
  "Multiplayer RPG Game": String.raw`
       /\         /\
      /  \_______/  \
      |  |       |  |
      |[]|  ___  |[]|
      |  | |   | |  |
   ___|__|_|___|_|__|___

       o           o
      /|\    +    /|\
      / \         / \

        . . . . . .`,
  "Embedded Microcontroller System": String.raw`
       | | | | | | |
     .---------------.
  ---|               |---
  ---|   .-------.   |---
  ---|   |  AVR  |   |---
  ---|   '-------'   |---
  ---|               |---
     '---------------'
       | | | | | | |
          |     |
         (o)---(o)`,
};

export default function ProjectAsciiArt({ project, large = false }) {
  const title = project.sourceTitle || project.title;
  const custom = customIllustrations[title];
  const illustration = custom || illustrations[title];
  if (!illustration) return null;
  const lines = illustration.split("\n");
  const columns = Math.max(...lines.map(line => line.length));

  return (
    <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none", overflow: "hidden" }}>
      {custom ? (
        <Box component="svg" viewBox={`0 0 ${columns * 6 + 2} ${lines.length * 12 + 2}`}
          focusable="false" sx={{
            width: "calc(100% - 32px)", maxWidth: large ? 620 : 400,
            height: large ? 360 : 165, opacity: large ? 0.14 : 0.55,
            transform: large ? "none" : "translateY(-12px)",
            fontFamily: '"Courier New", Courier, monospace', fontSize: "10px",
            fill: "currentColor", userSelect: "none",
          }}>
          {lines.map((line, index) => (
            <text key={index} x="1" y={index * 12 + 10} xmlSpace="preserve">{line}</text>
          ))}
        </Box>
      ) : <Box component="pre" sx={{
        m: 0, color: "inherit", fontFamily: '"Courier New", Courier, monospace',
        fontSize: large ? { xs: "13px", sm: "19px" } : "10px",
        lineHeight: 1.12, fontWeight: 400, whiteSpace: "pre", userSelect: "none",
        opacity: large ? 0.14 : 0.4,
        transform: large ? "none" : "translateY(-12px)",
      }}>
        {illustration.trimEnd()}
      </Box>}
    </Box>
  );
}
