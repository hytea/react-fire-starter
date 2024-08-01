import { ReactNode, useState } from "react";

import "./Accordion.css";

interface AccordionProps {
  title: string;
  content?: string;
  children?: ReactNode;
}

export function Accordion({ title, content, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const computeAccordionClassName = () => {
    return `accordion ${isOpen ? "open" : ""}`;
  };

  return (
    <div className={computeAccordionClassName()}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{title}</h3>
        <span id="open-indicator">{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <div className="accordion-content">{children || content}</div>}
    </div>
  );
}
