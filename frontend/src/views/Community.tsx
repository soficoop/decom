import { useContext, useEffect } from "react";
import { CommunitiesContext } from "../contexts";
import { useParams } from "react-router-dom";
import { TopHeaderTitleNav } from "../components/TopHeaderTitleNav";
import { SuggestionCard } from "../components/SuggestionCard";
import { Box, Stack, Typography, useTheme } from "@mui/material";

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
  const theme = useTheme();
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

  return (
    <Stack>
      {selectedCommunity && (
        <>
          <TopHeaderTitleNav bg_image={selectedCommunity?.image} backTo={"/"} />
          <Box
            marginTop={-4}
            borderRadius="32px 32px 0 0"
            bgcolor={theme.palette.background.paper}
          >
            <Typography
              variant="h2"
              textAlign="center"
              marginTop={3}
              marginBottom={2}
            >
              {selectedCommunity?.name}
            </Typography>
            <Typography marginBottom={7}>
              {selectedCommunity?.description}
            </Typography>
            <Stack paddingX={1}>
              <Typography variant="h3">הצעות: {suggestions.length}</Typography>
              {suggestions.map((v) => {
                return (
                  <SuggestionCard
                    key={v.id}
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
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  );
};
