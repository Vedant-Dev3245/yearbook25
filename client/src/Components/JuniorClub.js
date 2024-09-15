import React, { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Button,
    Checkbox,
    CheckboxGroup,
    VStack,
    HStack,
    Input,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    InputGroup,
    InputLeftElement,
    useMediaQuery
} from '@chakra-ui/react';
import { ChevronDownIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';

export default function JuniorClub() {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isSmallerThan900] = useMediaQuery("(max-width: 900px)");
    const [searchTerm, setSearchTerm] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const options = [
        'Aero Club',
        'Animation and Graphics Club',
        'Art n\' Dee Club',
        'Astroclub',
        'Automobile Club',
        'Biological Sciences Association',
        'BITS Embryo',
        'Chemical Engineering Association (ChEA)',
        'Civil Engineering Association',
        'Coding Club',
        'Computer Science Association (CSA)',
        'Creative Activities Club (CAC)',
        'Dance Club',
        'Debating Society',
        'Department of Backstage',
        'Department of Controlz',
        'Department of Food and Beverages',
        'Department of Publications and Correspondence',
        'Department of Reception and Accommodation',
        'Department of Security',
        'Department of Sponsorship and Marketing',
        'Department of Technical Activities',
        'Department of Transport',
        'Department of Visual Media',
        'Drama Club',
        'Economics and Finance Association',
        'EEE Association (EEE-A)',
        'Electronics and Robotics Club',
        'Enactus',
        'Environment Protection and Awareness Club (EPAC)',
        'Hobby Club',
        'Management Association',
        'Marketing Club',
        'Mathematics Association',
        'Mechanical Engineering Association (MEA)',
        'Mime Club',
        'Music Club',
        'Photography Club',
        'Physics Association',
        'Quiz Club',
        'Red Cross Society',
        'Student Alumni Relations Cell',
        'Wall Street Club'
    ];

    const handleSelect = (values) => {
        setSelectedOptions(values);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDeselect = (option) => {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
    };

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [[], [], []];
    filteredOptions.forEach((option, idx) => {
        columns[idx % 3].push(option);
    });

    return (
        <Box>
            <FormControl>
                <FormLabel
                    cursor="pointer"
                    fontSize="20px"
                    fontWeight="600"
                >
                    campus commitments
                </FormLabel>
                <Button
                    w="90%"
                    justifyContent="flex-start"
                    onClick={onOpen}
                    bg="#242323"
                    color="gray.400"
                    fontWeight="400"
                    borderWidth="1px"
                    borderColor="gray"
                    p="1.2rem 0.8rem"
                    _hover={{ borderColor: 'gray.300', bg: "#242323" }}
                >
                    choose club/ department
                    <Box ml="auto">
                        <ChevronDownIcon />
                    </Box>
                </Button>
            </FormControl>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay
                    bg="rgba(0, 0, 0, 0.6)"
                    backdropFilter="blur(20px)"
                    zIndex="modal"
                />
                <ModalContent
                    bg="#242323"
                    maxW="56rem"
                    h={isSmallerThan900 ? "fit-content" : "90%"}
                    color="white"
                    p="0.6rem"
                    borderRadius="20px"
                    borderColor="#4B4B4B" borderWidth="3px"
                >
                    <ModalHeader font-size= "24px" font-weight="700">campus commitments</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <InputGroup mb={1}>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<SearchIcon color="gray.300" />}
                            />
                            <Input
                                placeholder="search club/ department"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </InputGroup>
                        <Box mt="2rem">
                            <CheckboxGroup value={selectedOptions} onChange={handleSelect}>
                                <HStack align="start" spacing={4} justify="space-between">
                                    {columns.map((column, idx) => (
                                        <VStack key={idx} align="start" spacing={2} width="70%">
                                            {column.map((option, idx) => (
                                                <Checkbox key={idx} value={option}>
                                                    {option}
                                                </Checkbox>
                                            ))}
                                        </VStack>
                                    ))}
                                </HStack>
                            </CheckboxGroup>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Box pt={4}>
                {selectedOptions.length > 0 ? (
                    <HStack align="start" mt={2} spacing={2} flexWrap="wrap">
                        {selectedOptions.map((option, idx) => (
                            <HStack key={idx} spacing={1}>
                                <Box
                                    bg="#edf2f7"
                                    color="black"
                                    p={2}
                                    spacing={2}
                                    width="100%"
                                    display="flex"
                                    alignItems="center"
                                    borderRadius="md"
                                ><Box flex="1">{option}</Box>
                                    <IconButton
                                        icon={<CloseIcon />}
                                        color="#242323"
                                        size="xs"
                                        onClick={() => handleDeselect(option)}
                                    />
                                </Box>
                            </HStack>
                        ))}
                    </HStack>
                ) : (
                    <Box mt={2}></Box>
                )}
            </Box>
        </Box>
    );
};
