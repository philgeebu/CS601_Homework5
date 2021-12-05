const showDegreeInfo = () => {
    fetch('degrees.json')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else throw new Error('Fail');
        })
        .then(data => {
            createDegreeInfoTable(data);
        })
        .catch(error => {
            console.log(error);
        });
}

const createHeader = (headerText, row) => {
    let th = document.createElement('th');
    let textNode = document.createTextNode(headerText)
    th.appendChild(textNode)
    return row.append(th)
}

const createCell = (cellText, row) => {
    let td = document.createElement('td');
    let textNode = document.createTextNode(cellText)
    td.appendChild(textNode)
    return row.append(td)
}

const createDegreeInfoTable = (data) => {
    const headers = ['School', 'Program/Major', 'Type', 'Year']

    let table = document.createElement('table');
    table.classList.add('degrees-table');
    let thr = document.createElement('tr');

    for (let header of headers) {
        createHeader(header, thr)
    }

    table.append(thr)

    for (let degree of data.degrees) {

        let tr = document.createElement('tr');

        createCell(degree.school, tr)
        createCell(degree.programMajor, tr)
        createCell(degree.type, tr)
        createCell(degree.year, tr)

        table.append(tr)
    }

    const mainButton = document.getElementById('main-button');
    mainButton.insertAdjacentElement('afterend', table);
};

document.getElementById('main-button').addEventListener('click', showDegreeInfo);