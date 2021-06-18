const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn" data-product_id = ${this.id}>Купить</button>
                </div>
            </div>`
    }
}



class Basket {
    constructor(container = '.cart') {
        this.container = container;
        this.visible = false;
        this.goods = [];//массив товаров из JSON документа
        this._getBasket() //первоначально заполним корзину из обьекта с сайта
            .then(data => { //data - объект js
                this.goods = [...data.contents];
                this.render()
                this.init();
            });
    }

    init() {
        document.querySelector('.clear-cart').addEventListener('click', event => { this.clearCart() });
    }
    _getBasket() {// нужно еще заданий на промисы, потому что непонятно...
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    _checkGoodExists(product) { //проверим на наличие в корзине
        let flag = true;
        if (this.goods.length != 0) {
            this.goods.forEach(element => {
                if (element.id_product == product.id_product) {
                    flag = false;
                    return flag;
                };
            });
            return flag;
        }
        else {
            return flag;
        }
    }

    addGoods(product) {
        let newProduct = this._checkGoodExists(product);
        if (!newProduct) { //если такой в корзине уже есть увео=личиваем его количество на 1
            this.goods.find(x => x.id_product == product.id_product).quantity += 1;
        }
        else { //если нет, то добавляем
            product.quantity = 1
            this.goods.push(product)
        }
        this.render();
        // эх, перегрузку операторов бы...
    }

    removeGoods(product) { //todo
        // console.log(product);
        if (this.goods.length != 0) {
            const index = this.goods.indexOf(product); //находим индекс удаляемого продукта
            if (index > -1) {
                this.goods.splice(index, 1);
            }
        };
        this.render();
    }

    cartSumm() { //map здесь конечно ни к чему но кто-то сказал что мапом сделал сумму,
        // а я ума не приложу как это только мапом просуммировать
        return this.goods.map(item => item.quantity * item.price).reduce((a, b) => a + b, 0);
        //ну и если бы там был нормальный обьект можно было бы использовать его метод 
    }


    changeGoods() {
        //честно - не понял что тут должно происходить с точки зрения корзины
    }

    clearCart() {
        this.goods = [];
        this.render()
    }

    render() {
        const totalCost = document.querySelector(".total-cost");
        totalCost.innerHTML = '';
        totalCost.insertAdjacentHTML('beforeend', `В корзине товаров на сумму: ${this.cartSumm()} $`);
        if (this.visible) {
            this.cartSumm()
            const block = document.querySelector(this.container)
            block.innerHTML = '';
            if (this.goods.length != 0) {
                for (let product of this.goods) {
                    const productObj = new ElemBasket(product);
                    block.insertAdjacentHTML('beforeend', productObj.render());
                }
            }
            else {
                block.innerHTML = "Корзина пуста";
            }
        }
    }
}
class ElemBasket {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        this.quantity = product.quantity;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <p>${this.quantity} шт</p>
                    <p>итого: ${this.elemSumm()} $</p>
                    <button class="buy-btn" data-product_id = ${this.id}>Удалить из корзины</button>
                </div>
            </div>`
    }

    elemSumm() { //побочная история с там что мы только отрисовываем их, 
        //а не создаем как обьекты в каталоге - нельзя использовать методы обьекта
        //по хорошему наверное надо было наполнение делать через содание обьекта.
        return this.price * this.quantity
    }

}

class Shop {  //по идее неверно ееще пользователь должен быть т.к. у каждого покупателя своя козина
    // а каталог общий, но пока без него.
    constructor() {
        this.list = new ProductsList();
        this.basket = new Basket();
        this.init();
    }
    init() {
        document.querySelector('.btn-cart').addEventListener('click', event => { //показать корзину
            this.basket.visible = true;
            this.basket.render()
        });

        document.querySelector(this.basket.container) //ловим клики в блоке корзины
            .addEventListener('click', event => {
                this.basketClickHandler(event)
            });

        document.querySelector(this.list.container) //ловим клики в блоке каталога
            .addEventListener('click', event => {
                this.catalogClickHandler(event)
            });
    }
    // todo: поDRY-ить этот кусок 

    catalogClickHandler(event) {
        if (event.target.tagName !== 'BUTTON') return; // выбираем из кликов кнопки в блоке каталога  
        this.basket.addGoods(this.list.goods.find(x => x.id_product == event.target.dataset.product_id));
    }
    basketClickHandler(event) {
        if (event.target.tagName !== 'BUTTON') return;
        this.basket.removeGoods(this.basket.goods.find(x => x.id_product == event.target.dataset.product_id));
    }
}
const shop = new Shop();

