const Engineer = require('../lib/Engineer');

test('creates an Engineer object', () => {
    const engineer = new Engineer('Vanessa Lane', 'vlane0593@gmail.com', 'DEF', 'vanessalane');

    expect(engineer.name).toBe('Vanessa Lane');
    expect(engineer.email).toBe('vlane0593@gmail.com');
    expect(engineer.id).toBe('DEF');
    expect(engineer.github).toBe('vanessalane');
})
