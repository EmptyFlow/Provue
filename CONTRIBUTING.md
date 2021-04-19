## Contributing to Provue CoreComponents

First off, thanks for taking the time to contribute! 🎉🎉

The following is a set of guidelines for contributing to Provue CoreComponents, which are hosted in the P-RCollaboration on GitHub.  
These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.  

### Vue Component guidelines

#### File name
All core components contains from two components - state and view.  
The file name for the component in PascalCase and same as in **name** property in the script section.  
  
File name must be meet follow template - \<**Name**\>\<**Part**\>.vue  
**Name** - component name in pascal case (examples - DragSource, RadioButton e.g.).  
**Part** - what a part component - State or View.  
Full example - **DragSourceState.vue** and **DragSourceView.vue**.

#### Section order
Order from top to bottom: template, script, style.
I don't recommend using multiple style sections, although this is supported.  
#### File size
In our opinion, the maximum number of lines that can be in the component is 500. After it will be better split component into two or more components.

### Template guidelines
#### Tag direction
We stick to a style in which tags, attributes, and content are stacked vertically (vertical style). This arrangement allows you to read the markup from top to bottom.  
As example:
```html
<a
  href="#"
  target="_blank">
  Link
</a>
<!-- Content and attributes alignments in one vertical line -->
```
### Script guidelines
#### Export component
You can use modern es6 export for component in script section:
```js
export default {
    name: `TestState`,
}
```
But you need aware that it syntax sugar. It will be replaced on:
```js
module.exports = {
    name: `TestState`,
}
```
