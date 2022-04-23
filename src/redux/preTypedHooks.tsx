/* From react-redux docs: https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks
"While it's possible to import the RootState and AppDispatch types into each component, 
it's better to create pre-typed versions of the useDispatch and useSelector hooks for usage in your application."" */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

console.log('Export our pretyped hooks...');

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
