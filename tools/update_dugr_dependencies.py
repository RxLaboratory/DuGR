"""If you're a developer, use this script to install DuGR directly from the repository."""

import assets._setup_env as dugr
dugr.init()
B = dugr.builder
E = B.ENVIRONMENT

# Install dependencies
B.update_jsx_dependencies()
