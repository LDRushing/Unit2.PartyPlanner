//Function to fetch party data from the API and render it
async function fetchAndRenderParties() {
    const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-PT-WEB-PT-A/events');
    const parties = await response.json();
    const partyList = document.getElementById('party-list');
    console.log("This is parties", parties);
    partyList.innerHTML = ''; // Clear existing list
//parties.data lets is see the API we're tied to. When we make a fetch request, the response is usually an object with elements associated with it. 
//console.log things to see what's going on in your code.
    parties.data.forEach(party => {
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
//Invoke methods with parenthesis. 
    const name = document.getElementById('name').value;
    const date = new Date(document.getElementById('date').value).toISOString();
    const time = document.getElementById('time').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;
//Catch is meant to catch exceptional errors like a lack of wifi. 
    const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-PT-WEB-PT-A/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, date, location, description }),
    });

    if (response.status === 201) {
        fetchAndRenderParties(); // Refresh the list after adding a new party
        return response;
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
console.log("This is before fetchAndRenderParties")
fetchAndRenderParties();