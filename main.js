Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
         <div class="product-image">
            <img v-bind:src="image">
         </div>
        <div class="product-info">
             <h1>{{ title }}</h1>
            <p v-if="isStock"> In Stock </p>
            <p v-else> Out of Stock </p>
            <p>Shipping {{ shipping }}</p>
            <p v-for="detail in details">{{ detail }}</p>

            <div v-for="(variant, index) in variants"
                 :key="variant.variantId"
            class="color-box"
            :style="{ backgroundColor: variant.variantColor}"
            @mouseover="updateProduct(index)">
            </div>
            <button v-on:click="addToCart"
                    :disabled="!isStock"
            :class="{disabledButton: !isStock}"> Add to Cart </button>
            <div class="cart">
                <p>Cart {{ cart }}</p>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            brand: 'Jun Ng 2020 <3',
            product: 'Socks',
            selectedVariant: 0,
            details: ["80% Cotton", "20% Poly", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'Green',
                    variantImage: './materials/greenSocks.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'Blue',
                    variantImage: './materials/blueSocks.jpg',
                    variantQuantity: 0
                }
            ],
            cart: 0
        }
    },
    methods: {
        addToCart: function () {
            this.cart += 1
        },
        updateProduct: function (index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title(){
             return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        isStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if(this.premium) {
                return 'Free'
            }
            return 2.99
        }
    }
})



var app = new Vue ({
    el: "#app",
    data: {
        premium: true
    }
});