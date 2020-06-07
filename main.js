var app = new Vue ({
    el: "#app",
    data: {
        product: 'Socks',
        img: './materials/greenSocks.jpg',
        inStock: false,
        details: ["80% Cotton", "20% Poly", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: 'Green'
            },
            {
                variantId: 2235,
                variantColor: 'Blue'
            }
        ]
    }
});