class Node {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

class LRU {
    constructor(size) {
        this.dataMap = {}
        this.cacheList = []
        this.size = size
    }

    put(key, value) {
        this.dataMap[key] = value;
        if (this.cacheList.indexOf(key.toString()) >= 0) {
            this._updateCacheList(key)
        } else {
            if (this.cacheList.length >= this.size) {
                this.cacheList.pop();
                delete this.dataMap[key];
            }
            else {
                this.cacheList.push(key);
            }
        }
    }

    get(key) {
        if (key in this.dataMap) {
            this._updateCacheList(key)
            return this.dataMap[key]
        } else {
            return -1
        }
    }

    _updateCacheList(key) {
        let index = this.cacheList.indexOf(key.toString());
        this.cacheList.splice(index, 1);
        this.cacheList.unshift(key.toString());
    }
}

