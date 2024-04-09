interface SchoolDirections {
  schoolname: string;
  address: string;
  specifics: string;
  publictransport?: string;
  driving?: string;
  rideshare?: string;
  contact?: string;
  geoLat?: string;
  geoLong?: string;
}

interface DirectionsDictionary {
  [key: string]: SchoolDirections;
}

export const WillardDirections: SchoolDirections = {
  schoolname: 'Willard Elementary School',
  address: '2700 Hurd Ave., Evanston, IL 60201',
  specifics:
    'All volunteers will enter the building using door #4, off of Park Place (at Hurd). The door will be unlocked, but if you have any issue send a text message to Juan using the number you will find on a B&B sign at door #4.',
  publictransport:
    'For public transportation, you can take the 201 CTA BUS (going down Central St. to Old Orchard) from NU campus to Lincolnwood Ave., then walk 1 block west to Hurd, then go right 1.5 blocks to Park Pl. to find door #4.',
  driving:
    'If you are driving, you can park on Hurd Ave. or on Central Park Ave. (*pay attention to the signs for street cleaning).',
  geoLat: '42.06653207492189',
  geoLong: '-87.71703059565027',
};
export const DeweyDirections: SchoolDirections = {
  schoolname: 'Dewey Elementary School',
  address: '1551 Wesley Ave, Evanston, IL 60201',
  specifics:
    'ENTER THE BUILDING THROUGH DOOR 4 ON WESLEY AVE. There is a silver  buzzer on the right side of the door, please ring it and say you’re here for Books and Breakfast. Once you have entered the building turn left and go up the stairs and through doors and you will arrive at the multipurpose room!',
  driving: 'There is no parking lot so if you are driving there is street parking near the school.',
  geoLat: '42.046142838456795',
  geoLong: '-87.69150908049619',
};
export const HavenDirections: SchoolDirections = {
  schoolname: 'Haven Middle School',
  address: '2417 Prairie Ave, Evanston, IL 60201',
  specifics:
    'You will enter the building through the main office located on Prairie Avenue. You will need to stop by the Haven office to sign in before coming down to room AA10. Once you exit the main office, go left until you reach the first hallway, then turn right. Keep walking down the hallway until you see the Art Wing sign. Go through the double entrance and the first room on the right is AA10!',
  publictransport:
    'You can take the 201 Central CTA bus from campus to the corner of Green Bay Rd and Lincoln St. Once you get off the bus, cross the street and walk down Lincoln to Prairie Ave and turn left.',
  geoLat: '42.06158542233899',
  geoLong: '-87.69825834361463',
};
export const KingleyDirections: SchoolDirections = {
  schoolname: 'Kingsley Elementary School',
  address: '2300 Green Bay Rd, Evanston, IL 60201',
  specifics:
    'To enter into the school building, please enter through door NUMBER ONE by ringing the doorbell. OR call (312) 927-1169 to be let into the building',
  driving: 'Please pull into the parking lot and park anywhere that is not reserved',
  contact: '(312)927-1169',
  geoLat: '42.06029083267393',
  geoLong: '-87.69609852376988',
};
export const LincolnDirections: SchoolDirections = {
  schoolname: 'Lincoln Elementary School',
  address: '910 Forest Ave, Evanston, IL 60202',
  specifics: 'Please ring the doorbell at entrance A1-off the playground on Main St.',
  driving: 'If you are driving, you will need to find street parking.',
  geoLat: '42.03418264201512',
  geoLong: '-87.67562534273824',
};
export const LincolnwoodDirections: SchoolDirections = {
  schoolname: 'Lincolnwood Elementary School',
  address: '2600 Colfax St, Evanston, IL 60201',
  specifics:
    'Please enter through Door 3 through the courtyard on the East side of the building, off McDaniel. There is a sign for the Gym over the door. The daily program is held in the Gym.',
  driving: 'You can park on the streets, but please pay attention to the street signage.',
  contact: 'Tricia:(847)687-8469  Miranda:(708)673-4374',
  geoLat: '42.06023940294461',
  geoLong: '-87.7093222693812',
};
export const WalkerDirections: SchoolDirections = {
  schoolname: 'Walker Elementary School',
  address: '3601 Church St, Skokie, IL 60076',
  specifics:
    'The program starts at 8 am Monday through Friday and tutors normally arrive between 7:50-7:55 am. Enter through DOOR 1 (main entrance) or DOOR 3 (next to the playground). There is a doorbell at each entrance for childcare that we are allowed to use. The program takes place in the school gym. Please feel free to call if you need help entering the building.',
  driving:
    'When you arrive at the school, you may park at the front of the building and enter through door 1, or you may park in the parking lot at the back of the building and enter through door 3.',
  contact: '(773)988-1681',
  geoLat: '42.04752291137184',
  geoLong: '-87.71911821724765',
};
export const WashingtonDirections: SchoolDirections = {
  schoolname: 'Washington Elementary School',
  address: '914 Ashland Ave, Evanston, IL 60201',
  specifics:
    'The new room is accessible at Door 31. This door is to the RIGHT of the MAIN OFFICE, between Doors 30 and 34, just right of the shed. Look fo the B&B logo on the door and ring the doorbell.',
  driving:
    'If you are driving, there is some street parking available on Ashland Ave north of the front of the building, or on Lee St. behind the school. PLEASE DO NOT PARK IN THE SCHOOL PARKING LOT.',
  geoLat: '42.03524177565056',
  geoLong: '-87.69353514262588',
};

export const DIRECTIONS_INFO: DirectionsDictionary = {};

DIRECTIONS_INFO['willard'] = WillardDirections;
DIRECTIONS_INFO['dewey'] = DeweyDirections;
DIRECTIONS_INFO['haven'] = HavenDirections;
DIRECTIONS_INFO['kingsley'] = KingleyDirections;
DIRECTIONS_INFO['lincoln'] = LincolnDirections;
DIRECTIONS_INFO['lincolnwood'] = LincolnwoodDirections;
DIRECTIONS_INFO['walker'] = WalkerDirections;
DIRECTIONS_INFO['washington'] = WashingtonDirections;
