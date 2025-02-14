import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // Retrieve the language cookie once and store it in a variable
  const cookieStore = await cookies();
  const languageCookie = cookieStore.get("language"); // Store the result

  // Use the stored cookie value to determine locale
  const locale = languageCookie?.value || "en"; // Default to English

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
