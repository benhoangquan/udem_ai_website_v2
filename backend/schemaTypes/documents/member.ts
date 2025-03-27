export default {
    name: 'member',
    title: 'Members',
    type: 'document',
    fields: [
      { name: 'name', title: 'Full Name', type: 'string', validation: (Rule: any) => Rule.required() },
      { name: 'email', title: 'Email', type: 'string', validation: (Rule: any) => Rule.required().email() },
      {
        name: 'role',
        title: 'Role',
        type: 'string',
        options: {
          list: [
            { title: 'Member', value: 'member' },
            { title: 'Executive', value: 'executive' },
            { title: 'Alumni', value: 'alumni' },
          ],
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'executivePosition',
        title: 'Executive Position',
        type: 'string',
        hidden: ({ parent }: any) => parent?.role !== 'executive',
      },
      { name: 'avatar', title: 'Avatar', type: 'image', options: { hotspot: true } },
      { name: 'bio', title: 'Biography', type: 'text' },
      { name: 'socialLinks', title: 'Social Links', type: 'socialLinks' },
    ],
  }