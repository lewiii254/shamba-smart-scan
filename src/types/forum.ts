
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
