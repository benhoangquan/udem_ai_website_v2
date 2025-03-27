import { sanityClient, urlFor } from '@/lib/sanity';
import { GeneralInfo, GeneralInfoDisplay, SocialLinks } from '@/types/generalInfo';
import { SanityImageSource } from '@/types/activity';

// Define the type for the general info data returned from Sanity
interface SanityGeneralInfo {
  _id: string;
  title: string;
  description: string;
  email: string;
  logo?: SanityImageSource;
  gallery?: SanityImageSource[];
  socialMedia?: SocialLinks;
}

/**
 * Fetches general information from Sanity CMS
 */
export async function getGeneralInfo(): Promise<GeneralInfoDisplay | null> {
  const query = `*[_type == "generalInfo"][0] {
    _id,
    title,
    description,
    email,
    logo,
    gallery,
    socialMedia
  }`;

  try {
    const generalInfo = await sanityClient.fetch<SanityGeneralInfo>(query);

    if (!generalInfo) return null;

    return {
      _id: generalInfo._id,
      title: generalInfo.title,
      description: generalInfo.description,
      email: generalInfo.email,
      logo: generalInfo.logo ? urlFor(generalInfo.logo).url() : '',
      gallery: generalInfo.gallery 
        ? generalInfo.gallery.map((img) => urlFor(img).width(1200).url()) 
        : [],
      socialMedia: generalInfo.socialMedia,
    };
  } catch (error) {
    console.error('Error fetching general information:', error);
    return null;
  }
} 