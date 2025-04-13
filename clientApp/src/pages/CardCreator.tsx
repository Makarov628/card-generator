import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import ImageSearch from '../components/ImageSearch';
import TextEditor from '../components/TextEditor';
import CardPreview from '../components/CardPreview';
import FrameOptions from '../components/FrameOptions';

import { getFromLocalStorage, writeToLocalStorage } from '../data/localStorage'

export interface CardCreatorPageProps {
}

export default function CardCreatorPage(props: CardCreatorPageProps) {
  const TITLE_KEY = 'title';
  const SUBTITLE_KEY = 'subtitle';
  const DESCRIPTION_KEY = 'description';

  const TITLE_COLOR_KEY = 'titleColor';
  const SUBTITLE_COLOR_KEY = 'subtitleColor';
  const DESCRIPTION_COLOR_KEY = 'descriptionColor';

  const EXTERNAL_FRAME_COLOR_KEY = 'externalFrameColor';
  const INTERNAL_FRAME_COLOR_KEY = 'internalFrameColor';

  const IMAGE_SEARCH_KEY = 'imageSearch';
  const IMAGE_URL_KEY = 'imageUrl';

  const default_title = getFromLocalStorage<string>(TITLE_KEY) ?? 'APPLE';
  const default_subtitle = getFromLocalStorage<string>(SUBTITLE_KEY) ?? 'ЯБЛОКО';
  const default_description = getFromLocalStorage<string>(DESCRIPTION_KEY) ?? 'Eating an apple a day keeps the doctor away';

  const default_titleColor = getFromLocalStorage<string>(TITLE_COLOR_KEY) ?? 'db1b51';
  const default_subtitleColor = getFromLocalStorage<string>(SUBTITLE_COLOR_KEY) ?? '24de55';
  const default_descriptionColor = getFromLocalStorage<string>(DESCRIPTION_COLOR_KEY) ?? '000000';

  const default_externalFrameColor = getFromLocalStorage<string>(EXTERNAL_FRAME_COLOR_KEY) ?? 'ff00aa';
  const default_internalFrameColor = getFromLocalStorage<string>(INTERNAL_FRAME_COLOR_KEY) ?? '99ff99';

  const default_imageSearch = getFromLocalStorage<string>(IMAGE_SEARCH_KEY) ?? 'яблоко';
  const default_imageUrl = getFromLocalStorage<string>(IMAGE_URL_KEY) ?? 'https://cdn-icons-png.flaticon.com/128/17414/17414134.png';

  const [title, setTitle] = React.useState(default_title);
  const [subtitle, setSubtitle] = React.useState(default_subtitle);
  const [description, setDescription] = React.useState(default_description);

  const [titleColor, setTitleColor] = React.useState(default_titleColor);
  const [subtitleColor, setSubtitleColor] = React.useState(default_subtitleColor);
  const [descriptionColor, setDescriptionColor] = React.useState(default_descriptionColor);

  const [externalFrameColor, setExternalFrameColor] = React.useState(default_externalFrameColor);
  const [internalFrameColor, setInternalFrameColor] = React.useState(default_internalFrameColor);

  const [imageSearch, setImageSearch] = React.useState(default_imageSearch);
  const [imageUrl, setImageUrl] = React.useState(default_imageUrl);

  React.useEffect(() => {
    writeToLocalStorage<string>(TITLE_KEY, title)
    writeToLocalStorage<string>(SUBTITLE_KEY, subtitle)
    writeToLocalStorage<string>(DESCRIPTION_KEY, description)
    writeToLocalStorage<string>(TITLE_COLOR_KEY, titleColor)
    writeToLocalStorage<string>(SUBTITLE_COLOR_KEY, subtitleColor)
    writeToLocalStorage<string>(DESCRIPTION_COLOR_KEY, descriptionColor)
    writeToLocalStorage<string>(EXTERNAL_FRAME_COLOR_KEY, externalFrameColor)
    writeToLocalStorage<string>(INTERNAL_FRAME_COLOR_KEY, internalFrameColor)
    writeToLocalStorage<string>(IMAGE_SEARCH_KEY, imageSearch)
    writeToLocalStorage<string>(IMAGE_URL_KEY, imageUrl)
  }, [
    title,
    subtitle,
    description,
    titleColor,
    subtitleColor,
    descriptionColor,
    externalFrameColor,
    internalFrameColor,
    imageSearch,
    imageUrl
  ]);

  return (
    <Container maxWidth="lg">
      <Grid container style={{ marginTop: 32 }}>
        <Grid size={{ xs: 12, lg: 6 }} style={{ marginBottom: 32 }}>
          <CardPreview
            title={title}
            subtitle={subtitle}
            description={description}

            titleColor={titleColor}
            subtitleColor={subtitleColor}
            descriptionColor={descriptionColor}

            externalFrameColor={externalFrameColor}
            internalFrameColor={internalFrameColor}

            imageUrl={imageUrl}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }} display="flex" flexDirection="column" gap={1}>
          <TextEditor
            title={title}
            setTitle={(text: string) => setTitle(text)}

            subtitle={subtitle}
            setSubtitle={(text: string) => setSubtitle(text)}

            description={description}
            setDescription={(text: string) => setDescription(text)}

            titleColor={titleColor}
            setTitleColor={(event) => setTitleColor(event.value as string)}

            subtitleColor={subtitleColor}
            setSubtitleColor={(event) => setSubtitleColor(event.value as string)}

            descriptionColor={descriptionColor}
            setDescriptionColor={(event) => setDescriptionColor(event.value as string)}
          />
          <FrameOptions
            externalColor={externalFrameColor}
            setExternalColor={setExternalFrameColor}

            internalColor={internalFrameColor}
            setInternalColor={setInternalFrameColor}
          />
          <ImageSearch
            search={imageSearch}
            setSearch={(e) => setImageSearch(e.target.value)}
            selectedImageUrl={imageUrl}
            onImageSelected={setImageUrl}
          />
        </Grid>
      </Grid>
    </Container>
  );
}