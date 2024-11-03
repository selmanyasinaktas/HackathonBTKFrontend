<template>
	<div>
		<div class="main-container">
			<div class="editor-container editor-container_classic-editor" ref="editorContainerElement">
				<div class="editor-container__editor ">
					<div ref="editorElement">
						<ckeditor v-if="isLayoutReady" :editor="editor" :config="config" v-model="innerValue" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	ClassicEditor, AccessibilityHelp, Alignment, Autoformat, AutoImage, Autosave, BlockQuote, Bold, CloudServices, Essentials, FindAndReplace, Heading, ImageBlock, ImageCaption, ImageInline, ImageInsertViaUrl, ImageResize, ImageStyle, ImageTextAlternative, ImageToolbar, ImageUpload, Indent, IndentBlock, Italic, List, ListProperties, Paragraph, PasteFromOffice, SelectAll, SpecialCharacters, SpecialCharactersArrows, SpecialCharactersCurrency, SpecialCharactersEssentials, SpecialCharactersLatin, SpecialCharactersMathematical, SpecialCharactersText, Subscript, Superscript, TextTransformation, TodoList, Underline, Undo
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import './CkEditor.css';

export default {
	name: 'CkEditor',
	props: {
		modelValue: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			isLayoutReady: false,
			config: null,
			editor: ClassicEditor,
			innerValue: this.modelValue 
		};
	},
	watch: {
		innerValue(newValue) {
			if (newValue !== this.modelValue) {
				this.$emit('update:modelValue', newValue);
			}
		},
		modelValue(newValue) {
			if (newValue !== this.innerValue) {
				this.innerValue = newValue;
			}
		}
	},
	mounted() {
		this.config = {
			toolbar: {
				items: [
					'undo', 'redo', '|', 'findAndReplace', '|', 'heading', '|', 'bold', 'italic', 'underline', 'subscript', 'superscript', '|', 'specialCharacters', 'blockQuote', '|', 'alignment', '|',
					'bulletedList', 'numberedList', 'outdent', 'indent'
				],
				shouldNotGroupWhenFull: false
			},
			plugins: [
				AccessibilityHelp, Alignment, Autoformat, AutoImage, Autosave, BlockQuote, Bold, CloudServices, Essentials, FindAndReplace, Heading, ImageBlock, ImageCaption, ImageInline, ImageInsertViaUrl,
				ImageResize, ImageStyle, ImageTextAlternative, ImageToolbar, ImageUpload, Indent, IndentBlock, Italic, List, ListProperties, Paragraph, PasteFromOffice, SelectAll, SpecialCharacters,
				SpecialCharactersArrows, SpecialCharactersCurrency, SpecialCharactersEssentials, SpecialCharactersLatin, SpecialCharactersMathematical, SpecialCharactersText, Subscript, Superscript, TextTransformation, TodoList, Underline, Undo
			],
			heading: {
				options: [
					{
						model: 'paragraph',
						title: 'Paragraph',
						class: 'ck-heading_paragraph'
					},
					{
						model: 'heading1',
						view: 'h1',
						title: 'Heading 1',
						class: 'ck-heading_heading1'
					},
					{
						model: 'heading2',
						view: 'h2',
						title: 'Heading 2',
						class: 'ck-heading_heading2'
					},
					{
						model: 'heading3',
						view: 'h3',
						title: 'Heading 3',
						class: 'ck-heading_heading3'
					},
					{
						model: 'heading4',
						view: 'h4',
						title: 'Heading 4',
						class: 'ck-heading_heading4'
					},
					{
						model: 'heading5',
						view: 'h5',
						title: 'Heading 5',
						class: 'ck-heading_heading5'
					},
					{
						model: 'heading6',
						view: 'h6',
						title: 'Heading 6',
						class: 'ck-heading_heading6'
					}
				]
			},
			image: {
				toolbar: [
					'toggleImageCaption', 'imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|', 'resizeImage'
				]
			},
			initialData: this.innerValue,
			list: {
				properties: {
					styles: true,
					startIndex: true,
					reversed: true
				}
			},
			placeholder: 'Type or paste your content here!'
		};

		this.isLayoutReady = true;
	}
};
</script>
