import React from 'react';
import { ThemeIcon, UnstyledButton, Group, Text, Box, NavLink } from '@mantine/core';
import { Link } from 'react-router-dom';


interface MainLinkProps {
    path: string;
    color: string;
    label: string;
}

function MainLink({ path, color, label }: MainLinkProps) {
    return (
        <>

            <UnstyledButton
                sx={(theme) => ({
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    textDecorationColor: theme.colors.green,
                    color: theme.colors.green, //theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                })}
            >
                {/* <Group>
            <ThemeIcon color={color} variant="light">
              {icon}
            </ThemeIcon>
              <Text size="sm">{label}</Text>
  
          </Group> */}

                <Box sx={(theme) => ({
                    color: theme.colors.red,
                    '&:hover': {
                        color: theme.colors.orange
                    }
                })}>
                    <Link to={path}>{label}</Link>
                    {/* <NavLink component={Link} to={path}>{label}</NavLink> */}
                </Box>

            </UnstyledButton></>

    );
}

const data = [
    { path: "/", color: 'blue', label: 'Main' },
    { path: "/about", color: 'teal', label: 'About' },
];

export default function MainLinks() {
    const links = data.map((link) => <MainLink {...link} key={link.label} />);
    return <div>{links}</div>;
}