import { small } from './data/small.js';
import { medium } from './data/medium.js';

const fieldSize = 512; 

document.addEventListener('DOMContentLoaded', () => {
  const sizeOptionsList = document.querySelector('.canvas_sizes');
  const field = document.getElementById('canvas');
  const ctx = field.getContext("2d");
  sizeOptionsList.addEventListener('click', e => {
    const item = e.target.dataset.item;
    const drawCanvasContext = item => {
      if ( item === 'image') {
        drawPicture(item);
      } else {
        item === '4' ? mappedColors(small) : mappedColors(medium);
      }
    }
    const mappedColors = array => {
      const part = fieldSize / array.length;
      array.map((row, rowIndex) => row.map((ceil, ceilIndex) => {
        ctx.fillStyle = array === small ? `#${ceil}` : `rgba(${ceil.toString()})`;
        ctx.fillRect(ceilIndex * part, rowIndex * part, (ceilIndex + 1) * part, (rowIndex + 1) * part);
      })) 
    }
    const drawPicture = item => {
      let img = new Image();
      img.onload = function() {
        ctx.drawImage(img, 0, 0, 512, 512)
      };
      img.src = `./data/${item}.png`;
    }
    drawCanvasContext(item);
  })
})

