import { createNoise2D } from 'simplex-noise';
let gen = createNoise2D();
function noise(nx, ny) {
  // Rescale from -1.0:+1.0 to 0.0:1.0
  return gen(nx, ny) / 2 + 0.5;
}

let value = [];   
for (let y = 0; y < height; y++) {
  value[y] = [];
  for (let x = 0; x < width; x++) {      
    let nx = x/width - 0.5, ny = y/height - 0.5;
    value[y][x] = noise(nx, ny);
  }
}