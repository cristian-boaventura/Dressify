// Note: Neither this Home component nor the Outlet component are actually necessary. Anyways I will left them for the example purpose of big apps architecture.

import { Outlet } from "react-router-dom";

import Directory from "../../components/directory/directory.component";

const Home = () => {
  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  );
};

export default Home;
