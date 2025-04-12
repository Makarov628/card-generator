import * as React from 'react';
import { ColorPicker, ColorPickerChangeEvent } from 'primereact/colorpicker';
import { Box, Card, Typography } from '@mui/material';
import "./ColorPickerElement.css";
import ColorPickerElement from './ColorPickerElement';

export interface FrameOptionsProps {
    color: string;
    setColor: (event: ColorPickerChangeEvent) => void;
}

export default function FrameOptions(props: FrameOptionsProps) {
    const { color, setColor } = props;
    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h5" component="h4" fontWeight={600}>
                Frame Options
            </Typography>
            <Box display="flex" flexDirection="row" style={{ alignItems: 'center' }} gap={1}>
                <ColorPickerElement color={color} setColor={setColor} />
                <Typography>Frame Color</Typography>
            </Box>
        </Box>
    );
}