const generateEmployeeCard = (employee) => {
    if (!employee) {
        return '';
    }

    let employeeSpecificData;
    switch (employee.title) {
        case 'Engineer':
            employeeSpecificData = `<p class="card-text">GitHub: <a href="https://www.github.com/${employee.github}" target="_blank" class="card-link">${employee.github}</a></p>`;
            break;
        case 'Intern':
            employeeSpecificData =`<p class="card-text">${employee.school}</p>`
            break;
        case 'Manager':
            employeeSpecificData =`<p class="card-text">Office: ${employee.office}</p>`
            break;
        default:
            break;
    }

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
                        ${employeeSpecificData}
                    </div>
                </div>
            </div>
            `
}

const generatePageContent = employees => {
    let pageHTML = '';
    for (let i=0; i < employees.length; i++) {
        pageHTML += generateEmployeeCard(employees[i])
    }
    return pageHTML
}

module.exports = employeeData => {
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
                ${generatePageContent(employeeData)}
            </div>

        </div>
    </main>
</body>
</html>
`
};