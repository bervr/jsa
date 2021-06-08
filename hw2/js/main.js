class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 }
        ];
    }

    storePrice() {
        let summ = 0;
        this.goods.forEach(element => {
            summ += element.price;
        });
        return summ;
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", productObj.render())
        }
    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id = "${this.id}">
                <img src="${this.img}" alt="photo">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class CartList {
    clearCart() { // очистить корзину целиком
        pass
    }

    getSumm() { //посчитать стоимость товаров в корзине
        pass
    }

    getCount() { //посчитать количество товаров в корзине
        pass
    }

    addOne(cartItem) { // добавить  элемент 
        pass
    }

    dropOne(cartItem) { //удалить елемент
        pass
    }

}

class CartItem {
    details() { // посмотреть подробную инфу о товаре в корзине
        pass
    }

    getCount() { // посчитать количество этого товара в корзине
        pass
    }

    getSumm() { // посчитать стоимость по этому товару (по позиции)
        pass
    }

    takeFromStore(count) {  // при добавлении в корзину убирает заданое количество товара с остатков складад
        pass
    }

    returnToStore(count) {  // при удалении из корзины возвращает заданое количество товара на складад
        pass
    }

}


let list = new ProductList();
list.render();
console.log(list.storePrice());