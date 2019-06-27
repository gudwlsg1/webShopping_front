import React from 'react';
import {Link} from "react-router-dom";
import SubMenuListItem from "./SubMenuListItem";
import './SubMenuList.css';

const SubMenuList = (props)=> {
    return (
        <div className='subMenu-list'>
                {props.items.map(item => item.categoryId === props.categoryId && <SubMenuListItem key={item.id} subMenu={item}/>)}
        </div>
    );


};

export default SubMenuList;