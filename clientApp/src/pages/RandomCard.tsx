import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

export interface RandomCardPageProps {}

export default function RandomCardPage(props: RandomCardPageProps) {
  const buttons = [
    "auditory",
    "extroverted",
    "introverted",
    "kinestetic",
    "visual",
  ];

  const colors = ["d0e600", "e62100", "008cd5", "00d991", "c902db"];

  const [url, setUrl] = useState<string>("");

  const fetchRandomCard = (type: string) => {
    fetch("/api/cards/random/" + type)
      .then((response) => response.json())
      .then((data) => {
        setUrl(data.path);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  };

  useEffect(() => {
    const button = buttons[Math.floor(Math.random() * buttons.length)];
    fetchRandomCard(button);
  }, []);

  return (
    <Box
      sx={{
        margin: "0 auto",
        my: 2,
        padding: "32px",
        maxWidth: "25rem",
        minHeight: "37.5rem",
        maxHeight: "40.625rem",
        alignItems: "center",
      }}
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <img
        id="card"
        src={url}
        style={{
          padding: "32px",
          maxWidth: "25rem",
          minHeight: "37.5rem",
          maxHeight: "37.5rem",
          borderRadius: "64px",
        }}
      />
      {buttons.map((button, i) => (
        <Button
          id="save-button"
          //   style={{
          //     ...(i + 1 == buttons.length ? { marginBottom: "32px" } : {}),
          //   }}
          variant="contained"
          fullWidth
          onClick={() => fetchRandomCard(button)}
        >
          {button}
        </Button>
      ))}
    </Box>
  );
}
