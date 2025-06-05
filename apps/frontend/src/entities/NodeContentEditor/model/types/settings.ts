import { DEFAULT_SETTINGS, INITIAL_SETTINGS } from '../../lib';

export type SettingName = keyof typeof DEFAULT_SETTINGS;

export type Settings = typeof INITIAL_SETTINGS;
