// MissionData.ts

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

export const entries: Entry[] = [
  {
    title: 'The Mission',
    missionCenter:
      '"Books & Breakfast is a before-school program offering a healthy breakfast and homework help to students in need of additional support. B&B exists so that every student enters his or her classroom physically, emotionally, and academically prepared. Our mission is to advance educational equity in Evanston schools."',
    body: ' ',
  },
  {
    title: 'Primary Strategies',
    subtitle: 'Relationships:',
    body: 'Every part of the B&B experience should highlight relationships (welcome, breakfast, homework, games, clean up and dismissal). We want students to experience the refrain, "You are important. You are valuable" in our words, demeanor, and actions. We build community and connection every day.\n',
    subtitle1: 'Daily School Readiness:',
    body1:
      'The goal of B&B is to help students be prepared for the next 6-7 hours of the day. If kids enter the classroom ready physically, emotionally, and academically, daily learning has a greater impact.\n',
    subtitle2: 'Academic Mindset:',
    body2:
      'What you believe about yourself as a student and what you believe about your connection to your academic community. "I belong in this academic community." "My ability and competence grow with my effort." "I can succeed at this." "This work has value for me."\n',
  },
  {
    title: 'Your Role',
    subtitle: 'Friend:',
    body: "A good friend wants to know the other person. A good friend asks questions about the other person's life, family, likes, and dislikes. Take time to build trust and connection.\n",
    subtitle1: 'Cheerleader (EnCOURAGE):',
    body1:
      'Pour courage into your students, be positive, call out the good stuff, communicate that you believe in them.\n',
    subtitle2: 'Coach:',
    body2:
      'We ask for strong effort and for each student to do their best work. We believe students can succeed. We support and train all the way.\n',
    subtitle3: 'Driver’s Education Teacher:',
    body3:
      'The goal is for the student to drive, keeping them safe emotionally in mastering a difficult task. Students need to learn to drive themselves!\n',
    subtitle4: 'Learner:',
    body4:
      "We are learning together! It's okay if you don't know an answer or how to help. We encourage asking for help and see it as a chance to model that for children.\n",
  },
  {
    title: 'Site Director Role',
    subtitle: 'Daily Program Manager:',
    body: 'Directs volunteer efforts, makes tutor matches, builds community, sets the tone, handles the challenges, and provides ongoing support to tutors.\n',
    subtitle1: 'Family and Student Connector:',
    body1: 'Builds relationships with students and families.\n',
    subtitle2: 'District 65 Partner:',
    body2: 'Work closely with teachers, the principal, the school staff and the PTA.\n',
    subtitle3: 'Student and Family Advocate:',
    body3: 'Collecting Evanston Resources to B&B Families and Schools.\n',
  },
  {
    title: 'The Mission',
    subtitle: 'Physically (Body):',
    body: 'Every student will begin the day with a healthy meal so they have the fuel they need to do their best as learners.\n',
    subtitle1: 'Emotionally (Heart):',
    body1:
      'We will create a positive, personal and welcoming environment so that children feel safe, known and cared for.\n',
    subtitle2: 'Academically (Mind):',
    body2:
      'We will focus primarily on homework support so that every student can start the day prepared and ready. We will also provide additional support according to teacher requests.\n',
  },
];
