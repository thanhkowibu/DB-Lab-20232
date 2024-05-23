import { useAuth } from "@/context/useAuth";

export const GlobalLoading = () => {
  const { isLoading } = useAuth();
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center">
          GlobalLoading
        </div>
      )}
    </>
  );
};
