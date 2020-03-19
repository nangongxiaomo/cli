const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))
const { clone } = require('./download')
const open = require('open')

const spawn = async (...args) => {
  const { spawn } = require('child_process')
  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stdout.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}

module.exports.init = async name => {
  //打印欢迎页面
  clear()
  const data = await figlet('WELCOME')
  log(data)
  log(`🚀创建项目: ${name}`)
  await clone('github:vuejs/vue-cli', name)
  await spawn('npm', ['install'], { cwd: `./${name}` })
  log(
    `
  🙆安装完成
  `
  )
  open('http://localhost:8080')
  await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
}
