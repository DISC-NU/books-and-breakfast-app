// Imports the necessary functions from the Firebase database module.
import { child, get, off, onValue, push, ref, set } from 'firebase/database';

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

// TypeScript interface for mission entries
export interface Entry {
  title: string;
  missionCenter?: string;
  subtitle?: string;
  body: string;
  subtitle1?: string;
  body1?: string;
  subtitle2?: string;
  body2?: string;
  subtitle3?: string;
  body3?: string;
  subtitle4?: string;
  body4?: string;
  link?: string;
}

export interface ResourceURLs {
  trackerURL: string;
  groupMeURL: string;
}

/**
 * Fetches a list of schools from Firebase database.
 * Each school is returned as a key-value pair with the school's key and its name.
 * @returns A promise resolving to an array of SchoolKeyPair objects or null if no data is found.
 */
export async function getSchoolList(): Promise<SchoolKeyPair[] | null> {
  try {
    const snapshot = await get(ref(database, '/SchoolDirections'));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const schools = Object.keys(data);
      const schoolOptions = schools.map((school) => ({
        key: school,
        value: school,
      }));
      return schoolOptions;
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error('Error fetching school list:', error);
    return null;
  }
}

/**
 * Listens for detailed directions for a specific school by name from the Firebase database.
 * @param schoolName The unique identifier for the school whose directions are being fetched.
 * @param callback The function to call with the updated data.
 * @returns A function to unsubscribe from the real-time updates.
 */
export function listenToSchoolDirections(
  schoolName: string,
  callback: (data: SchoolDirections | null) => void
): () => void {
  const schoolRef = ref(database, `/SchoolDirections/${schoolName}`);

  const unsubscribe = onValue(
    schoolRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      } else {
        console.log('No data available for:', schoolName);
        callback(null);
      }
    },
    (error) => {
      console.error('Error fetching school directions:', error);
      callback(null);
    }
  );

  return () => off(schoolRef, 'value', unsubscribe);
}

/**
 * Updates a specific field in the school directions for a given school.
 * @param schoolName The name of the school.
 * @param field The specific field to update.
 * @param value The new value for the field.
 * @returns A promise resolving to true if the update is successful, otherwise null.
 */
export async function updateSchoolDirections(
  schoolName: string,
  field: string,
  value: string
): Promise<boolean | null> {
  const schoolRef = ref(database, `/SchoolDirections/${schoolName}/${field}`);
  try {
    await set(schoolRef, value);
    return true;
  } catch (error) {
    console.error('Error updating school directions: ', error);
    return null;
  }
}

/**
 * Adds a mission entry to the Firebase database.
 * @param entry The mission entry to add.
 * @returns A promise resolving to true if the addition is successful, otherwise null.
 */
export async function addMissionEntry(entry: Entry): Promise<boolean | null> {
  try {
    const newEntryRef = push(ref(database, 'missions'));
    await set(newEntryRef, entry);
    return true;
  } catch (error) {
    console.error('Error adding mission entry: ', error);
    return null;
  }
}

/**
 * Fetches all mission entries from the Firebase database.
 * @returns A promise resolving to an array of Entry objects or null if no data is found.
 */
export async function getMissionEntries(): Promise<Entry[] | null> {
  try {
    const snapshot = await get(child(ref(database), 'missions'));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const missionEntries: Entry[] = Object.keys(data).map((key) => data[key]);
      return missionEntries;
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error('Error fetching mission entries:', error);
    return null;
  }
}

// Function to fetch resource URLs from Firebase
export const getResourceURLs = async (): Promise<ResourceURLs | null> => {
  try {
    const snapshot = await get(child(ref(database), 'resources'));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('No resource data available');
      return null;
    }
  } catch (error) {
    console.error('Error fetching resource URLs:', error);
    return null;
  }
};

/**
 * Listens for updates to mission entries in the Firebase database.
 * @param callback The function to call with the updated data.
 * @returns A function to unsubscribe from the real-time updates.
 */
export function listenToMissionEntries(callback: (data: Entry[] | null) => void): () => void {
  const missionsRef = ref(database, 'missions');

  const unsubscribe = onValue(
    missionsRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const missionEntries: Entry[] = Object.keys(data).map((key) => data[key]);
        callback(missionEntries);
      } else {
        console.log('No mission entries available');
        callback(null);
      }
    },
    (error) => {
      console.error('Error fetching mission entries:', error);
      callback(null);
    }
  );

  return () => off(missionsRef, 'value', unsubscribe);
}
