import fs from "fs";
import util from "util";

import bufferToJson from "../helpers/bufferToJSON";

const readFile = util.promisify(fs.readFile);

async function lintFile(file: string) {

	let errors: string[] = [];

	try {
		const data = await readFile(file);

		bufferToJson(data);
	} catch (error) {
		if (error instanceof SyntaxError) {
			errors.push(error.message);
		} else {
			throw new Error(error);
		}
	}

	return errors;
}

export default lintFile;