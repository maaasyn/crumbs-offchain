export const globalHashDictionary = new Map<string, string>();
import { createClient } from "@libsql/client/web";

const rawDb = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const dbClient = {
  isInit: false,
  _init: async function () {
    if (!this.isInit) {
      await rawDb.execute(`
      CREATE TABLE IF NOT EXISTS kv (
        key TEXT PRIMARY KEY,
        value TEXT UNIQUE
      );
      `);
      this.isInit = true;
    }
  },
  get: async function (
    key: string
  ): Promise<{ key: string; value: string } | null> {
    await this._init();

    const result = await rawDb.execute({
      sql: "SELECT value FROM kv WHERE key = $keccak",
      args: { keccak: key },
    });

    if (result.rows.length === 0) {
      return null;
    }

    return {
      key,
      value: result.rows[0].value as string,
    };
  },
  getMany: async function (keys: string[]) {
    await this._init();

    const keysJoined = keys.map((k) => `"${k}"`).join(", ");
    const result = await rawDb.execute({
      args: {},
      sql: `SELECT key, value FROM kv WHERE key IN (${keysJoined})`,
    });

    return result.rows.map((row) => ({
      key: row.key as string,
      value: row.value as string,
    }));
  },
  set: async function (key: string, value: string) {
    await this._init();
    return rawDb.execute({
      sql: "INSERT OR IGNORE INTO kv (key, value) VALUES (?, ?)",
      args: [key, value],
    });
  },
};

export const hashMediator = {
  getHash: async (hash: string): Promise<string | null> => {
    const response = await dbClient.get(hash);
    return response ? response.value : null;
  },
  setHash: async (hash: string, value: string) => {
    const result = await dbClient.set(hash, value);
    return result;
  },
  getHashes: async (hashes: string[]) => {
    const result = await dbClient.getMany(hashes);
    return result;
  },
};
