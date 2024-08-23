import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MarkdownViewer, { IMarkdownViewerProps } from './MarkdownViewer';

export class MarkDownViewer implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private mContainer: HTMLDivElement;
	private props: IMarkdownViewerProps = {
		content:  "# This is a header\n\nAnd this is a paragraph\n\n* Item 1\n* Item 2\n\n**Code Example** (PowerShell):\n\n```PowerShell\nGet-ChildItem -Path \"C:\\Temp\" -Filter \"*.txt\" -Recurse\n```\n",
		fontSize: "Initial",
		overflow: "None"
	}

	private _outputs: IOutputs = {
    };
	notifyOutputChanged: () => void;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this.mContainer = container;
		context.mode.trackContainerResize(true);
		this.notifyOutputChanged = notifyOutputChanged;
		this.props.content  = context.parameters.Content.raw  || this.props.content;
		this.props.fontSize = context.parameters.FontSize.raw || this.props.fontSize;
		this.props.overflow = context.parameters.Overflow.raw || this.props.overflow;
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		this.props.content   = context.parameters.Content.raw  || this.props.content;
		this.props.fontSize  = context.parameters.FontSize.raw || this.props.fontSize;
		this.props.overflow  = context.parameters.Overflow.raw || this.props.overflow;
		try {
			this.props.maxHeight = context?.mode?.allocatedHeight > 0 ? context.mode.allocatedHeight + "px" : "400px";
			this.props.maxWidth  = context?.mode?.allocatedWidth  > 0 ? context.mode.allocatedWidth  + "px" : "800px";
		} catch (e) { this.props.content = `${e}` }

		ReactDOM.render(
			React.createElement(
				MarkdownViewer, this.props
			),
			this.mContainer
		);

		// Update the control's output property with the calculated dimensions
		const contentHeight = this.calculateContentHeight();
		const contentWidth = this.calculateContentWidth();
		const contentAsHtml = this.getHtmlContent();
		if (this._outputs.ContentHeight !== contentHeight || this._outputs.ContentWidth !== contentWidth) {
			this._outputs.ContentHeight = contentHeight;
			this._outputs.ContentWidth = contentWidth;
			this._outputs.ContentAsHtml = contentAsHtml;
			this.notifyOutputChanged();
		}
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		// Update the control's output property with the calculated dimensions
		this._outputs.ContentHeight = this.calculateContentHeight();
		this._outputs.ContentWidth = this.calculateContentWidth();
		return this._outputs;
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		ReactDOM.unmountComponentAtNode(this.mContainer);
	}

    private calculateContentHeight(): number {
        // Get the HTML content element within your control
        const contentElement = document.getElementById("mdViewer");
        // Calculate the height of the content element
        return contentElement?.clientHeight || 0;
    }

	private calculateContentWidth(): number {
        // Get the HTML content element within your control
        const contentElement = document.getElementById("mdViewer");    
        // Calculate the height of the content element
        return contentElement?.clientWidth || 0;
    }
	
	public getHtmlContent(): string {
		// Get the HTML content element within your control
		return  document.getElementById("mdMarkDown")?.innerHTML;
	}
}