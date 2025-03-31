export const mySkelaton = Array(3)
  .fill(0)
  .map((_, idx) => (
    <>
      <div key={idx} className="flex  flex-col gap-4">
        <div className="skeleton h-32 "></div>
        <div className="skeleton h-4 "></div>
        <div className="skeleton h-4"></div>
        <div className="skeleton h-4 "></div>
      </div>
    </>
  ));
