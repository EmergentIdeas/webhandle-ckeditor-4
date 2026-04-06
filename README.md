# @webhandle/ckeditor-4

Adds the resource for the ckeditor 4 module and includes the css for the editor.


## Install 

```bash
npm install @webhandle/ckeditor-4
```

## Usage

```js
import setupCKEditor from "@webhandle/ckeditor-4/initialize-webhandle-component.mjs";

let ckManager = await setupCKEditor(webhandle)

```

## Usage

To get everything ready:

```html
	__externalResourceManager::@webhandle/ckeditor-4/addExternalResources__

```

or just to convert textarea elements marked with class `.ckeditor`

```html
__::@webhandle/ckeditor-4/convertTextareas__
```