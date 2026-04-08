# @webhandle/ckeditor-4

Adds the resource for the ckeditor 4 module and includes the css for the editor.


## Install 

```bash
npm install @webhandle/ckeditor-4
```

## Initialization

```js
import setupCKEditor from "@webhandle/ckeditor-4/initialize-webhandle-component.mjs";
let ckManager = await setupCKEditor(webhandle)

```

## Configuration
```json
{
	"@webhandle/ckeditor-4": {
		"publicFilesPrefix": "/@webhandle/ckeditor-4/files"
		, "alwaysProvideResources": false
		, "defaultTextareaConfigFile": "/@webhandle/ckeditor-4/files/conf/std-config.js"
		, "defaultInlineConfigFile": "/@webhandle/ckeditor-4/files/conf/std-config.js"
	}
}

```

## Usage

To get everything ready:

```html
	__externalResourceManager::@webhandle/ckeditor-4/addExternalResources__

```

or just to convert textarea elements marked with class `.html-editor`

```html
__::@webhandle/ckeditor-4/convertTextareas__
```

To convert inline text with the `.edit-content-inline` class:

```js
import {convertEditContentInline} from "ckeditor4-edit-content-inline"
convertEditContentInline()

```
