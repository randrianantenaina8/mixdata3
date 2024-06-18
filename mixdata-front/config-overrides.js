const { alias } = require("react-app-rewire-alias")

module.exports = function override(config) {
  alias({
    "@component": "src/component",
    "@hooks": "src/hooks",
    "@pages": "src/pages",
    "@service": "src/service",
    "@container": "src/container",
    "@context": "src/Context",
    "@assets": "src/assets",
    "@utils": "src/utils",
  })(config)

  return config
}
