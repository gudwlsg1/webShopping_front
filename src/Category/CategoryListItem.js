import React, {Component } from 'react';
import {inject, observer} from "mobx-react";

import SubMenuList from '../SubMenu/SubMenuList';

@inject('stores')
@observer
class CategoryListItem extends Component {
    render() {
        let {category} = this.props;
        let s = this.props.stores.SubMenuStore;
        return (
            <div>
                <li onMouseOver={this.selectSubMenu} onMouseOut={this.clearSubMenu}>{category.name}
                    <div>{s.items && <SubMenuList items={s.items} />}</div>
                </li>

            </div>
        );
    }
    selectSubMenu = async ()=> {
        let categoryId = this.props.category.id;

        console.log();

        if(await this.props.stores.SubMenuStore.getSubItems(categoryId)){
            console.log(this.props.stores.SubMenuStore.items);
        }
    }

    clearSubMenu = ()=> {
        this.props.stores.SubMenuStore.items = null;
    }
};

export default CategoryListItem;