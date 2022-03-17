import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { SvgProps } from "../../components/Svg";
import * as IconModule from "./icons";
import TopAccordion from "./TopAccordion";
import { TopMenuEntry, LinkLabel } from "./TopMenuEntry";
import MenuLink from "./MenuLink";
import { TopMenuProps, PushedProps } from "./types";

interface Props extends TopMenuProps, PushedProps {
  isMobile: boolean;
}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items : center;
  overflow-y: hidden;
  overflow-x: hidden;
  height: 100%;
`;

const TopMenu: React.FC<Props> = ({ isPushed, pushNav, isMobile, links }) => {
  const location = useLocation();
  const [showAccordion, setShowAccordion] = useState();
  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;
  return (
    <Container style={isMobile ? {display : 'none'} : {display : 'flex'}}>
      {links.map((entry) => {
        const Icon = Icons[entry.icon];
        const iconElement = <Icon width="24px" mr="8px" />;
        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;

        if (entry.items) {
          return (
            <TopAccordion
              key={entry.label}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={iconElement}
              label={entry.label}
              initialOpenState={entry.initialOpenState}
              className={calloutClass}
              activeAccordion={showAccordion}
              setActiveAccordion={setShowAccordion}
            >
              {isPushed &&
                entry.items.map((item) => (
                  <TopMenuEntry key={item.href} secondary isActive={item.href === location.pathname} onClick={handleClick}>
                    <MenuLink href={item.href}>{item.label}</MenuLink>
                  </TopMenuEntry>
                ))}
            </TopAccordion>
          );
        }
        return (
          <TopMenuEntry key={entry.label} isActive={entry.href === location.pathname} className={calloutClass}>
            <MenuLink href={entry.href} onClick={handleClick}>
              {iconElement}
              <LinkLabel isPushed={isPushed}>{entry.label}</LinkLabel>
            </MenuLink>
          </TopMenuEntry>
        );
      })}
    </Container>
  );
};

export default TopMenu;