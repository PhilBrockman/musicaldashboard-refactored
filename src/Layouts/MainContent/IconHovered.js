import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
  },
});

const StyledIcon = styled(Icon)`
  ${({ theme }) => `
  cursor: pointer;
  transition: ${theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    transform: scale(1.5);
  }
  `}
`;

export default function TransitionHover(props) {
  return (
    <NoSsr>
      <MuiThemeProvider theme={customTheme}>
        <ThemeProvider theme={customTheme}>
          <StyledIcon>{props.children}</StyledIcon>
        </ThemeProvider>
      </MuiThemeProvider>
    </NoSsr>
  );
}
