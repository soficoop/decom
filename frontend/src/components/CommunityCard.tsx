import { CleanLink, SuggestionCounter } from "./SmallComponents";
import { Card, CardMedia, CardContent, Typography, Stack } from "@mui/material";
import { Community } from "../types/entities";
import { truncateAfterWords } from "../utils/functions";
import lock from "../assets/lock.svg";

interface CommunityCardProps {
  community: Community;
  onClick: () => void;
}

export const CommunityCard = ({ community, onClick }: CommunityCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        boxShadow: "2px 2px 0px #000000",
        border: "2px solid #011756",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {community.requiresPassword && (
        <img
          src={lock}
          alt="lock icon"
          style={{ position: "absolute", top: "12px", right: "12px" }}
        />
      )}
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
    </Card>
  );
};
