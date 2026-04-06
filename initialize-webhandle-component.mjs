import createInitializeWebhandleComponent from "@webhandle/initialize-webhandle-component/create-initialize-webhandle-component.mjs"
import ComponentManager from "@webhandle/initialize-webhandle-component/component-manager.mjs"
import path from "node:path"

const initializeWebhandleComponent = createInitializeWebhandleComponent()

initializeWebhandleComponent.componentName = '@webhandle/ckeditor-4'
initializeWebhandleComponent.componentDir = import.meta.dirname
initializeWebhandleComponent.defaultConfig = {
	"publicFilesPrefix": '/' + initializeWebhandleComponent.componentName + "/files"
	, "alwaysProvideResources": false
}
initializeWebhandleComponent.staticFilePath = 'public'
initializeWebhandleComponent.templatePath = 'views'


initializeWebhandleComponent.setup = async function(webhandle, config) {
	let manager = new ComponentManager()
	manager.config = config
	
	let base = webhandle.projectRoot
	try {
		let info = webhandle.sinks.project.getFullFileInfo('node_modules/ckeditor4')
	}
	catch(e) {
		base = initializeWebhandleComponent.componentDir
	}
	manager.staticPaths.push(
		webhandle.addStaticDir(
			path.join(base, 'node_modules/ckeditor4')
		, {
			urlPrefix: '/@webhandle/ckeditor-4/ck-files'
			, fixedSetOfFiles: true
		})
	)
	manager.staticPaths.push(
		webhandle.addStaticDir(
			path.join(base, 'node_modules/@webhandle/ckeditor-multi-widget-panel/public/ckeditor')
		, {
			urlPrefix: '/@webhandle/ckeditor-4/ck-files'
			, fixedSetOfFiles: true
		})
	)
	manager.staticPaths.push(
		webhandle.addStaticDir(
			path.join(base, 'node_modules/@dankolz/picture-ckeditor-plugin/public/ckeditor')
		, {
			urlPrefix: '/@webhandle/ckeditor-4/ck-files'
			, fixedSetOfFiles: true
		})
	)
	manager.staticPaths.push(
		webhandle.addStaticDir(
			path.join(base, 'node_modules/@dankolz/template-ckeditor-plugin/public/ckeditor')
		, {
			urlPrefix: '/@webhandle/ckeditor-4/ck-files'
			, fixedSetOfFiles: true
		})
	)

	manager.staticPaths.push(
		webhandle.addStaticDir(
			path.join(initializeWebhandleComponent.componentDir, 'public')
		, {
			urlPrefix: '/@webhandle/ckeditor-4/files'
			, fixedSetOfFiles: true
		})
	)

	manager.addExternalResources = function(externalResourceManager) {
		externalResourceManager.provideResource({
			mimeType: 'application/javascript'
			, url: '/@webhandle/ckeditor-4/ck-files/ckeditor.js'
			, name: 'ckeditor4'
			, resourceType: 'module'
		})
		externalResourceManager.includeResource({
			mimeType: 'application/javascript'
			, url: '/@webhandle/ckeditor-4/files/js/variables.mjs'
			, resourceType: 'module'
		})
		externalResourceManager.includeResource({
			mimeType: 'application/javascript'
			, url: '/@webhandle/ckeditor-4/files/js/load.mjs'
			, resourceType: 'module'
		})
		// externalResourceManager.includeResource({
		// 	mimeType: 'text/css'
		// 	, url: '/@webhandle/ckeditor-4/files/styles.css'
		// })
	}

	webhandle.addTemplate(initializeWebhandleComponent.componentName + '/addExternalResources', (data) => {
		try {
			let externalResourceManager = initializeWebhandleComponent.getExternalResourceManager(data)
			manager.addExternalResources(externalResourceManager)
			let resources =  externalResourceManager.render()
			return resources
		}
		catch(e) {
			console.log(e)
		}
		return ""
	})
	
	// webhandle.routers.preDynamic.use((req, res, next) => {
	// 	if(config.alwaysProvideResources || !initializeWebhandleComponent.supportsMultipleImportMaps(req)) {
	// 		manager.addExternalResources(res.locals.externalResourceManager)
	// 	}
	// 	next()
	// })
	
	// manager.addExternalResources = (externalResourceManager, options) => {
	// 	externalResourceManager.includeResource({
	// 		mimeType: 'text/css'
	// 		, url: config.publicFilesPrefix + '/css/styles.css'
	// 	})

	// 	externalResourceManager.provideResource({
	// 		url: config.publicFilesPrefix + '/js/functionality.mjs'
	// 		, mimeType: 'application/javascript'
	// 		, resourceType: 'module'
	// 		, name: initializeWebhandleComponent.componentName
	// 	})
	// }

	// webhandle.addTemplate(initializeWebhandleComponent.componentName + '/addExternalResources', (data) => {
	// 	let externalResourceManager = initializeWebhandleComponent.getExternalResourceManager(data)
	// 	manager.addExternalResources(externalResourceManager)
	// })

	// webhandle.addTemplate(initializeWebhandleComponent.componentName + '/doTheThing', (data) => {
	// 	try {
	// 		let externalResourceManager = initializeWebhandleComponent.getExternalResourceManager(data)
	// 		manager.addExternalResources(externalResourceManager)

	// 		let resources = externalResourceManager.render()
	// 		let action = `
	// <script type="module">
	// 		import { component } from "${initializeWebhandleComponent.componentName}"
	// 		component()
	// </script>`

	// 		return resources + action
	// 	}
	// 	catch(e) {
	// 		console.error(e)
	// 	}
	// })

	// // Allow access to the component and style code
	// let filePath = path.join(initializeWebhandleComponent.componentDir, initializeWebhandleComponent.staticFilePath)
	// manager.staticPaths.push(
	// 	webhandle.addStaticDir(
	// 		filePath,
	// 		{
	// 			urlPrefix: config.publicFilesPrefix
	// 			, fixedSetOfFiles: true
	// 		}
	// 	)
	// )
	
	// webhandle.addTemplateDir(
	// 	path.join(initializeWebhandleComponent.componentDir, initializeWebhandleComponent.templatePath)
	// 	, {
	// 		immutable: true
	// 	}
	// )

	return manager
}

export default initializeWebhandleComponent
