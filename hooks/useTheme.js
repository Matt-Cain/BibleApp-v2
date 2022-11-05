import React from 'react';
import { ThemeContext } from '../context/ThemeProvider';
export const useTheme = () => React.useContext(ThemeContext);