// /lib/getData.ts
import fsPromises from "fs/promises";
import path from "path";

export interface Post {
  datetime: string;
  user1_production: number;
  user1_consumption: number;
  user2_production: number;
  user2_consumption: number;
}

export async function getLocalData(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), "lib/data.json");
  const jsonData = await fsPromises.readFile(filePath, "utf-8");
  const objectData: Post[] = JSON.parse(jsonData);
  return objectData;
}
