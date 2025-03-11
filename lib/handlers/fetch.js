import { RequestError } from "../http-errors";
import handleError from "./error";

function isError(error) {
  return error instanceof Error;
}

export async function fetchHandler(url, options = {}) {
  const {
    timeout = 30000,
    headers: customHeaders = {},
    ...restOptions
  } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers = { ...defaultHeaders, ...customHeaders };
  const config = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);

    clearTimeout(id);

    if (!response.ok) {
      throw new RequestError(response.status, `HTTP error: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error("Unknown error");

    if (error.name === "AbortError") {
      console.log(`Request to ${url} timed out`);
    } else {
      console.log(`Error fetching ${url}: ${error.message}`);
    }

    return handleError(error);
  }
}
