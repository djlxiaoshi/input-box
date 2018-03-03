/**
 * @Author JohnLi
 * @Date 2018/2/28 17:44
 */

;(function (root) {
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = {
        inputBox: InputBox
      };
    }
    exports.inputBox = InputBox;
  } else {
    root.inputBox = InputBox;
  }
  
  var _defaultCofig = {
    length: 6,
    type: 'passwoed',
    width: 100
  };
  
  // 宿主元素
  var _hostEle;
  // 所有配置
  var _finalConfig;
  
  function getConfig(defaultCofig, customConfig) {
    return Object.assign({}, defaultCofig, customConfig);
  }
  
  function InputBox(el, config, callback) {
    // 避免污染默认配置
    _finalConfig = getConfig(_defaultCofig, config);
    var el = _hostEle = getHostEle(el);
    var wrap = createWrap();
    var input = createHiddenInputEle();
    var ul = createInputEle();
    
    wrap.appendChild(input);
    wrap.appendChild(ul);
    el.appendChild(wrap);
    
    input.addEventListener('input', function (e) {
      var value = e.target.value;
      var len = value.length;
      for (var i = 0; i < _finalConfig.length; i++) {
        if (i <= len) {
          ul.children[i].value = e.target.value.slice(i, i + 1);
        } else if (i > len) {
          ul.children[i].value = '';
        }
      }
      
      if (len === _finalConfig.length) {
        callback(value);
      }
    });
    
    ul.addEventListener('click', function () {
      input.focus();
    })
  }
  
  function isDom(obj) {
    return typeof HTMLElement === 'object'?
       obj instanceof HTMLElement :
       obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
  }
  
  function getHostEle(el) {
    if (typeof el === 'string') {
      return document.querySelector(el);
    }
    if (isDom(el)) return el;
  }
  
  function createWrap() {
    var wrap = document.createElement('div');
    var height = Math.floor(_hostEle.clientWidth / _finalConfig.length) + 'px';
    var wrapStyle = wrap.style;
    wrapStyle.position = 'relative';
    wrapStyle.width = '100%';
    wrapStyle.height = height;
    return wrap;
  }
  
  function createHiddenInputEle() {
    var inputEle = document.createElement('input');
    var styles = inputEle.style;
    
    inputEle.type = _finalConfig.type;
    inputEle.maxLength = _finalConfig.length;
    // 样式
    styles.opacity = 0;
    styles.height = 0;
    styles.width = 0;
    styles.padding = 0;
    styles.margin = 0;
    styles.border = 'none';
    styles.outline = 'none';
    return inputEle;
  }
  
  function createInputEle() {
    
    var allWidth = _hostEle.clientWidth || _finalConfig.width;
    var height = Math.floor(allWidth / _finalConfig.length) + 'px';
    var width = Math.floor(allWidth / _finalConfig.length) + 'px';
    var div = document.createElement('div');
    
    div.style.display = 'flex';
    div.style.position = 'absolute';
    div.style.top = 0;
    div.style.left = 0;
    
    for (var i = 0; i < _finalConfig.length; i++) {
      var input = document.createElement('input');
      var inputStyle = input.style;
      
      input.type = _finalConfig.type;
      inputStyle.width = width;
      inputStyle.boxSizing = 'border-box';
      inputStyle.height = height;
      inputStyle.border = '1px solid #e5e5e5';
      inputStyle.borderLeft = 'none';
      inputStyle.textAlign = 'center';
      inputStyle.outline = 'none';
      input.readOnly = true;
      if (i === 0) inputStyle.borderLeft = '1px solid #e5e5e5';
      div.appendChild(input);
    }
    
    return div;
  }
})(this);



