/**
 * remove-project-files.js
 * Handles the removal of all Task Master files from a project
 */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import boxen from 'boxen';
import inquirer from 'inquirer';
import ora from 'ora';

/**
 * Prompts the user to confirm removal and deletes Task Master project files.
 * @param {Object} options - Command options
 * @param {string} projectRoot - Path to the project root
 * @returns {Promise<void>}
 */
export async function removeProjectFiles(options = {}, projectRoot) {
	if (!projectRoot) {
		console.error(chalk.red('Error: Not inside a Task Master project.'));
		process.exit(1);
	}

	console.log(
		boxen(chalk.yellow.bold('⚠️  Remove Task Master Files ⚠️'), {
			padding: 1,
			margin: { bottom: 1 },
			borderStyle: 'double',
			borderColor: 'yellow'
		})
	);
	console.log(
		chalk.white(
			'This command will remove all Task Master-related files and directories from your project.'
		)
	);
	console.log(chalk.white('This action cannot be undone.\n'));

	const filesAndDirsToRemove = [
		'.taskmaster',
		'.cursor',
		'.roo',
		'.windsurfrules',
		'.roomodes',
		'.taskmasterconfig' // Legacy
	];

	const foundFilesAndDirs = [];
	for (const item of filesAndDirsToRemove) {
		const itemPath = path.join(projectRoot, item);
		if (fs.existsSync(itemPath)) {
			foundFilesAndDirs.push(item);
		}
	}

	// Also find roo rules directories
	try {
		const rooRulesDirs = fs
			.readdirSync(path.join(projectRoot, '.roo'))
			.filter(
				(f) =>
					f.startsWith('rules-') &&
					fs.statSync(path.join(projectRoot, '.roo', f)).isDirectory()
			)
			.map(dir => `.roo/${dir}`);
		foundFilesAndDirs.push(...rooRulesDirs);
	} catch (error) {
		// Ignore if .roo doesn't exist or other read errors
	}

	if (foundFilesAndDirs.length === 0) {
		console.log(
			chalk.green('✅ No Task Master files found in this project.')
		);
		return;
	}

	console.log(chalk.yellow('The following files and directories will be deleted:'));
	foundFilesAndDirs.forEach((item) => {
		console.log(chalk.cyan(`  - ${item}`));
	});
	console.log('');

	// Skip confirmation if --yes flag is provided
	const skipConfirmation = options.yes === true;
	let confirmed = skipConfirmation;
	
	if (!skipConfirmation) {
		const { confirm } = await inquirer.prompt([
			{
				type: 'confirm',
				name: 'confirm',
				message: 'Are you sure you want to proceed with the deletion?',
				default: false
			}
		]);
		confirmed = confirm;
	}

	if (confirmed) {
		const spinner = ora('Deleting files...').start();
		try {
			for (const item of foundFilesAndDirs) {
				const itemPath = path.join(projectRoot, item);
				spinner.text = `Removing ${item}...`;
				fs.rmSync(itemPath, { recursive: true, force: true });
			}
			spinner.succeed(chalk.green('Successfully removed all Task Master files.'));
		} catch (error) {
			spinner.fail(chalk.red('An error occurred during deletion.'));
			console.error(error);
		}
	} else {
		console.log(chalk.gray('Operation cancelled. No files were deleted.'));
	}
} 