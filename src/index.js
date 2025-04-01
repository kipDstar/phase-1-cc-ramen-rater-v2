// index.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  main();
});

// Callbacks
const handleClick = (ramen) => {
  const ramenDetail = document.querySelector('#ramen-detail');
  ramenDetail.querySelector('h2').textContent = ramen.name;
  ramenDetail.querySelector('h3').textContent = ramen.restaurant;
  ramenDetail.querySelector('img').src = ramen.image;
  document.getElementById('rating-display').textContent = ramen.rating;
  document.getElementById('comment-display').textContent = ramen.comment;
};

const addSubmitListener = () => {
  const ramenForm = document.getElementById('new-ramen');
  ramenForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newRamen = {
      name: e.target.name.value || '',
      restaurant: e.target.restaurant.value || '',
      image: e.target.image.value || '',
      rating: e.target.rating.value || '',
      comment: e.target.comment.value || '',
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

    // Persist new ramen to the API
    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRamen),
    });
  });
};

const addEditListener = () => {
  const editForm = document.getElementById('edit-ramen');
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedRating = e.target['edit-rating'].value;
    const updatedComment = e.target['edit-comment'].value;

    // Update the DOM
    document.getElementById('rating-display').textContent = updatedRating;
    document.getElementById('comment-display').textContent = updatedComment;

    // Optionally persist changes
    const ramenId = currentRamen.id; // Assume currentRamen is globally tracked
    fetch(`http://localhost:3000/ramens/${ramenId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating: updatedRating,
        comment: updatedComment,
      }),
    });

    editForm.reset();
  });
};

const addDeleteListener = () => {
  const deleteButton = document.getElementById('delete-ramen');
  deleteButton.addEventListener('click', () => {
    const ramenDetail = document.querySelector('#ramen-detail');
    const ramenName = ramenDetail.querySelector('h2').textContent;

    const ramenMenu = document.querySelector('#ramen-menu');
    const ramenImages = ramenMenu.querySelectorAll('img');
    ramenImages.forEach((img) => {
      if (img.alt === ramenName) {
        ramenMenu.removeChild(img);
      }
    });

    ramenDetail.querySelector('h2').textContent = 'Insert Name Here';
    ramenDetail.querySelector('h3').textContent = 'Insert Restaurant Here';
    ramenDetail.querySelector('img').src = './assets/image-placeholder.jpg';
    document.getElementById('rating-display').textContent = 'Insert rating here';
    document.getElementById('comment-display').textContent = 'Insert comment here';

    // Optionally persist deletion
    const ramenId = currentRamen.id; // Assume currentRamen is globally tracked
    fetch(`http://localhost:3000/ramens/${ramenId}`, {
      method: 'DELETE',
    });
  });
};

const displayRamens = () => {
  //to fetch ramen menu from the API(virtual backend)and populate the menu and details
  fetch('http://localhost:3000/ramens')
    .then((response) => response.json())
    .then((ramenData) => {
      const ramenMenu = document.querySelector('#ramen-menu');
      ramenData.forEach((ramen, index) => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);

        if (index === 0) {
          handleClick(ramen);
        }
      });
    })
    .catch((error) => {
      console.error('Error fetching ramen data', error);
    });
};

const main = () => {
  displayRamens();
  addSubmitListener();
  addEditListener();
  addDeleteListener();
};

export {
  displayRamens,
  addSubmitListener,
  addEditListener,
  addDeleteListener,
  handleClick,
  main,
};
