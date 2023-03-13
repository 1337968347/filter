(function () {
  /** @type {HTMLCanvasElement}} */
  const canvasEl = document.querySelector('#laplacian');
  const ctx = canvasEl.getContext('2d');

  // 拉普拉斯卷积核
  const laplacian = [
    [0, 1, 0],
    [1, -4, 1],
    [0, 1, 0]
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
        const [r, g, b] = filterPixel(origin, laplacian, j + 1, i + 1);
        const idx = (i * width + j) << 2;
        target.data[idx] = r;
        target.data[idx + 1] = g;
        target.data[idx + 2] = b;
        target.data[idx + 3] = 255;
      }
    }

    ctx.putImageData(target, 0, 0);
  };
})();
