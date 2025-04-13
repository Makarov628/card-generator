import * as React from 'react';

import { Box, Button, CardHeader } from '@mui/material';
import { Save } from '@mui/icons-material';
import html2canvas from 'html2canvas';

export interface CardPreviewProps {
    title: string;
    subtitle: string;
    description: string;

    titleColor: string;
    subtitleColor: string;
    descriptionColor: string;

    externalFrameColor: string;
    internalFrameColor: string;

    imageUrl: string;
}

export default function CardPreview(props: CardPreviewProps) {
    const {
        title,
        subtitle,
        description,

        titleColor,
        subtitleColor,
        descriptionColor,

        externalFrameColor,
        internalFrameColor,

        imageUrl
    } = props;

    const cardRef = React.useRef(null);
    const [isCanShare, setIsCanShare] = React.useState(false);

    React.useEffect(() => {
        try {
            const userAgent = navigator.userAgent;

            if (!(/iPad|iPhone|iPod/.test(userAgent) || /android/i.test(userAgent))) {
                setIsCanShare(false);
                return;
            }

            setIsCanShare(navigator.canShare({ files: [new File([], "", { type: "image/png" })] }));
        } catch (error) {
            setIsCanShare(false);
        }
    }, [])

    const downloadCard = () => {
        if (!cardRef.current)
            return;

        html2canvas(cardRef.current, { useCORS: true, allowTaint: true, backgroundColor: null }).then(function (canvas) {
            if (!isCanShare) {
                const link = document.createElement("a");
                link.download = "card.png";
                link.href = canvas.toDataURL("image/png", 1.0);
                link.click();
                return;
            }

            canvas.toBlob((blob) => {
                if (!blob) return;

                navigator.share({ files: [new File([blob], "card.png", { type: "image/png" })] })
                    .then(() => console.log("Изображение успешно отправлено через share"))
                    .catch((error) => console.error("Ошибка при попытке отправки", error));
            });
        });
    }

    return (
        <Box
            sx={{
                margin: "0 auto",
                maxWidth: "25rem",
                minHeight: "37.5rem",
                maxHeight: "40.625rem",
                justifyContent: 'center',
                alignItems: 'center'
            }}
            display="flex"
            flexDirection="column"
            gap={3}
        >
            <div ref={cardRef} id="card" style={{
                backgroundColor: "#ffffff",
                maxWidth: "25rem",
                minHeight: "37.5rem",
                maxHeight: "37.5rem",
                borderWidth: "16px",
                borderColor: `#${externalFrameColor}`,
                borderStyle: "solid",
                borderRadius: "64px",
                display: "flex",
                flexDirection: "column",
                fontFamily: "Montserrat, sans-serif",
            }}>
                <div style={{
                    margin: "0 auto",
                    maxWidth: "24rem",
                    minHeight: "35.5rem",
                    maxHeight: "35.5rem",
                    borderWidth: "16px",
                    borderColor: `#${internalFrameColor}`,
                    borderStyle: "solid",
                    borderRadius: "48px",
                    display: "flex",
                    flexDirection: "column",
                    padding: "16px",
                }}>
                    <p style={{
                        color: `#${titleColor}`,
                        textAlign: "center",
                        fontSize: 30,
                        fontWeight: 800
                    }}>{title}</p>
                    {!!subtitle
                        ? <p style={{
                            color: `#${subtitleColor}`,
                            textAlign: "center",
                            fontSize: 22,
                            fontWeight: 600
                        }} >{subtitle}</p>
                        : null
                    }
                    <img
                        crossOrigin="anonymous"
                        style={{ maxWidth: 250, maxHeight: 250, margin: "auto" }}
                        src={`${imageUrl}`}
                    />
                    {!!description
                        ? <p style={{
                            color: `#${descriptionColor}`,
                            textAlign: "center",
                            fontSize: 18,
                            fontWeight: 500
                        }}>{description}</p>
                        : null
                    }
                </div>
            </div>
            <Button id="save-button" variant='contained' fullWidth startIcon={<Save />} onClick={downloadCard}>
                {isCanShare ? "Share" : "Download"}
            </Button>
        </Box>
    );
}