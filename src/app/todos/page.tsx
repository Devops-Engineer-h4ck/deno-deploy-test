import { Suspense } from 'react';
import { FuturisticPostMainCardSkeleton, FuturisticPosts } from '../futuristic-post-view';
export interface Post {
    userId: number
    id: number
    title: string
    body: string
    commentsCount: number
}

export interface Comment {
    postId: number
    id: number
    name: string
    email: string
    body: string
}



export default async function TodosPage() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const posts = await res.json() as Omit<Post, 'commentsCount'>[];

    // Combine posts and comments which have the same id
    const combinedData = posts.map(async (post: Omit<Post, 'commentsCount'>) => {
        const resComments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
        const comments = await resComments.json() as Comment[];
        return {
            ...post,
            commentsCount: comments.length
        }
    })

    const allData = await Promise.all(combinedData) as Post[];


    return (
        <div className="min-h-screen text-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-4 uppercase bg-linear-to-r/increasing from-indigo-500 to-teal-400 bg-clip-text text-5xl font-extrabold text-transparent">
                List of the all Posts
            </h1>

            <Suspense
                fallback={
                    <div className='grid grid-cols-3 gap-4'>
                        <FuturisticPostMainCardSkeleton />
                        <FuturisticPostMainCardSkeleton />
                        <FuturisticPostMainCardSkeleton />
                        <FuturisticPostMainCardSkeleton />
                        <FuturisticPostMainCardSkeleton />
                        <FuturisticPostMainCardSkeleton />
                    </div>
                }
            >
                <div className='grid grid-cols-3 gap-4'>
                    <FuturisticPosts posts={allData} />
                </div>
            </Suspense>
        </div>
    );
}
