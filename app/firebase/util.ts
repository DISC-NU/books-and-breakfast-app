// Imports the necessary functions from the Firebase database module.
import {
  child,
  equalTo,
  get,
  off,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  set,
} from 'firebase/database';

import { UserInfo } from '../components/Context';
import { Tips } from '../data/TipsInfo';
import { database } from './firebaseConfig';

// Import the pre-configured Firebase database instance.

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

// Save function for school transportation details
export async function updateSchoolDirections(schoolName: string, field: string, value: string) {
  // Generate a database reference specifically targeting the requested school's directions.
  const schoolRef = ref(database, `/SchoolDirections/${schoolName}/${field}`);
  try {
    await set(schoolRef, value);
    return true;
  } catch (error) {
    console.error('Error updating school directions: ', error);
    return null;
  }
}

export async function getSchoolList() {
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
export function listenToSchoolDirections(
  schoolName: string,
  callback: (data: SchoolDirections | null) => void
): () => void {
  const schoolRef = ref(database, `/SchoolDirections/${schoolName}`);

  // Attach a listener to get real-time updates.
  const unsubscribe = onValue(
    schoolRef,
    (snapshot) => {
      if (snapshot.exists()) {
        // If data exists, call the callback with the entire data object for this school.
        callback(snapshot.val());
      } else {
        console.error('No data available for:', schoolName);
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

export const listenToTips = (
  schoolName: string,
  callback: (tips: { id: string; content: string }[]) => void
) => {
  const tipsRef = ref(database, `/TipsInfo/${schoolName}`);

  const unsubscribe = onValue(
    tipsRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const tipsData = snapshot.val() as Tips;
        const tips = Object.entries(tipsData).map(([id, tip]) => ({
          id,
          content: tip.content,
        }));
        callback(tips);
      } else {
        console.error('No tips available for:', schoolName);
        callback([]);
      }
    },
    (error) => {
      console.error('Error fetching tips:', error);
      callback([]);
    }
  );

  return () => off(tipsRef, 'value', unsubscribe);
};

// Save function for tips details
export const updateTipsInfo = async (schoolName: string, content: string, index: string) => {
  const tipsRef = ref(database, `/TipsInfo/${schoolName}/${index}`);
  try {
    set(tipsRef, { content });
    return true;
  } catch (error) {
    console.error('Error updating school tips: ', error);
    return null;
  }
};

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
    } else {
      console.error('Tip not found:', tipID);
      throw new Error('Tip not found');
    }
  } catch (error) {
    console.error('Error deleting tip:', error);
    throw error;
  }
};

// Function to fetch resource URLs from Firebase
export const getResourceURLs = async (): Promise<ResourceURLs | null> => {
  try {
    const snapshot = await get(child(ref(database), 'resources'));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.error('No resource data available');
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
        console.error('No mission entries available');
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
      console.error('No data available');
      return null;
    }
  } catch (error) {
    console.error('Error fetching mission entries:', error);
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
  console.log('snapshot:', snapshot);
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

export const getSchoolName = (userId: string, callback: (schoolName: string) => void) => {
  const userRef = ref(database, `users/${userId}/schoolName`);

  const unsubscribe = onValue(
    userRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      } else {
        console.log('No school data available for user:', userId);
        callback('');
      }
    },
    (error) => {
      console.error('Error fetching user school:', error);
      callback('');
    }
  );

  return () => off(userRef, 'value', unsubscribe);
};

export const updateSchoolName = async (userId: string, schoolName: string) => {
  const userRef = ref(database, `users/${userId}/schoolName`);
  try {
    await set(userRef, schoolName);
  } catch (error) {
    console.error('Error updating user school:', error);
  }
};

export const getVolunteeringDay = (userId: string, callback: (volunteeringDay: string) => void) => {
  const userRef = ref(database, `users/${userId}/volunteeringDay`);

  const unsubscribe = onValue(
    userRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      } else {
        console.log('No volunteering day data available for user:', userId);
        callback('');
      }
    },
    (error) => {
      console.error('Error fetching user volunteering day:', error);
      callback('');
    }
  );

  return () => off(userRef, 'value', unsubscribe);
};

export const updateVolunteeringDay = async (userId: string, volunteeringDay: string) => {
  const userRef = ref(database, `users/${userId}/volunteeringDay`);
  try {
    await set(userRef, volunteeringDay);
  } catch (error) {
    console.error('Error updating user volunteering day:', error);
  }
};

export const getTransportationStatus = (
  userId: string,
  callback: (transportationStatus: string) => void
) => {
  const userRef = ref(database, `users/${userId}/transportationStatus`);

  const unsubscribe = onValue(
    userRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      } else {
        console.log('No transportation status data available for user:', userId);
        callback('');
      }
    },
    (error) => {
      console.error('Error fetching user transportation status:', error);
      callback('');
    }
  );

  return () => off(userRef, 'value', unsubscribe);
};

export const updateTransportationStatus = async (userId: string, transportationStatus: string) => {
  const userRef = ref(database, `users/${userId}/transportationStatus`);
  try {
    await set(userRef, transportationStatus);
  } catch (error) {
    console.error('Error updating user transportation status:', error);
  }
};

// Fetch users for transportation screen
export const fetchAndGroupUsersForTransportationScreen = async (
  schoolName: string,
  volunteeringDay: string,
  callback: (groupedUsers: { [key: string]: UserInfo[] }) => void
) => {
  const usersRef = ref(database, 'users');
  const q = query(usersRef, orderByChild('schoolName'), equalTo(schoolName));

  const unsubscribe = onValue(
    q,
    (snapshot) => {
      try {
        const users: { [key: string]: UserInfo } = snapshot.val() || {};
        const groupedUsers: { [key: string]: UserInfo[] } = {};

        // Filter and group users based on transportStatus
        for (const userId in users) {
          if (users.hasOwnProperty(userId)) {
            const user = users[userId];
            // Only include users with a volunteering day and transport status
            if (
              user.volunteeringDay &&
              user.volunteeringDay.toLowerCase() === volunteeringDay.toLowerCase() &&
              user.transportStatus
            ) {
              const transportStatus = user.transportStatus;
              if (!groupedUsers[transportStatus]) {
                groupedUsers[transportStatus] = [];
              }
              groupedUsers[transportStatus].push(user);
            }
          }
        }

        // Call the callback function with the grouped users
        callback(groupedUsers);
      } catch (error) {
        console.error('Error processing user data:', error);
      }
    },
    (error) => {
      console.error('Error processing user data:', error);
    }
  );

  return () => off(q, 'value', unsubscribe);
};
