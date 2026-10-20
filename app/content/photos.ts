/*
 * Stock photography from Pexels (free to use, no attribution required).
 * Source pages: https://www.pexels.com/photo/<id>/
 * Replace with Tri-Lab's own photos as they become available; keep the keys
 * so pages pick up the new images without code changes.
 *
 * Most placements are decorative and pass alt="" so screen readers skip
 * them; `alt` here is for placements where the photo carries meaning.
 */
import handshake from "~/assets/photos/handshake.jpg?w=640;1280;1920&format=avif;webp;jpg&as=picture";
import labResearcher from "~/assets/photos/lab-researcher.jpg?w=640;1280;1920&format=avif;webp;jpg&as=picture";
import labTeam from "~/assets/photos/lab-team.jpg?w=640;1280;1920&format=avif;webp;jpg&as=picture";
import nairobiSkyline from "~/assets/photos/nairobi-skyline.jpg?w=640;1280;1920&format=avif;webp;jpg&as=picture";
import officeCall from "~/assets/photos/office-call.jpg?w=640;1280;1920&format=avif;webp;jpg&as=picture";
import paperwork from "~/assets/photos/paperwork.jpg?w=640;1280;1920&format=avif;webp;jpg&as=picture";
import sampleTubes from "~/assets/photos/sample-tubes.jpg?w=640;1280;1920&format=avif;webp;jpg&as=picture";
import scientistMicroscope from "~/assets/photos/scientist-microscope.jpg?w=640;1280;1920&format=avif;webp;jpg&as=picture";
import warehouse from "~/assets/photos/warehouse.jpg?w=640;1280;1920&format=avif;webp;jpg&as=picture";
import type { PictureSource } from "~/components/ui/Portrait";

export interface PhotoAsset {
  readonly picture: PictureSource;
  readonly alt: string;
}

export const photos = {
  // Pexels 5726716
  scientistMicroscope: {
    picture: scientistMicroscope,
    alt: "A laboratory scientist looking through a microscope",
  },
  // Pexels 15496542
  nairobiSkyline: {
    picture: nairobiSkyline,
    alt: "The Nairobi skyline and expressway",
  },
  // Pexels 6931199
  handshake: {
    picture: handshake,
    alt: "Two business partners shaking hands",
  },
  // Pexels 8442281
  labTeam: {
    picture: labTeam,
    alt: "Two scientists working with samples at a laboratory bench",
  },
  // Pexels 6622519
  sampleTubes: {
    picture: sampleTubes,
    alt: "Barcoded blood sample tubes in a laboratory rack",
  },
  // Pexels 3825436
  labResearcher: {
    picture: labResearcher,
    alt: "A researcher in protective eyewear running a laboratory test",
  },
  // Pexels 8152735
  paperwork: {
    picture: paperwork,
    alt: "Two people reviewing documents at a desk",
  },
  // Pexels 27111449
  warehouse: {
    picture: warehouse,
    alt: "Boxed stock on tall warehouse shelving",
  },
  // Pexels 3894377
  officeCall: {
    picture: officeCall,
    alt: "A smiling professional on a phone call at her desk",
  },
} as const satisfies Record<string, PhotoAsset>;

export type PhotoKey = keyof typeof photos;
