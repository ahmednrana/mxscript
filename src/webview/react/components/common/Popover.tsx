import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PopoverProps {
    /** Element the popover is positioned against. */
    anchor: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: number;
}

/**
 * Lightweight anchored popover. Renders into a body portal (so it is never
 * clipped by grid/overflow containers) and closes on outside-click or Escape.
 * Reusable anywhere a floating panel anchored to a trigger is needed.
 */
export function Popover({ anchor, open, onClose, children, width = 270 }: PopoverProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    useLayoutEffect(() => {
        if (!open || !anchor) return;
        const rect = anchor.getBoundingClientRect();
        const maxLeft = window.innerWidth - width - 8;
        const left = Math.max(8, Math.min(rect.left, maxLeft));
        setPos({ top: rect.bottom + 4, left });
    }, [open, anchor, width]);

    useEffect(() => {
        if (!open) return;
        const onMouseDown = (e: MouseEvent) => {
            const target = e.target as Node;
            if (ref.current?.contains(target)) return;
            if (anchor?.contains(target)) return;
            onClose();
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('mousedown', onMouseDown, true);
        document.addEventListener('keydown', onKey, true);
        return () => {
            document.removeEventListener('mousedown', onMouseDown, true);
            document.removeEventListener('keydown', onKey, true);
        };
    }, [open, anchor, onClose]);

    if (!open) return null;

    return createPortal(
        <div
            ref={ref}
            style={{
                position: 'fixed',
                top: pos.top,
                left: pos.left,
                width,
                zIndex: 5000,
                background: 'var(--vscode-editorWidget-background)',
                color: 'var(--vscode-foreground)',
                border: '1px solid var(--vscode-widget-border, var(--vscode-panel-border))',
                borderRadius: 6,
                boxShadow: '0 4px 16px rgba(0,0,0,0.45)',
                font: 'var(--vscode-font-family)'
            }}
        >
            {children}
        </div>,
        document.body
    );
}
