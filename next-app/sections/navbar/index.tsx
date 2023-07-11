import { useLocale } from "next-intl";

import NavbarSection from "./Navbar";

export default async function Navbar({ locale }: { locale: string }) {
  //eslint-disable-next-line

  return <NavbarSection locale={locale} />;
}
