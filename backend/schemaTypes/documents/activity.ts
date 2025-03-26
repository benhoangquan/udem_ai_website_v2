export default {
    name: 'activity',
    title: 'Activities',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Activity Title',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
      },
      {
        name: 'type',
        title: 'Activity Type',
        type: 'string',
        options: {
          list: [
            { title: 'Workshop', value: 'workshop' },
            { title: 'Hackathon', value: 'hackathon' },
            { title: 'Study Group', value: 'study_group' },
            { title: 'Project Meeting', value: 'project_meeting' },
            { title: 'Social Event', value: 'social' },
            { title: 'Competition', value: 'competition' },
            { title: 'Other', value: 'other' },
          ],
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Description',
        type: 'blockContent',
      },
      {
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'mainImage',
        title: 'Main Image',
        type: 'image',
      },
      {
        name: 'gallery',
        title: 'Activity Gallery',
        type: 'array',
        of: [{ type: 'image' }],
      },
      {
        name: 'schedule',
        title: 'Schedule',
        type: 'schedule',
      },
      {
        name: 'location',
        title: 'Location',
        type: 'location',
      },
    
      {
        name: 'status',
        title: 'Activity Status',
        type: 'string',
        options: {
          list: [
            { title: 'Planned', value: 'planned' },
            { title: 'Open for Registration', value: 'open' },
            { title: 'Full', value: 'full' },
            { title: 'In Progress', value: 'in_progress' },
            { title: 'Completed', value: 'completed' },
            { title: 'Cancelled', value: 'cancelled' },
          ],
        },
        initialValue: 'planned',
      },
    ],
    preview: {
      select: {
        title: 'title',
        type: 'type',
        startDate: 'schedule.startDateTime',
        media: 'mainImage',
      },
      prepare(selection: any) {
        const { title, type, startDate, media } = selection;
        return {
          title,
          subtitle: type ? type.charAt(0).toUpperCase() + type.slice(1) : '',
          media,
        };
      },
    },
  }