import {useContext as _useContext} from 'react';
import {ThemeContext} from '../providers/theme/theme';

export const useTheme = () => _useContext(ThemeContext);
