export const getBaseUrl = () => {
  return "http://localhost:3001";
};

export const checkResponse = async (res) => {
  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();

  if (res.ok) {
    if (contentType.includes("application/json")) {
      try {
        return JSON.parse(text);
      } catch (e) {
        return Promise.reject(
          new Error(
            `Invalid JSON response from ${res.url}: ${text.slice(0, 200)}`
          )
        );
      }
    }

    return Promise.reject(
      new Error(
        `Expected JSON but received '${contentType || "unknown"}' from ${
          res.url
        }: ${text.slice(0, 200)}`
      )
    );
  }

  if (contentType.includes("application/json")) {
    try {
      const data = JSON.parse(text);
      return Promise.reject(data);
    } catch (e) {
      return Promise.reject(
        new Error(`Error ${res.status} from ${res.url}: ${text}`)
      );
    }
  }

  return Promise.reject(
    new Error(`Error ${res.status} from ${res.url}: ${text}`)
  );
};

export const getInitialCards = () => {
  const token = localStorage.getItem("jwt");
  return fetch(`${getBaseUrl()}/items`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const addItem = (item) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${getBaseUrl()}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(checkResponse);
};

export const deleteItem = (id) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${getBaseUrl()}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
