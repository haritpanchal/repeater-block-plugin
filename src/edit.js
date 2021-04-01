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
import { RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { 
        IconButton, 
        CheckboxControl, 
        FormToggle, 
        DropdownMenu, 
        PanelBody, 
        PanelRow, 
        RadioControl, 
        RangeControl, 
        ColorPalette, 
        ColorPicker,    
        ExternalLink,
        Flex, 
        FlexItem, 
        FlexBlock,
        Icon
} from '@wordpress/components';

import { useState } from '@wordpress/element';
import {
    more,
    arrowLeft,
    arrowRight,
    arrowUp,
    arrowDown,
} from '@wordpress/icons';

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
                        style = {{color: attributes.font_color}}
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
                        style = {{color: attributes.font_color}}
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
                    
                </div>
            </div>
        ];
    });
    let [ isChecked, setChecked ] = useState( false );
    let new_val = 0;
    attributes.inner_checkbox_ctrl == 1 ? [ isChecked, setChecked ] = useState(true) : [ isChecked, setChecked ] = useState( false );
    const { show, option } = attributes;
    return(
    <>
        <InspectorControls>
                <PanelBody title='Extra class' initialOpen={true}>
                    <PanelRow>
                    Add another extra class?
                    <FormToggle
                        help={show ? 1 : 0}
                        checked={show}
                        onChange={() => props.setAttributes({ show: !show })}
                    />
                    </PanelRow>
                    <PanelRow>
                        Radiobox
                        <RadioControl
                            selected={ option }
                            options={ [
                                { label: 'Author', value: 'a' },
                                { label: 'Editor', value: 'b' },
                                { label: 'Viewer', value: 'c' },
                            ] }
                            onChange={ (option) => props.setAttributes({ option: option } ) }
                        />
                    </PanelRow>
                </PanelBody>
                <PanelBody>
                    <PanelRow>
                        <div>
                            <CheckboxControl
                                heading="Column Structure?"
                                className= 'checkbox-block'
                                checked={ isChecked }
                                onClick={() => {
                                    attributes.inner_checkbox_ctrl ==1 ? new_val=0 : new_val=1;
                                    props.setAttributes({inner_checkbox_ctrl:new_val})
                                }}
                                onChange={setChecked}
                            />
                        </div>
                    </PanelRow>
                    <RangeControl 
                        value= { attributes.column_count }
                        onChange = { (column_count) => props.setAttributes( { column_count } ) }
                        min = { 1 }
                        max = { 4 }
                        step = { 1 }
                        />
                </PanelBody>
                <PanelBody title="Dropdown">
                    <DropdownMenu
                        icon={ more }
                        label="Select a direction"
                        controls={ [
                            {
                                title: 'Up',
                                icon: arrowUp,
                                onClick: () => console.log( 'up' ),
                            },
                            {
                                title: 'Right',
                                icon: arrowRight,
                                onClick: () => console.log( 'right' ),
                            },
                            {
                                title: 'Down',
                                icon: arrowDown,
                                onClick: () => console.log( 'down' ),
                            },
                            {
                                title: 'Left',
                                icon: arrowLeft,
                                onClick: () => console.log( 'left' ),
                            },
                        ] }
                    />
                </PanelBody>
                <PanelBody title="Color Settings">
                    {/* <ColorPalette
                        value = {props.font_color}
                        onChange = { (font_color) => props.setAttributes({font_color}) }
                    /> */}
                    <ColorPicker
                        value = {attributes.font_color}
                        onChangeComplete = { (font_color) => props.setAttributes({font_color:font_color.hex}) }
                    />
                    {/* <ExternalLink href="https://wordpress.org">WordPress.org</ExternalLink> */}
                </PanelBody>
        </InspectorControls>


        <div className="block-element-list">
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
    </>
    )
}
