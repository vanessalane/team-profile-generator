const Manager = require('../lib/Manager');

test('creates a Manager object', () => {
    const manager = new Manager('Vanessa Lane', 'vlane0593@gmail.com', 'ABC', 1);

    expect(manager.name).toBe('Vanessa Lane');
    expect(manager.email).toBe('vlane0593@gmail.com');
    expect(manager.id).toBe('ABC');
    expect(manager.office).toBe(1);
})
