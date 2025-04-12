import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Card } from '@mui/material';
import { ColorPickerChangeEvent } from 'primereact/colorpicker';
import ColorPickerElement from './ColorPickerElement';

export interface InputProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    multiline?: boolean;

    color: string;
    setColor: (event: ColorPickerChangeEvent) => void;
}


function Input(props: InputProps) {
    const { label, value, onChange, multiline, color, setColor } = props;
    return (
        <Box display="flex" flexDirection="row" gap={1}>
            <ColorPickerElement color={color} setColor={setColor}/>
            <TextField
                label={label}
                value={value}
                onChange={onChange}
                multiline={multiline}
                rows={multiline ? 3 : 1}
                variant="outlined"
                fullWidth
            />
        </Box>
    );
}

export default Input;
