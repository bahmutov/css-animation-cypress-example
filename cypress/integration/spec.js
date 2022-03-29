/// <reference types="cypress" />

const times = ['Day', 'Sunset', 'Night', 'Dusk']

it('changes time of day', () => {
  cy.visit('public/index.html')
  cy.contains('Dusk').should('have.class', 'active')
  cy.contains('Day').click()
  cy.get('.window').screenshot('Day', {
    overwrite: true,
  })
  cy.contains('Sunset').click()
  cy.get('.window').screenshot('Sunset', {
    overwrite: true,
  })
  cy.contains('Night').click()
  cy.get('.window').screenshot('Night', {
    overwrite: true,
  })
  cy.contains('Dusk').click()
  cy.get('.window').screenshot('Dusk', {
    overwrite: true,
  })
})

it.only('disables animations', () => {
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
