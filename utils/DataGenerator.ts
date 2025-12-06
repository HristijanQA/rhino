// utils/DataGenerator.ts
export class DataGenerator {
    /**
     * Creates a unique email address using a timestamp or random characters.
     * @param prefix - A custom prefix for the email (e.g., 'signup').
     * @param domain - The domain to use (defaults to '@example.com').
     * @returns A unique email string.
     */
    static createUniqueEmail(prefix: string = 'test', domain: string = '@example.com'): string {
        const randomPart = Math.random().toString(36).substring(2, 6); // 4 random chars
        const timestampPart = Date.now().toString().slice(-6); // Last 6 digits of timestamp
        
        return `${prefix}_${randomPart}_${timestampPart}${domain}`;
    }

    static createUniquePhoneNumber(): string {
        const uniqueSegment = Date.now().toString().slice(-7); 
        
        const segment1 = uniqueSegment.slice(0, 3);
        const segment2 = uniqueSegment.slice(3, 6); 
        const segment3 = uniqueSegment.slice(6, 7); 
        
        return `584 56 ${segment1} ${segment2}${segment3}`;
    }
}