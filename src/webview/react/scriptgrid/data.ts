import { load as parseYaml } from 'js-yaml';

export type ScriptStatus = 'Active' | 'Inactive' | 'Draft';

export interface SubTask {
    id: string;
    name: string;
    status: ScriptStatus;
    owner: string;
}

export interface MaximoScript {
    id: string;
    name: string;
    status: ScriptStatus;
    dueDate: string; // ISO yyyy-MM-dd
    language: string;
    description: string;
    isReadOnly: boolean;
    subTasks: SubTask[];
}

const STATUSES: ScriptStatus[] = ['Active', 'Inactive', 'Draft'];
const LANGUAGES = ['python', 'jython', 'nashorn', 'groovy', 'javascript'];
const VERBS = ['Validate', 'Calculate', 'Sync', 'Notify', 'Escalate', 'Audit', 'Transform', 'Archive'];
const NOUNS = ['WorkOrder', 'Asset', 'PurchaseOrder', 'Inventory', 'Location', 'ServiceRequest', 'Labor', 'Invoice'];
const OWNERS = ['MAXADMIN', 'INTEGRATION', 'SCHEDULER', 'WONUM_SVC', 'PM_ENGINE'];

/** Deterministic pseudo-random generator so the demo dataset is stable. */
function mulberry32(seed: number): () => number {
    let a = seed;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** Generates a deterministic set of dummy Maximo automation scripts. */
export function generateDummyScripts(count: number): MaximoScript[] {
    const rand = mulberry32(0x4d58_5343);
    const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
    const scripts: MaximoScript[] = [];

    for (let i = 0; i < count; i++) {
        const verb = pick(VERBS);
        const noun = pick(NOUNS);
        const baseDate = new Date(2025, 0, 1);
        baseDate.setDate(baseDate.getDate() + Math.floor(rand() * 540));

        const subCount = 1 + Math.floor(rand() * 6);
        const subTasks: SubTask[] = [];
        for (let s = 0; s < subCount; s++) {
            subTasks.push({
                id: `MX${String(i).padStart(5, '0')}-T${s + 1}`,
                name: `${pick(VERBS)} ${pick(NOUNS)} step ${s + 1}`,
                status: pick(STATUSES),
                owner: pick(OWNERS)
            });
        }

        scripts.push({
            id: `MXSCRIPT-${String(i + 1).padStart(5, '0')}`,
            name: `${verb}${noun}Script${i + 1}`,
            status: pick(STATUSES),
            dueDate: baseDate.toISOString().slice(0, 10),
            language: pick(LANGUAGES),
            description: `Automation script that performs ${verb.toLowerCase()} logic on ${noun} records.`,
            isReadOnly: rand() < 0.05,
            subTasks
        });
    }
    return scripts;
}

/**
 * Parses a Maximo script dataset from either a JSON or YAML string.
 * Reusable by future Maximo grid views that load data from files.
 */
export function loadScripts(raw: string, format: 'json' | 'yaml'): MaximoScript[] {
    const parsed = format === 'yaml' ? parseYaml(raw) : JSON.parse(raw);
    if (!Array.isArray(parsed)) {
        throw new Error('Expected the dataset root to be an array of script records.');
    }
    return parsed as MaximoScript[];
}
