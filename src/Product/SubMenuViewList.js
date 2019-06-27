import React, {Component} from 'react'
import {inject, observer} from "mobx-react";

import SubMenuItem from './SubMenuItem';

@inject('stores')
@observer
class SubMenuViewList extends Component {
    componentDidMount() {
        this.props.stores.ProductStore.fetchItems(this.props.subMenuId);
    }

    render() {
        return(
            <div>
                {this.props.stores.ProductStore.subMenuItems &&
                this.props.stores.ProductStore.subMenuItems.map(item => <SubMenuItem key={item.id} product={item} />)}
            </div>
        );
    }
}

export default SubMenuViewList;