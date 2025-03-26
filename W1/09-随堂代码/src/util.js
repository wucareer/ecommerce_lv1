/**
 * 创建DOM元素的辅助函数
 * @param {Object} options - 元素配置选项
 * @param {string} options.tag - 元素标签名，默认为'div'
 * @param {string} options.className - 元素的类名
 * @param {string} options.text - 元素的文本内容
 * @param {Array} options.children - 子元素列表
 * @param {Object} options.attrs - 元素属性键值对
 * @param {Object} options.events - 元素事件处理函数键值对
 * @returns {HTMLElement} 创建的DOM元素
 */
export function createElement(options) {
    const {
        tag = 'div',
        className = '',
        text = '',
        children = [],
        attrs = {},
        events = {},
    } = options;

    const element = document.createElement(tag);
    
    // 添加类名
    if (className) {
        element.className = className;
    }
    
    // 添加文本
    if (text) {
        element.textContent = text;
    }
    
    // 添加属性
    Object.entries(attrs).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    
    // 添加事件
    Object.entries(events).forEach(([event, handler]) => {
        element.addEventListener(event, handler);
    });
    
    // 添加子元素
    children.forEach(child => {
        element.appendChild(child);
    });
    
    return element;
} 