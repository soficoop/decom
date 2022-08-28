import { useContext, useEffect } from "react";
import { CommunitiesContext } from "../contexts";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { TopHeaderTitleNav } from "../components/TopHeaderTitleNav";
import { SuggestionCard } from "../components/SuggestionCard";
import { Typography } from "@mui/material";
import { ViewWrapper } from "../components/ViewWrapper";
import { ContentWrapper } from "../components/ContentWrapper";
const CommunityNameHeader = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5rem;
  background: #ffffff;
  box-shadow: 0px -7px 16px rgba(0, 0, 0, 0.06);
  border-radius: 32px 32px 0px 0px;
  font-family: "Noto Sans Hebrew";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 38px;
  color: #011756;
`;

const CommunityDescription = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: "Noto Sans Hebrew";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #011756;
  padding: 0rem 1rem;
  background: #ffffff;
`;

const suggestions = [
  {
    id: 1,
    title: "אאא אאאאא אא אאא",
    content:
      "אאאאאא אאאאא אא אאאא אאא אאאאא אאאאא אא  אאאא אאא אאאאא אאאאא אא אא אאא אאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאאאאאאאאאאא אאאאא אא אאא אאאאאא אאא אאא אא אאא א  אאאא אא א v אאאאא אאאאאא אאאא אא א א",
    image: "",
    score: 5,
    upvotes: 10,
    downvotes: 5,
  },
  {
    id: 2,
    title: "בבבבבבבב בב בבבבב",
    content: "בבבבבבב בב בב בבבב בב בבב בבבב",
    image: "",
    score: 3,
    upvotes: 5,
    downvotes: 2,
  },
  {
    id: 3,
    title: "גגגג גגג גגגג גג",
    content: "גגגגג גגגג גגגגגג גגגג גג ג",
    image: "",
    score: -5,
    upvotes: 1,
    downvotes: 6,
  },
  {
    id: 4,
    title: "דדדדד דדדד דדד דד",
    content: "דד דדדד דד דדדד דד דד דד דד דדדדד דד ד ד ד ד",
    image: "",
    score: 1,
    upvotes: 8,
    downvotes: 7,
  },
];

export const Community = () => {
  const { loading, data, selectedCommunity, setSelectedCommunity } =
    useContext(CommunitiesContext);
  const { id } = useParams();

  useEffect(() => {
    const res = data.filter((v) => {
      if (v.id === id) return v;
      else return false;
    });
    setSelectedCommunity(res[0]);
  }, [id]);
  console.log(data);

  const handleSuggestionClick = (id: string) => {
    // setSelectedSuggestion();
  };

  return (
    <ViewWrapper>
      {selectedCommunity && (
        <>
          <TopHeaderTitleNav bg_image={selectedCommunity?.image} backTo={"/"} />
          <CommunityNameHeader>{selectedCommunity?.name}</CommunityNameHeader>
          <CommunityDescription>
            {selectedCommunity?.description}
          </CommunityDescription>
          <ContentWrapper>
            <Typography variant="h3">הצעות: {suggestions.length}</Typography>
            {suggestions.map((v) => {
              return (
                <SuggestionCard
                  id={v.id}
                  title={v.title}
                  content={v.content}
                  image={v.image}
                  score={v.score}
                  upvotes={v.upvotes}
                  downvotes={v.downvotes}
                  // onClick={handleSuggestionClick}
                />
              );
            })}
          </ContentWrapper>
        </>
      )}
    </ViewWrapper>
  );
};
