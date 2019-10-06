import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 940px;
`;

export const MeetupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0;

  strong {
    color: #fff;
    font-size: 32px;
    font-weight: bold;
  }

  button {
    background: #f94d6a;
    padding: 10px 20px;
    border: 0;
    border-radius: 4px;
    display: block;
    height: 42px;
    margin-top: 10px;
    transition: background 0.2;

    &:hover {
      background: ${darken(0.03, '#F94D6A')};
    }

    a {
      text-decoration: none;

      div {
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          color: #fff;
          margin-left: 5px;
        }
      }
    }
  }
`;

export const MeetupList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;

  button {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      padding: 20px 30px;
      margin-bottom: 10px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;

      strong {
        color: #fff;
        font-size: 18px;
      }

      href {
        display: flex;
        text-decoration: none;
      }

      div {
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          color: rgba(255, 255, 255, 0.6);
        }

        button {
          background: transparent;
          border: 0;
          display: flex;
          margin-left: 30px;
        }
      }
    }
  }
`;
