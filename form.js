var calculateBonus = function (performaceLevel, salary) {
  if (performaceLevel === 'S') {
    return salary * 4;
  }
  if (performaceLevel === 'A') {
    return salary * 3;
  }
  if (performaceLevel === 'B') {
    return salary * 2;
  }
}

calculateBonus('B', 2000);
calculateBonus('S', 3000);

// calculateBonus 函数比较庞大，包含很多 if-else 分支，这些语句需要覆盖所有的逻辑分支
// calculateBonus 函数缺乏弹性，如果增加了一种新的绩效等级 C，或者想把绩效 S 的奖金系数改为5，那必须得深入 calculateBonus 函数的内部实现，违反 开放-封闭原则


// 使用组合函数（把各种算法封装到小函数里面）
var performaceS = function (salary) {
  return salary * 4;
}
var performaceA = function (salary) {
  return salary * 3;
}
var performaceB = function (salary) {
  return salary * 2;
}

var calculateBonus = function (performaceLevel, salary) {
  if (performaceLevel === 'S') {
    return performaceS(salary);
  }
  if (performaceLevel === 'A') {
    return performaceA(salary);
  }
  if (performaceLevel === 'B') {
    return performaceB(salary);
  }
}

calculateBonus('A', 1000);

// 策略模式的目的是将算法的使用与算法的实现分离开来
// 一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。第二个部分是环境类 Context, Context 接受顾客的请求，随后把请求委托给某一个策略类。
var strategies = {
    'S': function(salary) {
        return salary * 4;
    },
    'A': function(salary) {
        return salary * 3;
    },
    'B': function(salary) {
        return salary * 2;
    },
}

var calculateBonus = function(level, salary) {
    return strategies[level](salary);
}

console.log(calculateBonus('S', 5000));

// 通过策略模式重构代码，消除了原程序中大片的条件分支语句，体现了对象的多态性。
// 从定义上看，策略模式就是用来封装算法的。其实使用策略模式也可以用来封装一系列的 "业务规则"


<form action="http://xxx.com/register" id="registerForm" method="post">
    请输入用户名：<input type="text" name="userName" />
    请输入密码：<input type="text" name="password" />
    请输入手机号码：<input type="text" name="phoneNumber" />
    <button>提交</button>
</form>

var registerForm = document.getElementById('registerForm');
registerForm.onsubmit = function() {
    if (registerForm.userName.value === '') {
        console.log('用户名不能为空');
        return false;
    }
    if (registerForm.password.value.length < 6) {
        console.log('密码长度不能少于6位');
        return false;
    }
    if (!/^1[3|5|8][0-9]{9}$/.test(registerForm.phoneNumber.value)) {
        console.log('手机号码格式不正确');
        return false;
    }
}

// 函数比较庞大，缺乏弹性，复用性差

var strategies = {
    isNonEmpty: function(value, errorMsg) { // 不为空
        if (value === '') {
            return errorMsg;
        }
    },
    minLength: function(value, length, errorMsg) { // 限制最小长度
        if (value.length < length) {
            return errorMsg;
        }
    },
    isMobile: function(value, errorMsg) {
        if (!/^1[3|5|8][0-9]{9}$/.test(value)) {
            return errorMsg;
        }
    }
}

// 使用 Validator 类
var validatorFunc = function() {
    var Validator = new Validator();    // 创建一个 validator 对象
    // 添加一些校验规则
    Validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空');
    Validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位');
    Validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确');

    var errorMsg = validator.start();   // 获得校验结果
    return errorMsg;    // 返回校验结果
}
var registerForm = document.getElementById('registerForm');
registerForm.onsubmit = function() {
    var errorMsg = validatorFunc();     // 如果 errorMsg 有确切的返回值，说明未通过校验
    if (errorMsg) {
        console.log(errorMsg);
        return false;   // 阻止表单提交
    }
}

// 实现 Validator 类
var Validator = function() {
    this.cache = [];    // 保存校验规则
}

Validator.prototype.add = function(dom, rule, errorMsg) {
    var ary = rule.split(':');  // 把 strategy 和参数分开
    this.cache.push(function() {    // 把校验的步骤用空函数包起来，并且放入 cache
        var strategy = ary.shift(); // 用户的strategy
        ary.unshift(dom.value); // 把 input 的 value 添加进参数列表
        ary.push(errorMsg);     // 把e rrorMsg 添加进参数列表
        return strategies[strategy].apply(dom, ary);
    })
}

Validator.prototype.start = function() {
    for(var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
        var msg = validatorFunc();      // 开始校验，并取得校验后的返回信息
        if (msg) {      // 如果 errorMsg 有确切的返回值，说明未通过校验
            return msg;
        }
    }
}

// 修改规则只需少量代码
Validator.add(registerForm.password, 'minLength:10', '密码长度不能少于10位');

// => 添加多种校验规则

// 策略模式优缺点
// 优点：1. 策略模式利用组合、委托和多态的思想，可以有效避免多重条件选择语句； 2. 策略模式中的算法封装在独立的strategy中, 易于扩展和复用
// 缺点：1. 会在程序中增加一些策略类和策略对象； 2. 要使用策略模式，必须得了解所有的 strategy。此时 strategy 要向客户暴露它的所有实现，这是违反最少知识原则的。
// 最少知识原则：迪米特法则，低耦合，高内聚。一个类对自己依赖的类知道的越少越好。也就是说，对于被依赖的类来说，无论逻辑多么复杂，都尽量地的将逻辑封装在类的内部，对外除了提供的public方法，不对外泄漏任何信息。
