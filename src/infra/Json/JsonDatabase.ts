import { readFile, writeFile } from 'node:fs/promises'

export class JsonDatabase<T> {

    constructor(private readonly filename: string) {
        
    }

    async loadDataFromDisk(): Promise<T> {
        return JSON.parse(await readFile(this.filename, 'utf8'));
    }

    async saveDataToDisk(data: T): Promise<void> {
        await writeFile(this.filename, JSON.stringify(data, null, 2));
    }
}