
/// <reference types="cypress" />
import todoList from "../fixtures/todoList.json";
import users from '../fixtures/users.json'

describe("Test todo app", () => {

  beforeEach(() => {
    cy.visit('');
  })

  it('should launch a application', () => {
    cy.visit('');
  })

  it('should check the title', () => {
    cy.title().should('eq', 'React Demo Application')
  })

  it('should check for the links', () => {
    cy.get('a').should('have.length', 2)
    cy.get('a').contains('Todo', { matchCase: false })
  })

  it('should navigate after clicking the links', () => {
    cy.get('a').contains('Users').click()
    cy.location('pathname').should('eq', '/users')
  })

  it('should enter into the input field', () => {
    const task = 'This is the task for cypress';
    cy.contains('Nothing to do!').should('exist')
    cy.get('#task-input-field').type(`${task}{enter}`, { delay: 50 })
    cy.contains('Nothing to do!').should('not.exist')
    cy.get('table').contains(task)
  })

  it('should check for the button', () => {
    const task = 'This is the task for cypress';
    cy.get('[data-cy="add-btn"]').should('be.disabled')
    cy.get('#task-input-field').type(`${task}`, { delay: 50 })
    cy.get('[data-cy="add-btn"]').should('not.be.disabled')

  })

  it('should check before and after adding task', () => {

  })

  it('should check for done the task', () => {
    const task = 'This is the task for cypress';
    cy.get('#task-input-field').as('taskInput');
    cy.get('@taskInput').type(`${task}{enter}`, { delay: 50 })
    cy.contains(task).should('not.have.class', 'task-done')
    cy.get('[data-cy="done-btn"]').click();
    cy.contains(task).should('have.class', 'task-done')
    cy.contains(task).should('have.css', 'text-decoration-line', 'line-through')

  })

  it('should delete the task', () => {

  })

  it('should check for responsive styling', () => {
    cy.contains('ToDo List').parent().should('have.css', 'font-size', '20px')
    cy.viewport('iphone-8')
    // cy.viewport('iphone-8', 'landscape')
    cy.contains('ToDo List').parent().should('have.css', 'font-size', '30px')
  })

  it('should log messages in the runner', () => {
    const task = 'This is the task for cypress';
    cy.get('#task-input-field').type(`${task}{enter}`, { delay: 50 })
    cy.log('task added successfully')
  })

  it('should set localstorage and then clear it', () => {
    cy.window().then(win => {
      win.localStorage.setItem('todoList', JSON.stringify(todoList))
    })
    cy.reload();
    cy.wait(2000)
    cy.clearLocalStorage('todoList')
    cy.reload();
  })

  xit('should pause the execution', () => {
    cy.window().then(win => {
      win.localStorage.setItem('todoList', JSON.stringify(todoList))
    })
    cy.reload();
    cy.pause()
    cy.clearLocalStorage('todoList')
    cy.reload();
  })

  it('should take a screenshot', () => {
    const task = 'This is the task for cypress';
    cy.get('#task-input-field').type(`${task}{enter}`, { delay: 50 });
    // cy.get('table').screenshot() // Take a screenshot of specific element.
    cy.screenshot() // Take a screenshot of entire application.
  })

  it('Mock the http request', () => {
    // cy.intercept('https://jsonplaceholder.typicode.com/users', { body: users })
    cy.intercept('https://jsonplaceholder.typicode.com/users', { fixture: 'users.json' })
    // cy.intercept('https://jsonplaceholder.typicode.com/users', (req) => {
    // req.continue((res) => { // callback where we can test the response
    //   expect(res.body.length).to.be.equal(10)
    // })
    // req.continue() // send request to actual server.
    // req.reply({ body: users, delay: 20000 }) // send mock data in response.
    // })

    cy.contains('Users').click()
    cy.get('table').should('exist')
  })

  it('Custom command', () => {
    cy.setLocalStorage('todoList', todoList);
    cy.reload();
  })

  it('Plugin', () => {
    cy.task('getUsers', 'users.json').then(res => {
      console.log("Response from node server", res)
    })
  })

})