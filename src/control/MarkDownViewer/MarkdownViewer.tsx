import * as React from 'react';

const ReactMarkdown = require('react-markdown')

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
                <ReactMarkdown source={this.props.content || ''} />
            </div>
        );
    }
}
