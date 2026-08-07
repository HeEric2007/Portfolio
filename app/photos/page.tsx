import type { Metadata } from "next";
import { photos } from "@/content/photos";
import { PhotoGrid } from "@/components/photo-grid";

export const metadata: Metadata = {
  title: "photos",
  description: "photos and clips.",
};

export default function PhotosPage() {
  return (
    <div className="pt-8 md:pt-16">
      <h1 className="text-3xl font-bold">photos</h1>
      <div className="mt-10">
        <PhotoGrid items={photos} />
      </div>
    </div>
  );
}
