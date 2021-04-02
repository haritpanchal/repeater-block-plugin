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
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBmlockProps
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */

export default function save(props) {
    let attributes = props.attributes;
    let blockquote = attributes.blockquote;
    let blockquoteList = blockquote.map(function (item) {
            return <div className='block_item'>
                <RichText.Content
                    tagName= 'img'
                    alt= {item.alt}
                    src= {item.src}
                    data-index = {item.index}
                    data-id = {item.id}
                />
                <RichText.Content 
                    tagName = 'h2'
                    className="block_inner--title"
                    value = {item.inner_title}
                    style = {{color:attributes.font_color, fontSize: attributes.font_size_title}}
                />
                <RichText.Content 
                    tagName = 'p'
                    className="block_inner--subtitle"
                    value = {item.inner_subtitle}
                    style = {{color:attributes.font_color, fontSize: attributes.font_size_sub_title, lineHeight:attributes.line_height}}
                />
            </div> 
        });
    
    let next = '';
    let new_class = '';
    const { show, inner_checkbox_ctrl, option, column_count } = attributes;
    if(inner_checkbox_ctrl == 1){
        new_class = 'column_struct ' ;
    }
    if(show){
        next = ' next';
    }
    return <section className='rep-block' data-length={blockquote.length}>
        <div className="container" >
            <div className={new_class + 'col-' + column_count}>
                {blockquoteList}
                <input type='hidden' className='inner_checkbox_ctrl' data-val={inner_checkbox_ctrl} value='here' />
                <input type='hidden' className='inner_toggle_ctrl' data-toggle={show} value='here' />
                <input type='hidden' className='inner_radio_ctrl' data-radio={option} value='here' />
                <input type='hidden' className='column_count' value= {column_count} />
            </div>
        </div>
    </section>
}
