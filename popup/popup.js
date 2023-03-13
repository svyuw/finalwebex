const checkbox = document.getElementById("enable");
const addPagePet = document.getElementById("add-block");
const textInput = document.getElementById("gif-search");
const gifContainer = document.querySelector(".gif-container");
const submitSearch = document.getElementById("submit-search");
const selectedImage = document.querySelector(".selected-image");
const selectedImageConatiner = document.querySelector(
  ".selected-image-container"
);
 
// Add event listeners to the checkbox and button
checkbox.addEventListener("change", (e) => updateContentScript("NOSHOW"));
addPagePet.addEventListener("click", (e) => updateContentScript("ADDPET"));
submitSearch.addEventListener("click", (e) => {
  renderGifs(textInput.value);
});
 
async function getTenorImages(query) {
  const url = `https://sessions.teleparty.com/search-gifs?q=${query}&locale=en-US`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
 
async function renderGifs(query) {
  const gifs = await getTenorImages(query);
  gifContainer.innerHTML = "";
  console.log(gifs)
  for (const gif of gifs.results) {
    const gifElement = document.createElement("img");
    gifElement.src = gif.media.fullMobile.url;
    gifElement.classList.add("gif");
    gifElement.addEventListener("click", (e) => {
      updateContentScript("CHANGEIMAGE", gif.media.fullMobile.url);
      selectedImageConatiner.classList.remove("hidden");
      selectedImage.src = gif.media.fullMobile.url;
    });
    gifContainer.appendChild(gifElement);
  }
}
renderGifs("dog");
 
async function updateContentScript(messageType, url) {
  // Sends a message to the content script with an object that has the
  // current value of the checkbox and a boolean (whether to add a block)
  const message = {
    enable: checkbox.checked,
    messageType: messageType,
    url: url,
  };
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, message);
  // You can do something with response from the content script here
  console.log(response);
}
 