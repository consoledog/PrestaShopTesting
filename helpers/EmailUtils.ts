export enum EmailType {
    VALID = "valid",
    NO_AT = "noAt",
    NO_DOMAIN = "noDomain",
    NO_LOCAL_PART = "noLocalPart",
    ALREADY_USED = "alreadyUsed"
}

export function generateEmail(type: EmailType): string {
    const random = Math.random().toString(36).substring(2, 10);

    switch (type) {
        case EmailType.VALID:
            return `${random}@example.com`;

        case EmailType.ALREADY_USED:
            return `used_email@example.com`;

        case EmailType.NO_AT:
            return `${random}`; // word

        case EmailType.NO_DOMAIN:
            return `${random}@`; // word@

        case EmailType.NO_LOCAL_PART:
            return `@example.com`; // @gmail.com

        default:
            throw new Error(`Unknown EmailType: ${type}`);
    }
}

