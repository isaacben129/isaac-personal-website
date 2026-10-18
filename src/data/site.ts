/** Review-only content defaults. Replace personal content with Isaac-approved copy before launch. */
export const site = {
  name: 'Isaac Ndahura',
  navigation: [
    { label: 'Now', href: '#now' },
    { label: 'Fragments', href: '#story' },
    { label: 'The shelf', href: '#work' },
    { label: 'Notes', href: '#thoughts' },
    { label: 'Leave a note', href: '#hello' },
  ],
  fragments: [
    { id: '01', label: 'Fragment 01', layout: 'large' },
    { id: '02', label: 'Fragment 02', layout: 'small' },
    { id: '03', label: 'Fragment 03', layout: 'small' },
    { id: '04', label: 'Fragment 04', layout: 'wide' },
  ],
  works: [
    { id: '01', tone: 'green', title: 'Placeholder 01' },
    { id: '02', tone: 'rust', title: 'Placeholder 02' },
    { id: '03', tone: 'ochre', title: 'Placeholder 03' },
    { id: '04', tone: 'blue', title: 'Placeholder 04' },
    { id: '05', tone: 'plum', title: 'Placeholder 05' },
    { id: '06', tone: 'olive', title: 'Placeholder 06' },
    { id: '07', tone: 'red', title: 'Placeholder 07' },
  ],
  notes: [
    { id: '01', title: 'A note in progress', date: 'Review placeholder' },
    { id: '02', title: 'A question worth keeping', date: 'Review placeholder' },
    { id: '03', title: 'Something I noticed', date: 'Review placeholder' },
    { id: '04', title: 'An idea to return to', date: 'Review placeholder' },
  ],
} as const;
