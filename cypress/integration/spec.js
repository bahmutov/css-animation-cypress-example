/// <reference types="cypress" />

const times = ['Day', 'Sunset', 'Night', 'Dusk']

it('goes through the day', () => {
  cy.visit('public/index.html')
  times.forEach((time) => {
    cy.contains(time)
      .click()
      // add one second delay to show the animation in progress
      .wait(1000, { log: false })
  })
})

it('takes a screenshot', () => {
  cy.visit('public/index.html')

  times.forEach((time) => {
    cy.contains(time).click()
    // notice we are taking a screenshot immediately
    // without waiting for anything to finish updating
    cy.get('.window').screenshot(time, {
      overwrite: true,
    })
  })
})

it('disables animations', () => {
  cy.visit('public/index.html')
  cy.get('body').invoke(
    'append',
    Cypress.$(`
      <style id="__cypress-animation-disabler">
        *, *:before, *:after {
          transition-property: none !important;
          animation: none !important;
        }
      </style>
    `),
  )

  times.forEach((time) => {
    cy.contains(time).click().wait(1000, { log: false })
  })
})
