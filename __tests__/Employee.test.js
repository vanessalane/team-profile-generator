const Employee = require('../lib/Employee');

test('creates an Employee object', () => {
    const employee = new Employee('Vanessa Lane', 'vlane0593@gmail.com', 'ABC');

    expect(employee.name).toBe('Vanessa Lane');
    expect(employee.email).toBe('vlane0593@gmail.com');
    expect(employee.id).toBe('ABC');
})

test('getEmail() returns the email', () => {
    const employee = new Employee('Vanessa Lane', 'vlane0593@gmail.com', 'ABC');
    expect(employee.getEmail()).toBe('vlane0593@gmail.com');
})

test('getName() returns the name', () => {
    const employee = new Employee('Vanessa Lane', 'vlane0593@gmail.com', 'ABC');
    expect(employee.getName()).toBe('Vanessa Lane');
})

test('getRole() returns the role', () => {
    const employee = new Employee('Vanessa Lane', 'vlane0593@gmail.com', 'ABC');
    expect(employee.getRole()).toBe('Employee');
})

test('getId() returns the ID', () => {
    const employee = new Employee('Vanessa Lane', 'vlane0593@gmail.com', 'ABC');
    expect(employee.getId()).toBe('ABC');
})
