import { CapitalizationMode } from "../store/settingsStore";

const setCase = (char: string, capitalization: CapitalizationMode) => capitalization === 'lowercase' ? char.toLowerCase() : char.toUpperCase();

export default setCase;