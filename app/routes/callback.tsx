import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authKeys } from "~/hooks/useAuth";
import { authService, setToken } from "~/services";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();

  useEffect(() => {
    const finishLogin = async () => {
      try {
        const params = new URLSearchParams(window.location.search);

        const token = params.get("token");

        if (!token) {
          navigate("/", { replace: true });
          return;
        }

        // save token
        setToken(token);

        // fetch authenticated user
        await qc.fetchQuery({
          queryKey: authKeys.me,
          queryFn: authService.me,
        });

        // redirect
        navigate("/home", { replace: true });
      } catch (err) {
        console.error(err);
        navigate("/", { replace: true });
      }
    };

    finishLogin();
  }, [navigate, qc]);

  return <p>Signing you in...</p>;
};

export default GoogleCallback;