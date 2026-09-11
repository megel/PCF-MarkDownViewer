import * as React from 'react';

const ReactMarkdown = require('react-markdown')
import MarkdownPreview from '@uiw/react-markdown-preview';

export interface IMarkdownViewerProps {
    content?:   string | undefined
    fontSize?:  string | undefined
    overflow?:  string | undefined
    maxHeight?: string | undefined
    maxWidth?:  string | undefined
    label?:     string | undefined
    visible?:   boolean | undefined
    disabled?:  boolean | undefined
    tabIndex?:  number | undefined
    tooltip?:   string | undefined
}

export default class MarkdownViewer extends React.Component<IMarkdownViewerProps> {
    content?: string | undefined

    public render() {

        if (this.props.visible === false) {
            return null;
        }
        return (
            <div
                style={{
                    overflow:  this.props.overflow  || "auto",
                    textAlign: "left",
                    fontSize:  this.props.fontSize  || "initial",
                    height:    this.props.maxHeight || "initial",
                    width:     this.props.maxWidth  || "initial",
                    maxHeight: this.props.maxHeight || "none",
                    maxWidth:  this.props.maxWidth  || "none",
                    userSelect: "text",
                    pointerEvents: this.props.disabled ? "none" : "auto"
                }}
                tabIndex={this.props.disabled ? -1 : this.props.tabIndex}
                aria-label={this.props.label}
                aria-disabled={this.props.disabled}
                title={this.props.tooltip}
            >
                {this.props.label && (
                    <label style={{ fontWeight: 'bold', marginBottom: 4, display: 'block' }}>{this.props.label}</label>
                )}
                <div id="mdViewer">
                    <div className="wmde-markdown-var"> </div>
                    <MarkdownPreview
                        id="mdMarkDown"
                        source={this.props.content || ''}
                        style={{
                            background: "transparent"
                        }}
                        rehypeRewrite={(node: any, index: any, parent: any) => {
                            if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
                                parent.children = parent.children.slice(1)
                            }
                            if (this.props.disabled && node.tagName === "a") {
                                node.properties = {
                                    ...node.properties,
                                    href: undefined,
                                    tabIndex: -1,
                                    "aria-disabled": true
                                }
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
}
