export default {
    name: 'generalInfo',
    title: 'General Information',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Club Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'email', 
            title: 'Email', 
            type: 'string', 
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image' }],
        },
        {
            name: 'socialMedia',
            title: 'Social Media Links',
            type: 'socialLinks',
        },
    ],
  }