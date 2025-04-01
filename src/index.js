// index.js

// Callbacks
const handleClick = (ramen) => {
  const ramenDetail = document.querySelector('#ramen-detail');
  ramenDetail.querySelector('h2').textContent = ramen.name;
  ramenDetail.querySelector('h3').textContent = ramen.restaurant;
  ramenDetail.querySelector('img').src = ramen.image;
};

const addSubmitListener = () => {
  const ramenForm = document.getElementById('new-ramen');
  ramenForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newRamen = {
      name: e.target.name.value,
      restaurant: e.target.restaurant.value, 
      image: e.target.image.value,
      rating: e.target.rating.value,
      comment: e.target.comment.value,
    };

    // Add new ramen to the menu
    const ramenMenu = document.querySelector('#ramen-menu'); 
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick(newRamen));
    ramenMenu.appendChild(img);

    // Reset the form
    ramenForm.reset();

    // Optionally send new ramen data to the API
    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRamen),
    });
  });
};

const displayRamens = () => {
  //to fetch ramen menu from the API(virtual backend)and populate the menu and details
  fetch('http://localhost:3000/ramens')
    .then((response) => response.json())
    .then((ramenData) => {
      const ramenMenu = document.querySelector('#ramen-menu');
      ramenData.forEach((ramen) => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });
    })
    .catch((error) => {
      console.error('Error fetching ramen data', error);
    });
};

const main = () => {
  // Invoke displayRamens here
  displayRamens();
  // Invoke addSubmitListener here
  addSubmitListener();
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
