import { Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { CommunitiesContext } from "../contexts";
import { CommunityCard } from "../components/CommunityCard";
import { TopDrawer } from "../components/TopDrawer";
import { LoginDialog } from "../components/LoginDialog";
import { JoinCommunityDialog } from "../components/JoinCommunityDialog";
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
          <TopDrawer drawerText={exampleText} />
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
