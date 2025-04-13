import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImageSearch from './components/ImageSearch';
import TextEditor from './components/TextEditor';
import CardPreview from './components/CardPreview';
import Grid from '@mui/material/Grid';
import FrameOptions from './components/FrameOptions';
import { Divider } from '@mui/material';

export default function App() {
  const [title, setTitle] = React.useState('APPLE');
  const [subtitle, setSubtitle] = React.useState('ЯБЛОКО');
  const [description, setDescription] = React.useState('Eating an apple a day keeps the doctor away');

  const [titleColor, setTitleColor] = React.useState('db1b51');
  const [subtitleColor, setSubtitleColor] = React.useState('24de55');
  const [descriptionColor, setDescriptionColor] = React.useState('000000');

  const [externalFrameColor, setExternalFrameColor] = React.useState('ff00aa');
  const [internalFrameColor, setInternalFrameColor] = React.useState('99ff99');

  const [imageSearch, setImageSearch] = React.useState('яблоко');
  const [imageUrl, setImageUrl] = React.useState('https://cdn-icons-png.flaticon.com/128/17414/17414134.png');

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }} display="flex" flexDirection="column" gap={1}>
        <Typography variant="h3" component="h4" fontWeight={600} sx={{ mb: 3 }}>
          Card Creator
        </Typography>
        <Divider variant='fullWidth' />
      </Box>
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
            setExternalColor={(event) => setExternalFrameColor(event.value as string)}

            internalColor={internalFrameColor}
            setInternalColor={(event) => setInternalFrameColor(event.value as string)}
          />
          <ImageSearch
            search={imageSearch}
            setSearch={(e) => setImageSearch(e.target.value)}
            onImageSelected={setImageUrl}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
