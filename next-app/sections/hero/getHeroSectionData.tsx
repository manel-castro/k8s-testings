"use server";

import axios from "axios";

export const getHeroSectionData = () => {
  const heroData = axios
    .get(process.env.NEXT_PUBLIC_BE_PAGES_HOST + "/pages/HERO")
    .then((data) => data.data[0].data);

  return heroData;
};
