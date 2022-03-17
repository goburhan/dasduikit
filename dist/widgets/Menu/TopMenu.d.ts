import React from "react";
import { TopMenuProps, PushedProps } from "./types";
interface Props extends TopMenuProps, PushedProps {
    isMobile: boolean;
}
declare const TopMenu: React.FC<Props>;
export default TopMenu;
