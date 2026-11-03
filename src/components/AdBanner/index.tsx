"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

/**
 * Banner de AdSense alargado y responsive (formato auto a ancho completo).
 * Solo se renderiza en producción; en desarrollo devuelve null.
 */
export const AdBanner: React.FC<{
	slot?: string;
	className?: string;
	label?: string;
}> = ({ slot = "1829090800", className = "", label = "Publicidad" }) => {
	const pushed = useRef(false);
	const ad = useRef<HTMLModElement>(null);
	const [unfilled, setUnfilled] = useState(false);

	useEffect(() => {
		if (pushed.current) return;
		try {
			const w = window as unknown as { adsbygoogle?: unknown[] };
			w.adsbygoogle = w.adsbygoogle || [];
			w.adsbygoogle.push({});
			pushed.current = true;
		} catch {
			// AdSense aún no cargado: el siguiente montaje lo reintenta
		}
	}, []);

	useEffect(() => {
		const element = ad.current;
		if (!element) return;
		const update = () => setUnfilled(element.dataset.adStatus === "unfilled");
		const observer = new MutationObserver(update);
		observer.observe(element, { attributes: true, attributeFilter: ["data-ad-status"] });
		update();
		return () => observer.disconnect();
	}, []);

	if (process.env.NODE_ENV !== "production" || unfilled) return null;

	return (
		<aside aria-label={label} className={`w-full ${className}`}>
			<ins
				ref={ad}
				className="adsbygoogle block"
				style={{ display: "block" }}
				data-ad-client="ca-pub-1455213377925841"
				data-ad-slot={slot}
				data-ad-format="auto"
				data-full-width-responsive="true"
			/>
		</aside>
	);
};
