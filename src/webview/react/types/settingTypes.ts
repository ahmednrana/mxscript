// Shared types for settings-driven environment editor
// Extracted to allow reuse in MXSettingItem and other components.

export type SettingType = 'string' | 'number' | 'password' | 'boolean' | 'multiline' | 'select' | 'radio';

export type BadgeVariant = 'default' | 'counter' | 'info' | 'warning' | 'error' | 'success';

export interface Badge {
  text: string;
  variant?: BadgeVariant;
  title?: string;
}
export interface SettingMetaBase {
  id: string;
  label: string;
  description?: string;
  badges?: Badge[];
  required?: boolean;
  placeholder?: string;
  group: string; // group id
  order?: number;
  type: SettingType;
  defaultValue?: any;
  validate?: (value: any) => string | undefined;
  // select-specific optional metadata
  options?: string[]; // fixed list
  allowCustom?: boolean; // allow user typed custom value (for single-select component)
}

export interface BooleanSettingMeta extends SettingMetaBase { type: 'boolean'; }
export interface PasswordSettingMeta extends SettingMetaBase { type: 'password'; }
export interface StringSettingMeta extends SettingMetaBase { type: 'string' | 'multiline'; }
export interface NumberSettingMeta extends SettingMetaBase { type: 'number'; }
export interface SelectSettingMeta extends SettingMetaBase { type: 'select'; options: string[]; allowCustom?: boolean; }
export interface RadioSettingMeta extends SettingMetaBase { type: 'radio'; options: string[]; }

export type SettingMeta = BooleanSettingMeta | PasswordSettingMeta | StringSettingMeta | NumberSettingMeta | SelectSettingMeta | RadioSettingMeta;

export interface GroupMeta {
  id: string;
  title: string;
  icon?: string;
  description?: string;
  order?: number;
}

export interface FieldState {
  value: any;
  error?: string;
  touched?: boolean;
}

export type FormState = Record<string, FieldState>;
