"use strict";
(self["webpackChunkevent_logs"] = self["webpackChunkevent_logs"] || []).push([["main"],{

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var C_Users_Elisabeth_Documents_Uni_FaPraProgrammiersysteme_event_logs_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _services_file_operations_log_log_parser_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/file-operations/log/log-parser.service */ 1972);
/* harmony import */ var _services_views_value_chain_display_service_display_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/views/value-chain/display-service/display.service */ 4515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs */ 1989);
/* harmony import */ var _services_views_directly_follows_graph_display_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/views/directly-follows-graph/display.service */ 5860);
/* harmony import */ var _services_common_data_eventlog_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/common/data/eventlog-data.service */ 9755);
/* harmony import */ var _services_file_operations_xes_xes_parser_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/file-operations/xes/xes-parser.service */ 3893);
/* harmony import */ var _services_file_operations_log_log_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/file-operations/log/log.service */ 8994);
/* harmony import */ var _components_drawingArea_drawingArea_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/drawingArea/drawingArea.component */ 7606);
/* harmony import */ var _services_common_trace_case_selection_service_trace_case_selection_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/common/trace-case-selection-service/trace-case-selection.service */ 62);
/* harmony import */ var _services_views_loading_loading_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/views/loading/loading.service */ 9270);
/* harmony import */ var _services_views_value_chain_value_chain_controller_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services/views/value-chain/value-chain-controller.service */ 4953);
/* harmony import */ var _classes_EventLog_eventlog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./classes/EventLog/eventlog */ 2798);
/* harmony import */ var _classes_parser_xesParser__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./classes/parser/xesParser */ 968);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! typedjson */ 4985);
/* harmony import */ var _classes_parser_logParser__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./classes/parser/logParser */ 949);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/flex-layout/flex */ 5434);
/* harmony import */ var _components_upload_button_upload_button_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/upload-button/upload-button.component */ 5063);
/* harmony import */ var _components_export_button_export_button_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/export-button/export-button.component */ 389);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/form-field */ 9076);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/input */ 3365);
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/footer/footer.component */ 4662);



































const _c0 = ["drawingArea"];

const _c1 = function () {
  return ["xes", "log", "txt"];
};

class AppComponent {
  constructor(_logParserService, _xesParserService, _displayService, _valueChainControllerService, _traceCaseSelectionService, _logService, _directlyFollowsGraphService, _eventlogDataService, loadingSpinner) {
    this._logParserService = _logParserService;
    this._xesParserService = _xesParserService;
    this._displayService = _displayService;
    this._valueChainControllerService = _valueChainControllerService;
    this._traceCaseSelectionService = _traceCaseSelectionService;
    this._logService = _logService;
    this._directlyFollowsGraphService = _directlyFollowsGraphService;
    this._eventlogDataService = _eventlogDataService;
    this.loadingSpinner = loadingSpinner;
    this._selectedTraceCaseIds = [];
    this.textareaFc = new _angular_forms__WEBPACK_IMPORTED_MODULE_17__.FormControl();
    this._sub = this.textareaFc.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_18__.debounceTime)(400)).subscribe(val => this.processSourceChange(val));
    this._subSelectedTraces = this._traceCaseSelectionService.selectedTraceCaseIds$.subscribe(selectedTraceCaseIds => {
      this._selectedTraceCaseIds = selectedTraceCaseIds;
      this.updateViews();
    });
    this.textareaFc.setValue(this.logExampleValue());
    this.updateViews();
  }

  ngOnDestroy() {
    this._sub.unsubscribe();

    this._subSelectedTraces.unsubscribe();
  }

  handleKeyboardEvent(event) {
    var activeElement = document.activeElement;
    var inputs = ['input', 'textarea'];

    if (activeElement && inputs.indexOf(activeElement.tagName.toLowerCase()) !== -1) {
      return;
    }

    if (event.key == 'Escape') {
      this._traceCaseSelectionService.selectTraceCaseIds([]);
    }
  }

  processSourceChange(newSource) {
    try {
      const result = this._logParserService.parse(newSource);

      this._traceCaseSelectionService.selectTraceCaseIds([]);

      if (result !== undefined) {
        this._eventlogDataService.eventLog = result;
        this.updateViews();
      }
    } catch (e) {
      if (e !== _classes_parser_logParser__WEBPACK_IMPORTED_MODULE_13__.LogParser.PARSING_ERROR) {
        alert('Unexpected error occured while parsing a .log file ' + e);
        throw e;
      }
    }
  }

  processImport([fileExtension, fileContent]) {
    if (['log', 'txt'].includes(fileExtension)) {
      this.processLogImport(fileContent);
    } else if ('xes' === fileExtension) {
      this.processXesImport(fileContent);
    } else {
      alert('The current filetype ' + fileExtension + ' can not be imported!');
    }
  }

  processLogImport(fileContent) {
    var _this = this;

    return (0,C_Users_Elisabeth_Documents_Uni_FaPraProgrammiersysteme_event_logs_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.loadingSpinner.show();

      _this.parseLogFile(fileContent).then(result => {
        _this._eventlogDataService.eventLog = result;

        _this.updateTextarea(fileContent, false);

        _this.updateViews();
      }).catch(reason => {
        let message;

        if (reason === _classes_parser_logParser__WEBPACK_IMPORTED_MODULE_13__.LogParser.PARSING_ERROR) {
          message = 'The uploaded .log file could not be parsed.\n' + 'Check the file for valid .log syntax and try again.';
        } else {
          message = 'Unexpected error occurred when parsing given .log file';
        }

        alert(message);
      }).finally(() => {
        _this.loadingSpinner.hide();
      });
    })();
  }

  processXesImport(fileContent) {
    var _this2 = this;

    return (0,C_Users_Elisabeth_Documents_Uni_FaPraProgrammiersysteme_event_logs_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.loadingSpinner.show();

      _this2.parseXesFile(fileContent).then(result => {
        _this2._eventlogDataService.eventLog = result;

        _this2.updateTextarea(_this2._logService.generate(result), false);

        _this2.updateViews();
      }).catch(reason => {
        let message;

        if (reason === _classes_parser_xesParser__WEBPACK_IMPORTED_MODULE_12__.XesParser.PARSING_ERROR) {
          message = 'The uploaded XES file could not be parsed.\n' + 'Check the file for valid XES syntax and try again.';
        } else {
          message = 'Unexpected error occurred when parsing given XES file';
        }

        alert(message);
      }).finally(() => _this2.loadingSpinner.hide());
    })();
  }

  parseLogFile(fileContent) {
    return new Promise((resolve, reject) => {
      if (typeof Worker !== 'undefined') {
        const worker = new Worker(__webpack_require__.tu(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u("src_app_workers_log-parser_worker_ts"), __webpack_require__.b)));

        worker.onmessage = ({
          data
        }) => {
          if (data == null) {
            reject(_classes_parser_logParser__WEBPACK_IMPORTED_MODULE_13__.LogParser.PARSING_ERROR);
          }

          const serializer = new typedjson__WEBPACK_IMPORTED_MODULE_19__.TypedJSON(_classes_EventLog_eventlog__WEBPACK_IMPORTED_MODULE_11__.EventLog);
          const result = serializer.parse(data);

          if (result != undefined) {
            resolve(result);
          } else {
            reject(_classes_parser_logParser__WEBPACK_IMPORTED_MODULE_13__.LogParser.PARSING_ERROR);
          }
        };

        worker.onerror = event => {
          event.preventDefault();
          reject(_classes_parser_logParser__WEBPACK_IMPORTED_MODULE_13__.LogParser.PARSING_ERROR);
        };

        worker.postMessage(fileContent);
      } else {
        // web worker not available, fallback option
        try {
          const result = this._logParserService.parse(fileContent);

          resolve(result);
        } catch (e) {
          reject(e);
        }
      }
    });
  }

  parseXesFile(fileContent) {
    return new Promise((resolve, reject) => {
      if (typeof Worker !== 'undefined') {
        const worker = new Worker(__webpack_require__.tu(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u("src_app_workers_xes-parser_worker_ts"), __webpack_require__.b)));

        worker.onmessage = ({
          data
        }) => {
          if (data == null) {
            reject(_classes_parser_xesParser__WEBPACK_IMPORTED_MODULE_12__.XesParser.PARSING_ERROR);
          }

          const serializer = new typedjson__WEBPACK_IMPORTED_MODULE_19__.TypedJSON(_classes_EventLog_eventlog__WEBPACK_IMPORTED_MODULE_11__.EventLog);
          const result = serializer.parse(data);

          if (result != undefined) {
            resolve(result);
          } else {
            reject(_classes_parser_xesParser__WEBPACK_IMPORTED_MODULE_12__.XesParser.PARSING_ERROR);
          }
        };

        worker.onerror = event => {
          event.preventDefault();
          reject(_classes_parser_xesParser__WEBPACK_IMPORTED_MODULE_12__.XesParser.PARSING_ERROR);
        };

        worker.postMessage(fileContent);
      } else {
        // web worker not available, fallback option
        try {
          const result = this._xesParserService.parse(fileContent);

          resolve(result);
        } catch (e) {
          reject(e);
        }
      }
    });
  }

  updateTextarea(fileContent, emitUpdateEvent = true) {
    this._traceCaseSelectionService.selectTraceCaseIds([]);

    this.textareaFc.setValue(fileContent, {
      emitEvent: emitUpdateEvent
    });
  }

  getTextareaValue() {
    return this.textareaFc.value;
  }

  updateViews() {
    this._valueChainControllerService.updateValueChain(this._eventlogDataService.eventLog);

    this._directlyFollowsGraphService.displayDirectlyFollowsGraph(this._eventlogDataService.eventLog);
  }

  updateFilter(filter) {
    this.updateViews();
  }

  logExampleValue() {
    return '.type log\n' + '.attributes\n' + 'case-id\n' + 'concept:name\n' + 'org:resource\n' + 'lifecycle:transition\n' + 'time:timestamp\n' + 'numberRepairs\n' + 'defectFixed\n' + 'defectType\n' + 'phoneType\n' + '.events\n' + '1 Register System complete 1970-01-02T12:23:00.000Z\n' + "1 'Analyze Defect' Tester3 start 1970-01-02T12:23:00.000Z\n" + "1 'Analyze Defect' Tester3 complete 1970-01-02T12:30:00.000Z '' '' 6 T2\n" + "1 'Repair (Complex)' SolverC1 start 1970-01-02T12:31:00.000Z\n" + "1 'Repair (Complex)' SolverC1 complete 1970-01-02T12:49:00.000Z\n" + "1 'Test Repair' Tester3 start 1970-01-02T12:49:00.000Z\n" + "1 'Test Repair' Tester3 complete 1970-01-02T12:55:00.000Z 0 true\n" + "1 'Inform User' System complete 1970-01-02T13:10:00.000Z\n" + "1 'Archive Repair' System complete 1970-01-02T13:10:00.000Z 0 true\n" + '10 Register System complete 1970-01-01T11:09:00.000Z\n' + "10 'Analyze Defect' Tester2 start 1970-01-01T11:09:00.000Z\n" + "10 'Analyze Defect' Tester2 complete 1970-01-01T11:15:00.000Z '' '' 3 T1\n" + "10 'Repair (Simple)' SolverS1 start 1970-01-01T11:35:00.000Z\n" + "10 'Repair (Simple)' SolverS1 complete 1970-01-01T11:42:00.000Z\n" + "10 'Test Repair' Tester6 start 1970-01-01T11:42:00.000Z\n" + "10 'Test Repair' Tester6 complete 1970-01-01T11:48:00.000Z 1 false\n" + "10 'Restart Repair' System complete 1970-01-01T11:54:00.000Z\n" + "10 'Repair (Simple)' SolverS2 start 1970-01-01T11:54:00.000Z\n" + "10 'Inform User' System complete 1970-01-01T11:55:00.000Z\n" + "10 'Repair (Simple)' SolverS2 complete 1970-01-01T12:03:00.000Z\n" + "10 'Test Repair' Tester4 start 1970-01-01T12:03:00.000Z\n" + "10 'Test Repair' Tester4 complete 1970-01-01T12:09:00.000Z 2 true\n" + "10 'Archive Repair' System complete 1970-01-01T12:14:00.000Z 2 true\n" + '100 Register System complete 1970-01-04T02:28:00.000Z\n' + "100 'Analyze Defect' Tester4 start 1970-01-04T02:28:00.000Z\n" + "100 'Analyze Defect' Tester4 complete 1970-01-04T02:36:00.000Z '' '' 8 T2\n" + "100 'Repair (Complex)' SolverC1 start 1970-01-04T02:52:00.000Z\n" + "100 'Repair (Complex)' SolverC1 complete 1970-01-04T03:09:00.000Z\n" + "100 'Test Repair' Tester1 start 1970-01-04T03:09:00.000Z\n" + "100 'Test Repair' Tester1 complete 1970-01-04T03:18:00.000Z 0 true\n" + "100 'Inform User' System complete 1970-01-04T03:20:00.000Z\n" + "100 'Archive Repair' System complete 1970-01-04T03:28:00.000Z 0 true";
  }

}

AppComponent.ɵfac = function AppComponent_Factory(t) {
  return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_file_operations_log_log_parser_service__WEBPACK_IMPORTED_MODULE_1__.LogParserService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_file_operations_xes_xes_parser_service__WEBPACK_IMPORTED_MODULE_5__.XesParserService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_views_value_chain_display_service_display_service__WEBPACK_IMPORTED_MODULE_2__.DisplayService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_views_value_chain_value_chain_controller_service__WEBPACK_IMPORTED_MODULE_10__.ValueChainControllerService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_common_trace_case_selection_service_trace_case_selection_service__WEBPACK_IMPORTED_MODULE_8__.TraceCaseSelectionService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_file_operations_log_log_service__WEBPACK_IMPORTED_MODULE_6__.LogService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_views_directly_follows_graph_display_service__WEBPACK_IMPORTED_MODULE_3__.DirectlyFollowsGraphService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_common_data_eventlog_data_service__WEBPACK_IMPORTED_MODULE_4__.EventlogDataService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_views_loading_loading_service__WEBPACK_IMPORTED_MODULE_9__.LoadingService));
};

AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineComponent"]({
  type: AppComponent,
  selectors: [["app-root"]],
  viewQuery: function AppComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c0, 5);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.drawingArea = _t.first);
    }
  },
  hostBindings: function AppComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("keydown", function AppComponent_keydown_HostBindingHandler($event) {
        return ctx.handleKeyboardEvent($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresolveDocument"]);
    }
  },
  decls: 23,
  vars: 3,
  consts: [["fxLayout", "column", "fxLayoutAlign", "start stretch"], [1, "header"], ["href", "https://www.fernuni-hagen.de/ilovepetrinets/"], [1, "red"], [1, "header-divider"], [1, "main-app-body"], [3, "filterChanged"], ["fxLayoutGap", "20px", 1, "menubar"], ["fxLayoutGap", "20px", "fxFlex", "1 0 auto", 1, "menu-buttons"], [3, "permittedFileExtensions", "newFileUploadedEventExtensionContent"], [3, "processImport"], ["appearance", "outline", "fxFlex", "1 1 100%", 1, "input-form-field"], ["rows", "13", "matInput", "", 1, "textarea", 3, "formControl"]],
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](2, "a", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](3, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](4, "I ");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](5, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](6, "\u2764");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](7, " Petri Nets");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](8, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](9, "Show an event log as a Value-Chain or Directly-Follows-Graph.");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](10, "hr", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](11, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](12, "app-drawing-area", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("filterChanged", function AppComponent_Template_app_drawing_area_filterChanged_12_listener($event) {
        return ctx.updateFilter($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](13, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](14, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](15, "app-upload-button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("newFileUploadedEventExtensionContent", function AppComponent_Template_app_upload_button_newFileUploadedEventExtensionContent_15_listener($event) {
        return ctx.processImport($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](16, "app-export-button", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("processImport", function AppComponent_Template_app_export_button_processImport_16_listener($event) {
        return ctx.processImport($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](17, "mat-form-field", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](18, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](19, "Source file");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](20, "textarea", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](21, "hr");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](22, "app-footer");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("permittedFileExtensions", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction0"](2, _c1));
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("formControl", ctx.textareaFc);
    }
  },
  directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_21__.DefaultLayoutDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_21__.DefaultLayoutAlignDirective, _components_drawingArea_drawingArea_component__WEBPACK_IMPORTED_MODULE_7__.DrawingAreaComponent, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_21__.DefaultLayoutGapDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_21__.DefaultFlexDirective, _components_upload_button_upload_button_component__WEBPACK_IMPORTED_MODULE_14__.UploadButtonComponent, _components_export_button_export_button_component__WEBPACK_IMPORTED_MODULE_15__.ExportButtonComponent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_23__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.FormControlDirective, _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_16__.FooterComponent],
  styles: [".red[_ngcontent-%COMP%] {\n  color: red;\n}\n\nh1[_ngcontent-%COMP%] {\n  text-align: center;\n  font-weight: 300;\n  font-size: 30px;\n  margin-top: 0;\n  margin-bottom: 25px;\n}\n\na[_ngcontent-%COMP%] {\n  text-decoration: none;\n}\n\na[_ngcontent-%COMP%]:visited {\n  color: black;\n}\n\nh2[_ngcontent-%COMP%] {\n  text-align: center;\n  font-weight: 300;\n  font-size: 18px;\n  margin-top: 0;\n}\n\nhr[_ngcontent-%COMP%] {\n  border-color: lightgray;\n  margin-top: 15px;\n  margin-bottom: 30px;\n  width: 100%;\n}\n\nhr.header-divider[_ngcontent-%COMP%] {\n  margin: 0 0 15px 0;\n}\n\n.menubar[_ngcontent-%COMP%] {\n  padding-top: 15px;\n}\n\n.mat-form-field.input-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n  resize: both;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFVBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0FBQ0o7O0FBRUE7RUFDSSxxQkFBQTtBQUNKOztBQUVBO0VBQ0ksWUFBQTtBQUNKOztBQUVBO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0FBQ0o7O0FBRUE7RUFDSSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBRUE7RUFDSSxrQkFBQTtBQUNKOztBQUVBO0VBQ0ksaUJBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FBQ0oiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnJlZCB7XHJcbiAgICBjb2xvcjogcmVkO1xyXG59XHJcblxyXG5oMSB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXdlaWdodDogMzAwO1xyXG4gICAgZm9udC1zaXplOiAzMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMDtcclxuICAgIG1hcmdpbi1ib3R0b206IDI1cHg7XHJcbn1cclxuXHJcbmEge1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcblxyXG5hOnZpc2l0ZWQge1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG59XHJcblxyXG5oMiB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXdlaWdodDogMzAwO1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMDtcclxufVxyXG5cclxuaHIge1xyXG4gICAgYm9yZGVyLWNvbG9yOiBsaWdodGdyYXk7XHJcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG5oci5oZWFkZXItZGl2aWRlciB7XHJcbiAgICBtYXJnaW46IDAgMCAxNXB4IDA7XHJcbn1cclxuXHJcbi5tZW51YmFyIHtcclxuICAgIHBhZGRpbmctdG9wOiAxNXB4O1xyXG59XHJcblxyXG4ubWF0LWZvcm0tZmllbGQuaW5wdXQtZm9ybS1maWVsZCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHJlc2l6ZTogYm90aDtcclxufVxyXG4iXX0= */"]
});

/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _components_drawingArea_drawingArea_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/drawingArea/drawingArea.component */ 7606);
/* harmony import */ var _components_value_chain_value_chain_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/value-chain/value-chain.component */ 1688);
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/flex-layout */ 7114);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/platform-browser/animations */ 3598);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/form-field */ 9076);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/input */ 3365);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/button */ 7317);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/button-toggle */ 1959);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/checkbox */ 1534);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/icon */ 5590);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/sidenav */ 7216);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/footer/footer.component */ 4662);
/* harmony import */ var _components_upload_button_upload_button_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/upload-button/upload-button.component */ 5063);
/* harmony import */ var _directives_drag_drop_file_drag_drop_file_upload_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./directives/drag-drop-file/drag-drop-file-upload.directive */ 1210);
/* harmony import */ var _components_export_button_export_menu_item_export_menu_item_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/export-button/export-menu-item/export-menu-item.component */ 148);
/* harmony import */ var _components_directly_follows_graph_directly_follows_graph_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/directly-follows-graph/directly-follows-graph.component */ 3117);
/* harmony import */ var _components_change_view_button_change_view_button_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/change-view-button/change-view-button.component */ 9481);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/table */ 7217);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/paginator */ 6439);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/sort */ 4316);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/menu */ 2796);
/* harmony import */ var _components_export_button_export_button_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/export-button/export-button.component */ 389);
/* harmony import */ var _components_switch_direction_button_switch_direction_button_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/switch-direction-button/switch-direction-button.component */ 2548);
/* harmony import */ var _components_filter_area_filter_area_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/filter-area/filter-area.component */ 8047);
/* harmony import */ var _components_log_information_view_log_case_log_trace_case_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/log-information-view/log-case/log-trace-case.component */ 7970);
/* harmony import */ var _components_log_information_view_log_information_view_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/log-information-view/log-information-view.component */ 7770);
/* harmony import */ var _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/common/layout-service/layout.service */ 2555);
/* harmony import */ var _services_common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./services/common/svg-service/svg.service */ 7544);
/* harmony import */ var _pipes_attribute_value_pipe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pipes/attribute-value.pipe */ 3525);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/progress-spinner */ 4742);
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/cdk/scrolling */ 5752);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 3184);





































const logInformationLabelExtractor = trace => 'case ' + trace.caseIds[0];
const logInformationLabelExtraSizeExtractor = trace => trace.caseIds[0].toString().length;
const valueChainLabelExtractor = trace => trace.count + (trace.count == 1 ? ' case' : ' cases');
const valueChainLabelExtraSizeExtractor = trace => trace.caseIds.length.toString().length;
class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineInjector"]({ providers: [
        { provide: _angular_common__WEBPACK_IMPORTED_MODULE_18__.APP_BASE_HREF, useValue: '/' },
        {
            provide: _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__.LayoutService.VALUE_CHAIN_INSTANCE,
            useFactory: () => new _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__.LayoutService(_services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__.LayoutService.X_OFFSET_VALUE_CHAIN, _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__.LayoutService.Y_OFFSET_VALUE_CHAIN, _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__.LayoutService.X_STEP_VALUE_CHAIN, _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__.LayoutService.Y_STEP_VALUE_CHAIN, _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__.LayoutService.X_LABELSIZE_VALUE_CHAIN, valueChainLabelExtraSizeExtractor),
        },
        {
            provide: _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__.LayoutService.LOG_INFORMATION_INSTANCE,
            useFactory: () => new _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__.LayoutService(_services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__.LayoutService.X_OFFSET_LOG_INFORMATION, _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__.LayoutService.Y_OFFSET_LOG_INFORMATION, _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__.LayoutService.X_STEP_LOG_INFORMATION, _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__.LayoutService.Y_STEP_LOG_INFORMATION, _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__.LayoutService.X_LABELSIZE_LOG_INFORMATION, logInformationLabelExtraSizeExtractor),
        },
        {
            provide: _services_common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_15__.SvgService.VALUE_CHAIN_INSTANCE,
            useFactory: (layoutService) => new _services_common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_15__.SvgService(layoutService, _services_common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_15__.SvgService.MAXFONTWIDTH_VALUE_CHAIN, _services_common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_15__.SvgService.BOX_WIDTH_VALUE_CHAIN, _services_common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_15__.SvgService.BOX_HEIGHT_VALUE_CHAIN, valueChainLabelExtractor, valueChainLabelExtraSizeExtractor),
            deps: [_services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__.LayoutService.VALUE_CHAIN_INSTANCE],
        },
        {
            provide: _services_common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_15__.SvgService.LOG_INFORMATION_INSTANCE,
            useFactory: (layoutService) => new _services_common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_15__.SvgService(layoutService, _services_common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_15__.SvgService.MAXFONTWIDTH_LOG_INFOMRATION, _services_common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_15__.SvgService.BOX_WIDTH_LOG_INFORMATION, _services_common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_15__.SvgService.BOX_HEIGHT_LOG_INFORMATION, logInformationLabelExtractor, logInformationLabelExtraSizeExtractor),
            deps: [_services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_14__.LayoutService.LOG_INFORMATION_INSTANCE],
        },
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_19__.BrowserModule,
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_20__.FlexLayoutModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_21__.FormsModule,
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__.BrowserAnimationsModule,
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_23__.MatFormFieldModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_24__.MatInputModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_25__.MatButtonModule,
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_26__.MatButtonToggleModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_27__.MatIconModule,
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_28__.MatSidenavModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_21__.ReactiveFormsModule,
            _angular_material_table__WEBPACK_IMPORTED_MODULE_29__.MatTableModule,
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_30__.MatPaginatorModule,
            _angular_material_sort__WEBPACK_IMPORTED_MODULE_31__.MatSortModule,
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_32__.MatMenuModule,
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_33__.MatProgressSpinnerModule,
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_34__.MatCheckboxModule,
            _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_35__.ScrollingModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent,
        _components_value_chain_value_chain_component__WEBPACK_IMPORTED_MODULE_2__.ValueChainComponent,
        _components_drawingArea_drawingArea_component__WEBPACK_IMPORTED_MODULE_1__.DrawingAreaComponent,
        _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__.FooterComponent,
        _components_upload_button_upload_button_component__WEBPACK_IMPORTED_MODULE_4__.UploadButtonComponent,
        _directives_drag_drop_file_drag_drop_file_upload_directive__WEBPACK_IMPORTED_MODULE_5__.DragDropFileUploadDirective,
        _components_export_button_export_menu_item_export_menu_item_component__WEBPACK_IMPORTED_MODULE_6__.ExportMenuItemComponent,
        _components_directly_follows_graph_directly_follows_graph_component__WEBPACK_IMPORTED_MODULE_7__.DirectlyFollowsGraphComponent,
        _components_change_view_button_change_view_button_component__WEBPACK_IMPORTED_MODULE_8__.ChangeViewButtonComponent,
        _components_drawingArea_drawingArea_component__WEBPACK_IMPORTED_MODULE_1__.DrawingAreaComponent,
        _components_export_button_export_button_component__WEBPACK_IMPORTED_MODULE_9__.ExportButtonComponent,
        _components_switch_direction_button_switch_direction_button_component__WEBPACK_IMPORTED_MODULE_10__.SwitchDirectionButtonComponent,
        _components_filter_area_filter_area_component__WEBPACK_IMPORTED_MODULE_11__.FilterAreaComponent,
        _components_log_information_view_log_information_view_component__WEBPACK_IMPORTED_MODULE_13__.LogInformationViewComponent,
        _components_log_information_view_log_case_log_trace_case_component__WEBPACK_IMPORTED_MODULE_12__.LogTraceCaseComponent,
        _pipes_attribute_value_pipe__WEBPACK_IMPORTED_MODULE_16__.AttributeValuePipe], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_19__.BrowserModule,
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_20__.FlexLayoutModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_21__.FormsModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__.BrowserAnimationsModule,
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_23__.MatFormFieldModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_24__.MatInputModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_25__.MatButtonModule,
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_26__.MatButtonToggleModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_27__.MatIconModule,
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_28__.MatSidenavModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_21__.ReactiveFormsModule,
        _angular_material_table__WEBPACK_IMPORTED_MODULE_29__.MatTableModule,
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_30__.MatPaginatorModule,
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_31__.MatSortModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_32__.MatMenuModule,
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_33__.MatProgressSpinnerModule,
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_34__.MatCheckboxModule,
        _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_35__.ScrollingModule] }); })();
_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵsetComponentScope"](_components_log_information_view_log_information_view_component__WEBPACK_IMPORTED_MODULE_13__.LogInformationViewComponent, [_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_35__.CdkVirtualScrollViewport, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_35__.CdkFixedSizeVirtualScroll, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_35__.CdkVirtualForOf, _components_log_information_view_log_case_log_trace_case_component__WEBPACK_IMPORTED_MODULE_12__.LogTraceCaseComponent], []);


/***/ }),

/***/ 9317:
/*!************************************************!*\
  !*** ./src/app/classes/EventLog/classifier.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Classifier": () => (/* binding */ Classifier)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ 5649);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typedjson */ 936);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typedjson */ 9713);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typedjson */ 6239);



let Classifier = class Classifier {
    constructor(name, keys) {
        this._name = name;
        this._keys = keys;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get keys() {
        return this._keys;
    }
    set keys(value) {
        this._keys = value;
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(String),
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", String)
], Classifier.prototype, "_name", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonArrayMember)(String),
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Array)
], Classifier.prototype, "_keys", void 0);
Classifier = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    typedjson__WEBPACK_IMPORTED_MODULE_4__.jsonObject,
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [String, Array])
], Classifier);



/***/ }),

/***/ 3594:
/*!*******************************************!*\
  !*** ./src/app/classes/EventLog/event.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Event": () => (/* binding */ Event)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventlogattribute */ 1367);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reflect-metadata */ 5649);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typedjson */ 9713);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typedjson */ 936);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typedjson */ 6239);




let Event = class Event {
    constructor(attributes, activity) {
        this._activity = activity;
        this._attributes = attributes;
    }
    get attributes() {
        return this._attributes;
    }
    set attributes(value) {
        this._attributes = value;
    }
    get activity() {
        return this._activity;
    }
    set activity(value) {
        this._activity = value;
    }
    getAttribute(key) {
        return this._attributes.filter(attribute => key === attribute.key.toString())[0];
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonArrayMember)(_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.EventLogAttribute),
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Array)
], Event.prototype, "_attributes", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_4__.jsonMember)(String),
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", String)
], Event.prototype, "_activity", void 0);
Event = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonObject)({
        knownTypes: [
            _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.StringAttribute,
            _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.DateAttribute,
            _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.IntAttribute,
            _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.FloatAttribute,
            _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.BooleanAttribute,
        ],
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [Array, String])
], Event);



/***/ }),

/***/ 2798:
/*!**********************************************!*\
  !*** ./src/app/classes/EventLog/eventlog.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventLog": () => (/* binding */ EventLog)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventlogattribute */ 1367);
/* harmony import */ var _classifier__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classifier */ 9317);
/* harmony import */ var _trace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./trace */ 9484);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reflect-metadata */ 5649);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typedjson */ 9713);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! typedjson */ 6239);






let EventLog = class EventLog {
    constructor(classifiers, globalEventAttributes, globalTraceAttributes, traces, attributes) {
        this._classifiers = classifiers;
        this._globalEventAttributes = globalEventAttributes;
        this._globalTraceAttributes = globalTraceAttributes;
        this._attributes = attributes;
        this._traces = traces;
    }
    get classifiers() {
        return this._classifiers;
    }
    set classifiers(value) {
        this._classifiers = value;
    }
    get globalEventAttributes() {
        return this._globalEventAttributes;
    }
    set globalEventAttributes(value) {
        this._globalEventAttributes = value;
    }
    get globalTraceAttributes() {
        return this._globalTraceAttributes;
    }
    set globalTraceAttributes(value) {
        this._globalTraceAttributes = value;
    }
    get attributes() {
        return this._attributes;
    }
    set attributes(value) {
        this._attributes = value;
    }
    get traces() {
        return this._traces;
    }
    set traces(value) {
        this._traces = value;
    }
    get sortedTraces() {
        let result = new Array();
        this._traces.forEach(trace => {
            const index = result.findIndex(val => {
                for (let i = 0; i < val[0].events.length; i++) {
                    if (val[0].events.length !== trace.events.length) {
                        return false;
                    }
                    if (val[0].events[i].activity !== trace.events[i].activity) {
                        return false;
                    }
                }
                return true;
            });
            if (index == -1) {
                let arr = new Array();
                arr.push(trace);
                result.push(arr);
            }
            else {
                result[index].push(trace); // Trace zu den anderen hinzufügen die die gleichen Events haben
            }
        });
        result.sort((a, b) => {
            return b.length - a.length;
        });
        return result;
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonArrayMember)(_classifier__WEBPACK_IMPORTED_MODULE_1__.Classifier),
    (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:type", Array)
], EventLog.prototype, "_classifiers", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonArrayMember)(_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.EventLogAttribute),
    (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:type", Array)
], EventLog.prototype, "_globalEventAttributes", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonArrayMember)(_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.EventLogAttribute),
    (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:type", Array)
], EventLog.prototype, "_globalTraceAttributes", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonArrayMember)(_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.EventLogAttribute),
    (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:type", Array)
], EventLog.prototype, "_attributes", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonArrayMember)(_trace__WEBPACK_IMPORTED_MODULE_2__.Trace),
    (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:type", Array)
], EventLog.prototype, "_traces", void 0);
EventLog = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_6__.jsonObject)({
        knownTypes: [
            _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.StringAttribute,
            _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.DateAttribute,
            _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.IntAttribute,
            _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.FloatAttribute,
            _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.BooleanAttribute,
        ],
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:paramtypes", [Array,
        Array,
        Array,
        Array,
        Array])
], EventLog);



/***/ }),

/***/ 1367:
/*!*******************************************************!*\
  !*** ./src/app/classes/EventLog/eventlogattribute.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BooleanAttribute": () => (/* binding */ BooleanAttribute),
/* harmony export */   "DateAttribute": () => (/* binding */ DateAttribute),
/* harmony export */   "EventLogAttribute": () => (/* binding */ EventLogAttribute),
/* harmony export */   "FloatAttribute": () => (/* binding */ FloatAttribute),
/* harmony export */   "IntAttribute": () => (/* binding */ IntAttribute),
/* harmony export */   "StringAttribute": () => (/* binding */ StringAttribute)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ 5649);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typedjson */ 936);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typedjson */ 6239);



class EventLogAttribute {
    constructor() {
        this.key = '';
    }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(String),
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", String)
], EventLogAttribute.prototype, "key", void 0);
let StringAttribute = class StringAttribute extends EventLogAttribute {
    constructor(value, key) {
        super();
        this.value = value;
        this.key = key;
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(String),
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", String)
], StringAttribute.prototype, "value", void 0);
StringAttribute = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonObject,
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [String, String])
], StringAttribute);

let DateAttribute = class DateAttribute extends EventLogAttribute {
    constructor(value, key) {
        super();
        this.value = value;
        this.key = key;
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Date),
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Date)
], DateAttribute.prototype, "value", void 0);
DateAttribute = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonObject,
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [Date, String])
], DateAttribute);

let IntAttribute = class IntAttribute extends EventLogAttribute {
    constructor(value, key) {
        super();
        this.value = Math.round(value);
        this.key = key;
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Number),
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Number)
], IntAttribute.prototype, "value", void 0);
IntAttribute = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonObject,
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [Number, String])
], IntAttribute);

let FloatAttribute = class FloatAttribute extends EventLogAttribute {
    constructor(value, key) {
        super();
        this.value = value;
        this.key = key;
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Number),
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Number)
], FloatAttribute.prototype, "value", void 0);
FloatAttribute = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonObject,
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [Number, String])
], FloatAttribute);

let BooleanAttribute = class BooleanAttribute extends EventLogAttribute {
    constructor(value, key) {
        super();
        this.value = value;
        this.key = key;
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Boolean),
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Boolean)
], BooleanAttribute.prototype, "value", void 0);
BooleanAttribute = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonObject,
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [Boolean, String])
], BooleanAttribute);



/***/ }),

/***/ 9484:
/*!*******************************************!*\
  !*** ./src/app/classes/EventLog/trace.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Trace": () => (/* binding */ Trace)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventlogattribute */ 1367);
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event */ 3594);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reflect-metadata */ 5649);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typedjson */ 9713);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typedjson */ 936);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! typedjson */ 6239);





let Trace = class Trace {
    constructor(attributes, events, caseId) {
        this._attributes = attributes;
        this._events = events;
        this._caseId = caseId;
    }
    get attributes() {
        return this._attributes;
    }
    set attributes(value) {
        this._attributes = value;
    }
    get events() {
        return this._events;
    }
    set events(value) {
        this._events = value;
    }
    get caseId() {
        return this._caseId;
    }
    set caseId(value) {
        this._caseId = value;
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_4__.jsonArrayMember)(_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.EventLogAttribute),
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__metadata)("design:type", Array)
], Trace.prototype, "_attributes", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_4__.jsonArrayMember)(_event__WEBPACK_IMPORTED_MODULE_1__.Event),
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__metadata)("design:type", Array)
], Trace.prototype, "_events", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonMember)(Number),
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__metadata)("design:type", Number)
], Trace.prototype, "_caseId", void 0);
Trace = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,typedjson__WEBPACK_IMPORTED_MODULE_6__.jsonObject)({
        knownTypes: [
            _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.StringAttribute,
            _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.DateAttribute,
            _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.IntAttribute,
            _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.FloatAttribute,
            _eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.BooleanAttribute,
        ],
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__metadata)("design:paramtypes", [Array,
        Array, Number])
], Trace);



/***/ }),

/***/ 5597:
/*!***********************************************!*\
  !*** ./src/app/classes/diagram/GraphEvent.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GraphEvent": () => (/* binding */ GraphEvent)
/* harmony export */ });
class GraphEvent {
    constructor(_activity, _svgElements) {
        this._activity = _activity;
        this._svgElements = _svgElements;
    }
    get svgElements() {
        return this._svgElements;
    }
    get activity() {
        return this._activity;
    }
}


/***/ }),

/***/ 3415:
/*!***********************************************!*\
  !*** ./src/app/classes/diagram/GraphTrace.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GraphTrace": () => (/* binding */ GraphTrace)
/* harmony export */ });
class GraphTrace {
    constructor(_events, _count, _svgElements, _caseIds) {
        this._events = _events;
        this._count = _count;
        this._svgElements = _svgElements;
        this._caseIds = _caseIds;
    }
    get caseIds() {
        return this._caseIds;
    }
    get svgElements() {
        return this._svgElements;
    }
    get count() {
        return this._count;
    }
    get events() {
        return this._events;
    }
}


/***/ }),

/***/ 1788:
/*!********************************************!*\
  !*** ./src/app/classes/diagram/diagram.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Diagram": () => (/* binding */ Diagram)
/* harmony export */ });
class Diagram {
    constructor(traces) {
        this._traces = traces;
    }
    get traces() {
        return this._traces;
    }
}


/***/ }),

/***/ 2928:
/*!********************************************!*\
  !*** ./src/app/classes/diagram/element.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Element": () => (/* binding */ Element),
/* harmony export */   "ElementType": () => (/* binding */ ElementType)
/* harmony export */ });
var ElementType;
(function (ElementType) {
    ElementType[ElementType["text"] = 0] = "text";
    ElementType[ElementType["box"] = 1] = "box";
})(ElementType || (ElementType = {}));
class Element {
    constructor(type, selectTraceCaseIds) {
        this._x = 0;
        this._y = 0;
        this._type = type;
        this._selectTraceCaseIds = selectTraceCaseIds;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    registerSvg(svg) {
        this._svgElement = svg;
        this._svgElement.onmousedown = event => {
            this.processMouseDown(event);
        };
        this._svgElement.onmouseup = event => {
            this.processMouseUp(event);
        };
    }
    processMouseDown(event) {
        this._selectTraceCaseIds();
    }
    processMouseUp(event) { }
}


/***/ }),

/***/ 8355:
/*!********************************************************!*\
  !*** ./src/app/classes/directly-follows-graph/edge.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Edge": () => (/* binding */ Edge)
/* harmony export */ });
class Edge {
    constructor(startVertex, endVertex, activityCount = 0, isReversed = false) {
        this._startVertex = startVertex;
        this._endVertex = endVertex;
        this._activityCount = activityCount;
        this._isReversed = isReversed;
    }
    get startVertex() {
        return this._startVertex;
    }
    set startVertex(value) {
        this._startVertex = value;
    }
    get endVertex() {
        return this._endVertex;
    }
    set endVertex(value) {
        this._endVertex = value;
    }
    get activityCount() {
        return this._activityCount;
    }
    set activityCount(value) {
        this._activityCount = value;
    }
    get pathSvgElement() {
        return this._pathSvgElement;
    }
    set pathSvgElement(svgElement) {
        this._pathSvgElement = svgElement;
    }
    get textSvgElement() {
        return this._textSvgElement;
    }
    set textSvgElement(svgElement) {
        this._textSvgElement = svgElement;
    }
    get isReversed() {
        return this._isReversed;
    }
    set isReversed(value) {
        this._isReversed = value;
    }
    reverse() {
        let temp = this._startVertex;
        this._startVertex = this._endVertex;
        this._endVertex = temp;
        this._isReversed = !this._isReversed;
    }
    isTargetingSelf() {
        return this._startVertex == this._endVertex;
    }
}


/***/ }),

/***/ 680:
/*!*********************************************************!*\
  !*** ./src/app/classes/directly-follows-graph/graph.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Graph": () => (/* binding */ Graph)
/* harmony export */ });
class Graph {
    constructor(vertices, edges) {
        this._vertices = vertices;
        this._edges = edges;
    }
    get vertices() {
        return this._vertices;
    }
    get edges() {
        return this._edges;
    }
    addEdges(edges) {
        edges.forEach(edge => this.edges.push(edge));
    }
    removeVertex(vertex) {
        let index = this._vertices.findIndex(v => v === vertex);
        if (index > -1)
            this._vertices.splice(index, 1);
    }
    removeVertices(vertices) {
        vertices.forEach(vertex => this.removeVertex(vertex));
    }
    removeEdge(edge) {
        let index = this._edges.findIndex(e => e === edge);
        if (index > -1)
            this._edges.splice(index, 1);
    }
    removeEdges(edges) {
        edges.forEach(edge => this.removeEdge(edge));
    }
    getSinks() {
        let vertices = [];
        this._vertices.forEach(vertex => {
            let outgoingEdges = vertex.getOutgoingEdges(this._edges);
            let incomingEdges = vertex.getIncomingEdges(this._edges);
            if (outgoingEdges.length == 0 && incomingEdges.length != 0)
                vertices.push(vertex);
        });
        return vertices;
    }
    getIsolatedVertices() {
        let vertices = [];
        this._vertices.forEach(vertex => {
            let outgoingEdges = vertex.getOutgoingEdges(this._edges);
            let incomingEdges = vertex.getIncomingEdges(this._edges);
            if (outgoingEdges.length == 0 && incomingEdges.length == 0)
                vertices.push(vertex);
        });
        return vertices;
    }
    getSources() {
        let vertices = [];
        this._vertices.forEach(vertex => {
            let outgoingEdges = vertex.getOutgoingEdges(this._edges);
            let incomingEdges = vertex.getIncomingEdges(this._edges);
            if (outgoingEdges.length != 0 && incomingEdges.length == 0)
                vertices.push(vertex);
        });
        return vertices;
    }
    //Gibt den Knoten zurück, der den maximalen Wert bezüglich ausgehender Kanten minus eingehender Kanten besitzt.
    getMaxEdgeDifferenceVertex() {
        let maxVertex = this._vertices[0];
        let maxDiff = Number.MIN_VALUE;
        this._vertices.forEach(vertex => {
            let outgoingEdges = vertex.getOutgoingEdges(this._edges);
            let incomingEdges = vertex.getIncomingEdges(this._edges);
            let diff = outgoingEdges.length - incomingEdges.length;
            if (diff > maxDiff) {
                maxVertex = vertex;
                maxDiff = diff;
            }
        });
        return maxVertex;
    }
    getMaxVerticesOnLayer() {
        let max = 0;
        for (let layer = 1; layer <= this.getMaxLayer(); layer++)
            max = Math.max(max, this.getVerticesByLayer(layer).length);
        return max;
    }
    getMaxLayer() {
        let maxLayer = 0;
        this.vertices.forEach(vertex => (maxLayer = Math.max(maxLayer, vertex.layer)));
        return maxLayer;
    }
    getVerticesByLayer(layer) {
        return this.vertices.filter(vertex => vertex.layer === layer);
    }
    getVerticesSortedByPosition(layer) {
        return this.getVerticesByLayer(layer).sort((v1, v2) => {
            if (v1.position > v2.position)
                return 1;
            if (v1.position < v2.position || Math.random() < 0.5)
                return -1;
            else
                return 0;
        });
    }
    getMaxActivityCountVertex() {
        let max = 0;
        this.vertices.forEach(vertex => {
            max = Math.max(vertex.activityCount, max);
        });
        return max;
    }
    getMaxPosition() {
        let maxPosition = Number.MIN_VALUE;
        this.vertices.forEach(vertex => (maxPosition = Math.max(vertex.position, maxPosition)));
        return maxPosition;
    }
    getMinPosition() {
        let minPosition = Number.MAX_VALUE;
        this.vertices.forEach(vertex => (minPosition = Math.min(vertex.position, minPosition)));
        return minPosition;
    }
    getEdgesByStartVertex(vertex) {
        let edges = this.edges.filter(edge => edge.startVertex === vertex);
        return edges;
    }
    getEdgesByEndVertex(vertex) {
        let edges = this.edges.filter(edge => edge.endVertex === vertex);
        return edges;
    }
    getEdgesByLayer(layer) {
        let edges = this.edges.filter(edge => edge.startVertex.layer === layer ||
            edge.endVertex.layer === layer);
        return edges;
    }
}


/***/ }),

/***/ 7620:
/*!**********************************************************!*\
  !*** ./src/app/classes/directly-follows-graph/vertex.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vertex": () => (/* binding */ Vertex)
/* harmony export */ });
class Vertex {
    constructor(activityName, activityCount = 0, isDummy = false) {
        this._isStart = false;
        this._isEnd = false;
        this._activityName = activityName;
        this._activityCount = activityCount;
        this._layer = 0;
        this._position = 0;
        this._isDummy = isDummy;
    }
    get activityName() {
        return this._activityName;
    }
    set activityName(value) {
        this._activityName = value;
    }
    get activityCount() {
        return this._activityCount;
    }
    set activityCount(value) {
        this._activityCount = value;
    }
    get layer() {
        return this._layer;
    }
    set layer(value) {
        this._layer = value;
    }
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
    }
    get svgElement() {
        return this._svgElement;
    }
    set svgElement(svgElement) {
        var _a;
        this._svgElement = svgElement;
        if (this._svgElement != undefined) {
            let rect = (_a = this._svgElement) === null || _a === void 0 ? void 0 : _a.children[0];
            //Anzeige von Dummyknoten, wenn sie ausgewählt werden sollen
            if (this._isDummy &&
                rect !== undefined &&
                !(this.isStart || this.isEnd)) {
                this._svgElement.onmouseenter = event => {
                    rect.setAttribute('fill', 'rgb(150, 150, 150)');
                    rect.setAttribute('fill-opacity', '1');
                    rect.setAttribute('stroke-width', '2');
                    rect.setAttribute('stroke', 'black');
                };
                this._svgElement.onmouseleave = event => {
                    rect.removeAttribute('fill');
                    rect.setAttribute('fill-opacity', '0');
                    rect.removeAttribute('stroke-width');
                    rect.removeAttribute('stroke');
                };
            }
        }
    }
    get isDummy() {
        return this._isDummy;
    }
    get isStart() {
        return this._isStart;
    }
    set isStart(value) {
        this._isStart = value;
    }
    get isEnd() {
        return this._isEnd;
    }
    set isEnd(value) {
        this._isEnd = value;
    }
    getSvgElementXValue() {
        var _a;
        let xString = (_a = this.svgElement) === null || _a === void 0 ? void 0 : _a.getAttribute('x');
        let x = 0;
        if (xString != null)
            x = +xString;
        return x;
    }
    getSvgElementYValue() {
        var _a;
        let yString = (_a = this.svgElement) === null || _a === void 0 ? void 0 : _a.getAttribute('y');
        let y = 0;
        if (yString != null)
            y = +yString;
        return y;
    }
    //Gibt alle Kanten mit Knoten niedrigerer Ebenen zurück
    getLowerLayerEdges(edges) {
        let lowerLayerEdges = [];
        edges.forEach(edge => {
            if ((this === edge.startVertex &&
                edge.startVertex.layer > edge.endVertex.layer) ||
                (this === edge.endVertex &&
                    edge.startVertex.layer < edge.endVertex.layer))
                lowerLayerEdges.push(edge);
        });
        return lowerLayerEdges;
    }
    //Gibt alle Kanten mit Knoten höherer Ebenen zurück
    getUpperLayerEdges(edges) {
        let upperLayerEdges = [];
        edges.forEach(edge => {
            if ((this === edge.startVertex &&
                edge.startVertex.layer < edge.endVertex.layer) ||
                (this === edge.endVertex &&
                    edge.startVertex.layer > edge.endVertex.layer))
                upperLayerEdges.push(edge);
        });
        return upperLayerEdges;
    }
    //Berechnet die Position einer Kante zu den anderen Kanten
    calculateEdgePosition(edge, edges, verticalDirection) {
        let position = 1;
        edges.forEach(e => {
            //Kanten verlaufen in die selbe Richtung
            if (edge.startVertex.layer < edge.endVertex.layer ===
                e.startVertex.layer < e.endVertex.layer) {
                if (
                //Bei vertikaler Ausrichtung überprüfe X Werte
                (verticalDirection &&
                    ((this === e.startVertex &&
                        edge.endVertex.getSvgElementXValue() >
                            e.endVertex.getSvgElementXValue()) ||
                        (this === e.endVertex &&
                            edge.startVertex.getSvgElementXValue() >
                                e.startVertex.getSvgElementXValue()))) ||
                    //Bei horizontaler Ausrichtung überprüfe Y Werte
                    (!verticalDirection &&
                        ((this === e.startVertex &&
                            edge.endVertex.getSvgElementYValue() >
                                e.endVertex.getSvgElementYValue()) ||
                            (this === e.endVertex &&
                                edge.startVertex.getSvgElementYValue() >
                                    e.startVertex.getSvgElementYValue()))))
                    position++;
            }
            //Kanten verlaufen in gegengesetzte Richtungen
            else {
                if (
                //Bei vertikaler Ausrichtung überprüfe X Werte
                (verticalDirection &&
                    ((this === e.startVertex &&
                        edge.startVertex.getSvgElementXValue() >=
                            e.endVertex.getSvgElementXValue()) ||
                        (this === e.endVertex &&
                            edge.endVertex.getSvgElementXValue() >=
                                e.startVertex.getSvgElementXValue()))) ||
                    //Bei horizontaler Ausrichtung überprüfe Y Werte
                    (!verticalDirection &&
                        ((this === e.startVertex &&
                            edge.startVertex.getSvgElementYValue() >=
                                e.endVertex.getSvgElementYValue()) ||
                            (this === e.endVertex &&
                                edge.endVertex.getSvgElementYValue() >=
                                    e.startVertex.getSvgElementYValue()))))
                    position++;
            }
            //Verlaufen zwischen 2 Knoten Kanten in beide Richtungen, positioniere eine Kante weiter links
            if ((edge.startVertex == this &&
                edge.endVertex == e.startVertex &&
                edge.startVertex.layer < edge.endVertex.layer) ||
                (edge.endVertex == this &&
                    edge.startVertex == e.endVertex &&
                    edge.startVertex.layer < edge.endVertex.layer))
                position--;
        });
        return position;
    }
    //Gibt alle ausgehenden Kanten zurück
    getOutgoingEdges(edges) {
        let outgoingEdges = [];
        edges.forEach(edge => {
            if (this === edge.startVertex && !edge.isTargetingSelf())
                outgoingEdges.push(edge);
        });
        return outgoingEdges;
    }
    //Gibt alle eingehenden Kanten zurück
    getIncomingEdges(edges) {
        let incomingEdges = [];
        edges.forEach(edge => {
            if (this === edge.endVertex && !edge.isTargetingSelf())
                incomingEdges.push(edge);
        });
        return incomingEdges;
    }
}


/***/ }),

/***/ 949:
/*!*********************************************!*\
  !*** ./src/app/classes/parser/logParser.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogParser": () => (/* binding */ LogParser)
/* harmony export */ });
/* harmony import */ var _EventLog_eventlog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EventLog/eventlog */ 2798);
/* harmony import */ var _EventLog_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../EventLog/event */ 3594);
/* harmony import */ var _EventLog_trace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../EventLog/trace */ 9484);
/* harmony import */ var _EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../EventLog/eventlogattribute */ 1367);




class LogParser {
    constructor() {
        this._undefinedValue = "''";
        this._typeLogElement = '.type log';
        this._attributesElement = '.attributes';
        this._eventsElement = '.events';
        this._caseIdElement = 'case-id';
        this._activityElement = 'concept:name';
        this._escapeString = "'";
    }
    /**
     * Liest einen String im .type log Format ein, das von Robin Bergenthum und Jakub Kovar definiert wurde und wandelt es in die
     * intern verwendete Repräsentation als {@link EventLog} um
     *
     * @param text String im .type log Format, der geparst werden soll
     * @return interne Darstellung als {@link EventLog}
     */
    parse(text) {
        if (text.trim() === '') {
            return new _EventLog_eventlog__WEBPACK_IMPORTED_MODULE_0__.EventLog([], [], [], [], []);
        }
        const lines = text.split(/\r?\n/);
        const indexLog = LogParser.indexOfTokenIfExists(lines, this._typeLogElement);
        const indexAttributes = LogParser.indexOfTokenIfExists(lines, this._attributesElement);
        const indexEvents = LogParser.indexOfTokenIfExists(lines, this._eventsElement);
        const max = lines.length;
        const keywordIndices = [
            indexLog,
            indexAttributes,
            indexEvents,
            max,
        ];
        const attributesLines = lines.slice(indexAttributes + 1, LogParser.nextKeyword(keywordIndices, indexAttributes));
        const headers = attributesLines.map(attribute => attribute.trim());
        const eventLines = lines.slice(indexEvents + 1, LogParser.nextKeyword(keywordIndices, indexEvents));
        const traces = this.parseTraces(headers, eventLines);
        return new _EventLog_eventlog__WEBPACK_IMPORTED_MODULE_0__.EventLog([], [], [], traces, []);
    }
    parseTraces(headers, eventLines) {
        const asTable = eventLines.map(eventLine => this.splitEventLineString(eventLine));
        const dictCaseIdentifierToTrace = new Map();
        asTable.forEach(eventLineSplit => {
            var _a;
            if (eventLineSplit[headers.indexOf(this._caseIdElement)] ===
                undefined ||
                eventLineSplit[headers.indexOf(this._activityElement)] ===
                    undefined) {
                throw LogParser.PARSING_ERROR;
            }
            const caseId = parseInt(eventLineSplit[headers.indexOf(this._caseIdElement)]);
            const activity = eventLineSplit[headers.indexOf(this._activityElement)];
            const eventLogAttributes = headers
                .filter(header => ![this._caseIdElement, this._activityElement].includes(header))
                .filter(header => headers.indexOf(header) < eventLineSplit.length)
                .filter(header => eventLineSplit[headers.indexOf(header)] !==
                this._undefinedValue)
                .map(header => LogParser.eventLogAttributeOf(header, eventLineSplit[headers.indexOf(header)]));
            if (!dictCaseIdentifierToTrace.has(caseId)) {
                dictCaseIdentifierToTrace.set(caseId, new _EventLog_trace__WEBPACK_IMPORTED_MODULE_2__.Trace([], [], caseId));
            }
            (_a = dictCaseIdentifierToTrace
                .get(caseId)) === null || _a === void 0 ? void 0 : _a.events.push(new _EventLog_event__WEBPACK_IMPORTED_MODULE_1__.Event(eventLogAttributes, activity));
        });
        return Array.from(dictCaseIdentifierToTrace.values());
    }
    splitEventLineString(eventLine) {
        let lineSplit = [];
        while (eventLine !== '') {
            let startIndex;
            let endIndex;
            let nextIndex;
            if (eventLine.startsWith(this._undefinedValue)) {
                lineSplit.push(this._undefinedValue);
                eventLine = eventLine.slice(this._undefinedValue.length + 1);
                continue;
            }
            else if (eventLine.startsWith(this._escapeString)) {
                startIndex = 1;
                for (let actIndex = startIndex; actIndex < eventLine.length; actIndex++) {
                    if (eventLine.charAt(actIndex) == this._escapeString &&
                        eventLine.charAt(actIndex - 1) !== '\\') {
                        endIndex = actIndex;
                        nextIndex = endIndex + 2;
                        break;
                    }
                }
                if (endIndex === undefined || nextIndex === undefined) {
                    throw LogParser.PARSING_ERROR;
                }
            }
            else {
                startIndex = 0;
                if (eventLine.indexOf(' ') === -1) {
                    endIndex = eventLine.length;
                }
                else {
                    endIndex = eventLine.indexOf(' ');
                }
                nextIndex = endIndex + 1;
            }
            lineSplit.push(eventLine
                .slice(startIndex, endIndex)
                .replace(new RegExp("\\\\'", 'g'), "'"));
            eventLine = eventLine.slice(nextIndex);
        }
        return lineSplit;
    }
    static eventLogAttributeOf(key, value) {
        switch (value) {
            case 'true':
                return new _EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_3__.BooleanAttribute(true, key);
            case 'false':
                return new _EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_3__.BooleanAttribute(false, key);
        }
        if (value.includes('T') || value.includes(':') || value.includes('-')) {
            const timestamp = Date.parse(value);
            if (!isNaN(timestamp)) {
                return new _EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_3__.DateAttribute(new Date(timestamp), key);
            }
        }
        if (value.includes('.') || value.includes(',')) {
            const asFloat = parseFloat(value);
            if (!isNaN(asFloat)) {
                return new _EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_3__.FloatAttribute(asFloat, key);
            }
        }
        const asInt = parseInt(value);
        if (!isNaN(asInt)) {
            return new _EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_3__.IntAttribute(asInt, key);
        }
        return new _EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_3__.StringAttribute(value, key);
    }
    static indexOfTokenIfExists(lines, token) {
        const indexOfToken = lines.indexOf(token);
        if (indexOfToken === -1) {
            throw LogParser.PARSING_ERROR;
        }
        return indexOfToken;
    }
    static nextKeyword(keywordIndices, actKeyWord) {
        const result = Math.min(...keywordIndices.filter(value => value > actKeyWord));
        if (isNaN(result)) {
            throw LogParser.PARSING_ERROR;
        }
        return result;
    }
}
LogParser.PARSING_ERROR = new Error('given .type log string can not be parsed');


/***/ }),

/***/ 968:
/*!*********************************************!*\
  !*** ./src/app/classes/parser/xesParser.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XesParser": () => (/* binding */ XesParser)
/* harmony export */ });
/* harmony import */ var _EventLog_eventlog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EventLog/eventlog */ 2798);
/* harmony import */ var xml2js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xml2js */ 944);
/* harmony import */ var xml2js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(xml2js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _EventLog_classifier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../EventLog/classifier */ 9317);
/* harmony import */ var _EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../EventLog/eventlogattribute */ 1367);
/* harmony import */ var _EventLog_trace__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../EventLog/trace */ 9484);
/* harmony import */ var _EventLog_event__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../EventLog/event */ 3594);






class XesParser {
    constructor() {
        this._logToken = 'LOG';
        this._attributesToken = '$';
        this._extensionToken = 'EXTENSION';
        this._classifierToken = 'CLASSIFIER';
        this._globalToken = 'GLOBAL';
        this._traceToken = 'TRACE';
        this._eventToken = 'EVENT';
        this._scopeToken = 'SCOPE';
        this._stringAttributeToken = 'STRING';
        this._dateAttributeToken = 'DATE';
        this._intAttributeToken = 'INT';
        this._floatAttributeToken = 'FLOAT';
        this._booleanAttributeToken = 'BOOLEAN';
        this._nameToken = 'NAME';
        this._keysToken = 'KEYS';
        this._keyToken = 'KEY';
        this._valueToken = 'VALUE';
        this._activityEventLogAttributeKey = 'concept:name';
        this._eventScopeValue = 'event';
        this._traceScopeValue = 'trace';
        this._allXesElements = [
            this._stringAttributeToken,
            this._dateAttributeToken,
            this._intAttributeToken,
            this._floatAttributeToken,
            this._booleanAttributeToken,
        ];
    }
    /**
     * Liest einen String im Xes-Format ein und wandelt es in dieintern verwendete Repräsentation als {@link EventLog} um
     *
     * @param xmlString String im Xes-Format, der geparst werden soll
     * @return interne Darstellung als {@link EventLog}
     */
    parse(xmlString) {
        const parser = new xml2js__WEBPACK_IMPORTED_MODULE_1__.Parser({ strict: false, trim: true });
        let parsedXmlObj = undefined;
        parser.parseString(xmlString, (err, result) => {
            if (err == null) {
                parsedXmlObj = result;
            }
            else {
                throw XesParser.PARSING_ERROR;
            }
        });
        if (parsedXmlObj == null) {
            throw XesParser.PARSING_ERROR;
        }
        try {
            return this.convertToEventLog(parsedXmlObj);
        }
        catch (e) {
            throw XesParser.PARSING_ERROR;
        }
    }
    convertToEventLog(result) {
        if (result == null || result[this._logToken] == null) {
            return new _EventLog_eventlog__WEBPACK_IMPORTED_MODULE_0__.EventLog([], [], [], [], []);
        }
        const logObj = result[this._logToken];
        const logElements = this.readElementsOfAttribute(logObj);
        const extensions = this.convertToExtensions(logObj[this._extensionToken]);
        if (logElements == null || extensions == null) {
            throw XesParser.PARSING_ERROR;
        }
        const classifiers = this.convertToClassifiers(logObj[this._classifierToken]);
        const globalAttributes = logObj[this._globalToken];
        const globalEventAttributes = this.convertToGlobalAttributes(this._eventScopeValue, globalAttributes);
        const globalTraceAttributes = this.convertToGlobalAttributes(this._traceScopeValue, globalAttributes);
        const traces = this.convertToTraces(logObj[this._traceToken]);
        const logAttributes = this.extractEventLogAttributes(logObj);
        return new _EventLog_eventlog__WEBPACK_IMPORTED_MODULE_0__.EventLog(classifiers, globalEventAttributes, globalTraceAttributes, traces, logAttributes);
    }
    readElementsOfAttribute(objWithAttributes) {
        const attributeToValueMap = new Map();
        const attributesObj = objWithAttributes[this._attributesToken];
        if (attributesObj != null) {
            Object.entries(attributesObj)
                .filter(value => value.length == 2)
                .forEach(attribute => attributeToValueMap.set(attribute[0], attribute[1]));
        }
        return attributeToValueMap;
    }
    convertToExtensions(extensionsObj) {
        if (extensionsObj == null) {
            return new Map();
        }
        return extensionsObj.map((extensionsObj) => this.readElementsOfAttribute(extensionsObj));
    }
    convertToClassifiers(classifiersObj) {
        if (classifiersObj == null) {
            return [];
        }
        return classifiersObj
            .map((classifierObj) => this.readElementsOfAttribute(classifierObj))
            .map((elementsMap) => new _EventLog_classifier__WEBPACK_IMPORTED_MODULE_2__.Classifier(elementsMap.get(this._nameToken), elementsMap.get(this._keysToken).split(' ')));
    }
    convertToGlobalAttributes(scope, globalAttributes) {
        if (globalAttributes == null) {
            return [];
        }
        const result = globalAttributes
            .filter((scopedAttributes) => this.readElementsOfAttribute(scopedAttributes).get(this._scopeToken) === scope)
            .map((scopedAttributes) => this.extractEventLogAttributes(scopedAttributes))[0];
        return result != null ? result : [];
    }
    convertToTraces(tracesObj) {
        if (tracesObj == null) {
            return [];
        }
        return tracesObj
            .map((traceObj, caseId) => this.convertToTrace(traceObj, caseId))
            .filter((trace) => trace != null);
    }
    convertToTrace(traceObj, caseId) {
        if (traceObj == null) {
            return undefined;
        }
        const attributes = this.extractEventLogAttributes(traceObj);
        const extractedCaseId = XesParser.extractCaseId(attributes);
        const events = this.convertToEvents(traceObj[this._eventToken]);
        return new _EventLog_trace__WEBPACK_IMPORTED_MODULE_4__.Trace(attributes, events, extractedCaseId ? extractedCaseId : caseId);
    }
    convertToEvents(eventsObj) {
        if (eventsObj == null) {
            return [];
        }
        return eventsObj
            .map((eventObj) => this.convertToEvent(eventObj))
            .filter((event) => event != null);
    }
    convertToEvent(eventObj) {
        if (eventObj == null) {
            return undefined;
        }
        const eventLogAttributes = this.extractEventLogAttributes(eventObj);
        const activityArr = eventLogAttributes
            .filter(eventLogAttribute => eventLogAttribute.key.toLowerCase() ===
            this._activityEventLogAttributeKey)
            .map(eventLogAttribute => eventLogAttribute.value);
        if (activityArr.length !== 1) {
            throw XesParser.PARSING_ERROR;
        }
        const eventLogAttributesWithoutActivity = eventLogAttributes.filter(eventLogAttribute => eventLogAttribute.key.toLowerCase() !==
            this._activityEventLogAttributeKey);
        return new _EventLog_event__WEBPACK_IMPORTED_MODULE_5__.Event(eventLogAttributesWithoutActivity, activityArr[0]);
    }
    extractEventLogAttributes(eventObj) {
        if (eventObj == null) {
            return [];
        }
        return Object.entries(eventObj)
            .filter(value => value.length == 2)
            .filter(value => this._allXesElements.includes(value[0]))
            .map(value => this.extractEventLogAttributesOfType(value[0], value[1]))
            .flatMap(attributesPerType => attributesPerType);
    }
    extractEventLogAttributesOfType(type, attributes) {
        if (attributes == null) {
            return [];
        }
        const directAttributes = attributes
            .map((attribute) => attribute[this._attributesToken])
            .filter((attribute) => attribute[this._valueToken].trim() !== '' &&
            attribute[this._keyToken].trim() !== '')
            .map((attribute) => this.buildAttribute(type, attribute[this._valueToken], attribute[this._keyToken]))
            .filter((attribute) => attribute != null);
        const subAttributes = attributes
            .map((attribute) => attribute[type])
            .flatMap((subAttribute) => this.extractEventLogAttributesOfType(type, subAttribute));
        return directAttributes.concat(subAttributes);
    }
    buildAttribute(type, value, key) {
        switch (type) {
            case this._stringAttributeToken:
                return new _EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_3__.StringAttribute(value, key);
            case this._dateAttributeToken:
                return new _EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_3__.DateAttribute(new Date(value), key);
            case this._intAttributeToken:
                return new _EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_3__.IntAttribute(Number(value), key);
            case this._floatAttributeToken:
                return new _EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_3__.FloatAttribute(Number(value), key);
            case this._booleanAttributeToken:
                return new _EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_3__.BooleanAttribute(Boolean(value), key);
            default:
                console.error('unknown attribute type ' +
                    type +
                    ' with value ' +
                    value +
                    ' will be ignored');
                return undefined;
        }
    }
    static extractCaseId(attributes) {
        const filterAttributes = attributes.filter(attr => attr.key === 'concept:name' || attr.key === 'case-id');
        if (filterAttributes.length > 0) {
            return parseInt(filterAttributes[0].value);
        }
        return undefined;
    }
}
XesParser.PARSING_ERROR = new Error('given xes string can not be parsed');


/***/ }),

/***/ 9481:
/*!*******************************************************************************!*\
  !*** ./src/app/components/change-view-button/change-view-button.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChangeViewButtonComponent": () => (/* binding */ ChangeViewButtonComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/menu */ 2796);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6362);




function ChangeViewButtonComponent_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ChangeViewButtonComponent_button_4_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.changeView(ctx_r4.classReference.valueChainView); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Value-Chain ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ChangeViewButtonComponent_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ChangeViewButtonComponent_button_5_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.changeView(ctx_r6.classReference.directlyFollowsGraphView); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Directly-Follows-Graph ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ChangeViewButtonComponent_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ChangeViewButtonComponent_button_6_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.changeView(ctx_r8.classReference.logInformationView); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Log-Information ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class ChangeViewButtonComponent {
    constructor() {
        this.buttonText = 'Change View';
        this.changeViewEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        this.classReference = ChangeViewButtonComponent;
        this.currentView = ChangeViewButtonComponent.valueChainView;
    }
    changeView(nextView) {
        this.changeViewEvent.emit(nextView);
        this.currentView = nextView;
    }
}
ChangeViewButtonComponent.valueChainView = 'valueChainView';
ChangeViewButtonComponent.directlyFollowsGraphView = 'directlyFollowsGraphView';
ChangeViewButtonComponent.logInformationView = 'logInformationView';
ChangeViewButtonComponent.ɵfac = function ChangeViewButtonComponent_Factory(t) { return new (t || ChangeViewButtonComponent)(); };
ChangeViewButtonComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ChangeViewButtonComponent, selectors: [["app-change-view-button"]], inputs: { buttonText: "buttonText" }, outputs: { changeViewEvent: "changeViewEvent" }, decls: 7, vars: 5, consts: [[1, "switch-view-button", 3, "mat-menu-trigger-for"], ["switchViewMenu", "matMenu"], ["mat-menu-item", "", 3, "click", 4, "ngIf"], ["mat-menu-item", "", 3, "click"]], template: function ChangeViewButtonComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-menu", null, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ChangeViewButtonComponent_button_4_Template, 2, 0, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ChangeViewButtonComponent_button_5_Template, 2, 0, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ChangeViewButtonComponent_button_6_Template, 2, 0, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mat-menu-trigger-for", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.buttonText, "\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.currentView !== ctx.classReference.valueChainView);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.currentView !== ctx.classReference.directlyFollowsGraphView);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.currentView !== ctx.classReference.logInformationView);
    } }, directives: [_angular_material_menu__WEBPACK_IMPORTED_MODULE_1__.MatMenuTrigger, _angular_material_menu__WEBPACK_IMPORTED_MODULE_1__.MatMenu, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_material_menu__WEBPACK_IMPORTED_MODULE_1__.MatMenuItem], styles: [".switch-view-button[_ngcontent-%COMP%] {\n  font-family: \"Courier New\", sans-serif;\n  border-color: grey;\n  text-align: center;\n  padding: 15px 20px;\n  font-size: 16px;\n  margin: 10px;\n  background-color: #7f7f7f;\n  color: white;\n}\n\n.switch-view-button[_ngcontent-%COMP%]:hover {\n  border-color: black;\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYW5nZS12aWV3LWJ1dHRvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHNDQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLFlBQUE7QUFDSjs7QUFFQTtFQUNJLG1CQUFBO0VBQ0EsZUFBQTtBQUNKIiwiZmlsZSI6ImNoYW5nZS12aWV3LWJ1dHRvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zd2l0Y2gtdmlldy1idXR0b24ge1xyXG4gICAgZm9udC1mYW1pbHk6IFwiQ291cmllciBOZXdcIiwgc2Fucy1zZXJpZjtcclxuICAgIGJvcmRlci1jb2xvcjogZ3JleTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDE1cHggMjBweDtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIG1hcmdpbjogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3ZjdmN2Y7O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uc3dpdGNoLXZpZXctYnV0dG9uOmhvdmVyIHtcclxuICAgIGJvcmRlci1jb2xvcjogYmxhY2s7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ 3117:
/*!***************************************************************************************!*\
  !*** ./src/app/components/directly-follows-graph/directly-follows-graph.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DirectlyFollowsGraphComponent": () => (/* binding */ DirectlyFollowsGraphComponent)
/* harmony export */ });
/* harmony import */ var src_app_services_views_directly_follows_graph_display_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/views/directly-follows-graph/display.service */ 5860);
/* harmony import */ var src_app_services_views_directly_follows_graph_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/views/directly-follows-graph/layout.service */ 5806);
/* harmony import */ var src_app_services_views_directly_follows_graph_svg_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/views/directly-follows-graph/svg.service */ 8409);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);








const _c0 = ["directlyFollowsGraph"];
class DirectlyFollowsGraphComponent {
    constructor(_layoutService, _svgService, _displayService) {
        this._layoutService = _layoutService;
        this._svgService = _svgService;
        this._displayService = _displayService;
        this.heightPx = 390;
        this.widthPx = 100;
        this._graphSubscription = this._displayService.graph$.subscribe(graph => {
            this._graph = graph;
            this._layoutService.layout(this._graph);
            this.draw();
        });
        this._directionSubscription =
            this._displayService.verticalDirection$.subscribe(direction => this.draw());
    }
    ngAfterViewInit() {
        var _a;
        this._svg = (_a = this.directlyFollowsGraph) === null || _a === void 0 ? void 0 : _a.nativeElement;
        this._svg.onmousedown = event => {
            this.processMouseDown(event);
        };
    }
    processMouseDown(event) {
        var _a, _b, _c, _d, _e;
        event.preventDefault();
        this.calcGraphSize();
        let target = event.target;
        this._draggingVertex = (_a = this._graph) === null || _a === void 0 ? void 0 : _a.vertices.find(vertex => vertex.activityName === target.getAttribute('name'));
        let current;
        let mouseStart;
        if (this._displayService.verticalDirection) {
            current = (_c = (_b = this._draggingVertex) === null || _b === void 0 ? void 0 : _b.svgElement) === null || _c === void 0 ? void 0 : _c.getAttribute('x');
            mouseStart = event.clientX;
        }
        else {
            current = (_e = (_d = this._draggingVertex) === null || _d === void 0 ? void 0 : _d.svgElement) === null || _e === void 0 ? void 0 : _e.getAttribute('y');
            mouseStart = event.clientY;
        }
        if (this._svg === undefined || current === undefined)
            return;
        this._svg.onmouseup = event => {
            this.processMouseUp(event);
        };
        this._svg.onmousemove = event => {
            this.processMouseMove(event, current, mouseStart);
        };
    }
    processMouseMove(event, current, mouseStart) {
        event.preventDefault();
        if (this._draggingVertex === undefined ||
            this._draggingVertex.svgElement === undefined ||
            this._graph === undefined ||
            current === undefined ||
            current === null)
            return;
        if (this._displayService.verticalDirection) {
            let x = +current + event.clientX - mouseStart;
            this._draggingVertex.svgElement.setAttribute('x', x.toString());
        }
        else {
            let y = +current + event.clientY - mouseStart;
            this._draggingVertex.svgElement.setAttribute('y', y.toString());
        }
        this._svgService.updateLayer(this._draggingVertex, this._graph);
        this.calcGraphSize();
    }
    processMouseUp(event) {
        event.preventDefault();
        if (this._svg !== undefined)
            this._svg.onmousemove = null;
        this._draggingVertex = undefined;
    }
    ngOnDestroy() {
        this._graphSubscription.unsubscribe();
        this._directionSubscription.unsubscribe();
    }
    draw() {
        if (this.directlyFollowsGraph === undefined) {
            console.debug('drawing area not ready yet');
            return;
        }
        this.clearDrawingArea();
        const svgElements = this._svgService.createSvgElements(this._displayService.graph);
        for (const svgElement of svgElements) {
            this.directlyFollowsGraph.nativeElement.appendChild(svgElement);
        }
        this.calcGraphSize();
    }
    clearDrawingArea() {
        var _a;
        this.heightPx = 390;
        this.widthPx = 100;
        const drawingArea = (_a = this.directlyFollowsGraph) === null || _a === void 0 ? void 0 : _a.nativeElement;
        if ((drawingArea === null || drawingArea === void 0 ? void 0 : drawingArea.childElementCount) === undefined) {
            return;
        }
        while ((drawingArea === null || drawingArea === void 0 ? void 0 : drawingArea.childElementCount) > 0) {
            drawingArea.removeChild(drawingArea.lastChild);
        }
    }
    calcGraphSize() {
        if (this._graph !== undefined) {
            this.calcGraphWidth(this._graph);
            this.calcGraphHeight(this._graph);
        }
    }
    calcGraphWidth(graph) {
        if (this._displayService.verticalDirection)
            this.widthPx =
                (graph.getMaxPosition() + 1) * this._svgService.offsetXValue;
        else
            this.widthPx = graph.getMaxLayer() * this._svgService.offsetXValue;
        if (this.directlyFollowsGraph !== undefined) {
            let drawingArea = document.getElementsByClassName('drawingArea');
            if (drawingArea !== undefined)
                this.widthPx = Math.max(this.widthPx, drawingArea[0].getBoundingClientRect().width * 0.95);
        }
    }
    calcGraphHeight(graph) {
        if (this._displayService.verticalDirection)
            this.heightPx = graph.getMaxLayer() * this._svgService.offsetYValue;
        else
            this.heightPx =
                (graph.getMaxPosition() + 1) * this._svgService.offsetYValue;
        if (this.directlyFollowsGraph !== undefined) {
            let drawingArea = document.getElementsByClassName('drawingArea');
            if (drawingArea !== undefined)
                this.heightPx = Math.max(this.heightPx, drawingArea[0].getBoundingClientRect().height * 0.95);
        }
    }
}
DirectlyFollowsGraphComponent.ɵfac = function DirectlyFollowsGraphComponent_Factory(t) { return new (t || DirectlyFollowsGraphComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_views_directly_follows_graph_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_views_directly_follows_graph_svg_service__WEBPACK_IMPORTED_MODULE_2__.SvgService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_views_directly_follows_graph_display_service__WEBPACK_IMPORTED_MODULE_0__.DirectlyFollowsGraphService)); };
DirectlyFollowsGraphComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: DirectlyFollowsGraphComponent, selectors: [["app-directly-follows-graph"]], viewQuery: function DirectlyFollowsGraphComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.directlyFollowsGraph = _t.first);
    } }, decls: 3, vars: 4, consts: [[1, "canvas"], ["directlyFollowsGraph", ""]], template: function DirectlyFollowsGraphComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "svg", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, " >\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("height", ctx.heightPx, "px")("width", ctx.widthPx, "px");
    } }, styles: [".canvas[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 400px;\n  font: 15px sans-Serif;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGx5LWZvbGxvd3MtZ3JhcGguY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0FBQ0oiLCJmaWxlIjoiZGlyZWN0bHktZm9sbG93cy1ncmFwaC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYW52YXMge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDQwMHB4O1xyXG4gICAgZm9udDogMTVweCBzYW5zLVNlcmlmO1xyXG59Il19 */"] });


/***/ }),

/***/ 7606:
/*!*****************************************************************!*\
  !*** ./src/app/components/drawingArea/drawingArea.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DrawingAreaComponent": () => (/* binding */ DrawingAreaComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var src_app_services_views_directly_follows_graph_display_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/views/directly-follows-graph/display.service */ 5860);
/* harmony import */ var src_app_services_common_data_eventlog_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/common/data/eventlog-data.service */ 9755);
/* harmony import */ var _change_view_button_change_view_button_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../change-view-button/change-view-button.component */ 9481);
/* harmony import */ var _services_common_trace_case_selection_service_trace_case_selection_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/common/trace-case-selection-service/trace-case-selection.service */ 62);
/* harmony import */ var _services_views_loading_loading_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/views/loading/loading.service */ 9270);
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/flex-layout/flex */ 5434);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _switch_direction_button_switch_direction_button_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../switch-direction-button/switch-direction-button.component */ 2548);
/* harmony import */ var _filter_area_filter_area_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../filter-area/filter-area.component */ 8047);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-spinner */ 4742);
/* harmony import */ var _value_chain_value_chain_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../value-chain/value-chain.component */ 1688);
/* harmony import */ var _directly_follows_graph_directly_follows_graph_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../directly-follows-graph/directly-follows-graph.component */ 3117);
/* harmony import */ var _log_information_view_log_information_view_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../log-information-view/log-information-view.component */ 7770);




















const _c0 = ["drawingArea"];

function DrawingAreaComponent_app_switch_direction_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "app-switch-direction-button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("switchDirectionEvent", function DrawingAreaComponent_app_switch_direction_button_4_Template_app_switch_direction_button_switchDirectionEvent_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return ctx_r4.switchDirection();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}

function DrawingAreaComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "mat-progress-spinner", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("mode", "indeterminate");
  }
}

function DrawingAreaComponent_app_log_information_view_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "app-log-information-view");
  }
}

class DrawingAreaComponent {
  constructor(_directlyFollowsGraphService, _traceCaseSelectionService, _eventlogDataService, loader) {
    this._directlyFollowsGraphService = _directlyFollowsGraphService;
    this._traceCaseSelectionService = _traceCaseSelectionService;
    this._eventlogDataService = _eventlogDataService;
    this.loader = loader;
    this.loading$ = this.loader.loading$;
    this.canvasWidth = 0;
    this.valueChainHidden = false;
    this.directlyFollowsGraphHidden = true;
    this.logInformationHidden = true;
    this.filterChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_10__.EventEmitter();
  }

  ngAfterContentChecked() {
    var _a;

    if (this.drawingArea != undefined) {
      this.canvasWidth = (_a = this.drawingArea) === null || _a === void 0 ? void 0 : _a.nativeElement.clientWidth;
    }
  }

  switchDirection() {
    this._directlyFollowsGraphService.switchDirection();
  }

  changeView(nextView) {
    switch (nextView) {
      case _change_view_button_change_view_button_component__WEBPACK_IMPORTED_MODULE_2__.ChangeViewButtonComponent.valueChainView:
        this.valueChainHidden = false;
        this.directlyFollowsGraphHidden = true;
        this.logInformationHidden = true;
        break;

      case _change_view_button_change_view_button_component__WEBPACK_IMPORTED_MODULE_2__.ChangeViewButtonComponent.directlyFollowsGraphView:
        this.valueChainHidden = true;
        this.directlyFollowsGraphHidden = false;
        this.logInformationHidden = true;
        break;

      case _change_view_button_change_view_button_component__WEBPACK_IMPORTED_MODULE_2__.ChangeViewButtonComponent.logInformationView:
        this.directlyFollowsGraphHidden = true;
        this.valueChainHidden = true;
        this.logInformationHidden = false;
        break;
    }
  }

  applyFilter(FilterArgument) {
    this._eventlogDataService.changeFilter(FilterArgument);

    this.filterChanged.emit(FilterArgument);
  }

  clickDrawArea() {
    if (this.directlyFollowsGraphHidden) this._traceCaseSelectionService.selectTraceCaseIds([]);
  }

}

DrawingAreaComponent.ɵfac = function DrawingAreaComponent_Factory(t) {
  return new (t || DrawingAreaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_services_views_directly_follows_graph_display_service__WEBPACK_IMPORTED_MODULE_0__.DirectlyFollowsGraphService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_common_trace_case_selection_service_trace_case_selection_service__WEBPACK_IMPORTED_MODULE_3__.TraceCaseSelectionService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_services_common_data_eventlog_data_service__WEBPACK_IMPORTED_MODULE_1__.EventlogDataService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_views_loading_loading_service__WEBPACK_IMPORTED_MODULE_4__.LoadingService));
};

DrawingAreaComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: DrawingAreaComponent,
  selectors: [["app-drawing-area"]],
  viewQuery: function DrawingAreaComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c0, 5);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.drawingArea = _t.first);
    }
  },
  outputs: {
    filterChanged: "filterChanged"
  },
  decls: 13,
  vars: 8,
  consts: [["fxLayout", "row"], [1, "card"], [3, "changeViewEvent"], [3, "switchDirectionEvent", 4, "ngIf"], [3, "filterChanged"], ["class", "loading-screen", 4, "ngIf"], [1, "drawingArea", 3, "click"], ["drawingArea", ""], [1, "padding", "full-size", 3, "clientWidth", "hidden"], [1, "padding", "full-size", 3, "hidden"], [4, "ngIf"], [3, "switchDirectionEvent"], [1, "loading-screen"], [3, "mode"]],
  template: function DrawingAreaComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "app-change-view-button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("changeViewEvent", function DrawingAreaComponent_Template_app_change_view_button_changeViewEvent_3_listener($event) {
        return ctx.changeView($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, DrawingAreaComponent_app_switch_direction_button_4_Template, 1, 0, "app-switch-direction-button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "app-filter-area", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("filterChanged", function DrawingAreaComponent_Template_app_filter_area_filterChanged_5_listener($event) {
        return ctx.applyFilter($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](6, DrawingAreaComponent_div_6_Template, 2, 1, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](7, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "div", 6, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function DrawingAreaComponent_Template_div_click_8_listener() {
        return ctx.clickDrawArea();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](10, "app-value-chain", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](11, "app-directly-follows-graph", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](12, DrawingAreaComponent_app_log_information_view_12_Template, 1, 0, "app-log-information-view", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.directlyFollowsGraphHidden);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](7, 6, ctx.loading$));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("clientWidth", ctx.canvasWidth)("hidden", ctx.valueChainHidden);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("hidden", ctx.directlyFollowsGraphHidden);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.logInformationHidden);
    }
  },
  directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_11__.DefaultLayoutDirective, _change_view_button_change_view_button_component__WEBPACK_IMPORTED_MODULE_2__.ChangeViewButtonComponent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _switch_direction_button_switch_direction_button_component__WEBPACK_IMPORTED_MODULE_5__.SwitchDirectionButtonComponent, _filter_area_filter_area_component__WEBPACK_IMPORTED_MODULE_6__.FilterAreaComponent, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__.MatProgressSpinner, _value_chain_value_chain_component__WEBPACK_IMPORTED_MODULE_7__.ValueChainComponent, _directly_follows_graph_directly_follows_graph_component__WEBPACK_IMPORTED_MODULE_8__.DirectlyFollowsGraphComponent, _log_information_view_log_information_view_component__WEBPACK_IMPORTED_MODULE_9__.LogInformationViewComponent],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.AsyncPipe],
  styles: [".drawingArea[_ngcontent-%COMP%] {\n  height: 350px;\n  border: dotted lightgrey;\n  overflow: auto;\n  resize: vertical;\n  margin-top: 15px;\n}\n\n.card[_ngcontent-%COMP%] {\n  border: rgba(0, 0, 0, 0) 1px solid;\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.loading-screen[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n\nmat-progress-spinner[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 5;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyYXdpbmdBcmVhLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLHdCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFDQTtFQUNJLGtDQUFBO0VBQ0EsNkVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQUVKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxnQ0FBQTtFQUNBLFVBQUE7QUFDSiIsImZpbGUiOiJkcmF3aW5nQXJlYS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kcmF3aW5nQXJlYSB7XHJcbiAgICBoZWlnaHQ6IDM1MHB4O1xyXG4gICAgYm9yZGVyOiBkb3R0ZWQgbGlnaHRncmV5O1xyXG4gICAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgICByZXNpemU6IHZlcnRpY2FsO1xyXG4gICAgbWFyZ2luLXRvcDogMTVweDtcclxufVxyXG4uY2FyZCB7XHJcbiAgICBib3JkZXI6IHJnYmEoMCwgMCwgMCwgMC4wKSAxcHggc29saWQ7XHJcbiAgICBib3gtc2hhZG93OiAwIDJweCA1cHggMCByZ2JhKDAsIDAsIDAsIDAuMTYpLCAwIDJweCAxMHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEyKTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcblxyXG4ubG9hZGluZy1zY3JlZW4ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbm1hdC1wcm9ncmVzcy1zcGlubmVyIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgICB6LWluZGV4OiA1O1xyXG59XHJcbiJdfQ== */"]
});

/***/ }),

/***/ 389:
/*!*********************************************************************!*\
  !*** ./src/app/components/export-button/export-button.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExportButtonComponent": () => (/* binding */ ExportButtonComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_views_value_chain_display_service_display_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/views/value-chain/display-service/display.service */ 4515);
/* harmony import */ var _services_file_operations_log_log_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/file-operations/log/log.service */ 8994);
/* harmony import */ var _services_views_directly_follows_graph_display_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/views/directly-follows-graph/display.service */ 5860);
/* harmony import */ var _services_file_operations_xes_xes_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/file-operations/xes/xes.service */ 6801);
/* harmony import */ var _services_common_data_eventlog_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/common/data/eventlog-data.service */ 9755);
/* harmony import */ var _services_views_directly_follows_graph_svg_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/views/directly-follows-graph/svg.service */ 8409);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! file-saver */ 5226);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _services_common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/common/svg-service/svg.service */ 7544);
/* harmony import */ var _services_common_trace_case_selection_service_trace_case_selection_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/common/trace-case-selection-service/trace-case-selection.service */ 62);
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/flex-layout/flex */ 5434);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/menu */ 2796);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ 5590);
/* harmony import */ var _export_menu_item_export_menu_item_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./export-menu-item/export-menu-item.component */ 148);























class ExportButtonComponent {
    constructor(_eventLogDataService, _displayService, _traceCaseSelectionService, _logService, _directlyFollowsGraphService, _xesService, _valueChainSvgService, _directlyFollowsGraphSvgService) {
        this._eventLogDataService = _eventLogDataService;
        this._displayService = _displayService;
        this._traceCaseSelectionService = _traceCaseSelectionService;
        this._logService = _logService;
        this._directlyFollowsGraphService = _directlyFollowsGraphService;
        this._xesService = _xesService;
        this._valueChainSvgService = _valueChainSvgService;
        this._directlyFollowsGraphSvgService = _directlyFollowsGraphSvgService;
        this.processImport = new _angular_core__WEBPACK_IMPORTED_MODULE_10__.EventEmitter();
        this._selectedTraceCaseIds = [];
        this._traceCaseSelectionService.selectedTraceCaseIds$.subscribe(selectedTraceCaseIds => {
            this._selectedTraceCaseIds = selectedTraceCaseIds;
        });
    }
    exportLog(completeEventLog) {
        this.saveFile(this._logService.generate(completeEventLog
            ? this._eventLogDataService.eventLog
            : this._eventLogDataService
                .eventLogWithSelectedOrNothingWhenNothingSelected), 'text/plain;charset=utf-8', true, 'event.log');
    }
    exportXes(completeEventLog) {
        this.saveFile(this._xesService.generate(completeEventLog
            ? this._eventLogDataService.eventLog
            : this._eventLogDataService
                .eventLogWithSelectedOrNothingWhenNothingSelected), 'text/plain;charset=utf-8', true, 'event.xes');
    }
    processReimport() {
        this.processImport.emit([
            'log',
            this._logService.generate(this._eventLogDataService
                .eventLogWithSelectedOrNothingWhenNothingSelected),
        ]);
        this._traceCaseSelectionService.selectTraceCaseIds([]);
    }
    exportSvgValueChain() {
        const elements = this._valueChainSvgService.createSvgElements(this._displayService.diagram, this._selectedTraceCaseIds, true, true);
        this.saveFile(this.getSvg(elements), 'text/plain;charset=utf-8', true, 'event.svg');
    }
    exportSvgDirectlyFollowsGraph() {
        const elements = this._directlyFollowsGraphSvgService.createSvgElements(this._directlyFollowsGraphService.graph);
        this.saveFile(this.getSvg(elements), 'text/plain;charset=utf-8', true, 'event.svg');
    }
    getSvg(elements) {
        let svg = '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">';
        elements.forEach(element => {
            svg += element.outerHTML;
        });
        svg += '</svg>';
        return svg;
    }
    saveFile(fileContent, fileType, datePrefix, fileName) {
        (0,file_saver__WEBPACK_IMPORTED_MODULE_6__.saveAs)(new Blob([fileContent], { type: fileType }), (datePrefix ? new Date().toLocaleString() + '_' : '') + fileName);
    }
    shouldDisableExport(selectedOnly) {
        if (this._eventLogDataService.eventLog.traces.length === 0) {
            return true;
        }
        if (selectedOnly && this._selectedTraceCaseIds.length === 0) {
            return true;
        }
        return false;
    }
}
ExportButtonComponent.ɵfac = function ExportButtonComponent_Factory(t) { return new (t || ExportButtonComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_common_data_eventlog_data_service__WEBPACK_IMPORTED_MODULE_4__.EventlogDataService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_views_value_chain_display_service_display_service__WEBPACK_IMPORTED_MODULE_0__.DisplayService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_common_trace_case_selection_service_trace_case_selection_service__WEBPACK_IMPORTED_MODULE_8__.TraceCaseSelectionService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_file_operations_log_log_service__WEBPACK_IMPORTED_MODULE_1__.LogService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_views_directly_follows_graph_display_service__WEBPACK_IMPORTED_MODULE_2__.DirectlyFollowsGraphService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_file_operations_xes_xes_service__WEBPACK_IMPORTED_MODULE_3__.XesService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_7__.SvgService.VALUE_CHAIN_INSTANCE), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_views_directly_follows_graph_svg_service__WEBPACK_IMPORTED_MODULE_5__.SvgService)); };
ExportButtonComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({ type: ExportButtonComponent, selectors: [["app-export-button"]], outputs: { processImport: "processImport" }, decls: 27, vars: 20, consts: [["fxLayout", "column", "fxLayoutAlign", "start center"], ["fxLayout", "row", "fxLayoutAlign", "center center", 1, "interactive-square", 3, "matMenuTriggerFor"], [1, "larger-icon"], ["exportMenu", "matMenu"], ["mat-menu-item", "", 3, "matMenuTriggerFor"], ["exportAsLog", "matMenu"], ["buttonText", "Complete Eventlog", 3, "disabled", "reimport", "exportFile", "processReimport"], ["buttonText", "Selected Cases", 3, "disabled", "reimport", "exportFile", "processReimport"], ["buttonText", "Selected Cases and Reimport", 3, "disabled", "reimport", "exportFile", "processReimport"], ["exportAsXes", "matMenu"], ["exportAsSvg", "matMenu"], ["buttonText", "Value-Chain", 3, "disabled", "reimport", "exportFile", "processReimport"], ["buttonText", "Directly-Follows-Graph", 3, "disabled", "reimport", "exportFile", "processReimport"]], template: function ExportButtonComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "mat-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, "file_download");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, " Export...\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "mat-menu", null, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](8, "as .log");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](10, "as .xes");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](11, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](12, "as .svg");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](13, "mat-menu", null, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](15, "app-export-menu-item", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("exportFile", function ExportButtonComponent_Template_app_export_menu_item_exportFile_15_listener() { return ctx.exportLog(true); })("processReimport", function ExportButtonComponent_Template_app_export_menu_item_processReimport_15_listener() { return ctx.processReimport(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "app-export-menu-item", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("exportFile", function ExportButtonComponent_Template_app_export_menu_item_exportFile_16_listener() { return ctx.exportLog(false); })("processReimport", function ExportButtonComponent_Template_app_export_menu_item_processReimport_16_listener() { return ctx.processReimport(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](17, "app-export-menu-item", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("exportFile", function ExportButtonComponent_Template_app_export_menu_item_exportFile_17_listener() { return ctx.exportLog(false); })("processReimport", function ExportButtonComponent_Template_app_export_menu_item_processReimport_17_listener() { return ctx.processReimport(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](18, "mat-menu", null, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](20, "app-export-menu-item", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("exportFile", function ExportButtonComponent_Template_app_export_menu_item_exportFile_20_listener() { return ctx.exportXes(true); })("processReimport", function ExportButtonComponent_Template_app_export_menu_item_processReimport_20_listener() { return ctx.processReimport(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](21, "app-export-menu-item", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("exportFile", function ExportButtonComponent_Template_app_export_menu_item_exportFile_21_listener() { return ctx.exportXes(false); })("processReimport", function ExportButtonComponent_Template_app_export_menu_item_processReimport_21_listener() { return ctx.processReimport(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](22, "app-export-menu-item", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("exportFile", function ExportButtonComponent_Template_app_export_menu_item_exportFile_22_listener() { return ctx.exportXes(false); })("processReimport", function ExportButtonComponent_Template_app_export_menu_item_processReimport_22_listener() { return ctx.processReimport(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](23, "mat-menu", null, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](25, "app-export-menu-item", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("exportFile", function ExportButtonComponent_Template_app_export_menu_item_exportFile_25_listener() { return ctx.exportSvgValueChain(); })("processReimport", function ExportButtonComponent_Template_app_export_menu_item_processReimport_25_listener() { return ctx.processReimport(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](26, "app-export-menu-item", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("exportFile", function ExportButtonComponent_Template_app_export_menu_item_exportFile_26_listener() { return ctx.exportSvgDirectlyFollowsGraph(); })("processReimport", function ExportButtonComponent_Template_app_export_menu_item_processReimport_26_listener() { return ctx.processReimport(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](6);
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](14);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](19);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("matMenuTriggerFor", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("matMenuTriggerFor", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("matMenuTriggerFor", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("matMenuTriggerFor", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx.shouldDisableExport(false))("reimport", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx.shouldDisableExport(true))("reimport", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx.shouldDisableExport(true))("reimport", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx.shouldDisableExport(false))("reimport", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx.shouldDisableExport(true))("reimport", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx.shouldDisableExport(true))("reimport", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx.shouldDisableExport(false))("reimport", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx.shouldDisableExport(false))("reimport", false);
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_11__.DefaultLayoutDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_11__.DefaultLayoutAlignDirective, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenuTrigger, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIcon, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenuItem, _export_menu_item_export_menu_item_component__WEBPACK_IMPORTED_MODULE_9__.ExportMenuItemComponent], styles: [".interactive-square[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  border: 5px solid dimgrey;\n  margin-bottom: 14px;\n}\n\n.interactive-square[_ngcontent-%COMP%]:hover {\n  border-color: black;\n  cursor: pointer;\n}\n\n.larger-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  width: 40px;\n  height: 40px;\n  color: dimgrey;\n}\n\n.interactive-square[_ngcontent-%COMP%]:hover   .larger-icon[_ngcontent-%COMP%] {\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4cG9ydC1idXR0b24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7QUFBSjs7QUFHQTtFQUNJLG1CQUFBO0VBQ0EsZUFBQTtBQUFKOztBQUdBO0VBQ0ksZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQUFKOztBQUdBO0VBQ0ksWUFBQTtBQUFKIiwiZmlsZSI6ImV4cG9ydC1idXR0b24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmludGVyYWN0aXZlLXNxdWFyZSB7XHJcbiAgICB3aWR0aDogMTAwcHg7XHJcbiAgICBoZWlnaHQ6IDEwMHB4O1xyXG4gICAgYm9yZGVyOiA1cHggc29saWQgZGltZ3JleTtcclxuICAgIG1hcmdpbi1ib3R0b206IDE0cHg7XHJcbn1cclxuXHJcbi5pbnRlcmFjdGl2ZS1zcXVhcmU6aG92ZXIge1xyXG4gICAgYm9yZGVyLWNvbG9yOiBibGFjaztcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmxhcmdlci1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgY29sb3I6IGRpbWdyZXk7XHJcbn1cclxuXHJcbi5pbnRlcmFjdGl2ZS1zcXVhcmU6aG92ZXIgLmxhcmdlci1pY29uIHtcclxuICAgIGNvbG9yOiBibGFjaztcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ 148:
/*!*****************************************************************************************!*\
  !*** ./src/app/components/export-button/export-menu-item/export-menu-item.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExportMenuItemComponent": () => (/* binding */ ExportMenuItemComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/menu */ 2796);



class ExportMenuItemComponent {
    constructor() {
        this.disabled = false;
        this.reimport = false;
        this.exportFile = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        this.processReimport = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    }
    processMouseClick(e) {
        this.exportFile.emit();
        if (this.reimport) {
            this.processReimport.emit();
        }
    }
}
ExportMenuItemComponent.ɵfac = function ExportMenuItemComponent_Factory(t) { return new (t || ExportMenuItemComponent)(); };
ExportMenuItemComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ExportMenuItemComponent, selectors: [["app-export-menu-item"]], inputs: { buttonText: "buttonText", disabled: "disabled", reimport: "reimport" }, outputs: { exportFile: "exportFile", processReimport: "processReimport" }, decls: 2, vars: 2, consts: [["mat-menu-item", "", 3, "disabled", "click"]], template: function ExportMenuItemComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ExportMenuItemComponent_Template_button_click_0_listener($event) { return ctx.processMouseClick($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("disabled", ctx.disabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.buttonText, "\n");
    } }, directives: [_angular_material_menu__WEBPACK_IMPORTED_MODULE_1__.MatMenuItem], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJleHBvcnQtbWVudS1pdGVtLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 8047:
/*!*****************************************************************!*\
  !*** ./src/app/components/filter-area/filter-area.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FilterAreaComponent": () => (/* binding */ FilterAreaComponent),
/* harmony export */   "FilterArgument": () => (/* binding */ FilterArgument)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/flex-layout/flex */ 5434);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button-toggle */ 1959);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ 5590);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ 9076);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ 3365);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/checkbox */ 1534);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 587);









class FilterArgument {
    constructor(filterValue, filterActivity, filterAttributeValues, matchCase) {
        this.filterValue = filterValue;
        this.filterActivity = filterActivity;
        this.filterAttributeValues = filterAttributeValues;
        this.matchCase = matchCase;
    }
}
class FilterAreaComponent {
    constructor() {
        this.filterChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        this._filterActivity = true;
        this._filterAttributeValues = false;
        this._filterUsed = false;
        this._matchCase = false;
        this._filterValue = '';
    }
    toggleMatchCase($event) {
        this._matchCase = $event.source.checked;
        if (this._filterUsed) {
            this.filterChanged.emit(new FilterArgument(this._filterValue, this._filterActivity, this._filterAttributeValues, this._matchCase));
        }
    }
    toggleFilter($event) {
        this._filterUsed = $event.source.checked;
        if (this._filterUsed) {
            this.filterChanged.emit(new FilterArgument(this._filterValue, this._filterActivity, this._filterAttributeValues, this._matchCase));
        }
        else {
            this.filterChanged.emit(new FilterArgument('', false, false, false));
        }
    }
    toggleActivity($event) {
        if (!this._filterAttributeValues && !this._filterActivity) {
            this._filterAttributeValues = true; // Eine Checkbox muss immer aktiv sein
        }
        if (!this._filterUsed) {
            return;
        }
        this.filterChanged.emit(new FilterArgument(this._filterValue, this._filterActivity, this._filterAttributeValues, this._matchCase));
    }
    toggleValues($event) {
        if (!this._filterAttributeValues && !this._filterActivity) {
            this._filterActivity = true; // Eine Checkbox muss immer aktiv sein
        }
        if (!this._filterUsed) {
            return;
        }
        this.filterChanged.emit(new FilterArgument(this._filterValue, this._filterActivity, this._filterAttributeValues, this._matchCase));
    }
    applyFilter(filterValue) {
        this._filterValue = filterValue;
        if (!this._filterUsed) {
            this._filterUsed = true;
        }
        this.filterChanged.emit(new FilterArgument(this._filterValue, this._filterActivity, this._filterAttributeValues, this._matchCase));
    }
}
FilterAreaComponent.ɵfac = function FilterAreaComponent_Factory(t) { return new (t || FilterAreaComponent)(); };
FilterAreaComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FilterAreaComponent, selectors: [["app-filter-area"]], outputs: { filterChanged: "filterChanged" }, decls: 17, vars: 4, consts: [[1, "card"], ["fxLayout", "row"], [1, "filter-button", 3, "checked", "change"], ["floatLabel", "always", 1, "filter-field"], ["fyLayout", "row", "fxLayoutAlign", "center end"], ["matInput", "", "placeholder", "Filter", 1, "filter-input", 3, "keyup"], ["filter", ""], [1, "filter-button-small", 3, "checked", "change"], ["inline", "true", 1, "icon-small"], ["fxLayout", "column", "fxLayoutAlign", "center", 1, "filter-checkboxes"], [3, "ngModel", "ngModelChange", "change"]], template: function FilterAreaComponent_Template(rf, ctx) { if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-button-toggle", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function FilterAreaComponent_Template_mat_button_toggle_change_2_listener($event) { return ctx.toggleFilter($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "filter_alt");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-form-field", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "input", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function FilterAreaComponent_Template_input_keyup_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8); return ctx.applyFilter(_r0.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-button-toggle", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function FilterAreaComponent_Template_mat_button_toggle_change_9_listener($event) { return ctx.toggleMatchCase($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Aa");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "mat-checkbox", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function FilterAreaComponent_Template_mat_checkbox_ngModelChange_13_listener($event) { return ctx._filterActivity = $event; })("change", function FilterAreaComponent_Template_mat_checkbox_change_13_listener($event) { return ctx.toggleActivity($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Filter Activity Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "mat-checkbox", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function FilterAreaComponent_Template_mat_checkbox_ngModelChange_15_listener($event) { return ctx._filterAttributeValues = $event; })("change", function FilterAreaComponent_Template_mat_checkbox_change_15_listener($event) { return ctx.toggleValues($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Filter Attribute Values");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", ctx._filterUsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", ctx._matchCase);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx._filterActivity);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx._filterAttributeValues);
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__.DefaultLayoutDirective, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_2__.MatButtonToggle, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormField, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__.DefaultLayoutAlignDirective, _angular_material_input__WEBPACK_IMPORTED_MODULE_5__.MatInput, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__.MatCheckbox, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel], styles: [".card[_ngcontent-%COMP%] {\n  margin-left: 30px;\n  margin-right: 30px;\n  border: rgba(0, 0, 0, 0) 1px solid;\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n}\n\n.filter-button[_ngcontent-%COMP%] {\n  margin: 10px;\n}\n\n.filter-button-small[_ngcontent-%COMP%] {\n  height: 32px;\n  width: 32px;\n}\n\n.icon-small[_ngcontent-%COMP%] {\n  position: absolute;\n  margin-top: -27px;\n  margin-left: -10px;\n  font-weight: 400;\n}\n\n.filter-field[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  margin-right: 30px;\n  width: 200px;\n}\n\n.filter-checkboxes[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  margin-right: 30px;\n}\n\n  .mat-button-toggle-checked {\n  color: #e31a1c !important;\n}\n\n  .mat-checkbox-checked.mat-accent .mat-checkbox-background, .mat-checkbox-indeterminate.mat-accent[_ngcontent-%COMP%]   .mat-checkbox-background[_ngcontent-%COMP%], .mat-accent[_ngcontent-%COMP%]   .mat-pseudo-checkbox-checked[_ngcontent-%COMP%], .mat-accent[_ngcontent-%COMP%]   .mat-pseudo-checkbox-indeterminate[_ngcontent-%COMP%], .mat-pseudo-checkbox-checked[_ngcontent-%COMP%], .mat-pseudo-checkbox-indeterminate[_ngcontent-%COMP%] {\n  background-color: #e31a1c !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlci1hcmVhLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtDQUFBO0VBQ0EsNkVBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBRUE7RUFDSSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQUNKOztBQUVBO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUFDSjs7QUFFQTtFQUNJLGlCQUFBO0VBQ0Esa0JBQUE7QUFDSjs7QUFFQTtFQUNJLHlCQUFBO0FBQ0o7O0FBRUE7RUFDSSxvQ0FBQTtBQUNKIiwiZmlsZSI6ImZpbHRlci1hcmVhLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDMwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbiAgICBib3JkZXI6IHJnYmEoMCwgMCwgMCwgMC4wKSAxcHggc29saWQ7XHJcbiAgICBib3gtc2hhZG93OiAwIDJweCA1cHggMCByZ2JhKDAsIDAsIDAsIDAuMTYpLCAwIDJweCAxMHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEyKTtcclxufVxyXG5cclxuLmZpbHRlci1idXR0b24ge1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG59XHJcblxyXG4uZmlsdGVyLWJ1dHRvbi1zbWFsbCB7XHJcbiAgICBoZWlnaHQ6IDMycHg7XHJcbiAgICB3aWR0aDogMzJweDtcclxufVxyXG5cclxuLmljb24tc21hbGwge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbWFyZ2luLXRvcDogLTI3cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogLTEwcHg7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG59XHJcblxyXG4uZmlsdGVyLWZpZWxkIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xyXG4gICAgd2lkdGg6IDIwMHB4O1xyXG59XHJcblxyXG4uZmlsdGVyLWNoZWNrYm94ZXMge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbn1cclxuXHJcbjo6bmctZGVlcCAubWF0LWJ1dHRvbi10b2dnbGUtY2hlY2tlZCB7XHJcbiAgICBjb2xvcjogcmdiKDIyNywgMjYsIDI4KSFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbjo6bmctZGVlcCAubWF0LWNoZWNrYm94LWNoZWNrZWQubWF0LWFjY2VudCAubWF0LWNoZWNrYm94LWJhY2tncm91bmQsIC5tYXQtY2hlY2tib3gtaW5kZXRlcm1pbmF0ZS5tYXQtYWNjZW50IC5tYXQtY2hlY2tib3gtYmFja2dyb3VuZCwgLm1hdC1hY2NlbnQgLm1hdC1wc2V1ZG8tY2hlY2tib3gtY2hlY2tlZCwgLm1hdC1hY2NlbnQgLm1hdC1wc2V1ZG8tY2hlY2tib3gtaW5kZXRlcm1pbmF0ZSwgLm1hdC1wc2V1ZG8tY2hlY2tib3gtY2hlY2tlZCwgLm1hdC1wc2V1ZG8tY2hlY2tib3gtaW5kZXRlcm1pbmF0ZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjI3LCAyNiwgMjgpICFpbXBvcnRhbnQ7XHJcbn0iXX0= */"] });


/***/ }),

/***/ 4662:
/*!*******************************************************!*\
  !*** ./src/app/components/footer/footer.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FooterComponent": () => (/* binding */ FooterComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class FooterComponent {
    constructor() { }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
FooterComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], decls: 37, vars: 0, consts: [[1, "footer-font"], ["href", "https://github.com/noahboerger"], ["href", "https://github.com/ThomasKaputa"], ["href", "https://github.com/TobStr90"], ["href", "https://github.com/eawetchy"], ["href", "https://github.com/yannikworthmann"], ["href", "https://www.fernuni-hagen.de/mi/fakultaet/lehrende/bergenthum/index.shtml"], ["href", "https://www.fernuni-hagen.de/ps/team/Jakub.Kovar.shtml"], ["href", "https://www.fernuni-hagen.de/service/impressum.shtml"], ["href", "https://www.fernuni-hagen.de/service/datenschutz.shtml"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " ...and I know you do too! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Developed by ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Noah B\u00F6rger");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, ", ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Thomas Kaputa");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, ", ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Tobias Stritzinger");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, ", ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Elisabeth Wetchy");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " and ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Yannik Worthmann");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " Supervised by ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Robin Bergenthum");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " and ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Jakub Kov\u00E1\u0159");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, " Fakult\u00E4t f\u00FCr Mathematik und Informatik ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, " Fernuni in Hagen, Germany ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Impressum");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, " \u00B7 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Datenschutz");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".footer-font[_ngcontent-%COMP%] {\n  text-align: right;\n  font-weight: 300;\n  font-size: 18px;\n  margin: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb3Rlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsU0FBQTtBQUNKIiwiZmlsZSI6ImZvb3Rlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mb290ZXItZm9udCB7XHJcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbiJdfQ== */"] });


/***/ }),

/***/ 7970:
/*!**************************************************************************************!*\
  !*** ./src/app/components/log-information-view/log-case/log-trace-case.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogTraceCaseComponent": () => (/* binding */ LogTraceCaseComponent)
/* harmony export */ });
/* harmony import */ var _classes_EventLog_trace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../classes/EventLog/trace */ 9484);
/* harmony import */ var _services_views_log_information_display_service_display_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/views/log-information/display-service/display.service */ 6575);
/* harmony import */ var _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/common/layout-service/layout.service */ 2555);
/* harmony import */ var _services_common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/common/svg-service/svg.service */ 7544);
/* harmony import */ var _services_common_trace_case_selection_service_trace_case_selection_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/common/trace-case-selection-service/trace-case-selection.service */ 62);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _pipes_attribute_value_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../pipes/attribute-value.pipe */ 3525);













const _c0 = ["canvas"];
function LogTraceCaseComponent_span_9_tr_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "td", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "td", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](5, "attributeValue");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const attribute_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", attribute_r4.key, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](5, 2, attribute_r4), " ");
} }
function LogTraceCaseComponent_span_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "table", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "table", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "tr", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "key");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "value");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "table", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, LogTraceCaseComponent_span_9_tr_15_Template, 6, 4, "tr", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const event_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", event_r2.attributes);
} }
class LogTraceCaseComponent {
    constructor(_displayService, _traceCaseSelectionService, _layoutService, _svgService) {
        this._displayService = _displayService;
        this._traceCaseSelectionService = _traceCaseSelectionService;
        this._layoutService = _layoutService;
        this._svgService = _svgService;
        this.closedStatus = 'show';
        this.openStatus = 'hide';
        this.layoutService = _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_2__.LayoutService;
        this.svgWidthPx = 0;
        this.svgHeightPx = 0;
        this._selectedTraceCaseIds = [];
        this.dataWidthPx = this.getDataWidthStyle();
        this.tableLeftMarginPx = this.getTableMarginLeftPx();
        this.status = this.closedStatus;
    }
    ngOnInit() {
        this._sub = this._displayService.diagram$.subscribe(diagram => {
            this._diagram = diagram;
            [this.svgWidthPx, this.svgHeightPx] = this._layoutService.layout(this._diagram, this.maxCaseIdsLetters);
            this.dataWidthPx = this.getDataWidthStyle();
            this.tableLeftMarginPx = this.getTableMarginLeftPx();
            if (this.canvas == undefined) {
                console.log('UNDEFINED DRAWING AREA');
            }
            this.draw();
        });
        this._subSelectedTraces =
            this._traceCaseSelectionService.selectedTraceCaseIds$.subscribe(selectedTraceCaseIds => {
                this._selectedTraceCaseIds = selectedTraceCaseIds;
                this.draw();
            });
    }
    ngAfterViewInit() {
        this.draw();
    }
    ngOnChanges() {
        if (this.traceCaseItem) {
            this._displayService.displayLogTraceCase(this.traceCaseItem);
        }
    }
    ngOnDestroy() {
        var _a, _b;
        (_a = this._sub) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this._subSelectedTraces) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
    draw() {
        if (this.canvas === undefined) {
            console.debug('drawing area not ready yet');
            return;
        }
        this.clearDrawingArea();
        const elements = this._svgService.createSvgElements(this._displayService.diagram, this._selectedTraceCaseIds, true, false, this.maxCaseIdsLetters);
        for (const element of elements) {
            this.canvas.nativeElement.appendChild(element);
        }
    }
    clearDrawingArea() {
        var _a;
        const canvas = (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.nativeElement;
        if ((canvas === null || canvas === void 0 ? void 0 : canvas.childElementCount) === undefined) {
            return;
        }
        while (canvas.childElementCount > 0) {
            canvas.removeChild(canvas.lastChild);
        }
    }
    toggleStatus() {
        if (this.status === this.closedStatus) {
            this.status = this.openStatus;
        }
        else {
            this.status = this.closedStatus;
        }
    }
    getDataWidthStyle() {
        return (this.svgWidthPx -
            _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_2__.LayoutService.X_LABELSIZE_LOG_INFORMATION -
            (this.maxCaseIdsLetters == null ? 1 : this.maxCaseIdsLetters) *
                _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_2__.LayoutService.X_LABEL_CHAR_EXTRA_OFFSET -
            _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_2__.LayoutService.X_OFFSET_LOG_INFORMATION);
    }
    getTableMarginLeftPx() {
        const maxLetters = this.maxCaseIdsLetters == null ? 1 : this.maxCaseIdsLetters;
        return 98 + maxLetters * _services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_2__.LayoutService.X_LABEL_CHAR_EXTRA_OFFSET;
    }
}
LogTraceCaseComponent.ɵfac = function LogTraceCaseComponent_Factory(t) { return new (t || LogTraceCaseComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_views_log_information_display_service_display_service__WEBPACK_IMPORTED_MODULE_1__.DisplayService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_common_trace_case_selection_service_trace_case_selection_service__WEBPACK_IMPORTED_MODULE_4__.TraceCaseSelectionService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_2__.LayoutService.LOG_INFORMATION_INSTANCE), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_3__.SvgService.LOG_INFORMATION_INSTANCE)); };
LogTraceCaseComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: LogTraceCaseComponent, selectors: [["app-log-trace-case"]], viewQuery: function LogTraceCaseComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.canvas = _t.first);
    } }, inputs: { traceCaseItem: "traceCaseItem", maxCaseIdsLetters: "maxCaseIdsLetters", closedStatus: "closedStatus", openStatus: "openStatus" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵProvidersFeature"]([_services_views_log_information_display_service_display_service__WEBPACK_IMPORTED_MODULE_1__.DisplayService]), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵNgOnChangesFeature"]], decls: 10, vars: 10, consts: [[1, "canvas"], ["canvas", ""], [3, "toggle"], [4, "ngFor", "ngForOf"], [1, "event-item-span"], [1, "outer-table"], [1, "inner-upper-table"], [1, "upper-table-row"], [1, "inner-lower-table-div"], [1, "inner-lower-table"], [1, "table-data"]], template: function LogTraceCaseComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "svg", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "details", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("toggle", function LogTraceCaseComponent_Template_details_toggle_5_listener() { return ctx.toggleStatus(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "summary");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, LogTraceCaseComponent_span_9_Template, 16, 1, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleProp"]("height", ctx.svgHeightPx, "px")("width", ctx.svgWidthPx, "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleProp"]("width", ctx.dataWidthPx, "px")("margin-left", ctx.tableLeftMarginPx, "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", ctx.status, " attributes");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.traceCaseItem == null ? null : ctx.traceCaseItem.events);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf], pipes: [_pipes_attribute_value_pipe__WEBPACK_IMPORTED_MODULE_5__.AttributeValuePipe], styles: [".initial-space-span[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 10px;\n}\n\n.event-item-span[_ngcontent-%COMP%] {\n  vertical-align: top;\n  display: inline-block;\n  width: 250px;\n}\n\n.outer-table[_ngcontent-%COMP%] {\n  border: none;\n  border-collapse: collapse;\n}\n\n.inner-upper-table[_ngcontent-%COMP%] {\n  border: none;\n  width: 246px;\n  font-size: 12px;\n  font-family: sans-serif;\n  padding-left: 2px;\n}\n\n.upper-table-row[_ngcontent-%COMP%] {\n  color: white;\n  background-color: grey;\n}\n\n.inner-lower-table-div[_ngcontent-%COMP%] {\n  width: 250px;\n  max-height: 80px;\n  overflow: auto;\n}\n\n.inner-lower-table[_ngcontent-%COMP%] {\n  border: none;\n  border-collapse: collapse;\n  width: 238px;\n  margin-left: 5px;\n}\n\n.table-data[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-family: sans-serif;\n  border: 1px solid #888888;\n}\n\ndetails[_ngcontent-%COMP%] {\n  background: lightgray;\n  margin: 0 auto 0.5rem;\n  border-radius: 3px;\n  border: 1px solid #666666;\n  overflow: hidden;\n}\n\nsummary[_ngcontent-%COMP%] {\n  color: white;\n  display: block;\n  background: gray;\n  padding: 3px 3px 3px 2.2rem;\n  position: relative;\n  cursor: pointer;\n  font-family: sans-serif;\n}\n\nsummary[_ngcontent-%COMP%]:before {\n  content: \"\";\n  border-width: 0.4rem;\n  border-style: solid;\n  border-color: transparent transparent transparent #fff;\n  position: absolute;\n  top: 5px;\n  left: 1rem;\n  transform: rotate(0);\n  transform-origin: 0.2rem 50%;\n  transition: 0.25s transform ease;\n}\n\ndetails[open][_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]:before {\n  transform: rotate(90deg);\n}\n\ndetails[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]::-webkit-details-marker {\n  display: none;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #eeeeee;\n  border-radius: 3px;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #888;\n  border-radius: 3px;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #555;\n  border-radius: 3px;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-corner {\n  background: lightgray;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZy10cmFjZS1jYXNlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0kscUJBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBRUE7RUFDSSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsWUFBQTtBQUNKOztBQUVBO0VBQ0ksWUFBQTtFQUNBLHlCQUFBO0FBQ0o7O0FBRUE7RUFDSSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSx1QkFBQTtFQUNBLGlCQUFBO0FBQ0o7O0FBRUE7RUFDSSxZQUFBO0VBQ0Esc0JBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7RUFDQSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQUNKOztBQUVBO0VBQ0ksZUFBQTtFQUNBLHVCQUFBO0VBQ0EseUJBQUE7QUFDSjs7QUFFQTtFQUNJLHFCQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSwyQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLHVCQUFBO0FBQ0o7O0FBRUE7RUFDSSxXQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNEQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLG9CQUFBO0VBQ0EsNEJBQUE7RUFDQSxnQ0FBQTtBQUNKOztBQUVBO0VBQ0ksd0JBQUE7QUFDSjs7QUFHQTtFQUNJLGFBQUE7QUFBSjs7QUFHQTtFQUNJLFVBQUE7RUFDQSxXQUFBO0FBQUo7O0FBR0EsVUFBQTs7QUFDQTtFQUNJLG1CQUFBO0VBQ0Esa0JBQUE7QUFBSjs7QUFHQSxXQUFBOztBQUNBO0VBQ0ksZ0JBQUE7RUFDQSxrQkFBQTtBQUFKOztBQUdBLG9CQUFBOztBQUNBO0VBQ0ksZ0JBQUE7RUFDQSxrQkFBQTtBQUFKOztBQUdBO0VBQ0kscUJBQUE7QUFBSiIsImZpbGUiOiJsb2ctdHJhY2UtY2FzZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pbml0aWFsLXNwYWNlLXNwYW4ge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgd2lkdGg6IDEwcHhcclxufVxyXG5cclxuLmV2ZW50LWl0ZW0tc3BhbiB7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgd2lkdGg6IDI1MHB4XHJcbn1cclxuXHJcbi5vdXRlci10YWJsZSB7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG59XHJcblxyXG4uaW5uZXItdXBwZXItdGFibGUge1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgd2lkdGg6IDI0NnB4O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDJweDtcclxufVxyXG5cclxuLnVwcGVyLXRhYmxlLXJvdyB7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5XHJcbn1cclxuXHJcbi5pbm5lci1sb3dlci10YWJsZS1kaXYge1xyXG4gICAgd2lkdGg6IDI1MHB4O1xyXG4gICAgbWF4LWhlaWdodDogODBweDtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG59XHJcblxyXG4uaW5uZXItbG93ZXItdGFibGUge1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcclxuICAgIHdpZHRoOiAyMzhweDtcclxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbn1cclxuXHJcbi50YWJsZS1kYXRhIHtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzg4ODg4ODtcclxufVxyXG5cclxuZGV0YWlscyB7XHJcbiAgICBiYWNrZ3JvdW5kOiBsaWdodGdyYXk7XHJcbiAgICBtYXJnaW46IDAgYXV0byAuNXJlbTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICM2NjY2NjY7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG5zdW1tYXJ5IHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgYmFja2dyb3VuZDogZ3JheTtcclxuICAgIHBhZGRpbmc6IDNweCAzcHggM3B4IDIuMnJlbTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xyXG59XHJcblxyXG5zdW1tYXJ5OmJlZm9yZSB7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIGJvcmRlci13aWR0aDogLjRyZW07XHJcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xyXG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjZmZmO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA1cHg7XHJcbiAgICBsZWZ0OiAxcmVtO1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMCk7XHJcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiAuMnJlbSA1MCU7XHJcbiAgICB0cmFuc2l0aW9uOiAuMjVzIHRyYW5zZm9ybSBlYXNlO1xyXG59XHJcblxyXG5kZXRhaWxzW29wZW5dID4gc3VtbWFyeTpiZWZvcmUge1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xyXG59XHJcblxyXG5cclxuZGV0YWlscyBzdW1tYXJ5Ojotd2Via2l0LWRldGFpbHMtbWFya2VyIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgd2lkdGg6IDZweDtcclxuICAgIGhlaWdodDogNnB4O1xyXG59XHJcblxyXG4vKiBUcmFjayAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcclxuICAgIGJhY2tncm91bmQ6ICNlZWVlZWU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbn1cclxuXHJcbi8qIEhhbmRsZSAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICAgIGJhY2tncm91bmQ6ICM4ODg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbn1cclxuXHJcbi8qIEhhbmRsZSBvbiBob3ZlciAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQ6ICM1NTU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbn1cclxuXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVyIHtcclxuICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ 7770:
/*!***********************************************************************************!*\
  !*** ./src/app/components/log-information-view/log-information-view.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogInformationViewComponent": () => (/* binding */ LogInformationViewComponent)
/* harmony export */ });
/* harmony import */ var src_app_services_common_data_eventlog_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/common/data/eventlog-data.service */ 9755);
/* harmony import */ var _services_views_value_chain_value_chain_controller_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/views/value-chain/value-chain-controller.service */ 4953);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);





function LogInformationViewComponent_tr_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-log-trace-case", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const traceCaseItem_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("traceCaseItem", traceCaseItem_r1)("maxCaseIdsLetters", ctx_r0.getMaxCaseIdLetters());
} }
class LogInformationViewComponent {
    constructor(_eventlogDataService, _valueChainControllerService) {
        this._eventlogDataService = _eventlogDataService;
        this._valueChainControllerService = _valueChainControllerService;
        this.sortedTraces = this.sortTraces(this._eventlogDataService.eventLog.traces);
    }
    ngOnInit() {
        this._sub = this._valueChainControllerService._elements$.subscribe(() => {
            this.sortedTraces = this.sortTraces(this._eventlogDataService.eventLog.traces);
        });
    }
    ngOnDestroy() {
        var _a;
        (_a = this._sub) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    sortTraces(traces) {
        return traces.sort((a, b) => {
            if (a.events.length != b.events.length) {
                return a.events.length - b.events.length;
            }
            for (const { index, aEvent } of a.events.map((aEvent, index) => ({
                index,
                aEvent,
            }))) {
                const bEvent = b.events[index];
                if (aEvent.activity === bEvent.activity) {
                    continue;
                }
                return aEvent.activity.localeCompare(bEvent.activity);
            }
            return 0;
        });
    }
    getMaxCaseIdLetters() {
        return Math.max(...this._eventlogDataService.eventLog.traces
            .map(trace => trace.caseId)
            .map(caseId => caseId.toString().length));
    }
}
LogInformationViewComponent.ɵfac = function LogInformationViewComponent_Factory(t) { return new (t || LogInformationViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_common_data_eventlog_data_service__WEBPACK_IMPORTED_MODULE_0__.EventlogDataService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_views_value_chain_value_chain_controller_service__WEBPACK_IMPORTED_MODULE_1__.ValueChainControllerService)); };
LogInformationViewComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: LogInformationViewComponent, selectors: [["app-log-information-view"]], decls: 3, vars: 2, consts: [["itemSize", "90", "minBufferPx", "1000", "maxBufferPx", "1200", 1, "virtual-viewport"], [4, "cdkVirtualFor", "cdkVirtualForOf", "cdkVirtualForTemplateCacheSize"], [3, "traceCaseItem", "maxCaseIdsLetters"]], template: function LogInformationViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "cdk-virtual-scroll-viewport", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "table");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, LogInformationViewComponent_tr_2_Template, 2, 2, "tr", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("cdkVirtualForOf", ctx.sortedTraces)("cdkVirtualForTemplateCacheSize", 0);
    } }, styles: [".virtual-viewport[_ngcontent-%COMP%] {\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZy1pbmZvcm1hdGlvbi12aWV3LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtBQUNKIiwiZmlsZSI6ImxvZy1pbmZvcm1hdGlvbi12aWV3LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnZpcnR1YWwtdmlld3BvcnQge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ 2548:
/*!*****************************************************************************************!*\
  !*** ./src/app/components/switch-direction-button/switch-direction-button.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SwitchDirectionButtonComponent": () => (/* binding */ SwitchDirectionButtonComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);


class SwitchDirectionButtonComponent {
    constructor() {
        this.switchDirectionEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        this.verticalDirection = true;
    }
    switchDirection() {
        this.verticalDirection = !this.verticalDirection;
        this.switchDirectionEvent.emit(this.verticalDirection);
    }
}
SwitchDirectionButtonComponent.ɵfac = function SwitchDirectionButtonComponent_Factory(t) { return new (t || SwitchDirectionButtonComponent)(); };
SwitchDirectionButtonComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SwitchDirectionButtonComponent, selectors: [["app-switch-direction-button"]], outputs: { switchDirectionEvent: "switchDirectionEvent" }, decls: 2, vars: 0, consts: [[1, "switch-direction-button", 3, "click"]], template: function SwitchDirectionButtonComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SwitchDirectionButtonComponent_Template_button_click_0_listener() { return ctx.switchDirection(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Switch Direction\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".switch-direction-button[_ngcontent-%COMP%] {\n  font-family: \"Courier New\", sans-serif;\n  border-color: grey;\n  text-align: center;\n  padding: 15px 20px;\n  font-size: 16px;\n  margin: 10px;\n  background-color: #7f7f7f;\n  color: white;\n}\n\n.switch-direction-button[_ngcontent-%COMP%]:hover {\n  border-color: black;\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXRjaC1kaXJlY3Rpb24tYnV0dG9uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksc0NBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtBQUNKOztBQUVBO0VBQ0ksbUJBQUE7RUFDQSxlQUFBO0FBQ0oiLCJmaWxlIjoic3dpdGNoLWRpcmVjdGlvbi1idXR0b24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc3dpdGNoLWRpcmVjdGlvbi1idXR0b24ge1xyXG4gICAgZm9udC1mYW1pbHk6IFwiQ291cmllciBOZXdcIiwgc2Fucy1zZXJpZjtcclxuICAgIGJvcmRlci1jb2xvcjogZ3JleTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDE1cHggMjBweDtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIG1hcmdpbjogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3ZjdmN2Y7O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uc3dpdGNoLWRpcmVjdGlvbi1idXR0b246aG92ZXIge1xyXG4gICAgYm9yZGVyLWNvbG9yOiBibGFjaztcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ 5063:
/*!*********************************************************************!*\
  !*** ./src/app/components/upload-button/upload-button.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UploadButtonComponent": () => (/* binding */ UploadButtonComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout/flex */ 5434);
/* harmony import */ var _directives_drag_drop_file_drag_drop_file_upload_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../directives/drag-drop-file/drag-drop-file-upload.directive */ 1210);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ 5590);





class UploadButtonComponent {
    constructor() {
        this.newFileUploadedEventExtensionContent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    }
    prevent(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    hoverStart(e) {
        this.prevent(e);
        const target = e.target;
        target.classList.add('mouse-hover');
    }
    hoverEnd(e) {
        this.prevent(e);
        const target = e.target;
        target.classList.remove('mouse-hover');
    }
    handleFileInput(event) {
        const target = event.target;
        const files = target.files;
        this.readAndEmitFile(files[0]);
    }
    readAndEmitFile(file) {
        var _a;
        let actualFileExtension = file.name.split('.').pop().toLowerCase();
        if (((_a = this.permittedFileExtensions) === null || _a === void 0 ? void 0 : _a.indexOf(actualFileExtension)) == -1) {
            alert('Only file types ' +
                this.permittedFileExtensions.map(ext => '.' + ext) +
                ' are currently supported');
            return;
        }
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileContent = fileReader.result;
            this.newFileUploadedEventExtensionContent.emit([
                actualFileExtension,
                fileContent,
            ]);
        };
        fileReader.readAsText(file);
    }
}
UploadButtonComponent.ɵfac = function UploadButtonComponent_Factory(t) { return new (t || UploadButtonComponent)(); };
UploadButtonComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: UploadButtonComponent, selectors: [["app-upload-button"]], inputs: { buttonText: "buttonText", buttonIcon: "buttonIcon", permittedFileExtensions: "permittedFileExtensions" }, outputs: { newFileUploadedEventExtensionContent: "newFileUploadedEventExtensionContent" }, decls: 7, vars: 0, consts: [["fxLayout", "column", "fxLayoutAlign", "start center"], ["type", "file", "onclick", "this.value = null", 1, "file-input", 3, "change"], ["fileUpload", ""], ["fxLayout", "row", "fxLayoutAlign", "center center", "appDragDropFileUpload", "", 1, "interactive-square", 3, "fileDropped", "click", "mouseenter", "mouseleave"], [1, "larger-icon"]], template: function UploadButtonComponent_Template(rf, ctx) { if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "input", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function UploadButtonComponent_Template_input_change_1_listener($event) { return ctx.handleFileInput($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("fileDropped", function UploadButtonComponent_Template_div_fileDropped_3_listener($event) { return ctx.readAndEmitFile($event); })("click", function UploadButtonComponent_Template_div_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](2); return _r0.click(); })("mouseenter", function UploadButtonComponent_Template_div_mouseenter_3_listener($event) { return ctx.hoverStart($event); })("mouseleave", function UploadButtonComponent_Template_div_mouseleave_3_listener($event) { return ctx.hoverEnd($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, " file_upload ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, " Import Event Log\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__.DefaultLayoutDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__.DefaultLayoutAlignDirective, _directives_drag_drop_file_drag_drop_file_upload_directive__WEBPACK_IMPORTED_MODULE_0__.DragDropFileUploadDirective, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIcon], styles: [".interactive-square[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  border: 5px solid dimgrey;\n  margin-bottom: 14px;\n  margin-top: 0.25em;\n}\n\n.mouse-hover[_ngcontent-%COMP%] {\n  border-color: black;\n}\n\n.larger-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  width: 40px;\n  height: 40px;\n  color: dimgrey;\n}\n\n.mouse-hover[_ngcontent-%COMP%]   .larger-icon[_ngcontent-%COMP%] {\n  color: black;\n}\n\n.file-input[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.file-over[_ngcontent-%COMP%] {\n  border-color: black;\n}\n\n.file-over[_ngcontent-%COMP%]   .larger-icon[_ngcontent-%COMP%] {\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwbG9hZC1idXR0b24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtBQUNKOztBQUVBO0VBQ0ksbUJBQUE7QUFDSjs7QUFFQTtFQUNJLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7QUFDSjs7QUFFQTtFQUNJLGFBQUE7QUFDSjs7QUFFQTtFQUNJLG1CQUFBO0FBQ0o7O0FBRUE7RUFDSSxZQUFBO0FBQ0oiLCJmaWxlIjoidXBsb2FkLWJ1dHRvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pbnRlcmFjdGl2ZS1zcXVhcmUge1xyXG4gICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgaGVpZ2h0OiAxMDBweDtcclxuICAgIGJvcmRlcjogNXB4IHNvbGlkIGRpbWdyZXk7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxNHB4O1xyXG4gICAgbWFyZ2luLXRvcDogLjI1ZW07XHJcbn1cclxuXHJcbi5tb3VzZS1ob3ZlciB7XHJcbiAgICBib3JkZXItY29sb3I6IGJsYWNrO1xyXG59XHJcblxyXG4ubGFyZ2VyLWljb24ge1xyXG4gICAgZm9udC1zaXplOiA0MHB4O1xyXG4gICAgd2lkdGg6IDQwcHg7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICBjb2xvcjogZGltZ3JleTtcclxufVxyXG5cclxuLm1vdXNlLWhvdmVyIC5sYXJnZXItaWNvbiB7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbn1cclxuXHJcbi5maWxlLWlucHV0IHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbi5maWxlLW92ZXIge1xyXG4gICAgYm9yZGVyLWNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLmZpbGUtb3ZlciAubGFyZ2VyLWljb24ge1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ 1688:
/*!*****************************************************************!*\
  !*** ./src/app/components/value-chain/value-chain.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValueChainComponent": () => (/* binding */ ValueChainComponent)
/* harmony export */ });
/* harmony import */ var _services_views_value_chain_display_service_display_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/views/value-chain/display-service/display.service */ 4515);
/* harmony import */ var _services_views_value_chain_value_chain_controller_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/views/value-chain/value-chain-controller.service */ 4953);
/* harmony import */ var _services_common_trace_case_selection_service_trace_case_selection_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/common/trace-case-selection-service/trace-case-selection.service */ 62);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);








const _c0 = ["canvas"];
class ValueChainComponent {
    constructor(_traceCaseSelectionService, _displayService, _valueChainControllerService) {
        this._traceCaseSelectionService = _traceCaseSelectionService;
        this._displayService = _displayService;
        this._valueChainControllerService = _valueChainControllerService;
        this.heightPx = this._valueChainControllerService.heightPx;
        this.widthPx = this._valueChainControllerService.widthPx;
    }
    ngOnInit() {
        this._sub = this._valueChainControllerService._elements$.subscribe(elements => {
            if (this.canvas == undefined) {
                console.log('UNDEFINED DRAWING AREA');
            }
            this.widthPx = this._valueChainControllerService.widthPx;
            this.heightPx = this._valueChainControllerService.heightPx;
            this.draw(elements);
        });
    }
    ngOnDestroy() {
        var _a, _b;
        (_a = this._sub) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this._subSelectedTraces) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
    draw(elements) {
        if (this.canvas === undefined) {
            console.debug('drawing area not ready yet');
            return;
        }
        this.clearDrawingArea();
        for (const element of elements) {
            this.canvas.nativeElement.appendChild(element);
        }
    }
    clearDrawingArea() {
        var _a;
        const canvas = (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.nativeElement;
        if ((canvas === null || canvas === void 0 ? void 0 : canvas.childElementCount) === undefined) {
            return;
        }
        while (canvas.childElementCount > 0) {
            canvas.removeChild(canvas.lastChild);
        }
    }
}
ValueChainComponent.ɵfac = function ValueChainComponent_Factory(t) { return new (t || ValueChainComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_common_trace_case_selection_service_trace_case_selection_service__WEBPACK_IMPORTED_MODULE_2__.TraceCaseSelectionService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_views_value_chain_display_service_display_service__WEBPACK_IMPORTED_MODULE_0__.DisplayService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_views_value_chain_value_chain_controller_service__WEBPACK_IMPORTED_MODULE_1__.ValueChainControllerService)); };
ValueChainComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: ValueChainComponent, selectors: [["app-value-chain"]], viewQuery: function ValueChainComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.canvas = _t.first);
    } }, inputs: { clientWidth: "clientWidth" }, decls: 2, vars: 4, consts: [[1, "canvas"], ["canvas", ""]], template: function ValueChainComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "svg", 0, 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("height", ctx.heightPx, "px")("width", ctx.widthPx, "px");
    } }, styles: [".canvas[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 400px;\n  font: 15px sans-Serif;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbHVlLWNoYWluLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksV0FBQTtFQUNBLGFBQUE7RUFDQSxxQkFBQTtBQUNKIiwiZmlsZSI6InZhbHVlLWNoYWluLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhbnZhcyB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogNDAwcHg7XHJcbiAgICBmb250OiAxNXB4IHNhbnMtU2VyaWY7XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ 1210:
/*!******************************************************************************!*\
  !*** ./src/app/directives/drag-drop-file/drag-drop-file-upload.directive.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DragDropFileUploadDirective": () => (/* binding */ DragDropFileUploadDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);


class DragDropFileUploadDirective {
    constructor() {
        this.fileOver = false;
        this.fileDropped = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    }
    onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver = true;
    }
    // Dragleave listener
    onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver = false;
    }
    onDrop(event) {
        this.fileOver = false;
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            this.fileDropped.emit(files[0]);
        }
    }
}
DragDropFileUploadDirective.ɵfac = function DragDropFileUploadDirective_Factory(t) { return new (t || DragDropFileUploadDirective)(); };
DragDropFileUploadDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: DragDropFileUploadDirective, selectors: [["", "appDragDropFileUpload", ""]], hostVars: 2, hostBindings: function DragDropFileUploadDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("dragover", function DragDropFileUploadDirective_dragover_HostBindingHandler($event) { return ctx.onDragOver($event); })("dragleave", function DragDropFileUploadDirective_dragleave_HostBindingHandler($event) { return ctx.onDragLeave($event); })("drop", function DragDropFileUploadDirective_drop_HostBindingHandler($event) { return ctx.onDrop($event); });
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("file-over", ctx.fileOver);
    } }, outputs: { fileDropped: "fileDropped" } });


/***/ }),

/***/ 3525:
/*!***********************************************!*\
  !*** ./src/app/pipes/attribute-value.pipe.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttributeValuePipe": () => (/* binding */ AttributeValuePipe)
/* harmony export */ });
/* harmony import */ var _classes_EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/EventLog/eventlogattribute */ 1367);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


class AttributeValuePipe {
    transform(attribute) {
        if (attribute instanceof _classes_EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.DateAttribute) {
            return attribute.value.toLocaleDateString('de-De', {
                timeZone: 'UTC',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
        }
        return attribute.value;
    }
}
AttributeValuePipe.ɵfac = function AttributeValuePipe_Factory(t) { return new (t || AttributeValuePipe)(); };
AttributeValuePipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "attributeValue", type: AttributeValuePipe, pure: true });


/***/ }),

/***/ 9755:
/*!***************************************************************!*\
  !*** ./src/app/services/common/data/eventlog-data.service.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventlogDataService": () => (/* binding */ EventlogDataService)
/* harmony export */ });
/* harmony import */ var _components_filter_area_filter_area_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/filter-area/filter-area.component */ 8047);
/* harmony import */ var _classes_EventLog_eventlog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../classes/EventLog/eventlog */ 2798);
/* harmony import */ var _trace_case_selection_service_trace_case_selection_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../trace-case-selection-service/trace-case-selection.service */ 62);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);





class EventlogDataService {
    constructor(_traceCaseSelectionService) {
        this._traceCaseSelectionService = _traceCaseSelectionService;
        this._filter = new _components_filter_area_filter_area_component__WEBPACK_IMPORTED_MODULE_0__.FilterArgument('', false, false, false);
        this._eventLog = new _classes_EventLog_eventlog__WEBPACK_IMPORTED_MODULE_1__.EventLog([], [], [], [], []);
        this._filteredEventLog = new _classes_EventLog_eventlog__WEBPACK_IMPORTED_MODULE_1__.EventLog([], [], [], [], []);
    }
    get eventLog() {
        if (this._filter.filterValue === '') {
            return this._eventLog;
        }
        return this._filteredEventLog;
    }
    set eventLog(value) {
        this._eventLog = value;
        this.changeFilter(this._filter);
    }
    get eventLogWithSelectedOrAllWhenNothingSelected() {
        return this.eventLogWithSelectedOrOtherWhenNothingSelected(thisEventLog => thisEventLog);
    }
    get eventLogWithSelectedOrNothingWhenNothingSelected() {
        return this.eventLogWithSelectedOrOtherWhenNothingSelected(thisEventLog => new _classes_EventLog_eventlog__WEBPACK_IMPORTED_MODULE_1__.EventLog(thisEventLog.classifiers, thisEventLog.globalEventAttributes, thisEventLog.globalTraceAttributes, [], thisEventLog.attributes));
    }
    getCaseId(event) {
        for (let trace of this._eventLog.traces) {
            if (trace.events.includes(event)) {
                return trace.caseId;
            }
        }
        return 0;
    }
    eventLogWithSelectedOrOtherWhenNothingSelected(extractOtherFunction) {
        if (this._traceCaseSelectionService.selectedTraceCaseIds.length === 0) {
            return extractOtherFunction(this._eventLog);
        }
        const filteredTraces = this._eventLog.traces.filter(trace => this._traceCaseSelectionService.selectedTraceCaseIds.indexOf(trace.caseId) !== -1);
        return new _classes_EventLog_eventlog__WEBPACK_IMPORTED_MODULE_1__.EventLog(this._eventLog.classifiers, this._eventLog.globalEventAttributes, this._eventLog.globalTraceAttributes, filteredTraces, this._eventLog.attributes);
    }
    changeFilter(arg) {
        this._filter = arg;
        if (arg.filterValue === '') {
            return;
        }
        this._filteredEventLog.traces = [];
        this._eventLog.traces.forEach(trace => {
            if (trace.events.some(event => {
                if (this.filterActivity(event)) {
                    return true;
                }
                return this.filterAttributes(event);
            })) {
                this._filteredEventLog.traces.push(trace);
            }
        });
    }
    filterAttributes(event) {
        if (!this._filter.filterAttributeValues) {
            return false;
        }
        return event.attributes.some(attribute => {
            return this._filter.matchCase
                ? attribute.value.toString().includes(this._filter.filterValue)
                : attribute.value
                    .toString()
                    .toLowerCase()
                    .includes(this._filter.filterValue.toLowerCase());
        });
    }
    filterActivity(event) {
        if (!this._filter.filterActivity) {
            return false;
        }
        if (this._filter.matchCase) {
            return event.activity.includes(this._filter.filterValue);
        }
        else {
            return event.activity
                .toLowerCase()
                .includes(this._filter.filterValue.toLowerCase());
        }
    }
}
EventlogDataService.ɵfac = function EventlogDataService_Factory(t) { return new (t || EventlogDataService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_trace_case_selection_service_trace_case_selection_service__WEBPACK_IMPORTED_MODULE_2__.TraceCaseSelectionService)); };
EventlogDataService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: EventlogDataService, factory: EventlogDataService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 3557:
/*!*************************************************************************!*\
  !*** ./src/app/services/common/display-service/display-base.service.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DisplayServiceBase": () => (/* binding */ DisplayServiceBase)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 6317);
/* harmony import */ var _classes_diagram_diagram__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../classes/diagram/diagram */ 1788);
/* harmony import */ var _classes_diagram_GraphEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../classes/diagram/GraphEvent */ 5597);
/* harmony import */ var _classes_diagram_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../classes/diagram/element */ 2928);
/* harmony import */ var _trace_case_selection_service_trace_case_selection_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../trace-case-selection-service/trace-case-selection.service */ 62);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);







class DisplayServiceBase {
    constructor(traceCaseSelectionService) {
        this.traceCaseSelectionService = traceCaseSelectionService;
        this._diagram$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__.BehaviorSubject(new _classes_diagram_diagram__WEBPACK_IMPORTED_MODULE_0__.Diagram([]));
    }
    ngOnDestroy() {
        this._diagram$.complete();
    }
    get diagram$() {
        return this._diagram$.asObservable();
    }
    get diagram() {
        return this._diagram$.getValue();
    }
    display(net) {
        this._diagram$.next(net);
    }
    getEventGraphics(trace, caseIds) {
        let graphEvents = new Array();
        trace.events.forEach(ev => {
            // Text und Rechteck für Events erstellen, Koordinaten kommen vom Layoutservice
            let el = new _classes_diagram_element__WEBPACK_IMPORTED_MODULE_2__.Element(_classes_diagram_element__WEBPACK_IMPORTED_MODULE_2__.ElementType.text, () => this.traceCaseSelectionService.selectTraceCaseIds(caseIds));
            let box = new _classes_diagram_element__WEBPACK_IMPORTED_MODULE_2__.Element(_classes_diagram_element__WEBPACK_IMPORTED_MODULE_2__.ElementType.box, () => this.traceCaseSelectionService.selectTraceCaseIds(caseIds));
            graphEvents.push(new _classes_diagram_GraphEvent__WEBPACK_IMPORTED_MODULE_1__.GraphEvent(ev.activity, [box, el]));
        });
        return graphEvents;
    }
}
DisplayServiceBase.ɵfac = function DisplayServiceBase_Factory(t) { return new (t || DisplayServiceBase)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_trace_case_selection_service_trace_case_selection_service__WEBPACK_IMPORTED_MODULE_3__.TraceCaseSelectionService)); };
DisplayServiceBase.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: DisplayServiceBase, factory: DisplayServiceBase.ɵfac });


/***/ }),

/***/ 2555:
/*!******************************************************************!*\
  !*** ./src/app/services/common/layout-service/layout.service.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LayoutService": () => (/* binding */ LayoutService)
/* harmony export */ });
class LayoutService {
    constructor(xOffset, yOffset, xStep, yStep, xLabelSize, labelExtraSizeExtractor) {
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.xStep = xStep;
        this.yStep = yStep;
        this.xLabelSize = xLabelSize;
        this.labelExtraSizeExtractor = labelExtraSizeExtractor;
    }
    // Ordnet die Elemente des Diagrams an und gibt die maximalen Ausmaße der Zeichnung zurück
    layout(diagram, maxLabelExtraLettersOpt = -1) {
        let x = 0;
        let y = 0;
        let xMax = 0;
        const maxLabelExtraLetters = maxLabelExtraLettersOpt === -1
            ? Math.max(...diagram.traces.map(this.labelExtraSizeExtractor))
            : maxLabelExtraLettersOpt;
        diagram.traces.forEach(trace => {
            this.layoutTraceLabel(y, trace.svgElements[0]);
            x++;
            trace.events.forEach(event => {
                this.layoutEventElements(x, y, maxLabelExtraLetters, event.svgElements);
                x++;
            });
            if (x > xMax) {
                xMax = x;
            }
            x = 0;
            y++;
        });
        return this.calculateLayoutSize(xMax, y, maxLabelExtraLetters);
    }
    layoutTraceLabel(y, element) {
        element.x += this.xOffset;
        element.y += this.yOffset + y * this.yStep;
    }
    layoutEventElements(x, y, maxLabelExtraLetters, elements) {
        elements.forEach(svg => {
            svg.x +=
                this.xOffset +
                    (this.xLabelSize +
                        maxLabelExtraLetters *
                            LayoutService.X_LABEL_CHAR_EXTRA_OFFSET) +
                    (x - 1) * this.xStep;
            svg.y += this.yOffset + y * this.yStep;
        });
    }
    calculateLayoutSize(xMax, y, maxLabelExtraLetters) {
        // Halbe Y-Stepsize wird wieder abgezogen, da die Elemente in der Zeichnug ihren Nullpunkt in der Mitte haben
        // Ganze X-Stepsize wird wieder abgezogen, da Label über definierte Labesize berücksichtigt wird
        return [
            this.xOffset +
                (xMax - 1) * this.xStep +
                this.xLabelSize +
                maxLabelExtraLetters * LayoutService.X_LABEL_CHAR_EXTRA_OFFSET,
            2 * this.yOffset + y * this.yStep - (y > 0 ? this.yStep / 2 : 0),
        ];
    }
}
LayoutService.LOG_INFORMATION_INSTANCE = 'LogInformationLayoutService';
LayoutService.VALUE_CHAIN_INSTANCE = 'ValueChainLayoutService';
LayoutService.X_OFFSET_VALUE_CHAIN = 40;
LayoutService.X_OFFSET_LOG_INFORMATION = 40;
LayoutService.Y_OFFSET_VALUE_CHAIN = 30;
LayoutService.Y_OFFSET_LOG_INFORMATION = 25;
LayoutService.X_STEP_VALUE_CHAIN = 150;
LayoutService.X_STEP_LOG_INFORMATION = 250;
LayoutService.Y_STEP_LOG_INFORMATION = 0;
LayoutService.Y_STEP_VALUE_CHAIN = 50;
LayoutService.X_LABELSIZE_VALUE_CHAIN = 65;
LayoutService.X_LABELSIZE_LOG_INFORMATION = 80;
LayoutService.X_LABEL_CHAR_EXTRA_OFFSET = 10;


/***/ }),

/***/ 7544:
/*!************************************************************!*\
  !*** ./src/app/services/common/svg-service/svg.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SvgService": () => (/* binding */ SvgService)
/* harmony export */ });
/* harmony import */ var _classes_diagram_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../classes/diagram/element */ 2928);
/* harmony import */ var _layout_service_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout-service/layout.service */ 2555);


class SvgService {
    constructor(layoutService, maxFontWidth, boxWidth, boxHeight, labelExtractor, labelExtraSizeExtractor) {
        this.layoutService = layoutService;
        this.backgroundColors = [
            'rgb(227, 26, 28)',
            'rgb(251, 154, 153)',
            'rgb(254, 191, 111)',
            'rgb(166, 206, 227)',
            'rgb(32, 120, 181)',
            'rgb(125, 227, 183)',
            'rgb(152, 250, 232, 1)',
            'rgb(112, 203, 255)',
            'rgb(227, 175, 166)',
            'rgb(181, 65, 33)',
        ];
        this.FONTFAMILY = 'sans-Serif';
        this.FONTSIZE = '15px';
        this.XTEXTOFFSET = 5;
        this.YTEXTOFFSET = 4;
        this.YNEXTROWOFFSET = 20;
        this.xTraceBorderOffset = -5;
        this.yTraceBorderOffset = -23;
        this.xCheckboxOffset = -35;
        this.yCheckboxOffset = -10;
        this.yDescriptionLabelOffset = 4;
        this.midPointOfHeight = 0;
        this.peakOffset = 10;
        this.leftXCoordinate = -20;
        this.maxFontWidth = maxFontWidth;
        this.boxWidth = boxWidth;
        this.boxHeight = boxHeight;
        this.labelExtractor = labelExtractor;
        this.labelExtraSizeExtractor = labelExtraSizeExtractor;
        this.topXCoordinate = 0 - this.boxHeight / 2;
    }
    static get activityColorMap() {
        return SvgService._activityColorMap;
    }
    /// Erstellt alle benötigten SVGElemente für ein gegebenes Diagram
    /// Alle SVG's werden außerdem zurückgegeben
    createSvgElements(diagram, selectedTraceCaseIds, reuseColors = true, isExport = false, maxLabelExtraLettersOpt = -1) {
        if (!reuseColors) {
            SvgService.activityColorMap.clear();
        }
        const result = [];
        const maxLabelExtraLetters = maxLabelExtraLettersOpt === -1
            ? Math.max(...diagram.traces.map(this.labelExtraSizeExtractor))
            : maxLabelExtraLettersOpt;
        diagram.traces.forEach(trace => {
            if (!isExport) {
                // Rahmen um die ausgewählten Traces
                let partiallySelected = trace.caseIds.some(val => selectedTraceCaseIds.includes(val));
                let allSelected = trace.caseIds.every(val => selectedTraceCaseIds.includes(val));
                if (partiallySelected) {
                    let traceBorder = SvgService.createSelectedTraceBorder(trace.svgElements[0].x + this.xTraceBorderOffset, trace.svgElements[0].y + this.yTraceBorderOffset, trace.events.length * this.layoutService.xStep +
                        (this.layoutService.xLabelSize - 5) +
                        _layout_service_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService.X_LABEL_CHAR_EXTRA_OFFSET *
                            maxLabelExtraLetters, allSelected);
                    result.push(traceBorder);
                }
                // Checkboxen für Traces
                let traceCheckboxBorder = SvgService.createTraceCheckboxBorder(trace.svgElements[0], trace.svgElements[0].x + this.xCheckboxOffset, trace.svgElements[0].y + this.yCheckboxOffset);
                result.push(traceCheckboxBorder);
                if (partiallySelected) {
                    let traceCheckboxCheck = SvgService.createTraceCheckboxCheck(trace.svgElements[0].x + this.xCheckboxOffset, trace.svgElements[0].y + this.yCheckboxOffset, allSelected);
                    result.push(traceCheckboxCheck);
                }
            }
            const descriptionLabel = this.createSvgForDescriptionLabel(trace.svgElements[0], this.labelExtractor(trace));
            result.push(descriptionLabel);
            trace.events.forEach(ev => {
                ev.svgElements.forEach(svgEl => {
                    if (svgEl.type === _classes_diagram_element__WEBPACK_IMPORTED_MODULE_0__.ElementType.text) {
                        const text = this.createSvgForText(ev.svgElements[1], ev.activity);
                        result.push(text);
                    }
                    else if (svgEl.type === _classes_diagram_element__WEBPACK_IMPORTED_MODULE_0__.ElementType.box) {
                        if (!SvgService.activityColorMap.has(ev.activity)) {
                            SvgService.activityColorMap.set(ev.activity, this.backgroundColors[SvgService.activityColorMap.size %
                                this.backgroundColors.length]); // Wenn die Map größer ist als Size Farben recyclen
                        }
                        const rect = this.createBoxForElement(ev.svgElements[0], SvgService.activityColorMap.get(ev.activity));
                        result.push(rect);
                    }
                });
            });
        });
        return result;
    }
    static createSelectedTraceBorder(x, y, width, allSelected) {
        const svg = SvgService.createSvgElement('rect');
        svg.setAttribute('x', `${x}`);
        svg.setAttribute('y', `${y}`);
        svg.setAttribute('width', `${width}`);
        svg.setAttribute('height', '46');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke', 'black');
        if (!allSelected) {
            svg.setAttribute('stroke-dasharray', '6 3');
        }
        return svg;
    }
    static createTraceCheckboxBorder(element, x, y) {
        const svg = SvgService.createSvgElement('polygon');
        svg.setAttribute('points', `${x},${y} ${x},${y + 20} ${x + 20},${y + 20} ${x + 20},${y}`);
        svg.setAttribute('fill', '#ffffff');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke', 'black');
        element.registerSvg(svg);
        return svg;
    }
    static createTraceCheckboxCheck(x, y, allSelected) {
        const svg = SvgService.createSvgElement('polyline');
        svg.setAttribute('points', `${x + 4},${y + 10} ${x + 8},${y + 14} ${x + 16},${y + 4}`);
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke', 'black');
        if (!allSelected) {
            svg.setAttribute('stroke-dasharray', '2 2');
        }
        return svg;
    }
    createBoxForElement(element, fill) {
        const svg = SvgService.createSvgElement('polygon');
        svg.setAttribute('transform', `translate( ${element.x} ${element.y} )`);
        svg.setAttribute('points', `${this.leftXCoordinate},${this.topXCoordinate}
                                                     ${this.boxWidth},${this.topXCoordinate}
                                                     ${this.boxWidth +
            this.peakOffset},${this.midPointOfHeight}
                                                     ${this.boxWidth},${this.boxHeight / 2}
                                                     ${this.leftXCoordinate},${this.boxHeight / 2}
                                                     ${this.leftXCoordinate +
            this.peakOffset},${this.midPointOfHeight}`);
        svg.setAttribute('fill', fill.toString());
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke', 'black');
        element.registerSvg(svg);
        return svg;
    }
    getSubStrings(text) {
        for (let i = 0; i <= text.length; i++) {
            let length = this.GetStringWidth(text.substring(0, i));
            if (length > this.maxFontWidth) {
                for (let j = i; j <= text.length; j++) {
                    let length2 = this.GetStringWidth(text.substring(i, j - 1));
                    if (length2 > this.maxFontWidth) {
                        return [
                            text.substring(0, i),
                            text.substring(i, j - 2) + '...',
                        ];
                    }
                }
                return [text.substring(0, i), text.substring(i)];
            }
        }
        return [text, ''];
    }
    createSvgForDescriptionLabel(element, text) {
        const svg = SvgService.createSvgElement('text');
        svg.setAttribute('x', `${element.x}`);
        svg.setAttribute('y', `${element.y + this.yDescriptionLabelOffset}`);
        svg.setAttribute('font-size', this.FONTSIZE);
        svg.setAttribute('font-family', this.FONTFAMILY);
        svg.textContent = text.toString();
        element.registerSvg(svg);
        return svg;
    }
    createSvgForText(element, text) {
        const svg = SvgService.createSvgElement('text');
        svg.setAttribute('x', `${element.x - this.XTEXTOFFSET}`);
        svg.setAttribute('y', `${element.y - this.YTEXTOFFSET}`);
        let stringWidth = this.GetStringWidth(text);
        if (stringWidth > this.maxFontWidth) {
            let subStrings = this.getSubStrings(text);
            const svg1 = SvgService.createSvgElement('tspan');
            svg1.setAttribute('font-size', this.FONTSIZE);
            svg1.setAttribute('font-family', this.FONTFAMILY);
            svg1.textContent = subStrings[0].toString();
            const svg2 = SvgService.createSvgElement('tspan');
            svg2.setAttribute('font-size', this.FONTSIZE);
            svg2.setAttribute('font-family', this.FONTFAMILY);
            svg2.textContent = subStrings[1].toString();
            svg2.setAttribute('x', `${element.x - this.XTEXTOFFSET}`);
            svg2.setAttribute('dy', `${this.YNEXTROWOFFSET}` + 'px');
            svg.appendChild(svg1);
            svg.appendChild(svg2);
        }
        else {
            svg.setAttribute('font-size', this.FONTSIZE);
            svg.setAttribute('font-family', this.FONTFAMILY);
            svg.textContent = text.toString();
        }
        element.registerSvg(svg);
        return svg;
    }
    GetStringWidth(text) {
        var canvas = document.createElement('canvas');
        canvas.setAttribute('width', '100%');
        canvas.setAttribute('height', '380px');
        var ctx = canvas.getContext('2d');
        ctx.font = this.FONTSIZE + ' ' + this.FONTFAMILY;
        return ctx.measureText(text.toString()).width;
    }
    static createSvgElement(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
}
SvgService.LOG_INFORMATION_INSTANCE = 'LogInformationSvgService';
SvgService.VALUE_CHAIN_INSTANCE = 'ValueChainSvgService';
SvgService.MAXFONTWIDTH_LOG_INFOMRATION = 168;
SvgService.MAXFONTWIDTH_VALUE_CHAIN = 120;
SvgService.BOX_WIDTH_VALUE_CHAIN = _layout_service_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService.X_STEP_VALUE_CHAIN - 25;
SvgService.BOX_HEIGHT_VALUE_CHAIN = _layout_service_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService.Y_STEP_VALUE_CHAIN - 10;
SvgService.BOX_WIDTH_LOG_INFORMATION = _layout_service_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService.X_STEP_LOG_INFORMATION - 25;
SvgService.BOX_HEIGHT_LOG_INFORMATION = _layout_service_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService.Y_OFFSET_LOG_INFORMATION * 2 - 10;
SvgService._activityColorMap = new Map();


/***/ }),

/***/ 62:
/*!**********************************************************************************************!*\
  !*** ./src/app/services/common/trace-case-selection-service/trace-case-selection.service.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TraceCaseSelectionService": () => (/* binding */ TraceCaseSelectionService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 6317);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


class TraceCaseSelectionService {
    constructor() {
        this._selectedTraceCaseIds$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(new Array());
    }
    get selectedTraceCaseIds$() {
        return this._selectedTraceCaseIds$.asObservable();
    }
    get selectedTraceCaseIds() {
        return this._selectedTraceCaseIds$.getValue();
    }
    selectTraceCaseIds(value) {
        let new_value;
        if (value.length == 0) {
            new_value = value;
        }
        else {
            if (value.every(val => this.selectedTraceCaseIds.includes(val))) {
                new_value = this.selectedTraceCaseIds.filter(x => !value.includes(x));
            }
            else {
                new_value = [...this.selectedTraceCaseIds, ...value];
            }
        }
        this._selectedTraceCaseIds$.next(new_value);
    }
}
TraceCaseSelectionService.ɵfac = function TraceCaseSelectionService_Factory(t) { return new (t || TraceCaseSelectionService)(); };
TraceCaseSelectionService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: TraceCaseSelectionService, factory: TraceCaseSelectionService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 1972:
/*!********************************************************************!*\
  !*** ./src/app/services/file-operations/log/log-parser.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogParserService": () => (/* binding */ LogParserService)
/* harmony export */ });
/* harmony import */ var _classes_parser_logParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../classes/parser/logParser */ 949);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


class LogParserService {
    constructor() {
        this.parser = new _classes_parser_logParser__WEBPACK_IMPORTED_MODULE_0__.LogParser();
    }
    /**
     * Liest einen String im .type log Format ein, das von Robin Bergenthum und Jakub Kovar definiert wurde und wandelt es in die
     * intern verwendete Repräsentation als {@link EventLog} um
     *
     * @param text String im .type log Format, der geparst werden soll
     * @return interne Darstellung als {@link EventLog}
     */
    parse(text) {
        return this.parser.parse(text);
    }
}
LogParserService.ɵfac = function LogParserService_Factory(t) { return new (t || LogParserService)(); };
LogParserService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: LogParserService, factory: LogParserService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 8994:
/*!*************************************************************!*\
  !*** ./src/app/services/file-operations/log/log.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogService": () => (/* binding */ LogService)
/* harmony export */ });
/* harmony import */ var _classes_EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../classes/EventLog/eventlogattribute */ 1367);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


class LogService {
    constructor() {
        this._caseIdElement = 'case-id';
        this._activityElement = 'concept:name';
        this._undefinedValue = "''";
    }
    static getAttributeValueAsString(attribute) {
        if (typeof attribute === 'string') {
            return attribute;
        }
        if (typeof attribute === 'number') {
            return String(attribute);
        }
        if (attribute instanceof _classes_EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.StringAttribute) {
            return attribute.value;
        }
        if (attribute instanceof _classes_EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.DateAttribute) {
            return attribute.value.toISOString();
        }
        if (attribute instanceof _classes_EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.IntAttribute ||
            attribute instanceof _classes_EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.FloatAttribute) {
            return String(attribute.value);
        }
        if (attribute instanceof _classes_EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.BooleanAttribute) {
            return attribute.value ? 'true' : 'false';
        }
        console.error('unknown attribute type');
        return '';
    }
    /**
     * Wandelt die intern verwendete Repräsentation in ein .type log formattierten String um
     *
     * @param eventLog interne Repräsentation als {@link EventLog}
     * @return .type log formattierter String
     */
    generate(eventLog) {
        if (eventLog.traces.length == 0) {
            return '';
        }
        const traces = eventLog.traces;
        let logString = '.type log' + '\n' + '.attributes' + '\n';
        const attributes = this.listOfAttributes(traces);
        logString +=
            this._caseIdElement +
                '\n' +
                this._activityElement +
                '\n' +
                attributes.join('\n') +
                '\n';
        logString += '.events' + '\n';
        logString += traces
            .map(trace => this.getTraceRepresentation(trace, trace.caseId, attributes))
            .join('\n');
        return logString;
    }
    listOfAttributes(traces) {
        const attributesWithDuplicates = traces
            .flatMap(trace => trace.events)
            .flatMap(event => event.attributes)
            .filter(attribute => attribute.key !== '' && attribute.value !== '')
            .map(attribute => attribute.key)
            .filter(attributeKey => ![this._activityElement, this._caseIdElement].includes(attributeKey))
            .map(attributeString => this.escapeIfNecessary(attributeString));
        // Sort occurrences in events desc
        const attributesOccurrencesMap = attributesWithDuplicates.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
        return [...attributesOccurrencesMap.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(entry => entry[0]);
    }
    getTraceRepresentation(trace, caseId, attributes) {
        return trace.events
            .map(event => this.getEventRepresentation(event, caseId, attributes))
            .join('\n');
    }
    getEventRepresentation(event, caseId, attributes) {
        const otherAttributes = attributes.map(attributeKey => event.getAttribute(attributeKey));
        const eventAttributes = [caseId, event.activity].concat(otherAttributes);
        const attributesAsStrings = eventAttributes.map(attribute => attribute == null
            ? this._undefinedValue
            : LogService.getAttributeValueAsString(attribute));
        return this.toRepresentationLine(attributesAsStrings);
    }
    toRepresentationLine(attributesAsStrings) {
        return attributesAsStrings.reduceRight((acc, e) => {
            if (acc === this._undefinedValue) {
                return e === this._undefinedValue
                    ? this._undefinedValue
                    : this.escapeIfNecessary(e);
            }
            return this.escapeIfNecessary(e) + ' ' + acc;
        }, this._undefinedValue);
    }
    escapeIfNecessary(asString) {
        if (asString == this._undefinedValue) {
            return this._undefinedValue;
        }
        asString = asString.replace(new RegExp("'", 'g'), "\\'");
        const containsWhitespaceF = (str) => /\s/.test(str);
        if (containsWhitespaceF(asString)) {
            return "'" + asString + "'";
        }
        return asString;
    }
}
LogService.ɵfac = function LogService_Factory(t) { return new (t || LogService)(); };
LogService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: LogService, factory: LogService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 3893:
/*!********************************************************************!*\
  !*** ./src/app/services/file-operations/xes/xes-parser.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XesParserService": () => (/* binding */ XesParserService)
/* harmony export */ });
/* harmony import */ var _classes_parser_xesParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../classes/parser/xesParser */ 968);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


class XesParserService {
    constructor() {
        this.parser = new _classes_parser_xesParser__WEBPACK_IMPORTED_MODULE_0__.XesParser();
    }
    /**
     * Liest einen String im Xes-Format ein und wandelt es in dieintern verwendete Repräsentation als {@link EventLog} um
     *
     * @param xmlString String im Xes-Format, der geparst werden soll
     * @return interne Darstellung als {@link EventLog}
     */
    parse(xmlString) {
        return this.parser.parse(xmlString);
    }
}
XesParserService.ɵfac = function XesParserService_Factory(t) { return new (t || XesParserService)(); };
XesParserService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: XesParserService, factory: XesParserService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 6801:
/*!*************************************************************!*\
  !*** ./src/app/services/file-operations/xes/xes.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XesService": () => (/* binding */ XesService)
/* harmony export */ });
/* harmony import */ var _classes_EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../classes/EventLog/eventlogattribute */ 1367);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


var format = __webpack_require__(/*! xml-formatter */ 1919);
class XesService {
    /**
     * Wandelt die intern verwendete Repräsentation in ein XES formattierten String um
     *
     * @param eventLog interne Repräsentation als {@link EventLog}
     * @return XES formattierter String
     */
    generate(eventLog) {
        let xesString = '<?xml version="1.0" encoding="UTF-8" ?>';
        xesString += '<log xes.version="1.0" xes.features="">';
        xesString +=
            '<extension name="Lifecycle" prefix="lifecycle" uri="http://www.xes-standard.org/lifecycle.xesext"/>';
        xesString +=
            '<extension name="Organizational" prefix="org" uri="http://www.xes-standard.org/org.xesext"/>';
        xesString +=
            '<extension name="Time" prefix="time" uri="http://www.xes-standard.org/time.xesext"/>';
        xesString +=
            '<extension name="Concept" prefix="concept" uri="http://www.xes-standard.org/concept.xesext"/>';
        xesString +=
            '<extension name="Semantic" prefix="semantic" uri="http://www.xes-standard.org/semantic.xesext"/>';
        if (eventLog.globalTraceAttributes.length > 0) {
            xesString += '<global scope="trace">';
            eventLog.globalTraceAttributes.forEach(attribute => {
                xesString += XesService.getAttributeRepresentation(attribute);
            });
            xesString += '</global>';
        }
        if (eventLog.globalEventAttributes.length > 0) {
            xesString += '<global scope="event">';
            eventLog.globalEventAttributes.forEach(attribute => {
                xesString += XesService.getAttributeRepresentation(attribute);
            });
            xesString += '</global>';
        }
        eventLog.classifiers.forEach(classifier => {
            xesString += this.getClassifierRepresentation(classifier);
        });
        eventLog.attributes.forEach(attribute => {
            xesString += XesService.getAttributeRepresentation(attribute);
        });
        eventLog.traces.forEach(trace => {
            xesString += this.getTraceRepresentation(trace);
        });
        xesString += '</log>';
        return format(xesString);
    }
    getClassifierRepresentation(classifier) {
        let classifierString = '<classifier name="' + classifier.name + '"';
        classifierString += 'keys="' + classifier.keys.join(' ') + '"/>';
        return classifierString;
    }
    getTraceRepresentation(trace) {
        let traceString = '<trace>';
        traceString +=
            '<string key="concept:name" value="' + trace.caseId + '" />';
        trace.attributes.forEach(attribute => {
            if (attribute.key !== 'concept:name') {
                traceString += XesService.getAttributeRepresentation(attribute);
            }
        });
        trace.events.forEach(event => {
            traceString += this.getEventRepresentation(event);
        });
        traceString += '</trace>';
        return traceString;
    }
    getEventRepresentation(event) {
        let eventString = '<event>';
        eventString +=
            '<string key="concept:name" value="' + event.activity + '" />';
        event.attributes.forEach(attribute => {
            eventString += XesService.getAttributeRepresentation(attribute);
        });
        eventString += '</event>';
        return eventString;
    }
    static getAttributeRepresentation(attribute) {
        if (attribute instanceof _classes_EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.StringAttribute) {
            return ('<string key="' +
                attribute.key +
                '" value="' +
                attribute.value +
                '" />');
        }
        if (attribute instanceof _classes_EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.DateAttribute) {
            return ('<date key="' +
                attribute.key +
                '" value="' +
                attribute.value.toISOString() +
                '" />');
        }
        if (attribute instanceof _classes_EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.IntAttribute) {
            return ('<int key="' +
                attribute.key +
                '" value="' +
                attribute.value +
                '" />');
        }
        if (attribute instanceof _classes_EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.FloatAttribute) {
            return ('<float key="' +
                attribute.key +
                '" value="' +
                attribute.value +
                '" />');
        }
        if (attribute instanceof _classes_EventLog_eventlogattribute__WEBPACK_IMPORTED_MODULE_0__.BooleanAttribute) {
            return ('<boolean key="' +
                attribute.key +
                '" value="' +
                attribute.value +
                '" />');
        }
        console.error('unknown attribute type');
        return '';
    }
}
XesService.ɵfac = function XesService_Factory(t) { return new (t || XesService)(); };
XesService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: XesService, factory: XesService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 5860:
/*!**************************************************************************!*\
  !*** ./src/app/services/views/directly-follows-graph/display.service.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DirectlyFollowsGraphService": () => (/* binding */ DirectlyFollowsGraphService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 6317);
/* harmony import */ var _classes_directly_follows_graph_edge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../classes/directly-follows-graph/edge */ 8355);
/* harmony import */ var _classes_directly_follows_graph_graph__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../classes/directly-follows-graph/graph */ 680);
/* harmony import */ var _classes_directly_follows_graph_vertex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../classes/directly-follows-graph/vertex */ 7620);
/* harmony import */ var _common_data_eventlog_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/data/eventlog-data.service */ 9755);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);







class DirectlyFollowsGraphService {
    constructor(_eventLogDataService) {
        this._eventLogDataService = _eventLogDataService;
        this._graph = new rxjs__WEBPACK_IMPORTED_MODULE_4__.BehaviorSubject(new _classes_directly_follows_graph_graph__WEBPACK_IMPORTED_MODULE_1__.Graph([], []));
        this._verticalDirection = new rxjs__WEBPACK_IMPORTED_MODULE_4__.BehaviorSubject(true);
    }
    ngOnDestroy() {
        this._graph.complete();
    }
    get graph$() {
        return this._graph.asObservable();
    }
    get graph() {
        return this._graph.getValue();
    }
    get verticalDirection$() {
        return this._verticalDirection.asObservable();
    }
    get verticalDirection() {
        return this._verticalDirection.getValue();
    }
    convertEventLogToDirectlyFollowsGraph(eventLog) {
        let sortedTraces = eventLog.sortedTraces;
        let edges = [];
        let vertices = [];
        sortedTraces.forEach(traces => {
            for (let i = 0; i < traces[0].events.length; i++) {
                let event = traces[0].events[i];
                //Überprüft, ob der Knoten bereits vorhanden ist, bzw. ob ein neuer Knoten erstellt werden muss.
                let vertex = vertices.find(vertex => vertex.activityName === event.activity);
                if (vertex !== undefined)
                    vertex.activityCount += traces.length;
                else
                    vertices.push(new _classes_directly_follows_graph_vertex__WEBPACK_IMPORTED_MODULE_2__.Vertex(event.activity, traces.length));
                //Überprüft, ob zwischen den letzten beiden Events bereits eine Kante vorhanden ist, bzw. ob eine neue Kante erstellt werden muss.
                if (i >= 1) {
                    let previousEvent = traces[0].events[i - 1];
                    let edge = edges.find(edge => {
                        var _a;
                        return ((_a = edge.startVertex) === null || _a === void 0 ? void 0 : _a.activityName) ===
                            previousEvent.activity &&
                            edge.endVertex.activityName === event.activity;
                    });
                    if (edge !== undefined)
                        edge.activityCount += traces.length;
                    else {
                        let startVertex = vertices.find(vertex => vertex.activityName === previousEvent.activity);
                        let endVertex = vertices.find(vertex => vertex.activityName === event.activity);
                        if (startVertex !== undefined &&
                            endVertex !== undefined)
                            edges.push(new _classes_directly_follows_graph_edge__WEBPACK_IMPORTED_MODULE_0__.Edge(startVertex, endVertex, traces.length));
                    }
                }
                //Startknoten erstellen oder wiederverwenden
                if (i == 0) {
                    let startVertex = vertices.find(vertex => vertex.activityName === event.activity + 'Start');
                    if (startVertex === undefined) {
                        startVertex = new _classes_directly_follows_graph_vertex__WEBPACK_IMPORTED_MODULE_2__.Vertex(event.activity + 'Start', traces.length, true);
                        startVertex.isStart = true;
                        vertices.push(startVertex);
                        let endVertex = vertices.find(vertex => vertex.activityName === event.activity);
                        if (endVertex !== undefined)
                            edges.push(new _classes_directly_follows_graph_edge__WEBPACK_IMPORTED_MODULE_0__.Edge(startVertex, endVertex, traces.length));
                    }
                    else {
                        startVertex.activityCount += traces.length;
                        let startEdge = edges.find(edge => {
                            var _a;
                            return ((_a = edge.startVertex) === null || _a === void 0 ? void 0 : _a.activityName) ===
                                (startVertex === null || startVertex === void 0 ? void 0 : startVertex.activityName) &&
                                edge.endVertex.activityName === event.activity;
                        });
                        if (startEdge !== undefined)
                            startEdge.activityCount += traces.length;
                    }
                }
                //Endknoten erstellen oder wiederverwenden
                if (i == traces[0].events.length - 1) {
                    let endVertex = vertices.find(vertex => vertex.activityName === event.activity + 'End');
                    if (endVertex === undefined) {
                        endVertex = new _classes_directly_follows_graph_vertex__WEBPACK_IMPORTED_MODULE_2__.Vertex(event.activity + 'End', traces.length, true);
                        endVertex.isEnd = true;
                        vertices.push(endVertex);
                        let startVertex = vertices.find(vertex => vertex.activityName === event.activity);
                        if (startVertex !== undefined)
                            edges.push(new _classes_directly_follows_graph_edge__WEBPACK_IMPORTED_MODULE_0__.Edge(startVertex, endVertex, traces.length));
                    }
                    else {
                        endVertex.activityCount += traces.length;
                        let endEdge = edges.find(edge => {
                            var _a;
                            return ((_a = edge.startVertex) === null || _a === void 0 ? void 0 : _a.activityName) ===
                                event.activity &&
                                edge.endVertex.activityName ===
                                    (endVertex === null || endVertex === void 0 ? void 0 : endVertex.activityName);
                        });
                        if (endEdge !== undefined)
                            endEdge.activityCount += traces.length;
                    }
                }
            }
        });
        return new _classes_directly_follows_graph_graph__WEBPACK_IMPORTED_MODULE_1__.Graph(vertices, edges);
    }
    displayDirectlyFollowsGraph(eventLog) {
        let net = this.convertEventLogToDirectlyFollowsGraph(eventLog);
        this._graph.next(net);
    }
    switchDirection() {
        this._verticalDirection.next(!this._verticalDirection.value);
    }
}
DirectlyFollowsGraphService.ɵfac = function DirectlyFollowsGraphService_Factory(t) { return new (t || DirectlyFollowsGraphService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_common_data_eventlog_data_service__WEBPACK_IMPORTED_MODULE_3__.EventlogDataService)); };
DirectlyFollowsGraphService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: DirectlyFollowsGraphService, factory: DirectlyFollowsGraphService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 5806:
/*!*************************************************************************!*\
  !*** ./src/app/services/views/directly-follows-graph/layout.service.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LayoutService": () => (/* binding */ LayoutService)
/* harmony export */ });
/* harmony import */ var src_app_classes_directly_follows_graph_edge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classes/directly-follows-graph/edge */ 8355);
/* harmony import */ var src_app_classes_directly_follows_graph_graph__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/classes/directly-follows-graph/graph */ 680);
/* harmony import */ var src_app_classes_directly_follows_graph_vertex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/classes/directly-follows-graph/vertex */ 7620);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);




//Layout mittels Sugiyama Algorithmus
class LayoutService {
    constructor() { }
    layout(graph) {
        this.makeGraphAcyclic(graph);
        this.setLayers(graph);
        this.createDummyVertices(graph);
        this.minimizeCrossings(graph);
        this.setPositions(graph);
        this.correctEdgeDirection(graph.edges);
    }
    setPositions(graph) {
        let layer = 0;
        let maxLayerVertices = [];
        let maxSize = graph.getMaxVerticesOnLayer() * 1.2;
        for (let i = 1; i < graph.getMaxLayer(); i++) {
            maxLayerVertices = graph.getVerticesSortedByPosition(i);
            if (maxLayerVertices.length === graph.getMaxVerticesOnLayer()) {
                layer = i;
                break;
            }
        }
        for (let i = 0; i < maxLayerVertices.length; i++) {
            maxLayerVertices[i].position = 1.2 * i;
        }
        for (let i = layer - 1; i > 0; i--) {
            let vertices = graph.getVerticesSortedByPosition(i);
            for (let j = 0; j < vertices.length; j++) {
                let edges = graph.getEdgesByStartVertex(vertices[j]);
                let neighbours = [];
                edges.forEach(edge => {
                    if (edge.startVertex !== edge.endVertex)
                        neighbours.push(edge.endVertex);
                });
                if (neighbours.length > 0) {
                    let value = 0;
                    neighbours.forEach(neighbour => (value += neighbour.position));
                    vertices[j].position = value / neighbours.length;
                }
            }
            this.setPositionGap(vertices);
            this.reduceSize(vertices, maxSize);
        }
        for (let i = layer + 1; i <= graph.getMaxLayer(); i++) {
            let vertices = graph.getVerticesSortedByPosition(i);
            for (let j = 0; j < vertices.length; j++) {
                let edges = graph.getEdgesByEndVertex(vertices[j]);
                let neighbours = [];
                edges.forEach(edge => {
                    if (edge.startVertex !== edge.endVertex)
                        neighbours.push(edge.startVertex);
                });
                if (neighbours.length > 0) {
                    let value = 0;
                    neighbours.forEach(neighbour => (value += neighbour.position));
                    vertices[j].position = value / neighbours.length;
                }
            }
            this.setPositionGap(vertices);
            this.reduceSize(vertices, maxSize);
        }
        let minPosition = graph.getMinPosition();
        graph.vertices.forEach(vertex => (vertex.position += -minPosition + 1));
    }
    makeGraphAcyclic(graph) {
        let edges = [];
        graph.edges.forEach(edge => edges.push(edge));
        let vertices = [];
        graph.vertices.forEach(vertex => vertices.push(vertex));
        let newGraph = new src_app_classes_directly_follows_graph_graph__WEBPACK_IMPORTED_MODULE_1__.Graph(vertices, edges);
        while (vertices.length != 0) {
            let sinks = newGraph.getSinks();
            //Füge dem Graph alle Senken hinzu
            while (sinks.length != 0) {
                sinks.forEach(vertex => {
                    let incomingEdges = vertex.getIncomingEdges(edges);
                    newGraph.removeVertex(vertex);
                    newGraph.removeEdges(incomingEdges);
                    sinks = newGraph.getSinks();
                });
            }
            //Füge dem Graph alle isolierten Knoten hinzu
            let isolatedVertices = newGraph.getIsolatedVertices();
            newGraph.removeVertices(isolatedVertices);
            let sources = newGraph.getSources();
            //Füge dem Graph alle Quellen hinzu
            while (sources.length != 0) {
                sources.forEach(vertex => {
                    let outgoingEdges = vertex.getOutgoingEdges(edges);
                    newGraph.removeVertex(vertex);
                    newGraph.removeEdges(outgoingEdges);
                    sources = newGraph.getSources();
                });
            }
            //Füge dem Graph den Knoten hinzu, der den maximalen Wert bezüglich ausgehender Kanten minus eingehender Kanten besitzt
            if (vertices.length != 0) {
                let vertex = newGraph.getMaxEdgeDifferenceVertex();
                let outgoingEdges = vertex.getOutgoingEdges(edges);
                let incomingEdges = vertex.getIncomingEdges(edges);
                newGraph.removeVertex(vertex);
                newGraph.removeEdges(outgoingEdges);
                newGraph.removeEdges(incomingEdges);
                incomingEdges.forEach(edge => edge.reverse());
            }
        }
    }
    setLayers(graph) {
        graph.vertices.forEach(vertex => {
            if (vertex.isStart)
                vertex.layer = 1;
            else
                vertex.layer = 2;
        });
        let sinks = graph.getSinks();
        sinks.forEach(vertex => {
            this.calculateLayer(vertex, graph);
        });
        graph.vertices.forEach(vertex => {
            if (vertex.isEnd)
                vertex.layer = graph.getMaxLayer();
        });
    }
    //Setz Knoten auf die niedrigst mögliche Ebene
    calculateLayer(vertex, graph) {
        let incomingEdges = vertex.getIncomingEdges(graph.edges);
        incomingEdges.forEach(edge => {
            vertex.layer = Math.max(vertex.layer, this.calculateLayer(edge.startVertex, graph) + 1);
        });
        return vertex.layer;
    }
    //Erzeugt Dummyknoten, damit Kanten nicht über mehrere Ebenen verlaufen
    createDummyVertices(graph) {
        let oldEdges = [];
        graph.edges.forEach(edge => {
            let layerDiff = Math.abs(edge.startVertex.layer - edge.endVertex.layer);
            //Lege Dummyknoten an, wenn zwischen ihnen Ebenen liegen.
            if (layerDiff > 1) {
                let newVertices = new Array(layerDiff - 1);
                //Erstelle für jede Ebene einen Knoten
                for (let i = 1; i < layerDiff; i++) {
                    let vertexName;
                    if (edge.isReversed)
                        vertexName =
                            edge.endVertex.activityName.toString() +
                                ' To ' +
                                edge.startVertex.activityName.toString() +
                                ' ' +
                                i.toString();
                    else
                        vertexName =
                            edge.startVertex.activityName.toString() +
                                ' To ' +
                                edge.endVertex.activityName.toString() +
                                ' ' +
                                i.toString();
                    let vertex = new src_app_classes_directly_follows_graph_vertex__WEBPACK_IMPORTED_MODULE_2__.Vertex(vertexName, 0, true);
                    vertex.layer =
                        Math.min(edge.startVertex.layer, edge.endVertex.layer) +
                            i;
                    graph.vertices.push(vertex);
                    newVertices[i - 1] = vertex;
                }
                //Kante zu ursprünglichen Startknoten
                let newEdge = new src_app_classes_directly_follows_graph_edge__WEBPACK_IMPORTED_MODULE_0__.Edge(edge.startVertex, newVertices[0], edge.activityCount, edge.isReversed);
                graph.edges.push(newEdge);
                //Kanten zwischen Dummyknoten
                for (let i = 0; i < layerDiff - 2; i++) {
                    newEdge = new src_app_classes_directly_follows_graph_edge__WEBPACK_IMPORTED_MODULE_0__.Edge(newVertices[i], newVertices[i + 1], edge.activityCount, edge.isReversed);
                    graph.edges.push(newEdge);
                }
                //Kante zu ursprünglichen Endknoten
                newEdge = new src_app_classes_directly_follows_graph_edge__WEBPACK_IMPORTED_MODULE_0__.Edge(newVertices[layerDiff - 2], edge.endVertex, edge.activityCount, edge.isReversed);
                graph.edges.push(newEdge);
                oldEdges.push(edge);
            }
        });
        graph.removeEdges(oldEdges);
    }
    minimizeCrossings(graph) {
        let differentStartingPermutation = 0;
        let crossings = Number.MAX_VALUE;
        let improved = false;
        //Teste zufällige Permutation für die erste Ebene
        do {
            differentStartingPermutation++;
            let graphClone = Object.assign(new src_app_classes_directly_follows_graph_graph__WEBPACK_IMPORTED_MODULE_1__.Graph(new Array(), new Array()), graph);
            let crossingsClone = Number.MAX_VALUE;
            this.permutateFirstLayerPositions(graphClone.vertices);
            //Permutiere die Ebenen solange Verbesserungen erzielt werden
            do {
                improved = false;
                let graphCloneNew = Object.assign(new src_app_classes_directly_follows_graph_graph__WEBPACK_IMPORTED_MODULE_1__.Graph(new Array(), new Array()), graphClone);
                //Betrachte iterativ die zwei aufeinanderfolgenden Ebenen von unten nach oben
                for (let i = 1; i < graph.getMaxLayer(); i++) {
                    this.setNextLayerPositions(graphCloneNew, i, i + 1);
                    this.setPositionOffset(graphCloneNew, i + 1);
                }
                //Betrachte iterativ die zwei aufeinanderfolgenden Ebenen von oben nach unten
                for (let i = graph.getMaxLayer(); i > 1; i--) {
                    this.setNextLayerPositions(graphCloneNew, i, i - 1);
                    this.setPositionOffset(graphCloneNew, i - 1);
                }
                let crossingsCloneNew = this.countCrossings(graphCloneNew);
                if (crossingsCloneNew < crossingsClone) {
                    crossingsClone = crossingsCloneNew;
                    graphClone = graphCloneNew;
                    improved = true;
                }
            } while (crossingsClone != 0 && improved);
            if (crossingsClone < crossings) {
                graph = graphClone;
                crossings = crossingsClone;
            }
        } while (crossings != 0 && differentStartingPermutation < 23);
    }
    permutateFirstLayerPositions(vertices) {
        let firstLayerVertices = vertices.filter(vertex => vertex.layer == 1);
        for (let i = 0; i < firstLayerVertices.length; i++) {
            firstLayerVertices[i].position = i * 2;
        }
        for (let i = 0; i < firstLayerVertices.length; i++) {
            let n = Math.floor(Math.random() * firstLayerVertices.length);
            let tmp = firstLayerVertices[i].position;
            firstLayerVertices[i].position = firstLayerVertices[n].position;
            firstLayerVertices[n].position = tmp;
        }
    }
    //Setzt Knoten auf das Baryzentrum der Nachbarn der angegebenen Ebene
    setNextLayerPositions(graph, layer, nextLayer) {
        let vertices = graph.vertices.filter(vertex => vertex.layer == layer);
        let nextVertices = graph.vertices.filter(vertex => vertex.layer == nextLayer);
        nextVertices.forEach(nextVertex => {
            let edges;
            let neighbours;
            if (layer < nextLayer) {
                edges = graph.edges.filter(edge => edge.endVertex === nextVertex);
                neighbours = vertices.filter(vertex => edges.find(edge => edge.startVertex === vertex) !=
                    undefined);
            }
            else {
                edges = graph.edges.filter(edge => edge.startVertex === nextVertex);
                neighbours = vertices.filter(vertex => edges.find(edge => edge.endVertex === vertex) !=
                    undefined);
            }
            if (neighbours.length > 0) {
                let value = 0;
                neighbours.forEach(neighbour => (value += neighbour.position));
                nextVertex.position = value / neighbours.length;
            }
        });
    }
    //Setze den korrekten Abstand zwischen Knoten
    setPositionOffset(graph, layer) {
        let sortedVertices = graph.getVerticesSortedByPosition(layer);
        //Setze Knoten mit gleicher Position verteilt um die Position
        for (let i = 0; i < sortedVertices.length; i++) {
            let sameValue = 0;
            while (i + sameValue + 1 < sortedVertices.length &&
                sortedVertices[i].position ==
                    sortedVertices[i + sameValue + 1].position)
                sameValue++;
            for (let j = i; j <= i + sameValue; j++) {
                sortedVertices[j].position =
                    sortedVertices[j].position - sameValue * 0.5 + j - i;
            }
        }
        //Setze Position der Knoten, dass genügend Abstand zwischen ihnen besteht
        this.setPositionGap(sortedVertices);
        let maxSize = 2 * graph.getMaxVerticesOnLayer();
        //Setze Position der Knoten, dass sie nicht über die maximale Größe hinausgehen
        this.reduceSize(sortedVertices, maxSize);
    }
    setPositionGap(vertices) {
        for (let i = 1; i < vertices.length; i++)
            vertices[i].position = Math.max(vertices[i].position, vertices[i - 1].position + 1);
    }
    reduceSize(vertices, maxSize) {
        if (vertices[vertices.length - 1].position > maxSize) {
            vertices[vertices.length - 1].position = maxSize;
            for (let i = vertices.length - 2; i >= 0; i--)
                vertices[i].position = Math.min(vertices[i].position, vertices[i + 1].position - 1);
        }
    }
    countCrossings(graph) {
        let count = 0;
        for (let i = 1; i < graph.getMaxLayer(); i++) {
            let edges = graph.edges.filter(edge => edge.startVertex.layer === i);
            edges.forEach(edge => edges.forEach(e => {
                if ((e.startVertex.position < edge.startVertex.position &&
                    e.endVertex.position > edge.endVertex.position) ||
                    (e.startVertex.position > edge.startVertex.position &&
                        e.endVertex.position < edge.endVertex.position))
                    count++;
            }));
        }
        return count;
    }
    correctEdgeDirection(edges) {
        edges.forEach(edge => {
            if (edge.isReversed)
                edge.reverse();
        });
    }
}
LayoutService.ɵfac = function LayoutService_Factory(t) { return new (t || LayoutService)(); };
LayoutService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: LayoutService, factory: LayoutService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 8409:
/*!**********************************************************************!*\
  !*** ./src/app/services/views/directly-follows-graph/svg.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SvgService": () => (/* binding */ SvgService)
/* harmony export */ });
/* harmony import */ var _display_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display.service */ 5860);
/* harmony import */ var _common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/svg-service/svg.service */ 7544);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);




class SvgService {
    constructor(_displayService) {
        this._displayService = _displayService;
        this._rectWidth = 150;
        this._rectHeight = 40;
        this._offsetXValue = this._rectWidth * 1.5;
        this._offsetYValue = this._rectHeight * 3;
        this.maxActivityCountVertex = 0;
        this.minValue = 50;
        this._svgElements = [];
        this.font = '15px sans-Serif';
        this.maxFontWidth = 130;
    }
    get rectWidth() {
        return this._rectWidth;
    }
    get rectHeight() {
        return this._rectHeight;
    }
    get offsetXValue() {
        return this._offsetXValue;
    }
    get offsetYValue() {
        return this._offsetYValue;
    }
    get svgElements() {
        return this._svgElements;
    }
    createSvgElements(graph) {
        this._svgElements = [];
        this.maxActivityCountVertex = graph.getMaxActivityCountVertex();
        this._svgElements.push(this.createGradients(graph));
        graph.vertices.forEach(vertex => {
            let container = this.createContainer(vertex);
            let box = this.createRect(vertex);
            //Mache Elemente zu Kindern, damit sie gemeinsam manipuliert werden können.
            container.append(box);
            if (!vertex.isDummy) {
                let text = this.createTextForGraph(vertex);
                container.append(text);
            }
            else if (vertex.layer !== 1 &&
                vertex.layer !== graph.getMaxLayer()) {
                let path = this.createPathForDummyVertex(vertex);
                container.append(path);
            }
            vertex.svgElement = container;
            this._svgElements.push(container);
        });
        //Pfeilspitze für Kanten erstellen
        let arrow = this.createArrow();
        this._svgElements.push(arrow);
        graph.edges.forEach(edge => {
            let path = this.createPath(edge, graph);
            if (!edge.endVertex.isDummy || edge.endVertex.isEnd) {
                let text = this.createTextForEdge(edge);
                this._svgElements.push(text);
            }
            this._svgElements.push(path);
        });
        return this._svgElements;
    }
    createGradients(graph) {
        let defs = this.createSvgElement('defs');
        graph.vertices.forEach(vertex => {
            if (!vertex.isDummy) {
                let linearGradient = this.createSvgElement('linearGradient');
                linearGradient.setAttribute('id', vertex.activityName + 'Gradient');
                linearGradient.setAttribute('x1', '0%');
                linearGradient.setAttribute('y1', '0%');
                linearGradient.setAttribute('x2', '100%');
                linearGradient.setAttribute('y2', '0%');
                let color = _common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_1__.SvgService.activityColorMap.get(vertex.activityName);
                //Anpassung von Durchlässigkeit und Offset, um weniger häufige Knoten abzugrenzen
                let opacity = vertex.activityCount / this.maxActivityCountVertex;
                let offset = 33 - 33 * opacity;
                let stop1 = this.createStop(offset, opacity, color);
                let stop2 = this.createStop(50, 1, color);
                offset = 67 + 33 * opacity;
                let stop3 = this.createStop(offset, opacity, color);
                linearGradient.append(stop1);
                linearGradient.append(stop2);
                linearGradient.append(stop3);
                defs.append(linearGradient);
            }
        });
        return defs;
    }
    createStop(offset, opacity, color) {
        let stop = this.createSvgElement('stop');
        stop.setAttribute('offset', offset.toString() + '%');
        if (color != undefined)
            stop.setAttribute('stop-color', color.toString());
        stop.setAttribute('stop-opacity', opacity.toString());
        return stop;
    }
    createContainer(vertex) {
        let svg = this.createSvgElement('svg');
        let x = this.minValue;
        let y = this.minValue;
        //Setze Abstand zwischen Positionen und Ebenen basierend auf der Ausrichtung
        if (this._displayService.verticalDirection) {
            x += this.offsetXValue * (vertex.position - 1);
            y += this.offsetYValue * (vertex.layer - 1);
            if (vertex.isStart)
                y += this.rectHeight / 2;
            if (vertex.isStart || vertex.isEnd)
                x += this.rectWidth / 4;
        }
        else {
            x += this.offsetXValue * (vertex.layer - 1);
            y += this.offsetYValue * (vertex.position - 1);
            if (vertex.isStart)
                x += this.rectWidth / 2;
            if (vertex.isStart || vertex.isEnd)
                y += this.rectHeight / 4;
        }
        svg.setAttribute('name', vertex.activityName.toString());
        svg.setAttribute('x', x.toString());
        svg.setAttribute('y', y.toString());
        let width = this.rectWidth;
        let height = this.rectHeight;
        if (vertex.isStart || vertex.isEnd) {
            height /= 2;
            width /= 2;
        }
        svg.setAttribute('width', width.toString());
        svg.setAttribute('height', height.toString());
        return svg;
    }
    createPathForDummyVertex(vertex) {
        let path = this.createSvgElement('path');
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        if (this._displayService.verticalDirection) {
            startX += this.rectWidth / 2;
            endX += this.rectWidth / 2;
            endY += this.rectHeight;
        }
        else {
            startY += this.rectHeight / 2;
            endX += this.rectWidth;
            endY += this.rectHeight / 2;
        }
        let coordinates = 'M ' + startX + ' ' + startY + ' L ' + endX + ' ' + endY;
        path.setAttribute('d', coordinates);
        path.setAttribute('stroke-width', '1');
        path.setAttribute('stroke', 'black');
        path.setAttribute('fill', 'none');
        path.setAttribute('pointer-events', 'none');
        return path;
    }
    createRect(vertex) {
        let rect = this.createSvgElement('rect');
        rect.setAttribute('name', vertex.activityName.toString());
        rect.setAttribute('rx', '15');
        rect.setAttribute('ry', '15');
        let width = this.rectWidth;
        let height = this.rectHeight;
        if (!vertex.isDummy) {
            rect.setAttribute('fill', "url('#" + vertex.activityName + "Gradient')");
            rect.setAttribute('fill-opacity', '1');
            rect.setAttribute('stroke-width', '2');
            rect.setAttribute('stroke', 'black');
        }
        else if (vertex.isStart || vertex.isEnd) {
            if (vertex.isStart || vertex.isEnd) {
                width /= 2;
                height /= 2;
            }
            rect.setAttribute('fill', 'rgb(125,125,125)');
            rect.setAttribute('fill-opacity', '1');
            rect.setAttribute('stroke-width', '2');
            rect.setAttribute('stroke', 'black');
        }
        else {
            rect.setAttribute('fill-opacity', '0');
        }
        rect.setAttribute('width', width.toString());
        rect.setAttribute('height', height.toString());
        return rect;
    }
    createTextForGraph(vertex) {
        let text = this.createSvgElement('text');
        text.setAttribute('x', `50%`);
        text.setAttribute('y', `50%`);
        text.setAttribute('text-anchor', `middle`);
        text.setAttribute('dominant-baseline', `middle`);
        text.setAttribute('font-family', 'sans-serif');
        text.appendChild(this.createTspanForText(vertex.activityName.toString(), -0.2));
        text.appendChild(this.createTspanForText(vertex.activityCount.toString(), 0.5));
        text.setAttribute('pointer-events', 'none');
        return text;
    }
    createTspanForText(text, offset) {
        let tspan = this.createSvgElement('tspan');
        tspan.setAttribute('x', (this.rectWidth / 2).toString());
        tspan.setAttribute('dy', (this.rectHeight * offset).toString());
        tspan.setAttribute('width', `100%`);
        tspan.setAttribute('height', `100%`);
        tspan.setAttribute('text-anchor', `middle`);
        tspan.setAttribute('dominant-baseline', `middle`);
        tspan.setAttribute('pointer-events', 'none');
        tspan.textContent = this.getSubString(text);
        return tspan;
    }
    getSubString(text) {
        for (let i = 0; i <= text.length; i++) {
            let length = this.getStringWidth(text.substring(0, i));
            if (length > this.maxFontWidth) {
                return text.substring(0, i - 2) + '...';
            }
        }
        return text;
    }
    getStringWidth(text) {
        var canvas = document.createElement('canvas');
        canvas.setAttribute('width', '100%');
        canvas.setAttribute('height', '380px');
        var ctx = canvas.getContext('2d');
        ctx.font = this.font;
        return ctx.measureText(text.toString()).width;
    }
    createArrow() {
        let defs = this.createSvgElement('defs');
        defs.append(this.createMarker());
        return defs;
    }
    createMarker() {
        let marker = this.createSvgElement('marker');
        marker.setAttribute('viewBox', '0 0 10 10');
        marker.setAttribute('id', 'marker');
        marker.setAttribute('refX', '10');
        marker.setAttribute('refY', '5');
        marker.setAttribute('markerUnits', 'strokeWidth');
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '10');
        marker.setAttribute('orient', 'auto');
        let polygon = this.createSvgElement('polygon');
        polygon.setAttribute('points', '0 0, 10 5, 0 10');
        marker.append(polygon);
        return marker;
    }
    createPath(edge, graph) {
        let path = this.createSvgElement('path');
        let id = 'path' +
            edge.startVertex.activityName +
            edge.endVertex.activityName;
        path.setAttribute('id', id);
        path.setAttribute('d', this.setPathCoordinates(edge, graph));
        path.setAttribute('stroke-width', '1');
        path.setAttribute('stroke', 'black');
        path.setAttribute('fill', 'none');
        if (!edge.endVertex.isDummy || edge.endVertex.isEnd)
            path.setAttribute('marker-end', 'url(#marker)');
        path.setAttribute('pointer-events', 'none');
        edge.pathSvgElement = path;
        return path;
    }
    setPathCoordinates(edge, graph) {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        let startXOffset = 0;
        let endXOffset = 0;
        let startYOffset = 0;
        let endYOffset = 0;
        //Setze Koordinaten basierend auf Ausrichtung und den Ebenen
        //Kante verläuft von niedriger Ebene zu hoher Ebene
        if (edge.startVertex.layer < edge.endVertex.layer) {
            let upperLayerEdges = edge.startVertex.getUpperLayerEdges(graph.edges);
            let lowerLayerEdges = edge.endVertex.getLowerLayerEdges(graph.edges);
            if (this._displayService.verticalDirection) {
                startXOffset =
                    edge.startVertex.calculateEdgePosition(edge, upperLayerEdges, this._displayService.verticalDirection) /
                        (upperLayerEdges.length + 1);
                startXOffset *= this.rectWidth;
                startYOffset = this.rectHeight;
                endXOffset =
                    edge.endVertex.calculateEdgePosition(edge, lowerLayerEdges, this._displayService.verticalDirection) /
                        (lowerLayerEdges.length + 1);
                endXOffset *= this.rectWidth;
            }
            else {
                startXOffset = this.rectWidth;
                startYOffset =
                    edge.startVertex.calculateEdgePosition(edge, upperLayerEdges, this._displayService.verticalDirection) /
                        (upperLayerEdges.length + 1);
                startYOffset *= this.rectHeight;
                endYOffset =
                    edge.endVertex.calculateEdgePosition(edge, lowerLayerEdges, this._displayService.verticalDirection) /
                        (lowerLayerEdges.length + 1);
                endYOffset *= this.rectHeight;
            }
            //Kante verläuft von hoher Ebene zu niedriger Ebene
        }
        else if (edge.startVertex.layer > edge.endVertex.layer) {
            let lowerLayerEdges = edge.startVertex.getLowerLayerEdges(graph.edges);
            let upperLayerEdges = edge.endVertex.getUpperLayerEdges(graph.edges);
            if (this._displayService.verticalDirection) {
                startXOffset =
                    edge.startVertex.calculateEdgePosition(edge, lowerLayerEdges, this._displayService.verticalDirection) /
                        (lowerLayerEdges.length + 1);
                startXOffset *= this.rectWidth;
                endXOffset =
                    edge.endVertex.calculateEdgePosition(edge, upperLayerEdges, this._displayService.verticalDirection) /
                        (upperLayerEdges.length + 1);
                endXOffset *= this.rectWidth;
                endYOffset = this.rectHeight;
            }
            else {
                startYOffset =
                    edge.startVertex.calculateEdgePosition(edge, lowerLayerEdges, this._displayService.verticalDirection) /
                        (lowerLayerEdges.length + 1);
                startYOffset *= this.rectHeight;
                endXOffset = this.rectWidth;
                endYOffset =
                    edge.endVertex.calculateEdgePosition(edge, upperLayerEdges, this._displayService.verticalDirection) /
                        (upperLayerEdges.length + 1);
                endYOffset *= this.rectHeight;
            }
            //Start- und Endknoten der Kante sind gleich
        }
        else {
            if (this._displayService.verticalDirection) {
                startXOffset = this._rectWidth;
                endXOffset = this.rectWidth;
                startYOffset = this._rectHeight * 0.75;
                endYOffset = this.rectHeight * 0.25;
            }
            else {
                startXOffset = this._rectWidth * 0.75;
                startYOffset = this._rectHeight;
                endXOffset = this.rectWidth * 0.25;
                endYOffset = this.rectHeight;
            }
        }
        if (edge.startVertex.isStart) {
            if (this._displayService.verticalDirection) {
                startXOffset -= this.rectWidth / 4;
                startYOffset -= this.rectHeight / 2;
            }
            else {
                startXOffset -= this.rectWidth / 2;
                startYOffset -= this.rectHeight / 4;
            }
        }
        if (edge.endVertex.isEnd)
            if (this._displayService.verticalDirection) {
                endXOffset -= this.rectWidth / 4;
            }
            else {
                endYOffset -= this.rectHeight / 4;
            }
        startX = edge.startVertex.getSvgElementXValue() + startXOffset;
        endX = edge.endVertex.getSvgElementXValue() + endXOffset;
        startY = edge.startVertex.getSvgElementYValue() + startYOffset;
        endY = edge.endVertex.getSvgElementYValue() + endYOffset;
        let coordinates = 'M ' + startX + ' ' + startY;
        if (this._displayService.verticalDirection && edge.isTargetingSelf())
            coordinates +=
                ' Q ' +
                    (startX + 25) +
                    ' ' +
                    (startY + endY) / 2 +
                    ' ' +
                    endX +
                    ' ' +
                    endY;
        else if (!this._displayService.verticalDirection &&
            edge.isTargetingSelf())
            coordinates +=
                ' Q ' +
                    (startX + endX) / 2 +
                    ' ' +
                    (startY + 25) +
                    ' ' +
                    endX +
                    ' ' +
                    endY;
        else
            coordinates += ' L ' + endX + ' ' + endY;
        return coordinates;
    }
    createTextForEdge(edge) {
        var _a;
        let text = this.createSvgElement('text');
        let name = ((_a = edge.pathSvgElement) === null || _a === void 0 ? void 0 : _a.getAttribute('name')) + 'Text';
        text.setAttribute('name', name);
        this.setTextCoordinates(edge, text);
        text.setAttribute('text-anchor', `middle`);
        text.setAttribute('dominant-baseline', `middle`);
        text.setAttribute('font', 'bold 30px sans-serif');
        text.textContent = edge.activityCount.toString();
        text.setAttribute('pointer-events', 'none');
        edge.textSvgElement = text;
        return text;
    }
    setTextCoordinates(edge, text) {
        var _a, _b;
        let d = (_b = (_a = edge.pathSvgElement) === null || _a === void 0 ? void 0 : _a.getAttribute('d')) === null || _b === void 0 ? void 0 : _b.split(' ');
        if (d !== undefined) {
            let startX = +d[1];
            let endX = +d[d.length - 2];
            let startY = +d[2];
            let endY = +d[d.length - 1];
            let xOffset = 4.5;
            let yOffset = -4.5;
            if (edge.startVertex === edge.endVertex) {
                if (!this._displayService.verticalDirection) {
                    xOffset = 0;
                    yOffset = 25;
                }
                else {
                    xOffset = 27.5;
                    yOffset = 0;
                }
            }
            else if ((startY < endY && startX > endX) ||
                (startY > endY && startX < endX))
                xOffset *= -1;
            let x = 0.4 * startX + 0.6 * endX + xOffset;
            text.setAttribute('x', x.toString());
            let y = 0.4 * startY + 0.6 * endY + yOffset;
            text.setAttribute('y', y.toString());
            let transformOrigin = x.toString() + 'px ' + y.toString() + 'px';
            text.setAttribute('transform-origin', transformOrigin);
            let rotation = 0;
            if (this._displayService.verticalDirection) {
                if (edge.startVertex !== edge.endVertex)
                    rotation = 90;
            }
            if (startX !== endX && startY !== endY)
                rotation =
                    (360 / (2 * Math.PI)) *
                        Math.atan(((endY - startY) ^ 2) / ((endX - startX) ^ 2));
            text.setAttribute('transform', 'rotate(' + rotation + ')');
        }
    }
    createSvgElement(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    updateLayer(vertex, graph) {
        var _a, _b, _c;
        let positionValue;
        let offsetValue;
        let axis;
        let rectSize;
        if (this._displayService.verticalDirection) {
            positionValue = vertex.getSvgElementXValue();
            offsetValue = this.offsetXValue;
            axis = 'x';
            rectSize = this.rectWidth;
        }
        else {
            positionValue = vertex.getSvgElementYValue();
            offsetValue = this.offsetYValue;
            axis = 'y';
            rectSize = this.rectHeight;
        }
        if (positionValue < this.minValue)
            (_a = vertex.svgElement) === null || _a === void 0 ? void 0 : _a.setAttribute(axis, this.minValue.toString());
        let vertices = graph.getVerticesSortedByPosition(vertex.layer);
        let index = vertices.findIndex(v => v === vertex);
        //Knoten wird nach links/oben geschoben
        if (index > 0) {
            let previousPositionValue = this._displayService
                .verticalDirection
                ? vertices[index - 1].getSvgElementXValue()
                : vertices[index - 1].getSvgElementYValue();
            if (previousPositionValue + rectSize > positionValue) {
                let newPositionValue = Math.max(previousPositionValue + offsetValue, positionValue + rectSize);
                (_b = vertices[index - 1].svgElement) === null || _b === void 0 ? void 0 : _b.setAttribute(axis, newPositionValue.toString());
                vertices[index - 1].position =
                    (newPositionValue - this.minValue) / offsetValue + 1;
            }
        }
        //Knoten wird nach rechts/unten geschoben
        if (index < vertices.length - 1) {
            let nextPositionValue = this._displayService
                .verticalDirection
                ? vertices[index + 1].getSvgElementXValue()
                : vertices[index + 1].getSvgElementYValue();
            if (nextPositionValue - rectSize < positionValue) {
                let newPositionValue;
                //Position abhängig davon setzen, ob genügend Platz ist
                if (positionValue / rectSize > index + 1)
                    newPositionValue = Math.min(nextPositionValue - offsetValue, positionValue - rectSize);
                else
                    newPositionValue = positionValue + offsetValue;
                newPositionValue = Math.max(this.minValue, newPositionValue);
                (_c = vertices[index + 1].svgElement) === null || _c === void 0 ? void 0 : _c.setAttribute(axis, newPositionValue.toString());
                vertices[index + 1].position =
                    (newPositionValue - this.minValue) / this.offsetXValue + 1;
            }
        }
        vertex.position = (positionValue - this.minValue) / offsetValue + 1;
        vertices = graph.getVerticesSortedByPosition(vertex.layer);
        index = vertices.findIndex(v => v === vertex);
        this.updateOffset(vertices, offsetValue, rectSize, axis, index);
        this.updateEdges(graph, vertex.layer);
    }
    updateOffset(vertices, offsetValue, rectSize, axis, index) {
        var _a, _b;
        for (let i = index - 1; i > 0; i--) {
            let currentPositionValue = this._displayService
                .verticalDirection
                ? vertices[i].getSvgElementXValue()
                : vertices[i].getSvgElementYValue();
            let previousPositionValue = this._displayService
                .verticalDirection
                ? vertices[i - 1].getSvgElementXValue()
                : vertices[i - 1].getSvgElementYValue();
            if (previousPositionValue + rectSize > currentPositionValue) {
                let newPositionValue = currentPositionValue - rectSize;
                (_a = vertices[i - 1].svgElement) === null || _a === void 0 ? void 0 : _a.setAttribute(axis, newPositionValue.toString());
                previousPositionValue = this._displayService.verticalDirection
                    ? vertices[i - 1].getSvgElementXValue()
                    : vertices[i - 1].getSvgElementYValue();
                vertices[i - 1].position =
                    (previousPositionValue - this.minValue) / offsetValue + 1;
            }
            else {
                break;
            }
        }
        for (let i = index + 1; i < vertices.length - 1; i++) {
            let currentPositionValue = this._displayService
                .verticalDirection
                ? vertices[i].getSvgElementXValue()
                : vertices[i].getSvgElementYValue();
            let nextPositionValue = this._displayService
                .verticalDirection
                ? vertices[i + 1].getSvgElementXValue()
                : vertices[i + 1].getSvgElementYValue();
            if (currentPositionValue + rectSize > nextPositionValue) {
                let newPositionValue = currentPositionValue + rectSize;
                (_b = vertices[i + 1].svgElement) === null || _b === void 0 ? void 0 : _b.setAttribute(axis, newPositionValue.toString());
                nextPositionValue = this._displayService.verticalDirection
                    ? vertices[i + 1].getSvgElementXValue()
                    : vertices[i + 1].getSvgElementYValue();
                vertices[i + 1].position =
                    (nextPositionValue - this.minValue) / offsetValue + 1;
            }
            else {
                break;
            }
        }
    }
    updateEdges(graph, layer) {
        let edges = graph.getEdgesByLayer(layer);
        edges.forEach(edge => {
            var _a;
            (_a = edge.pathSvgElement) === null || _a === void 0 ? void 0 : _a.setAttribute('d', this.setPathCoordinates(edge, graph));
            if (!edge.endVertex.isDummy || edge.endVertex.isEnd) {
                let text = edge.textSvgElement;
                if (text !== undefined && text !== null)
                    this.setTextCoordinates(edge, text);
            }
        });
    }
}
SvgService.ɵfac = function SvgService_Factory(t) { return new (t || SvgService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_display_service__WEBPACK_IMPORTED_MODULE_0__.DirectlyFollowsGraphService)); };
SvgService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: SvgService, factory: SvgService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 9270:
/*!***********************************************************!*\
  !*** ./src/app/services/views/loading/loading.service.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoadingService": () => (/* binding */ LoadingService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 6317);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


class LoadingService {
    constructor() {
        this._loading = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
        this.loading$ = this._loading.asObservable();
    }
    show() {
        this._loading.next(true);
    }
    hide() {
        this._loading.next(false);
    }
}
LoadingService.ɵfac = function LoadingService_Factory(t) { return new (t || LoadingService)(); };
LoadingService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: LoadingService, factory: LoadingService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 6575:
/*!***********************************************************************************!*\
  !*** ./src/app/services/views/log-information/display-service/display.service.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DisplayService": () => (/* binding */ DisplayService)
/* harmony export */ });
/* harmony import */ var _classes_diagram_diagram__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../classes/diagram/diagram */ 1788);
/* harmony import */ var _classes_diagram_GraphTrace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../classes/diagram/GraphTrace */ 3415);
/* harmony import */ var _classes_diagram_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../classes/diagram/element */ 2928);
/* harmony import */ var _components_log_information_view_log_information_view_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/log-information-view/log-information-view.component */ 7770);
/* harmony import */ var _common_display_service_display_base_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/display-service/display-base.service */ 3557);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);






class DisplayService extends _common_display_service_display_base_service__WEBPACK_IMPORTED_MODULE_4__.DisplayServiceBase {
    convertTraceCaseToDiagram(traceCase) {
        let caseId = traceCase.caseId;
        let borderAndCaseIdentifierElement = new _classes_diagram_element__WEBPACK_IMPORTED_MODULE_2__.Element(_classes_diagram_element__WEBPACK_IMPORTED_MODULE_2__.ElementType.text, () => this.traceCaseSelectionService.selectTraceCaseIds([caseId]));
        let graphTrace = new _classes_diagram_GraphTrace__WEBPACK_IMPORTED_MODULE_1__.GraphTrace(this.getEventGraphics(traceCase, [caseId]), 1, [borderAndCaseIdentifierElement], [caseId]);
        return new _classes_diagram_diagram__WEBPACK_IMPORTED_MODULE_0__.Diagram([graphTrace]);
    }
    displayLogTraceCase(traceCase) {
        let next = this.convertTraceCaseToDiagram(traceCase);
        this._diagram$.next(next);
    }
}
DisplayService.ɵfac = /*@__PURE__*/ function () { let ɵDisplayService_BaseFactory; return function DisplayService_Factory(t) { return (ɵDisplayService_BaseFactory || (ɵDisplayService_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetInheritedFactory"](DisplayService)))(t || DisplayService); }; }();
DisplayService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: DisplayService, factory: DisplayService.ɵfac, providedIn: _components_log_information_view_log_information_view_component__WEBPACK_IMPORTED_MODULE_3__.LogInformationViewComponent });


/***/ }),

/***/ 4515:
/*!*******************************************************************************!*\
  !*** ./src/app/services/views/value-chain/display-service/display.service.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DisplayService": () => (/* binding */ DisplayService)
/* harmony export */ });
/* harmony import */ var _classes_diagram_diagram__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../classes/diagram/diagram */ 1788);
/* harmony import */ var _classes_diagram_GraphTrace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../classes/diagram/GraphTrace */ 3415);
/* harmony import */ var _classes_diagram_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../classes/diagram/element */ 2928);
/* harmony import */ var _common_display_service_display_base_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/display-service/display-base.service */ 3557);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);





class DisplayService extends _common_display_service_display_base_service__WEBPACK_IMPORTED_MODULE_3__.DisplayServiceBase {
    convertEventLogToDiagram(log) {
        let traces = log.sortedTraces;
        let graphTraces = new Array();
        traces.forEach(traces => {
            let caseIds = traces.map(val => {
                return val.caseId;
            });
            let traceCount = new _classes_diagram_element__WEBPACK_IMPORTED_MODULE_2__.Element(_classes_diagram_element__WEBPACK_IMPORTED_MODULE_2__.ElementType.text, () => this.traceCaseSelectionService.selectTraceCaseIds(caseIds));
            let graphTrace = new _classes_diagram_GraphTrace__WEBPACK_IMPORTED_MODULE_1__.GraphTrace(this.getEventGraphics(traces[0], caseIds), traces.length, [traceCount], caseIds);
            graphTraces.push(graphTrace);
        });
        return new _classes_diagram_diagram__WEBPACK_IMPORTED_MODULE_0__.Diagram(graphTraces);
    }
    displayEventLog(log) {
        let net = this.convertEventLogToDiagram(log);
        this._diagram$.next(net);
        return net;
    }
}
DisplayService.ɵfac = /*@__PURE__*/ function () { let ɵDisplayService_BaseFactory; return function DisplayService_Factory(t) { return (ɵDisplayService_BaseFactory || (ɵDisplayService_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetInheritedFactory"](DisplayService)))(t || DisplayService); }; }();
DisplayService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: DisplayService, factory: DisplayService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 4953:
/*!******************************************************************************!*\
  !*** ./src/app/services/views/value-chain/value-chain-controller.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValueChainControllerService": () => (/* binding */ ValueChainControllerService)
/* harmony export */ });
/* harmony import */ var _common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/svg-service/svg.service */ 7544);
/* harmony import */ var _display_service_display_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display-service/display.service */ 4515);
/* harmony import */ var _common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/layout-service/layout.service */ 2555);
/* harmony import */ var _common_trace_case_selection_service_trace_case_selection_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/trace-case-selection-service/trace-case-selection.service */ 62);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 6317);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);










class ValueChainControllerService {
    constructor(_displayService, _layoutService, _svgService, _traceCaseSelectionService) {
        this._displayService = _displayService;
        this._layoutService = _layoutService;
        this._svgService = _svgService;
        this._traceCaseSelectionService = _traceCaseSelectionService;
        this.widthPx = 1080;
        this.heightPx = 390;
        this._elements$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__.BehaviorSubject(new Array());
    }
    updateValueChain(log) {
        let diagram = this._displayService.displayEventLog(log);
        [this.widthPx, this.heightPx] = this._layoutService.layout(this._displayService.diagram);
        const elements = this._svgService.createSvgElements(diagram, this._traceCaseSelectionService.selectedTraceCaseIds, false);
        this._elements$.next(elements);
    }
}
ValueChainControllerService.ɵfac = function ValueChainControllerService_Factory(t) { return new (t || ValueChainControllerService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_display_service_display_service__WEBPACK_IMPORTED_MODULE_1__.DisplayService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_common_layout_service_layout_service__WEBPACK_IMPORTED_MODULE_2__.LayoutService.VALUE_CHAIN_INSTANCE), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_common_svg_service_svg_service__WEBPACK_IMPORTED_MODULE_0__.SvgService.VALUE_CHAIN_INSTANCE), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_common_trace_case_selection_service_trace_case_selection_service__WEBPACK_IMPORTED_MODULE_3__.TraceCaseSelectionService)); };
ValueChainControllerService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: ValueChainControllerService, factory: ValueChainControllerService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map