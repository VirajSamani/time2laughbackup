import Loader from "../components/loader/Loader";
import { LoaderProvider } from "../context/LoaderContext";
import Routers from "../routers";

function App() {
  return (
    <>
      <LoaderProvider>
        <Routers />
        <Loader />
      </LoaderProvider>
    </>
  );
}

export default App;
