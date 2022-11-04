import { CleanLink, SuggestionCounter } from "./SmallComponents";
import { Card, CardMedia, CardContent, Typography, Stack } from "@mui/material";
import { Community } from "../types/entities";
import { truncateAfterWords } from "../utils/functions";
import lock from "../assets/lock.svg";

interface CommunityCardProps {
  community: Community;
}

export const CommunityCard = ({ community }: CommunityCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        boxShadow: "2px 2px 0px #000000",
        border: "2px solid #011756",
        margin: "8px 0",
      }}
    >
      {community.requiresPassword && (
        <img
          src={lock}
          alt="lock icon"
          style={{ position: "absolute", top: "12px", right: "12px" }}
        />
      )}
      <CleanLink to={`community/${community.id}`}>
        <>
          <CardMedia component="img" image={community.image} height={160} />
          <CardContent sx={{ borderTop: "2px solid #011756" }}>
            <Stack>
              <Typography variant="h1">{community.name}</Typography>
              <SuggestionCounter count={community.suggestionCount} />

              <Typography variant="body1">
                {truncateAfterWords(community.description ?? "", 15)}
              </Typography>
            </Stack>
          </CardContent>
        </>
      </CleanLink>
    </Card>
  );
};
