import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

import SubMenuViewList from './SubMenuViewList';
import CategoryViewList from './CategoryViewList';

@inject('stores')
@observer
class Category extends Component {
    render() {
        if(this.props.match && this.props.match.params.command === 'submenu' && this.props.match.params.param){
            return <SubMenuViewList subMenuId={this.props.match.params.param}/>
        }
        else if(this.props.match && this.props.match.params.command === 'category' && this.props.match.params.param){
            return <CategoryViewList categoryId={this.props.match.params.param}/>
        }
        return (
            <div>

            </div>
        );
    }
}

export default Category;