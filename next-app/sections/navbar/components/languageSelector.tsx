"use client";

import { changeLocale } from "@/utils/locales";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Cross1Icon } from "@radix-ui/react-icons";

const LanguageSelector = ({
  currentLanguage,
  availableLanguages,
}: {
  currentLanguage: string;
  availableLanguages: {
    name: string;
    code: string;
    image: React.JSX.Element;
  }[];
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
      availableLanguages.map((item) => item.code)
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
            backgroundColor: "rgba(0,0,0,0.2)",
            height: "100vh",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: 20,
              width: "100%",
              maxWidth: "1000px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Select Your Language</div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setIsOpen(false)}
              >
                <Cross1Icon height={20} width={20} />
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridGap: "2em",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              }}
            >
              {availableLanguages.map((item, index) => (
                <LanguageItem
                  onClick={() => onSelectLanguage(item.code)}
                  key={index}
                >
                  {item.name}
                  {item.image}
                </LanguageItem>
              ))}
            </div>
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
