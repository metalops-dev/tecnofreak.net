"use client";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/utilities/useDebounce";

export const Search: React.FC<{ initialQuery: string }> = ({ initialQuery }) => {
	const [value, setValue] = useState(initialQuery);
	const router = useRouter();

	const debouncedValue = useDebounce(value);

	useEffect(() => {
		const params = new URLSearchParams();
		if (debouncedValue) params.set("q", debouncedValue);
		router.replace(`/search${params.size ? `?${params}` : ""}`);
	}, [debouncedValue, router]);

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<label htmlFor="search" className="sr-only">Buscar noticias</label>
				<input
					id="search"
					type="search"
					value={value}
					onChange={(event) => setValue(event.target.value)}
					placeholder="Buscar noticias…"
					className="min-h-11 w-full border border-rule bg-paper px-4 text-sm text-ink placeholder:text-fog focus:border-teal"
				/>
			</form>
		</div>
	);
};
