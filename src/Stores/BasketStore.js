import {observable, action} from "mobx";
import axios from "axios";

class BasketStore {
    static __instance = null;

    static getinstance(){
        if(BasketStore.__instance === null){
            BasketStore.__instance = new BasketStore();
        }
        return BasketStore.__instance;
    }

    constructor(){
        BasketStore.__instance = this;
    }

    @observable sum = 0;

    @observable items = null;
    @action fetchItems = async (user) => {
        this.items = null;
        try{
            let response = await axios({
                url : `http://localhost:8080/basket/user/${user.id}`,
                method : "get",
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                data: JSON.stringify(user),
                timeout : 3000
            });

            if(response.status === 200 && response.data){
                this.items = response.data;
                this.setSum();
                return true;
            }
            return false;
        }catch (ex) {
            console.log(ex);
            return false;
        }
    };

    @action addBasket = async (basket)=> {
        try{
            let response = await axios({
                url : `http://localhost:8080/basket`,
                method : "post",
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                data: JSON.stringify(basket),
                timeout : 3000
            });

            if(response.status === 200 && response.data){
                return true;
            }
            return false;
        }catch (ex) {
            console.log(ex);
            return false;
        }
    };

    @action modifyBasket = async (basket)=> {
        console.log(basket.orderNumber);
        if(basket.type === 'add'){
            this.sum += basket.price;
        }else {
            this.sum -= basket.price;
        }
        try{
            let response = await axios({
                url : `http://localhost:8080/basket`,
                method : "put",
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                data: JSON.stringify(basket),
                timeout : 3000
            });

            if(response.status === 200 && response.data){
                console.log(response.data);
                return true;
            }
            return false;
        }catch (ex) {
            console.log(ex);
            return false;
        }
    };

    @action deleteBasket = async (basket)=> {
        try{
            let response = await axios({
                url : `http://localhost:8080/basket/${basket.id}`,
                method : "delete",
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                timeout : 3000
            });

            if(response.status === 200 && response.data){
                this.sum -= basket.orderNumber * basket.price;
                return true;
            }
            return false;
        }catch (ex) {
            console.log(ex);
            return false;
        }
    };

    @action setSum = () => {
        this.sum = 0;
        console.log(this.items);
        this.items.map(item => this.sum += item.orderNumber * item.price);
        console.log(this.sum);
    }
}

export default BasketStore.getinstance();