'use strict';

import React from "react";
import  ReactDOM  from "react-dom";
import './search.less'
import logo from './images/logo.png'
import '../../common/index'
import {a} from './tree-shaking'

class Search extends React.Component {
    render() {
        const aStr = a()
        return <div className="search-text">
            {aStr}
            <img src={logo}></img>
             Search Text搜索s</div>
    }
}

ReactDOM.render(
    <Search></Search>,
    document.getElementById('root')
);