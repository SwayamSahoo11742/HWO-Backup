export const HostStarTable = ({ data }) => {
  return (
    <div className="card bg-transparent border border-white w-full shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold text-white">
          Host Star
        </h2>
      <hr class="h-px my-8 bg-white-200 border-0 dark:bg-gray-700 mt-2" />
        <h2 className="card-title text-2xl font-bold text-white underline">
          {data.hostname}
        </h2>
        <p className="text-lg text-white">
          <strong>Stellar Radius: </strong> {data.st_rad}
        </p>
        <p className="text-lg text-white">
          <strong>Stellar Class: </strong> {data.st_spectype}
        </p>
        <p className="text-lg text-white">
          <strong>Apparent Magnitude: </strong> {data.sy_vmag}
        </p>
      </div>
    </div>
  );
};