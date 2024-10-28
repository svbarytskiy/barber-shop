import { FC } from "react";
import LoadingSpinner from "../../comon/ui/LoadingSpinner/LoadingSpinner";

const LoadingScreen: FC = () => {
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <LoadingSpinner />
    </section>
  );
};

export default LoadingScreen;
