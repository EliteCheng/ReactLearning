import _ from 'lodash'
import React from 'react'
import {Icon} from 'antd'
import './index.css'


export default class Index extends React.Component {

    constructor(props) {
        super(props)
        this.MyIcon = Icon.createFromIconfontCN({
            scriptUrl: '/iconfont.js',
        });
    }

    render() {
        const iconStyle = {
            fontSize: '50px',
            color: 'rgba(0,187,187,1)',
        }
        const IconName = ['accountmultiple', 'account', 'accountbox', 'alert', 'arrowdownboldcircle']
        return (
            <div style={{backgroundColor: '#fff'}}>
                {_.map(IconName, (item) => {
                        const outline = item + 'outline'
                        return <div className="icons-list">
                            <this.MyIcon type={item} style={iconStyle}/>
                            <this.MyIcon type={outline} style={iconStyle}/>
                        </div>
                    }
                )}
            </div>
        )
    }
}
