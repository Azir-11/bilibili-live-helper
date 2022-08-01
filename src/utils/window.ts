/**
 * 返回浏览器窗口可占用的水平宽度
 * @returns {number}
 */
const getAvailWidth = () => window.screen.availWidth;

/**
 * 返回浏览器窗口在屏幕上可占用的垂直空间
 * @returns {number}
 */
const getAvailHeight = () => window.screen.availHeight;

export { getAvailWidth, getAvailHeight };