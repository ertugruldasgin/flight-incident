import { useParams } from "react-router-dom";
import crashes from "../services/crashes.json";

const IncidentDetail = () => {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id);
  const crash = crashes.find((incident) => incident.title === decodedId);

  if (!crash) {
    return (
      <div className="h-[92vh] flex flex-col justify-center items-center">
        <p className="text-8xl lg:text-9xl font-semibold text-neutral-500/20 dark:text-red-500/20 transition-colors duration-300">
          404
        </p>
        <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-30 text-neutral-500/20 dark:text-red-500/20 transition-colors duration-300">
          Incident not found.
        </div>
      </div>
    );
  }

  return (
    <div className="z-20 flex flex-col gap-8 items-center pt-2 px-4 mb-4 text-neutral-900 dark:text-white xl:max-w-[70%] mx-auto transition-colors duration-300">
      <div className="bg-white/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg opacity-70 w-full p-4 transition-colors duration-300">
        <div className="w-full h-full bg-neutral-300/30 dark:bg-neutral-600/50 border-0 rounded-lg p-4 shadow-md flex flex-col items-start transition-colors duration-300">
          <p className="text-xl sm:text-2xl md:text-3xl xl:text-4xl capitalize font-semibold text-neutral-900 dark:text-white transition-colors duration-300">
            {crash.title}
          </p>

          {/* SIMPLE DETAILS */}
          <div className="text-xs sm:text-sm lg:text-base mt-2 lg:mt-4 flex flex-col gap-1 text-neutral-600 dark:text-neutral-300 transition-colors duration-300">
            <p>
              <strong>Date: </strong>
              {formatDateDisplay(crash.date)}
            </p>
            <p className="capitalize">
              <strong>Site: </strong>
              {formatLocationDisplay(crash.site)}
            </p>
            <p>
              <strong>Coordinates: </strong>
              {crash.coordinates}
            </p>
            <p>
              <strong>Aircraft Type: </strong>
              {crash.aircraftType}
            </p>
            <p>
              <strong>Operator: </strong>
              {crash.operator}
            </p>
            <p>
              <strong>Occupants: </strong>
              {crash.occupants}
            </p>
            <p>
              <strong>Passengers: </strong>
              {crash.passengers}
            </p>
            <p>
              <strong>Crew: </strong>
              {crash.crew}
            </p>
            <p>
              <strong>Fatalities: </strong>
              {crash.fatalities}
            </p>
            <p>
              <strong>Injuries: </strong>
              {crash.injuries}
            </p>
            <p>
              <strong>Survivors: </strong>
              {crash.survivors}
            </p>
          </div>

          {/* ALL DETAILS */}
          <div>
            {crash.details?.aircraft && (
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl mt-8 md:mt-10 lg:mt-12 uppercase font-bold tracking-wide">
                  Aircraft
                </h2>
                <hr className="border-neutral-500 mb-1" />
                {crash.details.aircraft.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm md:text-base text-neutral-800/90 dark:text-white/90 transition-colors duration-300 mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div>
            {crash.details?.incident && (
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl mt-8 md:mt-10 lg:mt-12 uppercase font-bold tracking-wide">
                  Incident
                </h2>
                <hr className="border-neutral-500 mb-1" />
                {crash.details.incident.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm md:text-base text-neutral-800/90 dark:text-white/90 transition-colors duration-300 mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div>
            {crash.details?.investigation && (
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl mt-8 md:mt-10 lg:mt-12 uppercase font-bold tracking-wide">
                  Investigation
                </h2>
                <hr className="border-neutral-500 mb-1" />
                {crash.details.investigation.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm md:text-base text-neutral-800/90 dark:text-white/90 transition-colors duration-300 mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div>
            {crash.details?.cause && (
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl mt-8 md:mt-10 lg:mt-12 uppercase font-bold tracking-wide">
                  Cause
                </h2>
                <hr className="border-neutral-500 mb-1" />
                {crash.details.cause.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm md:text-base text-neutral-800/90 dark:text-white/90 transition-colors duration-300 mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div>
            {crash.details?.timeline && (
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl mt-8 md:mt-10 lg:mt-12 uppercase font-bold tracking-wide">
                  Timeline
                </h2>
                <hr className="border-neutral-500 mb-1" />
                {crash.details.timeline.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm md:text-base text-neutral-800/90 dark:text-white/90 transition-colors duration-300 mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div>
            {crash.details?.casualties && (
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl mt-8 md:mt-10 lg:mt-12 uppercase font-bold tracking-wide">
                  Casualties
                </h2>
                <hr className="border-neutral-500 mb-1" />
                {crash.details.casualties.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm md:text-base text-neutral-800/90 dark:text-white/90 transition-colors duration-300 mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function formatLocationDisplay(locationStr) {
  if (!locationStr || locationStr === "Unknown") return "Unknown";
  return locationStr;
}

function formatDateDisplay(dateStr) {
  if (!dateStr || dateStr === "Unknown") return "Unknown";
  const [year, month, day] = dateStr.split("-");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${parseInt(day)} ${months[parseInt(month) - 1]}, ${year}`;
}

export default IncidentDetail;
