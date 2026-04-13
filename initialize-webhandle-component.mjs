import createInitializeWebhandleComponent from "@webhandle/initialize-webhandle-component/create-initialize-webhandle-component.mjs"
import ComponentManager from "@webhandle/initialize-webhandle-component/component-manager.mjs"
import siteEditorBridgeSetup from "@webhandle/site-editor-bridge/initialize-webhandle-component.mjs"
import path from "node:path"

const initializeWebhandleComponent = createInitializeWebhandleComponent()

initializeWebhandleComponent.componentName = '@webhandle/ckeditor-4'
initializeWebhandleComponent.componentDir = import.meta.dirname
initializeWebhandleComponent.defaultConfig = {
	"publicFilesPrefix": '/' + initializeWebhandleComponent.componentName + "/files"
	, "alwaysProvideResources": false
	, "defaultTextareaConfigFile": "/@webhandle/ckeditor-4/files/conf/std-config.js"
	, "defaultInlineConfigFile": "/@webhandle/ckeditor-4/files/conf/std-config.js"
}
initializeWebhandleComponent.staticFilePath = 'public'
initializeWebhandleComponent.templatePath = 'views'


initializeWebhandleComponent.setup = async function (webhandle, config) {
	let manager = new ComponentManager()
	manager.config = config
	let siteEditorBridgeSetupManager = await siteEditorBridgeSetup(webhandle)

	let base = webhandle.projectRoot
	try {
		let info = webhandle.sinks.project.getFullFileInfo('node_modules/ckeditor4')
	}
	catch (e) {
		base = initializeWebhandleComponent.componentDir
	}
	
	webhandle.routers.primary.get('/@webhandle/ckeditor-4/handles/browse-type-all', (req, res, next) => {
		res.locals.imagesOnly = false
		res.render('@webhandle/ckeditor-4/browse-file')
	})
	
	webhandle.routers.primary.get('/@webhandle/ckeditor-4/handles/browse-type-image', (req, res, next) => {
		res.locals.imagesOnly = true
		res.render('@webhandle/ckeditor-4/browse-file')
	})
	
	webhandle.routers.primary.use('/@webhandle/ckeditor-4/handles/upload-file', (req, res, next) => {

		console.log(req)
		res.end()
	})
	
	
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

	manager.addExternalResources = function (externalResourceManager) {
		siteEditorBridgeSetupManager.addExternalResources(externalResourceManager)
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
		externalResourceManager.provideResource({
			mimeType: 'application/javascript'
			, url: '/@webhandle/ckeditor-4/files/js/edit-content-inline.mjs'
			, name: 'ckeditor4-edit-content-inline'
			, resourceType: 'module'
		})
		try {
			let resource = {
				mimeType: 'application/javascript'
				, name: '@webhandle/ckeditor-4/configuration'
				, resourceType: 'module'
				, cachable: webhandle.development ? false : true
				, data: {
					defaultTextareaConfigFile: config.defaultTextareaConfigFile
					, defaultInlineConfigFile: config.defaultInlineConfigFile
				}
			}
			externalResourceManager.provideResource(resource)

		}
		catch(e){
			console.log(e)
		}
		// externalResourceManager.includeResource({
		// 	mimeType: 'text/css'
		// 	, url: '/@webhandle/ckeditor-4/files/styles.css'
		// })
	}

	webhandle.addTemplate(initializeWebhandleComponent.componentName + '/addExternalResources', (data) => {
		let externalResourceManager = initializeWebhandleComponent.getExternalResourceManager(data)
		manager.addExternalResources(externalResourceManager)
		let resources = externalResourceManager.render()
		return resources
	})
	

	webhandle.addTemplate(initializeWebhandleComponent.componentName + '/convertTextareas', (data) => {
		let externalResourceManager = initializeWebhandleComponent.getExternalResourceManager(data)
		manager.addExternalResources(externalResourceManager)
		externalResourceManager.includeResource({
			mimeType: 'application/javascript'
			, url: '/@webhandle/ckeditor-4/files/js/convert-textareas.mjs'
			, resourceType: 'module'
		})
		let resources = externalResourceManager.render()
		return resources
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

	webhandle.addTemplateDir(
		path.join(initializeWebhandleComponent.componentDir, initializeWebhandleComponent.templatePath)
		, {
			immutable: !webhandle.development
		}
	)

	return manager
}

export default initializeWebhandleComponent
