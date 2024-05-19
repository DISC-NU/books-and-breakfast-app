// Imports the necessary functions from the Firebase database module.
import { get, off, onValue, push, ref, set } from 'firebase/database';

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

export const listenToTips = (schoolName: string, callback: (tips: any[]) => void) => {
  // Generate a database reference specifically targeting the tips for the requested school.
  const tipsRef = ref(database, `/TipsInfo/${schoolName}`);

  // Attach a listener to get real-time updates.
  const unsubscribe = onValue(
    tipsRef,
    (snapshot) => {
      if (snapshot.exists()) {
        // If data exists, call the callback with the array of tips.
        const tipsData = snapshot.val();
        const tips = Object.entries(tipsData).map(([id, tip]) => ({
          id,
          content: tip,
        }));
        callback(tips);
      } else {
        console.log('No tips available for:', schoolName);
        callback([]); // Call the callback with an empty array if no tips are found.
      }
    },
    (error) => {
      console.error('Error fetching tips:', error);
      callback([]); // Call the callback with an empty array to indicate an error occurred.
    }
  );

  // Return a function to unsubscribe from the listener when it's no longer needed.
  return () => off(tipsRef, 'value', unsubscribe);
};

// Save function for tips details
async function updateTipsInfo(schoolName: string, tips: string, index: string) {
  const tipsRef = ref(database, `/TipsInfo/${schoolName}/${index}`);
  try {
    // Set the tip at the specified index
    set(tipsRef, tips);
    return true;
  } catch (error) {
    console.error('Error updating school tips: ', error);
    return null;
  }
}

export const addNewTip = async (schoolName, newTip) => {
  const tipsRef = ref(database, `/TipsInfo/${schoolName}`);
  const newTipRef = push(tipsRef); // Generate a new reference with a unique key
  await set(newTipRef, newTip); // Set the value of the new tip
  return newTipRef; // Return the reference to the newly added tip
};

export const deleteTip = async (schoolName: string, tipID: string) => {
  try {
    const tipRef = ref(database, `/TipsInfo/${schoolName}/${tipID}`);

    // Check if the tip exists
    const snapshot = await get(tipRef);
    if (snapshot.exists()) {
      // Remove the tip
      await set(tipRef, null);
      console.log('Tip deleted successfully:', tipID);
    } else {
      console.error('Tip not found:', tipID);
      throw new Error('Tip not found');
    }
  } catch (error) {
    console.error('Error deleting tip:', error);
    throw error;
  }
};
// Export the functions for use in other parts of the application.
export { getSchoolList, listenToSchoolDirections, updateSchoolDirections, updateTipsInfo };
