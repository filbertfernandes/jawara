import { fetchHandler } from "./handlers/fetch";

import ROUTES from "@/constants/routes";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const api = {
  auth: {
    oAuthSignIn: ({ user, provider, providerAccountId }) =>
      fetchHandler(`${API_BASE_URL}/auth/${ROUTES.SIGN_IN_WITH_OAUTH}`, {
        method: "POST",
        body: JSON.stringify({ user, provider, providerAccountId }),
      }),
  },
  users: {
    getAll: () => fetchHandler(`${API_BASE_URL}/users`),
    getById: (id) => fetchHandler(`${API_BASE_URL}/users/${id}`),
    getByEmail: (email) =>
      fetchHandler(`${API_BASE_URL}/users/email`, {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    create: (userData) =>
      fetchHandler(`${API_BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    update: (id, userData) =>
      fetchHandler(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      }),
    delete: (id) =>
      fetchHandler(`${API_BASE_URL}/users/${id}`, { method: "DELETE" }),
  },
  accounts: {
    getAll: () => fetchHandler(`${API_BASE_URL}/accounts`),
    getById: (id) => fetchHandler(`${API_BASE_URL}/accounts/${id}`),
    getByProvider: (providerAccountId) =>
      fetchHandler(`${API_BASE_URL}/accounts/provider`, {
        method: "POST",
        body: JSON.stringify({ providerAccountId }),
      }),
    create: (accountData) =>
      fetchHandler(`${API_BASE_URL}/accounts`, {
        method: "POST",
        body: JSON.stringify(accountData),
      }),
    update: (id, accountData) =>
      fetchHandler(`${API_BASE_URL}/accounts/${id}`, {
        method: "PUT",
        body: JSON.stringify(accountData),
      }),
    delete: (id) =>
      fetchHandler(`${API_BASE_URL}/accounts/${id}`, { method: "DELETE" }),
  },
  ai: {
    generateSentence: (prompt) =>
      fetchHandler(`https://api.openai.com/v1/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant.",
            },
            {
              role: "user",
              content: `${prompt}`,
            },
          ],
        }),
      }),
  },
};
