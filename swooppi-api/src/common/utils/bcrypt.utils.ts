import * as bcrypt from 'bcrypt'

export class Bcrypt {
    static async generateSalt() {
        return await bcrypt.genSalt(10)
    }

    static async generateHash(text: string, salt: string) {
        return await bcrypt.hash(text, salt)
    }

    static async verifyMatch(text: string, hashed: string) {
        return bcrypt.compare(text, hashed)
    }
}
