import React, { useState, useEffect, useMemo } from 'react';
import { 
    VscodeTable, 
    VscodeTableHeader, 
    VscodeTableHeaderCell, 
    VscodeTableBody, 
    VscodeTableRow, 
    VscodeTableCell, 
    VscodeTextfield,
    VscodeButton,
    VscodeIcon,
    VscodeLabel,
    VscodeCheckbox
} from '@vscode-elements/react-elements';

interface SystemProperty {
    key: string;
    value: string | null;
}

const vscode = (typeof window !== 'undefined' && (window as any).acquireVsCodeApi) 
    ? (window as any).acquireVsCodeApi() 
    : null;

export const SystemPropertyViewer: React.FC = () => {
    const [originalProperties, setOriginalProperties] = useState<Record<string, string | null>>({});
    const [properties, setProperties] = useState<SystemProperty[]>([]);
    const [editedValues, setEditedValues] = useState<Record<string, string>>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [envName, setEnvName] = useState('');
    const [isReviewing, setIsReviewing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showChangesOnly, setShowChangesOnly] = useState(false);
    const [comparisonData, setComparisonData] = useState<Record<string, string> | null>(null);
    const [comparisonEnvName, setComparisonEnvName] = useState<string>('');

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const message = event.data;
            switch (message.type) {
                case 'setProperties':
                    setOriginalProperties(message.properties);
                    const props = Object.entries(message.properties).map(([key, value]) => ({
                        key,
                        value: value as string | null
                    })).sort((a, b) => a.key.localeCompare(b.key));
                    setProperties(props);
                    setEnvName(message.envName);
                    setEditedValues({});
                    // setComparisonData(null); // Keep it to allow re-send union
                    setIsSubmitting(false);
                    setIsReviewing(false);
                    break;
                case 'setComparison':
                    setComparisonData(message.properties);
                    setComparisonEnvName(message.envName);
                    break;
                case 'pushResult':
                    setIsSubmitting(false);
                    break;
            }
        };

        window.addEventListener('message', handleMessage);
        vscode?.postMessage({ type: 'ready' });

        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const filteredProperties = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase();
        return properties.filter(p => {
            // 1. Search filter
            const currentVal = editedValues[p.key] ?? p.value ?? '';
            const compareVal = comparisonData?.[p.key] ?? '';
            const keyMatch = p.key.toLowerCase().includes(lowerSearch) || 
                             currentVal.toLowerCase().includes(lowerSearch) ||
                             compareVal.toLowerCase().includes(lowerSearch);
            
            if (!keyMatch) return false;

            // 2. Changes only filter
            if (showChangesOnly && comparisonData) {
                const otherValue = comparisonData[p.key];
                const isMissingInOther = otherValue === undefined;
                const isMissingLocally = p.value === null;
                const isDifferent = !isMissingInOther && !isMissingLocally && otherValue !== p.value;
                
                return isMissingInOther || isMissingLocally || isDifferent;
            }

            return true;
        });
    }, [properties, searchTerm, editedValues, comparisonData, showChangesOnly]);

    const pendingCount = Object.keys(editedValues).length;

    const handleValueChange = (key: string, newValue: string) => {
        const original = originalProperties[key];
        if (newValue === original) {
            const newEdits = { ...editedValues };
            delete newEdits[key];
            setEditedValues(newEdits);
        } else {
            setEditedValues({ ...editedValues, [key]: newValue });
        }
    };

    const handleCopy = (text: string) => {
        vscode?.postMessage({ type: 'copyToClipboard', text });
    };

    const handlePush = () => {
        setIsSubmitting(true);
        vscode?.postMessage({ 
            type: 'pushChanges', 
            changes: editedValues 
        });
    };

    const handleDiscard = () => {
        setEditedValues({});
        setIsReviewing(false);
    };

    const handleRequestCompare = () => {
        vscode?.postMessage({ type: 'requestCompare' });
    };

    const handleExportProperties = () => {
        // Prepare the current state for export
        const exportData: Record<string, string | null> = {};
        properties.forEach(p => {
            // Priority: Edits > Original Value
            exportData[p.key] = editedValues[p.key] ?? p.value;
        });
        
        vscode?.postMessage({ 
            type: 'exportProperties', 
            properties: exportData 
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '10px', boxSizing: 'border-box', position: 'relative' }}>
            {/* Header */}
            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ opacity: 0.7, fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '1px' }}>System Properties</span>
                    <h2 style={{ margin: 0, whiteSpace: 'nowrap' }}>{envName}</h2>
                </div>
                <div style={{ flex: 1, minWidth: '10px' }}></div>
                
                <VscodeButton {...{ secondary: true, onClick: handleRequestCompare } as any}>
                    <VscodeIcon {...{ name: "compare-changes", slot: "content-before" } as any} />
                    Compare
                </VscodeButton>

                <VscodeButton {...{ secondary: true, onClick: handleExportProperties } as any}>
                    <VscodeIcon {...{ name: "file-code", slot: "content-before" } as any} />
                    Export Properties
                </VscodeButton>

                {comparisonData && (
                    <VscodeCheckbox 
                        {...{
                            checked: showChangesOnly,
                            onChange: (e: any) => setShowChangesOnly(e.target.checked),
                            style: { marginRight: '10px' }
                        } as any}
                    >
                        Show differences only
                    </VscodeCheckbox>
                )}

                <VscodeTextfield 
                    {...{
                        placeholder: "Search keys or values...",
                        onInput: (e: any) => setSearchTerm(e.target.value),
                        value: searchTerm,
                        style: { width: '100%', maxWidth: '300px', minWidth: '150px' }
                    } as any}
                >
                    <VscodeIcon {...{ name: "search", slot: "content-before" } as any} />
                </VscodeTextfield>
                <div style={{ fontSize: '0.9em', opacity: 0.8, whiteSpace: 'nowrap' }}>
                    Showing {filteredProperties.length} of {properties.length}
                </div>
            </div>

            {/* Table Area */}
            <div style={{ flex: 1, overflow: 'hidden', marginBottom: pendingCount > 0 ? '60px' : '0' }}>
                <VscodeTable 
                    {...{
                        zebra: true,
                        resizable: true,
                        style: { height: '100%' }
                    } as any}
                >
                    <VscodeTableHeader slot="header">
                        <VscodeTableHeaderCell style={{ width: '25%' }}>Property Name</VscodeTableHeaderCell>
                        <VscodeTableHeaderCell style={{ width: comparisonData ? '30%' : '55%' }}>Value (Edit)</VscodeTableHeaderCell>
                        {comparisonData && (
                            <VscodeTableHeaderCell style={{ width: '30%' }}>Compare: {comparisonEnvName}</VscodeTableHeaderCell>
                        )}
                        <VscodeTableHeaderCell style={{ width: '15%' }}>Actions</VscodeTableHeaderCell>
                    </VscodeTableHeader>
                    <VscodeTableBody slot="body">
                        {filteredProperties.map(prop => {
                            const isModified = editedValues[prop.key] !== undefined;
                            const isMissingLocally = prop.value === null;
                            const displayValue = editedValues[prop.key] ?? prop.value ?? "";
                            const rowCount = Math.max(1, Math.min(10, (displayValue.match(/\n/g) || []).length + 1));

                            // Comparison Logic
                            const hasComparison = comparisonData !== null;
                            const otherValue = hasComparison ? comparisonData[prop.key] : undefined;
                            const isMissingInOther = hasComparison && otherValue === undefined;
                            const isDifferent = hasComparison && !isMissingInOther && !isMissingLocally && otherValue !== prop.value;

                            return (
                                <VscodeTableRow 
                                    key={prop.key}
                                    style={{ 
                                        backgroundColor: isModified ? 'rgba(40, 167, 69, 0.15)' : (isMissingLocally ? 'rgba(255, 165, 0, 0.15)' : undefined),
                                    }}
                                >
                                    <VscodeTableCell>
                                        <div style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '5px',
                                            overflow: 'hidden',
                                            padding: '2px 0'
                                        }}>
                                            {isModified && <VscodeIcon {...{ name: "circle-filled", style: { fontSize: '8px', color: 'var(--vscode-gitDecoration-modifiedResourceForeground)', flexShrink: 0 } } as any} />}
                                            <VscodeLabel 
                                                title={prop.key}
                                                style={{
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    color: isMissingLocally ? 'var(--vscode-errorForeground)' : 'inherit'
                                                }}
                                            >
                                                {prop.key}
                                            </VscodeLabel>
                                        </div>
                                    </VscodeTableCell>
                                    <VscodeTableCell style={{ padding: 0 }}>
                                        {isMissingLocally ? (
                                            <div style={{ padding: '2px 8px', opacity: 0.6, fontStyle: 'italic' }}>
                                                Not found in {envName}
                                            </div>
                                        ) : (
                                            <textarea 
                                                value={displayValue}
                                                onChange={(e) => handleValueChange(prop.key, e.target.value)}
                                                rows={rowCount}
                                                style={{
                                                    width: '100%',
                                                    border: 'none',
                                                    background: 'transparent',
                                                    color: isModified ? 'var(--vscode-gitDecoration-modifiedResourceForeground)' : 'inherit',
                                                    padding: '2px 8px',
                                                    fontFamily: 'inherit',
                                                    fontSize: 'inherit',
                                                    outline: 'none',
                                                    resize: 'none',
                                                    display: 'block',
                                                    wordBreak: 'break-all',
                                                    lineHeight: '1.2'
                                                }}
                                                title={isModified ? `Original: ${prop.value}` : ''}
                                            />
                                        )}
                                    </VscodeTableCell>
                                    {comparisonData && (
                                        <VscodeTableCell style={{ 
                                            padding: '2px 8px',
                                            backgroundColor: isMissingInOther ? 'rgba(255, 165, 0, 0.15)' : (isDifferent ? 'rgba(255, 0, 0, 0.1)' : undefined)
                                        }}>
                                            <div style={{ 
                                                wordBreak: 'break-all', 
                                                opacity: isMissingInOther ? 0.6 : 0.8,
                                                fontStyle: isMissingInOther ? 'italic' : 'normal',
                                                color: isDifferent ? 'var(--vscode-errorForeground)' : 'inherit'
                                            }}>
                                                {isMissingInOther ? `Not found in ${comparisonEnvName}` : otherValue}
                                            </div>
                                        </VscodeTableCell>
                                    )}
                                    <VscodeTableCell>
                                        <div style={{ display: 'flex', gap: '2px' }}>
                                            <VscodeButton 
                                                {...{ 
                                                    appearance: "icon", // Still using it as an attribute if it works at runtime
                                                    title: "Live Refresh",
                                                    onClick: () => {
                                                        vscode?.postMessage({ type: 'liveRefresh', key: prop.key });
                                                    }
                                                } as any}
                                            >
                                                <VscodeIcon {...{ name: "refresh" } as any} />
                                            </VscodeButton>
                                            <VscodeButton 
                                                {...{
                                                    appearance: "icon",
                                                    title: "Copy Value",
                                                    onClick: () => handleCopy(displayValue)
                                                } as any}
                                            >
                                                <VscodeIcon {...{ name: "copy" } as any} />
                                            </VscodeButton>
                                            <VscodeButton 
                                                {...{
                                                    appearance: "icon",
                                                    title: "Copy Key=Value",
                                                    onClick: () => handleCopy(`${prop.key}=${displayValue}`)
                                                } as any}
                                            >
                                                <VscodeIcon {...{ name: "symbol-key" } as any} />
                                            </VscodeButton>
                                        </div>
                                    </VscodeTableCell>
                                </VscodeTableRow>
                            );
                        })}
                    </VscodeTableBody>
                </VscodeTable>
            </div>

            {/* Pending Changes Bar */}
            {pendingCount > 0 && !isReviewing && (
                <div style={{ 
                    position: 'absolute', 
                    bottom: '20px', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    background: 'var(--vscode-editorWidget-background)',
                    border: '1px solid var(--vscode-widget-border)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    zIndex: 100
                }}>
                    <span style={{ fontWeight: 'bold' }}>{pendingCount} properties modified</span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <VscodeButton onClick={() => setIsReviewing(true)}>Review & Push</VscodeButton>
                        <VscodeButton {...{ secondary: true, onClick: handleDiscard } as any}>Discard All</VscodeButton>
                    </div>
                </div>
            )}

            {/* Review Overlay */}
            {isReviewing && (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    padding: '40px'
                }}>
                    <div style={{
                        background: 'var(--vscode-editor-background)',
                        border: '1px solid var(--vscode-panel-border)',
                        borderRadius: '8px',
                        width: '100%',
                        maxWidth: '800px',
                        maxHeight: '800px',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px'
                    }}>
                        <h3>Review Changes to {envName}</h3>
                        <div style={{ flex: 1, overflowY: 'auto', margin: '20px 0' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ borderBottom: '1px solid var(--vscode-panel-border)', opacity: 0.8 }}>
                                    <tr style={{ textAlign: 'left' }}>
                                        <th style={{ padding: '8px' }}>Property</th>
                                        <th style={{ padding: '8px' }}>From</th>
                                        <th style={{ padding: '8px' }}>To</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(editedValues).map(([key, newVal]) => (
                                        <tr key={key}>
                                            <td style={{ padding: '8px', fontWeight: 'bold' }}>{key}</td>
                                            <td style={{ padding: '8px', opacity: 0.7, textDecoration: 'line-through' }}>{originalProperties[key]}</td>
                                            <td style={{ padding: '8px', color: 'var(--vscode-gitDecoration-modifiedResourceForeground)' }}>{newVal}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <VscodeButton onClick={handlePush} disabled={isSubmitting}>
                                {isSubmitting ? 'Pushing...' : `Push ${pendingCount} Changes`}
                            </VscodeButton>
                            <VscodeButton {...{ secondary: true, onClick: () => setIsReviewing(false), disabled: isSubmitting } as any}>
                                Back to Editor
                            </VscodeButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
