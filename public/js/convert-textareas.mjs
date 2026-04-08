import config from "@webhandle/ckeditor-4/configuration"

let editorId = (new Date()).getTime()
let areas = document.querySelectorAll('textarea.html-editor')
let upgradedAttribute = 'data-ckeditor-upgraded'
for(const area of areas) {
	let upgraded = area.getAttribute(upgradedAttribute)
	if(!upgraded) {
		area.setAttribute(upgradedAttribute, 'true')
		let id = area.getAttribute('id')
		if(!id) {
			id = 'i' + editorId++
			area.setAttribute('id', id)
		}
		
		let editorOptions = {
			on: {
				change: function(event) {
					area.value = event.editor.getData()
				},
				blur: function( event ) {
					area.value = event.editor.getData()
				}
			}
			, customConfig: config.defaultTextareaConfigFile
		}
		CKEDITOR.replace(id, editorOptions) 
	}
}