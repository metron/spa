# Обновить Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 24
node -v
npm -v

# Содать проект React
npm create vite@latest my-react-app -- --template react
# Запустить проект
cd react-app
npm install
npm run dev
