import stratter from "stratter";

const prefix = {
	self: stratter(" JSON-LINTER ", {
		foreground: "black",
		background: "cyan"
	}),
	error: stratter(" FAIL ", {
		foreground: "black",
		background: "red"
	}),
	success: stratter(" SUCCESS ", {
		foreground: "black",
		background: "green"
	})
};

export default prefix;