import development from "../config/development.json";
import ghpages from "../config/ghpages.json";
import production from "../config/production.json";

const configs = {
  development,
  ghpages,
  production,
};

export default configs[__buildEnv__] || development;
