const baseUrl =
  import.meta.env.MODE === "production"
    ? "https://api.ajjime11-what-to-wear.crabdance.com"
    : "http://localhost:3001";

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
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const addItem = (item) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
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
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const likeItem = (id) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const dislikeItem = (id) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const updateUserProfile = (data) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: data.name,
      avatar: data.avatar,
    }),
  }).then(checkResponse);
};
