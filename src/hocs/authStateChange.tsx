import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useSetRecoilState } from "recoil";

import { LoadingScreen } from "@/components/Common";
import { auth } from "@/firebase/config";
import { useAuth } from "@/hooks/useAuth";
import { firestore } from "@/firebase/service";
import { genresState } from "@/app/atoms";
import { GenreType } from "@/models/genre";

interface Props {
    children: ReactNode;
}

export const AuthStateChange = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const setGenres = useSetRecoilState(genresState);
    const { setUser } = useAuth();

    useEffect(() => {
        /// theme
        document.body.classList.add("transition-all", "duration-500");
        Boolean(localStorage.getItem("DarkTheme")) && document.body.classList.add("dark", "bg-black");

        (async () => {
            const data = await firestore.getDocsDb<GenreType[]>("genres");
            setGenres(data);
        })();

        /// auth state change
        const unSubAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({ id: user.uid, email: user.displayName || user.email });
            }
            setIsLoading(false);
        });

        return () => {
            unSubAuth();
        };
    }, []);

    return <>{isLoading ? <LoadingScreen /> : <>{children}</>}</>;
};
