import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Spin } from "antd";
import EventTable from "./EventTable";
import { CalendarOutlined } from "@ant-design/icons";

const GoogleAuthContent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check for existing session
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useGoogleLogin({
    flow: "auth-code",
    scope:
      "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
    onSuccess: async (codeResponse) => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/google/callback`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: codeResponse.code }),
          }
        );
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("googleAccessToken", data.tokens.access_token);
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => console.error("Login Failed:", error),
  });

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {!user ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-blue-50 rounded-full w-16 h-16">
                <CalendarOutlined
                  className="text-blue-500 me-1"
                  style={{ fontSize: "32px" }}
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Calendar Events
              </h1>
              <p className="text-gray-500 text-center max-w-sm">
                Access and manage your Google Calendar events in one place. Sign
                in to get started.
              </p>
            </div>

            <button
              onClick={login}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <img
                src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                alt="Google logo"
                className="w-6 h-6"
              />
              <span className="text-gray-700 font-medium">
                Sign in with Google
              </span>
            </button>

            <div className="pt-4 text-center">
              <p className="text-sm text-gray-500">
                By signing in, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8">
          <EventTable user={user} logout={logout} />
        </div>
      )}
    </div>
  );
};

export default GoogleAuthContent;
