const Manager = require('../lib/Manager');

test('creates a Manager object that inherits from Employee', () => {
    const manager = new Manager('Vanessa Lane', 'vlane0593@gmail.com', 'ABC', 1);

    // if manager has these attrs, it's inheriting from Employee.
    expect(manager.name).toBe('Vanessa Lane');
    expect(manager.email).toBe('vlane0593@gmail.com');
    expect(manager.id).toBe('ABC');

    // test manager-specific attributes
    expect(manager.office).toBe(1);
})

test('getRole() returns the role', () => {
    const manager = new Manager('Vanessa Lane', 'vlane0593@gmail.com', 'ABC', 1);
    expect(manager.getRole()).toBe('Manager');
})

test('getOffice() returns the office number', () => {
    const manager = new Manager('Vanessa Lane', 'vlane0593@gmail.com', 'ABC', 1);
    expect(manager.getOffice()).toBe(1);
})
