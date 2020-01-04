import fs from "fs";
import util from "util";

import lintFile from "./utils/lintFile";
import prefix from "./utils/prefix";

const readDir = util.promisify(fs.readdir);

(async () => {
	const args = process.argv.slice(2);

	for (const arg of args) {
		let lintingErrors: boolean = false;
		let files: string[] = [];

		if (arg.startsWith("files=")) {
			files = arg.replace("files=", "").split(",")
		} else if (arg.startsWith("folder=")) {
			const folder = arg.replace("folder=", "");

			try {
				files = await readDir(folder);
				files = await files.map((file) => `${folder}/${file}`);
			} catch (error) {
				console.error(error);
			}
		} else {
			process.exit(1);
		}

		console.log(`${prefix.self} Linting files...`);

		for (const file of files) {
			const errors = await lintFile(file);

			if (errors.length) {
				lintingErrors = true;

				console.log(`${prefix.error} ${file} ${errors.map((error) => `\n • ${error}`)}`);
			} else {
				console.log(`${prefix.success} ${file}`);
			}
		}

		if (lintingErrors) process.exit(1);
	}
})();
