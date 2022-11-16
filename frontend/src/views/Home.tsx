import { Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { CommunitiesContext } from "../contexts";
import { CommunityCard } from "../components/CommunityCard";
import { TopDrawer } from "../components/TopDrawer";
import { LoginDialog } from "../components/LoginDialog";
import { JoinCommunityDialog } from "../components/JoinCommunityDialog";
import { Community } from "../types/entities";

export function Home() {
  const { loading, data } = useContext(CommunitiesContext);

  const [isOpen, setWhoIsOpen] = useState("none");
  const [selectedCommunity, saveClickedCommunity] = useState<Community>();
  return (
    <Stack>
      <TopDrawer />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Stack gap={2} paddingX={3}>
          <LoginDialog
            isOpen={isOpen === "login"}
            setWhoIsOpen={setWhoIsOpen}
            selectedCommunity={selectedCommunity}
          />
          <JoinCommunityDialog
            isOpen={isOpen === "join"}
            setWhoIsOpen={setWhoIsOpen}
            selectedCommunity={selectedCommunity}
          />
          {data.map((community) => (
            <CommunityCard
              community={community}
              key={community.id}
              setWhoIsOpen={setWhoIsOpen}
              saveClickedCommuinty={saveClickedCommunity}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
