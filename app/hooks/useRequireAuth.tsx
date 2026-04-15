import { Navigate } from "react-router";
import { useMe } from "~/hooks/useAuth";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useMe();

  const isAuthenticated = !!data;

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/40 border-t-white" />
      </div>
    );
  }

  if (isError || !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};