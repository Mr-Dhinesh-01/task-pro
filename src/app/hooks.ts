import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// typed versions of the Redux hooks — use these everywhere
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();