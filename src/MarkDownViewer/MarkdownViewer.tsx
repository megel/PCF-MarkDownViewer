import * as React from 'react';

const ReactMarkdown = require('react-markdown')
import MarkdownPreview from '@uiw/react-markdown-preview';

export interface IMarkdownViewerProps {
    content?:   string | undefined
    fontSize?:  string | undefined
    overflow?:  string | undefined
    maxHeight?: string | undefined
    maxWidth?:  string | undefined
}

export default class MarkdownViewer extends React.Component<IMarkdownViewerProps> {
    content?: string | undefined

    public render() {

        return (
            <div style={{
                overflow:  this.props.overflow  || "auto",
                textAlign: "left",
                fontSize:  this.props.fontSize  || "initial",
                height:    this.props.maxHeight || "initial",
                width:     this.props.maxWidth  || "initial",
                maxHeight: this.props.maxHeight || "none",
                maxWidth:  this.props.maxWidth  || "none"
                }}>
                <div id="mdViewer">
                    <div className="wmde-markdown-var"> </div>
                    <MarkdownPreview
                        source={this.props.content || ''}
                        rehypeRewrite={(node: any, index: any, parent: any) => {
                            if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
                                parent.children = parent.children.slice(1)
                            }
                        }}
                    />
                </div>
            </div>            
        );
    }
}
