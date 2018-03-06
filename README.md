# input-box

这是一个密码输入框，仿造微信6位数

## 用法说明

```javascript
    var inputBox = require('input-box');
    var el = document.getElementById('wrap');
    inputBox(el, {
      length: 5,
      onChange: function(value) {},
      onCompleted: function(value) {}
    })
```

## 配置说明
```
{
  length: 6, // 密码长度,默认6位
  type: 'password', // 输入文本类型
  styles: {
    raduis: 0  // 圆角 (可能值'3px' | '30%')
  },
  onChange: function(value) {},  // 输入变化时触发事件
  onCompleted: function(value) {} // 输入完成后触发事件
}
```

