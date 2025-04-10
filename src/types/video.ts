
export interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  category: string;
  youtubeId: string;
  instructor: {
    name: string;
    avatar: string;
    initials: string;
  };
}
