import type React from "react";
import { Media } from "@/components/Media";
import type { ImageGalleryBlock as ImageGalleryBlockProps } from "@/payload-types";
import { isSafeImageLink } from "@/utilities/validateImageLink";

export const ImageGalleryBlock: React.FC<ImageGalleryBlockProps> = ({ images }) => {
	return (
		<div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
			{images?.map(({ id, image, url }) => {
				if (
					!image ||
					typeof image !== "object" ||
					!image.mimeType?.startsWith("image/")
				)
					return null;

				const media = (
					<Media
						resource={image}
						size="(max-width: 640px) 100vw, 50vw"
						imgClassName="h-auto w-full object-cover"
						pictureClassName="h-full"
					/>
				);

				return (
					<div className="overflow-hidden rounded-[0.8rem]" key={id}>
						{isSafeImageLink(url) ? (
							<a href={url} target="_blank" rel="noopener noreferrer">
								{media}
							</a>
						) : (
							media
						)}
					</div>
				);
			})}
		</div>
	);
};
