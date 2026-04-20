export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  subjects: string[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  bio: string;
  education: string;
  experience: string;
  languages: string[];
  availableSlots: string[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  tutorCount: number;
}

export interface Session {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

export const SUBJECTS: Subject[] = [
  { id: '1', name: 'Mathematics', icon: '📐', color: '#EEF2FF', tutorCount: 24 },
  { id: '2', name: 'Science', icon: '🔬', color: '#ECFDF5', tutorCount: 18 },
  { id: '3', name: 'English', icon: '📚', color: '#FEF3C7', tutorCount: 32 },
  { id: '4', name: 'History', icon: '🏛️', color: '#FDF2F8', tutorCount: 12 },
  { id: '5', name: 'Physics', icon: '⚛️', color: '#EFF6FF', tutorCount: 15 },
  { id: '6', name: 'Chemistry', icon: '🧪', color: '#F0FDF4', tutorCount: 14 },
  { id: '7', name: 'Geography', icon: '🌍', color: '#FFF7ED', tutorCount: 10 },
  { id: '8', name: 'Coding', icon: '💻', color: '#F5F3FF', tutorCount: 20 },
];

export const TUTORS: Tutor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    avatar: '👩‍🏫',
    subjects: ['Mathematics', 'Physics'],
    rating: 4.9,
    reviewCount: 128,
    hourlyRate: 45,
    bio: 'PhD in Applied Mathematics with 10+ years of teaching experience. I specialize in making complex topics approachable and fun for students of all levels.',
    education: 'PhD Applied Mathematics, MIT',
    experience: '10+ years',
    languages: ['English', 'Spanish'],
    availableSlots: ['Mon 9am', 'Mon 2pm', 'Wed 10am', 'Fri 3pm'],
  },
  {
    id: '2',
    name: 'Mr. James Okafor',
    avatar: '👨‍🏫',
    subjects: ['English', 'History'],
    rating: 4.8,
    reviewCount: 94,
    hourlyRate: 35,
    bio: 'Master of Arts in English Literature. Former high school teacher with a passion for storytelling and critical thinking. I help students find their voice.',
    education: 'MA English Literature, Oxford',
    experience: '8 years',
    languages: ['English', 'Yoruba'],
    availableSlots: ['Tue 11am', 'Thu 1pm', 'Sat 10am'],
  },
  {
    id: '3',
    name: 'Ms. Priya Patel',
    avatar: '👩‍💻',
    subjects: ['Coding', 'Mathematics'],
    rating: 4.95,
    reviewCount: 76,
    hourlyRate: 55,
    bio: 'Senior software engineer with a background in education technology. I teach Python, JavaScript, and web development to beginners and advanced learners.',
    education: 'BSc Computer Science, Stanford',
    experience: '6 years',
    languages: ['English', 'Hindi'],
    availableSlots: ['Mon 6pm', 'Wed 7pm', 'Sun 2pm'],
  },
  {
    id: '4',
    name: 'Mr. Carlos Rivera',
    avatar: '🧑‍🔬',
    subjects: ['Chemistry', 'Science'],
    rating: 4.7,
    reviewCount: 58,
    hourlyRate: 40,
    bio: 'Biochemistry graduate passionate about making science exciting. I use real-world examples and hands-on demonstrations to build deep understanding.',
    education: 'BSc Biochemistry, UCT',
    experience: '5 years',
    languages: ['English', 'Spanish'],
    availableSlots: ['Tue 4pm', 'Thu 5pm', 'Sat 9am'],
  },
  {
    id: '5',
    name: 'Ms. Aisha Diallo',
    avatar: '👩‍🎓',
    subjects: ['Geography', 'History'],
    rating: 4.85,
    reviewCount: 42,
    hourlyRate: 30,
    bio: 'Geography and social sciences specialist. I bring maps, data, and current events into every lesson to make learning relevant and engaging.',
    education: 'BSc Geography, Wits',
    experience: '4 years',
    languages: ['English', 'French'],
    availableSlots: ['Mon 3pm', 'Wed 4pm', 'Fri 10am'],
  },
  {
    id: '6',
    name: 'Prof. David Kim',
    avatar: '👨‍🔬',
    subjects: ['Physics', 'Mathematics'],
    rating: 4.92,
    reviewCount: 110,
    hourlyRate: 60,
    bio: 'Professor of Theoretical Physics. Published researcher and dedicated educator. Specialises in university-level physics and advanced mathematics.',
    education: 'PhD Theoretical Physics, Caltech',
    experience: '15 years',
    languages: ['English', 'Korean'],
    availableSlots: ['Tue 9am', 'Thu 9am', 'Sat 2pm'],
  },
];

export const SESSIONS: Session[] = [
  {
    id: '1',
    tutorId: '1',
    tutorName: 'Dr. Sarah Johnson',
    tutorAvatar: '👩‍🏫',
    subject: 'Mathematics',
    date: '2026-04-22',
    time: '09:00',
    duration: 60,
    status: 'upcoming',
    notes: 'Focus on calculus — integration by parts.',
  },
  {
    id: '2',
    tutorId: '3',
    tutorName: 'Ms. Priya Patel',
    tutorAvatar: '👩‍💻',
    subject: 'Coding',
    date: '2026-04-24',
    time: '18:00',
    duration: 90,
    status: 'upcoming',
    notes: 'Continue React Native project setup.',
  },
  {
    id: '3',
    tutorId: '2',
    tutorName: 'Mr. James Okafor',
    tutorAvatar: '👨‍🏫',
    subject: 'English',
    date: '2026-04-15',
    time: '11:00',
    duration: 60,
    status: 'completed',
    notes: 'Essay structure and argumentative writing.',
  },
  {
    id: '4',
    tutorId: '4',
    tutorName: 'Mr. Carlos Rivera',
    tutorAvatar: '🧑‍🔬',
    subject: 'Chemistry',
    date: '2026-04-10',
    time: '16:00',
    duration: 60,
    status: 'completed',
  },
];
