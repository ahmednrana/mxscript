"use strict";
// export interface AutoScriptOSLC {
//     prefixes: Prefixes;
//     oslcResponseInfo: OslcResponseInfo;
//     member?: (RdfsMemberEntity)[] | null;
//     about: string;
//   }
//   export interface Prefixes {
//     rdf: string;
//     rdfs: string;
//     spi: string;
//     oslc: string;
//   }
//   export interface OslcResponseInfo {
//     oslcTotalCount: number;
//     rdfAbout: string;
//   }
//   export interface RdfsMemberEntity {
//     createddate: string;
//     scriptlanguage: string;
//     status: string;
//     description?: string | null;
//     userdefined: boolean;
//     autoscriptvars_collectionref: string;
//     changeby: string;
//     loglevel_description: string;
//     autoscriptid: number;
//     source: string;
//     about: string;
//     interface: boolean;
//     _rowstamp: string;
//     active: boolean;
//     autoscript: string;
//     changedate: string;
//     loglevel: string;
//     statusdate: string;
//     version?: string | null;
//     // autoscriptvars?: (Spi:autoscriptvarsEntity)[] | null;
//     owner?: string | null;
//     createdby?: string | null;
//     createdbyname?: string | null;
//     createdbyid?: string | null;
//     ownerid?: string | null;
//     createdbyemail?: string | null;
//     owneremail?: string | null;
//   }
//   export interface autoscriptvarsEntity {
//     autoscriptvarsid: number;
//     localref: string;
//     description?: string | null;
//     noaction: boolean;
//     accessflag: number;
//     vartype: string;
//     literaldatatype_description?: string | null;
//     varbindingtype_description: string;
//     allowoverride: boolean;
//     varbindingtype: string;
//     literaldatatype?: string | null;
//     noaccesscheck: boolean;
//     varbindingvalue?: string | null;
//     about: string;
//     prefixes: Prefixes;
//     _rowstamp: string;
//     varname: string;
//     novalidation: boolean;
//     vartype_description: string;
//   }
Object.defineProperty(exports, "__esModule", { value: true });
class AutoScriptModel {
    constructor(xml) {
        this.autoScriptName = xml.AUTOSCRIPT[0];
        this.autoScriptId = xml.AUTOSCRIPTID[0];
        this.source = xml.SOURCE[0];
        this.comments = xml.COMMENTS[0];
        this.scriptLanguage = xml.SCRIPTLANGUAGE[0];
        this.status = xml.STATUS[0];
        this.logLevel = xml.LOGLEVEL[0];
        this.changedBy = xml.CHANGEBY[0];
        this.changeDate = xml.CHANGEDATE[0];
        this.active = xml.ACTIVE[0] === 1 ? true : false;
    }
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
}
exports.default = AutoScriptModel;
//# sourceMappingURL=AutoScript.model.js.map