import configPromise from "@payload-config";
import Link from "next/link";
import type { Metadata } from "next/types";
import { getPayload } from "payload";
import { Media } from "@/components/Media";
import type { Category } from "@/payload-types";

export const dynamic = "force-dynamic";

function parentID(category: Category) {
	return typeof category.parent === "object" && category.parent
		? category.parent.id
		: typeof category.parent === "number"
			? category.parent
			: null;
}

function descendantIDs(categoryID: number, children: Map<number, number[]>) {
	const ids = [categoryID];
	for (const childID of children.get(categoryID) ?? []) {
		ids.push(...descendantIDs(childID, children));
	}
	return ids;
}

export default async function Categorias() {
	const payload = await getPayload({ config: configPromise });
	const [categories, posts] = await Promise.all([
		payload.find({
			collection: "categories",
			depth: 1,
			limit: 0,
			sort: "title",
		}),
		payload.find({
			collection: "posts",
			draft: false,
			depth: 0,
			limit: 0,
			overrideAccess: false,
			select: { categories: true },
			where: { _status: { equals: "published" } },
		}),
	]);

	const counts = new Map<number, number>();
	for (const post of posts.docs) {
		for (const category of post.categories ?? []) {
			const id = typeof category === "object" ? category.id : category;
			if (typeof id === "number") counts.set(id, (counts.get(id) ?? 0) + 1);
		}
	}

	const children = new Map<number, number[]>();
	for (const category of categories.docs) {
		const parent = parentID(category);
		if (parent !== null) children.set(parent, [...(children.get(parent) ?? []), category.id]);
	}
	const topLevelCategories = categories.docs.filter((category) => parentID(category) === null);
	const activeCategories = topLevelCategories
		.map((category) => ({
			category,
			count: descendantIDs(category.id, children).reduce(
				(total, id) => total + (counts.get(id) ?? 0),
				0,
			),
		}))
		.filter(({ count }) => count > 0);

	return (
		<div className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6">
			<header className="border-b-2 border-teal pb-5">
				<p className="kicker text-teal">Índice</p>
				<h1 className="font-display mt-2 text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.08] tracking-tight">
					Categorías
				</h1>
				<p className="kicker mt-3 text-fog">
					{activeCategories.length} categorías principales con artículos publicados · explora por tema
				</p>
			</header>
			<ul className="m-0 mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
				{activeCategories.map(({ category, count }) => (
					<li key={category.id}>
						<Link
							href={`/categorias/${category.slug}`}
							className="group block overflow-hidden border border-rule bg-paper transition-colors hover:border-teal"
						>
							<div className="aspect-[16/9] bg-paper-2">
								{category.image && typeof category.image === "object" ? (
									<Media
										resource={category.image}
										className="h-full w-full"
										imgClassName="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
										size="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									/>
								) : (
									<span className="tile-letter flex h-full items-center justify-center text-6xl text-teal" aria-hidden="true">
										{category.title.charAt(0).toUpperCase()}
									</span>
								)}
							</div>
							<div className="flex items-baseline justify-between gap-3 p-4">
								<h2 className="font-display text-xl font-bold group-hover:text-teal">{category.title}</h2>
								<span className="kicker shrink-0 text-fog">{count} {count === 1 ? "artículo" : "artículos"}</span>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export function generateMetadata(): Metadata {
	return {
		title: "Categorías",
		description: "Explora los artículos de tecnofreak.net por categoría.",
		alternates: { canonical: "/categorias" },
	};
}
