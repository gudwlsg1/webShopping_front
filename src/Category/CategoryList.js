import React from 'react';
import {Link} from "react-router-dom";
import CategoryListItem from "./CategoryListItem";
import './CategoryList.css';

const CategoryList = (props)=> {
    return (
        <div className='category-list'>
            {props.items.map(item => <CategoryListItem key={item.id} category={item}/>)}
        </div>
    );


};

export default CategoryList;