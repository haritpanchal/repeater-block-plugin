/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { RichText, MediaUpload } from '@wordpress/block-editor';
import { Button, IconButton, CheckboxControl  } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	let attributes = props.attributes;
    let blockquote = attributes.blockquote;

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        } else {
            return Array.from(arr);
        }
    }
    
    let blockquoteList = blockquote.sort(function (a, b) {
        return a.index - b.index;
    }).map(function (item) {
        let [ isChecked, setChecked ] = useState( false );
        let new_val = 0
        item.in_rep_checkbox == 1 ? [ isChecked, setChecked ] = useState(true) : [ isChecked, setChecked ] = useState( false );
        return [
            <div className='block-element'>
                <div className='block-element-head'>
                    <span>Block# {Number(item.index) +1 }</span>
                    <IconButton icon='trash' className="block-element-add" onClick= {()=>{
                            var newItem = blockquote.filter(function (element) {
                                return element.index != item.index;
                            }).map(function (t) {
                                if (t.index > item.index) {
                                    t.index -= 1;
                                }
                                return t;
                            });
                            props.setAttributes({blockquote: newItem});
                        }} >Delete Block</IconButton> 
                </div>  
                <div>
                    <MediaUpload 
                        onSelect = { (media) => {
                                let newObject = Object.assign({}, item, {
                                    src: media.url,
                                    id: media.id,
                                    alt: media.alt
                                });
                                props.setAttributes({
                                    blockquote: [].concat(_toConsumableArray(blockquote.filter(function (element) {
                                        return element.index != item.index;
                                    })), [newObject])
                                });
                            }}
                        value= {item.id}
                        render =  {(obj) =>{
                            return !!item.src ? <div> 
                                <IconButton 
                                    icon = 'trash'
                                    className= 'block-element-add delete-element-block'
                                    onClick = {() => {
                                        let newObject = Object.assign({}, item, {
                                            src: null,
                                            id: null,
                                            alt: null
                                        });
                                        props.setAttributes({
                                            blockquote: [].concat(_toConsumableArray(blockquote.filter(function (element) {
                                                return element.index != item.index;
                                            })), [newObject])
                                        });
                                }}> Delete Media
                                </IconButton>
                                <img className='inner_image' src={item.src} onClick={obj.open} />  
                            </div> :
                            <div>
                                <IconButton 
                                    icon = 'format-image'
                                    className= 'block-element-add'
                                    onClick = {obj.open}> 
                                </IconButton>
                            </div>
                        }}
                        >
                    </MediaUpload>
                   
                    <RichText 
                        tagName = 'p'
                        placeholder = 'Enter Title'
                        value = { item.inner_title }
                        onChange = {(inner_title)=>{
                            let newObject = Object.assign({}, item, {
                                inner_title: inner_title
                            });
                            props.setAttributes({
                                blockquote: [].concat(_toConsumableArray(blockquote.filter(function (element) {
                                    return element.index != item.index;
                                })), [newObject])
                            });
                        }}
                    />
                    <RichText 
                        tagName = 'p'
                        placeholder = 'Enter Subtitle'
                        value = { item.inner_subtitle }
                        onChange = {(inner_subtitle)=>{
                            let newObject = Object.assign({}, item, {
                                inner_subtitle: inner_subtitle
                            });
                            props.setAttributes({
                                blockquote: [].concat(_toConsumableArray(blockquote.filter(function (element) {
                                    return element.index != item.index;
                                })), [newObject])
                            });
                        }}
                    />
                    <CheckboxControl
                        className= 'checkbox-in-block'
                        checked={ isChecked }
                        onClick={() => {
                            item.in_rep_checkbox ==1 ? new_val=0 : new_val=1;
                            let newObject = Object.assign({}, item, {
                                in_rep_checkbox: new_val
                            });
                            props.setAttributes({
                                blockquote: [].concat(_toConsumableArray(blockquote.filter(function (element) {
                                    return element.index != item.index;
                                })), [newObject])
                            });
                            
                            // props.setAttributes({in_rep_checkbox:new_val})
                        }}
                        onChange={setChecked}
                    />
                </div>
            </div>
        ];
    });
    let [ isChecked, setChecked ] = useState( false );
    let new_val = 0;
    attributes.inner_checkbox_ctrl == 1 ? [ isChecked, setChecked ] = useState(true) : [ isChecked, setChecked ] = useState( false );
    return[
        <div className="block-element-list">
            <div>
                <CheckboxControl
                    className= 'checkbox-block'
                    checked={ isChecked }
                    onClick={() => {
                        attributes.inner_checkbox_ctrl ==1 ? new_val=0 : new_val=1;
                        props.setAttributes({inner_checkbox_ctrl:new_val})
                    }}
                    onChange={setChecked}
                />
            </div>
            <div className='block-element-listing'>
             {blockquoteList}
             </div>
             <div className="block-add-btn">
                 <IconButton
                    icon ='plus'
                    className="block-element-add"
                    onClick = { ()=> {return props.setAttributes({
                        blockquote: [].concat(_toConsumableArray(attributes.blockquote), [{
                            index: attributes.blockquote.length,
                            inner_title:'',
                            inner_subtitle:'',
                            in_rep_checkbox: '',
                        }])
                    });}} >Add Block
                 </IconButton>
             </div>
        </div>
    ] 
}
