import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nihontatami.jp";
const SITE_NAME = "日本畳パートナーズ";
const SITE_DESCRIPTION =
  "埼玉県の畳表替え・畳新調・和室リフォーム・ふすま障子張替えに対応した専門業者を料金・口コミで比較できるマッチングサービス。さいたま市・川口市・川越市など31市区町村対応。無料で見積もり依頼できます。";

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
    default: `${SITE_NAME} | 埼玉の畳・和室工事業者を料金と口コミで比較`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ["埼玉 畳", "埼玉 畳 表替え", "埼玉 畳業者", "畳表替え 埼玉", "さいたま市 畳", "川口市 畳", "川越市 畳"],
  openGraph: {
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: "index,follow",
  verification: {
    google: process.env.GOOGLE_VERIFICATION || "",
  },
};

export { SITE_URL, SITE_NAME, SITE_DESCRIPTION };
