const productsPage = {
    checkboxFilter: "//label[text()='$']/../input",
    productsList: "#products-list",
    productName: ".product-name a",
    itemDiv: "[data-brand='$']",
    sortDropdown: ".category-sort-by.dropdown",
    sortBy: "[data-label='$'] a",
    selectedOption: "span.selected-option",
    price: "span.price",
    addToCartBtn: ".add-to-cart",
    continueShoppingBtn: "//button[text()='Nastavi kupovinu']",
    cartLink: ".sharkskin-cart-items"
}

module.exports = {
    productsPage
}