"""Test Pages publishing against a disposable local Git remote."""

import os
import subprocess
import tempfile
from pathlib import Path


portfolio_root = Path(__file__).resolve().parents[1]


def run(args, **kwargs):
    return subprocess.run(
        args, check=True, capture_output=True, text=True,
        cwd=portfolio_root, **kwargs,
    )


with tempfile.TemporaryDirectory(prefix="portfolio-pages-test-") as directory:
    root = Path(directory)
    seed, remote = root / "seed", root / "pages.git"
    run(["git", "init", "--initial-branch=gh-pages", str(seed)])
    run(["git", "-C", str(seed), "config", "user.name", "Deployment Test"])
    run(["git", "-C", str(seed), "config", "user.email", "test@example.test"])
    (seed / "obsolete.txt").write_text("old asset\n")
    run(["git", "-C", str(seed), "add", "."])
    run(["git", "-C", str(seed), "commit", "-m", "test: seed pages branch"])
    initial = run(["git", "-C", str(seed), "rev-parse", "HEAD"]).stdout.strip()
    run(["git", "clone", "--bare", str(seed), str(remote)])
    environment = dict(
        os.environ, PAGES_REMOTE=str(remote),
        GIT_AUTHOR_NAME="Deployment Test", GIT_COMMITTER_NAME="Deployment Test",
        GIT_AUTHOR_EMAIL="test@example.test", GIT_COMMITTER_EMAIL="test@example.test",
    )
    run(["bash", "scripts/deploy-pages.sh"], env=environment)
    git = ["git", "--git-dir=" + str(remote)]
    files = run(git + ["ls-tree", "-r", "--name-only", "gh-pages"]).stdout.splitlines()
    assert "obsolete.txt" not in files
    assert all(name in files for name in [".nojekyll", "CNAME", "index.html"])
    assert not any(name.startswith(("src/", "node_modules/")) for name in files)
    assert run(git + ["show", "gh-pages:CNAME"]).stdout.strip() == "stanleyavril.dev"
    assert run(git + ["rev-parse", "gh-pages^"]).stdout.strip() == initial
    published = run(git + ["rev-parse", "gh-pages"]).stdout.strip()
    result = run(["bash", "scripts/deploy-pages.sh"], env=environment)
    assert run(git + ["rev-parse", "gh-pages"]).stdout.strip() == published
    assert "already up to date" in result.stdout

print("Pages publishing test passed using a temporary local repository.")
