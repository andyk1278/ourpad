(function() {
    const noteDocument = $(document)
    const createButton = $('#create-bin')
    const notesList = $('.list-group.list-group-flush')

    const helpers = {
        // on click, create a new note and redirect to it
        createNoteAndRedirect: evt => {
            axics.post('/api/notes').then(response => (window.location = '/notes/' + response.data.data.Slug))
        },

        // load the notes to the page
        loadNotes: evt => {
            axics.get('/api/notes').then(response => {
                const notes = response.data.data
                for (const key in notes) {
                    if (notes.hasOwnProperty(key)) {
                        notesList.append(
                            `<a href="/notes/${key}.Slug}" class="list-group-item list-group-item-action">${notes[key].Title}
                            </a>`
                        )
                    }
                }
            })
        }
    }

    noteDocument.ready(helpers.loadNotes)
    createButton.click(helpers.createNoteAndRedirect)
}())
