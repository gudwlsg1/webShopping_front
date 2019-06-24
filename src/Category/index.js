import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

import CategoryList from './CategoryList';

@inject('stores')
@observer
class Category extends Component {
    componentDidMount() {
        this.props.stores.CategoryStore.fetchItems();
    }

    render() {
        let c = this.props.stores.CategoryStore;
        return (
            <div>
                {c.items && <CategoryList items={c.items}/> }
            </div>
        );
    }
}

export default Category;