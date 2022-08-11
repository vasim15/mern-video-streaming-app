import React,{Fragment} from "react";
import { Routes, Route, Outlet,Navigate } from "react-router-dom";
import PrivateRoute from './auth/PrivateRoute'
import Home from "./core/Home";
import EditMedia from "./media/EditMedia";
import NewMedia from "./media/NewMedia";
import PlayMedia from "./media/PlayMedia";
import routeConfig from './routeConfig'
import Menu from "./core/Menu";


const MainRouter = ({serverData}) => {
  console.log(serverData,'serverData')
  return (
    <Fragment>
      <Menu/>
      <Routes>
        {routeConfig.map(({ path, fetchInitialData, component: C }) => (
          <Route
            key={path}
            path={path}
            element={
              <C data={serverData} {...(fetchInitialData && {fetchInitialData})} />
            }
          />
        ))}

        {/* <Route path="/" element={<Home />} />
        <Route
          path="/media/new"
          element={<PrivateRoute element={<Outlet />} />}
        >
          <Route path="/media/new" element={<NewMedia />} />
        </Route>
        <Route
          path="/media/edit/:mediaId"
          element={<PrivateRoute element={<Outlet />} />}
        >
          <Route path="/media/edit/:mediaId" element={<EditMedia />} />
        </Route>
        <Route path="/media/:mediaId" element={<PlayMedia data={data} />} />
        <Route
          path="/*"
          element={<Navigate to="/" state={{ from: "location" }} />}
        /> */}
      </Routes>
    </Fragment>
  );
};

export default MainRouter;
