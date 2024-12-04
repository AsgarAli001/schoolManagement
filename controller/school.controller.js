import {
  addSchool,
  getAllSchools,
  latAndLong,
} from "../model/school.models.js";

const postaddSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (
    !name ||
    !address ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    await addSchool(name, address, latitude, longitude);
    res.status(201).json({ message: "School added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
};

const listSchools = async (req, res) => {
  // Access latitude and longitude from the request body
  const { latitude, longitude } = req.body;

  console.log("User Latitude:", latitude, "User Longitude:", longitude); // Debugging

  // Ensure latitude and longitude are provided
  // if (!latitude || !longitude) {
  //   return res
  //     .status(400)
  //     .json({ error: "Latitude and longitude are required" });
  // }

  try {
    // Fetch all schools
    const [schools] = await getAllSchools();
    const latLonData = await latAndLong();

    // Fetch latitude and longitude of schools using latAndLong

    // Function to calculate the distance between two coordinates
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radius of the Earth in km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    };

    // Map through schools and add the calculated distance
    const sortedSchools = schools
      .map((school, index) => {
        const { latitude: schoolLat, longitude: schoolLon } = latLonData[index];

        const distance = calculateDistance(
          latitude,
          longitude,
          schoolLat,
          schoolLon
        );

        return {
          ...school,
          distance, // Add the calculated distance as a new field
        };
      })
      .sort((a, b) => a.distance - b.distance); // Sort schools by distance

    // Send the response with the sorted schools
    res.status(200).json(sortedSchools);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
};

export { postaddSchool, listSchools };
