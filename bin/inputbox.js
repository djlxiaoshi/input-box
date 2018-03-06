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
    styles: {
      radius: 0
    }
  };
  
  // 宿主元素
  var _hostEle;
  // 所有配置
  var _finalConfig;
  
  function getConfig(defaultCofig, customConfig) {
    return extend(true, defaultCofig, customConfig);
  }
  
  function InputBox(el, config) {
    // 避免污染默认配置
    _finalConfig = getConfig(_defaultCofig, config);
    
    var el = _hostEle = getHostEle(el);
    if (!el) {
      console.error('宿主元素获取失败!');
      return;
    }
  
    var wrap = createWrap(),
      input = createHiddenInputEle(),
      ul = createInputEle();
    
    wrap.appendChild(input);
    wrap.appendChild(ul);
    el.appendChild(wrap);
    
    input.addEventListener('input', function (e) {
      var value = e.target.value,
        len = value.length;
      for (var i = 0; i < _finalConfig.length; i++) {
        if (i <= len) {
          ul.children[i].value = e.target.value.slice(i, i + 1);
        } else if (i > len) {
          ul.children[i].value = '';
        }
      }
      
      if (typeof _finalConfig['onChange'] === 'function') {
        _finalConfig['onChange'](value);
      }
      
      if (len === _finalConfig.length && typeof _finalConfig['onCompleted'] === 'function') {
        _finalConfig['onCompleted'](value);
      }
    });
    
    ul.addEventListener('click', function () {
      input.focus();
    });
  }
  
  function getHostEle(el) {
    if (typeof el === 'string') {
      return document.querySelector(el);
    }
    if (isDom(el)) return el;
  }
  
  function createWrap() {
    var wrap = document.createElement('div'),
      height = Math.floor(_hostEle.clientWidth / _finalConfig.length) + 'px',
      wrapStyle = wrap.style;
    wrapStyle.position = 'relative';
    wrapStyle.width = '100%';
    wrapStyle.height = height;
    return wrap;
  }
  
  function createHiddenInputEle() {
    var inputEle = document.createElement('input'),
      styles = inputEle.style;
    
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
    
    var allWidth = _hostEle.clientWidth || _finalConfig.width,
      height = Math.floor(allWidth / _finalConfig.length) + 'px',
      width = Math.floor(allWidth / _finalConfig.length) + 'px',
      div = document.createElement('div'),
      len = _finalConfig.length,
      radiusValue = _finalConfig.styles['radius'];
    
    div.style.display = 'flex';
    div.style.position = 'absolute';
    div.style.top = 0;
    div.style.left = 0;
    
    if (len <= 0) console.warn('您配置的length值可能有误');
    
    for (var i = 0; i < len; i++) {
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
      if (i === 0) {
        inputStyle.borderLeft = '1px solid #e5e5e5';
        inputStyle.borderTopLeftRadius = radiusValue;
        inputStyle.borderBottomLeftRadius = radiusValue;
      }
      if (i === len - 1) {
        inputStyle.borderTopRightRadius = radiusValue;
        inputStyle.borderBottomRightRadius = radiusValue;
      }
      div.appendChild(input);
    }
    
    return div;
  }
  
  function valueHandler(value) {
    var result;
    if (result = /\%$/.test(value)) {
      return value;
    } else if (result = /(px)$/.exec(value)) {
      return value.slice(0, result.index);
    } else if (value === +value) {
      return value;
    }
  }
  
  function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
  }
  
  function isDom(obj) {
    return typeof HTMLElement === 'object'?
      obj instanceof HTMLElement :
      obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
  }
  
  function extend() {
    var target = arguments[0] || {},
        deep = false,
        length = arguments.length,
        i = 1,
        options;
    if (typeof arguments[0] === 'boolean') {
      deep = arguments[0];
      target = arguments[1] || {};
      i = 2;
    }
    
    for (; i < length; i++) {
      options = arguments[i];
      if (deep) {
        for (var key in options) {
          if (isObject(options[key])) {
            target[key] = target[key] || {};
            extend(deep, target[key], options[key]);
          } else {
            target[key] = options[key];
          }
        }
      } else {
        Object.assign(target, options);
      }
    }
  
    return target;
  }
})(this);



