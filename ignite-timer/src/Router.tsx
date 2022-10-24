import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { DefaultLayout } from "./layout/DefaultLayout";
import { History } from "./pages/Histoy";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}
