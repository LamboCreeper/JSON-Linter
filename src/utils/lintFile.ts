import bufferToJson from "./bufferToJSON";

async function lintFile(file: string) {
	let errors: string[] = [];

	try {
		const data = await readFile(file);

		bufferToJson(data);
	} catch (error) {
		if (error instanceof SyntaxError) {
			errors.push(error.message);
		}
	}

	return errors;
}

export default lintFile;