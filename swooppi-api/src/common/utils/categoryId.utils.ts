import * as crypto from 'crypto'

export class CategoryID {
    static async generateId(categoryName: string): Promise<string> {
        // Use SHA-256 for cryptographic hash
        const hash = crypto.createHash('sha256');

        // Update the hash with the category name
        hash.update(categoryName);

        // Get the hexadecimal digest and truncate to 10 characters
        const shortHash = hash.digest('hex').slice(0, 10);

        // Convert the hexadecimal string to uppercase
        const uppercaseShortHash = shortHash.toUpperCase();

        return `SWOP${uppercaseShortHash}`;
    }
}