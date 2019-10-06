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

  h1 {
    color: #fff;
    margin: 50px 0;
    font-weight: 400;
  }

  div {
    margin: 50px 0;
    display: flex;
    align-items: center;
  }
`;

export const ActionButton = styled.button`
  background: ${props => (props.edit ? '#4DBAF9' : '#F94D6A')};
  padding: 10px 20px;
  border: 0;
  border-radius: 4px;
  height: 42px;
  margin: ${props => (props.edit ? '10px 7.5px 0' : '10px 0 0 7.5px')};
  transition: background 0.2;
  display: flex;
  align-items: center;

  &:hover {
    background: ${props =>
      props.edit ? darken(0.03, '#4DBAF9') : darken(0.03, '#F94D6A')};
  }

  span {
    color: #fff;
    margin-left: 5px;
  }
`;

export const MeetupInfo = styled.div`
  display: flex;
  flex-direction: column;

  img {
    border-radius: 4px;
  }

  strong {
    font-weight: 400;
    color: #fff;
    margin-top: 25px;
    font-size: 18px;
  }

  div {
    display: flex;
    align-items: center;
    margin-top: 25px;

    div {
      display-flex;
      margin-right: 20px;

      span {
        margin-left: 10px;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;
