import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authKeys } from "~/hooks/useAuth";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();

  useEffect(() => {
    const finishLogin = async () => {
      await qc.invalidateQueries({ queryKey: authKeys.me });

      navigate("/home", { replace: true });
    };

    finishLogin();
  }, [navigate, qc]);

  return <p>Signing you in...</p>;
};

export default GoogleCallback;