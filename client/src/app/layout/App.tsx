import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container, CssBaseline } from "@mui/material";
import { useStoreContext } from "../context/StoreContext";
import { useEffect, useState } from "react";
import agent from "../agent";
import { IBasket } from "../models/basket";

function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export default function App() {

  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.getBasket()
        .then((basket: IBasket) => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }
    else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        {loading ? <h3>Loading...</h3> : <Outlet />}
      </Container>
    </>
  );
}

// export default App;
