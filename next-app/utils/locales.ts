"use client";

export const locales = ["en", "es"];

export const changeLocale = async (
  lang: string,
  availableLocales: string[]
) => {
  console.log("selectedlanguage: ", lang);

  // redirect("http://localhost:3000/about");

  let currentPathname = window.location.pathname;

  for (const availableLocale of availableLocales) {
    if (currentPathname.includes(`/${availableLocale}`)) {
      currentPathname = currentPathname.replace(
        `/${availableLocale}`,
        `/${lang}`
      );
      console.log(
        "currentPathname inside: ",
        window.location.origin + currentPathname
      );
      return window.location.replace(currentPathname);
    }
  }
  currentPathname = "/" + lang + currentPathname;

  console.log("currentPathname outside: ", currentPathname);
  return window.location.replace(currentPathname);
};
