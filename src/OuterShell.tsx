import React, { useState, useEffect } from 'react'
import { AppShell, Burger, Button, Group, Container, Header, MediaQuery, Navbar, Text, Footer, Aside, Menu, Avatar, useMantineTheme, UnstyledButton } from '@mantine/core';
import { Link } from 'react-router-dom';
import MainLinks from './_mainlinks';
import { Settings, Search, Photo, MessageCircle, Trash, ArrowsLeftRight } from 'tabler-icons-react'
import { Outlet } from 'react-router-dom';

import { callMsGraph } from './graph'
import { loginRequest } from './authConfig'
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

function ShowAccountSeal() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState<null | {givenName: string, surname: string, userPrincipalName: string}>(null);

  useEffect(() => {
    console.log("entering useEffect");
    //This is the correct way to use async/await with useEffect.
    //See https://devtrium.com/posts/async-functions-useeffect for more info.
    const getUserInfo = async () => {
      console.log("entering async info fetch");
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
      })
      const result = await callMsGraph(response.accessToken)
      console.log(result);
      setGraphData(result);
    };

    getUserInfo();

  }, []);

  const handleLogout = (logoutType : string = "redirect") => {
    if (logoutType === "popup") {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/"
        });
    } else if (logoutType === "redirect") {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
    }
  }

  const userInitials = graphData && [graphData.givenName,graphData.surname].map((n) => n[0]);

  return (
    !graphData ? <div /> :
    <Menu shadow="md" width={200} withinPortal={true}>
      <Menu.Target>
        <UnstyledButton>
          <Group>
            <Avatar size={40} color="blue">{userInitials}</Avatar>
            <div>
              <Text>{graphData.givenName} {graphData.surname}</Text>
              <Text size="xs" color="dimmed">{graphData.userPrincipalName}</Text>
            </div>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
        <Menu.Item icon={<MessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
        <Menu.Item
          icon={<Search size={14} />}
          rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<ArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
        <Menu.Item onClick={() => handleLogout()} color="red" icon={<Trash size={14} />}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>    
  );
}

const SignInButton = (props : any) => {
  const { instance } = useMsal();
 
  const handleLogin = (loginType : string) => {
    console.log('button click');
      if (loginType === "popup") {
          instance.loginPopup(loginRequest).catch(e => {
              console.log(e);
          });
      } else if (loginType === "redirect") {
          instance.loginRedirect(loginRequest).catch(e => {
              console.log(e);
          });
      }
  }
  return (
    <Button onClick={() => handleLogin("redirect")}>Sign in</Button>
      // <DropdownButton variant="secondary" className="ml-auto" drop="left" title="Sign In">
      //     <Dropdown.Item as="button" onClick={() => handleLogin("popup")}>Sign in using Popup</Dropdown.Item>
      //     <Dropdown.Item as="button" onClick={() => handleLogin("redirect")}>Sign in using Redirect</Dropdown.Item>
      // </DropdownButton>
  )
}

const AccountControl = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    isAuthenticated ? <ShowAccountSeal /> : <SignInButton>Sign-in</SignInButton>
  );
}

export function OuterShell() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Text>Application navbar</Text>
          <Navbar.Section>
            {/* <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                </ul> */}
            <MainLinks />
          </Navbar.Section>

          {/* Grow section will take all available space that is not taken by first and last sections */}
          <Navbar.Section grow>Grow section
          </Navbar.Section>

          {/* Last section with normal height (depends on section content) */}
          <Navbar.Section>Last section</Navbar.Section>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }} >
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        // style={{ display: 'flex', alignItems: 'center', height: '100%' }}

        <Header height={{ base: 50, md: 70 }} p="md">

          <div  >
            <Container >
              <Group position="apart">
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>
                <Text>SOME LOGO!</Text>

                <AccountControl />

              </Group>
            </Container>
            <Text>Application headers</Text>
          </div>
        </Header>
      }
    >
      <Text>Resize app to see responsive navbar in action</Text>
      {/* For my particular usage of react-router-dom, this <Outlet />
      element is the equivalent of {props.children} */}
      <Outlet />
    </AppShell>
  );

}