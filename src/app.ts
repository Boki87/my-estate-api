import buildServer from './server'

export const server = buildServer()


async function main() {
  try {

    await server.listen(3000, "0.0.0.0")
    console.log("Server running at http://localhost:3000")
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()