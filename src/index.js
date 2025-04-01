// index.js

// Callbacks
const handleClick = (ramen) => {
  const handleclick = (ramen) => {
    document.querySelector('#ramen-menu img').addEventListener('click', (e) => {
      // Assuming 'ramen' contains details about the clicked ramen
      document.querySelector('#ramen-detail h2').textContent = ramen.name;
      document.querySelector('#ramen-detail h3').textContent = ramen.restaurant;
      document.querySelector('#ramen-detail img').src = ramen.image;
    });
  };
};

const addSubmitListener = () => {
  const ramenForm = document.getElementById('new-ramen');
  ramenForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newRamen = {
      name: e.target.name.value,
      restarunt: e.target.restaurant.value,
      image: e.target.image.value,
      rating: e.target.rating.value,
      comment: e.target.comment.value,
    };

    //to add new ramen to the menu
    const ramenMenu = document.querySelector('#new-ramen');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => {
      handleClick(newRamen)});
    ramenMenu.appendChild(img);
    //to reset the form
    ramenForm.reset();

    //option to send new ramen data to API
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
    ,then((ramenData) => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramenData.forEach((ramen) => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);
      })
    })
    .catch((error) => {
      console.error('Error fetching ramen data', error);
    })
};

const main = () => {
  // Invoke displayRamens here
  
  // Invoke addSubmitListener here
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
