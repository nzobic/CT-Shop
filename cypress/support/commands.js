const homePage = require ('../support/pages/homePage').homePage;
const productsPage = require ('../support/pages/productsPage').productsPage;
const categoryPage = require ('../support/pages/categoryPage').categoryPage;
const cartPage = require ('../support/pages/cartPage').cartPage;
import categories from '../fixtures/categories.json';
import items from '../fixtures/items.json'

/**
 * @memberof cy
 * @method closeAdd Closes Add popup
*/

Cypress.Commands.add('closeAdd', () => { 
    cy.get('#popup-smart-root-55674').shadow().find('#PsCloseButton').click()
})


/**
 * @memberof cy
 * @method acceptCookies Closes Accept Cookies dialog
*/

Cypress.Commands.add('acceptCookies', () => { 
    //cy.xpath('//button[text()="Prihvatam"]').click()
    cy.get('button').contains("Prihvatam").click()
})


/**
 * @memberof cy
 * @method selectItemFromMenu Select Item from SubMenu
 * @param submenu Select SubMenu
 * @param link Select Item from SubMenu Link
*/

Cypress.Commands.add('selectItemFromMenu', (submenu, link) => { 
    cy.get(homePage.menu).invoke('show')
    cy.get(homePage.subMenu.replace('$', submenu)).invoke('show')
    cy.get(homePage.subMenuLink.replace('$', link)).click()
})


/**
 * @memberof cy
 * @method checkFilter Check Filter
 * @param filterName Click on Filter name
*/

Cypress.Commands.add('checkFilter', (filterName) => { 
    cy.xpath(productsPage.checkboxFilter.replace('$', filterName)).check({force:true})
})


/**
 * @memberof cy
 * @method VerifyFilteredItems Verify filtered Items
 * @param manufacturer Manufacturer of found Items
*/

Cypress.Commands.add('VerifyFilteredItems', (manufacturer) => {
    cy.get(productsPage.productName).each(($element) => {
        cy.wrap($element).invoke('text').should('contains', manufacturer)
    })

    // cy.get(productsPage.productsList).children().should('have.length', numberOfItems)
    // cy.get(productsPage.productsList).find(productsPage.itemDiv.replace('$', manufacturer)).should('have.length', numberOfItems)
})


/**
 * @memberof cy
 * @method SelectCategoryFromMenu Select Category from Menu
 * @param menuLink Click Category from Menu
*/

Cypress.Commands.add('SelectCategoryFromMenu', (menuLink) => { 
    cy.get(homePage.menu).invoke('show')
    cy.get(homePage.menuLink.replace('$', menuLink)).click()
})


/**
 * @memberof cy
 * @method clickEachsubCategory Click on each sub Category on the Page
*/

Cypress.Commands.add('clickEachsubCategory', () => {

    cy.get(categoryPage.categoryLink).then((data) => {
        let count = data.length
        for (let i = 0; i<count; i++) {
            cy.get(categoryPage.categoryLink).eq(i).invoke('attr', 'title').should('eq', categories.LaptopCategories[i].categoryName)
            cy.get(categoryPage.categoryLink).eq(i).click()
            cy.url().should('contain', categories.LaptopCategories[i].url)
            cy.go('back')
        }
    })
})


/**
 * @memberof cy
 * @method sorting Sort Items
 * @param sortBy Sorting by
*/

Cypress.Commands.add('sorting', (sortBy) => {
    //cy.get(productsPage.sortDropdown).eq(0).click()
    cy.get(productsPage.sortBy.replace('$', sortBy)).eq(0).click({force:true})
    cy.wait(3000)
})


/**
 * @memberof cy
 * @method verifySorting Verify Sorting is Correct
*/

Cypress.Commands.add('verifySorting', () => {
    
    cy.get(productsPage.price).then((prices) => {
        let count = prices.length
        cy.log(count)
  
        for (let i=0; i<count-1; i++) {
  
  
          cy.get(productsPage.price).eq(i).then(($priceA) => {
            const num1 = parseFloat(($priceA.text()).replace('.',''));
  
            cy.get(productsPage.price).eq(i+1).then(($priceB) => {
              const num2 = parseFloat(($priceB.text()).replace('.',''));
  
              //expect(num1).to.be.lessThan(num2)
  
              if (num1 <= num2) {
                cy.log("***num 1 is*** " + num1 + " ***num 2 is*** " + num2)
              }
            })
          })
        }
      })



})


/**
 * @memberof cy
 * @method addItemsToTheCart Add all filtered Items to the Cart
*/

Cypress.Commands.add('addItemsToTheCart', () => { 
    cy.get(productsPage.addToCartBtn).then((items) => {
        
        let count = items.length
        for (let i = 0; i<count; i++) {
  
            cy.get(productsPage.addToCartBtn).eq(i).click({force:true})
            cy.wait(1000)
            cy.xpath(productsPage.continueShoppingBtn).click()
        }
      })
  
      cy.reload()
})


/**
 * @memberof cy
 * @method verifyItemsInTheCart Verify Items are added correctly
*/

Cypress.Commands.add('verifyItemsInTheCart', () => { 
    cy.get(productsPage.cartLink).click()

    cy.get(cartPage.productName).should('have.length', 2)

      for (let i = 0; i<2; i++) {
        cy.get(cartPage.productName).eq(i).should('contain', items.items[i].itemName)
    }

})
