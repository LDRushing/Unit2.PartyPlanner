//Function to fetch party data from the API and render it
async function fetchAndRenderParties() {
    const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-PT-WEB-PT-A/events');
    const parties = await response.json();
    const partyList = document.getElementById('party-list');

    partyList.innerHTML = ''; // Clear existing list

    parties.forEach(party => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <b>Name:</b> ${party.name}</br>
            <b>Date:</b> ${party.date}</br>
            <b>Time:</b> ${party.time}</br>
            <b>Location:</b> ${party.location}</br>
            <b>Description:</b> ${party.description}</br>
            <button data-id="${party.id}" class="delete-button">Delete</button>
        `;

        partyList.appendChild(listItem);
    });
}

// Event listener for the party form submission
document.getElementById('party-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;

    const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-PT-WEB-PT-A/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, date, time, location, description }),
    });

    if (response.status === 201) {
        fetchAndRenderParties(); // Refresh the list after adding a new party
    }

    document.getElementById('party-form').reset(); // Reset the form
});

//Event listener for delete buttons
document.getElementById('party-list').addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-button')) {
        const partyId = event.target.getAttribute('data-id');
        const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-PT-WEB-PT-A/events/${partyId}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            fetchAndRenderParties(); // Refresh the list after deleting a party
        }
    }
});
fetchAndRenderParties();