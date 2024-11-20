"use client";

import { Button } from "./Buttons";
import { createBlog } from "../../../lib/actions/createBlog";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";

export function CreateBlog() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [suggestions, setSuggestions] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Debounced function to get AI suggestions
    const debouncedGetSuggestions = useCallback(
        debounce(async (title: string, description: string) => {
            if (!title && !description) return;

            setIsLoading(true);
            try {
                const response = await fetch("/api/suggestions", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        content: `Title: ${title}\n\nContent: ${description}`,
                    }),
                });

                const data = await response.json();
                console.log("Suggestions from API:", data);

                setSuggestions(data.suggestions || "No suggestions available.");
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions("Unable to fetch suggestions. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }, 1000),
        []
    );

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value);
        debouncedGetSuggestions(value, desc);
    };

    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setDesc(value);
        debouncedGetSuggestions(title, value);
    };

    return (
        <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Editor Section */}
                <div className="flex-1">
                    <div className="flex m-3 p-6 gap-2">
                        <svg
                            className="w-5 h-9 font-3xl"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                        <div className="flex-col w-full">
                            <div className="flex flex-col gap-2">
                                <input
                                    onChange={handleTitleChange}
                                    type="text"
                                    placeholder="Title"
                                    className="text-4xl border rounded p-2"
                                    value={title}
                                />
                                <textarea
                                    onChange={handleDescChange}
                                    placeholder="What's on your mind!"
                                    className="border rounded p-2 min-h-[200px] resize-y"
                                    value={desc}
                                />
                            </div>
                            <div className="mt-4">
                                <Button
                                    onClick={async () => {
                                        await createBlog(title, desc);
                                        router.push("/home");
                                    }}
                                >
                                    Create
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Suggestions Section */}
                <div className="flex-1 p-6 border-l">
                    <h3 className="text-xl font-semibold mb-4">AI Suggestions</h3>
                    <div className="min-h-[200px] bg-gray-50 rounded-lg p-4">
                        {isLoading ? (
                            <div className="animate-pulse space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        ) : suggestions ? (
                            <div className="prose max-w-none">
                                {suggestions.split("\n").map((paragraph, index) => (
                                    <p key={index} className="mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">
                                Start writing to get AI-powered suggestions for your blog post...
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
