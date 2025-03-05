import Spinner from "@/components/shaired/spinner";

const Loading = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div>
          <Spinner />
        </div>
      </div>
    </div>
  );
};

export default Loading;
