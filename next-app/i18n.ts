import i18next from "i18next";

i18next.init(
  {
    lng: "en",
    debug: true,
    resources: {
      en: {
        translation: {
          key: "hello world",
        },
      },
    },
  },
  function (err, t) {
    // initialized and ready to go!
    console.log("Ready to go!");
  }
);

module.exports = {
  locales: ["en", "es"],
  defaultLocale: "en-US",
};
