import { useEffect, useState } from "react";
import { HiOutlineUser } from "react-icons/hi";

import { NextPageWithLayout } from "@/models/index";
import { MainLayout } from "@/components/Layouts";
import { withAuth } from "@/hoc/index";
import { useAuth } from "@/hook/index";
import { apiClient } from "@/lib/axios";
import { User } from "@/models/user";

const Profile: NextPageWithLayout = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<User>();

    useEffect(() => {
        (async () => {
            const userProfile = await apiClient.getUserProfile(user?.id!);
            setProfile(userProfile);
        })();
    }, []);

    return (
        <div className="px-6 mt-20 md:mt-80 min-h-screen">
            <div className="md:pl-16 2xl:pl-80 ">
                <div className="w-full mb-16 p-3 shadow-lg rounded-sm dark:border-white dark:border-2 dark:rounded-lg">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-white pb-5">
                        <HiOutlineUser size={40} />
                        <span className="tracking-wide text-3xl">Thông tin</span>
                    </div>
                    <div className="text-gray-700 dark:text-white">
                        <div className="grid md:grid-cols-2 text-2xl leading-10 gap-2">
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Tên</div>
                                <div className="px-4 py-2 truncate">
                                    {profile?.info?.firstName || "Chưa cung cấp"}
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Họ / Tên đệm</div>
                                <div className="px-4 py-2 truncate">
                                    {profile?.info?.lastName || "Chưa cung cấp"}
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Giới tính</div>
                                <div className="px-4 py-2 truncate">
                                    {profile?.info?.gender || "Chưa cung cấp"}
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Số điện thoại</div>
                                <div className="px-4 py-2 truncate">
                                    {profile?.info?.phoneNumber || "Chưa cung cấp"}
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Email</div>
                                <div className="px-4 py-2 truncate">
                                    <a
                                        className="sub-color "
                                        href={profile?.info?.email ? `mailto:${profile?.info?.email}` : ""}
                                    >
                                        {profile?.info?.email || "Chưa cung cấp"}
                                    </a>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Ngày sinh</div>
                                <div className="px-4 py-2">{profile?.info?.dob || "Chưa cung cấp"}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Đăng nhập bằng</div>
                                <div className="px-4 py-2 truncate">
                                    {(profile?.providerId === "firebase" ? (
                                        <img src="/logo.svg" alt="" className="dark:bg-white dark:rounded-md" />
                                    ) : (
                                        profile?.providerId
                                    )) || "Chưa cung cấp"}
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Ngày tham gia</div>
                                <div className="px-4 py-2 truncate">{profile?.createdAt || "Chưa cung cấp"}</div>
                            </div>
                        </div>
                    </div>
                    {/* <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                        Show Full Information
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default withAuth(Profile, MainLayout);
