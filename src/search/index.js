'use strict';

import React from "react";
import  ReactDOM  from "react-dom";
import './search.less'
import logo from './images/logo.png'
import '../../common/index'

class Search extends React.Component {
    render() {
        return <div className="search-text">
            <img src={logo}></img>
             Search Text搜索s</div>
    }
}

ReactDOM.render(
    <Search></Search>,
    document.getElementById('root')
);