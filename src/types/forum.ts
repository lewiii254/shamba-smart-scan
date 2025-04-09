
export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  tags: string[];
  likes: number;
  comments: ForumComment[];
}

export interface ForumComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
}

export type ForumCategory = 'all' | 'disease' | 'prevention' | 'treatment' | 'techniques' | 'questions';

export interface NewPostData {
  title: string;
  content: string;
  tags: string[];
}

export interface WeatherData {
  location: string;
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
    precip_mm: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        daily_chance_of_rain: number;
      };
    }>;
  };
}
