import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import decomtitle from "../assets/decom-title.svg";
import rightarrow from "../assets/chevron-right.svg";
import defaultcardimage from "../assets/defaultcardimage.svg";
interface HeaderImageAndNavProps {
  bg_image: any;
}

const TopHeaderContainerSC = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  ${(props: HeaderImageAndNavProps) =>
    props.bg_image
      ? "background-image:url(" + props.bg_image + ");"
      : "background-image:url(" + defaultcardimage + ");"}
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  height: 10rem;
  padding: 0.5rem 1rem;
`;
const DecomTitle = styled.img`
  // width: 10%;
`;
const NavIcon = styled.img``;

interface TopHeaderTitleNavProps {
  bg_image?: any;
  backTo: string;
}

export const TopHeaderTitleNav = ({
  bg_image,
  backTo,
}: TopHeaderTitleNavProps) => {
  return (
    <TopHeaderContainerSC bg_image={bg_image?.data?.attributes.url}>
      <Link to={backTo}>
        <NavIcon src={rightarrow} />
      </Link>
      <>
        <DecomTitle src={decomtitle} alt="title icon" />
      </>
      <>
        <span></span>
      </>
    </TopHeaderContainerSC>
  );
};
