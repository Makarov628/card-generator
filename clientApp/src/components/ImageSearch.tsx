import * as React from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, ImageList, ImageListItem } from '@mui/material';

export interface ImageSearchProps {
    search: string;
    setSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onImageSelected: (url: string) => void;

    selectedImageUrl: string;
}

export default function ImageSearch(props: ImageSearchProps) {
    const { search, setSearch, onImageSelected, selectedImageUrl } = props;

    const [images, setImages] = React.useState<string[]>([selectedImageUrl]);
    const [selectedImage, setSelectedImage] = React.useState<string | null>(selectedImageUrl);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            fetchImages(search);
            event.preventDefault();
        }
    };

    const fetchImages = (q: string) => {
        fetch("/api/icons/search?query=" + q)
            .then((response) => response.json())
            .then((data) => {
                setImages(data);
            })
            .catch((error) => {
                console.error('Error fetching images:', error);
            });
    }

    React.useEffect(() => {
        fetchImages(search);
    }, []);

    React.useEffect(() => {
        if (!!selectedImage)
            onImageSelected(selectedImage);
    }, [selectedImage]);

    return (
        <Box sx={{ my: 2 }} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" component="h4" fontWeight={600}>
                Icon Search
            </Typography>
            <Box display="flex" flexDirection="row" gap={1}>
                <TextField
                    label={'Search'}
                    value={search}
                    onChange={setSearch}
                    fullWidth
                    onKeyDown={handleKeyDown}
                />
                <Button variant="contained" onClick={() => { fetchImages(search) }}>
                    Search
                </Button>
            </Box>
            <ImageList
                variant='standard'
                cols={6}
                style={{
                    borderWidth: "1px",
                    borderColor: "lightgray",
                    borderStyle: "solid",
                    borderRadius: "8px",
                    padding: "8px"
                }}
                gap={8}>
                {images.map((url) => (
                    <ImageListItem
                        key={url}
                        onClick={() => setSelectedImage(url)}
                        sx={{
                            padding: "8px",
                            borderWidth: "1px",
                            borderColor: url == selectedImage ? "blue" : "lightgray",
                            borderStyle: "solid",
                            borderRadius: "8px",
                            '&:hover': {
                                cursor: 'pointer',
                                borderColor: 'blue',
                            }
                        }}
                    >
                        <img
                            src={`${url}`}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
}