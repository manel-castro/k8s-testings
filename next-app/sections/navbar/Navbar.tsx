"use client";

import sp from "@/assets/sp.png";
import uk from "@/assets/uk.png";
import { Container } from "@/components/container.styled";
import { getIsMobile } from "@/utils/isMobile";
import { changeLocale } from "@/utils/locales";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LanguageSelector = ({
  currentLanguage,
  availableLanguages,
  selectLanguage,
}: {
  currentLanguage: string;
  availableLanguages: { name: string; image: React.JSX.Element }[];
  selectLanguage: (lang: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonBoundings, setButtonBoundings] = useState<DOMRect>();

  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonRef?.current) return;

    const boundings = buttonRef.current.getBoundingClientRect();
    setButtonBoundings(boundings);
  }, [buttonRef]);

  return (
    <>
      <div
        ref={buttonRef}
        style={{ height: 30, width: 30 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentLanguage}
      </div>
      {isOpen && buttonBoundings && (
        <div
          style={{
            position: "absolute",
            top: buttonBoundings.top + 30 + "px",
            right: "0px",
            backgroundColor: "white",
            zIndex: 2,
            width: 60,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
          }}
        >
          {availableLanguages.map((item, index) => (
            <div
              onClick={() => selectLanguage(item.name)}
              key={index}
              style={{ display: "flex", gap: 5 }}
            >
              {item.name}
              {item.image}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const NavbarSection = ({ locale }: { locale: string }) => {
  const isMobile = getIsMobile();

  const availableLanguages = [
    {
      name: "es",
      image: (
        <Image src={sp} width={30} height={20} alt="Picture of the author" />
      ),
    },
    {
      name: "en",
      image: (
        <Image src={uk} width={30} height={20} alt="Picture of the author" />
      ),
    },
  ];

  const router = useRouter();
  const onSelectLanguage = (lang: string) => {
    changeLocale(
      lang,
      availableLanguages.map((item) => item.name)
    );
  };

  return (
    <Container style={{ justifyContent: "space-between" }}>
      <div>Logo and menu</div>
      <div>
        <LanguageSelector
          currentLanguage={locale}
          availableLanguages={availableLanguages}
          selectLanguage={onSelectLanguage}
        />
      </div>
    </Container>
  );
};

export default NavbarSection;
