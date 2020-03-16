export default class AutoScriptXMLModel {

    public getSource(): string {
        return this.source;
    }
    public setSource(source: string): void {
        this.source = source;
    }
    public getAutoScriptName(): string {
        return this.autoScriptName;
    }
    public isActive(): boolean {
        return this.active;
    }
    public getAutoScriptId(): number {
        return this.autoScriptId;
    }
    public getScriptLanguage(): string {
        return this.scriptLanguage;
    }
    public getComments(): string {
        return this.comments;
    }
    public getLogLevel(): string {
        return this.logLevel;
    }
    public getStatus(): string {
        return this.status;
    }
    public getChangeBy(): string {
        return this.changedBy;
    }
    public getChangeDate(): Date {
        return this.changeDate;
    }
    private autoScriptName: string;
    private active: boolean;
    private autoScriptId: number;
    private source: string;
    private scriptLanguage: string;
    private comments: string;
    private status: string;
    private logLevel: string;
    private changedBy: string;
    private changeDate: Date;
    constructor(xml: any) {
        this.autoScriptName = xml.AUTOSCRIPT[0];
        this.autoScriptId = xml.AUTOSCRIPTID[0] ? xml.AUTOSCRIPTID[0]: 0;
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