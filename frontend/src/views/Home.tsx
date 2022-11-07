import { Stack, Typography, Card, Button } from "@mui/material";
import { useContext, useState } from "react";
import { CommunitiesContext } from "../contexts";
import { CommunityCard } from "../components/CommunityCard";
import { TopDrawer } from "../components/TopDrawer";
import { LoginDialog } from "../components/LoginDialog";
import { JoinCommunityDialog } from "../components/JoinCommunityDialog";
import { CreateCommunityDialog } from "../components/CreateCommunityDialog";
import { Community } from "../types/entities";
const exampleText = `
לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק.

קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי.

`;

export function Home() {
  const { loading, data } = useContext(CommunitiesContext);

  const [isOpen, setWhoIsOpen] = useState("none");
  const [selectedCommunity, saveClickedCommunity] = useState<Community>();
  return (
    <Stack>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Stack gap={2}>
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
          <CreateCommunityDialog
            isOpen={isOpen === "create-community"}
            setWhoIsOpen={setWhoIsOpen}
          />
          <TopDrawer drawerText={exampleText} />

          <Stack
            textAlign="center"
            width={380}
            alignSelf="center"
            padding="32px 0"
            gap="12px"
            alignItems="center"
            borderRadius={"16px"}
            border="1px solid #E2E7F4"
          >
            <Typography fontWeight={500}>
              מעוניינים להקים קהילה חדשה?
            </Typography>
            <Button
              sx={{ width: "213px", height: "56px" }}
              onClick={() => {
                setWhoIsOpen("create-community");
              }}
            >
              <Typography fontWeight={600}>צור קשר</Typography>
            </Button>
          </Stack>

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
