const showDegreeInfo = () => {
    fetch('degrees.json')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to load degrees.')
            };
        })
        .then(data => createDegreeInfoTable(data.degrees))
        .catch(error => reportError(error));
}

// creates and appends the header row with provided array of header text
const createHeadersRow = (headers) => {
    const thr = document.createElement('tr');
    for (const header of headers) {
        const th = document.createElement('th');
        const textNode = document.createTextNode(header)
        th.appendChild(textNode)
        thr.append(th)
    }
    return thr
}

// creates and appends a row of data with provided array of cells
const createRow = (cells) => {
    const tr = document.createElement('tr');
    for (const cell of cells) {
        const td = document.createElement('td');
        const textNode = document.createTextNode(cell)
        td.appendChild(textNode)
        tr.append(td)
    }
    return tr
}

// Sends error message to DOM upon failed json fetch
const reportError = (message) => {
    const errorP = document.createElement('p');
    errorP.id = 'degrees-section'
    const textNode = document.createTextNode(message)
    errorP.appendChild(textNode)

    const resetButton = document.getElementById('reset-button');
    resetButton.insertAdjacentElement('afterend', errorP);

    document.getElementById('main-button').disabled = true;
    document.getElementById('reset-button').disabled = false;
}

// creates degree table from json
const createDegreeInfoTable = (degrees) => {
    const table = document.createElement('table');
    table.id = 'degrees-section'

    // Define, create, and append the headers row to the table
    const headersRow = createHeadersRow(['School', 'Program/Major', 'Type', 'Year', ]);
    table.append(headersRow);

    // Iterate through degrees: define, create, and append rows to the table
    for (const degree of degrees) {
        const row = createRow([degree.school, degree.programMajor, degree.type, degree.year]);
        table.append(row);
    }

    const resetButton = document.getElementById('reset-button');
    resetButton.insertAdjacentElement('afterend', table);

    document.getElementById('main-button').disabled = true;
    document.getElementById('reset-button').disabled = false;
};

// returns to original/cleared state
const resetDegreeInfo = () => {
    document.getElementById('degrees-section').remove();
    document.getElementById('main-button').disabled = false;
    document.getElementById('reset-button').disabled = true;
}

document.getElementById('main-button').addEventListener('click', showDegreeInfo);
document.getElementById('reset-button').addEventListener('click', resetDegreeInfo);