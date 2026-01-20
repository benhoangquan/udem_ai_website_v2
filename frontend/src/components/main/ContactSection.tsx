import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

const ContactSection: React.FC = () => {
  const t = useTranslations("contact");

  return (
    <div className="bg-seth-coral w-full">
      <div className="relative z-10 py-20 md:py-32 px-6 w-full">
        <div className="container mx-auto w-full h-full">
          <div className="flex flex-col items-center text-center">
            {/* Social Media Icons */}
            <div className="flex gap-6 mb-12">
              <Link
                href="https://www.instagram.com/udem.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-seth-coral/20 transition-colors"
              >
                <Instagram size={24} strokeWidth={2} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/udem-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-seth-coral/20 transition-colors"
              >
                <Linkedin size={24} strokeWidth={2} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://discord.gg/2Ttnw8p2Hy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-seth-coral/20 transition-colors"
              >
                <MessageSquare size={24} strokeWidth={2} />
                <span className="sr-only">Discord</span>
              </Link>
            </div>

            <div className="text-white opacity-80 mt-16">{t("copyright")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
