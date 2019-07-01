import {observable, action} from "mobx";
import axios from "axios";

class ProductStore{
    static __instance = null;

    static getinstance(){
        if(ProductStore.__instance === null){
            ProductStore.__instance = new ProductStore();
        }
        return ProductStore.__instance;
    }

    constructor(){
        ProductStore.__instance = this;
    }

    @observable categoryItems = null;
    @action fetchCategoryItems = async (categoryId) => {
        try{
            this.categoryItems = null;
            let response = await axios({
                url : `http://localhost:8080/product/category/${categoryId}`,
                method : "get",

                headers : {
                    'Content-type' : 'application/json;charset=UTF-8'
                },
                timeout : 3000
            });
            if(response.status === 200){
                this.categoryItems = response.data;
                console.log(this.categoryItems);
            }
        }catch (ex) {
            console.log(ex);
        }
    }

    @observable subMenuItems = null;
    @action fetchItems = async (subMenuId) => {
        try{
            this.subMenuItems = null;
            let response = await axios({
                url : `http://localhost:8080/product/submenu/${subMenuId}`,
                method : "get",

            headers : {
                'Content-type' : 'application/json;charset=UTF-8'
            },
            timeout : 3000
        });
            if(response.status === 200){
                this.subMenuItems = response.data;
            }
        }catch (ex) {
            console.log(ex);
        }
    }

    @observable Item = null;
    @action fetchItem = async (productId) => {
        try{
            this.Item = null;
            let response = await axios({
                url : `http://localhost:8080/product/detail/${productId}`,
                method : "get",

                headers : {
                    'Content-type' : 'application/json;charset=UTF-8'
                },
                timeout : 3000
            });
            if(response.status === 200){

                this.Item = response.data;
                console.log(this.Item);
            }
        }catch (ex) {
            console.log(ex);
        }
    }
}

export default ProductStore.getinstance();