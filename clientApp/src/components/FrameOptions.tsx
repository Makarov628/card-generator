import * as React from 'react';
import { ColorPicker, ColorPickerChangeEvent } from 'primereact/colorpicker';
import { Box, Card, Grid, Typography } from '@mui/material';
import "./ColorPickerElement.css";
import ColorPickerElement from './ColorPickerElement';

export interface FrameOptionsProps {
    externalColor: string;
    setExternalColor: (event: ColorPickerChangeEvent) => void;

    internalColor: string;
    setInternalColor: (event: ColorPickerChangeEvent) => void;
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
                        <ColorPickerElement color={externalColor} setColor={setExternalColor} />
                        <Typography>External Frame Color</Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Box display="flex" flexDirection="row" style={{ alignItems: 'center' }} gap={1}>
                        <ColorPickerElement color={internalColor} setColor={setInternalColor} />
                        <Typography>Internal Frame Color</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}