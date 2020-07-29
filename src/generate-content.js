const generateEmployeeCard = employee => {
    // if there was no employee data, return nothing
    if (!employee) {
        return '';
    }

    // if there's employee data, figure out specific info to include based on the employee type
    let additionalInfo = '';
    switch (employee.title) {
        case 'Engineer':
            additionalInfo = `<p class="card-text">GitHub: <a href="https://www.github.com/${employee.github}" target="_blank" class="card-link">${employee.github}</a></p>`;
            break;
        case 'Intern':
            additionalInfo =`<p class="card-text">${employee.school}</p>`
            break;
        case 'Manager':
            additionalInfo =`<p class="card-text">Office: ${employee.office}</p>`
            break;
        default:
            break;
    }

    // return the HTML for the provided employee's card
    return `
                <div class="col mb-4">
                    <div class="card h-100">
                        <div class="card-header">
                            <h4>${employee.name}</h4>
                            <p class="card-text">${employee.title}</p>
                        </div>
                        <div class="card-body font-weight-light">
                            <p><a href="mailto:${employee.email}" class="card-link">${employee.email}</a></p>
                            <p class="card-text">Employee ID: ${employee.id}</p>
                            ${additionalInfo}
                        </div>
                    </div>
                </div>
            `
}

const generatePageContent = employees => {
    let employeesHTML = '';

    // iterate through the employees to generate the employee HTML
    for (let i=0; i < employees.length; i++) {
        employeesHTML += generateEmployeeCard(employees[i])
    }
    return employeesHTML
}

// export the page HTML
module.exports = employees => {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Team Portfolio</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
</head>

<body>
    <header class="jumbotron text-center">
        <h1 class="display-4">Hello, world!</h1>
        <p class="lead">Meet our awesome team.</p>
    </header>

    <main class="mx-auto">
        <div class="container font-weight-light">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                ${generatePageContent(employees)}
            </div>
        </div>
    </main>
</body>
</html>
`
};