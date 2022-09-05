import { Stack, Typography } from "@mui/material";
import { NewSuggestionTopNav } from "../components/TopHeaderTitleNav";
import { InputLabel, TextField, Button, Box, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import addImage from "../assets/add-image.svg";
import trashIcon from "../assets/trashIcon.svg";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";

const TXTAREA = styled.textarea`
  font-family: Noto Sans Hebrew, sans-serif;
  width: 100%;
  height: 248px;
  background: #ffffff;
  border-radius: 8px;
  text-align: right;
  color: #000000;
  border: 2px solid #011756;
  padding: 16px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
`;

const StyledAddImageBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 12px;
  height: 110px;
  background: #ffffff;
  border: 1px dashed #011756;
  border-radius: 8px;
`;

const InputBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 100%;
`;

interface ImagePreviewContainerProps {
  image?: string;
  border?: string;
}
const ImagePreviewContainer = styled(Stack)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image:${(props: ImagePreviewContainerProps) =>
    "url(" + props.image + ");"}
  border: ${(props: ImagePreviewContainerProps) => props.border};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  max-width: 380px;
  height: 222px;
  border-radius: 8px;
`;

const ImageUpload = () => {
  const theme = useTheme();
  const [images, setImages] = useState<ImageType[]>([]);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };
  return (
    <Stack display={"flex"}>
      <ImageUploading value={images} onChange={onChange} maxNumber={1}>
        {({ onImageUpload, onImageRemoveAll }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {images.length > 0 ? (
              <ImagePreviewContainer
                border={"px solid " + theme.palette.secondary.main}
                image={images[0]?.dataURL}
              >
                <img
                  style={{ position: "relative", top: "-42%", right: "-45%" }}
                  src={trashIcon}
                  onClick={onImageRemoveAll}
                  alt="trash icon"
                />
              </ImagePreviewContainer>
            ) : (
              <StyledAddImageBox marginY={1.5} onClick={onImageUpload}>
                <img src={addImage} alt="add icon" />
                <Typography variant="subtitle1">הוספת תמונה</Typography>
              </StyledAddImageBox>
            )}
          </div>
        )}
      </ImageUploading>
    </Stack>
  );
};

export const NewSuggestion = () => {
  return (
    <Stack paddingX={0}>
      <NewSuggestionTopNav />
      <Typography align="center" variant="h2">
        הצעה חדשה
      </Typography>
      <Stack>
        <InputBox marginY={1.5}>
          <InputLabel>כותרת</InputLabel>
          <TextField placeholder="תנו שם ברור" fullWidth />
        </InputBox>
        <ImageUpload />
        <InputBox marginY={1.5}>
          <InputLabel>פירוט ההצעה</InputLabel>
          <TXTAREA />
        </InputBox>
        <Button>פרסום סוגיה</Button>
      </Stack>
    </Stack>
  );
};
