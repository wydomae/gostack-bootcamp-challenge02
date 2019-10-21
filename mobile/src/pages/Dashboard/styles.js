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

export const Footer = styled.View``;

export const EmptyContainer = styled.View`
  margin-top: 30px;
  justify-content: center;
  align-items: center;
`;

export const EmptyText = styled.Text`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.6);
`;
