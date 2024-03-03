// index.js
const ramenDetail = document.querySelector('div#ramen-detail')
const imageDetail = ramenDetail.querySelector('img')
const ramenName = ramenDetail.querySelector('h2')
const restaurant = ramenDetail.querySelector('h3')
const ramenRating = document.querySelector('span#rating-display')
const ramenComment = document.querySelector('p#comment-display')
const newComment = document.querySelector('textarea#new-comment')

// Callbacks
const handleClick = (img, food) => {
  img.addEventListener('click', () => fillRamenDetail(food))
};

const addSubmitListener = () => {
  const form = document.querySelector('form#new-ramen')
  form.addEventListener('submit', e => {
    e.preventDefault()
    let newRamen = {
      name: e.target.name.value,
      restaurant: e.target.restaurant.value,
      image: e.target.image.value,
      rating: e.target.rating.value,
      comment: newComment.value
    }
    addDataToBackEnd(newRamen)
  })
}

const addDataToBackEnd = ramen => {
  fetch('http://localhost:3000/ramens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(ramen)
  }).then(res => res.json)
  .then(newRamen => console.log(newRamen))
  .catch(error => console.log(error.message))
}

const fillRamenDetail = ramen => {
  imageDetail.src = ramen.image
  ramenName.textContent = ramen.name
  restaurant.textContent = ramen.restaurant
  ramenRating.nextSibling.textContent = ` ${ramen.rating}/10`
  ramenComment.textContent = ramen.comment
}

const renderAllRamens = list => list.forEach(ramen => renderOneRamen(ramen))

const renderOneRamen = ramen => {
  const ramenMenu = document.querySelector('div#ramen-menu')
  const image = document.createElement('img')
  image.src = ramen.image
  handleClick(image, ramen)
  ramenMenu.appendChild(image)
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
  .then(res => res.json())
  .then(ramens => {
    console.log(ramens)
    fillRamenDetail(ramens[0])
    renderAllRamens(ramens)
  })
};

const main = () => {
  displayRamens()
  addSubmitListener()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
