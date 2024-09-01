import { Routes, Route } from "react-router-dom";
import UserInfo from "../User/Components/userInfo";

const ProfileUserModule = () => {
  return (
    <Routes>
      <Route index element={<UserInfo />} />
      {/* يمكنك تفعيل هذه الأسطر عند الحاجة */}
      {/* <Route path="info" element={<Home />} />
      <Route path="*" element={<Page404 />} /> */}
      {/* <Routes path="/profileUser" element={<ProfileUser />}>
      <Route path="user-info" element={<UserInfo />} /> */}
    </Routes>
  );
};

export default ProfileUserModule;
