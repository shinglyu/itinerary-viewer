# Install nvm, node, npm if not installed
# curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
# source ~/.zshrc
# nvm install stable
bower install
npm install -g live-server
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "export PATH=\$PATH:${DIR}" >> ~/.zshrc
echo "Added \"export PATH=\$PATH:${DIR}\" to your zshrc."
echo "Run \"source ~/.zshrc\" to continue."
