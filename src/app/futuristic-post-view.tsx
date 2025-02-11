"use client"

import Link from "next/link"
import type React from "react"
import Avvvatars from "avvvatars-react";

interface Comment {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

interface Post {
    userId: number
    id: number
    title: string
    body: string
    commentsCount: number
}

export const FuturisticPostView: React.FC<{ post: Post, comments: Comment[] }> = ({ post, comments }) => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Post Card */}
            <FuturisticPostMainCard post={post} isLink={false} />

            {/* Comments Section */}
            <FuturisticPostComments comments={comments} />
        </div>
    )
}

export const FuturisticPostViewSkeleton: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Post Card Skeleton */}
            <FuturisticPostMainCardSkeleton />

            {/* Comments Section Skeleton */}
            <FuturisticPostCommentSkeleton />
        </div>
    )
}

export const FuturisticPostMainCardSkeleton: React.FC = () => {
    return (
        <div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-700 animate-pulse">
            <div className="h-8 w-3/4 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-3/4 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-gray-700 rounded mb-4"></div>
        </div>
    )
}

export const FuturisticPostCommentSkeleton: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="h-8 w-1/2 mx-auto bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-1/2 mx-auto bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-1/2 mx-auto bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-1/2 mx-auto bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-1/2 mx-auto bg-gray-700 rounded animate-pulse"></div>
        </div>
    )
}

export const FuturisticPostViewError: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500 shadow-text">
                    Error Fetching Data
                </h1>
                <p className="text-gray-300">
                    There was an error fetching the data. Please try again later.
                </p>
            </div>
        </div>
    )
}

export const FuturisticPosts: React.FC<{ posts: Post[] }> = ({ posts }) => {
    return (
        <>
            {
                posts.map((post) => (
                    <FuturisticPostMainCard isLink={true} post={post} key={post.id} />
                ))
            }
        </>
    )
}

export const FuturisticPostMainCard: React.FC<{ post: Post, isLink: boolean }> = ({ post: { body, commentsCount, id, title, userId }, isLink }) => {
    return (
        <>
            {isLink ? (
                <Link href={`/todo/${id}`} key={id} className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg border-2 border-gray-700 hover:border-indigo-500 transition duration-300">
                    <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 shadow-text">
                        {title}
                    </h1>
                    <p className="text-sm text-gray-400 mb-4">
                        Post ID: {id} | User ID: {userId}
                    </p>
                    <p className="text-gray-300 whitespace-pre-line mb-6">{body}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{commentsCount} comments</span>
                        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
                    </div>
                </Link>
            ) : (
                <div key={id} className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg border-2 border-gray-700 hover:border-indigo-500 transition duration-300">
                    <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 shadow-text">
                        {title}
                    </h1>
                    <p className="text-sm text-gray-400 mb-4">
                        Post ID: {id} | User ID: {userId}
                    </p>
                    <p className="text-gray-300 whitespace-pre-line mb-6">{body}</p>
                    <div className="flex items-center justify-between">
                        <Link href={`/fake`} className="text-sm text-indigo-400 hover:text-indigo-500">
                            View Error Page
                        </Link>
                        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>

                    </div>
                </div>
            )}
        </>
    )
}

export const FuturisticPostComments: React.FC<{ comments: Comment[] }> = ({ comments }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-text">
                Comments
            </h2>
            {comments.map((comment) => (
                <FuturisticPostCommentCard comment={comment} key={comment.id} />
            ))}
        </div>
    )
}

export const FuturisticPostCommentCard: React.FC<{ comment: Comment }> = ({ comment: { body, email, id, name } }) => {
    return (
        <div
            key={id}
            className="bg-black/90 backdrop-filter backdrop-blur-lg rounded-xl p-4 shadow-lg border-2 border-gray-700 hover:border-cyan-500 transition duration-300"
        >
            <div className="flex flex-col sm:flex-row xl:flex-row md:flex-row items-center space-x-4 mb-4">
                <div className="w-fit h-fit rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-glow *:bg-gradient-to-br/from-indigo-500/to-purple-600">
                    <Avvvatars
                        value={email+name+id}
                        style="shape"
                        radius={50}

                        border={true}
                        size={80}
                    />
                </div>
                <div>
                    <h3 className="font-semibold text-slate-300 text-sm">{name}</h3>
                    <p className="text-base text-sky-500">{email}</p>
                </div>
            </div>
            <p className="text-gray-300">{body}</p>
        </div>
    )
}