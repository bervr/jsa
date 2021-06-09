// document.getElementById("big").addEventListener('click', event => { console.log("тест большой"); });
// document.querySelector()

class Burger {
    constructor() {
        this.goods = {
            size: { small: { price: 50, richness: 20 }, big: { price: 100, richness: 40 }, },
            additions: { 1: { title: "cheese", price: 10, richness: 20 }, 2: { title: "salad", price: 20, richness: 5 }, 3: { title: "potatoe", price: 15, richness: 10 }, },
            options: { spice: { price: 15, richness: 0 }, sauce: { price: 20, richness: 5 }, },
        };


        this.addToCartSelector = '.menu';
        this.targetProduct = {};
        this.init();

    };

    init() {
        document.querySelector(this.addToCartSelector) //ловим клики в блоке addToCartSelector
            .addEventListener('click', event => {
                this.containerClickHandler(event)
            });
    };

    containerClickHandler(event) {
        if (event.target.tagName !== "INPUT") return;// выбираем из кликов 'элементы управления' в блоке меню
        if (event.path[1].className == "block size") {
            this.targetProduct.size = event.target.id;
        }
        else if (event.path[1].className == "block additions") {
            this.targetProduct.additions = event.target.id;
        }
        if (event.path[1].className == "block options") { //наверное надо как-то подругому сделать
            let options = [];
            let spice = document.getElementById('spice');
            let sauce = document.getElementById('sauce');
            if (spice.checked) {
                options.push('spice')
            }
            if (sauce.checked) {
                options.push('sauce')
            }
            this.targetProduct.options = options;
        }
        this.price = 0;
        this.richness = 0;
        this.calcSumm();
    };

    calcSumm() {
        if (this.targetProduct.size) {
            let nowSize = this.targetProduct.size;
            this.price += this.goods.size[nowSize].price;
            this.richness += this.goods.size[nowSize].richness;
        }
        if (this.targetProduct.additions) {
            let nowAdditoin = this.targetProduct.additions;
            this.price += this.goods.additions[nowAdditoin].price;
            this.richness += this.goods.additions[nowAdditoin].richness;
        }

        if (this.targetProduct.options) {
            this.targetProduct.options.forEach(element => {
                this.price += this.goods.options[element].price;
                this.richness += this.goods.options[element].richness;
            });

        }
        this.render();
    };

    render() {
        let resultBlock = document.getElementsByClassName('.result');
        let result = `<p>Cтоимость бургера - ${this.price}</p><p> Калорийность- ${this.richness}</p>`;
        document.querySelector('.result').innerHTML = result;
    };





};

let yetAnotherOneBurger = new Burger;