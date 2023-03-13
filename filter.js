/**
 *
 * 卷积操作
 * @param {ImageData} origin 原始图像像素
 * @param {number[][]} convolution 3 * 3卷积核
 * @param {ImageData} target 结果
 * @param {number} x 卷积像素
 * @param {number} y 卷积像素
 */
function filterPixel(origin, convolution, x, y) {
  const { data, width, height } = origin;
  const res = [0, 0, 0, 0];
  // 卷积核 边缘
  if (x < 1 || y < 1 || x > width - 2 || y > height - 2) {
    return res;
  }
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const idx = ((i + y) * width + j + x) << 2;
      const weight = convolution[i + 1][j + 1];
      res[0] += data[idx] * weight;
      res[1] += data[idx + 1] * weight;
      res[2] += data[idx + 2] * weight;
      res[3] += data[idx + 2] * weight;
    }
  }
  return res;
}

/**
 * 卷积
 * @param ImageData origin
 * @param ImageData target
 * @param number[][] convolution
 */
function filter(origin, target, convolution) {
  const { width, height } = origin;
  let allWeight = 0;

  for (let i = 1; i < height - 1; i++) {
    for (let j = 1; j < width - 1; j++) {
      filterPixel(origin, target, convolution, j, i);
    }
  }
}
