function initPage() {
    const addButton = document.getElementById('add-button');
    const sortButton = document.getElementById('sort-button');
    const clearButton = document.getElementById('clear-button');
    const creatureTbody = document.getElementById('creature-tbody');
    addButton.addEventListener('click', () => {
        fillMonsters(creatureTbody);
    });
    sortButton.addEventListener('click', () => {
        sortTable(creatureTbody);
    });
    clearButton.addEventListener('click', () => {
        clearTable(creatureTbody);
    });
}

async function fillMonsters(tbody) {
    const response = await fetch('/monsters');
    const monsters = await response.json();

    const tr = document.createElement('tr');
    const td_name = document.createElement('td');
    const td_select = document.createElement('td');
    const td_initiative = document.createElement('td');
    const td_health = document.createElement('td');
    const td_url = document.createElement('td');

    const name = document.createElement('input');
    const select = document.createElement('select');
    const character = document.createElement('option');
    const initiative = document.createElement('input');
    const health = document.createElement('input');
    const a_url = document.createElement('a');

    a_url.appendChild(document.createTextNode('INFO'));
    a_url.setAttribute('target', '_blank');

    select.addEventListener('change', () => {
        const monster = monsters[select.options.selectedIndex - 1];
        a_url.setAttribute('href', '/monsters/' + (parseInt(monster.index) - 1));
    });

    character.appendChild(document.createTextNode('Character'));
    select.appendChild(character);

    td_name.appendChild(name);
    td_select.appendChild(select);
    td_initiative.appendChild(initiative);
    td_health.appendChild(health);
    td_url.appendChild(a_url);

    tr.appendChild(td_name);
    tr.appendChild(td_select);
    tr.appendChild(td_initiative);
    tr.appendChild(td_health);
    tr.appendChild(td_url);

    tbody.appendChild(tr);

    monsters.forEach(monster => {
        const option = document.createElement('option');
        option.appendChild(document.createTextNode(monster.name));
        select.appendChild(option);
    });
}

function sortTable(tbody) {
    let switching, i;
    switching = true;
    while (switching) {
        let shouldSwitch = false;
        switching = false;
        const rows = tbody.rows;
        for(i = 1; i < (rows.length - 1); i++) {
            const x = rows[i].getElementsByTagName('td')[2].getElementsByTagName('input')[0].value;
            const y = rows[i + 1].getElementsByTagName('td')[2].getElementsByTagName('input')[0].value;
            if(Number(x) > Number(y)) {
                shouldSwitch = true;
                break;
            }
        }
        if(shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function clearTable(tbody) {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

initPage();