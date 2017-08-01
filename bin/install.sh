DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "export PATH=\$PATH:${DIR}" >> ~/.zshrc
echo "Added \"export PATH=\$PATH:${DIR}\" to your zshrc."
echo "Run \"source ~/.zshrc\" to continue."
