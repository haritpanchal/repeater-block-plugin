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
                />
                <RichText.Content 
                    tagName = 'p'
                    className="block_inner--subtitle"
                    value = {item.inner_subtitle}
                />
               <input type='hidden' className='in_rep_checkbox_ctrl' data-val={item.in_rep_checkbox} value='here' />
            </div> 
        });

    return <section className='rep-block' data-length={blockquote.length}>
        <div className="container">
            {blockquoteList}
            <input type='hidden' className='inner_checkbox_ctrl' data-val={attributes.inner_checkbox_ctrl} value='here' />
        </div>
    </section>
}
