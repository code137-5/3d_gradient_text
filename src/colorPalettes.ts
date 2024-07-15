import p5 from "p5";

type Palette = {
  lesbian: p5.Color[];
  gay: p5.Color[];
  bisexual: p5.Color[];
  transgender: p5.Color[];
  nonbinary: p5.Color[];
  asexual: p5.Color[];
  intersex: p5.Color[];
  queer: p5.Color[];
  genderfluid: p5.Color[];
};

export const colorPalettes = (p: p5): Palette => ({
  lesbian: [
    p.color(213, 45, 0), // Dark Orange
    p.color(255, 154, 86), // Orange
    p.color(255, 223, 0), // Light Orange
    p.color(255, 255, 255), // White
    p.color(211, 98, 164), // Pink
    p.color(163, 2, 98), // Dark Pink
  ],
  gay: [
    p.color(0, 0, 255), // Blue
    p.color(0, 255, 0), // Green
    p.color(255, 255, 0), // Yellow
    p.color(255, 165, 0), // Orange
    p.color(255, 0, 0), // Red
    p.color(75, 0, 130), // Indigo
  ],
  bisexual: [
    p.color(214, 2, 112), // Pink
    p.color(155, 79, 150), // Purple
    p.color(0, 56, 168), // Blue
  ],
  transgender: [
    p.color(91, 206, 250), // Light Blue
    p.color(245, 169, 184), // Pink
    p.color(255, 255, 255), // White
  ],
  nonbinary: [
    p.color(255, 244, 48), // Yellow
    p.color(255, 255, 255), // White
    p.color(156, 89, 209), // Purple
    p.color(0, 0, 0), // Black
  ],
  asexual: [
    p.color(0, 0, 0), // Black
    p.color(163, 163, 163), // Gray
    p.color(255, 255, 255), // White
    p.color(128, 0, 128), // Purple
  ],
  intersex: [
    p.color(255, 255, 0), // Yellow
    p.color(121, 0, 127), // Purple
  ],
  queer: [
    p.color(255, 0, 98), // Pink
    p.color(0, 149, 255), // Blue
    p.color(0, 255, 98), // Green
  ],
  genderfluid: [
    p.color(255, 0, 98), // Pink
    p.color(255, 255, 255), // White
    p.color(128, 0, 128), // Purple
    p.color(0, 0, 0), // Black
    p.color(0, 149, 255), // Blue
  ],
});
