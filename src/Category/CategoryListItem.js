import React, {Component } from 'react';
import {inject, observer} from "mobx-react";
import {Link} from 'react-router-dom';

import SubMenuList from '../SubMenu/SubMenuList';

@inject('stores')
@observer
class CategoryListItem extends Component {
    render() {
        let {category} = this.props;
        let s = this.props.stores.SubMenuStore;
        let product = `/product/category/${category.id}`;
        return (
            <div>
                <ul onMouseEnter={this.selectSubMenu}>
                    <Link to={product}> {category.name}</Link>
                    {s.items && <SubMenuList items={s.items} categoryId={category.id} />}
                </ul>
            </div>
        );
    }
    selectSubMenu = async ()=> {
        let categoryId = this.props.category.id;
        await this.props.stores.SubMenuStore.getSubItems(categoryId);
    };
}

export default CategoryListItem;