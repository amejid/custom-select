import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App.jsx";
import { Toaster } from "@/components/ui/toaster.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Toaster />
  </>,
);
