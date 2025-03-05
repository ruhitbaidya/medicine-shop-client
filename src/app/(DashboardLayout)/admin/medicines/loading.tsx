import Spinner from "@/components/shaired/spinner";

const LoadingPage = () => {
  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <div>
          <Spinner />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
