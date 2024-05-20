// interface for morning program section title, description, and 'how you can help' section
export interface MorningProgram {
  title: string;
  description: string;
  helpInfo?: string; //optional for extras section
}

// interface for morning program dictionary
export interface MorningProgramDictionary {
  [key: string]: MorningProgram;
}

const BeforeBB: MorningProgram = {
  title: 'Before B&B Begins',
  description: `
    1. At 7:30 a.m. the Site Director and Food Manager arrive to set up breakfast and supplies.
    2. At 7:55 a.m. Northwestern Leadership Team arrive.
    3. B&B begins at 8:00 a.m. Students and volunteers begin to arrive and get settled.
    `,
  helpInfo: 'Check in with your Site Director for your next steps.',
};

// const objects of type/interface MorningProgram
const BreakfastTables: MorningProgram = {
  title: 'Breakfast Tables (Station #1)',
  description: `
    1. When children arrive at B&B, they will put their belongings in the designated area, clean their hands with sanitizer and head to the line for breakfast.
    2. The Food Manager will serve breakfast each morning. Tutors can connect with kids at the breakfast tables until they are ready for tutoring. As soon as any child finishes breakfast, they should:
       • Clean up their breakfast area and sanitize their hands.
       • Grab their homework or a book from the book cart.
       • Go straight to the brainwork/reading area and ask the Site Director for a buddy.
    `,
  helpInfo: `
    • Don't feel stressed if the Site Director doesn't pair you up right away, you can make a big impact by looking to welcome kids into the room.
    • Make sure students sanitize their hands before brain work.
    • Sitting with students and asking them about themselves can be the most significant part of the morning.
    `,
};

const BrainWorkTables: MorningProgram = {
  title: 'Brain Work Tables (Station #2)',
  description: `
    1. The Site Director will match students with a buddy for morning "brain work." Tutors will usually work individually with students but may be placed with a small group of 2-3 students if needed.
    2. If a child has homework they will bring it to the brain work table for review or completion. If they did not have homework, they will be asked to complete at least 15 minutes of reading time or math games. If a child quickly completes their homework assignment, they should read or play math games for the remainder of their 15 minutes of work. Ask the Site Director if reading or math games is best for your buddy.
    3. When a student finishes a homework assignment, they will helpInfo the tutor fill out the "Homework Label" and attach it to the right hand corner of the homework sheet (more about Homework Labels in the Tracking Our Progress document).
    4. The tutor will then give the student a sticker to place on the Sticker Chart (more about the sticker chart on the Tracking Our Progress document). Stickers are kept in the "Tutor supplies" on or near each brain work table. Only adult tutors are allowed to take stickers from the tutor supplies.
    5. The student will then put away their homework, return any book/s to the designated place, put their sticker on the sticker chart and continue to the games area.
    `,
  helpInfo: `
    • Start with connection by introducing yourself, asking the student's name if needed, and checking in with how the student is doing this morning.
    • If you are unsure about how to helpInfo with an assignment, that's great! Don't guess your way through, you can now model the priceless skill of asking for helpInfo. Start by asking the student what they know about the assignment, then as your Site Director if you need more support.
    • Complete the B&B Brain Work Tracker so that the Site Director is informed about your tutor session and is able to follow up as needed.
    • If a student experiences significant frustration or is struggling behaviorally, please ask the Site Director for helpInfo, that's what they are there for!
    `,
};

const GamesArtTables: MorningProgram = {
  title: 'Games and Art Tables (Station #3)',
  description: `
    1. Once a student has received a sticker from a tutor, a student can pick from a variety of games (Jenga, Spot It, Connect 4, Checkers) or art supplies for the remainder of the B&B morning.
    2. If a tutor is not working with a student on homework or reading, it's great for them to spend time playing games at the games table. However, the Site Director may need to pull you away from games if another student is in need of a tutor.
    `,
  helpInfo:
    'Try to have fun, connect, and build relationships with students. This can sometimes be the part of the morning that makes the biggest impact on helpInfoing kids start their day engaged, happy, and thus ready to learn.',
};

const CleanUp: MorningProgram = {
  title: 'Clean Up & Dismissal',
  description: `
    1. At 8:45 the Site Director will play the "Clean Up Song." This is a cue to students and tutors that it's time to clean up their area and prepare for morning announcemenst. Students should put away games, homework and books, grab their belongings, and sit in the designated area for announcements and dismissal.
    2. If a tutor is not helpInfoing with homework at this time, they can helpInfo by encouraging students to clean up and get ready for the morning announcements.
    3. At around 8:50 the Site Director will lead a 1-2 minute "Morning Announcement" which includes encouragement for the day and any necessary news kids and tutors need to know. Students will then be asked to line up (generally by grade level) for dismissal to class or to the playground areas.
    4. Games and other supplies are then put away for the day in a storage cabinets/shelves. Books are returned to the book cart, which may be covered at some sites.
    5. The Site Director will be available after B&B for questions or feedback. Please let the Site Director know if your students struggled significantly or were unable to finish their assignments.
    `,
  helpInfo:
    'The biggest helpInfo you can offer here is modeling for students the behavior we are looking for. helpInfo clean up, find a seat (or a spot in the back), and follow along with morning announcements.',
};

const Extras: MorningProgram = {
  title: 'Extras',
  description: `
    1. Prizes: Every Monday students will receive a small prize if they completed their brain work every day they attended the previous week. Students must be present at least 3 days in the previous week to receive the prize.
    2. Evanston Art Center: Once a week, an art instructor from the Evanston Art Center joins several B&B site. On this day, students will be able to do a special art project during their games and art time.
    `,
};

// dictionary for morning program (key: name of different activity, value: constant objects of type MorningProgram predefined above)
// import in morning program file
export const MORNING_PROGRAM_INFO: MorningProgramDictionary = {
  beforeBB: BeforeBB,
  breakfastTables: BreakfastTables,
  brainWork: BrainWorkTables,
  games: GamesArtTables,
  cleanUp: CleanUp,
  extras: Extras,
};
