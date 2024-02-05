import {useContext as _useContext} from 'react';
import {StoreContext} from '../providers/settings';

export const useSettings = () => _useContext(StoreContext);
