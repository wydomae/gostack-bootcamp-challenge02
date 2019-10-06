import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #18161f;

  nav {
    max-width: 940px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 92px;
    margin: 0 auto;

    a {
      display: flex;
      align-items: center;

      img {
        width: 30px;
        height: 30px;
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;
    margin-right: 30px;

    strong {
      display: block;
      color: #fff;
      font-weight: 400;
      font-size: 14px;
    }

    a {
      display: block;
      margin-top: 2px;
      color: #999;
      font-size: 12px;
    }
  }

  button {
    background: #d44059;
    border-radius: 4px;
    color: #fff;
    border: 0;
    padding: 10px 20px;
    height: 42px;
    transition: background 0.2;

    &:hover {
      background: ${darken(0.03, '#F94D6A')};
    }
  }
`;
