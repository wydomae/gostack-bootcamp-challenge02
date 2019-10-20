import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View``;

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  margin-bottom: 30px;
`;

export const EmptyContainer = styled.View`
  margin-top: 30px;
  justify-content: center;
  align-items: center;
`;

export const EmptyText = styled.Text`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.6);
`;

export const MeetupContainer = styled.View`
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
  background: ${props =>
    props.type === 'subscriptions' ? '#D44059' : '#F94D6A'};
`;
