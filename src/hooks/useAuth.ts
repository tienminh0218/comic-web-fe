import {
    signInWithEmailAndPassword,
    signOut as signOutFirebase,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    getAdditionalUserInfo,
} from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

import { auth } from "@/firebase/config";
import { firestore } from "@/firebase/service";
import { useRecoilState } from "recoil";
import { userState } from "@/app/atoms";
import { SignInType, SignUpType, InsertNewUser } from "@/models/index";

export const useAuth = () => {
    const [user, setUser] = useRecoilState(userState);

    const insetNewUser = async ({ info, providerId }: InsertNewUser, uid: string) => {
        await firestore.addDb(
            "users",
            {
                info,
                providerId: providerId,
                histories: {
                    viewed: [],
                    bookMark: [],
                    liked: [],
                    unLiked: [],
                    genres: [],
                },
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            },
            uid
        );
    };

    const signUp = async ({ email, password, firstName, lastName }: SignUpType) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const newUser: InsertNewUser = {
                info: {
                    firstName,
                    lastName,
                },
                providerId: user.providerId,
            };
            await insetNewUser(newUser, user.uid);
        } catch (error) {
            console.log({ error });
            toast.error("Login Error");
        }
    };

    const signIn = async ({ email, password }: SignInType) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast("Đăng nhập thành công");
        } catch (error) {
            toast.error("Login Error");
            console.log({ error });
        }
    };

    const signInWithGoogle = async () => {
        try {
            const data = await signInWithPopup(auth, new GoogleAuthProvider());
            const { isNewUser, providerId, profile } = { ...getAdditionalUserInfo(data) };
            // console.log({ data, info: getAdditionalUserInfo(data) });
            if (isNewUser) {
                const newUser: InsertNewUser = {
                    info: {
                        lastName: profile?.family_name || "null",
                        firstName: profile?.given_name || "null",
                    },
                    providerId: providerId!,
                };
                await insetNewUser(newUser, data.user.uid);
            }
        } catch (error) {
            console.log({ error });
        }
    };

    const signInWithFacebook = async () => {
        try {
            const data = await signInWithPopup(auth, new FacebookAuthProvider());
            const { isNewUser, providerId, profile } = { ...getAdditionalUserInfo(data) };
            // console.log({ data, info: getAdditionalUserInfo(data) });
            if (isNewUser) {
                const newUser: InsertNewUser = {
                    info: {
                        firstName: profile?.first_name || "null",
                        lastName: profile?.last_name || "null",
                    },
                    providerId: providerId!,
                };
                await insetNewUser(newUser, data.user.uid);
            }
        } catch (error: any) {
            const credential = FacebookAuthProvider.credentialFromError(error);
            console.log({ error, credential });
        }
    };

    const signOut = () => {
        signOutFirebase(auth)
            .then(() => {
                setUser(undefined);
                toast("Đăng xuất thành công");
            })
            .catch((error) => {
                toast("Logout Error");
                console.log({ error });
            });
    };

    return {
        user,
        setUser,
        signIn,
        signOut,
        signUp,
        signInWithGoogle,
        signInWithFacebook,
    };
};
