import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

import Spinner from "./components/spinner/spinner.component";
import { checkUserSession } from "./store/user/user.action";

import { GlobalStyle } from "./global.styles";

const Home = lazy(() => import("./routes/home/home.component"));
const Navigation = lazy(() =>
  import("./routes/navigation/navigation.component")
);
const Authentication = lazy(() =>
  import("./routes/authentication/authentication.component")
);
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));

const App = () => {
  const dispatch = useDispatch();

  // Have in mind the before configuration for the user was an optimized firebase code, so using sagas in this case is no better, but just an example of how to use it.
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
