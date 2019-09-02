let a = [1, 2, 3, 6, 6, 7, 8, 9]

for (const item of a) {
    // console.debug(typeof item);//number
    // console.debug(item);
}
//1
//2
//...
for (const i in a) {
    let val = a[i];
    // console.debug(typeof i);//string
}

let iterable = "boo";

for (let value of iterable) {
    console.log(value);
}
// "b"
// "o"
// "o"


let obj = {
    a: 1,
    b: 2,
    c: 3,
};
let map = new Map();
// map.size
// map.set()
// map.get()
// map.has()
// map.keys()
// map.values()
// map.entries()
// map.forEach()

map.set('a', 1);
map.set('b', 2);
map.set('c', 3);
for (let [key, value] of map) {
    console.debug(key, value);
}
console.debug(map);


/**
 无论是for...in还是for...of语句都是迭代一些东西。它们之间的主要区别在于它们的迭代方式。
 for...in 语句以原始插入顺序迭代对象的可枚举属性。
 for...of 语句遍历可迭代对象定义要迭代的数据
 */
