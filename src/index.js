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
  const ramenMenu = document.getElementById('ramen-menu');
  
}

const displayRamens = () => {
  // Add code
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
