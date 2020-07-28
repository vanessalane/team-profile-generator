const Employee = require('../lib/Employee');

test('creates an Employee object', () => {
    const employee = new Employee('Vanessa Lane', 'vlane0593@gmail.com', 1);

    expect(employee.name).toBe('Vanessa Lane');
    expect(employee.email).toBe('vlane0593@gmail.com');
    expect(employee.id).toBe(1);
});