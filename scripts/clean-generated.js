import { existsSync, readdirSync, rmSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const outputDirs = ["miniprogram_dist", "dist", ".wx-build"];
const root = process.cwd();

for (const target of outputDirs) {
	const absolutePath = resolve(root, target);
	if (!existsSync(absolutePath)) {
		continue;
	}

	rmSync(absolutePath, { recursive: true, force: true });
	console.log(`Removed ${target}`);
}

const walk = (dirPath) => {
	const entries = readdirSync(dirPath);
	for (const entry of entries) {
		const absolutePath = join(dirPath, entry);
		const relativePath = relative(root, absolutePath);

		if (
			relativePath.startsWith("node_modules") ||
			relativePath.startsWith(".git") ||
			relativePath.startsWith("scripts")
		) {
			continue;
		}

		const stats = statSync(absolutePath);
		if (stats.isDirectory()) {
			walk(absolutePath);
			continue;
		}

		if (extname(absolutePath) !== ".ts") {
			continue;
		}

		const jsPath = absolutePath.slice(0, -3) + ".js";
		const mapPath = jsPath + ".map";

		if (existsSync(jsPath)) {
			rmSync(jsPath, { force: true });
			console.log(`Removed ${relative(root, jsPath)}`);
		}

		if (existsSync(mapPath)) {
			rmSync(mapPath, { force: true });
			console.log(`Removed ${relative(root, mapPath)}`);
		}
	}
};

walk(root);
