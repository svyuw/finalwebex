key = "-0JTRNCCsFkhfKh75c7P5lMSZUo15Mg9rhsHATyn3qA"


fetch("https://api.unsplash.com/photos/random?client_id=-0JTRNCCsFkhfKh75c7P5lMSZUo15Mg9rhsHATyn3qA")
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("error");
    }
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
