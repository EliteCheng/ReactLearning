import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

// import './test/testGenerator'
// import MultiPartUploadFile from './test/MultiPartUploadFile'
import App from './test/IconTest/index'
// import App from './test/propsNotChange'

// import {aaa} from './test/Es6Modules'
// import './test/Es6Modules/other'
// console.debug('index:aaa:', aaa);


import './test/testES6'


ReactDOM.render(<App/>, document.getElementById('root'));
serviceWorker.unregister();
