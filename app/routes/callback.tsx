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
    try {
      await qc.invalidateQueries({ queryKey: authKeys.me });

      const user = await qc.fetchQuery({
        queryKey: authKeys.me,
        queryFn: authService.me,
      });

      if (user?.user) {
        navigate("/home", { replace: true });
      } else {
        navigate("/");
      }
    } catch {
      navigate("/");
    }
  };

  finishLogin();
}, []);

  return <p>Signing you in...</p>;
};

export default GoogleCallback;