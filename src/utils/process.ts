/**
 *
 * @param file
 * @returns
 *
 * Process FEC file - txt format only
 */
export function processFecFile(file: File): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result) {
        const text = event.target.result as string;

        const rows = text.split("\n");
        const table = rows.map((row) => row.replaceAll("\r", "").split("\t"));

        resolve(table);
      } else {
        reject("Erreur: Impossible de lire le contenu du fichier.");
      }
    };

    reader.onerror = (error) => {
      reject(`Erreur de lecture du fichier : ${error}`);
    };

    reader.readAsText(file, "UTF-8");
  });
}
