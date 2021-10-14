<!--
 * @Author: your name
 * @Date: 2021-02-25 19:31:25
 * @LastEditTime: 2021-10-12 17:20:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learningNotes\frontInterviewProblem\es特性.md
-->
#### ES6的解构赋值
```
const {a:a1,b,c,d,e} = obj || {};
console.log(a1); // 1
```
#### ES6的扩展运算符
```
const a = [1,2,3];
const b = [1,5,6];
const c = [...new Set([...a,...b])];//[1,2,3,5,6]

const obj1 = {
  a:1,
}
const obj2 = {
  b:1,
}
const obj = {...obj1,...obj2};//{a:1,b:1}
```
#### 拼接字符串
```
// 在${}中可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性。
const name = '小明';
const score = 59;
const result = `${name}${score > 60?'的考试成绩及格':'的考试成绩不及格'}`;
```
#### ES6中数组实例方法includes
```
const condition = [1,2,3,4];
if( condition.includes(type) ){
   //...
}
```
#### 扁平化数组
```
const deps = {
    '采购部':[1,2,3],
    '人事部':[5,8,12],
    '行政部':[5,14,79],
    '运输部':[3,64,105],
}
let member = Object.values(deps).flat(Infinity);
// 其中使用Infinity作为flat的参数，使得无需知道被扁平化的数组的维度。
```
#### ES6中的可选链操作符
```
const name = obj?.name;
```
#### 对象属性名是可以用表达式
```
let obj = {};
let index = 1;
obj[`topic${index}`] = '话题内容';
```
#### 空值合并运算符
```
value !== null && value !== undefined && value !== ''
// 等价
value??'' !== ''
```