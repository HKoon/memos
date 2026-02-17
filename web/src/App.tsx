import { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { useInstance } from "./contexts/InstanceContext";
import { MemoFilterProvider } from "./contexts/MemoFilterContext";
import useNavigateTo from "./hooks/useNavigateTo";
import { useUserLocale } from "./hooks/useUserLocale";
import { useUserTheme } from "./hooks/useUserTheme";
import { cleanupExpiredOAuthState } from "./utils/oauth";
import { setAccessToken } from "./auth-state";
import useCurrentUser from "./hooks/useCurrentUser";

const App = () => {
  const navigateTo = useNavigateTo();
  const { profile: instanceProfile, generalSetting: instanceGeneralSetting } = useInstance();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentUser = useCurrentUser();

  // Handle external token from query parameter (e.g. from Linkin integration)
  const token = searchParams.get("token");
  useEffect(() => {
    if (token) {
      // Set token with 24h expiry
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      setAccessToken(token, expiresAt);
      // Remove token from URL
      searchParams.delete("token");
      setSearchParams(searchParams);
      // Force reload to apply token
      window.location.reload();
    }
  }, [token, searchParams, setSearchParams]);

  // Apply user preferences reactively
  useUserLocale();
  useUserTheme();

  // Clean up expired OAuth states on app initialization
  useEffect(() => {
    cleanupExpiredOAuthState();
  }, []);

  // Redirect to sign up page if instance not initialized (no admin account exists yet)
  useEffect(() => {
    if (!instanceProfile.admin && !currentUser && !token) {
      navigateTo("/auth/signup");
    }
  }, [instanceProfile.admin, navigateTo, currentUser, token]);

  useEffect(() => {
    if (instanceGeneralSetting.additionalStyle) {
      const styleEl = document.createElement("style");
      styleEl.innerHTML = instanceGeneralSetting.additionalStyle;
      styleEl.setAttribute("type", "text/css");
      document.body.insertAdjacentElement("beforeend", styleEl);
    }
  }, [instanceGeneralSetting.additionalStyle]);

  useEffect(() => {
    if (instanceGeneralSetting.additionalScript) {
      const scriptEl = document.createElement("script");
      scriptEl.innerHTML = instanceGeneralSetting.additionalScript;
      document.head.appendChild(scriptEl);
    }
  }, [instanceGeneralSetting.additionalScript]);

  // Dynamic update metadata with customized profile
  useEffect(() => {
    if (!instanceGeneralSetting.customProfile) {
      return;
    }

    document.title = instanceGeneralSetting.customProfile.title;
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    link.href = instanceGeneralSetting.customProfile.logoUrl || "/logo.webp";
  }, [instanceGeneralSetting.customProfile]);

  return (
    <MemoFilterProvider>
      <Outlet />
    </MemoFilterProvider>
  );
};

export default App;
