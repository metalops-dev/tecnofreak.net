import type { CollectionConfig } from "payload";
import { slugField } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Categories: CollectionConfig = {
	slug: "categories",
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	labels: {
		singular: "Categoría",
		plural: "Categorías",
	},
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "parent", "updatedAt"],
	},
	fields: [
		{
			name: "title",
			label: "Nombre",
			type: "text",
			required: true,
		},
		{
			name: "image",
			label: "Imagen",
			type: "upload",
			relationTo: "media",
			admin: {
				description: "Opcional. Se muestra en la página de categorías.",
			},
		},
		{
			name: "parent",
			label: "Categoría superior",
			type: "relationship",
			admin: {
				position: "sidebar",
			},
			relationTo: "categories",
		},
		slugField({
			position: undefined,
		}),
	],
};
