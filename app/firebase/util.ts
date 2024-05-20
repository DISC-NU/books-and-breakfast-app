// Imports the necessary functions from the Firebase database module.
import { get, off, onValue, ref, set } from 'firebase/database';

// Import the pre-configured Firebase database instance.
import { UserInfo } from '../components/Context';
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
 * Listens for detailed directions for a specific school by name from the Firebase database.
 * @param schoolName The unique identifier for the school whose directions are being fetched.
 * @param callback The function to call with the updated data.
 * @returns A function to unsubscribe from the real-time updates.
 */
function listenToSchoolDirections(schoolName, callback) {
  // Generate a database reference specifically targeting the requested school's directions.
  const schoolRef = ref(database, `/SchoolDirections/${schoolName}`);

  // Attach a listener to get real-time updates.
  const unsubscribe = onValue(
    schoolRef,
    (snapshot) => {
      if (snapshot.exists()) {
        // If data exists, call the callback with the entire data object for this school.
        callback(snapshot.val());
      } else {
        console.log('No data available for:', schoolName);
        callback(null); // Call the callback with null if no data is found.
      }
    },
    (error) => {
      console.error('Error fetching school directions:', error);
      callback(null); // Call the callback with null to indicate an error occurred.
    }
  );

  // Return a function to unsubscribe from the listener when it's no longer needed.
  return () => off(schoolRef, 'value', unsubscribe);
}

// Save function for school transportation details
async function updateSchoolDirections(schoolName: string, field: string, value: string) {
  // Generate a database reference specifically targeting the requested school's directions.
  const schoolRef = ref(database, `/SchoolDirections/${schoolName}/${field}`);
  try {
    set(schoolRef, value);
    return true;
  } catch (error) {
    console.error('Error updating school directions: ', error);
    return null;
  }
}

export const isNewUser = async (userInfo: UserInfo) => {
  const userRef = ref(database, `users/${userInfo.id}`);
  const snapshot = await get(userRef);
  return !snapshot.exists();
};

export const AddNewUser = async (userInfo: UserInfo) => {
  const userRef = ref(database, `users/${userInfo.id}`);
  try {
    await set(userRef, userInfo);
  } catch (error) {
    console.error('Error adding new user: ', error);
  }
};

export const getUserInfo = async (userInfo: UserInfo) => {
  const userRef = ref(database, `users/${userInfo.id}`);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
};

// Function to update specific fields for a user
export const updateUserFields = async (userId: string, fieldsToUpdate: any) => {
  const userRef = ref(database, `users/${userId}`);
  try {
    await set(userRef, fieldsToUpdate);
  } catch (error) {
    console.error('Error updating user fields: ', error);
  }
};

// Export the functions for use in other parts of the application.
export { getSchoolList, listenToSchoolDirections, updateSchoolDirections };
