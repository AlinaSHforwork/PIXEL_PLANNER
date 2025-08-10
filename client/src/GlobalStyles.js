// client/src/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'PixelatedFont';
    src: url('/fonts/your-pixel-font.ttf'); /* You'll need to add a pixel font to the public/fonts directory */
  }

  body {
    background-color: #3b0e5c; /* Dark purple */
    color: #f7d5ff; /* Light pink/purple */
    font-family: 'PixelatedFont', monospace;
    image-rendering: pixelated;
    margin: 0;
    padding: 0;
  }

  /* General pixelated button and input styles */
  .pixel-button {
    background-color: #ff69b4; /* Hot pink */
    border: 2px solid #a83b6b;
    color: #fff;
    padding: 8px 16px;
    cursor: pointer;
    box-shadow: 3px 3px 0px #a83b6b;
    transition: all 0.1s ease;
  }

  .pixel-button:active {
    box-shadow: none;
    transform: translate(3px, 3px);
  }

  .pixel-input {
    background-color: #5c188e; /* Lighter purple */
    border: 2px solid #8e2baf;
    color: #fff;
    padding: 8px;
  }
`;

export default GlobalStyles;