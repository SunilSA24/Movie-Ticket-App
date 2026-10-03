import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../apiCalls/authCalls";
import { setUserData } from "../redux/slices/user";
import type { RootState } from "../redux/store";

export function useUserController() {
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.user?.userData ?? null);

    const getUser = useCallback(async () => {
        try {
            const currentUser = await getCurrentUser();
            dispatch(setUserData(currentUser));
            return currentUser;
        } catch (error) {
            console.error("Failed to fetch current user:", error);
            return null;
        }
    }, [dispatch]);

    useEffect(() => {
        void getUser();
    }, [getUser]);

    return {
        userData,
        getUser,
    };
}

export default useUserController;
