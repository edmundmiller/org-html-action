"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
const io = __importStar(require("@actions/io"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const emacsPath = yield io.which("emacs", false);
            if (emacsPath === "") {
                core.startGroup("Test Emacs version");
                core.info("Running 'emacs -version'");
                yield exec.exec("emacs", ["-version"]);
                core.endGroup();
            }
            core.startGroup("Check org version");
            core.info("Running 'emacs -version'");
            yield exec.exec("emacs", [
                "--batch",
                "--no-init-file",
                "--funcall",
                "org-version"
            ]);
            // TODO check that org is >= 8
            core.endGroup();
            core.startGroup("Build docs");
            core.info("Running 'emacs --batch --no-init-file --load publish.el --funcall org-publish-all'");
            yield exec.exec("emacs", [
                "--batch",
                "--no-init-file",
                "--load",
                "publish.el",
                "--funcall",
                "org-publish-all"
            ]);
            core.endGroup();
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
