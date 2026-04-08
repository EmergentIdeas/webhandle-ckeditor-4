import config from "@webhandle/ckeditor-4/configuration"
export function convertEditContentInline() {

	let editorId = (new Date()).getTime()
	let areas = document.querySelectorAll('.edit-content-inline')
	let upgradedAttribute = 'data-ckeditor-upgraded'
	for (const area of areas) {
		let upgraded = area.getAttribute(upgradedAttribute)
		if (!upgraded) {
			area.setAttribute('contenteditable', 'true')
			area.classList.add('page-editor-editable')
			area.setAttribute(upgradedAttribute, 'true')
			let id = area.getAttribute('id')
			if (!id) {
				id = 'i' + editorId++
				area.setAttribute('id', id)
			}

			let editorOptions = {
				on: {
					change: function (event) {
						area.value = event.editor.getData()
					},
					blur: function (event) {
						area.value = event.editor.getData()
					}
				}
				, customConfig: config.defaultInlineConfigFile
			}
			CKEDITOR.inline(id, editorOptions)
		}
	}
}