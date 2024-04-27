import { useDispatch,useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState,AppDispatch } from "../../store";



// use throughout your app instead useSelector and useDespatch

export const useAppDispatch : () => AppDispatch = useDispatch 
export const useAppSelector : () => TypedUseSelectorHook<RootState> = useSelector