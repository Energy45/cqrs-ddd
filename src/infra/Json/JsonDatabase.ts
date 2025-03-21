import { readFile, writeFile, access } from 'node:fs/promises';

export class JsonDatabase<T> {

    constructor(private readonly filename: string) {
        
    }

    async loadDataFromDisk(): Promise<Record<string, any>[]> {
        if (!await this.checkIfFileExists()) {
            await writeFile(this.filename, JSON.stringify([] as Record<string, any>, null, 2));
            //Ici je retourne plus vite car pas besoin de lire le fichier, il n'existe pas
            return [];
        }
        return JSON.parse(await readFile(this.filename, 'utf8'));
    }

    async saveDataToDisk(data: Record<string, any>[]): Promise<void> {
        await writeFile(this.filename, JSON.stringify(data, null, 2));
    }

    private async checkIfFileExists(): Promise<boolean> {
        try {
            await access(this.filename);
            return true;
        } catch (error) {
            return false;
        }
    }
}