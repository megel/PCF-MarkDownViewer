import * as React from 'react';

const ReactMarkdown = require('react-markdown')
import MarkdownPreview from '@uiw/react-markdown-preview';

const DEMO_CONTENT = "# This is a header\n\nAnd this is a paragraph\n\n* Item 1\n* Item 2\n\n**Code Example** (PowerShell):\n\n```PowerShell\nGet-ChildItem -Path \"C:\\Temp\" -Filter \"*.txt\" -Recurse\n```\n";

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
    demoMode?:  boolean | undefined
}

export default class MarkdownViewer extends React.Component<IMarkdownViewerProps> {
    content?: string | undefined

    public render() {
        const content = this.props.content ?? '';
        const hasContent = content.trim().length > 0;
        const showDemoContent = !hasContent && this.props.demoMode === true;
        const renderedContent = showDemoContent ? DEMO_CONTENT : content;

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
                    <div className="wmde-markdown-var" data-color-mode="light"> </div>
                    {hasContent || showDemoContent ? (
                        <MarkdownPreview
                            id="mdMarkDown"
                            source={renderedContent}
                            style={{
                                background: "transparent",
                                fontSize: this.props.fontSize || "initial",
                                color: "#24292f"
                            }}
                            wrapperElement={{
                                "data-color-mode": "light"
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
                    ) : (
                        <div style={{ color: '#7a7a7a', padding: '20px 16px' }}>
                            No markdown content provided
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
