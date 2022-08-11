import { read } from "./media/api-media";
import PrivateRoute from "./auth/PrivateRoute";
import Home from "./core/Home";
import EditMedia from "./media/EditMedia";
import NewMedia from "./media/NewMedia";
import PlayMedia from "./media/PlayMedia";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/signin",
    component: Signin,
  },
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/user/:userId",
    component: Profile,
  },
  {
    path: "/user/edit/:userId",
    component: EditProfile,
  },

  {
    path: "/media/:mediaId",
    component: PlayMedia,
    fetchInitialData: (path = "") => read(path.split("/").pop()),
  },

  {
    path: "/media/new",
    component: NewMedia,
  },
  {
    path: "/media/edit/:mediaId",
    component: EditMedia,
  },
];
export default routes;
