
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Input from './Input';
import { ColorPickerChangeEvent } from 'primereact/colorpicker';

export interface TextEditorProps {
    title: string;
    setTitle: (text: string) => void;

    subtitle: string;
    setSubtitle: (text: string) => void;

    description: string;
    setDescription: (text: string) => void;

    titleColor: string;
    setTitleColor: (event: ColorPickerChangeEvent) => void;

    subtitleColor: string;
    setSubtitleColor: (event: ColorPickerChangeEvent) => void;

    descriptionColor: string;
    setDescriptionColor: (event: ColorPickerChangeEvent) => void;
}

export default function TextEditor(props: TextEditorProps) {
    const {
        title,
        setTitle,

        subtitle,
        setSubtitle,

        description,
        setDescription,

        titleColor,
        setTitleColor,

        subtitleColor,
        setSubtitleColor,

        descriptionColor,
        setDescriptionColor
    } = props;

    return (
        <>
            <Typography variant="h5" component="h4" fontWeight={600}>
                Text Editor
            </Typography>
            <Input
                label='Title'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                color={titleColor}
                setColor={setTitleColor}/>
            <Input
                label='Subtitle'
                onChange={(e) => setSubtitle(e.target.value)}
                value={subtitle}
                color={subtitleColor}
                setColor={setSubtitleColor}/>
            <Input
                label='Description'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                multiline
                color={descriptionColor}
                setColor={setDescriptionColor}/>
        </>
    );
}