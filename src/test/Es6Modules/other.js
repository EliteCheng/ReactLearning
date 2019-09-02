import {aaa} from './index'

aaa.a = 'change aaa';
console.debug('aaa:', aaa);


let o = {
    get foo() {

    },
    set foo(x) {

    }
}