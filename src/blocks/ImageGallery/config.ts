import type { Block } from "payload";
import { validateImageLink } from "@/utilities/validateImageLink";

export const ImageGallery: Block = {
	slug: "imageGallery",
	interfaceName: "ImageGalleryBlock",
	labels: {
		plural: "Image galleries",
		singular: "Image gallery",
	},
	fields: [
		{
			name: "images",
			type: "array",
			minRows: 1,
			fields: [
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					required: true,
				},
				{
					name: "url",
					type: "text",
					label: "Destination URL",
					admin: {
						description: "Optional URL opened when this image is clicked.",
					},
					validate: validateImageLink,
				},
			],
		},
	],
};
