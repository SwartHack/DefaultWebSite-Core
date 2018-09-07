/**
 * The Print widget connects your application with a [printing service](https://server.arcgis.com/en/portal/latest/administer/windows/configure-the-portal-to-print-maps.htm) to allow the map to be printed.
 * It takes advantage of server-side, high-quality, full cartographic print functionality using the ExportWebMap service of ArcGIS,
 * which can be configured with custom layout templates. One is provided that shows the map only, while another provides a layout with legend, etc.
 * The Print widget works with the {@link module:esri/tasks/PrintTask} which generates a printer-ready version of the map.
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * There is no current support for printing {@link module:esri/views/SceneView SceneViews}.
 * :::
 *
 * @module esri/widgets/Print
 * @since 4.2
 *
 * @see [Print.tsx (widget view)]({{ JSAPI_BOWER_URL }}/widgets/Print.tsx)
 * @see [Print.scss]({{ JSAPI_BOWER_URL }}/themes/base/widgets/_Print.scss)
 * @see [Sample - Print widget](../sample-code/widgets-print/index.html)
 * @see module:esri/widgets/Print/PrintViewModel
 * @see [Printing in web applications](https://server.arcgis.com/en/server/latest/create-web-apps/windows/printing-in-web-applications.htm)
 * @see [Configure the portal to print maps](https://server.arcgis.com/en/portal/latest/administer/windows/configure-the-portal-to-print-maps.htm)
 * @see [Export Web Map Task (Geoprocessing service) [REST doc]](http://resources.arcgis.com/en/help/rest/apiref/gp_exportwebmaptask.html)
 *
 * @example
 * var print = new Print({
 *   view: view
 * });
 * // Adds widget below other elements in the top left corner of the view
 * view.ui.add(print, {
 *   position: "top-left"
 * });
 */

/// <amd-dependency path="../core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="../core/tsSupport/decorateHelper" name="__decorate" />

import { aliasOf, subclass, declared, property } from "../core/accessorSupport/decorators";

import View = require("../views/View");
import PrintViewModel = require("./Print/PrintViewModel");
import PrintTemplate = require("../tasks/support/PrintTemplate");
import Collection = require("../core/Collection");
import EsriError = require("../core/Error");
import Logger = require("../core/Logger");
import watchUtils = require("../core/watchUtils");
import Widget = require("./Widget");
import FileLink = require("./Print/FileLink");
import TemplateOptions = require("./Print/TemplateOptions");
import urlUtils = require("../core/urlUtils");

import { accessibleHandler, join, renderable, storeNode, tsx } from "./support/widget";

import * as i18n from "dojo/i18n!./Print/nls/Print";

interface TemplateInfo {
  choiceList: string[];
  defaultValue: string;
}

interface TemplatesInfo {
  format: TemplateInfo;
  layout: TemplateInfo;
}

const CSS = {
  // base
  base: "esri-print esri-widget esri-widget--panel",
  // print-widget
  headerTitle: "esri-print__header-title",
  inputText: "esri-print__input-text",
  layoutTabList: "esri-print__layout-tab-list",
  layoutTab: "esri-print__layout-tab",
  layoutSection: "esri-print__layout-section",
  mapOnlySection: "esri-print__map-only-section",
  scaleInput: "esri-print__scale-input",
  // buttons
  advancedOptionsButton: "esri-print__advanced-options-button",
  advancedOptionsButtonContainer: "esri-print__advanced-options-button-container",
  advancedOptionsButtonTitle: "esri-print__advanced-options-button-title",
  advancedOptionsButtonIconOpened: "esri-print__advanced-options-button-icon--opened",
  advancedOptionsButtonIconClosed: "esri-print__advanced-options-button-icon--closed",
  advancedOptionsButtonIconClosed_RTL: "esri-print__advanced-options-button-icon--closed-rtl",
  refreshButton: "esri-print__refresh-button",
  swapButton: "esri-print__swap-button",
  linkButton: "esri-print__link-button",
  printButton: "esri-print__export-button",
  // containers
  formSectionContainer: "esri-print__form-section-container",
  advancedOptionsSection: "esri-print__advanced-options-section",
  advancedOptionsContainer: "esri-print__advanced-options-container",
  authorInfoContainer: "esri-print__author-info-container",
  copyrightInfoContainer: "esri-print__copyright-info-container",
  exportedFilesContainer: "esri-print__export-panel-container",
  exportedFilesTitle: "esri-print__export-title",
  exportedFile: "esri-print__exported-file",
  exportedFileLink: "esri-print__exported-file-link",
  exportedFileLinkTitle: "esri-print__exported-file-link-title",
  heightContainer: "esri-print__height-container",
  legendInfoContainer: "esri-print__legend-info-container",
  printWidgetContainer: "esri-print__container",
  panelContainer: "esri-print__panel-container",
  scaleInfoContainer: "esri-print__scale-info-container",
  scaleInputContainer: "esri-print__scale-input-container",
  sizeContainer: "esri-print__size-container",
  widthContainer: "esri-print__width-container",
  // common
  button: "esri-widget-button",
  select: "esri-select",
  disabled: "esri-disabled",
  panelError: "esri-print__panel--error",
  exportedFileError: "esri-print__exported-file--error",
  hide: "esri-hidden",
  rotate: "esri-rotating",
  // icons
  iconCheckMark: "esri-icon-check-mark",
  iconDownload: "esri-icon-download",
  iconError: "esri-icon-error",
  iconPrinter: "esri-icon-printer",
  iconRightTriangleArrow: "esri-icon-right-triangle-arrow",
  iconLeftTriangleArrow: "esri-icon-left-triangle-arrow",
  iconDownArrow: "esri-icon-down-arrow",
  iconRefresh: "esri-icon-refresh",
  iconSpinner: "esri-icon-loading-indicator",
  iconSwap: "esri-icon-swap",
  iconLinked: "esri-icon-link-horizontal",
  iconUnlinked: "esri-icon-unlocked-link-horizontal"
};

const declaredClass = "esri.widgets.Print";
const logger = Logger.getLogger(declaredClass);
const invalidLayoutWarningMessage = "User sets an invalid layout, resetting it to the default valid one...";
const invalidFormatWarningMessage = "User sets an invalid format, resetting it to the default valid one...";

@subclass("esri.widgets.Print")
class Print extends declared(Widget) {

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * @extends module:esri/widgets/Widget
   * @constructor
   * @alias module:esri/widgets/Print
   * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
   *                                that may be passed into the constructor.
   *
   * @example
   * // typical usage
   * var print = new Print({
   *   view: view,
   *   printServiceUrl: "https://www.example.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
   * });
   */
  constructor(params?: any) {
    super();
  }

  postInitialize() {
    const {
      format,
      height,
      layout,
      scale,
      scaleEnabled,
      width
    } = this.templateOptions;

    watchUtils.init(this, "viewModel.templatesInfo", (templatesInfo: TemplatesInfo) => {
      if (templatesInfo) {
        this._templatesInfo = templatesInfo;



        const isValidLayout = layout === templatesInfo.layout.defaultValue || (layout && layout.toUpperCase() === "MAP_ONLY") || (templatesInfo.layout.choiceList && templatesInfo.layout.choiceList.indexOf(layout) > -1);
        const isValidFormat = format === templatesInfo.format.defaultValue || (templatesInfo.format.choiceList && templatesInfo.format.choiceList.indexOf(format) > -1);

        if (!isValidLayout) {
          if (layout) {
            logger.warn(invalidLayoutWarningMessage);
          }

          this.templateOptions.layout = this._templatesInfo.layout.defaultValue;
        }

        if (!isValidFormat) {
          if (format) {
            logger.warn(invalidFormatWarningMessage);
          }

          this.templateOptions.format = this._templatesInfo.format.defaultValue;
        }

        if (layout && layout.toUpperCase() === "MAP_ONLY") {
          this._layoutTabSelected = false;
        }
      }
    });

    watchUtils.init(this, "templateOptions.format", (newValue: string) => {
      if (this._templatesInfo && newValue) {
        let isValidFormat = false;
        this._templatesInfo.format.choiceList && this._templatesInfo.format.choiceList.forEach(option => {
          if (option.toUpperCase() === newValue.toUpperCase()) {
            this.templateOptions.format = option;
            isValidFormat = true;
          }
        });

        if (!isValidFormat) {
          this.templateOptions.format = this._templatesInfo.format.defaultValue;
          logger.warn(invalidFormatWarningMessage);
        }

        this.scheduleRender();
      }
    });

    watchUtils.init(this, "templateOptions.layout", (newValue: string) => {
      if (this._templatesInfo && newValue) {
        this._layoutTabSelected =  newValue.toUpperCase() !== "MAP_ONLY";
        let isValidLayout = false || !this._layoutTabSelected;

        if (!isValidLayout) {
          this._templatesInfo.layout.choiceList && this._templatesInfo.layout.choiceList.forEach(option => {
            if (option.toUpperCase() === newValue.toUpperCase()) {
              this.templateOptions.layout = option;
              isValidLayout = true;
            }
          });
        }

        if (!isValidLayout) {
          this.templateOptions.layout = this._templatesInfo.layout.defaultValue;
          logger.warn(invalidLayoutWarningMessage);
        }

        this.scheduleRender();
      }
    });

    watchUtils.init(this, "viewModel.view.scale", (newValue: number) => {
      if (!scaleEnabled || !scale) {
        this.templateOptions.scale = newValue;
      }
    });

    this.templateOptions.width = width || 800;
    this.templateOptions.height = height || 1100;
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  private _exportedFileNameMap: HashMap<number> = {};

  private _layoutTabSelected = true;

  private _advancedOptionsVisible = false;

  private _pendingExportScroll = false;

  private _rootNode: HTMLElement = null;

  private _templatesInfo: TemplatesInfo = null;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  exportedLinks
  //----------------------------------

  @aliasOf("viewModel.exportedLinks")
  @renderable()
  exportedLinks: Collection<FileLink>;

  //----------------------------------
  //  templateOptions
  //----------------------------------

  /**
   * Defines the layout template options used by the {@link module:esri/widgets/Print|Print} widget to generate the print page.
   *
   * @name templateOptions
   * @since 4.6
   * @instance
   *
   * @example
   * templateOptions: {
   *   title: "My Print",
   *   author: "Sam",
   *   copyright: "My Company",
   *   legendEnabled: false
   * }
   *
   * @type {module:esri/widgets/Print/TemplateOptions}
   * @autocast
   */
  @renderable()
  @property({
    type: TemplateOptions
  })
  templateOptions: TemplateOptions = new TemplateOptions();

  //----------------------------------
  //  error
  //----------------------------------

  /**
   * The Error object returned if an error occurred while fetching information from service
   * @type {EsriError}
   * @ignore
   */
  @aliasOf("viewModel.error")
  error: EsriError;

  //----------------------------------
  //  printServiceUrl
  //----------------------------------

  /**
   * The URL of the REST endpoint of the Export Web Map Task.
   *
   * @name printServiceUrl
   * @instance
   * @type {string}
   */

  @aliasOf("viewModel.printServiceUrl")
  printServiceUrl: string = null;

  //----------------------------------
  //  view
  //----------------------------------

  /**
   * A reference to the {@link module:esri/views/MapView}. Set this to link
   * the widget to a specific view.
   *
   * @todo REMOVE UNTIL SCENEVIEW SUPPORTS PRINTING or {@link module:esri/views/SceneView}
   *
   * @name view
   * @instance
   *
   * @type {module:esri/views/MapView}
   */
  @aliasOf("viewModel.view")
  @renderable()
  view: View = null;

  //----------------------------------
  //  viewModel
  //----------------------------------

  /**
   * The view model for this widget. This is a class that contains all the logic
   * (properties and methods) that controls this widget's behavior. See the
   * {@link module:esri/widgets/Print/PrintViewModel} class to access
   * all properties and methods on the widget.
   *
   * @name viewModel
   * @instance
   * @type {module:esri/widgets/Print/PrintViewModel}
   * @autocast
   */
  @property({
    type: PrintViewModel
  })
  @renderable(["viewModel.templatesInfo", "viewModel.state"])
  viewModel: PrintViewModel = new PrintViewModel();

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    const {
      attributionEnabled,
      author,
      copyright,
      format,
      height,
      layout,
      legendEnabled,
      title,
      scaleEnabled,
      scale,
      width
    } = this.templateOptions;

    const titleSection = (
      <div class={CSS.formSectionContainer}>
        <label>{this._layoutTabSelected ? i18n.title : i18n.fileName}
        <input type="text"
               tabIndex={0}
               placeholder={this._layoutTabSelected ? i18n.titlePlaceHolder : i18n.fileNamePlaceHolder}
               class={CSS.inputText}
               value={title}
               data-input-name="title"
               oninput={this._updateInputValue}
               bind={this} />
        </label>
      </div>
    );

    const fileFormatMenuItems = this.get<string[]>("_templatesInfo.format.choiceList") || [];
    const fileFormatOptions = fileFormatMenuItems.length > 0 ? (
      fileFormatMenuItems.map(fileFormatMenuItem => {
        const selected = fileFormatMenuItem === format;

        return <option key={fileFormatMenuItem} selected={selected}>{fileFormatMenuItem}</option>;
      })
    ) : (
      <option key="format-default-option">{i18n.formatDefaultOption}</option>
    );

    const fileFormatSection = (
      <div class={CSS.formSectionContainer}>
        <label>
          {i18n.fileFormatTitle}
          <select class={CSS.select} onchange={this._updateFromOption} data-target-property="format" bind={this}>
            {fileFormatOptions}
          </select>
        </label>
      </div>
    );

    const layoutMenuItems = this.get<string[]>("_templatesInfo.layout.choiceList") || [];
    const layoutOptions = layoutMenuItems.length > 0 ? (
      layoutMenuItems.map(layoutMenuItem => {
        const selected = layoutMenuItem === layout;

        return <option key={layoutMenuItem} bind={this} selected={selected}>{layoutMenuItem}</option>;
      })
    ) : (
      <option key="layout-default-option">{i18n.layoutDefaultOption}</option>
    );

    const pageSetupSection = (
      <div class={CSS.formSectionContainer}>
        <label>
          {i18n.layoutTitle}
          <select class={CSS.select} onchange={this._updateFromOption} data-target-property="layout" bind={this}>
            {layoutOptions}
          </select>
        </label>

      </div>
    );

    const advancedSection = this._advancedOptionsVisible ? (
      <div aria-labelledby={`${this.id}__advancedOptions`} class={CSS.advancedOptionsContainer}>
        <div class={join(CSS.scaleInfoContainer, CSS.formSectionContainer)}>
          <label>
            <input data-option-name="scaleEnabled"
                   checked={scaleEnabled}
                   type="checkbox"
                   tabIndex={0}
                   onchange={this._toggleInputValue}
                   bind={this} />
            {i18n.scale}
          </label>
          <div class={CSS.scaleInputContainer}>
            <input aria-label={i18n.scaleLabel}
                   aria-valuenow={`${scale}`}
                   role="spinbutton"
                   type="number"
                   class={join(CSS.inputText, CSS.scaleInput)}
                   tabIndex={0}
                   data-input-name="scale"
                   oninput={this._updateInputValue}
                   disabled={!scaleEnabled}
                   value={`${scale}`}
                   bind={this} />
            <button role="button"
                    aria-label={i18n.reset}
                    class={join(CSS.button, CSS.refreshButton, CSS.iconRefresh)}
                    tabIndex={0}
                    onclick={this._resetToCurrentScale}
                    bind={this}>
            </button>
          </div>
        </div>
        <div class={join(CSS.authorInfoContainer, CSS.formSectionContainer)}>
          <label>
            {i18n.author}
            <input type="text"
                   value={author}
                   class={CSS.inputText}
                   tabIndex={0}
                   data-input-name="author"
                   oninput={this._updateInputValue}
                   bind={this} />
          </label>
        </div>
        <div class={join(CSS.copyrightInfoContainer, CSS.formSectionContainer)}>
          <label>
            {i18n.copyright}
            <input type="text"
                   class={CSS.inputText}
                   tabIndex={0}
                   value={copyright}
                   data-input-value="copyright"
                   oninput={this._updateInputValue}
                   bind={this} />
          </label>
        </div>
        <div class={join(CSS.legendInfoContainer, CSS.formSectionContainer)}>
          <label>
          <input type="checkbox"
                 data-option-name="legendEnabled"
                 tabIndex={0}
                 checked={legendEnabled}
                 onchange={this._toggleInputValue}
                 bind={this} />
            {i18n.legend}
          </label>
        </div>
      </div>
    ) : null;

    const panel = this._layoutTabSelected ? (
      <section key="esri-print__layoutContent"
               id={`${this.id}__layoutContent`}
               aria-labelledby={`${this.id}__layoutTab`}
               class={CSS.layoutSection}
               role="tabpanel"
               aria-selected={this._layoutTabSelected}
               >
        <div class={CSS.panelContainer}>
          {titleSection}
          {pageSetupSection}
          {this._layoutTabSelected ? fileFormatSection : null}
        </div>

        <div class={join(CSS.panelContainer, CSS.advancedOptionsSection)}>
          <button aria-label={i18n.advancedOptions}
                  aria-expanded={this._advancedOptionsVisible ? "true" : "false"}
                  role="button"
                  class={CSS.advancedOptionsButton}
                  onclick={this._showAdvancedOptions}
                  bind={this}>
            <div class={CSS.advancedOptionsButtonContainer}>
              <span aria-hidden="true" class={join(CSS.iconRightTriangleArrow, CSS.advancedOptionsButtonIconClosed)} />
              <span aria-hidden="true" class={join(CSS.iconLeftTriangleArrow, CSS.advancedOptionsButtonIconClosed_RTL)} />
              <span aria-hidden="true" class={join(CSS.iconDownArrow, CSS.advancedOptionsButtonIconOpened)} />
              <span class={CSS.advancedOptionsButtonTitle}>{i18n.advancedOptions}</span>
            </div>
          </button>
          {advancedSection}
        </div>
      </section>
    ) : (
      <section key="esri-print__mapOnlyContent"
               id={`${this.id}__mapOnlyContent`}
               aria-selected={!this._layoutTabSelected}
               aria-labelledby={`${this.id}__mapOnlyTab`}
               class={CSS.mapOnlySection}
               role="tabpanel">
        <div class={CSS.panelContainer}>
          {titleSection}
          {this._layoutTabSelected ? null : fileFormatSection}
          <div class={join(CSS.sizeContainer, CSS.formSectionContainer)}>
            <div class={CSS.widthContainer}>
              <label>
                {i18n.width}
                <input type="text"
                       class={CSS.inputText}
                       data-input-name="width"
                       onchange={this._updateInputValue}
                       value={`${width}`}
                       tabIndex={0}
                       bind={this} />
              </label>
            </div>
            <div class={CSS.heightContainer}>
              <label>
                {i18n.height}
                <input type="text"
                       class={CSS.inputText}
                       data-input-name="height"
                       onchange={this._updateInputValue}
                       value={`${height}`}
                       tabIndex={0}
                       bind={this} />
              </label>
            </div>
            <button role="button"
                    aria-label={i18n.swap}
                    class={join(CSS.button, CSS.swapButton, CSS.iconSwap)}
                    onclick={this._switchInput}
                    tabIndex={0}
                    bind={this}>
            </button>
          </div>
          <div class={CSS.formSectionContainer}>
            <label>
              <input data-option-name="attributionEnabled"
                     type="checkbox"
                     onchange={this._toggleInputValue}
                     tabIndex={0}
                     checked={attributionEnabled}
                     bind={this} />
              {i18n.attribution}
            </label>
          </div>
        </div>
      </section>
    );

    const exportedLinksArray = this.exportedLinks.toArray();
    const exportedLinksItems = this._renderExportedLink(exportedLinksArray);
    const exportButtonClasses = {
      [CSS.disabled]: !layout && !format
    };

    const isSceneView = this.get("view") != null && this.get("view.type") !== "2d";

    const errorPanel = (
      <div class={CSS.panelError}>
        {isSceneView ? i18n.sceneViewError : i18n.serviceError}
      </div>
    );

    const normalPanel = (
      <div>
        <ul class={CSS.layoutTabList}
            role="tablist"
            onclick={this._toggleLayoutPanel}
            onkeydown={this._toggleLayoutPanel}
            bind={this}>
          <li id={`${this.id}__layoutTab`}
              data-tab-id="layoutTab"
              class={CSS.layoutTab}
              role="tab"
              tabIndex={0}
              aria-selected={`${this._layoutTabSelected}`}
              bind={this}>
            {i18n.layoutTab}
          </li>
          <li id={`${this.id}__mapOnlyTab`}
              data-tab-id="mapOnlyTab"
              class={CSS.layoutTab}
              role="tab"
              tabIndex={0}
              aria-selected={`${!this._layoutTabSelected}`}
              bind={this}>
            {i18n.mapOnlyTab}
          </li>
        </ul>

        {panel}

        <button aria-label={i18n.exportDescription}
                role="button"
                class={CSS.printButton}
                tabIndex={0}
                classes={exportButtonClasses}
                onclick={this._handlePrintMap}
                bind={this}>
          {i18n.export}
        </button>
        <div class={CSS.exportedFilesContainer} afterUpdate={this._scrollExportIntoView} onclick={this._removeLink} bind={this}>
          <h2 class={CSS.exportedFilesTitle}>{i18n.exportText}</h2>
          {
            exportedLinksArray.length > 0 ? null : (
              <div>
                <div>{i18n.exportHint}</div>
              </div>
            )
          }

          {exportedLinksItems}
        </div>
      </div>
    );

    const printWidgetPanel = (
      <div>
        <div class={CSS.printWidgetContainer}>
          <header class={CSS.headerTitle}>{i18n.export}</header>
          {(this.error || !this.printServiceUrl || isSceneView || !this.view) ? errorPanel : normalPanel}
        </div>
      </div>
    );

    return (
      <div afterCreate={storeNode} bind={this} class={CSS.base} data-node-ref="_rootNode">
        {printWidgetPanel}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _addFileLink(template: PrintTemplate): void {
    const titleText = template.layoutOptions.titleText || i18n.untitled,
    lowercaseFormat = template.format.toLowerCase(),
    extension = lowercaseFormat.indexOf("png") > -1 ? "png" : lowercaseFormat,
    fileName = titleText + extension,
    hasSameFileName = this._exportedFileNameMap[fileName] !== undefined;

    if (hasSameFileName) {
      this._exportedFileNameMap[fileName]++;
    }
    else {
      this._exportedFileNameMap[fileName] = 0;
    }

    this.exportedLinks.add(new FileLink({
      name: titleText,
      extension: extension,
      count: this._exportedFileNameMap[fileName]
    }));
  }

  private _toPrintTemplate(templateOptions: TemplateOptions): PrintTemplate {
    const { attributionEnabled, author, copyright, format, height, layout, legendEnabled, title, scale, width } = this.templateOptions;
    const printTemplate = new PrintTemplate({
      attributionVisible: attributionEnabled,
      layoutOptions: {
        authorText: author || "",
        copyrightText: copyright || "",
        titleText: title || ""
      },
      format,
      layout,
      outScale: scale
    });

    if (width) {
      printTemplate.exportOptions.width = width;
    }
    if (height) {
      printTemplate.exportOptions.height = height;
    }

    if (!legendEnabled) {
      printTemplate.layoutOptions.legendLayers = [];
    }

    return printTemplate;
  }

  private _resetToCurrentScale(): void {
    this.templateOptions.scale = this.viewModel.view.scale;
  }

  private _updateInputValue(e: Event): void {
    const target = e.target as HTMLInputElement;
    const targetProperty = target.getAttribute("data-input-name");
    this.templateOptions[targetProperty] = target.value;
  }

  private _handlePrintMap(): void {
    this._pendingExportScroll = true;
    const template = this._toPrintTemplate(this.templateOptions);

    this._addFileLink(template);
    this.viewModel.print(template);
  }

  private _updateFromOption(e: Event): void {
    const target = e.target as HTMLSelectElement;
    const selectedOption = target.selectedOptions ? target.selectedOptions.item(0).value : target.options[target.selectedIndex].value;
    const targetProperty = target.getAttribute("data-target-property");

    this.templateOptions[targetProperty] = selectedOption;
  }

  private _switchInput(): void {
    [this.templateOptions.width, this.templateOptions.height] = [this.templateOptions.height, this.templateOptions.width];
  }

  private _showAdvancedOptions(): void {
    this._advancedOptionsVisible = !this._advancedOptionsVisible;
  }

  private _scrollExportIntoView(): void {
    if (this._pendingExportScroll) {
      this._pendingExportScroll = false;
      const { _rootNode, _rootNode: { clientHeight, scrollHeight } } = this;

      const delta = scrollHeight - clientHeight;

      if (delta > 0) {
        // scroll to bottom (export link area) only if root node owns scroller
        _rootNode.scrollTop = delta;
      }
    }
  }

  private _toggleInputValue(e: Event): void {
    const target = e.target as HTMLInputElement;
    const propName = target.getAttribute("data-option-name");

    this.templateOptions[propName] = target.checked;

    if (propName === "scaleEnabled") {
      this.viewModel.scaleEnabled = this.templateOptions.scaleEnabled;
      if (!this.templateOptions[propName]) {
        this._resetToCurrentScale();
      }
    }
  }

  private _removeLink(e: Event): void {
    const target = e.target as Element;
    const item = target["data-item"] as FileLink;

    if (item && item.state === "error") {
      this.exportedLinks.remove(item);
    }
  }

  private _renderExportedLink(exportedLinksArray: FileLink[]): any {
    return exportedLinksArray.map(exportedLink => {
      const iconClasses = {
        [CSS.iconSpinner]: exportedLink.state === "pending",
        [CSS.rotate]: exportedLink.state === "pending",
        [CSS.iconDownload]: exportedLink.state === "ready",
        [CSS.iconError]: exportedLink.state === "error",
        [CSS.exportedFileError]: exportedLink.state === "error"
      };

      const linkTitleClasses = {
        [CSS.disabled]: exportedLink.state === "pending",
        [CSS.exportedFileError]: exportedLink.state === "error"
      };

      let url = exportedLink.url === "" ? null : exportedLink.url;

      if (url) {
        url = urlUtils.addProxy(url);
      }

      let itemDescriptiveStatus: string;

      if (exportedLink.state === "pending") {
        itemDescriptiveStatus = i18n.pending;
      }
      else if (exportedLink.state === "ready") {
        itemDescriptiveStatus = i18n.ready;
      }
      else {
        itemDescriptiveStatus = i18n.error;
      }

      return (
        <div aria-label={itemDescriptiveStatus} key={exportedLink.formattedName} class={CSS.exportedFile}>
          <a aria-label={`${exportedLink.formattedName}. ${i18n.linkReady}`} href={url} tabIndex={0} target="_blank" class={CSS.exportedFileLink}>
            <span data-item={exportedLink} classes={iconClasses} />
            <span data-item={exportedLink} class={CSS.exportedFileLinkTitle} classes={linkTitleClasses}>{exportedLink.formattedName}</span>
          </a>
        </div>
      );
    });
  }

  private _resetInputValue(): void {
    this.templateOptions.title = "";
  }

  @accessibleHandler()
  private _toggleLayoutPanel(e: Event): void {
    this._resetInputValue();

    const target = e.target as HTMLSelectElement;
    this._layoutTabSelected = target.getAttribute("data-tab-id") === "layoutTab";

    if (!this._layoutTabSelected) {
      this.templateOptions.layout = "MAP_ONLY";
    }
    else {
      const layoutChoices = this.get<string[]>("_templatesInfo.layout.choiceList");
      this.templateOptions.layout = layoutChoices && layoutChoices[0];
    }
  }

}

export = Print;
