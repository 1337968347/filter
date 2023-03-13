(function () {
  /** @type {HTMLCanvasElement}} */
  const canvasEl = document.querySelector('#gaussianFilter');
  const ctx = canvasEl.getContext('2d');

  // 高斯卷积核
  const gaussianConvolution = [
    [1, 2, 1],
    [2, 4, 2],
    [1, 2, 1]
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
        const [r, g, b] = filterPixel(
          origin,
          gaussianConvolution,
          j + 1,
          i + 1
        );
        const idx = (i * width + j) << 2;
        target.data[idx] = r / 16;
        target.data[idx + 1] = g / 16;
        target.data[idx + 2] = b / 16;
        target.data[idx + 3] = 255;
      }
    }

    ctx.putImageData(target, 0, 0);
  };
})();
