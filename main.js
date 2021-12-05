const showDegreeInfo = () => {
    fetch('degrees.json')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else throw new Error('Fail');
        })
        .then(data => {
            createDegreeInfoTable(data.degrees);
        })
        .catch(error => {
            console.log(error);
        });
}

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

const createDegreeInfoTable = (degrees) => {
    const table = document.createElement('table');
    table.id = 'degrees-table'

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

const resetDegreeInfo = () => {
    document.getElementById('degrees-table').remove();
    document.getElementById('main-button').disabled = false;
    document.getElementById('reset-button').disabled = true;
}

document.getElementById('main-button').addEventListener('click', showDegreeInfo);
document.getElementById('reset-button').addEventListener('click', resetDegreeInfo);