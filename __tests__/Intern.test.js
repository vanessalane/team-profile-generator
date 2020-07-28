const Intern = require('../lib/Intern');

test('creates an Intern object that inherits from Employee', () => {
    const intern = new Intern('Vanessa Lane', 'vlane0593@gmail.com', 'GHI', 'UC Berkeley');

    // if intern has these attrs, it's inheriting from Employee.
    expect(intern.name).toBe('Vanessa Lane');
    expect(intern.email).toBe('vlane0593@gmail.com');
    expect(intern.id).toBe('GHI');

    // intern-specific attr
    expect(intern.school).toBe('UC Berkeley');
})
