import React from "react"
import { Box, Button, Flex, Text, Link, Image, useMediaQuery, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom"
import { HamburgerIcon } from '@chakra-ui/icons'
export default function Navbar() {
	const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
	const [loggedIn, setLoggedIn] = React.useState(false)

	if (localStorage.getItem("user") !== null && !loggedIn) {
		setLoggedIn(true)
	}
	const navigate = useNavigate()

	function gotoprofile() {
		console.log(localStorage.getItem("user"))
		navigate(`/profile/${localStorage.getItem("user")}`)
	}

	return (
		<>
			<Image pointerEvents={'none'} position={'absolute'} x={0} y={0} src="../images/Ellipse 7.png" />
			<Box className="pad" >
				<Flex borderWidth={2} borderRadius={10} backdropFilter={'blur(30px)'}
					justifyContent="space-between" paddingBlock={1} 
					alignItems="center" className="navbar"
					background="linear-gradient(90deg, rgba(251, 251, 251, 0.1) 0%, rgba(251, 251, 251, 0.1) 100%);" 
					position="fixed" w="95%" zIndex={10}
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
								<MenuItem _focus={{ color: '#141414', bgColor: "#D2D2D2" }}><Link fontSize="s" fontWeight="600"  href="#">home</Link>
								</MenuItem>
								<MenuItem _focus={{ color: '#141414', bgColor: "#D2D2D2" }}><Link fontSize="s" fontWeight="600" href="https://bits-sarc.org" target="_blank">about</Link>
								</MenuItem>
								<MenuItem _focus={{ color: '#141414', bgColor: "#D2D2D2" }}><Link fontSize="s" fontWeight="600" 
									href="#contact">contact</Link>
								</MenuItem>
								<MenuItem _focus={{ color: '#141414', bgColor: "#D2D2D2" }}><Link fontSize="s" fontWeight="600" >developers</Link></MenuItem>
							</MenuList>
						</Menu>
					</Box>

					{loggedIn ?
						<Button onClick={gotoprofile} mr={10} bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%);"  _hover={{ transform: "translate(-2px, -2px)" , bg: "linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)" }}>
							<Text fontSize="s" fontWeight="700" color="white" p={4}>Profile</Text>
						</Button>
						: <Box id="signInDiv" p={2}></Box>}
				</Flex>
			</Box>
		</>

	)
}