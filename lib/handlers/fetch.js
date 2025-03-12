import { RequestError } from "../http-errors";
import handleError from "./error";

function isError(error) {
  return error instanceof Error;
}

export async function fetchHandler(url, options = {}) {
  console.log(`INFO: Fetch request started for ${url}`);

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
    console.log(`INFO: Fetching ${url} with options`, config);
    const response = await fetch(url, config);

    clearTimeout(id);

    if (!response.ok) {
      throw new RequestError(response.status, `HTTP error: ${response.status}`);
    }

    console.log(`INFO: Successfully fetched ${url}`);
    return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error("Unknown error");

    if (error.name === "AbortError") {
      console.error(`ERROR: Request to ${url} timed out`);
    } else {
      console.error(`ERROR: Error fetching ${url}: ${error.message}`);
    }

    return handleError(error);
  }
}
