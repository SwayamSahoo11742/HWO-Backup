export const ExoTable = ({ data }) => {
  console.log(data);
  return (
    <div className="card bg-transparent border border-white w-full shadow-xl">

      <div className="card-body">
        <h2 className="card-title text-3xl font-bold text-white">
          Exoplanet
          

        </h2>
        <hr class="h-px my-8 bg-white-200 border-0 dark:bg-gray-700 mt-2" />
        <h2 className="card-title text-2xl font-bold text-white underline">
          {data.pl_name}
        </h2>
        <p className="text-lg text-white">
          <strong>Discoverer:</strong> {data.disc_facility}
        </p>
        <p className="text-lg text-white">
          <strong>Discovery Method:</strong> {data.discoverymethod}
        </p>
        <p className="text-lg text-white">
          <strong>Discovery Year:</strong> {data.disc_year}
        </p>
        <p className="text-lg text-white">
          <strong>Mass:</strong> {data.pl_bmasse}
        </p>
        <p className="text-lg text-white">
          <strong>Radius:</strong> {data.pl_rade}
        </p>
        <p className="text-lg text-white">
          <strong>ESI:</strong> {parseFloat(data.ESI).toFixed(2)}
        </p>
        <p className="text-lg text-white">
          <strong>Equilibrium Temperature:</strong> {data.pl_eqt} K
        </p>
        <p className="text-lg text-white">
          <strong>Stellar Flux:</strong> {data.pl_insol} S⊕
        </p>
        <p className="text-lg text-white">
          <strong>Characterizable?:</strong>{" "}
          {data.characterizable ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};