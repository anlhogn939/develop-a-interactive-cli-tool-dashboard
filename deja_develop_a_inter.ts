// deja_develop_a_inter.ts

interface Command {
  name: string;
  description: string;
  action: () => void;
}

interface DashboardConfig {
  name: string;
  version: string;
  commands: Command[];
}

const dashboardConfig: DashboardConfig = {
  name: 'Deja Dashboard',
  version: '1.0.0',
  commands: [
    {
      name: 'help',
      description: 'Displays help information',
      action: () => {
        console.log('Available commands:');
        dashboardConfig.commands.forEach((command) => {
          console.log(`  ${command.name} - ${command.description}`);
        });
      },
    },
    {
      name: 'version',
      description: 'Displays the dashboard version',
      action: () => {
        console.log(`Deja Dashboard v${dashboardConfig.version}`);
      },
    },
    {
      name: 'quit',
      description: 'Exits the dashboard',
      action: () => {
        process.exit(0);
      },
    },
  ],
};

function runCommand(commandName: string) {
  const command = dashboardConfig.commands.find((command) => command.name === commandName);
  if (command) {
    command.action();
  } else {
    console.error(`Unknown command: ${commandName}`);
  }
}

function startDashboard() {
  console.log(`Welcome to ${dashboardConfig.name} v${dashboardConfig.version}!`);
  console.log('Type "help" to view available commands.');

  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (input) => {
    const commandName = input.trim();
    runCommand(commandName);
  });
}

startDashboard();