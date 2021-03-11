const { VUE_APP_HOST_API_URL, VUE_APP_HOST_API_PORT } = process.env;
const baseUrl = `${VUE_APP_HOST_API_URL}:${VUE_APP_HOST_API_PORT}/secoes`;

export function getSections() {
  return new Promise((resolve, reject) => {
    fetch(baseUrl)
      .then(async response => resolve(response.json()))
      .catch(error => reject(error));
  });
}
