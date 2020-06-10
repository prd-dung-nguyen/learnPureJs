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
           
        </div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
            <li v-for="review in reviews">
                 <p>{{ review.name }} </p>
                 <p> Rating: {{ review.rating }} </p>
                 <p>{{ review.review }} </p>
                 
             </li> 
        </ul>
        <product-review @review-submit="addReview"></product-review>
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
                    variantQuantity: 99
                }
            ],
            reviews: [],

        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct: function (index) {
            this.selectedVariant = index
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    },
    computed: {
        title(){
             return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        getSelectedId() {
            return this.getSelectedId();
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

Vue.component( 'product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
          <b>Please correct the following: </b>
          <ul v-for="error in errors">
              <li> {{error}}</li>
          </ul>
        </p>
        
          <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
          </p>
      
          <p>
            <label for="review">Review:</label>      
            <textarea id="review" v-model="review"></textarea>
          </p>
      
          <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
            </select>
          </p>      
          <p>
            <input type="submit" value="Submit">  
          </p>    
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: [],
        }
    },
    methods: {
        onSubmit(){
            if(this.name && this.rating && this.review) {
                let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
                }
                this.$emit('review-submit', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else {
                if(!this.name) this.errors.push("Your name required")
                if(!this.rating) this.errors.push("Rating is required")
                if(!this.review) this.errors.push("Review is required")
            }

        }

    }
})

var app = new Vue ({
    el: "#app",
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(index) {
            this.cart.push(index);
        }
    }
});