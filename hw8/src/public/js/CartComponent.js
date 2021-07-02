// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const cartItem = {
    props: ['img', 'cartItem'],
    template: `
    <div class="cart-item" :data-productId=cartItem.id_product>
                    <div class="product-bio">
                        <img class="cart-img" :src="img" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
}

const cart = {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            imgCart: '/static/',
            showCart: false
        }
    },
    components: {
        'cart-item': cartItem
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }

        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--
                        }
                    })
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            document.querySelector(`.cart-item[data-productId="${item.id_product}"]`).remove();
                        }
                    })
            }
        },
    },
    template: `<div>
            <button class="btn-search" type="button" @click="showCart = !showCart"> <i class="fas fa-shopping-cart"></i></button>
            <div class="cart-block" v-show="showCart">
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="imgCart+item.id_product+'.jpg'" :cart-item="item" @remove="remove">
            </cart-item>
            </div>
            </div>
    `
};



export default cart