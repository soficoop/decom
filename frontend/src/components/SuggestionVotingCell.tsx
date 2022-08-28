import styled from "styled-components";

interface VotingCellProps {
  isPicked: boolean;
}

export const SuggetsionVotingUpCell = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 42px;
  background: ${(props: VotingCellProps) =>
    props.isPicked ? "#8BD4DD" : "#ffffff"};
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  gap: 1rem;
  border-right: 1px solid #011756;
`;
export const SuggetsionVotingDownCell = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 42px;
  background: ${(props: VotingCellProps) =>
    props.isPicked ? "#F582AE" : "#ffffff"};
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  gap: 1rem;
`;

export const SuggestionVotingCenterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  border: 2px solid #000000;
  border-radius: 8px;
  margin: 2rem 0;
`;
