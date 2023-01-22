import { useContext, useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { NewSuggestionTopNav } from "../components/TopHeaderTitleNav";
import { TextField, Button, Box, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import addImage from "../assets/add-image.svg";
import trashIcon from "../assets/trashIcon.svg";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import { SuggestionsContext } from "../contexts/suggestions";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../utils/functions";
import { InputBox } from "../components/SmallComponents";

const StyledAddImageBox = styled(Box)`
  box-sizing: border-box;
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
  min-width: 380px;
  height: 222px;
  border-radius: 8px;
`;

interface ImageUploadProps {
  setImage: (img: ImageType) => void;
}

const ImageUpload = ({ setImage }: ImageUploadProps) => {
  const theme = useTheme();
  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    setImage(images[0]);
  }, [images, setImage]);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList as never[]);
  };

  return (
    <Stack display="flex">
      <ImageUploading value={images} onChange={onChange} maxNumber={1}>
        {({ onImageUpload, onImageRemoveAll }) => (
          <div className="upload__image-wrapper">
            {images.length > 0 ? (
              <ImagePreviewContainer
                border={"px solid " + theme.palette.secondary.main}
                image={images[0]?.dataURL}
              >
                <img
                  style={{
                    position: "relative",
                    top: "-90px",
                    right: "-170px",
                    width: "1.5rem",
                    height: "1.5rem",
                  }}
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
  const { addSuggestion } = useContext(SuggestionsContext);
  const navigate = useNavigate();
  const onTitleChange = (e: any) => {
    setTitle(e.target.value);
  };
  const onDescriptionChange = (e: any) => {
    setContent(e.target.value);
  };

  async function handleSubmit() {
    const imageID = image?.file && (await uploadFile(image.file))?.id;
    const newSuggestion = await addSuggestion(title, content, imageID);
    navigate(`success/${newSuggestion.data.createSuggestion.data.id}`);
  }

  return (
    <>
      <NewSuggestionTopNav titleColor="dark" />
      <Stack paddingX={2}>
        <Typography align="center" variant="h2">
          הצעה חדשה
        </Typography>
        <Stack>
          <InputBox display="flex" gap={1} marginY={1.5}>
            <Typography variant="subtitle1">כותרת</Typography>
            <TextField
              placeholder="תנו שם ברור"
              value={title}
              onChange={onTitleChange}
              fullWidth
            />
          </InputBox>
          <ImageUpload setImage={setImage} />
          <InputBox display="flex" gap={1} marginY={1.5}>
            <Typography variant="subtitle1">פירוט ההצעה</Typography>

            <TextField
              multiline
              rows={8}
              fullWidth
              placeholder="הסבירו בצורה פשוטה ובהירה את ההצעה"
              value={content}
              onChange={onDescriptionChange}
            />
          </InputBox>
          <Button
            fullWidth
            type="submit"
            color="primary"
            size="large"
            disabled={!title || !content}
            onClick={handleSubmit}
          >
            פרסום סוגיה
          </Button>
        </Stack>
      </Stack>
    </>
  );
};
