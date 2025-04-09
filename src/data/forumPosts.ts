
import { ForumPost } from "@/types/forum";

export const forumPosts: ForumPost[] = [
  {
    id: "1",
    title: "How to prevent tomato blight in humid conditions?",
    content: "I've been struggling with tomato blight in my greenhouse due to high humidity. Has anyone successfully managed this issue without harsh chemicals? I've tried improving ventilation, but I'm looking for additional preventative measures.",
    authorId: "user-1",
    authorName: "Maria Garcia",
    authorAvatar: "/placeholder.svg",
    createdAt: "2025-03-25T14:48:00Z",
    tags: ["disease", "prevention", "tomatoes"],
    likes: 15,
    comments: [
      {
        id: "comment-1-1",
        postId: "1",
        authorId: "user-2",
        authorName: "John Smith",
        authorAvatar: "/placeholder.svg",
        content: "I've had success with a copper-based fungicide applied early in the season. It's fairly organic and works as a preventative.",
        createdAt: "2025-03-25T15:30:00Z",
        likes: 4
      },
      {
        id: "comment-1-2",
        postId: "1",
        authorId: "user-3",
        authorName: "Priya Patel",
        authorAvatar: "/placeholder.svg",
        content: "Pruning the lower leaves to improve air circulation made a huge difference in my garden. Also, water at the base of the plant, not the leaves.",
        createdAt: "2025-03-25T16:15:00Z",
        likes: 7
      }
    ]
  },
  {
    id: "2",
    title: "Success with companion planting - my results",
    content: "I wanted to share my experience with companion planting this season. I planted marigolds alongside my vegetables and noticed significantly fewer pest problems, especially with aphids and nematodes. Has anyone else tried different companion planting combinations with good results?",
    authorId: "user-4",
    authorName: "Alex Johnson",
    authorAvatar: "/placeholder.svg",
    createdAt: "2025-03-24T09:15:00Z",
    tags: ["techniques", "prevention"],
    likes: 28,
    comments: [
      {
        id: "comment-2-1",
        postId: "2",
        authorId: "user-5",
        authorName: "Sarah Williams",
        authorAvatar: "/placeholder.svg",
        content: "Basil planted near tomatoes improved the flavor and seemed to repel certain insects. Plus, they taste great together in the kitchen!",
        createdAt: "2025-03-24T10:30:00Z",
        likes: 9
      }
    ]
  },
  {
    id: "3",
    title: "Identified unusual spots on my cucumber leaves - help!",
    content: "I've noticed some yellow spots on my cucumber leaves that don't match any disease I'm familiar with. They start small and circular but don't grow much larger. The plants are still producing well. I've attached a photo - can anyone identify this?",
    authorId: "user-6",
    authorName: "Miguel Santos",
    authorAvatar: "/placeholder.svg",
    createdAt: "2025-03-23T16:45:00Z",
    tags: ["disease", "questions", "cucumber"],
    likes: 7,
    comments: [
      {
        id: "comment-3-1",
        postId: "3",
        authorId: "user-7",
        authorName: "Emma Chen",
        authorAvatar: "/placeholder.svg",
        content: "This looks like angular leaf spot, a bacterial disease. Try removing affected leaves and avoid overhead watering.",
        createdAt: "2025-03-23T17:20:00Z",
        likes: 5
      },
      {
        id: "comment-3-2",
        postId: "3",
        authorId: "user-8",
        authorName: "David Kim",
        authorAvatar: "/placeholder.svg",
        content: "Have you checked for cucumber beetles? They can transmit bacterial wilt which can cause spotting before more severe symptoms appear.",
        createdAt: "2025-03-23T18:05:00Z",
        likes: 3
      }
    ]
  },
  {
    id: "4",
    title: "Organic solutions for aphid infestations?",
    content: "My rose bushes are suffering from a serious aphid infestation. I'd prefer to avoid synthetic insecticides. What organic methods have worked for you?",
    authorId: "user-9",
    authorName: "Olivia Brown",
    authorAvatar: "/placeholder.svg",
    createdAt: "2025-03-22T11:30:00Z",
    tags: ["treatment", "questions", "organic"],
    likes: 19,
    comments: [
      {
        id: "comment-4-1",
        postId: "4",
        authorId: "user-10",
        authorName: "James Wilson",
        authorAvatar: "/placeholder.svg",
        content: "I make a spray with water, a few drops of dish soap, and neem oil. Works wonders without harming beneficial insects!",
        createdAt: "2025-03-22T12:15:00Z",
        likes: 11
      },
      {
        id: "comment-4-2",
        postId: "4",
        authorId: "user-11",
        authorName: "Fatima Ahmed",
        authorAvatar: "/placeholder.svg",
        content: "Introducing ladybugs to your garden is a great natural solution. They love to eat aphids!",
        createdAt: "2025-03-22T13:40:00Z",
        likes: 8
      }
    ]
  },
  {
    id: "5",
    title: "Best practices for crop rotation with limited space",
    content: "I have a small urban garden with only four raised beds. How can I effectively implement crop rotation to prevent soil-borne diseases with such limited space? What are your strategies?",
    authorId: "user-12",
    authorName: "Daniel Lopez",
    authorAvatar: "/placeholder.svg",
    createdAt: "2025-03-21T14:10:00Z",
    tags: ["techniques", "prevention"],
    likes: 22,
    comments: [
      {
        id: "comment-5-1",
        postId: "5",
        authorId: "user-13",
        authorName: "Sophia Miller",
        authorAvatar: "/placeholder.svg",
        content: "I divide my crops into families (nightshades, brassicas, legumes, etc.) and rotate those families through my beds each season. Works even in small spaces!",
        createdAt: "2025-03-21T15:25:00Z",
        likes: 14
      }
    ]
  }
];
