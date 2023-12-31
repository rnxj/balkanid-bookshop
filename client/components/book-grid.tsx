"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BookCard } from "./book-card";
import { Button } from "./ui/button";

// <BookGrid bookList={data}/>

interface BookGridProps {
	bookList: any;
}

export function BookGrid({ bookList }: BookGridProps) {
	const Router = useRouter();
	const [searchText, setSearchText] = useState("");

	const [books, setBooks] = useState(bookList);

	async function searchAuthor(authorName: string) {
		setBooks([]);
		const response = await fetch(
			"http://localhost:3000/api/book/searchAuthor/",
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ book_author: authorName }),
			}
		);
		const data = await response.json();
		setBooks(data.data);
	}

	async function searchTitle(title: string) {
		setBooks([]);
		const response = await fetch(
			"http://localhost:3000/api/book/searchTitle/",
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ book_title: title }),
			}
		);
		const data = await response.json();
		setBooks(data.data);
	}

	return (
		<>
			<div>
				<h3 className="text-2xl py-6 text-center">
					Search For The Book!
				</h3>
				{/* <div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="bookName">Book Name</Label>
					<Input
						type="text"
						value={searchText}
						autoComplete="off"
						id="bookName"
						placeholder="Author Name or Book Title"
						onChange={(e) => setSearchText(e.target.value)}
					/>
					<Button
						variant="default"
						onClick={() => {
							searchTitle(searchText);
						}}
					>
						Search With Title
					</Button>

					<Button
						variant="default"
						onClick={() => {
							searchAuthor(searchText);
						}}
					>
						Search With Author
					</Button>
				</div> */}

				<div className="grid w-full py-6 max-w-sm items-center gap-1.5">
					<Button
						variant="default"
						onClick={() => {
							Router.push("/search");
						}}
					>
						Go to Search Page
					</Button>
				</div>

				<h3 className="text-3xl pt-12 pb-6 text-center">
					Book Collection
				</h3>
			</div>

			<div className="mb-32 grid text-center md:grid-cols-2 lg:mb-0 lg:grid-cols-3 lg:text-left">
				{bookList.map((book: any) => {
					return (
						<BookCard
							name={book.book_title}
							id={book.ID.toString()}
							imgUrl={book.image_url}
							key={book.book_title + "Card"}
						/>
					);
				})}
			</div>
		</>
	);
}
