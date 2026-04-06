import setupCKEditor from "./initialize-webhandle-component.mjs";
export default async function test(webhandle) {
	webhandle.development = true

	let ckManager = await setupCKEditor(webhandle)

	// webhandle.routers.primary.use((req, res, next) => {
	// 	ckManager.addExternalResources(res.locals.externalResourceManager)
	// 	next()
	// })
}