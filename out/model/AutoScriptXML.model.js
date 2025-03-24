"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AutoScriptXMLModel {
    getSource() {
        return this.source;
    }
    setSource(source) {
        this.source = source;
    }
    getAutoScriptName() {
        return this.autoScriptName;
    }
    isActive() {
        return this.active;
    }
    getAutoScriptId() {
        return this.autoScriptId;
    }
    getScriptLanguage() {
        return this.scriptLanguage;
    }
    getComments() {
        return this.comments;
    }
    getLogLevel() {
        return this.logLevel;
    }
    getStatus() {
        return this.status;
    }
    getChangeBy() {
        return this.changedBy;
    }
    getChangeDate() {
        return this.changeDate;
    }
    constructor(xml) {
        this.autoScriptName = xml.AUTOSCRIPT[0];
        this.autoScriptId = xml.AUTOSCRIPTID[0] ? xml.AUTOSCRIPTID[0] : 0;
        this.source = xml.SOURCE[0];
        this.comments = xml.COMMENTS[0];
        this.scriptLanguage = xml.SCRIPTLANGUAGE[0];
        this.status = xml.STATUS[0];
        this.logLevel = xml.LOGLEVEL[0];
        this.changedBy = xml.CHANGEBY[0];
        this.changeDate = xml.CHANGEDATE[0];
        this.active = xml.ACTIVE[0] === 1 ? true : false;
    }
}
exports.default = AutoScriptXMLModel;
//# sourceMappingURL=AutoScriptXML.model.js.map