'use strict';

import React from "react";
import  ReactDOM  from "react-dom";
import './search.less'
import logo from './images/logo.png'
import '../../common/index'
import {a} from './tree-shaking'

class Search extends React.Component {
    constructor(){
        super(...arguments)

        this.state = {
            Text :null
        }
    }

    loadCompentent() {
        import('./text.js').then((text)=> {
            this.setState(
                {
                    Text: Text.default
                }
            )
        })
    }
    render() {
        const aStr = a()
        const {Text} = this.state
        return <div className="search-text">
            {aStr}
            {
                Text?<Text></Text>: null
            }
            <img src={logo} onClick={this.loadCompentent}></img>
             Search Text搜索s</div>
    }
}

ReactDOM.render(
    <Search></Search>,
    document.getElementById('root')
);