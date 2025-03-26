import { sanityClient, urlFor } from '@/lib/sanity';
import { GeneralInfo, GeneralInfoDisplay, SocialLinks } from '@/types/generalInfo';

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
    const generalInfo = await sanityClient.fetch<Record<string, any>>(query);

    if (!generalInfo) return null;

    return {
      _id: generalInfo._id as string,
      title: generalInfo.title as string,
      description: generalInfo.description as string,
      email: generalInfo.email as string,
      logo: generalInfo.logo ? urlFor(generalInfo.logo).url() : '',
      gallery: generalInfo.gallery 
        ? generalInfo.gallery.map((img: any) => urlFor(img).width(1200).url()) 
        : [],
      socialMedia: generalInfo.socialMedia as SocialLinks,
    };
  } catch (error) {
    console.error('Error fetching general information:', error);
    return null;
  }
} 