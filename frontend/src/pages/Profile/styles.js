import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 940px;

  form {
    display: flex;
    flex-direction: column;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &:first-child {
        margin-top: 50px;
      }
    }

    > span {
      color: #f94d6a;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: 1px solid rgba(255, 255, 255, 0.1);
      margin: 20px 0;
    }

    div {
      display: flex;
      justify-content: flex-end;

      button {
        background: #f94d6a;
        color: #fff;
        padding: 10px 20px;
        border: 0;
        border-radius: 4px;
        display: block;
        width: 160px;
        margin-top: 10px;
        transition: background 0.2;
        &:hover {
          background: ${darken(0.03, '#F94D6A')};
        }

        div {
          display: flex;
          align-items: center;
          justify-content: center;

          span {
            margin-left: 5px;
          }
        }
      }
    }
  }
`;
