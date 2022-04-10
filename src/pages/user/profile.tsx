import { useEffect, useState } from "react";

import { NextPageWithLayout, ComicType } from "@/models/index";
import { MainLayout } from "@/components/Layouts";
import { withAuth } from "@/hoc/index";
import { useAuth } from "@/hook/index";

const Profile: NextPageWithLayout = () => {
    const { user } = useAuth();

    return <div className="px-6 mt-20 min-h-screen">profile</div>;
};

export default withAuth(Profile, MainLayout);
