/// @ts-check
import { styled } from "linaria/lib/react";
import { CodeExample, CodeExampleWithPreview } from "./CodeExample";
import "./Theme";
import { theme, ThemeSwitch } from "./Theme";
import Head from 'next/head';

const HeaderWrapper = styled.header`
  background: ${theme.colors.backgroundSecondary.val};
  position: fixed;
  top: 0;
  width: 100%;
  padding: 5px 10px;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: auto max-content max-content max-content;
  grid-template-rows: 1fr;
  gap: 10px;
  color: ${theme.colors.base.val};
  align-items: end;
  max-width: 1200px;
  margin: 0 auto;
`;

const TextLogo = styled.h1`
  font-size: 18px;
  margin: 0;
  letter-spacing: -1px;
`;

const HeaderLink = styled.a`
  font-size: 14px;
  color: ${theme.colors.base.val};
  text-decoration: none;
`;

const Main = styled.main`
  padding: 80px 10px 50px;
  width: min-content;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacings.m.val};
`;

const Gradient = styled.div`
  position: relative;
  z-index: -1;
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-image: radial-gradient(at -20% 0%, ${theme.colors.backgroundSecondary.val} -20%, #2551b0 65%, ${theme.colors.backgroundPrimary.val} 110%);
    height: 400px;
  }
`;

const Intro = styled.h2`
  font-size: 20px;
  color: ${theme.colors.base.val};
  text-align: center;
`;

const Headline = styled.h2`
  font-size: 18px;
  color: ${theme.colors.base.val};
  margin: ${theme.spacings.m.val} 0 ${theme.spacings.s.val} 0;
`;

const Text = styled.p`
  font-size: 16px;
  color: ${theme.colors.base.val};
  margin: 0 0 ${theme.spacings.m.val} 0;
`;

const Index = () => (
  <>
    <Head>
      <link rel="shortcut icon" href="/static/favicon.png" />
    </Head>
    <HeaderWrapper>
      <Header>
        <TextLogo>CSS Variable</TextLogo>
        <HeaderLink href="/documentation">Documentation</HeaderLink>
        <HeaderLink href="https://github.com/jantimon/css-variable">
          Github
        </HeaderLink>
        <ThemeSwitch />
      </Header>
    </HeaderWrapper>
    <Gradient />
    <Main>
      <Intro>
        Typesafe CSS Variable definitions for your CSS-in-JS solution
      </Intro>

      <CodeExample>
        {`
import { CSSVariable } from 'css-variable';

export const theme = {
  primary: new CSSVariable(),
  secondary: new CSSVariable(),
}
`}
      </CodeExample>

      <CodeExample>
        {`
import { theme } from './theme' 

export const Headline = styled.h1\`
  color: \${theme.primary};
\`;
        `}
      </CodeExample>

      <Headline>Export CSSVariables with your components</Headline>
      <Text>
        CSSVariables allow you to make a component stylable without css
        overwrites
      </Text>

      <CodeExampleWithPreview preview={`
import { CSSVariable } from 'css-variable';

export const color = new CSSVariable("--1isaui4-0", {value: "#3a5779"});
export const hoverColor = new CSSVariable("--1isaui4-1", {value: "#23374e"});

export const Button = styled.button\`
  color: var(--1isaui4-0, #3a5779);
  :hover { 
    color: var(--1isaui4-1, #23374e);
  }
\`;
      `}>
        {`
import { CSSVariable } from 'css-variable';

export const color = new CSSVariable({value: "#3a5779"});
export const hoverColor = new CSSVariable({value: "#23374e"});

export const Button = styled.button\`
  color: \${color};
  :hover { 
    color: \${hoverColor};
  }
\`;
        `}
      </CodeExampleWithPreview>

      <Headline>Modify CSSVariables</Headline>
      <Text>Set values of your CSS Variables in wrapper components</Text>
      <CodeExampleWithPreview preview={`
import { Button, color, hoverColor } from './Button'

export const Teaser = styled.button\`
  background: #C2E7DA;

  --1isaui4-0: #3a5779;
  --1isaui4-1: #23374e;

  @media (prefers-color-scheme: dark) {
    background: #23374e;
    --1isaui4-0: #5886bb;
    --1isaui4-1: #679cda;
  }
\`

export const TeaserDark = styled.button\`
  background: #23374e;

  --1isaui4-0: #5886bb;
  --1isaui4-1: #679cda;

  @media (prefers-color-scheme: dark) {
    background: #C2E7DA;
    --1isaui4-0: #3a5779;
    --1isaui4-1: #23374e;
  }
\`
      `}>
        {`
import { Button, color, hoverColor } from './Button'

export const Teaser = styled.button\`
  background: #C2E7DA;

  \${color.createStyle("#3a5779")};
  \${hoverColor.createStyle("#23374e")};

  @media (prefers-color-scheme: dark) {
    background: #23374e;
    \${color.createStyle("#5886bb")};
    \${hoverColor.createStyle("#679cda")};
  }
\`

export const TeaserDark = styled.button\`
  background: #23374e;

  \${color.createStyle("#5886bb")};
  \${hoverColor.createStyle("#679cda")};

  @media (prefers-color-scheme: dark) {
    background: #C2E7DA;
    \${color.createStyle("#3a5779")};
    \${hoverColor.createStyle("#23374e")};
  }
\`
        `}
      </CodeExampleWithPreview>

      <Headline>Use CSSVariables for themes</Headline>
      <Text>Set values of your CSS Variables in wrapper components</Text>
      <CodeExampleWithPreview preview={`
import { CSSVariable, serializeThemeValues } from 'css-variable';

export const theme = {
  primary: new CSSVariable("--1isaui4-0"),
  secondary: new CSSVariable("--1isaui4-1"),
};

const lightThemeCSS = \`
  --1isaui4-0: #3a5779;
  --1isaui4-1: #23374e;
\`;

const darkThemeCSS = \`
  --1isaui4-0: #6191c9;
  --1isaui4-1: #4d79aa;
\`;
        `}>
        {`
import { CSSVariable, serializeThemeValues } from 'css-variable';

export const theme = {
  primary: new CSSVariable(),
  secondary: new CSSVariable(),
};

const lightThemeCSS = serializeThemeValues(theme, {
  primary: "#3a5779",
  secondary: "#23374e"
});

const darkThemeCSS = serializeThemeValues(theme, {
  primary: "#6191c9",
  secondary: "#4d79aa"
});
`}
      </CodeExampleWithPreview>

      <Headline>Unique and consistent variable names</Headline>
      <Text>
        The optional babel plugin generates unique variable names during build
        time
      </Text>
      <CodeExample>
        {`
{
  "plugins": [
      "css-variable/babel"
  ]
}`}
      </CodeExample>
    </Main>
  </>
);

export default Index;
