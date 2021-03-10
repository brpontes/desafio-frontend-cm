export function getSections() {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/secoes`)
      .then(async response => resolve(response.json()))
      .catch(error => reject(error));
  });
}
