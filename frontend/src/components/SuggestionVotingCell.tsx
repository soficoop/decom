import styled from "@emotion/styled";

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
  border-radius: 8px 0 0 8px;
  border-right: 1px solid #000000;
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
  border-radius: 0 8px 8px 0;
  border-left: 1px solid #000000;
`;

export const SuggestionVotingCenterContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  border: 2px solid #000000;
  border-radius: 8px;
  margin-bottom: 40px;
`;
