const sizeOptionsList = document.querySelector('.canvas_sizes');
const field = document.getElementById('canvas');
const fieldSize = 512; 
const ctx = field.getContext("2d");
const urls = {
  'small': '/data/4x4.json',
  'medium': '/data/32x32.json',
  'pic': './data/image.png'
};

let fetchedUrl = '';

const setUrl = (el) => {
  return fetchedUrl = urls[el]
}

async function fetchColorsMatrix(func) {
  fetch(fetchedUrl).then(response => response.json()).then(data =>  func(data));
}

const drawHexColorMatrix = (array) => {
  const part = fieldSize / array.length;
  array.map((row, rowIndex) => row.map((ceil, ceilIndex) => {
    ctx.fillStyle = `#${ceil}`;
    ctx.fillRect(ceilIndex * part, rowIndex * part, (ceilIndex + 1) * part, (rowIndex + 1) * part);
  } ))
}

const drawRgbaColorMatrix = (array) => {
  const part = fieldSize / array.length;
  array.map((row, rowIndex) => row.map((ceil, ceilIndex) => {
    ctx.fillStyle = `rgba(${ceil.toString()})`;
    ctx.fillRect(ceilIndex * part, rowIndex * part, (ceilIndex + 1) * part, (rowIndex + 1) * part);
  } ))
}

const drawPicture = () => {
  let img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0, 512, 512)
  };
  img.src = fetchedUrl;
}

document.addEventListener('DOMContentLoaded', () => 
  sizeOptionsList.addEventListener('click', (e) => {
    const item = e.target.dataset.item;
    setUrl(item);
    switch(item) {
      case 'small':
        fetchColorsMatrix(drawHexColorMatrix);
        return;
      case 'medium':
        fetchColorsMatrix(drawRgbaColorMatrix);
        return;
      case 'pic':
        drawPicture();
        return;
    }
  })
)

