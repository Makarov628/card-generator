import {
  Box,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";

export interface CatalogPageProps {}

export default function CatalogPage(props: CatalogPageProps) {
  const [catalog, setCatalog] = React.useState<any>({});
  // Inside your CatalogPage component:
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const colsCount = isSmallScreen ? 2 : isMediumScreen ? 4 : 6;

  const fetchCatalog = () => {
    fetch("/api/cards/catalog")
      .then((response) => response.json())
      .then((data) => {
        setCatalog(data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  };

  const sortParts = (a: string, b: string): number => {
    const primary = parseFloat(a);
    const secondary = parseFloat(b);

    return primary > secondary
      ? 1
      : primary < secondary
      ? -1
      : primary == secondary
      ? 0
      : 0;
  };

  useEffect(() => fetchCatalog(), []);

  return (
    <>
      {Object.keys(catalog)
        .sort(sortParts)
        .map((part) => {
          return (
            <Box
              sx={{ my: 2, padding: "16px" }}
              display="flex"
              flexDirection="column"
              gap={2}
            >
              {Object.keys(catalog[part]).map((category) => (
                <>
                  <Typography
                    variant="h6"
                    component="h4"
                    fontWeight={400}
                    style={{ textAlign: "center" }}
                  >
                    {part} {category}
                  </Typography>
                  <ImageList
                    id="image-list"
                    variant="standard"
                    cols={colsCount}
                    style={{
                      borderRadius: "8px",
                      padding: "8px",
                    }}
                    gap={8}
                  >
                    {Object.keys(catalog[part][category]).map((card, index) => (
                      <ImageListItem
                        id={`card-image-${index + 1}`}
                        key={catalog[part][category][card].name}
                        // onClick={() => setSelectedImage(url)}
                        sx={{
                          padding: "8px",
                          "&:hover": {
                            cursor: "pointer",
                            borderColor: "blue",
                          },
                        }}
                      >
                        <img
                          src={`${catalog[part][category][card].path}`}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </>
              ))}
            </Box>
          );
        })}
    </>
  );
}
