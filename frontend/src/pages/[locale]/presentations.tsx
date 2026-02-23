import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { locales } from "@/i18n/config";
import { FileText, Download, ExternalLink } from "lucide-react";

interface PresentationItem {
    title: string;
    link: string;
}

interface SemesterPresentations {
    semester: string;
    items: PresentationItem[];
}

const presentations: SemesterPresentations[] = [
    {
        semester: "Winter 2026",
        items: [
            { title: "Week 1", link: "/presentations/w26/lecture1.pdf" },
            { title: "Week 2", link: "/presentations/w26/lecture2.pdf" },
        ],
    },
];

export default function PresentationsPage() {
    const t = useTranslations("presentations");
    const [selectedPdf, setSelectedPdf] = useState<string | null>(
        presentations[0]?.items[0]?.link || null
    );
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <main className="bg-cream min-h-screen pt-24 pb-16">
            <Head>
                <title>UdeM AI Club - Presentations</title>
            </Head>
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8 text-seth-coral">
                    {t("title")}
                </h1>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 text-gray-700 max-w-2xl">
                    {t("description")}
                </p>

                {isMobile ? (
                    /* ── Mobile: Card-based layout ── */
                    <div className="space-y-8">
                        {presentations.map((semester, idx) => (
                            <div key={idx}>
                                <h3 className="text-xl font-bold mb-4 text-gray-800">
                                    {semester.semester}
                                </h3>
                                {semester.items.length > 0 ? (
                                    <div className="space-y-3">
                                        {semester.items.map((item, itemIdx) => (
                                            <div
                                                key={itemIdx}
                                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4"
                                            >
                                                <div className="flex-shrink-0 w-12 h-12 bg-seth-coral/10 rounded-lg flex items-center justify-center">
                                                    <FileText className="text-seth-coral" size={24} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-gray-800 truncate">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-sm text-gray-500">PDF</p>
                                                </div>
                                                <div className="flex gap-2 flex-shrink-0">
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-seth-coral text-white text-sm font-medium rounded-lg hover:bg-seth-coral/90 transition-colors"
                                                    >
                                                        <ExternalLink size={16} />
                                                        <span className="hidden xs:inline">{t("open")}</span>
                                                    </a>
                                                    <a
                                                        href={item.link}
                                                        download
                                                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                                                    >
                                                        <Download size={16} />
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic text-sm">
                                        {t("noPresentations")}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    /* ── Desktop: Sidebar + iframe preview ── */
                    <div className="flex flex-row gap-8 h-[calc(100vh-250px)] min-h-[600px]">
                        {/* Sidebar List */}
                        <div className="w-1/3 bg-white p-6 rounded-lg shadow-sm overflow-y-auto">
                            <div className="space-y-8">
                                {presentations.map((semester, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-xl font-bold mb-4 text-gray-800">
                                            {semester.semester}
                                        </h3>
                                        {semester.items.length > 0 ? (
                                            <div className="space-y-2">
                                                {semester.items.map((item, itemIdx) => (
                                                    <button
                                                        key={itemIdx}
                                                        onClick={() => setSelectedPdf(item.link)}
                                                        className={`w-full text-left p-3 rounded-lg transition-colors flex justify-between items-center group ${selectedPdf === item.link
                                                            ? "bg-seth-coral text-white"
                                                            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                                                            }`}
                                                    >
                                                        <span className="font-medium truncate mr-2">
                                                            {item.title}
                                                        </span>
                                                        {selectedPdf === item.link && (
                                                            <span className="text-xs bg-white text-seth-coral px-2 py-0.5 rounded-full font-bold">
                                                                {t("viewing")}
                                                            </span>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 italic text-sm">
                                                {t("noPresentations")}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PDF Preview Pane */}
                        <div className="w-2/3 bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col">
                            {selectedPdf ? (
                                <>
                                    <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
                                        <span className="text-gray-300 text-sm truncate">
                                            {presentations
                                                .flatMap((s) => s.items)
                                                .find((i) => i.link === selectedPdf)?.title}
                                        </span>
                                        <div className="flex gap-2">
                                            <a
                                                href={selectedPdf}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-white transition-colors"
                                                title="Open in new tab"
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                            <a
                                                href={selectedPdf}
                                                download
                                                className="text-gray-400 hover:text-white transition-colors"
                                                title="Download"
                                            >
                                                <Download size={18} />
                                            </a>
                                        </div>
                                    </div>
                                    <iframe
                                        src={`${selectedPdf}#toolbar=0`}
                                        className="w-full flex-1 border-none"
                                        title="PDF Preview"
                                    />
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <p>{t("selectPresentation")}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: locales.map((locale) => ({ params: { locale } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const locale = params?.locale as string;
    const messages = (await import(`../../messages/${locale}.json`)).default;

    return {
        props: {
            messages,
        },
    };
};
