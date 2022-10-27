import { CleanLink, CardImage, SuggestionCounter } from "./SmallComponents";
import { Card, Typography, Stack } from "@mui/material";
import { Community } from "../types/entities";
import { truncateAfterWords } from "../utils/functions";

interface CommunityCardProps {
  community: Community;
}

export const CommunityCard = ({ community }: CommunityCardProps) => {
  console.log(community);

  return (
    <Card
      variant="outlined"
      sx={{
        boxSizing: "border-box",
        boxShadow: "2px 2px 0px #000000",
        border: "2px solid #011756",
        margin: "8px 0",
      }}
    >
      <CleanLink to={`community/${community.id}`}>
        <>
          <CardImage image={community.image} />
          <Stack
            direction="column"
            textAlign="right"
            minHeight={156}
            padding="1rem 0.5rem"
          >
            <Typography variant="h1">{community.name}</Typography>
            <SuggestionCounter count={5} />

            <Typography variant="body1">
              {truncateAfterWords(community.description ?? "", 15)}
            </Typography>
          </Stack>
        </>
      </CleanLink>
    </Card>
  );
};
