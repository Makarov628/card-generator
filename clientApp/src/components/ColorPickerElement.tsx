import * as React from 'react';
import { ColorPicker, ColorPickerChangeEvent } from 'primereact/colorpicker';
import { Card } from '@mui/material';
import "./ColorPickerElement.css";

export interface ColorPickerElementProps {
    color: string;
    setColor: (event: ColorPickerChangeEvent) => void;
}

export default function ColorPickerElement(props: ColorPickerElementProps) {
    const { color, setColor } = props;
    return (
        <Card variant='outlined' sx={{ maxWidth: 56, maxHeight: 56, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ColorPicker format="hex" value={color} onChange={setColor} />
        </Card>
    );
}