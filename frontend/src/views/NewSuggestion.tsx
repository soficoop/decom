import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { NewSuggestionTopNav } from "../components/TopHeaderTitleNav";
import { InputLabel, TextField, Button, Box, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import addImage from "../assets/add-image.svg";
import trashIcon from "../assets/trashIcon.svg";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import { useMutation } from "@apollo/client";
import { ADD_SUGGESTION } from "./postNewSuggestion";

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
  white-space: pre-line;
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

interface ImageUploadProps {
  setImage: (img: ImageType) => void;
}

const ImageUpload = ({ setImage }: ImageUploadProps) => {
  const theme = useTheme();
  const [images, setImages] = useState<ImageType[]>([]);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit

    setImages(imageList as never[]);
    setImage(images[0]);
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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<ImageType | null>(null);

  const onTitleChange = (e: any) => {
    setTitle(e.target.value);
  };
  const onDescriptionChange = (e: any) => {
    setContent(e.target.value);
  };
  const [createSuggestion, { data, loading, error }] = useMutation(
    ADD_SUGGESTION,
    {
      variables: {
        title,
        content,
      },
    }
  );

  return (
    <Stack paddingX={0}>
      <NewSuggestionTopNav titleColor="dark" />
      <Typography align="center" variant="h2">
        הצעה חדשה
      </Typography>
      <Stack>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createSuggestion({ variables: { title, content } });
            setTitle("");
            setContent("");
          }}
        >
          <InputBox marginY={1.5}>
            <InputLabel>כותרת</InputLabel>
            <TextField
              placeholder="תנו שם ברור"
              value={title}
              onChange={onTitleChange}
              fullWidth
            />
          </InputBox>
          <ImageUpload setImage={setImage} />
          <InputBox marginY={1.5}>
            <InputLabel>פירוט ההצעה</InputLabel>

            <TXTAREA
              placeholder={`נסו להתייחס לנקודות הבאות:

            סקירה מעמיקה ומקיפה של הסוגיה
            הנחות מוצא שהסוגיה מבתבססת עליהן
            פירוט הקריטריונים החשובים בבחירת פתרון`}
              value={content}
              onChange={onDescriptionChange}
            />
          </InputBox>
          <Button
            fullWidth
            type="submit"
            variant={title === "" || content === "" ? "outlined" : "primary"}
            disabled={title === "" || content === ""}
          >
            {loading ? "מפרסם" : "פרסום סוגיה"}
          </Button>
        </form>
      </Stack>
    </Stack>
  );
};
