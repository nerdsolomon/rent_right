import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authService } from "~/services/auth.service";
import { authKeys } from "~/hooks/useAuth";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();

  useEffect(() => {
    const finishLogin = async () => {
      const user = await qc.fetchQuery({
        queryKey: authKeys.me,
        queryFn: authService.me,
      });

      if (user) {
        navigate("/home", { replace: true });
      }
    };

    finishLogin();
  }, [navigate, qc]);

  return <p>Signing you in...</p>;
};

export default GoogleCallback;