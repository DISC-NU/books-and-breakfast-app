// interface for individual tip submissions, site name and actual contents
export interface Tips {
  site: string;
  content: string;
}

export interface TipsDictionary {
  [key: string]: Tips;
}

const Tip_1: Tips = {
  site: 'Dewey Elementary School',
  content: `
    you can take the 201 (and get a free Ventra card through nu) to the ridge/davis stop! 
    https://www.northwestern.edu/transportation-parking/shuttles/routes/cta-201.html`,
};

const Tip_2: Tips = {
  site: 'Dewey Elementary School',
  content: `The 201 bus doesn't come at the best times, but it is the most convenient bus. 
    Biking is great and there are lots of bike lanes; a lot of people walk to get there too. 
    When you get there, sit and chat with other tutors or students there and wait for everyone to arrive-- students get called up individually for breakfast; so there is no real breakfast eating period. 
    'Break the Ice' is a chaotic game whose sole object is to break things. Puzzles and drawing are popular!`,
};

const Tip_3: Tips = {
  site: 'Kingsley Elementary School',
  content: `how to get there: most of the tutors walk, you can also take the 201 (free w/ nu ventra card, but not always the most reliable timing-wise, prob better to take it back to campus than there)`,
};

const Tip_4: Tips = {
  site: 'Kingsley Elementary School',
  content: `first time @ kingsley: press the button by the door to be let in, if it's not working or it doesn't look like anyone's in the main office, u can call site director precious (312-927-1169)`,
};

const Tip_5: Tips = {
  site: 'Kingsley Elementary School',
  content: `remind kiddos to put a sticker on the sticker chart after brain work! they're often so excited about games they forget`,
};

const Tip_6: Tips = {
  site: 'Kingsley Elementary School',
  content: 'fridays are usually free days for them (no brain work), precious brings in prizes',
};

const Tip_7: Tips = {
  site: 'Kingsley Elementary School',
  content: "don't forget to fill out the brain work tracker at the end of each day!",
};

const Tip_8: Tips = {
  site: 'Kingsley Elementary School',
  content:
    '(unrelated to b&b) but if u have time after, central street is so underrated (highly rec hewn & backlot coffee for a lil sweet treat)',
};

const Tip_9: Tips = {
  site: 'Kingsley Elementary School',
  content: `to break down the room after b&b: 
    \t- games: go in the black closet outside (basically games pt 2 playing tetris to make everything fit)
    \t- blue bins: stack on top of cabinet next to games closet 
    \t- book cart: cover with cloth, by sticker chart in front
    \t- chairs: stack in front right corner of room, but leave 2 at every table facing front of room
    \t- tables: should be 3 x 5 (i think?), one gets taken down + put in front by chairs, ones in the back get rotated, align back row with the ac groove >> then wipe it all down`,
};

const Tip_10: Tips = {
  site: 'Lincoln Elementary School',
  content: `The entrance is tucked away, past the playgrounds and near the garden beds. 
     You will see a corner of the school that is just windows, that's where you're headed! Our program is in a library which makes the space a bit more chill. 
     We have a very multicultural group due to the area the school is in. 
     The best way to get there is to take the shuttle, though you will have to be earlier than needed. The purple line also works, but isn't free!`,
};

const Tip_11: Tips = {
  site: 'Lincolnwood Elementary School',
  content:
    'It’s in a gym which means there’s a lot of open space for the kids to run around so it’s a bit chaotic ',
};

const Tip_12: Tips = {
  site: 'Walker Elementary School',
  content: `Tutors at walker uber there in the mornings (the only site allowed for this since it would be unreasonable to get there via public transportation). 
    This involves meeting somewhere on campus around 7:40am to travel with the group. 
    Depending on the day of the week, we may ride back with community volunteers or Uber back to campus. 
    We have to clean up the gym after session time so we usually finish around 9:05.`,
};

const Tip_13: Tips = {
  site: 'Walker Elementary School',
  content: `Walker has a lot of siblings and cousins / otherwise related kiddos so it’s important to know that family dynamics often play into the morning`,
};

const Tip_14: Tips = {
  site: 'Walker Elementary School',
  content:
    'Fridays we have the art teacher Ms. Sam and we usually play basketball Fridays too. Most kids will try to get around reading in their various creative ways so we sometimes need to insist on getting the brainwork done but after focusing them in it’s not usually an issue. ',
};

const Tip_15: Tips = {
  site: 'Walker Elementary School',
  content: `don't be afraid to communicate with Nimrah and the other tutors, everyone is super nice and wants to help out! 
    don't be discouraged if it takes a while to build connections with the kids, the more you show up the more they'll be comfortable with you and excited to see you!`,
};

const Tip_16: Tips = {
  site: 'Washington Elementary School',
  content: `Show up early! Kids start arriving usually around 7:50am. 
    Be flexible! You may be working with multiple kids at once and/or have to help another student after one you were working with finishes brainwork. 
    After b+b you have to walk through the school to the office (the first time you come, you need to show the office your ID).`,
};

const Tip_17: Tips = {
  site: 'Willard Elementary School',
  content: 'Don’t be afraid to exert warm commands, acknowledge and validate a child’s emotions ',
};

// dictionary for Tips items (I arbitrarily decided key name. this can be fixed)
export const TIPS_INFO: TipsDictionary = {
  tip1: Tip_1,
  tip2: Tip_2,
  tip3: Tip_3,
  tip4: Tip_4,
  tip5: Tip_5,
  tip6: Tip_6,
  tip7: Tip_7,
  tip8: Tip_8,
  tip9: Tip_9,
  tip10: Tip_10,
  tip11: Tip_11,
  tip12: Tip_12,
  tip13: Tip_13,
  tip14: Tip_14,
  tip15: Tip_15,
  tip16: Tip_16,
  tip17: Tip_17,
};
