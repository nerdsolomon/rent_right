import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authKeys } from "~/hooks/useAuth";
// import { setToken } from "~/services";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();

  useEffect(() => {
  const finishLogin = async () => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (token) {
      // setToken(token);

      await qc.invalidateQueries({
        queryKey: authKeys.me,
      });

      navigate("/home", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  finishLogin();
}, []);
  return <p>Signing you in...</p>;
};

export default GoogleCallback;