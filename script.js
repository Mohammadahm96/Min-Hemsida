const carForm = document.getElementById('comment-form');

carForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addCar();
  carForm.reset();
});

async function addCar() {
  const carData = {
    year: document.getElementById('year-input').value,
    make: document.getElementById('make-input').value,
    model: document.getElementById('model-input').value,
    owner: document.getElementById('owner-input').value
  };

  const response = await fetch('/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData)
  });

  if (response.ok) {
    console.log('Car added successfully');
    getCarRegistrations();
  } else {
    console.error('Failed to add car');
  }
}

async function getCarRegistrations() {
  const response = await fetch('/cars');
  const data = await response.json();

  const tableBody = document.getElementById('comments-table-body');
  tableBody.innerHTML = '';

  data.forEach(car => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${car.year}</td>
      <td>${car.make}</td>
      <td>${car.model}</td>
      <td>${car.owner}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Get initial car registrations on page load
getCarRegistrations();
