function testAsyncAwait() {

    asyncFun()

    async function asyncFun() {
        const res1 = await new Promise(resolve => {
            console.debug('first promise');
            setTimeout(function () {
                resolve.call(null, 'args1', 'args11')
            }, 200)
        }).then((a, b) => {
            console.debug(a, b);
            return [a, b]
        })
        console.debug('yield1', res1);

        const res2 = await new Promise(resolve => {
            console.debug('second promise');
            setTimeout(function () {
                resolve('args2')
            }, 200)
        })
        console.debug('yield2:', res2);
    }


}

function testGenerator() {
    run(function* () {
        const res1 = yield new Promise((resolve => {
            console.debug('testGenerator', 'first promise');
            setTimeout(function () {
                resolve('args1')
            }, 200)
        }));
        console.debug('testGenerator', 'yield1', res1);
        const res2 = yield new Promise(resolve => {
            console.debug('testGenerator', 'second promise');
            setTimeout(function () {
                resolve('args2')
            }, 200)
        })
        console.debug('testGenerator', 'yield2:', res2);
    })
}

function run(gen) {
    const g = gen();

    function next(data) {
        const res = g.next(data)
        //表示迭代器是最后一个值
        if (res.done) return res.value;
        //res.value是一个promise对象
        res.value.then((data) => {
            next(data)
        })
    }

    next()
}

testGenerator()
testAsyncAwait()


