import crashes from "./crashes.json";

export async function searchCrashes({
  query = "",
  aircraftType = "",
  dateFilterDays = null,
  startDate = null,
  endDate = null,
}) {
  let results = crashes;

  if (query?.trim().length > 0) {
    const lowerQuery = query.trim().toLowerCase();

    results = results.filter(
      (crash) =>
        crash.title?.toLowerCase().includes(lowerQuery) ||
        crash.aircraftType?.toLowerCase().includes(lowerQuery) ||
        crash.operator?.toLowerCase().includes(lowerQuery) ||
        crash.site?.toLowerCase().includes(lowerQuery)
    );
  }

  if (aircraftType && aircraftType.length > 0) {
    const lowerAircraftTypes = aircraftType.map((type) => type.toLowerCase());

    results = results.filter((crash) => {
      const crashAircraft = crash.aircraftType?.toLowerCase() || "";
      const crashTitle = crash.title?.toLowerCase() || "";

      return lowerAircraftTypes.some(
        (type) => crashAircraft.includes(type) || crashTitle.includes(type)
      );
    });
  }

  if (dateFilterDays) {
    const now = new Date();
    results = results.filter((crash) => {
      if (!crash.date || crash.date === "Unknown") return false;

      const crashDate = new Date(crash.date);
      const diffDays = (now - crashDate) / (1000 * 60 * 60 * 24);

      return diffDays <= dateFilterDays;
    });
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    results = results.filter((crash) => {
      if (!crash.date || crash.date === "Unknown") return false;

      const crashDate = new Date(crash.date);
      return crashDate >= start && crashDate <= end;
    });
  }

  return results;
}
