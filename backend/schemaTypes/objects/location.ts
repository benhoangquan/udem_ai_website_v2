export default {
    name: 'location',
    title: 'Location',
    type: 'object',
    fields: [
      {
        name: 'type',
        title: 'Location Type',
        type: 'string',
        options: {
          list: [
            { title: 'In-Person', value: 'in_person' },
            { title: 'Online', value: 'online' },
            { title: 'Hybrid', value: 'hybrid' },
          ],
        },
      },
      {
        name: 'venue',
        title: 'Venue',
        type: 'string',
        hidden: ({ parent }: any) => parent?.type === 'online',
      },
      {
        name: 'address',
        title: 'Address',
        type: 'string',
        hidden: ({ parent }: any) => parent?.type === 'online',
      },
      {
        name: 'meetingLink',
        title: 'Meeting Link',
        type: 'url',
        hidden: ({ parent }: any) => parent?.type === 'in_person',
      },
    ],
  } 