describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
    cy.contains('Online Movie Making Courses')
    cy.contains('Register')
    cy.contains('Login')
    cy.contains('Studio Ghibli')
    cy.contains('Course 1')
    cy.contains('Course 2')
    cy.contains('Course 3')
    cy.contains('Course 4')
  })
})