import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const DateContainer = styled.View`
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const DateText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
