import { get, ref } from 'firebase/database';

import { database } from './firebaseConfig';

export interface SchoolKeyPair {
  key: string;
  value: string;
}

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

async function getSchoolList() {
  return get(ref(database, '/SchoolDirections'))
    .then((snapshot) => {
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
    })
    .catch((error) => {
      console.error('Error fetching school list:', error);
      return null;
    });
}

async function getSchoolDirections(schoolName: string) {
  const schoolRef = ref(database, `/SchoolDirections/${schoolName}`);
  return get(schoolRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log('No data available for:', schoolName);
        return null;
      }
    })
    .catch((error) => {
      console.error('Error fetching school directions:', error);
      return null;
    });
}

export { getSchoolList, getSchoolDirections };
