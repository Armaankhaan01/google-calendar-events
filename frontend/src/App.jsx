import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import GoogleAuthContent from "./components/GoogleAuthContent";

const App = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <GoogleAuthContent />
  </GoogleOAuthProvider>
);

export default App;
