import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as io from "@actions/io";
import { wait } from "./wait";

async function run() {
  try {
    const emacsPath: string = await io.which("emacs", false);
    if (emacsPath === "") {
      core.startGroup("Test Emacs version");
      core.info("Running 'emacs -version'");
      await exec.exec("emacs", ["-version"]);
      core.endGroup();
    }

    core.startGroup("Check org version");
    core.info("Running 'emacs -version'");
    await exec.exec("emacs", [
      "--batch",
      "--no-init-file",
      "--funcall",
      "org-version"
    ]);
    // TODO check that org is >= 8
    core.endGroup();

    core.startGroup("Build docs");
    core.info(
      "Running 'emacs --batch --no-init-file --load publish.el --funcall org-publish-all'"
    );
    await exec.exec("emacs", [
      "--batch",
      "--no-init-file",
      "--load",
      "src/publish.el",
      "--funcall",
      "org-publish-all"
    ]);
    core.endGroup();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
