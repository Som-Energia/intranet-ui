import Head from 'next/head'
import Breadcrumbs from 'components/layout/Breadcrumbs'
import { useTheme } from '@mui/styles'
import {
  Box,
  Container,
  Typography,
  Paper,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon
} from '@mui/material'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import BugReportIcon from '@mui/icons-material/BugReport'
import ChatIcon from '@mui/icons-material/Chat'
import GavelIcon from '@mui/icons-material/Gavel'
import StyleIcon from '@mui/icons-material/Style'
import SupportIcon from '@mui/icons-material/Support'

const IncidencesPage = () => {
  const theme = useTheme()

  const formList = [
    {
      title: 'Incidències IT',
      url: 'https://docs.google.com/a/somenergia.coop/forms/d/e/1FAIpQLScxCEJBdKwC8tsCY8aYikbdr2FvXJOP9IC3LWrlcxhovM4w8A/viewform',
      icon: <BugReportIcon />
    },
    {
      title: 'Necessitats de comunicació',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSd4eIwI0WFoHRcZJ32T3wqM0LuRkvGGd0wgldqpHt6licNM3w/viewform',
      icon: <ChatIcon />
    },
    {
      title: "Necessitats d'estil",
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSeQbQnVOrUN7Q1lprytf_Bx94g7NjYJhv1WTdG-KxUi1UWYzw/viewform?gxids=7628',
      icon: <StyleIcon />
    },
    {
      title: 'Consultes jurídiques',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSfUs4brGdaiyO5bUdgkQWLk9c6tEJTRAhFWys8Yq-y_5o7jDQ/viewform?c=0&w=1',
      icon: <GavelIcon />
    },
    {
      title: 'Equip Atenció i Suport',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLScNYkhpsCGjyum2wf9Ql0MTTC7_j1QonFxreJcX4yNo1rJBAg/viewform',
      icon: <SupportIcon />
    },
    {
      title: "Registre d'indemnitzacions",
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSeESVvTvDDnuNZwhdHiZYYzkKjXc2zyOzoGhBxpUMkUvIJgOA/viewform',
      icon: <AttachMoneyIcon />
    }
  ]

  return (
    <>
      <Head>
        <title>Incidències i consultes | Som Energia</title>
      </Head>
      <Container
        sx={{
          padding: theme.spacing(2),
          '@media (min-width: 780px)': {
            padding: theme.spacing(4)
          }
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            '@media (max-width: 780px)': {
              flexDirection: 'column-reverse',
              alignItems: 'flex-start',
              justifyContent: 'flex-start'
            }
          }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1.5rem',
              fontWeight: 500
            }}>
            Incidències i consultes
          </Typography>
          <Breadcrumbs />
        </Box>
        <Box sx={{ paddingTop: '24px' }}>
          <Paper elevation={0} sx={{ padding: '1rem' }}>
            <List>
              {formList.map(({ title, url, icon }) => (
                <ListItem
                  key={url}
                  component={Link}
                  href={url}
                  target="_blank"
                  color="inherit"
                  underline="none">
                  <ListItemButton>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default IncidencesPage
