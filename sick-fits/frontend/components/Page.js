import propTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
html{
	@font-face {
		font-family: 'Radnika';
		src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
	}
	--red: #ff0000;
	--black: #453939;
	--grey: #3a3a3a;
	--gray: var(--grey);
	--lightGrey: #e8e1e1;
	--lightGray: var(--lightGrey);
	--offWhite: #efeded;
	--maxWidth: 1000px;
	--bs: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
	box-sizing: border-box;
	*, *::before, *::after {
		box-sizing: inherit;
	}
	body {
		font-family: 'Radnika', --apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		padding: 0;
		margin: 0;
		font-size: 16px;
		line-height: 2;
	}
	a {
		text-decoration: none;
		color: var(--black);
	}
	a:hover {
		text-decoration: underline;
	}
	button {
		font-family: inherit;
	}
}`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
`;

export default function Page({ children, cool }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}

Page.propTypes = {
  cool: propTypes.string,
  children: propTypes.any,
};
