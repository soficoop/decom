import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import decomTitle from "../assets/decom-title.svg";
import decomDarkTitle from "../assets/decom-dark-title.svg";
import rightArrow from "../assets/chevron-right.svg";
import defaultCardImage from "../assets/defaultcardimage.svg";
import { CommunitiesContext } from "../contexts";
import { useContext } from "react";
interface HeaderImageAndNavProps {
  bgImage: any;
}

const TopHeaderContainerSC = styled.div`
  display: flex;
  ${(props: HeaderImageAndNavProps) =>
    props.bgImage
      ? "background-image:url(" + props.bgImage + ");"
      : "background-image:url(" + defaultCardImage + ");"}
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  height: 10rem;
  padding: 1rem;
  & > * {
    flex: 1;
  }
`;
const NewSuggestionTopNavSC = styled.div`
  display: flex;
  height: 5rem;
  padding: 1rem;
  & > * {
    flex: 1;
  }
`;

interface TopHeaderTitleNavProps {
  bgImage?: any;
  backTo: string;
}

export const TopHeaderTitleNav = ({
  bgImage,
  backTo,
}: TopHeaderTitleNavProps) => {
  return (
    <TopHeaderContainerSC bgImage={bgImage}>
      <Link to={backTo}>
        <img src={rightArrow} alt="right arrow icon" />
      </Link>
      <img src={decomTitle} alt="title icon" style={{ maxHeight: 16 }} />
      <span />
    </TopHeaderContainerSC>
  );
};

interface NewSuggestionTopNavProps {
  titleColor: string;
}

export const NewSuggestionTopNav = ({
  titleColor,
}: NewSuggestionTopNavProps) => {
  const { selectedCommunity } = useContext(CommunitiesContext);
  return (
    <NewSuggestionTopNavSC>
      <Link to={`/community/${selectedCommunity?.id}`}>
        <img src={rightArrow} alt="right arrow icon" />
      </Link>
      <img
        src={titleColor === "light" ? decomTitle : decomDarkTitle}
        alt="title icon"
        style={{ maxHeight: 16 }}
      />

      <span />
    </NewSuggestionTopNavSC>
  );
};
