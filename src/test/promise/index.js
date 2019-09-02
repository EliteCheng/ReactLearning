let p = new Promise((resolve, reject) => {
    resolve();
});
//方式1：通过自定义异常终止
p.then(() => {
    console.log("resolve1");
    throw new Error("自定义异常")
})
    .then(() => {
        console.log("resolve2")
    })
    .then(() => {
        console.log("resolve3")
    })
    .catch(err => {
        console.log(err);
        return new Promise((resolve, reject) => {
            reject()
        })
    })
    .then(() => {
        console.log('resolve4')
    }, () => {
    })
    .then(() => {
        console.log('resolve5')
    })

//输出resolve1和自定义异常

//方式2：通过修改resolve回调的返回值
p.then(() => {
    console.log("resolve1");
    return new Promise(() => {
    })
})
    .then(() => {
        console.log("resolve2")
    })
    .then(() => {
        console.log("resolve3")
    })
    .catch(err => {
        console.log(err);
    })

