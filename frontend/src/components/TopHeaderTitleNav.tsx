import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import decomTitle from "../assets/decom-title.svg";
import decomDarkTitle from "../assets/decom-dark-title.svg";
import rightArrow from "../assets/chevron-right.svg";
import defaultCardImage from "../assets/defaultcardimage.svg";
interface HeaderImageAndNavProps {
  bgImage: any;
}

const TopHeaderContainerSC = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  ${(props: HeaderImageAndNavProps) =>
    props.bgImage
      ? "background-image:url(" + props.bgImage + ");"
      : "background-image:url(" + defaultCardImage + ");"}
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  height: 10rem;
  padding: 0.5rem 1rem;
`;
const NewSuggestionTopNavSC = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  background: #ffffff;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 5rem;
  padding: 0.5rem 1rem;
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
      <img src={decomTitle} alt="title icon" />
      <span></span>
    </TopHeaderContainerSC>
  );
};

export const NewSuggestionTopNav = () => {
  return (
    <NewSuggestionTopNavSC>
      <Link to={"/"}>
        <img src={rightArrow} alt="right arrow icon" />
      </Link>
      <img src={decomTitle} alt="title icon" />
      <span></span>
    </NewSuggestionTopNavSC>
  );
};
