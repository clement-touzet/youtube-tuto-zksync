import { defineConfig } from "@wagmi/cli";
import { hardhat, react } from "@wagmi/cli/plugins";
import { actions } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/generated.ts",
  plugins: [
    actions({
      readContract: true,
      prepareWriteContract: true,
      writeContract: true,
    }),
    hardhat({
      artifacts: "artifacts-zk/",
      commands: {
        clean: "npx hardhat clean",
        build: "npx hardhat compile",
        rebuild: "npx hardhat compile",
      },
      project: "../backend/",
    }),
    react(),
  ],
});
