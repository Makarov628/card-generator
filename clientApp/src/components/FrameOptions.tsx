import * as React from 'react';
import { ColorPicker, ColorPickerChangeEvent } from 'primereact/colorpicker';
import { Box, Card, Grid, TextField, Typography } from '@mui/material';
import "./ColorPickerElement.css";
import ColorPickerElement from './ColorPickerElement';
import Input from './Input';

export interface FrameOptionsProps {
    externalColor: string;
    setExternalColor: (color: string) => void;

    internalColor: string;
    setInternalColor: (color: string) => void;
}

export default function FrameOptions(props: FrameOptionsProps) {
    const {
        externalColor,
        setExternalColor,

        internalColor,
        setInternalColor
    } = props;
    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h5" component="h4" fontWeight={600}>
                Frame Options
            </Typography>
            <Grid container>
                <Grid size={{ xs: 6 }}>
                    <Box display="flex" flexDirection="row" style={{ alignItems: 'center' }} gap={1}>
                        <ColorPickerElement color={externalColor} setColor={(event) => setExternalColor(event.value as string)} />
                        <TextField
                            id={"external-frame-color-input"}
                            label={"External Frame Color"}
                            value={externalColor}
                            onChange={(e) => setExternalColor(e.target.value)}
                            variant="outlined"
                            fullWidth
                            style={{ maxWidth: 150 }}
                        />
                    </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Box display="flex" flexDirection="row" style={{ alignItems: 'center' }} gap={1}>
                        <ColorPickerElement color={internalColor} setColor={(event) => setInternalColor(event.value as string)} />
                        <TextField
                            id={"internal-frame-color-input"}
                            label={"Internal Frame Color"}
                            value={internalColor}
                            onChange={(e) => setInternalColor(e.target.value)}
                            variant="outlined"
                            fullWidth
                            style={{ maxWidth: 150 }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}