import React from 'react';
import {
    Box,
    Text,
} from '@chakra-ui/react';
import "./Tags.css";
export default function tags(props) {
    const colors = ['red', 'green', 'blue', 'pink'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return (
        <Box w="fit-content" fontWeight="bold" mt={2} className={`tags tags-${color}`}>
            <Text px={3} whiteSpace="nowrap">
                {props.commitments.toUpperCase()}
            </Text>
        </Box>
    );
};
