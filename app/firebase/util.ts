/**
 * // Imports the necessary functions from the Firebase database module.
import { get, ref } from 'firebase/database';

// Import the pre-configured Firebase database instance.
import { database } from './firebaseConfig';

// TypeScript interface for representing key-value pairs of school names for school selection dropdown
export interface SchoolKeyPair {
  key: string;
  value: string;
}

// TypeScript interface for detailed directions to a school for directions screen, including optional fields for public transport and other details
export interface SchoolDirections {
  schoolName: string;
  address: string;
  specifics: string;
  publicTransport?: string;
  driving?: string;
  rideshare?: string;
  contact?: string;
  geoLat?: string;
  geoLong?: string;
}

/**
 * Fetches a list of schools from Firebase database.
 * Each school is returned as a key-value pair with the school's key and its name.
 * @returns A promise resolving to an array of SchoolKeyPair objects or null if no data is found.
 */
/*
async function getSchoolList() {
  // Create a reference to the SchoolDirections node in Firebase database.
  return get(ref(database, '/SchoolDirections'))
    .then((snapshot) => {
      // Check if the snapshot contains any data.
      if (snapshot.exists()) {
        // Extract the data from the snapshot.
        const data = snapshot.val();
        // Use Object.keys to get all school keys and map them to key-value pairs.
        const schools = Object.keys(data);
        const schoolOptions = schools.map((school) => ({
          key: school,
          value: school,
        }));
        return schoolOptions;
      } else {
        console.log('No data available');
        return null; // Return null to indicate no data was found.
      }
    })
    .catch((error) => {
      console.error('Error fetching school list:', error);
      return null; // Return null to indicate an error occurred during the fetch.
    });
}

/**
 * Fetches detailed directions for a specific school by name from the Firebase database.
 * @param schoolName The unique identifier for the school whose directions are being fetched.
 * @returns A promise resolving to a SchoolDirections object or null if no data or an error occurs.
 */
/*

async function getSchoolDirections(schoolName: string) {
  // Generate a database reference specifically targeting the requested school's directions.
  const schoolRef = ref(database, `/SchoolDirections/${schoolName}`);
  return get(schoolRef)
    .then((snapshot) => {
      // Check if the snapshot at this specific reference contains data.
      if (snapshot.exists()) {
        // If data exists, return the entire data object for this school.
        return snapshot.val();
      } else {
        console.log('No data available for:', schoolName);
        return null; // Return null if no specific data is found for the requested school.
      }
    })
    .catch((error) => {
      console.error('Error fetching school directions:', error);
      return null; // Return null to indicate that an error occurred during the data fetch.
    });
}

// Export the functions for use in other parts of the application.
export { getSchoolDirections, getSchoolList };
*/
