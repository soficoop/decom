import { Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { CommunitiesContext } from "../contexts";
import { CommunityCard } from "../components/CommunityCard";
import { TopDrawer } from "../components/TopDrawer";
import { LoginDialog } from "../components/LoginDialog";

export function Home() {
  const { loading, data } = useContext(CommunitiesContext);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <Stack>
      <TopDrawer />
      <LoginDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Stack gap={2} paddingX={3}>
          {data.map((community) => (
            <CommunityCard community={community} key={community.id} />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
