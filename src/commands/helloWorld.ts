import { Args, Command, Flags } from '@oclif/core'
import { select } from '@inquirer/prompts'

export default class HelloWorld extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: 'f' }),
  }

  static args = {
    file: Args.string({ description: 'file to read' }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(HelloWorld)

    const answer = await select({
      message: 'Are you sure?',
      choices: [
        {
          name: 'yes',
          value: 'yes',
        },
        {
          name: 'no',
          value: 'no',
        },
      ],
    })

    console.log(answer)
    const name = flags.name ?? 'world'
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
