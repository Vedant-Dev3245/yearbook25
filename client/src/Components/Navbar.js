import React from "react"
import { Box, Flex, Text, Link, Image, useMediaQuery, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'
export default function Navbar() {
	const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
	return (
		<>
			<Image position={'absolute'} x={0} y={0} src="../images/Ellipse 7.png" />
			<Box className="pad">
				<Flex borderWidth={2} borderRadius={10} backdropBlur={10} justifyContent="space-between" paddingBlock={1} alignItems="center" className="navbar" background="linear-gradient(90deg, rgba(251, 251, 251, 0.1) 0%, rgba(251, 251, 251, 0.1) 100%);" position="relative"
				>
					<Text fontWeight="800" fontSize="2rem" color="white" p={3} pl={6}>SARC</Text>
					<Box display={isSmallerThan800 ? 'none' : 'flex'} justifyContent="space-between" width="100%" maxW="500px" align={'center'}>
						<Link fontSize="s" fontWeight="600" color="white" p={4} href="#">home</Link>
						<Link fontSize="s" fontWeight="600" color="white" p={4} href="https://bits-sarc.org" target="_blank">about</Link>
						<Link fontSize="s" fontWeight="600" color="white" p={4}
							href="#contact">contact</Link>
						<Link fontSize="s" fontWeight="600" color="white" p={4}>developers</Link>
					</Box>
					<Box display={isSmallerThan800 ? 'inline' : 'none'}>
						<Menu>
							<MenuButton
								as={IconButton}
								color="white"
								aria-label='Options'
								icon={<HamburgerIcon />}
								variant='outline'

							/>
							<MenuList color="white" bgColor="#141414">
								<MenuItem _focus={{ color: '#141414', bgColor: "#D2D2D2" }}>home</MenuItem>
								<MenuItem _focus={{ color: '#141414', bgColor: "#D2D2D2" }}>about</MenuItem>
								<MenuItem _focus={{ color: '#141414', bgColor: "#D2D2D2" }}>contact</MenuItem>
								<MenuItem _focus={{ color: '#141414', bgColor: "#D2D2D2" }}>developers</MenuItem>
							</MenuList>
						</Menu>
					</Box>
					<Box id="signInDiv" p={2}>
					</Box>
				</Flex>
			</Box>
		</>

	)
}