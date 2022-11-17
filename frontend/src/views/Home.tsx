import { Stack, Typography, Button, Card } from "@mui/material";
import { useContext, useState } from "react";
import { CommunitiesContext } from "../contexts";
import { CommunityCard } from "../components/CommunityCard";
import { TopDrawer } from "../components/TopDrawer";
import { LoginDialog } from "../components/LoginDialog";

import { CreateCommunityDialog } from "../components/CreateCommunityDialog";
import { SuccessDialog } from "../components/SuccessDialog";
import { Community } from "../types/entities";
import { lightGreyColor } from "../theme";

export function Home() {
  const { loading, data } = useContext(CommunitiesContext);

  const [visibleDialog, setVisibleDialog] = useState("");

  const [selectedCommunity, saveClickedCommunity] = useState<Community>();

  const handleClose = () => {
    setVisibleDialog("");
  };

  const handleCreateCommunitySuccess = () => {
    setVisibleDialog("success");
    //mutation
  };
  const handleJoinCommunitySuccess = () => {
    setVisibleDialog("success");
    //mutation
  };
  const handleLoginSubmit = () => {
    // isPasswordValid
    // navigate to community after login (isPasswordValid) success
  };

  return (
    <Stack>
      <TopDrawer />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Stack gap={2} paddingX={3}>
          <LoginDialog
            isOpen={visibleDialog === "login"}
            selectedCommunity={selectedCommunity}
            onClose={handleClose}
            onJoin={handleJoinCommunitySuccess}
            onLogin={handleLoginSubmit}
          />

          <CreateCommunityDialog
            isOpen={visibleDialog === "create-community"}
            onClose={handleClose}
            onSubmit={handleCreateCommunitySuccess}
          />
          <SuccessDialog
            isOpen={visibleDialog === "success"}
            onClose={handleClose}
          />

          <Card
            variant="outlined"
            sx={{
              borderColor: lightGreyColor,
              borderWidth: 1,
            }}
          >
            <Stack alignItems="center" gap={1.5} paddingY={3} paddingX={6}>
              <Typography variant="body2" textAlign="center">
                מעוניינים להקים קהילה חדשה?
              </Typography>
              <Button
                size="large"
                fullWidth
                onClick={() => {
                  setVisibleDialog("create-community");
                }}
              >
                <Typography fontWeight={600}>צור קשר</Typography>
              </Button>
            </Stack>
          </Card>
          <Typography variant="h2">קהילות</Typography>

          {data.map((community) => (
            <CommunityCard
              community={community}
              key={community.id}
              setWhoIsOpen={setVisibleDialog}
              saveClickedCommuinty={saveClickedCommunity}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
