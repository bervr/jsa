Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgProduct: '/static/'
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="products generalinfo">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="imgProduct+item.id_product+'.jpg'"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <div class="article">
            <div class="product-item new-box">
                <img class= "product-img" :src="img" alt="Some img">
                <div class="desc heading4">
                    <h3 class="heading4">{{product.product_name}}</h3>
                    <p>{{product.price}}</p>
                    <button class="top_button" @click="$emit('add-product', product)">Купить</button>
                </div>
            </div>
            </div>
    `
})