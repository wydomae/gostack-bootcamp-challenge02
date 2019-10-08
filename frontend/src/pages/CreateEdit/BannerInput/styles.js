import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margim-bottom: 20px;

  label {
    cursor: pointer;
    background: ${props => (props.preview ? 'none' : '#18161f')};
    width: 100%;
    max-width: 940px;
    margin: 50px 0 20px;
    height: 300px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      opacity: 0.7;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        max-width: 940px;
        max-height: 300px;
      }

      span {
        margin-top: 10px;
        font-size: 20px;
        color: rgba(255, 255, 255, 0.3);
      }

      input {
        display: none;
      }
    }
  }
`;
