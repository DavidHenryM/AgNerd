'use client'

import { useTheme } from 'next-themes'
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger
} from "@chakra-ui/react/menu"
import { Avatar, AvatarFallback } from "@chakra-ui/react/avatar"
import { IconType } from 'react-icons'
import Link from 'next/link'
import { Box, BoxProps, Flex, FlexProps, HStack, Text, IconButton, Button, VStack, useDisclosure, StackSeparator} from '@chakra-ui/react'
import { Icons } from '../lib/Icons'
import { NerdCowboy } from './Images'


interface LinkItemProps {
  name: string
  icon: IconType
  target: string
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
  { name: 'Farm', icon: Icons.MdAgriculture, target: "farm" },
  { name: 'Livestock', icon: Icons.FaCow, target: "livestock" },
  { name: 'Pasture', icon: Icons.GiHighGrass, target: "pasture" },
  { name: 'Settings', icon: Icons.FiSettings, target: "settings" },
]

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      borderRight="1px"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <HStack>
          <NerdCowboy size={40}/>
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            AgNerd
          </Text>
        </HStack>
        <IconButton display={{ base: 'flex', md: 'none' }} onClick={onClose}>
          <Icons.LuX />
        </IconButton>
      </Flex>
      <VStack separator={<StackSeparator />}>
        {LinkItems.map((link) => ( 
          <NavItem key={link.name} name={link.name} NavIcon={link.icon} target={link.target}/> 
        ))} 
      </VStack>
    </Box>
  )
}

function NavItem(props: {NavIcon: IconType, name: string, target: string}) {
  return (
    <Box
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: "md" }}
      w={{ base: 'full', md: 60 }}> 
      <HStack
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'teal',
          color: 'white',
        }}
        gap={4}>
      <props.NavIcon/>
      <Link href={props.target}>{props.name}</Link>
    </HStack>
    </Box>
  )
}

const MobileNav = (props: any) => {
  const {theme, setTheme} = useTheme()
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
      borderBottomWidth="1px"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...props.rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={props.onOpen}
        variant="outline"
        aria-label="open menu"
      >
        <Icons.GiHamburgerMenu />
      </IconButton>
      

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
      </Text>

      <HStack gap={{ base: '0', md: '6' }}>
      <Button onClick={()=>setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? <Icons.GiMoon/> : <Icons.GiSun/>}
      </Button>
        <IconButton size="lg" variant="ghost" aria-label="open menu" >
          <Icons.FiBell/>
        </IconButton>
        <Flex alignItems={'center'}>
          <MenuRoot>
            <MenuTrigger py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar.Root size={'sm'}>
                  <Avatar.Image src={image}/>
                  <AvatarFallback>AN</AvatarFallback>
                </Avatar.Root>
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  gap="1px"
                  ml="2">
                  <Text fontSize="sm">{name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Cowboy
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <Icons.GiFallDown />
                </Box>
              </HStack>
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="Profile"/>
              <MenuItem value="Settings"/>
              <MenuItem value="Billing"/>
              {/* <MenuItem onClick={()=>(signOut())}>Sign out</MenuItem> */}
            </MenuContent>
          </MenuRoot>
        </Flex>
      </HStack>
    </Flex>
  )
}

const SidebarWithHeader = (props: {Content: any}) => {
  const { open, onOpen, onClose } = useDisclosure()

  // const colorMode = useTheme('gray.100', 'gray.900')
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
    const Content = props.Content
    return (
      <Box minH="100vh" >
        <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
        {/* mobilenav */}
        <MobileNav onOpen={()=>{}} session={session}/>
        <Box ml={{ base: 0, md: 60 }} p="4">
          <Content/>
        </Box>
      </Box>
    )
  }



export default SidebarWithHeader