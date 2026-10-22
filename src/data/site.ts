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
    { id: '01', kind: 'photo', title: 'A place worth remembering', label: 'Photo placeholder', date: 'Date to add', category: 'Place', description: 'A frame reserved for a real photograph from somewhere that mattered.', story: 'Replace this placeholder with the photograph, location, date, and the reason it belongs in the archive.', layout: 'photo', position: { x: 3, y: 12, width: 31, rotate: -5 } },
    { id: '02', kind: 'note', title: 'Words I kept', label: 'Handwritten note', date: 'Date to add', category: 'Note', description: 'A paper scrap waiting for the sentence that was worth saving.', story: 'Replace this placeholder with a scan or photograph of a real handwritten note and its context.', layout: 'note', position: { x: 27, y: 3, width: 24, rotate: 4 } },
    { id: '03', kind: 'sketch', title: 'An unfinished thought', label: 'Sketch placeholder', date: 'Date to add', category: 'Sketch', description: 'Loose lines for an idea that did not need to be polished yet.', story: 'Replace this placeholder with a real sketch, diagram, or page from the process behind an idea.', layout: 'sketch', position: { x: 48, y: 19, width: 28, rotate: -2 } },
    { id: '04', kind: 'journal', title: 'A page from then', label: 'Journal placeholder', date: 'Date to add', category: 'Journal', description: 'A quiet spread reserved for a real page and the moment around it.', story: 'Replace this placeholder with an excerpt you are comfortable sharing. Private writing should remain private.', layout: 'journal', position: { x: 69, y: 5, width: 27, rotate: 6 } },
    { id: '05', kind: 'screenshot', title: 'Something that shipped', label: 'Screen placeholder', date: 'Date to add', category: 'Making', description: 'A browser frame ready for a real screen from something you made.', story: 'Replace this placeholder with an authentic product screen and a concise note about what changed.', layout: 'screen', position: { x: 14, y: 53, width: 38, rotate: 2 } },
    { id: '06', kind: 'photo', title: 'People, without the caption yet', label: 'Photo placeholder', date: 'Date to add', category: 'People', description: 'A second photographic frame for a moment with people worth remembering.', story: 'Replace this placeholder with a real photograph and only the context you have permission to share.', layout: 'people', position: { x: 53, y: 55, width: 36, rotate: -4 } },
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
