const Intern = require('../lib/Intern');

test('creates an Intern object', () => {
    const intern = new Intern('Vanessa Lane', 'vlane0593@gmail.com', 'GHI', 'UC Berkeley');

    expect(intern.name).toBe('Vanessa Lane');
    expect(intern.email).toBe('vlane0593@gmail.com');
    expect(intern.id).toBe('GHI');
    expect(intern.school).toBe('UC Berkeley');
})
