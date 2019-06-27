import React, {Component} from 'react'
import {inject, observer} from "mobx-react";

@inject('stores')
@observer
class ProductView extends Component {
    componentDidMount() {
        //this.props.stores.ProductStore.fetchItems(this.props.subMenuId);
    }

    render() {

        return(
            <div>

            </div>
        );
    }
}

export default ProductView;