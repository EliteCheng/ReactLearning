/**
 * 实验表明，无论import 多少次aaa，
 * 函数只会执行一次，也就是只在第一次import的时候执行一次。
 * 那么就会出现一个问题，如果多个地方import进来都是同一个aaa对象，
 * 如果其中一个文件对aaa.a = 'change aaa'
 * 其他文件的所有aaa.a都会被修改了。因为他们都是拿的同一个aaa引用。
 */

export let aaa = (function () {
    console.debug('aaaaaa');
    return {
        a: 'aaa',
    }
})()

export let bbb = (function () {
    console.debug('bbbbbb');
    return 'bbb'
})()


