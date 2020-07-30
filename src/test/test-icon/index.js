import _ from 'lodash'
import React from 'react'
import {Icon} from 'antd'
import './index.css'

const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: '/iconfont.js',
})
export default function Index() {
    const iconStyle = {
        fontSize: '50px',
        color: 'rgba(0,187,187,1)',
    }
    const IconName = ['accountmultiple', 'account', 'accountbox', 'alert', 'arrowdownboldcircle']
    return <div style={{backgroundColor: '#fff'}}>
        {_.map(IconName, (item) => {
                const outline = item + 'outline'
                return <div className="icons-list" key={item}>
                    <MyIcon type={item} style={iconStyle}/>
                    <MyIcon type={outline} style={iconStyle}/>
                </div>
            }
        )}
    </div>
}

