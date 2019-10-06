import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased
  }

  body, input, button, textarea {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  //react-datepicker formatting
  form {
    .react-datepicker-wrapper,
    .react-datepicker__input-container {
      display: flex;
      flex: 1;

      input {
        max-width: 940px;
        flex: 1;
      }
    }

    .react-datepicker-wrapper,
    .react-datepicker-popper {
      .react-datepicker__day--selected {
        background: #f94d6a;
      }

      .react-datepicker__day--keyboard-selected {
        background: #f94d6a;
      }

      .react-datepicker__time-container
      .react-datepicker__time
      .react-datepicker__time-box
      ul.react-datepicker__time-list
      li.react-datepicker__time-list-item--selected {
        background: #f94d6a;
      }
    }
  }
`;
