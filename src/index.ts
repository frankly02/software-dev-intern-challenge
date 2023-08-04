/***************************************************************************************
                   !!  DO NOT EDIT THIS TEMPLATE   !!
          !!  CLICK THE FORK OPTION ON THE TOP RIGHT TO CONTINUE !!
/***************************************************************************/

/*************  Frames provided to test out your algorithm   ***************/

import frames1 from "./frames/frames1.json";
import frames2 from "./frames/frames2.json";
import frames3 from "./frames/frames3.json";
import frames4 from "./frames/frames4.json";
import frames5 from "./frames/frames5.json";
import frames6 from "./frames/frames6.json";
import frames7 from "./frames/frames7.json";

/***************************************************************************/

interface Frame {
  // center
  x1: number;
  y1: number;
  // top
  x2: number;
  y2: number;
  // bottom
  x3: number;
  y3: number;
}

// define a helper function dist(x1, y1, x2, y2) that gets the distance between two points
// this will be helpful for finding the angle of the scissors
function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);
}

const calculateOpenings = (frames: Frame[]): number => {
  var openings = 0;

  // Write your algorithm

  // we define a boolean variable 'isOpen' to keep track of whether the scissors are currently open or not
  // we can use this variable to see when the scissors go from open to close, and thus increment 1
  var isOpen: boolean = false;

  // process each frame individually
  for (let i = 0; i < frames.length; i++) {
    // First, find the dimensions of the triangle (we assume the two blades are equal)
    const currentFrame = frames[i];
    const legLength = dist(currentFrame.x1, currentFrame.y1, currentFrame.x2, currentFrame.y2);
    const baseLength = dist(currentFrame.x2, currentFrame.y2, currentFrame.x3, currentFrame.y3);
    // Using the leg length and base length, we can find the angle of the center of the scissor
    const cosLaw = 1 - (baseLength**2)/(2 * legLength**2)
    const angle = Math.acos(cosLaw);

    // Let's define the closing threshold as 0 (completely closed), and the opening threshold
    // as 30 degrees (or PI/6 rad)
    // So to open a closed scissor, the scissor must go beyond 45 degrees, and to
    // close a opened scissor, the scissor must completely close at 0 degrees
    if (isOpen) {
      // close if it has angle = 0
      if (angle == 0) {
        isOpen = false;
        openings += 1;
      }
    } else if (!isOpen) {
      // open if it has angle >= PI/2
      if (angle >= Math.PI/4) {
        isOpen = true;
      }
    }
  }

  console.log(`**** Openings: ${openings} ****`);
  return openings;
};

// Run the following with different frame JSON files
calculateOpenings(frames1);
calculateOpenings(frames2);
calculateOpenings(frames3);
calculateOpenings(frames4);
calculateOpenings(frames5);
calculateOpenings(frames6);
calculateOpenings(frames7);
