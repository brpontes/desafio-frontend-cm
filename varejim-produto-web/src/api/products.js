const { VUE_APP_HOST_API_URL, VUE_APP_HOST_API_PORT } = process.env;
const baseUrl = `${VUE_APP_HOST_API_URL}:${VUE_APP_HOST_API_PORT}/produtos`;
const headers = { "Accept": "application/json", "Content-Type": "application/json" };

export function getProducts(start) {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}?start=${start}`)
      .then(response => resolve(response.json()))
      .catch(error => reject(error));
  });
}

export function getFilteredProducts(filter) {
  const fieldToSearch = isNaN(filter) ? "descricao" : "id";
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}?${fieldToSearch}=${filter}`)
      .then(response => resolve(response.json()))
      .catch(error => reject(error));
  });
}

export function addProduct(product) {
  return new Promise((resolve, reject) => {
    fetch(baseUrl, {
      headers,
      method: "POST",
      body: JSON.stringify(product)
    })
      .then(response => resolve(response.json()))
      .catch(error => reject(error));
  });
}

export function getProductById(id) {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/${id}`)
      .then(response => resolve(response.json()))
      .catch(error => reject(error));
  });
}

export function editProductById(form) {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/${form.id}`, {
      headers,
      method: "PUT",
      body: JSON.stringify(form)
    })
      .then(response => resolve(response.json()))
      .catch(error => reject(error));
  });
}

export function deleteProductById(id) {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/${id}`, {
      headers,
      method: "DELETE",
      body: JSON.stringify({ id })
    })
      .then(response => resolve(response.json()))
      .catch(error => reject(error));
  });
}
