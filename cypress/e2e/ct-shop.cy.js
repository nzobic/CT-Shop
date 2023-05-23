const homePage = require ('../support/pages/homePage').homePage;
const productsPage = require ('../support/pages/productsPage').productsPage;
const categoryPage = require ('../support/pages/categoryPage').categoryPage;
const cartPage = require ('../support/pages/cartPage').cartPage;

describe('CT-Shop Test', () => {


  it('CT-Shop: Filter Items', () => {

    cy.visit('https://www.ctshop.rs/')

    //cy.closeAdd()
    
    cy.acceptCookies()
  
    cy.selectItemFromMenu('mali-kucni-aparati','aparati-za-espresso')
  
    cy.checkFilter('Bosch')
  
    cy.VerifyFilteredItems('Bosch')

  })

  it('CT-Shop: Sort Items', () => {

    cy.visit('https://www.ctshop.rs/')

    //cy.closeAdd()
    
    cy.acceptCookies()
  
    cy.selectItemFromMenu('lepota-i-zdravlje','elektricne-cetkice')
    
    cy.sorting('Ceni rastuće')

    cy.verifySorting()

  })

  it('CT-Shop: Click on each sub Category', () => {

    cy.visit('https://www.ctshop.rs/')

    //cy.closeAdd()

    cy.acceptCookies()

    cy.SelectCategoryFromMenu("laptopovi-tableti")

    cy.clickEachsubCategory()

  })

  it('CT-Shop: Add Items to the Cart', () => {

    cy.visit('https://www.ctshop.rs/')

    //cy.closeAdd()

    cy.acceptCookies()

    cy.selectItemFromMenu('telefoni-pametni-satovi','pametni-satovi')

    //cy.closeAdd()

    cy.checkFilter('Hama')

    cy.addItemsToTheCart()

    cy.verifyItemsInTheCart()

  })





})