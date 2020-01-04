function bufferToJson(buffer: Buffer): JSON {
	return JSON.parse(buffer.toString());
}

export default bufferToJson;