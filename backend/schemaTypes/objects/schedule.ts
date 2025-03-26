export default {
    name: 'schedule',
    title: 'Schedule',
    type: 'object',
    fields: [
      {
        name: 'startDateTime',
        title: 'Start Date & Time',
        type: 'datetime',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'endDateTime',
        title: 'End Date & Time',
        type: 'datetime',
      },
      {
        name: 'isRecurring',
        title: 'Is Recurring',
        type: 'boolean',
        initialValue: false,
      },
      {
        name: 'recurrencePattern',
        title: 'Recurrence Pattern',
        type: 'string',
        options: {
          list: [
            { title: 'Weekly', value: 'weekly' },
            { title: 'Bi-weekly', value: 'biweekly' },
            { title: 'Monthly', value: 'monthly' },
          ],
        },
        hidden: ({ parent }: any) => !parent?.isRecurring,
      },
    ],
  } 