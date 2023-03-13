(function () {
  /** @type {HTMLCanvasElement}} */
  const canvasOriginEl = document.querySelector('#origin');
  const ctx = canvasOriginEl.getContext('2d');

  const image = new Image();
  image.src = './origin.jpg';
  image.onload = () => {
    canvasOriginEl.width = image.width;
    canvasOriginEl.height = image.height;
    ctx.drawImage(image, 0, 0);
  };
})();
