import React from 'react'
import './index.css'
import $ from 'jquery'

class MyFormData extends FormData {

    //为Dragfiles添加一个清空所有文件的方法
    deleteAll() {
        let _this = this;
        this.forEach(function (value, key) {
            _this.delete(key);
        })
    }
}

class Dragfiles {
    static instance = null;

    constructor() {
        //利用html5 FormData() API,创建一个接收文件的对象，因为可以多次拖拽，这里采用单例模式创建对象Dragfiles
        if (!Dragfiles.instance) {
            Dragfiles.instance = new MyFormData();
        }
        return Dragfiles.instance;
    }
}

export default class MultiPartUploadFile extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._init()
    }

    _init() {
        //用DOM2级方法为右上角的叉号和黑色遮罩层添加事件：点击后关闭上传框
        document.getElementsByClassName('overlay')[0]
            .addEventListener('click', this.closeModal, false);
        document.getElementById('close')
            .addEventListener('click', this.closeModal, false);
        //添加拖拽事件
        let dz = document.getElementById('content');
        dz.ondragover = function (ev) {
            //阻止浏览器默认打开文件的操作
            ev.preventDefault();
            //拖入文件后边框颜色变红
            this.style.borderColor = 'red';
        }
        dz.ondragleave = function () {
            //恢复边框颜色
            this.style.borderColor = 'gray';
        }
        dz.ondrop = function (ev) {
            //恢复边框颜色
            this.style.borderColor = 'gray';
            //阻止浏览器默认打开文件的操作
            ev.preventDefault();
            let files = ev.dataTransfer.files;
            let len = files.length;
            let fragment = document.createDocumentFragment();
            let newFormData = new Dragfiles(); //获取单例
            // let it = newFormData.entries(); //创建一个迭代器，测试用
            for (let i = 0; i < len; i++) {
                let tr, time, size;
                tr = document.createElement('tr');
                //获取文件大小
                size = Math.round(files[i].size * 100 / 1024) / 100 + 'KB';
                //获取格式化的修改时间
                time = files[i].lastModifiedDate.toLocaleDateString() + ' ' + files[i].lastModifiedDate.toTimeString().split(' ')[0];
                tr.innerHTML = '<td>' + files[i].name + '</td><td>' + time + '</td><td>' + size + '</td><td>删除</td>';
                console.log(size + ' ' + time);
                fragment.appendChild(tr);
                //添加文件到newForm
                newFormData.append(files[i].name, files[i]);
                // console.log(it.next());
            }
            this.childNodes[0].childNodes[0].appendChild(fragment)
        }
    }

    render() {
        const clearAllStyle = {
            position: 'absolute',
            bottom: '10px',
            right: '30px',
        }

        const closeStyle = {
            cursor: 'pointer',
            float: 'right',
            width: '20px'
        }

        return <div style={{width: '100vw', height: '100vh'}}>
            <div className="overlay"/>
            <div id="modal" className="dropbox">
                <div className="items-container">
                    <div id="close" style={closeStyle}>
                        <span className="css-close"/>
                    </div>
                    <div>
                        <p className="head"><b>拖拽文件至此</b></p>
                        <div className="content" id="content">
                            <table className="table">
                                <tbody className="tbody"/>
                            </table>
                        </div>
                        <div className="footer">
                            <button className="btn" onClick={this.upload.bind(this)}>
                                开始上传
                            </button>
                        </div>
                        <a href='#' onClick={this.clearAll.bind(this)} style={clearAllStyle}>
                            清空所有
                        </a>
                    </div>
                </div>
            </div>
        </div>
    }

    upload() {
        if (document.getElementsByTagName('tbody')[0].hasChildNodes() === false) {
            document.getElementById('content').style.borderColor = 'red';
            setTimeout(this.blink, 200);
            return false;
        }
        let data = new Dragfiles(); //获取formData
        console.debug(data);
        $.ajax({
            url: 'upload',
            type: 'POST',
            data: data,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            success: (data) => {
                this.closeModal();
                data.deleteAll(); //清空formData
                $('.tbody').empty(); //清空列表
            },
            error: (returndata) => {

            }
        });
    }

    blink() {
        document.getElementById('content').style.borderColor = 'gray';
    }

    clearAll() {
        if (document.getElementsByTagName('tbody')[0].hasChildNodes() === false) {
            document.getElementById('content').style.borderColor = 'red';
            setTimeout(this.blink, 300);
            return false;
        }
        let data = Dragfiles();
        data.deleteAll(); //清空formData
        //$('.tbody').empty(); 等同于以下方法
        document.getElementsByTagName('tbody')[0].innerHTML = '';
    }

    showModal() {  //打开上传框
        let modal = document.getElementById('modal');
        let overlay = document.getElementsByClassName('overlay')[0];
        overlay.style.display = 'block';
        modal.style.display = 'block';
    }

    closeModal() {  //关闭上传框
        let modal = document.getElementById('modal');
        let overlay = document.getElementsByClassName('overlay')[0];
        overlay.style.display = 'none';
        modal.style.display = 'none';
    }
}