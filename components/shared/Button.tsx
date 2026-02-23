
"use client";

import Button from '@mui/material/Button';

export default function ButtonComponent({ text }: { text: string }) {
    return (
        <Button
            sx={{
                mt: 2,
                backgroundColor: '#7c3f1c',
                '&:hover': {
                    backgroundColor: '#d8e61dff',
                },
            }}
            variant="contained"
        >
            {text}
        </Button>
    )
}