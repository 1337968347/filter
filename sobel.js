(function () {
  /** @type {HTMLCanvasElement}} */
  const canvasEl = document.querySelector('#sobel');
  const ctx = canvasEl.getContext('2d');

  // 水平导数卷积核
  const sobelHorizontal = [
    [1, 0, -1],
    [2, 0, -2],
    [1, 0, -1]
  ];

  // 竖直方向卷积核
  const sobelVertical = [
    [1, 2, 1],
    [0, 0, 0],
    [-1, -2, -1]
  ];

  const image = new Image();
  image.src = './origin.jpg';
  image.onload = () => {
    canvasEl.width = image.width;
    canvasEl.height = image.height;
    ctx.drawImage(image, 0, 0);
    const origin = ctx.getImageData(0, 0, image.width, image.height);
    const target = ctx.createImageData(image.width, image.height);

    const { width, height } = origin;

    for (let i = 1; i < height - 1; i++) {
      for (let j = 1; j < width - 1; j++) {
        const [r, g, b, a] = filterPixel(origin, sobelHorizontal, j + 1, i + 1);
        const idx = (i * width + j) << 2;
        target.data[idx] = r;
        target.data[idx + 1] = g;
        target.data[idx + 2] = b;
        target.data[idx + 3] = a;
      }
    }

    for (let i = 1; i < height - 1; i++) {
      for (let j = 1; j < width - 1; j++) {
        const [r, g, b] = filterPixel(origin, sobelVertical, j + 1, i + 1);
        const idx = (i * width + j) << 2;
        target.data[idx] = Math.sqrt(
          r * r + target.data[idx] * target.data[idx]
        );
        target.data[idx + 1] = Math.sqrt(
          g * g + target.data[idx + 1] * target.data[idx + 1]
        );
        target.data[idx + 2] = Math.sqrt(
          b * b + target.data[idx + 2] * target.data[idx + 2]
        );
        target.data[idx + 3] = 255;
      }
    }

    ctx.putImageData(target, 0, 0);
  };
})();
