const Engineer = require('../lib/Engineer');

test('creates an Engineer object that inherits from Employee', () => {
    const engineer = new Engineer('Vanessa Lane', 'vlane0593@gmail.com', 'DEF', 'vanessalane');

    // if engineer has these attrs, it's inheriting from Employee.
    expect(engineer.name).toBe('Vanessa Lane');
    expect(engineer.email).toBe('vlane0593@gmail.com');
    expect(engineer.id).toBe('DEF');

    // engineer-specific attr
    expect(engineer.github).toBe('vanessalane');
})
