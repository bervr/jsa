Vue.component('search', {
    data() {
        return {
            userSearch: '',
            filtered: '',
        }
    },
    template: `
 <form action="#" class="search-form" @submit.prevent="filter">
                <input type="text" class="search-field" v-model="userSearch">
                <button type="submit" class="btn-search">
                    <i class="fas fa-search"></i>
                </button>
            </form>
            `,
    methods: {
        filter() {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.$root.products.filter(el => regexp.test(el.product_name));
            this.$emit('filter', this.filtered);
        }
    }

});