export function parsePrice(value: unknown): number {
    if (value == null) return NaN;
    const str = String(value);
    const match = str.match(/[\d.,]+/);
    if (!match) return NaN;
    const normalized = match[0].replace(/\./g, '').replace(',', '.');
    return Number(normalized);
}