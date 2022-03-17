import React, { useState } from "react";
import styled from "styled-components";
import { MENU_ENTRY_HEIGHT } from "./config";
import { TopMenuEntry, LinkLabel } from "./TopMenuEntry";
import { PushedProps } from "./types";
import { ArrowDropDownIcon, ArrowDropUpIcon } from "../../components/Svg";

interface Props extends PushedProps {
  label: string;
  icon: React.ReactElement;
  initialOpenState?: boolean;
  className?: string;
  activeAccordion?: string;
  setActiveAccordion?: any;
}

const Container = styled.div`
  display: block;
  flex-direction: column;
  // Safari fix
  flex-shrink: 0;
  width : 120px;
`;

const AccordionContent = styled.div<{ isOpen: boolean; isPushed: boolean; maxHeight: number }>`
  max-height: ${({ isOpen, maxHeight }) => (isOpen ? `${maxHeight}px` : 0)};
  &:hover {
    ${({ maxHeight }) => `${maxHeight}px`};
  }
  position:absolute;
  top:100;
  transition: max-height 0.3s ease-out;
  overflow: hidden;
  border-color: ${({ isOpen, isPushed }) => (isOpen && isPushed ? "rgba(133, 133, 133, 0.1)" : "none")};
  border-style: solid;
  border-bottom-radius : 6px;
  width : 120px;
`;

const Accordion: React.FC<Props> = ({
  label,
  icon,
  isPushed,
  pushNav,
  initialOpenState = false,
  children,
  className,
  activeAccordion,
  setActiveAccordion
}) => {
  const [isOpen, setIsOpen] = useState(initialOpenState);

  const handleClick = () => {
    if (label === activeAccordion) {
      setActiveAccordion('')
      setIsOpen((prevState) => !prevState);
    } else {
      setActiveAccordion(label)
    }
  };

  return (
    <Container>
      <TopMenuEntry onClick={handleClick} className={className} onMouseOver={() => setActiveAccordion(label)} onMouseLeave={() => setActiveAccordion('')}>
        {icon}
        <LinkLabel isPushed={isPushed}>{label}</LinkLabel>
        {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </TopMenuEntry>
      <AccordionContent onMouseOver={() => setActiveAccordion(label)} onMouseLeave={() => setActiveAccordion('')}
        isOpen={activeAccordion === label}
        isPushed={isPushed}
        maxHeight={React.Children.count(children) * MENU_ENTRY_HEIGHT}
      >
        {children}
      </AccordionContent>
    </Container>
  );
};

export default Accordion;
