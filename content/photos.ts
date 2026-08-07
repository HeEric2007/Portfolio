type PhotoBase = {
  /** Unique, url-safe. Used as the React key and grid item id. */
  id: string;
  /** Required — describes the content for screen readers, not "photo of X". */
  alt: string;
  /** Intrinsic pixel dimensions, used to size the grid item without layout shift. */
  width: number;
  height: number;
  caption?: string;
};

export type PhotoItem =
  | (PhotoBase & {
      type: "image";
      /** Path under /public, e.g. "/photos/foo.jpg". */
      src: string;
    })
  | (PhotoBase & {
      type: "video";
      /** Path under /public to the encoded mp4 — see scripts/optimize-media.sh. */
      src: string;
      /** Path under /public to the poster frame. Required so nothing pops in. */
      poster: string;
    });

// Add a photo or clip by adding an entry here. Newest first.
// For video, run: ./scripts/optimize-media.sh <raw.mov> <name>
// which drops name.mp4 + name.jpg into public/photos/ for you.
export const photos: PhotoItem[] = [
  {
    id: "pokemon",
    type: "image",
    src: "/photos/pokemon.jpg",
    alt: "A fanned-out spread of graded Pokemon trading cards on a wooden desk, with a plush Psyduck toy in the corner.",
    width: 1200,
    height: 1600,
  },
  {
    id: "car",
    type: "image",
    src: "/photos/car.jpg",
    alt: "Two modified BMW sedans and a white sedan parked in a driveway in front of a house at golden hour.",
    width: 1200,
    height: 1600,
  },
  {
    id: "cat",
    type: "image",
    src: "/photos/cat.jpg",
    alt: "A white and tabby cat lying upside down on a cracked stone pavement, stretching with all four paws in the air.",
    width: 1600,
    height: 1200,
  },
  {
    id: "flower-field",
    type: "image",
    src: "/photos/flower_field.jpg",
    alt: "A dirt path winding through a hillside field of pink and orange wildflowers under a blue sky with distant mountains.",
    width: 1200,
    height: 1600,
  },
  {
    id: "shibuya",
    type: "video",
    src: "/photos/shibuya.mp4",
    poster: "/photos/shibuya.jpg",
    alt: "Aerial night view over Tokyo from a skyscraper observation deck, looking down a lit-up avenue cutting through dense high-rises.",
    width: 1200,
    height: 1600,
  },
  {
    id: "butterfly",
    type: "image",
    src: "/photos/butterfly.jpg",
    alt: "An installation of iridescent glass butterfly ornaments suspended on wires against a dark background.",
    width: 1600,
    height: 1200,
  },
];
