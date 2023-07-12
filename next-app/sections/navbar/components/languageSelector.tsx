"use client";

import { changeLocale } from "@/utils/locales";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

const LanguageSelector = ({
  currentLanguage,
  availableLanguages,
}: {
  currentLanguage: string;
  availableLanguages: { name: string; image: React.JSX.Element }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonBoundings, setButtonBoundings] = useState<DOMRect>();

  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonRef?.current) return;

    const boundings = buttonRef.current.getBoundingClientRect();
    setButtonBoundings(boundings);
  }, [buttonRef]);

  const onSelectLanguage = (lang: string) => {
    changeLocale(
      lang,
      availableLanguages.map((item) => item.name)
    );
  };

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
            opacity: 0.2,
            backgroundColor: "black",
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
          }}
          onClick={() => setIsOpen(false)}
        >
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
              <LanguageItem
                onClick={() => onSelectLanguage(item.name)}
                key={index}
              >
                {item.name}
                {item.image}
              </LanguageItem>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const LanguageItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;

  width: 100%;

  &:hover {
    background-color: slateblue;
    color: white;
  }
`;
export default LanguageSelector;
