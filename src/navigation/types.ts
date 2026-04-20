export type RootStackParamList = {
  HomeTabs: undefined;
  TutorProfile: { tutorId: string };
  Booking: { tutorId: string; subject: string };
  // Convenience shortcuts so HomeScreen can navigate directly to tabs
  HomeTab: undefined;
  TutorsTab: { subjectFilter?: string } | undefined;
  SessionsTab: undefined;
  ProfileTab: undefined;
};
