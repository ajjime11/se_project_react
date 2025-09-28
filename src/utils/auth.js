import { getBaseUrl, checkResponse } from "./api";

export const register = (data) => {
  return fetch(`${getBaseUrl()}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      avatar: data.avatar,
      email: data.email,
      password: data.password,
    }),
  }).then(checkResponse);
};

export const login = (data) => {
  return fetch(`${getBaseUrl()}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  }).then(checkResponse);
};

export const checkToken = (token) => {
  const jwt = token || localStorage.getItem("jwt");
  return fetch(`${getBaseUrl()}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
};
