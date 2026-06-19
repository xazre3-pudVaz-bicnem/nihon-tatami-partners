import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nihontatami.jp";
const SITE_NAME = "日本畳パートナーズ";
const SITE_DESCRIPTION =
  "畳の表替え・新調から内装工事・原状回復まで。住宅・旅館・寺社・店舗・賃貸物件に対応。不動産会社・管理会社・賃貸オーナー向けの継続案件も承ります。";

export function createMetadata({
  title,
  description,
  path = "/",
  image = "/og-image.jpg",
  noindex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: `${title} | ${SITE_NAME}`,
        },
      ],
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [`${SITE_URL}${image}`],
    },
    alternates: {
      canonical: url,
    },
    robots: noindex ? "noindex,nofollow" : "index,follow",
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | 畳・内装・原状回復の専門パートナー`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: "index,follow",
  verification: {
    google: process.env.GOOGLE_VERIFICATION || "",
  },
};

export { SITE_URL, SITE_NAME, SITE_DESCRIPTION };
