const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'Qq0X7wws0ZfqyPTrTrcmFQPQh4Z-yGOUdWAYJcAPrsw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imageLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

//Helper function to set attributes on dom elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for links and photos, add to dom
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');

    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank'); //open in new window
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    //Create <img> for photo
    const img = document.createElement('img');

    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.exif.name);
    // img.setAttribute('title', photo.exif.name);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.exif.name,
      title: photo.exif.name,
    });

    //Event listener check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
// On Load
getPhotos();
