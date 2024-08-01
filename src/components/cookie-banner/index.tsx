import { useCookieConsentContext } from "@use-cookie-consent/react";
import { useEffect, useRef } from "react";

import { Accordion } from "#/components/accordion";

import "./CookieBanner.css";

export function CookieBanner() {
  const { acceptAllCookies, declineAllCookies, acceptCookies } =
    useCookieConsentContext();
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        bannerRef.current &&
        !bannerRef.current.contains(event.target as Node)
      ) {
        acceptAllCookies();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [acceptAllCookies]);

  return (
    <div ref={bannerRef} className="cookie-banner">
      <p className="cookie-banner-text">
        We use cookies to enhance your experience, analyze traffic, and
        personalize content. By default, cookies are enabled. You can manage
        your preferences to adjust your settings.
      </p>
      <div className="cookie-banner-buttons">
        <button className="primary" onClick={acceptAllCookies}>
          Accept All
        </button>
        <button onClick={() => acceptCookies({ firstParty: true })}>
          Accept Only Essential
        </button>
      </div>
      <Accordion title="More Options">
        <button onClick={() => acceptCookies({ thirdParty: true })}>
          Accept Third-Party Only
        </button>
        <button onClick={declineAllCookies}>Reject All</button>
      </Accordion>
    </div>
  );
}
