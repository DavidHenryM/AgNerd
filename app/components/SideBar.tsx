'use client'

import { redirect } from 'next/navigation'
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  useColorMode,
  Button,
} from '@chakra-ui/react'
import {
  GiHighGrass,
  GiHamburgerMenu,
  GiCowboyBoot,
  GiFallDown,
  GiMoon,
  GiSun
} from 'react-icons/gi'
import {FaCow} from 'react-icons/fa6'
import {MdAgriculture} from 'react-icons/md'
import { FiBell } from 'react-icons/fi'
import { IconType } from 'react-icons'
// import { FarmCard } from './FarmCard'
// import { LivestockCards } from './LivestockCards'
import { ActiveLivestock } from '../basicDetails'
// import { useSession, signIn, signOut } from "next-auth/react"
// import { useQuery } from '@apollo/client'
// import { isUserAuthorizedQuery } from '../lib/queries'
import { useEffect, useRef } from 'react'
// import { AuthProviderNames } from '@prisma/client'

import Loading from '../loading'


interface LinkItemProps {
  name: string
  icon: IconType
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: React.ReactNode
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Farm', icon: MdAgriculture },
  { name: 'Livestock', icon: FaCow },
  { name: 'Pasture', icon: GiHighGrass },
  // { name: '', icon: FiStar },
  // { name: 'Settings', icon: FiSettings },
]

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <HStack>
          <Image 
            src='https://slackmojis.com/emojis/10902-nerdy_cowboy/download'
            alt='AgNerd'
            boxSize='40px'
          />
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            AgNerd
          </Text>
        </HStack>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => ( 
         <NavItem key={link.name} icon={link.icon}> 
            {link.name} 
          </NavItem> 
       ))} 
    </Box>
  )
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

const MobileNav = (props: any) => {
  const { colorMode, toggleColorMode } = useColorMode()

  let name = 'John Wayne'
  let image = 'https://cdn.britannica.com/82/136182-050-6BB308B7/John-Wayne.jpg'
  let email = ''
  const session = props.session
  if (session) {
    if (session.user) {
      if (session.user.name) {
        name = session.user.name
      }
      if (session.user.image) {
        image = session.user.image
      }
      if (session.user.email) {
        email = session.user.email
      }

    }
  }
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...props.rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={props.onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<GiHamburgerMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
      <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? <GiMoon/> : <GiSun/>}
      </Button>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={image}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Cowboy
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <GiFallDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              {/* <MenuItem onClick={()=>(signOut())}>Sign out</MenuItem> */}
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

const SidebarWithHeader = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const { data: session, status: status } = useSession()
  const { colorMode, toggleColorMode } = useColorMode()

  // const colorMode = useColorModeValue('gray.100', 'gray.900')
  // let providerName = AuthProviderNames.GITHUB
  let email = ''
  let userName = ''
  // const userAuthQuery = useRef(isUserAuthorizedQuery(providerName, email, userName))
  // let variables: OperationVariables = {}
  // useEffect(() => {  
  //   userAuthQuery.current = isUserAuthorizedQuery(providerName, email, userName)

  // }, [providerName, email, userName])
  // const variables = userAuthQuery.current.variables
  // const { loading, error, data } = useQuery(userAuthQuery.current.query, {variables})
  const loading = false
  const error = false
  const status = 'authenticated'
  const data = false
  const session = {name: "test", email: "test@test.test"}

  // if (status == 'loading') {
    // return (
      // <Loading/>
    // )
  // } else if(status == 'unauthenticated') {
    // TODO: add error alert
    // signIn() 
  // } else if (status == 'authenticated') { 
    // if (loading) {
      // return (
        // <Loading/>
      // )
    // } else if (error) {
      // redirect('/error')
    // } else if (data) {
      // console.log(data)
    
    return (
      <Box minH="100vh" >
        <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
        {/* mobilenav */}
        <MobileNav onOpen={()=>{}} session={session}/>
        <Box ml={{ base: 0, md: 60 }} p="4">
          <ActiveLivestock/>
        </Box>
      </Box>
    )
  }



export default SidebarWithHeader