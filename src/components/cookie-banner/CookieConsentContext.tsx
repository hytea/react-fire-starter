// CookieConsentContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

interface CookieConsent {
  firstParty?: boolean;
  thirdParty?: boolean;
}

interface CookieConsentContextProps {
  consent: CookieConsent;
  acceptAllCookies: () => void;
  acceptCookies: (consent: CookieConsent) => void;
  declineAllCookies: () => void;
}

const CookieConsentContext = createContext<
  CookieConsentContextProps | undefined
>(undefined);

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [consent, setConsent] = useState<CookieConsent>(() => {
    const savedConsent = localStorage.getItem("cookieConsent");
    return savedConsent
      ? JSON.parse(savedConsent)
      : { firstParty: undefined, thirdParty: undefined };
  });

  useEffect(() => {
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
  }, [consent]);

  const acceptAllCookies = () =>
    setConsent({ firstParty: true, thirdParty: true });
  const acceptCookies = (newConsent: CookieConsent) => setConsent(newConsent);
  const declineAllCookies = () =>
    setConsent({ firstParty: false, thirdParty: false });

  return (
    <CookieConsentContext.Provider
      value={{ consent, acceptAllCookies, acceptCookies, declineAllCookies }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsentContext = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsentContext must be used within a CookieConsentProvider",
    );
  }
  return context;
};
