document.addEventListener('DOMContentLoaded', function() {
    const incidentBody = document.getElementById('incidentBody');
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
function renderIncidents(incidentList) {
    incidentBody.innerHTML = '';
    incidentList.forEach(incident => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${incident.id}</td>
        <td>${incident.sensorId}</td>
        <td>${incident.location}</td>
        <td>${incident.leakType}</td>
        <td>${incident.severity}</td>
        <td>${incident.status}</td>
        <td class="action-buttons"> <!-- Adiciona a classe action-buttons -->
            <span class="btn btn-primary" onclick="updateIncident(${incident.id})">
                <i class="fas fa-pencil-alt"></i>
            </span>
            <span class="btn btn-danger" onclick="deleteIncident(${incident.id})">
                <i class="fas fa-trash-alt"></i>
            </span>
        </td>
        `;
        incidentBody.appendChild(row);
    });
}

function filterIncidents() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value.toLowerCase();
    const filteredIncidents = incidents.filter(incident => {
        const locationMatch = incident.location.toLowerCase().includes(searchTerm);
        if (filterValue === 'all') {
            return locationMatch;
        } else if (filterValue === 'detected') {
            return locationMatch && incident.status.toLowerCase().includes('detectado');
        } else if (filterValue === 'no_leak') {
            return locationMatch && incident.status.toLowerCase().includes('sem vazamento');
        }
    });
    renderIncidents(filteredIncidents);
}

function searchIncidents() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value.toLowerCase();
    const filteredIncidents = incidents.filter(incident => {
        const locationMatch = incident.location.toLowerCase().includes(searchTerm);
        const sensorIdMatch = incident.sensorId.toString().includes(searchTerm); 
        const leakTypeMatch = incident.leakType.toLowerCase().includes(searchTerm);
        const severityMatch = incident.severity.toLowerCase().includes(searchTerm);
        const statusMatch = incident.status.toLowerCase().includes(searchTerm);
        if (filterValue === 'all') {
            return locationMatch || sensorIdMatch || leakTypeMatch || severityMatch || statusMatch;
        } else if (filterValue === 'detected') {
            return (locationMatch || sensorIdMatch || leakTypeMatch || severityMatch || statusMatch) && incident.status.toLowerCase().includes('detectado');
        } else if (filterValue === 'no_leak') {
            return (locationMatch || sensorIdMatch || leakTypeMatch || severityMatch || statusMatch) && incident.status.toLowerCase().includes('sem vazamento');
        }
    });
    renderIncidents(filteredIncidents);
}

searchInput.addEventListener('input', searchIncidents);


filterSelect.addEventListener('change', filterIncidents);

window.updateIncident = function(id) {
    console.log(`Atualizando incidente com ID ${id}`);
};

window.deleteIncident = function(id) {
    console.log(`Excluindo incidente com ID ${id}`);
};

renderIncidents(incidents);
});