import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 20px;
`;

export const MeetupInfo = styled.View`
  padding: 20px;
  border-radius: 4px;
`;

export const Banner = styled.Image`
  flex: 1;
  width: 100%;
  resize-mode: cover;
  height: 150px;
  border-radius: 4px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const DetailsContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

export const Details = styled.Text`
  color: #999999;
  margin: 0 0 5px 5px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
