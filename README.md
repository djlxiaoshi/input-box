# input-box

这是一个密码输入框，仿造微信6位数

## usage

```javascript
    var inputBox = require('input-box');
    var el = document.getElementById('wrap');
    inputBox(el, {length: 5}, function (value){
      // to do
    })
```

## 配置说明
```
{
  length: 密码长度 || 默认6位,
  type: 输入文本类型 || 默认password
}
```

