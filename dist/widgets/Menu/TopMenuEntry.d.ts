import { DefaultTheme } from "styled-components";
export interface Props {
    secondary?: boolean;
    isActive?: boolean;
    theme: DefaultTheme;
}
declare const LinkLabel: import("styled-components").StyledComponent<"div", DefaultTheme, {
    isPushed: boolean;
}, never>;
declare const TopMenuEntry: import("styled-components").StyledComponent<"div", DefaultTheme, Props, never>;
export { TopMenuEntry, LinkLabel };
