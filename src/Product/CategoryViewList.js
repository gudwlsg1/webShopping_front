import React, {Component} from 'react'
import {inject, observer} from "mobx-react";

import CategoryItem from "./CategoryItem";

@inject('stores')
@observer
class CategoryViewList extends Component {
    componentDidMount() {
        this.props.stores.ProductStore.fetchCategoryItems(this.props.categoryId);
    }

    render() {
        return(
            <div>
                {this.props.stores.ProductStore.categoryItems &&
                this.props.stores.ProductStore.categoryItems.map(item => <CategoryItem key={item.id} product={item} />)}
            </div>
        );
    }
}

export default CategoryViewList;