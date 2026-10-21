export const site = {
  name: 'Isaac Ndahura',
  navigation: [
    { label: 'Now', href: '/#now' },
    { label: 'Fragments', href: '/#story' },
    { label: 'The shelf', href: '/#work' },
    { label: 'Notes', href: '/#thoughts' },
    { label: 'Leave a note', href: '/#hello' },
  ],
  fragments: [
    { id: '01', label: 'A fragment', layout: 'large' },
    { id: '02', label: 'A fragment', layout: 'small' },
    { id: '03', label: 'A fragment', layout: 'small' },
    { id: '04', label: 'A fragment', layout: 'wide' },
  ],
  works: [
    { id: '01', slug: 'first-project', tone: 'green', title: 'First project', summary: 'A reserved place for the first project and the story behind it.', body: ['The project details have not been written yet.', 'This page is ready for the real context, process, images, and outcome when they are available.'] },
    { id: '02', slug: 'second-project', tone: 'rust', title: 'Second project', summary: 'A reserved place for another piece of work.', body: ['The project details have not been written yet.'] },
    { id: '03', slug: 'third-project', tone: 'ochre', title: 'Third project', summary: 'A reserved place for another piece of work.', body: ['The project details have not been written yet.'] },
    { id: '04', slug: 'fourth-project', tone: 'blue', title: 'Fourth project', summary: 'A reserved place for another piece of work.', body: ['The project details have not been written yet.'] },
    { id: '05', slug: 'fifth-project', tone: 'plum', title: 'Fifth project', summary: 'A reserved place for another piece of work.', body: ['The project details have not been written yet.'] },
    { id: '06', slug: 'sixth-project', tone: 'olive', title: 'Sixth project', summary: 'A reserved place for another piece of work.', body: ['The project details have not been written yet.'] },
    { id: '07', slug: 'seventh-project', tone: 'red', title: 'Seventh project', summary: 'A reserved place for another piece of work.', body: ['The project details have not been written yet.'] },
  ],
  notes: [
    { id: '01', slug: 'first-note', title: 'A note in progress', excerpt: 'A place for an idea that is still taking shape.', body: ['This note has not been written yet.', 'The page is intentionally quiet until there is something real to say.'] },
    { id: '02', slug: 'question-worth-keeping', title: 'A question worth keeping', excerpt: 'A place for a question worth returning to.', body: ['This note has not been written yet.'] },
    { id: '03', slug: 'something-i-noticed', title: 'Something I noticed', excerpt: 'A place for an observation that deserves more room.', body: ['This note has not been written yet.'] },
    { id: '04', slug: 'idea-to-return-to', title: 'An idea to return to', excerpt: 'A place for an unfinished idea.', body: ['This note has not been written yet.'] },
  ],
} as const;
